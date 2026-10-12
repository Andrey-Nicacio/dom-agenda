(function(){
"use strict";
/* ---------- icons ---------- */
const I={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M8 14h3v3H8z"/></svg>',
 users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.2c2.6.3 4.5 2.4 5 5.3"/></svg>',
 grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 10v10M15 10v10"/></svg>',
 mega:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h3l9 5V4L7 9H4a1 1 0 0 0-1 1z"/><path d="M7 15l1.5 5"/><path d="M19.5 9.5a3.5 3.5 0 0 1 0 5"/></svg>',
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17 19 7"/></svg>',
 left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
 right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
 spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>'
};
const NAV=[
 {id:"inicio",label:"Início",icon:I.home},
 {id:"agenda",label:"Minha Agenda",icon:I.cal},
 {id:"escalas",label:"Escalas",icon:I.grid},
 {id:"equipe",label:"Equipe",icon:I.users,owner:true},
 {id:"comunicados",label:"Comunicados",icon:I.mega,owner:true},
 {id:"config",label:"Configurações",icon:I.gear,owner:true}
];
/* ---------- defaults (app configuration, editable by the coordinator) ---------- */
const DEFAULT_CONFIG={
 functions:[{id:"iluminacao",name:"Iluminação",qty:1},{id:"stories",name:"Stories",qty:1},{id:"foto",name:"Foto",qty:1},{id:"projecao",name:"Projeção",qty:1}],
 services:[{id:"manha",name:"Culto da Manhã",weekday:0,time:"09:00",place:"Templo Principal"},{id:"noite",name:"Culto da Noite",weekday:0,time:"19:00",place:"Templo Principal"}],
 events:[]
};
const WD=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const WDS=["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
const MONTHS=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const MON3=["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
const COLORS=["#1663f0","#7b4fe0","#e0721a","#14965a","#d23a7a","#0a8fa8","#8a5a2b","#4b5bd6"];

/* ---------- state ---------- */
const S={sb:null,session:null,authId:null,uid:null,isOwner:false,coords:new Set(),dbState:"loading",
 config:DEFAULT_CONFIG,members:{},escalas:{},comunicados:[],
 view:"inicio",weekStart:startOfWeek(new Date()),calMonth:firstOfMonth(new Date()),selDay:null,
 agendaFor:null,escMonth:firstOfMonth(addDays(lastOfMonth(new Date()),1)),editMember:null,myAvatar:null,myName:""};
try{const v=localStorage.getItem("dom.view");if(v&&NAV.some(n=>n.id===v))S.view=v;}catch(e){}

/* ---------- utils ---------- */
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function pad(n){return String(n).padStart(2,"0");}
function ymd(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function parse(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d);}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x;}
function startOfWeek(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());const w=(x.getDay()+6)%7;return addDays(x,-w);}
function firstOfMonth(d){return new Date(d.getFullYear(),d.getMonth(),1);}
function lastOfMonth(d){return new Date(d.getFullYear(),d.getMonth()+1,0);}
function monthKey(d){return d.getFullYear()+"-"+pad(d.getMonth()+1);}
function monthLabel(d){return MONTHS[d.getMonth()]+" de "+d.getFullYear();}
function today(){const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate());}
function uidGen(p){return p+Math.random().toString(36).slice(2,9);}
function initials(n){return (n||"?").trim().split(/\s+/).slice(0,2).map(w=>w[0]||"").join("").toUpperCase()||"?";}
function colorFor(id){let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))>>>0;return COLORS[h%COLORS.length];}
function cfg(){return S.config||DEFAULT_CONFIG;}
function fnName(id){const f=cfg().functions.find(x=>x.id===id);return f?f.name:id;}
function memberName(id){const m=S.members[id];return (m&&m.name)||"Sem nome";}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2600);}

/* occurrences (services + one-off events) between two dates inclusive */
function occurrences(from,to){
 const out=[];const c=cfg();
 for(let d=new Date(from);d<=to;d=addDays(d,1)){
  const key=ymd(d);
  c.services.filter(s=>Number(s.weekday)===d.getDay()).forEach(s=>out.push({key:key+"|"+s.id,date:key,d:new Date(d),svc:s.id,name:s.name,time:s.time,place:s.place||""}));
  (c.events||[]).filter(e=>e.date===key).forEach(e=>out.push({key:key+"|"+e.id,date:key,d:new Date(d),svc:e.id,name:e.name,time:e.time,place:e.place||"",oneoff:true}));
 }
 return out.sort((a,b)=>a.date===b.date?(a.time||"").localeCompare(b.time||""):a.date.localeCompare(b.date));
}
function isUnavail(m,date,svc){const u=(m&&m.unavailable)||[];return u.includes(date)||u.includes(date+"|"+svc);}
function escalaFor(date){return S.escalas[date.slice(0,7)];}
function visibleEscala(mk){const e=S.escalas[mk];if(!e)return null;if(e.published||S.isOwner)return e;return null;}
/* my assignments in a range (published only unless owner draft view) */
function assignmentsOf(mid,from,to,publishedOnly){
 const res=[];if(!mid)return res;
 occurrences(from,to).forEach(o=>{
  const e=S.escalas[o.date.slice(0,7)];if(!e||(publishedOnly&&!e.published))return;
  const a=(e.assignments||{})[o.key]||{};
  Object.keys(a).forEach(f=>{if((a[f]||[]).includes(mid))res.push({...o,fn:f,ckey:o.key+"|"+f});});
 });
 return res;
}

/* ---------- auto schedule ---------- */
function generate(month){
 const from=firstOfMonth(month),to=lastOfMonth(month);
 const occ=occurrences(from,to);const fns=cfg().functions;
 const members=Object.values(S.members).filter(m=>m.active!==false);
 const count={},lastD={},dayUse={};const assignments={};const gaps=[];
 members.forEach(m=>{count[m.id]=0;lastD[m.id]=null;});
 // order functions by scarcity so rare skills are filled first
 const scarcity=f=>members.filter(m=>(m.functions||[]).includes(f.id)).length;
 occ.forEach(o=>{
  const a={};const used=new Set();
  [...fns].sort((x,y)=>scarcity(x)-scarcity(y)).forEach(f=>{
   const need=Math.max(1,Number(f.qty)||1);
   const cands=members.filter(m=>(m.functions||[]).includes(f.id)&&!used.has(m.id)&&!isUnavail(m,o.date,o.svc))
    .map(m=>{let s=count[m.id]*10;if((dayUse[o.date]||[]).includes(m.id))s+=6;
      if(lastD[m.id]){const gap=(o.d-parse(lastD[m.id]))/864e5;if(gap<7)s+=3;}
      s+=Math.random()*2;return {m,s};})
    .sort((x,y)=>x.s-y.s);
   const picked=cands.slice(0,need).map(x=>x.m.id);
   picked.forEach(id=>{used.add(id);count[id]++;lastD[id]=o.date;(dayUse[o.date]=dayUse[o.date]||[]).push(id);});
   if(picked.length<need)gaps.push(o.key+"|"+f.id);
   a[f.id]=picked;
  });
  assignments[o.key]=a;
 });
 return {month:monthKey(month),assignments,published:false,generatedAt:new Date().toISOString(),gaps:gaps.length};
}

