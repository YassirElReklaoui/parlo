/* Parlo v231 personal file persistence. No online services or remote writes. */
const PARLO_PROFILE_FILE_FORMAT = 'parlo-personal-profile';
let parloMeHandle = null;
let parloMeSaving = false;
let parloMePending = false;
let parloMeLastSignature = '';
let parloMeWarned = false;
let parloMeTimer = null;

function parloMeEnvelope(){
  return {format:PARLO_PROFILE_FILE_FORMAT,schemaVersion:1,appVersion:231,exportedAt:new Date().toISOString(),profile:plSnapshot()};
}
function parloMeValidate(data){
  if(!data || typeof data !== 'object' || data.format!==PARLO_PROFILE_FILE_FORMAT || !data.profile)
    throw Error('This is not a me.json personal profile');
  if(data.schemaVersion!==1)throw Error('Unsupported me.json format version');
  return p214ValidateBackup(data.profile);
}
function parloMeStatus(msg){
  const el=document.getElementById('parlo-me-status');
  if(el)el.textContent=msg;
}
function parloMeDownload(){
  plDownload('me.json',parloMeEnvelope());
  parloMeStatus('Personal profile downloaded. The app continues saving locally.');
  toast('me.json downloaded','download');
}
function parloMeQueue(){
  if(!parloMeHandle || PARLO_STORAGE_CORRUPT)return;
  parloMePending=true;
  if(parloMeTimer)clearTimeout(parloMeTimer);
  parloMeTimer=setTimeout(()=>{parloMeTimer=null;parloMeFlush()},900);
}
async function parloMeFlush(){
  if(!parloMeHandle || PARLO_STORAGE_CORRUPT || parloMeSaving)return;
  if(!parloMePending)return;
  parloMePending=false;
  parloMeSaving=true;
  try{
    const str=JSON.stringify(parloMeEnvelope(),null,2)+'\n';
    if(str.length>15e6)throw Error('me.json exceeds the file size limit');
    const file=await parloMeHandle.createWritable();
    await file.write(str);
    await file.close();
    parloMeLastSignature=JSON.stringify(S);
    parloMeWarned=false;
    parloMeStatus('Connected · Automatically saved to me.json');
  }catch(err){
    console.error('me.json write failed; browser local progress remains available',err);
    parloMeStatus('File sync paused · Progress still saved in this browser. Reconnect me.json.');
    if(!parloMeWarned){toast('Could not write me.json. Your local progress is still saved.','alert-triangle');parloMeWarned=true}
    // Do not repeatedly attempt writes without a new user interaction.
    parloMeHandle=null;
  }finally{
    parloMeSaving=false;
    if(parloMePending && parloMeHandle)parloMeQueue();
  }
}
async function parloMeCreate(){
  if(!('showSaveFilePicker' in window)){
    parloMeDownload();
    parloMeStatus('Automatic file access is unavailable. Download a fresh me.json after your sessions.');
    return;
  }
  try{
    const handle=await window.showSaveFilePicker({suggestedName:'me.json',types:[{description:'JSON personal profile',accept:{'application/json':['.json']}}]});
    if(!confirm('Write your current Parlo progress to this file? If it exists already, its contents will be replaced.'))return;
    parloMeHandle=handle;
    parloMeLastSignature='';
    parloMePending=true;
    await parloMeFlush();
  }catch(err){if(err.name!=='AbortError')toast('Cannot connect me.json: '+err.message,'alert-triangle')}
}
async function parloMeOpen(){
  if(!('showOpenFilePicker' in window)){
    parloMeImport();
    return;
  }
  try{
    const [handle]=await window.showOpenFilePicker({multiple:false,types:[{description:'JSON personal profile',accept:{'application/json':['.json']}}]});
    const file=await handle.getFile();
    if(file.size>15e6)throw Error('me.json is too large');
    const raw=JSON.parse(await file.text());
    // Validate before offering a choice; no file or profile is changed yet.
    const stored=parloMeValidate(raw);
    const count=Object.keys(stored.les||{}).length;
    const oldCount=Object.keys(S.les||{}).length;
    const panel=sheet(`<h2>Connect your me.json</h2><p class="sub">File profile: ${Math.floor(stored.xp)} XP, ${count} lesson records.</p><p class="sub">Current app: ${Math.floor(S.xp)} XP, ${oldCount} lesson records.</p><p class="sub">Choose carefully. Download a backup before replacing either profile.</p><button class="btn" id="p231-use-file">Restore from me.json</button><button class="btn ghost" id="p231-use-current">Keep my current progress and sync it to this file</button><button class="btn ghost" id="p231-cancel">Cancel</button>`);
    panel.querySelector('#p231-cancel').onclick=()=>panel.remove();
    panel.querySelector('#p231-use-file').onclick=()=>{
      try{plDownload('parlo-before-me-import-'+today()+'.json',{format:'parlo-backup',version:231,state:plSnapshot()});p214Commit(p214Prepare(stored));panel.remove();location.reload()}
      catch(err){toast('Restore failed: '+err.message,'alert-triangle')}
    };
    panel.querySelector('#p231-use-current').onclick=async()=>{
      if(!confirm('Replace the selected me.json with the progress in this browser?'))return;
      // Preserve an independent copy of both profiles before overwriting the file.
      plDownload('parlo-me-file-before-overwrite-'+today()+'.json',raw);
      parloMeHandle=handle;parloMePending=true;
      await parloMeFlush();panel.remove();
    };
  }catch(err){if(err.name!=='AbortError')toast('Cannot open me.json: '+err.message,'alert-triangle')}
}
function parloMeImport(){
  const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
  input.onchange=async()=>{
    const file=input.files?.[0];if(!file)return;
    if(file.size>15e6)return toast('Profile file too large','alert-triangle');
    try{const raw=JSON.parse(await file.text());parloMeValidate(raw);p214RestoreDialog({format:'parlo-backup',state:raw.profile})}
    catch(err){toast('Invalid me.json: '+err.message,'alert-triangle')}
  };
  input.click();
}
// Keep the existing localStorage data source and safety copies intact.
const parloOriginalSave=save;
save=function(){const result=parloOriginalSave();if(result!==false)parloMeQueue();return result};
const parloOriginalSafeSave=plSafeSave;
plSafeSave=function(){const result=parloOriginalSafeSave();if(result)parloMeQueue();return result};
// A few legacy restore and settings flows save directly to localStorage.
// Observe their final state while this session is connected.
setInterval(()=>{
  if(!parloMeHandle||PARLO_STORAGE_CORRUPT)return;
  try{const current=JSON.stringify(S);if(current!==parloMeLastSignature)parloMeQueue()}catch(err){console.error(err)}
},5000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden' && parloMeHandle){parloMePending=true;parloMeFlush()}});

const parloOriginalDataSheet=plDataSheet;
plDataSheet=function(){
  const count=document.querySelectorAll('#app>.sheet').length;
  parloOriginalDataSheet();
  const sheets=[...document.querySelectorAll('#app>.sheet')];
  const panel=sheets[count]||sheets[sheets.length-1];
  if(!panel)return;
  const group=document.createElement('section');group.className='parlo-personal-files';
  group.innerHTML=`<h3>Personal data · me.json</h3><p class="sub">Your name, settings, XP, lesson progress, exams, reviews, diary, badges, mastery and future progress fields are saved together.</p>
    <button class="btn" id="p231-download">${ic('download',18)} Download me.json</button>
    <button class="btn ghost" id="p231-connect">${ic('file',18)} Connect existing me.json</button>
    <button class="btn ghost" id="p231-create">${ic('device-floppy',18)} Create / save me.json</button>
    <button class="btn ghost" id="p231-import">${ic('upload',18)} Import me.json</button>
    <p id="parlo-me-status" class="sub" role="status">${parloMeHandle?'Connected for this session · Auto-sync on changes':'Local profile is saved automatically in this browser. Connect a file for automatic me.json sync where supported.'}</p>
    <p class="sub">App lessons, words and other built-in content belong to <b>data.json</b>. Personal progress belongs to <b>me.json</b>. No internet service is used.</p>`;
  panel.firstElementChild.appendChild(group);
  group.querySelector('#p231-download').onclick=parloMeDownload;
  group.querySelector('#p231-connect').onclick=parloMeOpen;
  group.querySelector('#p231-create').onclick=parloMeCreate;
  group.querySelector('#p231-import').onclick=parloMeImport;
};
