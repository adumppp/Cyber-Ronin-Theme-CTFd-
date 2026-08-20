const I=[{id:"all",label:"All Trials",kanji:"全",color:"#F5F2EB"},{id:"web",label:"Web",kanji:"蜘蛛",color:"#E63946"},{id:"crypto",label:"Crypto",kanji:"暗号",color:"#D4AF37"},{id:"pwn",label:"Pwn",kanji:"刀切",color:"#8B5CF6"},{id:"forensics",label:"Forensics",kanji:"影",color:"#06B6D4"},{id:"reversing",label:"Reversing",kanji:"解体",color:"#10B981"}],W=[{rank:2,glyph:"銀",seal:"Silver Blade Seal",border:"border-slate-400/40",text:"text-slate-300",pad:"lg:pt-14"},{rank:1,glyph:"冠",seal:"Dragon Seal",border:"border-[#D4AF37]/60",text:"text-[#D4AF37]",pad:""},{rank:3,glyph:"銅",seal:"Bronze Torii Seal",border:"border-amber-700/50",text:"text-amber-600",pad:"lg:pt-20"}];function i(e){return document.querySelector(e)}function F(e){return document.querySelectorAll(e)}function O(e){return I.find(t=>t.id===e)}function H(e,t){let a;return(...s)=>{clearTimeout(a),a=setTimeout(()=>e(...s),t)}}function E(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function T(){const e=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("reveal-visible"),a.target.classList.remove("reveal-hidden"),e.unobserve(a.target))})},{rootMargin:"-40px"});F(".reveal").forEach(t=>{t.classList.add("reveal-hidden"),e.observe(t)})}function V(){setTimeout(()=>{F(".masked-line").forEach(e=>e.classList.add("masked-line-visible"))},60)}function Y(){setTimeout(()=>{F(".fade-in-anim").forEach(e=>{e.style.opacity="1",e.style.transform="none"})},60)}function G(){const e=i("#splash-intro");if(!e)return;const t=i("#splash-progress"),a=i("#splash-percent"),s=i("#splash-enter");let o=0;const n=setInterval(()=>{o+=2,t&&(t.style.width=o+"%"),a&&(a.textContent=o),o>=100&&(clearInterval(n),r())},60);function r(){e.classList.add("slashed"),setTimeout(()=>{e.style.display="none",document.body.classList.add("entered"),sessionStorage.setItem("ronin-entered","true"),D()},700)}s&&s.addEventListener("click",r)}function U(){const e=i("#enso-canvas");if(!e)return;const t=e.getContext("2d"),a=Math.min(window.devicePixelRatio||1,1.5);let s=0,o=0;function n(){const c=e.parentElement;c&&(s=c.offsetWidth,o=c.offsetHeight,e.width=s*a,e.height=o*a,t.setTransform(a,0,0,a,0,0))}n(),window.addEventListener("resize",H(n,100));const r=Array.from({length:45},()=>({x:Math.random()*(s||1600),y:Math.random()*(o||900),r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.3+.08),o:Math.random()*.45+.1,red:Math.random()<.35}));function l(c){const g=c;t.clearRect(0,0,s,o);const m=s>1024?s*.72:s*.5,b=o*.45,x=Math.min(s,o)*.28,y=g*14e-5,$=Math.PI*.22,w=$/2+y,A=Math.PI*2-$/2+y,u=60;for(let d=0;d<u;d++){const f=d/u,h=w+(A-w)*f,p=w+(A-w)*((d+1)/u),v=Math.sin(f*Math.PI);t.beginPath(),t.strokeStyle=`rgba(230,57,70,${.08+v*.12})`,t.lineWidth=1.5+v*10,t.arc(m,b,x,h,p),t.stroke()}for(const d of r)d.x+=d.vx,d.y+=d.vy,d.y<-10&&(d.y=o+10,d.x=Math.random()*s),t.beginPath(),t.fillStyle=d.red?`rgba(230,57,70,${d.o})`:`rgba(245,242,235,${d.o*.7})`,t.arc(d.x,d.y,d.r,0,Math.PI*2),t.fill();requestAnimationFrame(l)}requestAnimationFrame(l)}function S(e,t="success"){const a=i(".toast-container");if(!a)return;const s=document.createElement("div");s.className="modal-in px-4 py-3 font-mono2 text-xs max-w-xs shadow-xl border",s.style.borderColor=t==="success"?"rgba(16,185,129,0.5)":"rgba(239,68,68,0.5)",s.style.color=t==="success"?"#6EE7B7":"#FCA5A5",s.style.background="#121215",s.textContent=e,a.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transition="opacity 0.3s ease",setTimeout(()=>s.remove(),300)},3500)}let P=[],R=[],M="all",_="all";async function N(){try{const t=await(await fetch("/api/v1/challenges")).json();t.success&&(P=t.data.map(a=>({id:a.id,title:a.name,category:a.category.toLowerCase().replace(/\s+/g,""),categoryLabel:a.category,points:a.value,solves:a.solves,solved_by_me:a.solved_by_me,description:"",tags:a.tags||[]})),B())}catch(e){console.error("Failed to load challenges:",e),S("Failed to load trials","error")}}function B(){var o;const e=i("#challenges-grid");if(!e)return;const t=(((o=i("#challenge-search"))==null?void 0:o.value)||"").toLowerCase(),a=P.filter(n=>{if(M!=="all"&&n.category!==M)return!1;if(_!=="all"){const l={ashigaru:100,chunin:200,hatamoto:350,shogun:500}[_];if(l&&Math.abs(n.points-l)>50)return!1}return!(t&&!n.title.toLowerCase().includes(t))});e.innerHTML=a.map((n,r)=>{const l=O(n.category)||{color:"#F5F2EB",label:n.categoryLabel,kanji:"試"},c=n.solved_by_me||R.includes(n.id),g=n.solves>0?Math.min(Math.round(n.solves/(n.solves+10)*100),100):0;return`
      <div class="reveal" style="transition-delay: ${Math.min(r*.04,.35)}s">
        <button onclick="openChallengeModal(${n.id})" class="trial-card relative text-left bg-[#121215] border border-white/10 p-6 overflow-hidden group w-full flex flex-col justify-between">
          <span class="absolute -right-3 -bottom-6 font-kanji text-8xl leading-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 select-none pointer-events-none" style="color: ${l.color}">${l.kanji}</span>
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2 py-1 border" style="color: ${l.color}; border-color: ${l.color}44">${l.label}</span>
              ${c?'<span class="flex items-center gap-1.5 font-mono2 text-[10px] tracking-widest text-emerald-400 uppercase">✓ Solved</span>':""}
            </div>
            <h3 class="font-heading text-lg font-bold text-[#F5F2EB] tracking-wide group-hover:text-[#E63946] transition-colors duration-300">${n.title}</h3>
          </div>
          <div>
            <div class="flex items-center justify-between mt-6">
              <span class="font-heading text-xl font-black text-[#D4AF37]">${n.points}<span class="text-xs font-semibold ml-1 text-[#D4AF37]/70">PTS</span></span>
              <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#71717A]">${n.solves} VICTORIES</span>
            </div>
            <div class="mt-4">
              <div class="flex justify-between font-mono2 text-[10px] text-[#71717A] mb-1.5"><span>${n.solves} VICTORIES</span><span>${g}%</span></div>
              <div class="h-[3px] bg-white/5"><div class="h-full transition-all duration-700" style="width: ${g}%; background-color: ${l.color}"></div></div>
            </div>
          </div>
        </button>
      </div>
    `}).join("");const s=i("#no-challenges");s&&s.classList.toggle("hidden",a.length>0),T()}function K(e){M=e,F(".challenge-cat-btn").forEach(t=>{const a=t.dataset.cat===e;t.classList.toggle("active",a);const s=t.querySelector("span:last-child");s&&(s.className=`font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${a?"text-[#F5F2EB]":"text-[#71717A] group-hover:text-[#A1A1AA]"}`)}),B()}function Q(e){_=e,F(".diff-btn").forEach(t=>{const a=t.dataset.diff===e;t.classList.toggle("active",a),a?t.className="diff-btn active font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-[rgba(230,57,70,0.5)] bg-[#E63946]/10 text-[#F5F2EB] transition-all":t.className="diff-btn font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-white/10 text-[#71717A] hover:text-[#A1A1AA] hover:border-white/20 transition-all"}),B()}async function X(e){const t=P.find(n=>n.id===e);if(!t)return;try{const r=await(await fetch(`/api/v1/challenges/${e}`)).json();r.success&&(t.description=r.data.description,t.hints=r.data.hints||[],t.files=r.data.files||[],t.connection_info=r.data.connection_info,t.attribution=r.data.attribution,t.tags=r.data.tags||[])}catch(n){console.error("Failed to load challenge details:",n)}const a=O(t.category)||{color:"#F5F2EB",label:t.categoryLabel,kanji:"試"},s=t.solved_by_me||R.includes(t.id),o=document.createElement("div");o.id="challenge-modal",o.className="fixed inset-0 z-[90] flex items-center justify-center p-4 fade-in",o.style.background="rgba(5,5,7,0.85)",o.style.backdropFilter="blur(8px)",o.innerHTML=`
    <div class="modal-in relative bg-[#121215] border border-[rgba(230,57,70,0.4)] text-[#F5F2EB] w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto modal-scroll p-6 sm:p-8 shadow-2xl" onclick="event.stopPropagation()">
      ${s?`
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="slash-strike absolute top-1/2 left-0 h-[3px] w-full" style="background: linear-gradient(90deg, transparent, #E63946, transparent); box-shadow: 0 0 24px rgba(230,57,70,0.8)"></div>
        </div>
      `:""}
      <button onclick="closeChallengeModal()" class="absolute top-4 right-4 text-[#71717A] hover:text-[#E63946] font-mono2 text-lg transition-colors">✕</button>
      <div class="flex items-center gap-3 mb-2">
        <span class="font-kanji text-3xl" style="color: ${a.color}">${a.kanji}</span>
        <div class="flex gap-2 flex-wrap">
          <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 border" style="color: ${a.color}; border-color: ${a.color}55">${a.label}</span>
        </div>
      </div>
      <h2 class="font-heading text-2xl font-bold text-[#F5F2EB] tracking-wide">${t.title}</h2>
      <div class="text-[#A1A1AA] text-sm leading-relaxed pt-2">${t.description||"Loading..."}</div>
      
      ${t.connection_info?`
        <div class="mb-6 mt-4">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">接続 — CONNECTION</p>
          <div class="font-mono2 text-xs text-[#06B6D4] bg-[#06B6D4]/5 border border-[rgba(6,182,212,0.3)] px-4 py-3 break-all leading-relaxed">${E(t.connection_info).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" class="text-[#06B6D4] hover:text-[#22D3EE] underline underline-offset-4 decoration-[#06B6D4]/40 hover:decoration-[#22D3EE] transition-colors">$1</a>')}</div>
        </div>
      `:""}

      ${(()=>{const n=(t.tags||[]).find(c=>typeof c=="string"&&c.toLowerCase().startsWith("author=")),r=(t.tags||[]).filter(c=>typeof c=="string"&&c.toLowerCase().startsWith("link=")),l=t.attribution||(n?n.slice(7):null);return!l&&r.length===0?"":`
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/5 py-3 my-4">
          ${l?`
          <div class="flex items-center gap-2">
            <span class="font-kanji text-sm text-[#D4AF37]">匠</span>
            <div>
              <p class="font-mono2 text-[9px] tracking-widest text-[#71717A] uppercase">Crafted by</p>
              <p class="font-heading text-sm font-bold text-[#D4AF37] tracking-wide">${l}</p>
            </div>
          </div>
          `:""}
          ${r.length>0?`
          <div class="flex items-center gap-2 flex-wrap">
            ${r.map(c=>{const g=c.slice(5);return`<a href="${g}" target="_blank" rel="noopener" class="font-mono2 text-[11px] text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors">
                <span class="font-kanji mr-1">鏈</span>${g.replace(/^https?:\/\//,"").split("/")[0]}
              </a>`}).join("")}
          </div>
          `:""}
        </div>
        `})()}

      <div class="flex items-center gap-8 border-y border-white/5 py-3 my-4">
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Honor</p>
          <p class="font-heading text-xl font-bold text-[#D4AF37]">${t.points} PTS</p>
        </div>
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Victories</p>
          <p class="font-heading text-xl font-bold text-[#F5F2EB]">${t.solves}</p>
        </div>
      </div>

      ${t.hints.length>0?`
        <div class="mb-6">
          <div id="hint-section">
            <button onclick="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden')" class="font-mono2 text-[11px] tracking-widest text-[#71717A] hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <span class="font-kanji">灯</span> REVEAL HINT
            </button>
            <div class="hidden fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
              <span class="font-kanji mr-2">灯</span>${t.hints.map(n=>n.content).join(" ")}
            </div>
          </div>
        </div>
      `:""}

      ${t.files.length>0?`
        <div class="mb-6">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">ATTACHMENTS</p>
          <div class="flex flex-wrap gap-2">
            ${t.files.map(n=>`
              <a href="${n}" target="_blank" class="font-mono2 text-xs text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] px-3 py-1.5 transition-colors">
                <span class="font-kanji mr-1">文</span>${n.split("/").pop()}
              </a>
            `).join("")}
          </div>
        </div>
      `:""}

      ${s?`
        <div class="modal-in flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 px-4 py-4">
          <span class="text-emerald-400 font-mono2 text-lg">✓</span>
          <div>
            <p class="font-heading text-sm font-bold tracking-widest text-emerald-300">FLAG ACCEPTED — HONOR GAINED</p>
            <p class="font-mono2 text-xs text-emerald-400/70 mt-0.5">+${t.points} pts recorded in the shadow ledger</p>
          </div>
        </div>
      `:`
        <div id="flag-submission-area">
          <div class="flex items-center bg-[#050507] border border-white/10 focus-within:border-[rgba(230,57,70,0.5)] transition-colors">
            <span class="font-mono2 text-xs text-[#E63946] pl-4 pr-2 whitespace-nowrap select-none">ronin@ctf:~#</span>
            <input id="flag-input" type="text" placeholder="ronin{...}" spellcheck="false"
              class="flex-1 bg-transparent font-mono2 text-sm text-[#F5F2EB] placeholder:text-[#71717A]/50 py-3.5 outline-none min-w-0" />
            <span class="caret-blink w-2 h-4 bg-[#E63946]/70 mr-3"></span>
          </div>
          <button onclick="submitFlag(${t.id})" class="btn-slash mt-3 w-full bg-[#E63946] hover:bg-[#FF4D5E] text-white font-heading text-sm font-bold tracking-[0.3em] uppercase py-3.5 transition-colors duration-300 flex items-center justify-center gap-2">
            <span class="font-kanji">刀</span> Strike — Submit Flag
          </button>
          <div id="flag-error" class="hidden font-mono2 text-xs text-[#EF4444] mt-2">Incorrect flag. The shadow ledger records your miss.</div>
        </div>
      `}
    </div>
  `,o.addEventListener("click",j),document.body.appendChild(o),document.body.style.overflow="hidden"}function j(){const e=i("#challenge-modal");e&&(e.remove(),document.body.style.overflow="")}async function Z(e){var o,n;const t=i("#flag-input"),a=i("#flag-error"),s=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(s)try{const l=await(await fetch("/api/v1/challenges/attempt",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":((n=document.querySelector('meta[name="csrf-token"]'))==null?void 0:n.content)||""},credentials:"same-origin",body:JSON.stringify({challenge_id:e,submission:s})})).json();if(l.success){if(l.data.status==="correct")R.push(e),S("Flag accepted — honor gained","success"),j(),N();else if(l.data.status==="already_solved")S("You have already conquered this trial","success"),j();else if(a){a.classList.remove("hidden");const c=i("#flag-submission-area");c&&(c.classList.add("shake-x"),setTimeout(()=>c.classList.remove("shake-x"),400))}}}catch(r){console.error("Flag submission failed:",r),S("Submission failed — check your connection","error")}}async function tt(){try{z=await st();const[e,t]=await Promise.all([fetch("/api/v1/scoreboard").then(a=>a.json()),fetch("/api/v1/scoreboard/top/50").then(a=>a.json()).catch(()=>null)]);if(e.success){if(L=e.data,t&&t.success&&t.data){const a={},s={};Object.values(t.data).forEach(o=>{const n=(o.solves||[]).filter(r=>r.challenge_id!==null&&r.challenge_id!==void 0);a[o.id]=n.length,n.forEach(r=>{r.user_id&&(s[r.user_id]=(s[r.user_id]||0)+1)})}),L=L.map(o=>({...o,solves:a[o.account_id]!==void 0?a[o.account_id]:o.solves||0,_memberSolveCounts:s}))}J(q(C))}et()}catch(e){console.error("Failed to load scoreboard:",e),S("Failed to load honor scroll","error")}}async function et(){const e=i("#tournament-pulse");if(!(!e||!window.echarts))try{const a=await(await fetch("/api/v1/scoreboard/top/5")).json();if(!a.success)return;const s=["#D4AF37","#E63946","#94A3B8","#F5F2EB","#06B6D4"],n=Object.values(a.data).slice(0,5).map((l,c)=>{const g=(l.solves||[]).filter(x=>x.challenge_id!==null&&x.value>0).sort((x,y)=>new Date(x.date)-new Date(y.date));let m=0;const b=g.map(x=>(m+=x.value,[new Date(x.date).getTime(),m]));return{name:l.name,type:"line",showSymbol:!1,smooth:!0,lineWidth:2,lineStyle:{color:s[c%s.length],width:2},itemStyle:{color:s[c%s.length]},data:b.length?b:[[Date.now()-864e5,0],[Date.now(),0]]}});e._echarts&&e._echarts.dispose();const r=window.echarts.init(e);e._echarts=r,r.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},legend:{bottom:0,textStyle:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10},icon:"roundRect",itemWidth:14,itemHeight:2},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:n})}catch(t){console.error("Failed to load tournament pulse:",t)}}const k=[{key:"tenno",kanji:"天皇",title:"Tenno",sub:"Emperor — The One",minPct:90,color:"#D4AF37",border:"rgba(212,175,55,0.7)",glow:"rgba(212,175,55,0.25)"},{key:"shogun",kanji:"将軍",title:"Shogun",sub:"66% – 89% mastery",minPct:66,color:"#E63946",border:"rgba(230,57,70,0.5)",glow:"rgba(230,57,70,0.2)"},{key:"daimyo",kanji:"大名",title:"Daimyo",sub:"41% – 65% mastery",minPct:41,color:"#F5F2EB",border:"rgba(245,242,235,0.4)",glow:"rgba(245,242,235,0.12)"},{key:"samurai",kanji:"侍",title:"Samurai",sub:"21% – 40% mastery",minPct:21,color:"#94A3B8",border:"rgba(148,163,184,0.4)",glow:"rgba(148,163,184,0.15)"},{key:"peasant",kanji:"農民",title:"Peasant",sub:"0% – 20% — just starting",minPct:0,color:"#71717A",border:"rgba(113,113,122,0.3)",glow:"none"}];function at(e,t,a){const s=t>0?e/t*100:0;return a===1?{rank:k[0],pct:s}:s>=90?{rank:k[1],pct:s}:s>=66?{rank:k[1],pct:s}:s>=41?{rank:k[2],pct:s}:s>=21?{rank:k[3],pct:s}:{rank:k[4],pct:s}}let C="teams",L=[],z=0;function q(e){if(e==="teams")return L;const t=[];return L.forEach(a=>{const s=a._memberSolveCounts||{};(a.members||[]).forEach(o=>{t.push({pos:null,account_id:o.id,account_url:`/users/${o.id}`,account_type:"user",name:o.name,score:o.score,solves:s[o.id]||0})})}),t.sort((a,s)=>s.score-a.score),t.map((a,s)=>({...a,pos:s+1}))}function ot(e){C=e;const t=i("#tab-teams"),a=i("#tab-players");if(!t||!a)return;const s=["bg-[#E63946]","text-white","border-[#E63946]"],o=["bg-[#121215]","text-[#71717A]","border-white/10"],n=(r,l)=>{r.classList.remove(...l?o:s),r.classList.add(...l?s:o)};n(t,e==="teams"),n(a,e==="players"),J(q(e))}async function st(){try{const t=await(await fetch("/api/v1/challenges")).json();if(t.success&&Array.isArray(t.data)&&t.data.length>0){const s=(await Promise.all(t.data.map(o=>fetch(`/api/v1/challenges/${o.id}`).then(n=>n.json()).catch(()=>null)))).reduce((o,n)=>o+(n&&n.success&&typeof n.data.value=="number"?n.data.value:0),0);if(s>0)return s}}catch(e){console.error("fetchTotalPoints challenges strategy failed:",e)}try{const e=await fetch("/api/v1/scoreboard/top/50").then(t=>t.json());if(e.success&&e.data){const t={};Object.values(e.data).forEach(s=>{(s.solves||[]).forEach(o=>{o.challenge_id!==null&&o.challenge_id!==void 0&&(t[o.challenge_id]=o.value||0)})});const a=Object.values(t).reduce((s,o)=>s+o,0);if(a>0)return a}}catch(e){console.error("fetchTotalPoints scoreboard strategy failed:",e)}return 0}function J(e){const t=i("#podium"),a=i("#scoreboard-body");if(e){if(t)if(C==="teams"&&e.length>=3){const s=[e[1],e[0],e[2]];t.innerHTML=W.map((o,n)=>{const r=s[n];if(!r)return"";const l=r.name?r.name.charAt(0):"浪",c=r.account_url?`<a href="${r.account_url}" class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3 hover:text-[#E63946] transition-colors block truncate">${E(r.name)}</a>`:`<h3 class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3">${E(r.name)}</h3>`;return`
        <div class="reveal" style="transition-delay: ${n*.12}s">
          <div class="relative bg-[#121215] border ${o.border} p-8 text-center overflow-hidden shadow-xl ${o.pad}">
            <span class="absolute top-3 left-1/2 -translate-x-1/2 font-kanji text-7xl opacity-[0.05] select-none">${l}</span>
            <span class="font-kanji text-2xl ${o.text}">${o.glyph}</span>
            <p class="font-mono2 text-[10px] tracking-[0.35em] uppercase mt-3 ${o.text}">Rank ${o.rank} — ${o.seal}</p>
            ${c}
            <p class="font-heading text-4xl font-black mt-4" style="color: ${o.rank===1?"#D4AF37":"#F5F2EB"}">
              ${r.score.toLocaleString()}<span class="text-sm font-semibold text-[#71717A] ml-2">PTS</span>
            </p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] mt-2 uppercase">${r.solves||0} victories</p>
          </div>
        </div>
      `}).join("")}else t.innerHTML="";if(a){const s=i("#col-victories");s&&(s.textContent=C==="teams"?"Warriors":"Victories"),a.innerHTML=e.map(o=>{var m,b;const n=o.name?o.name.charAt(0):"浪",r=o.account_id===((b=(m=window.CTFd)==null?void 0:m.user)==null?void 0:b.id),{rank:l,pct:c}=at(o.score,z,o.pos),g=o.account_url?`<a href="${o.account_url}" class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB] hover:text-[#E63946] transition-colors">${E(o.name)}</a>`:`<span class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB]">${E(o.name)}</span>`;return`
        <tr class="border-b border-white/5 transition-colors hover:bg-[#1A1A1E] ${r?"bg-[#E63946]/5 border-l-2 border-l-[#E63946]":""}">
          <td class="px-6 py-4">
            <span class="font-heading text-lg font-black ${o.pos<=3?"text-[#D4AF37]":"text-[#71717A]"}">${String(o.pos).padStart(2,"0")}</span>
          </td>
          <td class="px-6 py-4"><span class="font-kanji text-xl text-[#E63946]/80">${n}</span></td>
          <td class="px-6 py-4">
            ${g}
            ${r?'<span class="font-mono2 text-[9px] tracking-widest text-[#E63946] ml-2 uppercase">You</span>':""}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 border px-2.5 py-1" style="border-color: ${l.border}; background: ${l.glow}" title="${l.title} — ${l.sub} (${c.toFixed(1)}% of total honor)">
              <span class="font-kanji text-sm" style="color: ${l.color}">${l.kanji}</span>
              <span class="font-mono2 text-[9px] tracking-widest uppercase" style="color: ${l.color}">${l.title}</span>
              <span class="font-mono2 text-[9px] text-[#71717A]">${c.toFixed(0)}%</span>
            </span>
          </td>
          <td class="px-6 py-4 font-mono2 text-sm text-[#A1A1AA]">${C==="teams"&&o.members?o.members.length:o.solves||0}</td>
          <td class="px-6 py-4 font-mono2 text-sm font-bold text-[#F5F2EB]">${o.score.toLocaleString()}</td>
        </tr>
      `}).join("")}T()}}function nt(e){const t=I.find(a=>a.id===String(e).toLowerCase().replace(/\s+/g,""));return t?t.color:"#94A3B8"}async function rt(){const e=window.location.pathname.match(/^\/users\/(\d+)/),t=e?e[1]:"me";try{const[a,s,o,n]=await Promise.all([fetch(`/api/v1/users/${t}`),fetch(`/api/v1/users/${t}/solves`),fetch(`/api/v1/users/${t}/fails`),fetch(`/api/v1/users/${t}/awards`)]),r=await a.json(),l=await s.json(),c=await o.json(),g=await n.json();r.success&&l.success&&lt(r.data,l.data||[],{fails:c.success&&c.data||[],awards:g.success&&g.data||[]})}catch(a){console.error("Failed to load profile:",a)}}function lt(e,t,a={}){const s=a.fails||[],o=a.awards||[],n=i("#stat-score"),r=i("#stat-solves"),l=i("#stat-fails");n&&(n.textContent=(e.score||0).toLocaleString()),r&&(r.textContent=t.length),l&&(l.textContent=s.length);const c=t.length+s.length,g=c>0?(t.length/c*100).toFixed(1):null,m=c>0?(s.length/c*100).toFixed(1):null,b=i("#solve-bar"),x=i("#fail-bar"),y=i("#solve-pct"),$=i("#fail-pct");if(b&&x){const u=g===null?50:parseFloat(g),d=m===null?50:parseFloat(m);b.style.width=u+"%",x.style.width=d+"%"}y&&(y.textContent=g===null?"—":g),$&&($.textContent=m===null?"—":m);const w=i("#category-bar"),A=i("#category-legend");if(w&&A&&t.length>0){const u={};t.forEach(f=>{var p;const h=((p=f.challenge)==null?void 0:p.category)||"Unknown";u[h]=(u[h]||0)+1});const d=Object.keys(u).map(f=>({name:f,count:u[f],percent:u[f]/t.length*100,color:nt(f)}));w.innerHTML=d.map(f=>`<div class="h-full" style="width: ${f.percent}%; background-color: ${f.color}"></div>`).join(""),A.innerHTML=d.map(f=>`
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: ${f.color}"></span>
        <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#A1A1AA]">${E(f.name)} (${f.percent.toFixed(1)}%)</span>
      </div>
    `).join("")}if(window.echarts&&i("#user-score-graph")){const u=i("#user-score-graph"),d=[];t.forEach(p=>{var v;((v=p.challenge)==null?void 0:v.value)>0&&d.push({date:new Date(p.date).getTime(),value:p.challenge.value})}),o.forEach(p=>{p.value>0&&d.push({date:new Date(p.date).getTime(),value:p.value})}),d.sort((p,v)=>p.date-v.date);let f=0;const h=d.map(p=>(f+=p.value,[p.date,f]));if(h.length>0){u._echarts&&u._echarts.dispose();const p=window.echarts.init(u);u._echarts=p,p.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:[{type:"line",showSymbol:!0,symbolSize:5,smooth:!0,step:"end",lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"},areaStyle:{color:"rgba(230,57,70,0.12)"},data:h}]})}}if(window.echarts&&i("#skills-radar")){const u=i("#skills-radar"),d={};t.forEach(h=>{var v;const p=((v=h.challenge)==null?void 0:v.category)||"Unknown";d[p]=(d[p]||0)+1});const f=Object.keys(d).map(h=>({skill:h,value:Math.min(d[h]*20+40,100)}));if(f.length>0){u._echarts&&u._echarts.dispose();const h=window.echarts.init(u);u._echarts=h,h.setOption({radar:{indicator:f.map(p=>({name:p.skill,max:100})),axisLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitArea:{show:!1},axisName:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10}},series:[{type:"radar",data:[{value:f.map(p=>p.value),name:"Skills",areaStyle:{color:"rgba(230,57,70,0.22)"},lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"}}]}]})}}}function it(){U(),V(),Y(),ct()}async function ct(){try{const[e,t]=await Promise.all([fetch("/api/v1/challenges"),fetch("/api/v1/users")]),a=await e.json(),s=await t.json(),o=a.success?a.data.length:16,n=s.success?s.data.length:148,r=F(".landing-stat-value");r[0]&&(r[0].textContent=String(o).padStart(2,"0")),r[2]&&(r[2].textContent=String(n))}catch(e){console.error("Failed to load landing stats:",e)}}function dt(){const e=i("#mobile-nav-toggle"),t=i("#mobile-nav-menu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("hidden"),t.classList.toggle("fade-in")})}function D(){const e=window.location.pathname;T(),dt(),e==="/"||e===""?it():e==="/challenges"?(N(),pt()):e==="/scoreboard"?tt():(e==="/user"||e.startsWith("/users/"))&&rt()}function pt(){const e=i("#challenge-search");e&&e.addEventListener("input",H(()=>B(),300))}document.addEventListener("DOMContentLoaded",()=>{const e=i("#splash-intro"),t=sessionStorage.getItem("ronin-entered");e&&!t?G():(e&&(e.style.display="none",document.body.classList.add("entered")),D())});window.addEventListener("popstate",()=>{D()});window.setCategory=K;window.setDifficulty=Q;window.switchBoard=ot;window.openChallengeModal=X;window.closeChallengeModal=j;window.submitFlag=Z;