/* ---------- Supabase ---------- */
const CFG=window.DOM_CONFIG||{};
function errMsg(e){
 const m=(e&&(e.message||e.error_description))||"";
 if(/row-level security|permission/i.test(m))return "Você não tem permissão para isso. Fale com o coordenador.";
 if(/network|fetch/i.test(m))return "Sem conexão. Verifique a internet e tente de novo.";
 return "Não foi possível salvar agora. Tente de novo.";
}
async function q(promise){const {data,error}=await promise;if(error){console.error(error);toast(errMsg(error));scheduleReload();throw error;}return data;}
function rowToMember(r){return {id:r.id,user_id:r.user_id,name:r.name,functions:r.functions||[],unavailable:r.unavailable||[],confirmed:r.confirmed||[],active:r.active,manual:r.manual};}
async function loadAll(){
 const sb=S.sb;
 const [m,st,e,c,k]=await Promise.all([
  sb.from("members").select("*"),
  sb.from("settings").select("config").eq("id",1).maybeSingle(),
  sb.from("escalas").select("*"),
  sb.from("comunicados").select("*").order("created_at",{ascending:false}).limit(30),
  sb.from("coordinators").select("user_id")
 ]);
 const err=[m,st,e,c,k].find(x=>x.error);
 if(err){console.error(err.error);S.dbState="error";render();return;}
 S.members={};(m.data||[]).forEach(r=>S.members[r.id]=rowToMember(r));
 const mine=(m.data||[]).find(r=>r.user_id===S.authId);S.uid=mine?mine.id:null;
 S.config=st.data&&st.data.config?{...DEFAULT_CONFIG,...st.data.config}:DEFAULT_CONFIG;
 S.escalas={};(e.data||[]).forEach(r=>S.escalas[r.month]={month:r.month,assignments:r.assignments||{},published:r.published,gaps:r.gaps,generatedAt:r.generated_at});
 S.comunicados=(c.data||[]).map(r=>({id:r.id,title:r.title,body:r.body,tone:r.tone,createdAt:r.created_at}));
 S.coords=new Set((k.data||[]).map(r=>r.user_id));S.isOwner=S.coords.has(S.authId);
 if(S.isOwner&&!S.agendaFor)S.agendaFor=S.uid;
 S.dbState="ok";
}
let reloadT=null;
function scheduleReload(){clearTimeout(reloadT);reloadT=setTimeout(async()=>{await loadAll();renderSoon();},400);}
/* one write at a time per row; bursts collapse into the latest value */
const wq={};
function queued(key,fn){
 const qq=wq[key]||(wq[key]={busy:false,next:null});qq.next=fn;
 if(qq.busy)return Promise.resolve();
 return (async()=>{qq.busy=true;while(qq.next){const f=qq.next;qq.next=null;try{await f();}catch(e){}}qq.busy=false;})();
}

