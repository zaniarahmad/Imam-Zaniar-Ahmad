// Server setup code is supplied on stdin, never as a command-line argument.
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdout.write('Ready for private setup JSON on stdin.\n');
let input='';
process.stdin.on('data',async chunk=>{
  input+=chunk;
  if(!input.includes('\n')) return;
  process.stdin.pause();
  try{
    const {origin,code}=JSON.parse(input.trim());
    if(origin!=='https://www.imamzaniarahmad.com')throw Error('Unexpected website target');
    const response=await fetch(`${origin}/api/admin/book/setup`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code,migrateOnly:true})});
    console.log(JSON.stringify({status:response.status,ok:response.ok}));
    process.exit(response.ok?0:1);
  }catch{console.error('Initialization failed; no credentials were logged.');process.exit(1);}
});
