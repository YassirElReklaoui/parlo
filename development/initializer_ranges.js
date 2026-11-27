const fs=require('fs');const ts=require('typescript');
const html=fs.readFileSync(process.argv[2],'utf8');const open=html.indexOf('<script>')+8;const close=html.lastIndexOf('</script>');const js=html.slice(open,close);const ast=ts.createSourceFile('app.js',js,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);let names={};
for(const statement of ast.statements){if(ts.isVariableStatement(statement))for(const d of statement.declarationList.declarations){if(ts.isIdentifier(d.name)&&d.initializer)names[d.name.text]=[Array.from(html.slice(0,open+d.initializer.getStart(ast))).length,Array.from(html.slice(0,open+d.initializer.getEnd())).length]}}
process.stdout.write(JSON.stringify(names));
