import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/integrations.js';
async function invoke(method,body){const res={setHeader(){},status(n){this.code=n;return this},json(data){this.body=data;return this}};await handler({method,body},res);return res}
test('counter config, validation, provider failure, and actual ordinal',async()=>{
 const oldUrl=process.env.UPSTASH_REDIS_REST_URL,oldToken=process.env.UPSTASH_REDIS_REST_TOKEN,oldFetch=globalThis.fetch;
 try{
 delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;
 assert.deepEqual((await invoke('GET')).body,{visitors:false});assert.equal((await invoke('POST',{})).code,503);assert.equal((await invoke('DELETE')).code,405);
 process.env.UPSTASH_REDIS_REST_URL='https://redis.example';process.env.UPSTASH_REDIS_REST_TOKEN='test-secret';
 assert.deepEqual((await invoke('GET')).body,{visitors:true});assert.equal((await invoke('POST','{')).code,400);assert.equal((await invoke('POST',{visitorId:'invalid'})).code,400);
 const input={visitorId:'00000000-0000-4000-8000-000000000001'};
 globalThis.fetch=async()=>({ok:false});assert.equal((await invoke('POST',input)).code,502);
 globalThis.fetch=async(url,options)=>{assert.equal(url,'https://redis.example');const command=JSON.parse(options.body);assert.equal(command[0],'EVAL');assert.equal(command[3],'portfolio:visitor:'+input.visitorId);return {ok:true,json:async()=>({result:42})}};
 assert.deepEqual((await invoke('POST',input)).body,{ordinal:42});
 globalThis.fetch=async()=>({ok:true,json:async()=>({result:-1})});assert.equal((await invoke('POST',input)).code,502);
 }finally{globalThis.fetch=oldFetch;for(const [key,value]of Object.entries({UPSTASH_REDIS_REST_URL:oldUrl,UPSTASH_REDIS_REST_TOKEN:oldToken})){if(value===undefined)delete process.env[key];else process.env[key]=value}}
});
