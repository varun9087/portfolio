// Optional durable visitor counter. Personal music and contact links are static.
function reply(res,status,body){res.setHeader('Cache-Control','no-store');return res.status(status).json(body)}
export default async function handler(req,res){
 const configured=!!(process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN);
 if(req.method==='GET')return reply(res,200,{visitors:configured});
 if(req.method!=='POST')return reply(res,405,{error:'Method not allowed'});
 if(!configured)return reply(res,503,{error:'Counter not configured'});
 let input;try{input=typeof req.body==='string'?JSON.parse(req.body):req.body}catch{return reply(res,400,{error:'Invalid request'})}
 if(!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(input?.visitorId||''))return reply(res,400,{error:'Invalid visitor identifier'});
 try{
 const response=await fetch(process.env.UPSTASH_REDIS_REST_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',"local v=redis.call('GET',KEYS[1]); if v then return tonumber(v) end; local n=redis.call('INCR',KEYS[2]); redis.call('SET',KEYS[1],n); return n",'2',`portfolio:visitor:${input.visitorId}`,'portfolio:visitor-total']),signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw Error('storage');const data=await response.json();
 if(data.error||!Number.isSafeInteger(data.result)||data.result<1)throw Error('counter');
 return reply(res,200,{ordinal:data.result});
 }catch{return reply(res,502,{error:'Counter temporarily unavailable'})}
}
