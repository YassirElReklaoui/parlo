#!/usr/bin/env python3
"""Check the language files of a content folder (default: it_data).
Usage: python3 check_it_data.py [folder]
For every language it reports keys that are missing, empty or unknown, and
{0}/{1} style placeholders or <tags> that differ from the English file.
Exit code 1 when any gap is found, so you can use it before every upload."""
import json,sys,re,os
d=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(os.path.abspath(__file__)),'it_data')
idx=json.load(open(os.path.join(d,'index.json'),encoding='utf8'))
fb=idx.get('fallback','en')
base=json.load(open(os.path.join(d,idx['base']),encoding='utf8'))
course=idx.get('course','it')
ref=json.load(open(os.path.join(d,f'{course}-data.{fb}.json'),encoding='utf8'))['strings']
tok=lambda s:sorted(re.findall(r'\{[^}]*\}|</?[a-z]+[^>]*>',s))
bad=0
man=os.path.join(os.path.dirname(os.path.abspath(d)),'languages.json')
langs=[x['code'] for x in json.load(open(man,encoding='utf8'))['languages']] if os.path.exists(man) else idx['languages']
for lang in langs:
    f=os.path.join(d,f'{course}-data.{lang}.json')
    if not os.path.exists(f):
        print(lang,'FILE MISSING',f);bad=1;continue
    j=json.load(open(f,encoding='utf8'));s=j['strings']
    if j.get('lang')!=lang:print(lang,'lang field is',j.get('lang'));bad=1
    if not j.get('languageName'):print(lang,'languageName missing');bad=1
    miss=[k for k in ref if k not in s]
    empty=[k for k in ref if k in s and not str(s[k]).strip() and str(ref[k]).strip()]
    extra=[k for k in s if k not in ref]
    par=[k for k in ref if k in s and tok(str(s[k]))!=tok(str(ref[k]))]
    same=[k for k in ref if lang!=fb and k in s and s[k]==ref[k] and re.search(r'[A-Za-z]{4,}',ref[k])]
    print(f'{lang}: {len(s)} keys | missing {len(miss)} | empty {len(empty)} | unknown {len(extra)} | placeholder/tag mismatch {len(par)} | same as {fb} (info) {len(same)}')
    for name,lst in(('missing',miss),('empty',empty),('unknown',extra),('mismatch',par)):
        for k in lst[:10]:print('   ',name,k)
    if miss or empty or extra or par:bad=1
sys.exit(bad)