/* ---------- render ---------- */
const main=document.getElementById("main");
function navHtml(bottom){
 return NAV.filter(n=>!n.owner||S.isOwner).filter(n=>!bottom||n.id!=="config"||S.isOwner)
  .map(n=>`<button data-act="nav" data-id="${n.id}" ${S.view===n.id?'aria-current="page"':""}>${n.icon}<span>${bottom?n.label.replace("Minha ",""):n.label}</span></button>`).join("");
}
function me(){return S.uid?S.members[S.uid]:null;}
let pendingRender=false;
function render(){
 pendingRender=false;
 {const nv=NAV.find(n=>n.id===S.view);if(!nv||(nv.owner&&!S.isOwner))S.view="inicio";}
 document.getElementById("nav").innerHTML=navHtml(false);
 document.getElementById("bottom").innerHTML=navHtml(true);
 const v={inicio:vInicio,agenda:vAgenda,escalas:vEscalas,equipe:vEquipe,comunicados:vComunicados,config:vConfig}[S.view]||vInicio;
 main.innerHTML=topbar()+v();
}
/* live updates wait while someone is typing in a form */
function renderSoon(){
 const a=document.activeElement;
 if(a&&main.contains(a)&&/^(INPUT|TEXTAREA)$/.test(a.tagName)){pendingRender=true;return;}
 if([...main.querySelectorAll("form[data-form='com'] input, form[data-form='com'] textarea")].some(x=>x.value)){pendingRender=true;return;}
 render();
}
main.addEventListener("focusout",()=>setTimeout(()=>{if(pendingRender&&!(document.activeElement&&main.contains(document.activeElement)&&/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)))renderSoon();},50));
function topbar(){
 const m=me();const name=(m&&m.name)||S.myName||"Visitante";
 const title=(NAV.find(n=>n.id===S.view)||NAV[0]).label;
 const av=S.myAvatar?`<img src="${esc(S.myAvatar)}" alt="">`:`<span class="av" style="background:${colorFor(S.uid||"x")};width:40px;height:40px">${esc(initials(name))}</span>`;
 return `<div class="top"><h2>${S.view==="inicio"?"":esc(title)}</h2><div class="who">${av}<div><b>${esc(name)}</b><small>${S.isOwner?"Coordenador":(m?"Membro":"Novo por aqui")}</small></div><button class="btn ghost" data-act="logout" style="padding:8px 12px">Sair</button></div></div>`;
}
function statusBanner(){
 if(S.dbState==="loading")return `<div class="card empty">Carregando dados do ministério…</div>`;
 if(S.dbState==="error")return `<div class="banner t-bad"><div><b>Não foi possível carregar os dados</b><p>Confira a internet e se o arquivo schema.sql foi executado no Supabase. Depois recarregue a página.</p></div></div>`;
 const claim=S.dbState==="ok"&&S.coords.size===0?`<div class="banner t-blue"><div><b>Ninguém é coordenador ainda</b><p>Se você é quem vai gerar as escalas, assuma a coordenação. Depois você pode nomear outros coordenadores na aba Equipe.</p></div><button class="btn" data-act="claim">Sou o coordenador</button></div>`:"";
 if(S.dbState==="ok"&&!me()){
  const fns=cfg().functions;
  return claim+`<div class="card"><div class="card-h"><h3>${I.users} Entre na equipe de mídia</h3></div>
   <form class="form" data-form="join">
    <label class="f" for="join-name">Seu nome<input id="join-name" type="text" required maxlength="60" value="${esc(S.myName)}" placeholder="Como a equipe te chama"></label>
    <div class="f" style="display:grid;gap:6px;font-weight:600;font-size:13px">Em quais funções você serve?
     <div class="chips" id="join-fns">${fns.map(f=>`<button type="button" class="chip" data-act="chipToggle" aria-pressed="false" data-val="${esc(f.id)}">${esc(f.name)}</button>`).join("")}</div></div>
    <div><button class="btn" type="submit">Entrar na equipe</button></div>
   </form></div>`;
 }
 return claim;
}
function greeting(){const h=new Date().getHours();return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite";}

function vInicio(){
 const m=me();const t=today();
 const first=(((m&&m.name)||S.myName||"").split(" ")[0]);
 const monthFrom=firstOfMonth(t),monthTo=lastOfMonth(t);
 const myMonth=assignmentsOf(S.uid,monthFrom,monthTo,!S.isOwner);
 const upcomingMine=assignmentsOf(S.uid,t,addDays(t,60),true);
 const pend=upcomingMine.filter(a=>!((m&&m.confirmed)||[]).includes(a.ckey));
 const active=Object.values(S.members).filter(x=>x.active!==false).length;
 const next30=occurrences(t,addDays(t,30));
 const next=occurrences(t,addDays(t,45)).slice(0,4);
 const ws=S.weekStart,we=addDays(ws,6);
 const occW=occurrences(ws,we);
 const myW=assignmentsOf(S.uid,ws,we,!S.isOwner);
 let week="";
 for(let i=0;i<7;i++){
  const d=addDays(ws,i),k=ymd(d);
  const dayOcc=occW.filter(o=>o.date===k);
  const fullOff=m&&(m.unavailable||[]).includes(k);
  week+=`<div class="wday ${k===ymd(t)?"today":""} ${fullOff?"off":""}"><header>${WDS[d.getDay()]}<b>${pad(d.getDate())}</b></header>`+
   dayOcc.map(o=>{const mine=myW.filter(a=>a.key===o.key);const blocked=m&&isUnavail(m,o.date,o.svc);
    return `<div class="ev ${mine.length?"mine":""} ${blocked&&!mine.length?"blocked":""}"><b>${esc(o.name)}</b><small>${esc(o.time)}${mine.length?" · "+mine.map(a=>esc(fnName(a.fn))).join(", "):blocked?" · indisponível":""}</small></div>`;}).join("")+
   `</div>`;
 }
 const coms=S.comunicados.slice(0,3);
 return statusBanner()+`
 <section class="hero"><div><h1>${greeting()}${first?", "+esc(first):""}!</h1><p>Organização, comunhão e excelência para servir melhor.</p></div>
  <div class="verse">“Tudo o que fizerem, façam de todo o coração, como para o Senhor.”<small>Colossenses 3:23</small></div></section>
 <section class="stats">
  <div class="stat"><div class="ic t-blue">${I.cal}</div><div><b>${myMonth.length}</b><span>Minhas escalas no mês</span></div></div>
  <div class="stat"><div class="ic t-violet">${I.users}</div><div><b>${active}</b><span>Membros ativos</span></div></div>
  <div class="stat"><div class="ic t-warn">${I.clock}</div><div><b>${pend.length}</b><span>Pendências</span></div></div>
  <div class="stat"><div class="ic t-ok">${I.cal}</div><div><b>${next30.length}</b><span>Cultos nos próximos 30 dias</span></div></div>
 </section>
 <div class="grid-home">
  <div class="col">
   <div class="card"><div class="card-h"><h3>${I.cal}<span>Minha semana<small>${pad(ws.getDate())}/${pad(ws.getMonth()+1)} – ${pad(we.getDate())}/${pad(we.getMonth()+1)} de ${we.getFullYear()}</small></span></h3>
    <div class="row"><button class="iconbtn" data-act="week" data-d="-7" aria-label="Semana anterior">${I.left}</button><button class="iconbtn" data-act="week" data-d="7" aria-label="Próxima semana">${I.right}</button><button class="btn ghost" data-act="nav" data-id="agenda">Marcar indisponibilidade</button></div></div>
    <div class="week">${week}</div></div>
   <div class="card"><div class="card-h"><h3>${I.mega} Comunicados recentes</h3>${S.isOwner?`<button class="link" data-act="nav" data-id="comunicados">Ver todos</button>`:""}</div>
    ${coms.length?`<div class="list">${coms.map(c=>`<div class="li"><span class="dot" style="background:${c.tone==="urgente"?"var(--bad)":c.tone==="info"?"var(--accent)":"var(--ok)"}"></span><div class="txt"><b>${esc(c.title)}</b></div><small style="color:var(--muted)">${esc(ago(c.createdAt))}</small></div>`).join("")}</div>`:`<div class="empty">Nenhum comunicado ainda. ${S.isOwner?"Publique o primeiro na aba Comunicados.":""}</div>`}
   </div>
  </div>
  <div class="col">
   <div class="card"><div class="card-h"><h3>${I.cal} Próximos cultos</h3><button class="link" data-act="nav" data-id="escalas">Ver escala</button></div>
    ${next.length?`<div class="list">${next.map(o=>{const mine=upcomingMine.filter(a=>a.key===o.key);return `<div class="li"><div class="dt"><b>${pad(o.d.getDate())}</b><small>${MON3[o.d.getMonth()]}</small></div><div class="txt"><b>${esc(o.name)}</b><small>${WD[o.d.getDay()]} · ${esc(o.time)}</small><small>${mine.length?`<span class="tag t-blue">Você: ${mine.map(a=>esc(fnName(a.fn))).join(", ")}</span>`:esc(o.place)}</small></div></div>`;}).join("")}</div>`:`<div class="empty">Nenhum culto configurado.</div>`}
   </div>
   <div class="card"><div class="card-h"><h3>${I.clock} Pendências</h3></div>
    ${pend.length?`<div class="list">${pend.slice(0,6).map(a=>`<div class="li"><button class="chk" data-act="confirm" data-k="${esc(a.ckey)}" aria-label="Confirmar presença"></button><div class="txt"><b>Confirmar presença · ${pad(a.d.getDate())}/${pad(a.d.getMonth()+1)}</b><small>${esc(a.name)} · ${esc(fnName(a.fn))}</small></div></div>`).join("")}</div>`:`<div class="empty">Tudo em dia. Quando você for escalado, a confirmação aparece aqui.</div>`}
   </div>
   <div class="training"><small>LEMBRETE</small><b style="font-family:var(--f-display);font-size:20px">Agenda do próximo mês</b><span>Marque seus dias indisponíveis antes da escala de ${MONTHS[(t.getMonth()+1)%12]} ser gerada.</span><div><button class="btn" style="background:#fff;color:#0b3fb4;margin-top:6px" data-act="nav" data-id="agenda">Abrir minha agenda</button></div></div>
  </div>
 </div>`;
}
function ago(iso){if(!iso)return"";const s=(Date.now()-new Date(iso))/1000;if(s<3600)return "há "+Math.max(1,Math.round(s/60))+" min";if(s<86400)return "há "+Math.round(s/3600)+" h";const d=Math.round(s/86400);return "há "+d+(d===1?" dia":" dias");}

function vAgenda(){
 const target=S.isOwner&&S.agendaFor?S.agendaFor:S.uid;
 const m=S.members[target];
 const mo=S.calMonth,first=firstOfMonth(mo),start=startOfWeek(first),t=today();
 const occ=occurrences(start,addDays(start,41));
 const mine=assignmentsOf(target,start,addDays(start,41),!S.isOwner);
 let cells=["SEG","TER","QUA","QUI","SEX","SÁB","DOM"].map(d=>`<div class="dow">${d}</div>`).join("");
 for(let i=0;i<42;i++){
  const d=addDays(start,i),k=ymd(d);
  if(i>=35&&d.getMonth()!==mo.getMonth())break;
  const dOcc=occ.filter(o=>o.date===k);
  const full=m&&(m.unavailable||[]).includes(k);
  const part=!full&&m&&dOcc.some(o=>isUnavail(m,k,o.svc));
  const past=d<t;
  cells+=`<button class="day ${d.getMonth()!==mo.getMonth()?"out":""} ${past?"past":""} ${k===ymd(t)?"today":""} ${full?"full":""} ${part?"part":""} ${S.selDay===k?"sel":""}" data-act="selDay" data-k="${k}" ${past?"disabled":""} aria-label="${d.getDate()} de ${MONTHS[d.getMonth()]}">
   <span class="n">${d.getDate()}</span>
   ${dOcc.map(o=>{const x=m&&isUnavail(m,k,o.svc);const me_=mine.some(a=>a.key===o.key);return `<span class="pill ${x?"x":""} ${me_?"me":""}">${esc(o.time)} ${esc(o.name.replace(/^Culto d[aoe] /,""))}</span>`;}).join("")}
   <span class="marks">${dOcc.map(o=>`<span class="dot" style="background:${m&&isUnavail(m,k,o.svc)?"var(--bad)":mine.some(a=>a.key===o.key)?"var(--accent)":"var(--muted)"}"></span>`).join("")}</span>
  </button>`;
 }
 const ownerPick=S.isOwner?`<label class="f" for="agenda-for" style="min-width:220px">Agenda de<select id="agenda-for" data-act="agendaFor">${Object.values(S.members).sort((a,b)=>(a.name||"").localeCompare(b.name||"")).map(x=>`<option value="${esc(x.id)}" ${x.id===target?"selected":""}>${esc(x.name)}${x.id===S.uid?" (você)":""}</option>`).join("")}</select></label>`:"";
 const monthUn=m?(m.unavailable||[]).filter(u=>u.startsWith(monthKey(mo))).length:0;
 let panel;
 if(!m){panel=`<div class="card"><div class="empty">${S.dbState==="ok"?"Complete seu cadastro na página Início para marcar suas indisponibilidades.":"Entre com sua conta para marcar indisponibilidades."}</div></div>`;}
 else if(!S.selDay){panel=`<div class="card"><div class="card-h"><h3>Como funciona</h3></div><p style="margin:0;color:var(--muted)">Toque em um dia para marcar que você não pode servir. Você pode bloquear o dia todo ou só um culto. A escala automática nunca coloca você em um culto marcado como indisponível.</p><p style="margin:12px 0 0"><b>${monthUn}</b> <span style="color:var(--muted)">marcação(ões) em ${MONTHS[mo.getMonth()]}</span></p></div>`;}
 else{
  const k=S.selDay,d=parse(k),dOcc=occ.filter(o=>o.date===k);const full=(m.unavailable||[]).includes(k);
  const escKey=escalaFor(k);
  panel=`<div class="card"><div class="card-h"><h3>${WD[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}</h3></div><div class="form">
   <button class="toggle" data-act="unav" data-k="${k}" aria-pressed="${full}"><span><b>Indisponível o dia todo</b><br><small style="color:var(--muted)">Bloqueia todos os cultos e eventos deste dia</small></span><span class="sw2"></span></button>
   ${dOcc.map(o=>{const on=full||(m.unavailable||[]).includes(k+"|"+o.svc);return `<button class="toggle" data-act="unav" data-k="${k}|${esc(o.svc)}" aria-pressed="${on}" ${full?"disabled":""}><span><b>${esc(o.name)}</b><br><small style="color:var(--muted)">${esc(o.time)} · ${esc(o.place)}</small></span><span class="sw2"></span></button>`;}).join("")}
   ${escKey&&escKey.published?`<p class="badge t-warn" style="margin:0">A escala deste mês já foi publicada. Avise o coordenador se mudar algo.</p>`:""}
  </div></div>`;
 }
 return statusBanner()+selfForm()+`<div class="split"><div class="card"><div class="card-h"><h3>${I.cal}<span>${monthLabel(mo).replace(/^./,c=>c.toUpperCase())}<small>${S.isOwner&&target!==S.uid?"Editando a agenda de "+esc(memberName(target)):"Seus dias indisponíveis"}</small></span></h3>
   <div class="row">${ownerPick}${me()&&!S.editSelf?`<button class="btn ghost" data-act="editSelf">Minhas funções</button>`:""}<button class="iconbtn" data-act="month" data-d="-1" aria-label="Mês anterior">${I.left}</button><button class="iconbtn" data-act="month" data-d="1" aria-label="Próximo mês">${I.right}</button></div></div>
   <div class="cal">${cells}</div>
   <div class="legend" style="margin-top:12px"><span><i class="sw" style="background:var(--bad-soft);border-color:var(--bad)"></i>Dia indisponível</span><span><i class="sw" style="background:var(--warn-soft);border-color:var(--warn)"></i>Culto indisponível</span><span><i class="sw" style="background:var(--accent)"></i>Você está escalado</span></div>
  </div>${panel}</div>`;
}

function vEscalas(){
 const mo=S.escMonth,mk=monthKey(mo);
 const e=visibleEscala(mk);const fns=cfg().functions;
 const occ=occurrences(firstOfMonth(mo),lastOfMonth(mo));
 const members=Object.values(S.members).filter(x=>x.active!==false).sort((a,b)=>(a.name||"").localeCompare(b.name||""));
 let body;
 if(!e){
  body=`<div class="empty">${S.isOwner?`Nenhuma escala gerada para ${MONTHS[mo.getMonth()]}. ${Object.keys(S.members).length?"Clique em <b>Gerar escala</b> quando a equipe tiver marcado as indisponibilidades.":"Cadastre membros na aba Equipe primeiro."}`:`A escala de ${MONTHS[mo.getMonth()]} ainda não foi publicada pelo coordenador.`}</div>`;
 } else {
  let conflicts=0,gaps=0;
  const rows=occ.map(o=>{
   const a=(e.assignments||{})[o.key]||{};
   return `<tr><td><b>${pad(o.d.getDate())}/${pad(o.d.getMonth()+1)}</b> <small style="color:var(--muted)">${WDS[o.d.getDay()]}</small><br><span>${esc(o.name)}</span><br><small style="color:var(--muted)">${esc(o.time)}</small></td>`+
   fns.map(f=>{const ids=a[f.id]||[];const need=Math.max(1,Number(f.qty)||1);
    if(S.isOwner){
     let sel="";for(let i=0;i<need;i++){const cur=ids[i]||"";const bad=cur&&isUnavail(S.members[cur],o.date,o.svc);if(bad)conflicts++;if(!cur)gaps++;
      sel+=`<select id="sel-${esc(o.key)}-${esc(f.id)}-${i}" data-act="assign" data-o="${esc(o.key)}" data-f="${esc(f.id)}" data-i="${i}" aria-label="${esc(f.name)}" style="${bad?"border-color:var(--bad);color:var(--bad)":!cur?"border-color:var(--warn)":""}"><option value="">— vazio —</option>${members.filter(x=>(x.functions||[]).includes(f.id)||x.id===cur).map(x=>`<option value="${esc(x.id)}" ${x.id===cur?"selected":""}>${esc(x.name)}${isUnavail(x,o.date,o.svc)?" (indisp.)":""}</option>`).join("")}</select>`;}
     return `<td><div class="who-cell">${sel}</div></td>`;
    }
    return `<td>${ids.length?ids.map(id=>`<div class="row" style="gap:6px"><span class="av" style="width:24px;height:24px;font-size:10px;background:${colorFor(id)}">${esc(initials(memberName(id)))}</span><span ${id===S.uid?'style="font-weight:700;color:var(--accent)"':""}>${esc(memberName(id))}</span></div>`).join(""):`<span class="badge t-warn">A definir</span>`}</td>`;
   }).join("")+`</tr>`;}).join("");
  const status=S.isOwner?`<div class="row" style="margin-bottom:12px"><span class="badge ${e.published?"t-ok":"t-warn"}">${e.published?"Publicada para a equipe":"Rascunho — só coordenadores veem"}</span>${gaps?`<span class="badge t-warn">${gaps} vaga(s) sem pessoa</span>`:""}${conflicts?`<span class="badge t-bad">${conflicts} conflito(s) com indisponibilidade</span>`:""}</div>`:"";
  body=status+`<div class="tbl-wrap"><table><thead><tr><th>Culto</th>${fns.map(f=>`<th>${esc(f.name)}</th>`).join("")}</tr></thead><tbody>${rows||`<tr><td colspan="${fns.length+1}" class="empty">Nenhum culto neste mês.</td></tr>`}</tbody></table></div>`;
 }
 // summary per member for owner
 let summary="";
 if(S.isOwner&&e){
  const cnt={};Object.values(e.assignments||{}).forEach(a=>Object.values(a).forEach(ids=>(ids||[]).forEach(id=>cnt[id]=(cnt[id]||0)+1)));
  summary=`<div class="card"><div class="card-h"><h3>Distribuição no mês</h3></div><div class="list">${members.map(x=>`<div class="li"><span class="av" style="width:30px;height:30px;font-size:12px;background:${colorFor(x.id)}">${esc(initials(x.name))}</span><div class="txt"><b>${esc(x.name)}</b><small>${(x.functions||[]).map(fnName).map(esc).join(", ")||"Sem função"}</small></div><b style="font-variant-numeric:tabular-nums">${cnt[x.id]||0}</b></div>`).join("")||`<div class="empty">Sem membros.</div>`}</div></div>`;
 }
 const actions=S.isOwner?`<button class="btn" data-act="gen">${I.spark.replace("<svg",'<svg width="18" height="18"')} ${e?"Gerar de novo":"Gerar escala"}</button>${e?`<button class="btn ghost" data-act="pub">${e.published?"Despublicar":"Publicar"}</button>`:""}${e?`<button class="btn ghost" data-act="copy">Copiar texto</button>`:""}`:(e?`<button class="btn ghost" data-act="copy">Copiar texto</button>`:"");
 return statusBanner()+`<div class="${summary?"split":""}"><div class="card"><div class="card-h"><h3>${I.grid}<span>Escala de ${monthLabel(mo)}<small>Gerada automaticamente a partir das indisponibilidades</small></span></h3>
  <div class="row"><button class="iconbtn" data-act="emonth" data-d="-1" aria-label="Mês anterior">${I.left}</button><button class="iconbtn" data-act="emonth" data-d="1" aria-label="Próximo mês">${I.right}</button>${actions}</div></div>
  <div id="gen-confirm"></div>${body}</div>${summary}</div>`;
}

function vEquipe(){
 const mk=monthKey(today());
 const list=Object.values(S.members).sort((a,b)=>(a.name||"").localeCompare(b.name||""));
 const e=S.escalas[mk];const cnt={};
 if(e&&(e.published||S.isOwner))Object.values(e.assignments||{}).forEach(a=>Object.values(a).forEach(ids=>(ids||[]).forEach(id=>cnt[id]=(cnt[id]||0)+1)));
 const fns=cfg().functions;
 const edit=S.editMember!=null?(S.editMember==="new"?{id:"",name:"",functions:[],active:true}:S.members[S.editMember]):null;
 const form=S.isOwner&&edit?`<div class="card"><div class="card-h"><h3>${edit.id?"Editar membro":"Novo membro"}</h3></div><form class="form" data-form="member" data-id="${esc(edit.id)}">
   <label class="f" for="mem-name">Nome<input id="mem-name" type="text" required maxlength="60" value="${esc(edit.name)}"></label>
   <div style="display:grid;gap:6px;font-weight:600;font-size:13px">Funções<div class="chips" id="mem-fns">${fns.map(f=>`<button type="button" class="chip" data-act="chipToggle" data-val="${esc(f.id)}" aria-pressed="${(edit.functions||[]).includes(f.id)}">${esc(f.name)}</button>`).join("")}</div></div>
   <button type="button" class="toggle" id="mem-active" data-act="activeToggle" aria-pressed="${edit.active===false}"><span><b>Pausado</b><br><small style="color:var(--muted)">Não entra nas próximas escalas</small></span><span class="sw2"></span></button>
   ${edit.user_id&&edit.user_id!==S.authId?`<button type="button" class="toggle coord" id="mem-coord" data-act="activeToggle" aria-pressed="${S.coords.has(edit.user_id)}"><span><b>Coordenador</b><br><small style="color:var(--muted)">Pode gerar escalas, editar a equipe e publicar comunicados</small></span><span class="sw2"></span></button>`:""}
   <div class="row"><button class="btn" type="submit">Salvar</button><button class="btn ghost" type="button" data-act="editMember" data-id="">Cancelar</button>${edit.id&&edit.id!==S.uid?`<button class="btn danger" type="button" data-act="removeMember" data-id="${esc(edit.id)}">Remover</button>`:""}</div>
   ${!edit.id?`<small style="color:var(--muted)">Use para quem ainda não entrou no portal. Você poderá marcar as indisponibilidades dessa pessoa em Minha Agenda.</small>`:""}
  </form></div>`:"";
 const cards=list.map(x=>{const un=(x.unavailable||[]).filter(u=>u.startsWith(mk)).length;
  return `<div class="card mcard"><div class="hd"><span class="av" style="background:${colorFor(x.id)}">${esc(initials(x.name))}</span><div style="min-width:0"><b style="display:block">${esc(x.name)}${x.id===S.uid?" <small style='color:var(--muted)'>(você)</small>":""}</b><small style="color:var(--muted)">${x.active===false?"Pausado":x.manual?"Cadastrado pelo coordenador":"Ativo"}</small></div></div>
   <div class="chips">${(x.functions||[]).map(f=>`<span class="tag t-blue">${esc(fnName(f))}</span>`).join("")||`<span class="tag t-warn">Sem função</span>`}</div>
   <div class="mini"><span><b>${cnt[x.id]||0}</b> escalas no mês</span><span><b>${un}</b> indisponibilidades</span></div>
   ${S.isOwner||x.id===S.uid?`<div class="row">${S.isOwner?`<button class="btn ghost" data-act="editMember" data-id="${esc(x.id)}">Editar</button><button class="btn ghost" data-act="agendaOf" data-id="${esc(x.id)}">Agenda</button>`:`<button class="btn ghost" data-act="editSelf">Minhas funções</button>`}</div>`:""}
  </div>`;}).join("");
 const self="";
 return statusBanner()+form+self+`<div class="card-h" style="margin:0"><h3>${I.users}<span>Equipe de mídia<small>${list.length} pessoa(s)</small></span></h3>${S.isOwner?`<button class="btn" data-act="editMember" data-id="new">Adicionar membro</button>`:""}</div>
 ${list.length?`<div class="members">${cards}</div>`:`<div class="card empty">Ninguém na equipe ainda. Os membros aparecem aqui quando criam a conta no portal${S.isOwner?" ou quando você os adiciona":""}.</div>`}`;
}

function selfForm(){const fns=cfg().functions;return S.editSelf&&me()?`<div class="card"><div class="card-h"><h3>Minhas funções</h3></div><form class="form" data-form="self"><label class="f" for="self-name">Nome<input id="self-name" type="text" required maxlength="60" value="${esc(me().name)}"></label><div class="chips" id="self-fns">${fns.map(f=>`<button type="button" class="chip" data-act="chipToggle" data-val="${esc(f.id)}" aria-pressed="${(me().functions||[]).includes(f.id)}">${esc(f.name)}</button>`).join("")}</div><div class="row"><button class="btn" type="submit">Salvar</button><button class="btn ghost" type="button" data-act="editSelf">Cancelar</button></div></form></div>`:"";}
function vComunicados(){
 const form=S.isOwner?`<div class="card"><div class="card-h"><h3>${I.mega} Novo comunicado</h3></div><form class="form" data-form="com">
  <label class="f" for="com-title">Título<input id="com-title" type="text" required maxlength="90" placeholder="Ex.: Alteração na escala de domingo"></label>
  <label class="f" for="com-body">Mensagem<textarea id="com-body" maxlength="1500"></textarea></label>
  <label class="f" for="com-tone">Tipo<select id="com-tone"><option value="info">Informativo</option><option value="urgente">Urgente</option><option value="geral">Geral</option></select></label>
  <div><button class="btn" type="submit">Publicar comunicado</button></div></form></div>`:"";
 const list=S.comunicados.map(c=>`<div class="card"><div class="row" style="justify-content:space-between"><div class="row"><span class="dot" style="background:${c.tone==="urgente"?"var(--bad)":c.tone==="info"?"var(--accent)":"var(--ok)"}"></span><h3 style="font-size:17px">${esc(c.title)}</h3></div><small style="color:var(--muted)">${esc(ago(c.createdAt))}</small></div>${c.body?`<p style="white-space:pre-wrap;margin:10px 0 0;max-width:70ch">${esc(c.body)}</p>`:""}${S.isOwner?`<div style="margin-top:10px"><button class="link" data-act="delCom" data-id="${esc(c.id)}" style="color:var(--bad)">Excluir</button></div>`:""}</div>`).join("");
 return statusBanner()+`<div class="split"><div class="col">${list||`<div class="card empty">Nenhum comunicado publicado.</div>`}</div><div class="col">${form}</div></div>`;
}

function vConfig(){
 const c=cfg();
 return `<div class="card"><div class="card-h"><h3>${I.cal}<span>Cultos semanais<small>Cada culto recorrente entra na escala automática</small></span></h3><button class="btn ghost" data-act="addSvc">Adicionar culto</button></div>
  <div class="form">${c.services.map((s,i)=>`<div class="cfg-row">
   <label class="f" for="svc-n-${i}">Nome<input id="svc-n-${i}" type="text" data-cfg="services.${i}.name" value="${esc(s.name)}"></label>
   <label class="f" for="svc-w-${i}">Dia<select id="svc-w-${i}" data-cfg="services.${i}.weekday">${WD.map((w,j)=>`<option value="${j}" ${Number(s.weekday)===j?"selected":""}>${w}</option>`).join("")}</select></label>
   <label class="f" for="svc-t-${i}">Horário<input id="svc-t-${i}" type="time" data-cfg="services.${i}.time" value="${esc(s.time)}"></label>
   <button class="btn danger" data-act="rmCfg" data-list="services" data-i="${i}" aria-label="Remover culto">Remover</button></div>`).join("")}</div></div>
 <div class="card"><div class="card-h"><h3>${I.users}<span>Funções<small>Quantas pessoas por culto em cada função</small></span></h3><button class="btn ghost" data-act="addFn">Adicionar função</button></div>
  <div class="form">${c.functions.map((f,i)=>`<div class="cfg-row" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr) auto">
   <label class="f" for="fn-n-${i}">Função<input id="fn-n-${i}" type="text" data-cfg="functions.${i}.name" value="${esc(f.name)}"></label>
   <label class="f" for="fn-q-${i}">Pessoas<input id="fn-q-${i}" type="number" min="1" max="6" data-cfg="functions.${i}.qty" value="${esc(f.qty||1)}"></label>
   <button class="btn danger" data-act="rmCfg" data-list="functions" data-i="${i}">Remover</button></div>`).join("")}</div></div>
 <div class="card"><div class="card-h"><h3>${I.spark}<span>Eventos especiais<small>Ensaios, lives e cultos fora da rotina também recebem escala</small></span></h3><button class="btn ghost" data-act="addEv">Adicionar evento</button></div>
  <div class="form">${(c.events||[]).length?(c.events||[]).map((e,i)=>`<div class="cfg-row">
   <label class="f" for="ev-n-${i}">Nome<input id="ev-n-${i}" type="text" data-cfg="events.${i}.name" value="${esc(e.name)}"></label>
   <label class="f" for="ev-d-${i}">Data<input id="ev-d-${i}" type="date" data-cfg="events.${i}.date" value="${esc(e.date)}"></label>
   <label class="f" for="ev-t-${i}">Horário<input id="ev-t-${i}" type="time" data-cfg="events.${i}.time" value="${esc(e.time)}"></label>
   <button class="btn danger" data-act="rmCfg" data-list="events" data-i="${i}">Remover</button></div>`).join(""):`<div class="empty">Nenhum evento especial.</div>`}</div></div>`;
}

