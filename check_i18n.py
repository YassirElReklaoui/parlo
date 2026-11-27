import json,sys,re,glob,os
d=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(os.path.abspath(__file__)),'i18n')
en=json.load(open(d+'/en.json'))['strings']
P=lambda s:set(re.findall(r'\{[^}]*\}',s))
bad=0
man=os.path.join(os.path.dirname(os.path.abspath(d)),'languages.json')
codes=[x['code'] for x in json.load(open(man))['languages']] if os.path.exists(man) else None
if codes:
    for n in codes:
        if not os.path.exists(d+'/'+n+'.json'):print(n,'FILE MISSING');bad=1
for l in sorted(glob.glob(d+'/*.json')):
    n=os.path.basename(l)[:-5]
    if codes and n not in codes:continue
    if n=='en' or n.startswith('legacy-'):continue
    s=json.load(open(l))['strings']
    miss=[k for k in en if k not in s or not str(s[k]).strip()]
    extra=[k for k in s if k not in en]
    par=[k for k in en if k in s and P(s[k])!=P(en[k])]
    order=list(s)!=list(en)
    print(n,'missing',len(miss),'extra',len(extra),'param mismatch',len(par),'order differs',order)
    if miss or extra or par or order:bad=1;print('  e.g.',(miss+extra+par)[:5])
sys.exit(bad)