/* ---------- actions ---------- */
function memberFields(m){return {name:m.name,functions:m.functions||[],unavailable:m.unavailable||[],confirmed:m.confirmed||[],active:m.active!==false};}
function saveMember(m){S.members[m.id]=m;render();
 return queued("m:"+m.id,()=>q(S.sb.from("members").update(memberFields(m)).eq("id",m.id)));}
async function createMember(fields){
 const row=await q(S.sb.from("members").insert(fields).select().single());
 S.members[row.id]=rowToMember(row);if(row.user_id===S.authId)S.uid=row.id;render();return row;}
function saveConfig(c){S.config=c;render();return queued("cfg",()=>q(S.sb.from("settings").upsert({id:1,config:c,updated_at:new Date().toISOString()})));}
function cloneCfg(){return JSON.parse(JSON.stringify(cfg()));}
function saveEscala(mk,e){S.escalas[mk]=e;render();return queued("e:"+mk,()=>q(S.sb.from("escalas").upsert({month:mk,assignments:e.assignments,published:!!e.published,gaps:e.gaps||0,generated_at:e.generatedAt||new Date().toISOString()})));}

document.addEventListener("click",async ev=>{
 const b=ev.target.closest("[data-act]");if(!b||b.tagName==="SELECT")return;
 const a=b.dataset.act;
 if(a==="nav"){S.view=b.dataset.id;S.selDay=null;try{localStorage.setItem("dom.view",S.view);}catch(e){}render();window.scrollTo(0,0);return;}
 if(a==="logout"){await S.sb.auth.signOut();return;}
 if(a==="claim"){try{await q(S.sb.rpc("claim_first_coordinator"));await loadAll();render();toast("Agora você é o coordenador");}catch(e){}return;}
 if(a==="week"){S.weekStart=addDays(S.weekStart,Number(b.dataset.d));render();return;}
 if(a==="month"){S.calMonth=new Date(S.calMonth.getFullYear(),S.calMonth.getMonth()+Number(b.dataset.d),1);S.selDay=null;render();return;}
 if(a==="emonth"){S.escMonth=new Date(S.escMonth.getFullYear(),S.escMonth.getMonth()+Number(b.dataset.d),1);render();return;}
 if(a==="selDay"){S.selDay=b.dataset.k;render();return;}
 if(a==="chipToggle"){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");return;}
 if(a==="activeToggle"){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");return;}
 if(a==="unav"){
  const target=S.isOwner&&S.agendaFor?S.agendaFor:S.uid;const m=S.members[target];if(!m)return;
  const k=b.dataset.k;const u=new Set(m.unavailable||[]);
  if(u.has(k))u.delete(k);else{u.add(k);if(!k.includes("|"))[...u].forEach(x=>{if(x.startsWith(k+"|"))u.delete(x);});}
  // prune past dates
  const tk=ymd(today());
  saveMember({...m,unavailable:[...u].filter(x=>x.slice(0,10)>=tk).sort()});return;
 }
 if(a==="confirm"){const m=me();if(!m)return;const c=new Set(m.confirmed||[]);c.add(b.dataset.k);
  const tk=ymd(today());saveMember({...m,confirmed:[...c].filter(x=>x.slice(0,10)>=tk)});toast("Presença confirmada");return;}
 if(a==="gen"){
  const mk=monthKey(S.escMonth);const box=document.getElementById("gen-confirm");
  if(S.escalas[mk]&&!b.dataset.sure){box.innerHTML=`<div class="banner t-warn" style="margin-bottom:12px"><div><b>Gerar de novo?</b><p>A escala atual de ${MONTHS[S.escMonth.getMonth()]} e os ajustes manuais serão substituídos.</p></div><div class="row"><button class="btn" data-act="gen" data-sure="1">Substituir</button><button class="btn ghost" data-act="cancelGen">Cancelar</button></div></div>`;return;}
  if(!Object.keys(S.members).length){toast("Cadastre membros antes de gerar.");return;}
  const e=generate(S.escMonth);const prev=S.escalas[mk];if(prev&&prev.published)e.published=true;
  await saveEscala(mk,e);toast(e.gaps?`Escala gerada · ${e.gaps} vaga(s) sem pessoa disponível`:"Escala gerada");return;
 }
 if(a==="cancelGen"){document.getElementById("gen-confirm").innerHTML="";return;}
 if(a==="pub"){const mk=monthKey(S.escMonth);const e=S.escalas[mk];if(!e)return;await saveEscala(mk,{...e,published:!e.published});toast(e.published?"Escala voltou a rascunho":"Escala publicada para a equipe");return;}
 if(a==="copy"){
  const mk=monthKey(S.escMonth);const e=visibleEscala(mk);if(!e)return;
  const lines=["Escala Mídia · "+monthLabel(S.escMonth),""];
  occurrences(firstOfMonth(S.escMonth),lastOfMonth(S.escMonth)).forEach(o=>{const as=(e.assignments||{})[o.key]||{};
   lines.push(`${pad(o.d.getDate())}/${pad(o.d.getMonth()+1)} ${WDS[o.d.getDay()]} · ${o.name} ${o.time}`);
   cfg().functions.forEach(f=>lines.push(`  ${f.name}: ${(as[f.id]||[]).map(memberName).join(", ")||"a definir"}`));lines.push("");});
  try{await navigator.clipboard.writeText(lines.join("\n"));toast("Escala copiada. Cole no grupo do WhatsApp.");}catch(err){toast("Não foi possível copiar neste navegador.");}
  return;
 }
 if(a==="editMember"){S.editMember=b.dataset.id||null;render();window.scrollTo(0,0);return;}
 if(a==="editSelf"){S.editSelf=!S.editSelf;render();return;}
 if(a==="agendaOf"){S.agendaFor=b.dataset.id;S.view="agenda";S.selDay=null;render();window.scrollTo(0,0);return;}
 if(a==="removeMember"){
  if(b.dataset.sure!=="1"){b.dataset.sure="1";b.textContent="Confirmar remoção";return;}
  const id=b.dataset.id;delete S.members[id];S.editMember=null;render();try{await q(S.sb.from("members").delete().eq("id",id));}catch(e){}toast("Membro removido");return;
 }
 if(a==="delCom"){
  if(b.dataset.sure!=="1"){b.dataset.sure="1";b.textContent="Confirmar exclusão";return;}
  const id=b.dataset.id;S.comunicados=S.comunicados.filter(c=>c.id!==id);render();try{await q(S.sb.from("comunicados").delete().eq("id",id));}catch(e){}return;
 }
 if(a==="addSvc"){const c=cloneCfg();c.services.push({id:uidGen("s"),name:"Novo culto",weekday:3,time:"20:00",place:"Templo Principal"});saveConfig(c);return;}
 if(a==="addFn"){const c=cloneCfg();c.functions.push({id:uidGen("f"),name:"Nova função",qty:1});saveConfig(c);return;}
 if(a==="addEv"){const c=cloneCfg();(c.events=c.events||[]).push({id:uidGen("e"),name:"Evento especial",date:ymd(addDays(today(),7)),time:"19:00",place:""});saveConfig(c);return;}
 if(a==="rmCfg"){const c=cloneCfg();c[b.dataset.list].splice(Number(b.dataset.i),1);saveConfig(c);return;}
});
document.addEventListener("change",ev=>{
 const t=ev.target;
 if(t.dataset.act==="agendaFor"){S.agendaFor=t.value;S.selDay=null;render();return;}
 if(t.dataset.act==="assign"){
  const mk=monthKey(S.escMonth);const e=JSON.parse(JSON.stringify(S.escalas[mk]||{}));if(!e.assignments)return;
  const o=t.dataset.o,f=t.dataset.f,i=Number(t.dataset.i);
  const a=e.assignments[o]=e.assignments[o]||{};const arr=(a[f]||[]).slice();arr[i]=t.value;a[f]=arr.filter(Boolean);
  saveEscala(mk,e);return;
 }
 if(t.dataset.cfg){
  const c=cloneCfg();const [list,i,field]=t.dataset.cfg.split(".");
  let v=t.value;if(field==="weekday"||field==="qty")v=Math.max(field==="qty"?1:0,Number(v)||0);
  if(field==="name"&&!String(v).trim())return;
  c[list][Number(i)][field]=v;saveConfig(c);
 }
});
document.addEventListener("submit",async ev=>{
 const f=ev.target;if(!f.dataset.form)return;ev.preventDefault();
 const picked=sel=>[...f.querySelectorAll(sel+' [aria-pressed="true"]')].map(x=>x.dataset.val);
 if(f.dataset.form==="join"){
  const name=f.querySelector("#join-name").value.trim();const fns=picked("#join-fns");
  if(!name){toast("Informe seu nome.");return;} if(!fns.length){toast("Escolha pelo menos uma função.");return;}
  try{await createMember({user_id:S.authId,name,functions:fns});toast("Bem-vindo à equipe!");}catch(e){}return;
 }
 if(f.dataset.form==="self"){const m=me();const name=f.querySelector("#self-name").value.trim()||m.name;S.editSelf=false;await saveMember({...m,name,functions:picked("#self-fns")});toast("Salvo");return;}
 if(f.dataset.form==="member"){
  const id=f.dataset.id;const name=f.querySelector("#mem-name").value.trim();if(!name)return;
  const paused=f.querySelector("#mem-active").getAttribute("aria-pressed")==="true";
  const coordBtn=f.querySelector("#mem-coord");
  S.editMember=null;
  try{
   if(id){await saveMember({...S.members[id],name,functions:picked("#mem-fns"),active:!paused});}
   else{await createMember({name,functions:picked("#mem-fns"),active:!paused,manual:true});}
   if(coordBtn&&id){const want=coordBtn.getAttribute("aria-pressed")==="true";const uidA=S.members[id].user_id;
    if(uidA&&want!==S.coords.has(uidA)){
     if(want)await q(S.sb.from("coordinators").insert({user_id:uidA}));else await q(S.sb.from("coordinators").delete().eq("user_id",uidA));
     scheduleReload();}}
   toast("Membro salvo");
  }catch(e){}
  return;
 }
 if(f.dataset.form==="com"){
  const title=f.querySelector("#com-title").value.trim();if(!title)return;
  const c={title,body:f.querySelector("#com-body").value.trim(),tone:f.querySelector("#com-tone").value,createdAt:new Date().toISOString()};
  try{await q(S.sb.from("comunicados").insert({title:c.title,body:c.body,tone:c.tone}));f.reset();toast("Comunicado publicado");scheduleReload();}catch(e){}
 }
});

/* ---------- auth + boot ---------- */
const $=id=>document.getElementById(id);
let authMode="login";
function showAuth(which){
 $("auth").hidden=which!=="auth";$("recover").hidden=which!=="recover";$("setup").hidden=which!=="setup";
 $("app").hidden=which!=="app";$("bottom").hidden=which!=="app";
}
function authMsg(t,err){const m=$("auth-msg");m.textContent=t||"";m.classList.toggle("err",!!err);}
function setMode(mode){authMode=mode;
 document.querySelectorAll("#auth-tabs button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===mode)));
 $("auth-name-wrap").hidden=mode!=="signup";$("auth-name").required=mode==="signup";
 $("auth-submit").textContent=mode==="signup"?"Criar conta":"Entrar";
 $("auth-pass").autocomplete=mode==="signup"?"new-password":"current-password";
 $("auth-forgot").hidden=mode==="signup";authMsg("");}
function authErr(e){const m=(e&&e.message)||"";
 if(/Invalid login/i.test(m))return "E-mail ou senha incorretos.";
 if(/already registered/i.test(m))return "Este e-mail já tem conta. Use a aba Entrar.";
 if(/Email not confirmed/i.test(m))return "Confirme seu e-mail pelo link que enviamos e tente de novo.";
 if(/Password should be/i.test(m))return "A senha precisa ter pelo menos 6 caracteres.";
 if(/rate limit/i.test(m))return "Muitas tentativas. Aguarde alguns minutos.";
 return m||"Algo deu errado. Tente de novo.";}

async function enterApp(session){
 S.session=session;S.authId=session.user.id;
 const meta=session.user.user_metadata||{};
 S.myName=meta.full_name||meta.name||"";S.myAvatar=meta.avatar_url||meta.picture||null;
 showAuth("app");S.dbState="loading";render();
 await loadAll();render();
 if(!enterApp.ch){
  enterApp.ch=S.sb.channel("dom-agenda").on("postgres_changes",{event:"*",schema:"public"},()=>scheduleReload()).subscribe();
  window.addEventListener("focus",()=>scheduleReload());
 }
}

(async function boot(){
 if(!window.supabase||!CFG.SUPABASE_URL||/SEU-PROJETO/.test(CFG.SUPABASE_URL)||!CFG.SUPABASE_ANON_KEY||/COLE_AQUI/.test(CFG.SUPABASE_ANON_KEY)){showAuth("setup");return;}
 S.sb=window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY);
 $("auth-google-wrap").hidden=!CFG.GOOGLE_LOGIN;
 document.querySelectorAll("#auth-tabs button").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.tab)));
 $("auth-form").addEventListener("submit",async ev=>{
  ev.preventDefault();const email=$("auth-email").value.trim(),password=$("auth-pass").value;
  $("auth-submit").disabled=true;authMsg("Aguarde…");
  try{
   if(authMode==="signup"){
    const name=$("auth-name").value.trim();
    const {data,error}=await S.sb.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:location.origin+location.pathname}});
    if(error)throw error;
    if(!data.session)authMsg("Conta criada! Abra o link que enviamos para "+email+" para confirmar.");
   }else{
    const {error}=await S.sb.auth.signInWithPassword({email,password});if(error)throw error;
   }
  }catch(e){authMsg(authErr(e),true);}
  $("auth-submit").disabled=false;
 });
 $("auth-forgot").addEventListener("click",async()=>{
  const email=$("auth-email").value.trim();if(!email){authMsg("Digite seu e-mail acima e clique de novo.",true);return;}
  const {error}=await S.sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  authMsg(error?authErr(error):"Enviamos um link para "+email+" criar uma nova senha.",!!error);
 });
 $("auth-google").addEventListener("click",()=>S.sb.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+location.pathname}}));
 $("recover-form").addEventListener("submit",async ev=>{
  ev.preventDefault();const {error}=await S.sb.auth.updateUser({password:$("recover-pass").value});
  if(error){$("recover-msg").textContent=authErr(error);return;}
  const {data}=await S.sb.auth.getSession();if(data.session)enterApp(data.session);
 });

 let recovering=false;
 S.sb.auth.onAuthStateChange((event,session)=>{
  if(event==="PASSWORD_RECOVERY"){recovering=true;showAuth("recover");return;}
  if(recovering)return;
  if(session&&(!S.session||session.user.id!==S.authId))enterApp(session);
  else if(!session){S.session=null;S.authId=null;S.uid=null;S.isOwner=false;S.members={};showAuth("auth");}
  else S.session=session;
 });
 const {data}=await S.sb.auth.getSession();
 if(data.session&&!recovering)enterApp(data.session);else if(!recovering)showAuth("auth");
})();
})();
