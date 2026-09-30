const U={all:{label:"All Trials",kanji:"全",color:"#F5F2EB"},web:{label:"Web",kanji:"蜘蛛",color:"#E63946"},crypto:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},cryptography:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},pwn:{label:"Pwn",kanji:"刀切",color:"#8B5CF6"},binary:{label:"Binary",kanji:"刀切",color:"#8B5CF6"},forensics:{label:"Forensics",kanji:"影",color:"#06B6D4"},reversing:{label:"Reversing",kanji:"解体",color:"#10B981"},rev:{label:"Reversing",kanji:"解体",color:"#10B981"},misc:{label:"Misc",kanji:"雑",color:"#F97316"},miscellaneous:{label:"Misc",kanji:"雑",color:"#F97316"},osint:{label:"OSINT",kanji:"諜",color:"#EC4899"},hardware:{label:"Hardware",kanji:"機",color:"#EAB308"},warmup:{label:"Warmup",kanji:"初",color:"#14B8A6"},mobile:{label:"Mobile",kanji:"携",color:"#6366F1"},cloud:{label:"Cloud",kanji:"雲",color:"#38BDF8"},blockchain:{label:"Blockchain",kanji:"鎖",color:"#A855F7"},ai:{label:"AI",kanji:"知",color:"#06B6D4"}},z=[{color:"#F97316",kanji:"雑"},{color:"#EC4899",kanji:"諜"},{color:"#14B8A6",kanji:"初"},{color:"#EAB308",kanji:"機"},{color:"#6366F1",kanji:"携"},{color:"#A855F7",kanji:"鎖"},{color:"#06B6D4",kanji:"知"},{color:"#F43F5E",kanji:"斬"},{color:"#84CC16",kanji:"陣"}],J=[],it=[{rank:2,glyph:"銀",seal:"Silver Blade Seal",border:"border-slate-400/40",text:"text-slate-300",pad:"lg:pt-14"},{rank:1,glyph:"冠",seal:"Dragon Seal",border:"border-[#D4AF37]/60",text:"text-[#D4AF37]",pad:""},{rank:3,glyph:"銅",seal:"Bronze Torii Seal",border:"border-amber-700/50",text:"text-amber-600",pad:"lg:pt-20"}];function c(e){return document.querySelector(e)}function D(e){return document.querySelectorAll(e)}function O(e){if(!e)return{id:"unknown",label:"Trial",kanji:"試",color:"#F5F2EB"};const t=String(e).toLowerCase().replace(/\s+/g,"");if(U[t])return{id:t,...U[t]};const a=J.find(r=>r.id===t);if(a)return a;let n=0;for(let r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r);const o=z[Math.abs(n)%z.length],s={id:t,label:String(e),kanji:o.kanji,color:o.color};return J.push(s),s}function G(e,t){let a;return(...n)=>{clearTimeout(a),a=setTimeout(()=>e(...n),t)}}function x(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function lt(e){if(!e)return"";try{const a=new URL(e,window.location.origin).pathname.split("/").filter(Boolean).pop()||"";return decodeURIComponent(a)}catch{const a=String(e).split("?")[0].split("#")[0];return a.split("/").filter(Boolean).pop()||a}}function B(){const e=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("reveal-visible"),a.target.classList.remove("reveal-hidden"),e.unobserve(a.target))})},{rootMargin:"-40px"});D(".reveal").forEach(t=>{t.classList.add("reveal-hidden"),e.observe(t)})}function ct(){setTimeout(()=>{D(".masked-line").forEach(e=>e.classList.add("masked-line-visible"))},60)}function dt(){setTimeout(()=>{D(".fade-in-anim").forEach(e=>{e.style.opacity="1",e.style.transform="none"})},60)}function pt(){const e=c("#splash-intro");if(!e)return;const t=c("#splash-progress"),a=c("#splash-percent"),n=c("#splash-enter");let o=0;const s=setInterval(()=>{o+=2,t&&(t.style.width=o+"%"),a&&(a.textContent=o),o>=100&&(clearInterval(s),r())},60);function r(){e.classList.add("slashed"),setTimeout(()=>{e.style.display="none",document.body.classList.add("entered"),sessionStorage.setItem("ronin-entered","true"),R()},700)}n&&n.addEventListener("click",r)}function ft(){const e=c("#enso-canvas");if(!e)return;const t=e.getContext("2d"),a=Math.min(window.devicePixelRatio||1,1.5);let n=0,o=0;function s(){const m=e.parentElement;m&&(n=m.offsetWidth,o=m.offsetHeight,e.width=n*a,e.height=o*a,t.setTransform(a,0,0,a,0,0))}s(),window.addEventListener("resize",G(s,100));const r=Array.from({length:45},()=>({x:Math.random()*(n||1600),y:Math.random()*(o||900),r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.3+.08),o:Math.random()*.45+.1,red:Math.random()<.35}));let l=0,i=0,d=0;function p(){const m=e.parentElement;if(!m)return;const y=c("#hero-logo");if(y&&y.offsetWidth>0){const w=y.getBoundingClientRect(),k=m.getBoundingClientRect();l=w.left-k.left+w.width/2,i=w.top-k.top+w.height/2,d=Math.max(w.width,w.height)*.46}else l=n>1024?n*.72:n*.5,i=o*.48,d=Math.min(n,o)*.28}let u=0;function h(m){u++,(u%20===0||l===0)&&p();const y=m;t.clearRect(0,0,n,o);const w=y*14e-5,k=Math.PI*.22,b=k/2+w,$=Math.PI*2-k/2+w,v=60;for(let f=0;f<v;f++){const g=f/v,F=b+($-b)*g,rt=b+($-b)*((f+1)/v),W=Math.sin(g*Math.PI);t.beginPath(),t.strokeStyle=`rgba(230,57,70,${.08+W*.12})`,t.lineWidth=1.5+W*10,t.arc(l,i,d,F,rt),t.stroke()}for(const f of r)f.x+=f.vx,f.y+=f.vy,f.y<-10&&(f.y=o+10,f.x=Math.random()*n),t.beginPath(),t.fillStyle=f.red?`rgba(230,57,70,${f.o})`:`rgba(245,242,235,${f.o*.7})`,t.arc(f.x,f.y,f.r,0,Math.PI*2),t.fill();requestAnimationFrame(h)}requestAnimationFrame(h)}function A(e,t="success"){let a=c(".toast-container");a||(a=document.createElement("div"),a.className="toast-container fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none",document.body.appendChild(a));const n=document.createElement("div");n.className="modal-in px-4 py-3 font-mono2 text-xs max-w-sm shadow-2xl border pointer-events-auto flex items-start gap-3 backdrop-blur-md",t==="success"?(n.style.borderColor="rgba(16,185,129,0.5)",n.style.color="#6EE7B7",n.style.background="rgba(18,18,21,0.95)"):t==="info"||t==="hint"?(n.style.borderColor="rgba(212,175,55,0.6)",n.style.color="#F5D77F",n.style.background="rgba(18,18,21,0.95)"):(n.style.borderColor="rgba(230,57,70,0.6)",n.style.color="#FF4D5E",n.style.background="rgba(18,18,21,0.95)");const o=t==="success"?"達":t==="info"||t==="hint"?"灯":"警";n.innerHTML=`<span class="font-kanji text-base flex-shrink-0">${o}</span><span class="flex-1 leading-relaxed">${x(e)}</span>`,a.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(10px)",n.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},4e3)}let E=[],q=[],M="all",C="all";function N(){const e=window.location.hash;if(!e||e.length<=1)return;const t=e.match(/(?:.*-)?(\d+)$/);if(t){const a=parseInt(t[1],10);a&&E.some(n=>n.id===a)&&X(a)}}function ut(){window.removeEventListener("hashchange",N),window.addEventListener("hashchange",N)}async function K(){try{const t=await(await fetch("/api/v1/challenges")).json();if(t.success){if(!Array.isArray(t.data))throw new Error("unexpected API shape");E=t.data.map(a=>({id:a.id,title:a.name,category:a.category?a.category.toLowerCase().replace(/\s+/g,""):"misc",categoryLabel:a.category||"Misc",points:a.value,solves:a.solves,solved_by_me:a.solved_by_me,description:"",tags:a.tags||[]})),ht(),P(),ut(),N()}}catch(e){console.error("[RONIN] Failed to load challenges:",e);const t=c("#challenges-grid");t&&!t.children.length&&(t.innerHTML=`
        <div class="md:col-span-2 lg:col-span-3 text-center py-16">
          <p class="font-kanji text-4xl text-[#71717A]/40">落</p>
          <p class="font-mono2 text-xs tracking-widest text-[#E63946] mt-4 uppercase">The trials could not be summoned</p>
          <button onclick="location.reload()" class="font-mono2 text-[10px] tracking-[0.2em] uppercase mt-6 px-4 py-2 border border-[#E63946]/60 text-[#E63946] hover:bg-[#E63946]/10 transition-colors">重 Load again</button>
        </div>`),A("Failed to load trials","error")}}function ht(){const e=c("#category-tabs");if(!e)return;const t=[{id:"all",label:"All Trials",kanji:"全",color:"#71717A"}],a=new Set(["all"]);E.forEach(n=>{if(!a.has(n.category)){a.add(n.category);const o=O(n.category)||{id:n.category,label:n.categoryLabel,kanji:"試",color:"#F5F2EB"};t.push({id:n.category,label:n.categoryLabel||o.label,kanji:o.kanji,color:o.color})}}),e.innerHTML=t.map(n=>{const o=M===n.id;return`
      <button onclick="setCategory('${n.id}')" data-cat="${n.id}" class="challenge-cat-btn relative px-4 sm:px-5 py-3 flex items-center gap-2 ${o?"active":""}">
        <span class="font-kanji text-sm" style="color: ${n.color}">${n.kanji}</span>
        <span class="font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${o?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}">${x(n.label)}</span>
        ${o?'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>':""}
      </button>
    `}).join("")}function P(){var o;const e=c("#challenges-grid");if(!e)return;const t=(((o=c("#challenge-search"))==null?void 0:o.value)||"").toLowerCase(),a=E.filter(s=>!(M!=="all"&&s.category!==M||C!=="all"&&(C==="ashigaru"&&s.points>150||C==="chunin"&&(s.points<=150||s.points>275)||C==="hatamoto"&&(s.points<=275||s.points>425)||C==="shogun"&&s.points<=425)||t&&!s.title.toLowerCase().includes(t)));e.innerHTML=a.map((s,r)=>{const l=O(s.category)||{color:"#F5F2EB",label:s.categoryLabel,kanji:"試"},i=s.solved_by_me||q.includes(s.id),d=s.solves>0?Math.min(Math.round(s.solves/(s.solves+10)*100),100):0;return`
      <div class="reveal" style="transition-delay: ${Math.min(r*.04,.35)}s">
        <button onclick="openChallengeModal(${s.id})" class="trial-card relative text-left bg-[#121215] border border-white/10 p-6 overflow-hidden group w-full flex flex-col justify-between">
          <span class="absolute -right-3 -bottom-6 font-kanji text-8xl leading-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 select-none pointer-events-none" style="color: ${l.color}">${l.kanji}</span>
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2 py-1 border" style="color: ${l.color}; border-color: ${l.color}44">${l.label}</span>
              ${i?'<span class="flex items-center gap-1.5 font-mono2 text-[10px] tracking-widest text-emerald-400 uppercase">✓ Solved</span>':""}
            </div>
            <h3 class="font-heading text-lg font-bold text-[#F5F2EB] tracking-wide group-hover:text-[#E63946] transition-colors duration-300">${s.title}</h3>
          </div>
          <div>
            <div class="flex items-center justify-between mt-6">
              <span class="font-heading text-xl font-black text-[#D4AF37]">${s.points}<span class="text-xs font-semibold ml-1 text-[#D4AF37]/70">PTS</span></span>
              <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#71717A]">${s.solves} VICTORIES</span>
            </div>
            <div class="mt-4">
              <div class="flex justify-between font-mono2 text-[10px] text-[#71717A] mb-1.5"><span>${s.solves} VICTORIES</span><span>${d}%</span></div>
              <div class="h-[3px] bg-white/5"><div class="h-full transition-all duration-700" style="width: ${d}%; background-color: ${l.color}"></div></div>
            </div>
          </div>
        </button>
      </div>
    `}).join("");const n=c("#no-challenges");n&&n.classList.toggle("hidden",a.length>0),B()}function gt(e){M=e,D(".challenge-cat-btn").forEach(t=>{const a=t.dataset.cat===e;t.classList.toggle("active",a);const n=t.querySelector("span:nth-child(2)");n&&(n.className=`font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${a?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}`);const o=t.querySelector(".cat-indicator");a?o||t.insertAdjacentHTML("beforeend",'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>'):o&&o.remove()}),P()}function mt(e){C=e,D(".diff-btn").forEach(t=>{const a=t.dataset.diff===e;t.classList.toggle("active",a),a?t.className="diff-btn active font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-[rgba(230,57,70,0.5)] bg-[#E63946]/10 text-[#F5F2EB] transition-all":t.className="diff-btn font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-white/10 text-[#71717A] hover:text-[#A1A1AA] hover:border-white/20 transition-all"}),P()}function _(e){if(!e)return"";let t=String(e);return t=t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" class="max-w-full h-auto my-2.5 rounded border border-white/10 shadow-lg block" />'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" class="text-[#06B6D4] hover:underline underline-offset-2">$1</a>'),/<(p|div|br|ul|ol|table)/i.test(t)||(t=t.replace(/\n/g,"<br>")),t}function xt(e,t,a){const n=a+1,o=typeof t.cost=="number"?t.cost:0,s=t.id,r=t.html||t.content;return r?`
      <div class="font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
        <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
          <span class="font-kanji">灯</span> Hint #${n} ${o>0?`<span class="text-[#71717A] font-normal">(-${o} PTS)</span>`:'<span class="text-[#06B6D4] font-normal">(Free)</span>'}
        </div>
        <div class="text-[#F5F2EB]/90 leading-relaxed">${_(r)}</div>
      </div>
    `:o>0?`
      <div id="hint-wrapper-${s}" class="border border-white/10 bg-[#050507] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-white/20">
        <div class="flex items-center gap-3">
          <span class="font-kanji text-xl text-[#D4AF37]">灯</span>
          <div>
            <p class="font-mono2 text-xs font-bold text-[#F5F2EB]">Hint #${n}</p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Requires ${o} honor points to unlock</p>
          </div>
        </div>
        <button onclick="unlockHint(${e.id}, ${s}, ${o}, ${n})" class="btn-slash bg-[#121215] border border-[rgba(212,175,55,0.45)] text-[#D4AF37] hover:bg-[#D4AF37]/15 font-heading text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
          <span class="font-kanji">解</span> Unlock (-${o} PTS)
        </button>
      </div>
    `:`
    <div id="hint-wrapper-${s}" class="border border-white/10 bg-[#050507] p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-white/20">
      <div class="flex items-center gap-3">
        <span class="font-kanji text-xl text-[#06B6D4]">灯</span>
        <div>
          <p class="font-mono2 text-xs font-bold text-[#F5F2EB]">Hint #${n}</p>
          <p class="font-mono2 text-[10px] tracking-widest text-[#06B6D4] uppercase">Free sacred insight</p>
        </div>
      </div>
      <button onclick="revealFreeHint(${e.id}, ${s}, ${n})" class="btn-slash bg-[#121215] border border-[rgba(6,182,212,0.4)] text-[#06B6D4] hover:bg-[#06B6D4]/15 font-heading text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
        <span class="font-kanji">明</span> Reveal Hint
      </button>
    </div>
  `}async function X(e){const t=E.find(r=>r.id===e);if(!t)return;try{const l=await(await fetch(`/api/v1/challenges/${e}`)).json();l.success&&(t.description=l.data.description,t.hints=(l.data.hints||[]).map(i=>typeof i=="object"&&i!==null?i:{id:i,cost:0}),t.files=l.data.files||[],t.connection_info=l.data.connection_info,t.attribution=l.data.attribution,t.tags=l.data.tags||[])}catch(r){console.error("Failed to load challenge details:",r)}const a=O(t.category)||{color:"#F5F2EB",label:t.categoryLabel,kanji:"試"},n=t.solved_by_me||q.includes(t.id),o=(t.title||"trial").toLowerCase().replace(/[^a-z0-9_-]/g,"_");window.location.hash!==`#${o}-${t.id}`&&history.replaceState(null,null,`#${o}-${t.id}`);const s=document.createElement("div");s.id="challenge-modal",s.className="fixed inset-0 z-[90] flex items-center justify-center p-4 fade-in",s.style.background="rgba(5,5,7,0.85)",s.style.backdropFilter="blur(8px)",s.innerHTML=`
    <div class="modal-in relative bg-[#121215] border border-[rgba(230,57,70,0.4)] text-[#F5F2EB] w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto modal-scroll p-6 sm:p-8 shadow-2xl" onclick="event.stopPropagation()">
      ${n?`
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
      <h2 class="font-heading text-2xl font-bold text-[#F5F2EB] tracking-wide">${x(t.title)}</h2>

      <!-- Modal Tabs: Details / Solves -->
      <div class="flex items-center gap-6 border-b border-white/10 mb-6 mt-4">
        <button id="modal-tab-details-btn" onclick="switchChallengeModalTab('details', ${t.id})" class="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all">
          <span class="font-kanji text-sm">試</span> Trial Details
        </button>
        <button id="modal-tab-solves-btn" onclick="switchChallengeModalTab('solves', ${t.id})" class="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all">
          <span class="font-kanji text-sm">血</span> Conquered (<span id="modal-solves-count">${t.solves}</span>)
        </button>
      </div>

      <!-- Panel: Details -->
      <div id="modal-panel-details">
        <div class="text-[#A1A1AA] text-sm leading-relaxed pt-1">${t.description||"Loading..."}</div>
        
        ${t.connection_info?`
          <div class="mb-6 mt-4">
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">接続 — CONNECTION</p>
            <div class="font-mono2 text-xs text-[#06B6D4] bg-[#06B6D4]/5 border border-[rgba(6,182,212,0.3)] px-4 py-3 break-all leading-relaxed">${x(t.connection_info).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" class="text-[#06B6D4] hover:text-[#22D3EE] underline underline-offset-4 decoration-[#06B6D4]/40 hover:decoration-[#22D3EE] transition-colors">$1</a>')}</div>
          </div>
        `:""}

        ${(()=>{const r=(t.tags||[]).find(d=>typeof d=="string"&&d.toLowerCase().startsWith("author=")),l=(t.tags||[]).filter(d=>typeof d=="string"&&d.toLowerCase().startsWith("link=")),i=t.attribution||(r?r.slice(7):null);return!i&&l.length===0?"":`
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/5 py-3 my-4">
            ${i?`
            <div class="flex items-center gap-2">
              <span class="font-kanji text-sm text-[#D4AF37]">匠</span>
              <div>
                <p class="font-mono2 text-[9px] tracking-widest text-[#71717A] uppercase">Crafted by</p>
                <p class="font-heading text-sm font-bold text-[#D4AF37] tracking-wide">${x(i)}</p>
              </div>
            </div>
            `:""}
            ${l.length>0?`
            <div class="flex items-center gap-2 flex-wrap">
              ${l.map(d=>{const p=d.slice(5);return`<a href="${p}" target="_blank" rel="noopener" class="font-mono2 text-[11px] text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors">
                  <span class="font-kanji mr-1">鏈</span>${x(p.replace(/^https?:\/\//,"").split("/")[0])}
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

        ${t.hints&&t.hints.length>0?`
          <div class="mb-6">
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2.5">灯 — INSIGHTS & HINTS</p>
            <div class="space-y-2.5" id="challenge-hints-list">
              ${t.hints.map((r,l)=>xt(t,r,l)).join("")}
            </div>
          </div>
        `:""}

        ${t.files.length>0?`
          <div class="mb-6">
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">ATTACHMENTS</p>
            <div class="flex flex-wrap gap-2">
              ${t.files.map(r=>{const l=lt(r);return`
                <a href="${r}" target="_blank" download="${x(l)}" title="${x(l)}" class="font-mono2 text-xs text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors flex items-center gap-1.5 max-w-full">
                  <span class="font-kanji mr-1 flex-shrink-0">文</span>
                  <span class="truncate">${x(l)}</span>
                </a>
              `}).join("")}
            </div>
          </div>
        `:""}

        ${n?`
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

      <!-- Panel: Solves / Conquered -->
      <div id="modal-panel-solves" class="hidden">
        <div class="py-8 text-center font-mono2 text-xs text-[#71717A]">Reading the shadow ledger...</div>
      </div>
    </div>
  `,s.addEventListener("click",H),document.body.appendChild(s),document.body.style.overflow="hidden"}async function bt(e,t){const a=c("#modal-tab-details-btn"),n=c("#modal-tab-solves-btn"),o=c("#modal-panel-details"),s=c("#modal-panel-solves");if(!(!a||!n||!o||!s))if(e==="details")a.className="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all",n.className="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all",o.classList.remove("hidden"),s.classList.add("hidden");else{n.className="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all",a.className="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all",o.classList.add("hidden"),s.classList.remove("hidden"),s.innerHTML='<div class="py-8 text-center font-mono2 text-xs text-[#71717A]">Unrolling the shadow ledger...</div>';try{const l=await(await fetch(`/api/v1/challenges/${t}/solves`)).json();if(l.success&&Array.isArray(l.data)){if(l.data.length===0){s.innerHTML=`
            <div class="text-center py-12">
              <span class="font-kanji text-4xl text-[#71717A]/40 block mb-3">斬</span>
              <p class="font-heading text-sm font-bold uppercase tracking-widest text-[#71717A]">No victories recorded yet</p>
              <p class="font-mono2 text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1">First blood still awaits a worthy blade</p>
            </div>
          `;return}s.innerHTML=`
          <div class="overflow-x-auto max-h-[50vh] modal-scroll">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/10 font-mono2 text-[9px] tracking-[0.25em] uppercase text-[#71717A]">
                  <th class="py-2.5 px-3">Rank</th>
                  <th class="py-2.5 px-3">Warrior / Clan</th>
                  <th class="py-2.5 px-3 text-right">Struck At</th>
                </tr>
              </thead>
              <tbody class="font-mono2 text-xs divide-y divide-white/5">
                ${l.data.map((i,d)=>{const p=d===0,u=i.account_url||`/users/${i.account_id}`;return`
                    <tr class="hover:bg-white/[0.02] transition-colors ${p?"bg-[#E63946]/5":""}">
                      <td class="py-3 px-3">
                        ${p?`
                          <span class="inline-flex items-center gap-1 border border-[#E63946] bg-[#E63946]/20 text-[#FF4D5E] px-2 py-0.5 text-[9px] font-bold tracking-widest">
                            <span class="font-kanji text-xs">血</span> FIRST BLOOD
                          </span>
                        `:`
                          <span class="font-bold text-[#71717A]">#${d+1}</span>
                        `}
                      </td>
                      <td class="py-3 px-3">
                        <a href="${u}" class="font-heading text-xs font-bold text-[#F5F2EB] hover:text-[#E63946] transition-colors">${x(i.name)}</a>
                      </td>
                      <td class="py-3 px-3 text-right text-[11px] text-[#71717A]">
                        ${new Date(i.date).toLocaleString()}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `}}catch{s.innerHTML='<div class="py-8 text-center font-mono2 text-xs text-[#EF4444]">Failed to load victories ledger.</div>'}}}function H(){const e=c("#challenge-modal");e&&(e.remove(),document.body.style.overflow="",window.location.hash&&history.replaceState(null,null,window.location.pathname+window.location.search))}async function vt(e,t,a,n){var i,d;const o=E.find(p=>p.id===e),s=c(`#hint-wrapper-${t}`);if(!confirm(`Spend ${a} honor points to unlock Hint #${n}? This deduction cannot be undone.`))return;const l=((i=document.querySelector('meta[name="csrf-token"]'))==null?void 0:i.content)||((d=window.init)==null?void 0:d.csrfNonce)||"";try{const u=await(await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":l},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})})).json();if(u.success){const m=await(await fetch(`/api/v1/hints/${t}`)).json();if(m.success&&m.data&&(m.data.html||m.data.content)){const y=m.data.html||m.data.content;if(o&&o.hints){const w=o.hints.find(k=>k.id===t);w&&(w.content=y)}s&&(s.outerHTML=`
            <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
              <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#71717A] font-normal">(-${a} PTS)</span>
              </div>
              <div class="text-[#F5F2EB]/90 leading-relaxed">${_(y)}</div>
            </div>
          `),A(`Hint #${n} unlocked (-${a} PTS)`,"success")}else A("Hint unlocked! Please reopen the trial.","success")}else{const h=u.errors?typeof u.errors=="string"?u.errors:Object.values(u.errors).flat().join(" "):"Failed to unlock hint";if(h.toLowerCase().includes("already unlocked")){const y=await(await fetch(`/api/v1/hints/${t}`)).json();if(y.success&&y.data&&(y.data.html||y.data.content)){const w=y.data.html||y.data.content;if(o&&o.hints){const k=o.hints.find(b=>b.id===t);k&&(k.content=w)}s&&(s.outerHTML=`
              <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
                <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                  <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#10B981] font-normal">(Clan Unlocked)</span>
                </div>
                <div class="text-[#F5F2EB]/90 leading-relaxed">${_(w)}</div>
              </div>
            `),A(`Hint #${n} was already unlocked by your clan!`,"success");return}}A(h||"Failed to unlock hint","error")}}catch(p){console.error("Unlock hint error:",p),A("Network error unlocking hint","error")}}async function yt(e,t,a){var r,l;const n=E.find(i=>i.id===e),o=c(`#hint-wrapper-${t}`),s=((r=document.querySelector('meta[name="csrf-token"]'))==null?void 0:r.content)||((l=window.init)==null?void 0:l.csrfNonce)||"";try{await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":s},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})});const d=await(await fetch(`/api/v1/hints/${t}`)).json();if(d.success&&d.data&&(d.data.html||d.data.content)){const p=d.data.html||d.data.content;if(n&&n.hints){const u=n.hints.find(h=>h.id===t);u&&(u.content=p)}o&&(o.outerHTML=`
          <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
            <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#06B6D4] uppercase font-bold">
              <span class="font-kanji">灯</span> Hint #${a} <span class="text-[#06B6D4] font-normal">(Free)</span>
            </div>
            <div class="text-[#F5F2EB]/90 leading-relaxed">${_(p)}</div>
          </div>
        `),A(`Hint #${a} revealed!`,"success")}else{const p=d.errors?Object.values(d.errors).flat().join(" "):"Could not reveal hint";A(p,"error")}}catch(i){console.error("Reveal free hint error:",i),A("Failed to reveal hint","error")}}async function wt(e){var o,s;const t=c("#flag-input"),a=c("#flag-error"),n=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(n)try{const l=await(await fetch("/api/v1/challenges/attempt",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":((s=document.querySelector('meta[name="csrf-token"]'))==null?void 0:s.content)||""},credentials:"same-origin",body:JSON.stringify({challenge_id:e,submission:n})})).json();if(l.success){if(l.data.status==="correct")q.push(e),A("Flag accepted — honor gained","success"),H(),K();else if(l.data.status==="already_solved")A("You have already conquered this trial","success"),H();else if(l.data.status==="paused")A("Tournament is paused — submissions disabled","error"),a&&(a.textContent="Tournament is paused. Flag submissions are temporarily sealed.",a.classList.remove("hidden"));else if(a){a.textContent=l.data.message||"Incorrect flag. The shadow ledger records your miss.",a.classList.remove("hidden");const i=c("#flag-submission-area");i&&(i.classList.add("shake-x"),setTimeout(()=>i.classList.remove("shake-x"),400))}}else if(a){const i=l.errors?Object.values(l.errors).flat().join(" "):"Submission rejected.";a.textContent=i,a.classList.remove("hidden")}}catch(r){console.error("Flag submission failed:",r),A("Submission failed — check your connection","error")}}async function Q(){try{Z=await Ft();const t=new URLSearchParams(window.location.search).get("bracket_id"),a=t?`/api/v1/brackets/${t}/scoreboard`:"/api/v1/scoreboard",n=t?`/api/v1/brackets/${t}/scoreboard/top/50`:"/api/v1/scoreboard/top/50",[o,s]=await Promise.all([fetch(a).then(r=>r.json()),fetch(n).then(r=>r.json()).catch(()=>null)]);if(o.success){if(T=o.data,s&&s.success&&s.data){const r={},l={};Object.values(s.data).forEach(i=>{const d=(i.solves||[]).filter(p=>p.challenge_id!==null&&p.challenge_id!==void 0);r[i.id]=d.length,d.forEach(p=>{p.user_id&&(l[p.user_id]=(l[p.user_id]||0)+1)})}),T=T.map(i=>({...i,solves:r[i.account_id]!==void 0?r[i.account_id]:i.solves||0,_memberSolveCounts:l}))}et(tt(L))}kt()}catch(e){console.error("Failed to load scoreboard:",e),A("Failed to load honor scroll","error")}}async function kt(){const e=c("#tournament-pulse");if(!(!e||!window.echarts))try{const a=await(await fetch("/api/v1/scoreboard/top/5")).json();if(!a.success)return;const n=["#D4AF37","#E63946","#94A3B8","#F5F2EB","#06B6D4"],s=Object.values(a.data).slice(0,5).map((l,i)=>{const d=(l.solves||[]).filter(h=>h.challenge_id!==null&&h.value>0).sort((h,m)=>new Date(h.date)-new Date(m.date));let p=0;const u=d.map(h=>(p+=h.value,[new Date(h.date).getTime(),p]));return{name:l.name,type:"line",showSymbol:!1,smooth:!0,lineWidth:2,lineStyle:{color:n[i%n.length],width:2},itemStyle:{color:n[i%n.length]},data:u.length?u:[[Date.now()-864e5,0],[Date.now(),0]]}});e._echarts&&e._echarts.dispose();const r=window.echarts.init(e);e._echarts=r,r.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},legend:{bottom:0,textStyle:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10},icon:"roundRect",itemWidth:14,itemHeight:2},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:s})}catch(t){console.error("Failed to load tournament pulse:",t)}}const j=[{key:"tenno",kanji:"天皇",title:"Tenno",sub:"Emperor — The One",minPct:90,color:"#D4AF37",border:"rgba(212,175,55,0.7)",glow:"rgba(212,175,55,0.25)"},{key:"shogun",kanji:"将軍",title:"Shogun",sub:"66% – 89% mastery",minPct:66,color:"#E63946",border:"rgba(230,57,70,0.5)",glow:"rgba(230,57,70,0.2)"},{key:"daimyo",kanji:"大名",title:"Daimyo",sub:"41% – 65% mastery",minPct:41,color:"#F5F2EB",border:"rgba(245,242,235,0.4)",glow:"rgba(245,242,235,0.12)"},{key:"samurai",kanji:"侍",title:"Samurai",sub:"21% – 40% mastery",minPct:21,color:"#94A3B8",border:"rgba(148,163,184,0.4)",glow:"rgba(148,163,184,0.15)"},{key:"peasant",kanji:"農民",title:"Peasant",sub:"0% – 20% — just starting",minPct:0,color:"#71717A",border:"rgba(113,113,122,0.3)",glow:"none"}];function $t(e,t,a){const n=t>0?e/t*100:0;return a===1?{rank:j[0],pct:n}:n>=90?{rank:j[1],pct:n}:n>=66?{rank:j[1],pct:n}:n>=41?{rank:j[2],pct:n}:n>=21?{rank:j[3],pct:n}:{rank:j[4],pct:n}}let L="teams",T=[],Z=0;function tt(e){if(e==="teams")return T;const t=[];return T.forEach(a=>{const n=a._memberSolveCounts||{};(a.members||[]).forEach(o=>{t.push({pos:null,account_id:o.id,account_url:`/users/${o.id}`,account_type:"user",name:o.name,score:o.score,solves:n[o.id]||0})})}),t.sort((a,n)=>n.score-a.score),t.map((a,n)=>({...a,pos:n+1}))}function At(e){L=e;const t=c("#tab-teams"),a=c("#tab-players");if(!t||!a)return;const n=["bg-[#E63946]","text-white","border-[#E63946]"],o=["bg-[#121215]","text-[#71717A]","border-white/10"],s=(r,l)=>{r.classList.remove(...l?o:n),r.classList.add(...l?n:o)};s(t,e==="teams"),s(a,e==="players"),et(tt(e))}async function Ft(){try{const t=await(await fetch("/api/v1/challenges")).json();if(t.success&&Array.isArray(t.data)&&t.data.length>0){const a=t.data.reduce((n,o)=>n+(typeof o.value=="number"?o.value:0),0);if(a>0)return a}}catch(e){console.error("fetchTotalPoints challenges strategy failed:",e)}try{const e=await fetch("/api/v1/scoreboard/top/50").then(t=>t.json());if(e.success&&e.data){const t={};Object.values(e.data).forEach(n=>{(n.solves||[]).forEach(o=>{o.challenge_id!==null&&o.challenge_id!==void 0&&(t[o.challenge_id]=o.value||0)})});const a=Object.values(t).reduce((n,o)=>n+o,0);if(a>0)return a}}catch(e){console.error("fetchTotalPoints scoreboard strategy failed:",e)}return 0}function et(e){var n,o;const t=c("#podium"),a=c("#scoreboard-body");if(e){if(t)if(L==="teams"&&e.length>=3){const s=[e[1],e[0],e[2]];t.innerHTML=it.map((r,l)=>{const i=s[l];if(!i)return"";const d=i.name?i.name.charAt(0):"浪",p=i.account_url?`<a href="${i.account_url}" class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3 hover:text-[#E63946] transition-colors block truncate">${x(i.name)}</a>`:`<h3 class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3">${x(i.name)}</h3>`;return`
        <div class="reveal" style="transition-delay: ${l*.12}s">
          <div class="relative bg-[#121215] border ${r.border} p-8 text-center overflow-hidden shadow-xl ${r.pad}">
            <span class="absolute top-3 left-1/2 -translate-x-1/2 font-kanji text-7xl opacity-[0.05] select-none">${d}</span>
            <span class="font-kanji text-2xl ${r.text}">${r.glyph}</span>
            <p class="font-mono2 text-[10px] tracking-[0.35em] uppercase mt-3 ${r.text}">Rank ${r.rank} — ${r.seal}</p>
            ${p}
            <p class="font-heading text-4xl font-black mt-4" style="color: ${r.rank===1?"#D4AF37":"#F5F2EB"}">
              ${i.score.toLocaleString()}<span class="text-sm font-semibold text-[#71717A] ml-2">PTS</span>
            </p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] mt-2 uppercase">${i.solves||0} victories</p>
          </div>
        </div>
      `}).join("")}else t.innerHTML="";if(a){const s=c("#col-victories");s&&(s.textContent=L==="teams"?"Warriors":"Victories");const r=(n=window.init)==null?void 0:n.userId,l=(o=window.init)==null?void 0:o.teamId;a.innerHTML=e.map(i=>{const d=i.name?i.name.charAt(0):"浪",p=L==="teams"?l!=null&&i.account_id===l:r!=null&&i.account_id===r,{rank:u,pct:h}=$t(i.score,Z,i.pos),m=i.account_url?`<a href="${i.account_url}" class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB] hover:text-[#E63946] transition-colors">${x(i.name)}</a>`:`<span class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB]">${x(i.name)}</span>`;return`
        <tr class="border-b border-white/5 transition-colors hover:bg-[#1A1A1E] ${p?"bg-[#E63946]/5 border-l-2 border-l-[#E63946]":""}">
          <td class="px-6 py-4">
            <span class="font-heading text-lg font-black ${i.pos<=3?"text-[#D4AF37]":"text-[#71717A]"}">${String(i.pos).padStart(2,"0")}</span>
          </td>
          <td class="px-6 py-4"><span class="font-kanji text-xl text-[#E63946]/80">${d}</span></td>
          <td class="px-6 py-4">
            ${m}
            ${p?'<span class="font-mono2 text-[9px] tracking-widest text-[#E63946] ml-2 uppercase">You</span>':""}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 border px-2.5 py-1" style="border-color: ${u.border}; background: ${u.glow}" title="${u.title} — ${u.sub} (${h.toFixed(1)}% of total honor)">
              <span class="font-kanji text-sm" style="color: ${u.color}">${u.kanji}</span>
              <span class="font-mono2 text-[9px] tracking-widest uppercase" style="color: ${u.color}">${u.title}</span>
              <span class="font-mono2 text-[9px] text-[#71717A]">${h.toFixed(0)}%</span>
            </span>
          </td>
          <td class="px-6 py-4 font-mono2 text-sm text-[#A1A1AA]">${L==="teams"&&i.members?i.members.length:i.solves||0}</td>
          <td class="px-6 py-4 font-mono2 text-sm font-bold text-[#F5F2EB]">${i.score.toLocaleString()}</td>
        </tr>
      `}).join("")}B()}}function Et(e){const t=CATEGORIES.find(a=>a.id===String(e).toLowerCase().replace(/\s+/g,""));return t?t.color:"#94A3B8"}async function jt(){const e=window.location.pathname.match(/^\/users\/(\d+)/),t=e?e[1]:"me";try{const[a,n,o,s]=await Promise.all([fetch(`/api/v1/users/${t}`),fetch(`/api/v1/users/${t}/solves`),fetch(`/api/v1/users/${t}/fails`),fetch(`/api/v1/users/${t}/awards`)]),r=await a.json(),l=await n.json(),i=await o.json(),d=await s.json();r.success&&l.success&&St(r.data,l.data||[],{fails:i.success&&i.data||[],awards:d.success&&d.data||[]})}catch(a){console.error("Failed to load profile:",a)}}function St(e,t,a={}){const n=a.fails||[],o=a.awards||[],s=c("#stat-score"),r=c("#stat-solves"),l=c("#stat-fails");s&&(s.textContent=(e.score||0).toLocaleString()),r&&(r.textContent=t.length),l&&(l.textContent=n.length);const i=t.length+n.length,d=i>0?(t.length/i*100).toFixed(1):null,p=i>0?(n.length/i*100).toFixed(1):null,u=c("#solve-bar"),h=c("#fail-bar"),m=c("#solve-pct"),y=c("#fail-pct");if(u&&h){const b=d===null?50:parseFloat(d),$=p===null?50:parseFloat(p);u.style.width=b+"%",h.style.width=$+"%"}m&&(m.textContent=d===null?"—":d),y&&(y.textContent=p===null?"—":p);const w=c("#category-bar"),k=c("#category-legend");if(w&&k&&t.length>0){const b={};t.forEach(v=>{var g;const f=((g=v.challenge)==null?void 0:g.category)||"Unknown";b[f]=(b[f]||0)+1});const $=Object.keys(b).map(v=>({name:v,count:b[v],percent:b[v]/t.length*100,color:Et(v)}));w.innerHTML=$.map(v=>`<div class="h-full" style="width: ${v.percent}%; background-color: ${v.color}"></div>`).join(""),k.innerHTML=$.map(v=>`
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: ${v.color}"></span>
        <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#A1A1AA]">${x(v.name)} (${v.percent.toFixed(1)}%)</span>
      </div>
    `).join("")}if(window.echarts&&c("#user-score-graph")){const b=c("#user-score-graph"),$=[];t.forEach(g=>{var F;((F=g.challenge)==null?void 0:F.value)>0&&$.push({date:new Date(g.date).getTime(),value:g.challenge.value})}),o.forEach(g=>{g.value>0&&$.push({date:new Date(g.date).getTime(),value:g.value})}),$.sort((g,F)=>g.date-F.date);let v=0;const f=$.map(g=>(v+=g.value,[g.date,v]));if(f.length>0){b._echarts&&b._echarts.dispose();const g=window.echarts.init(b);b._echarts=g,g.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:[{type:"line",showSymbol:!0,symbolSize:5,smooth:!0,step:"end",lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"},areaStyle:{color:"rgba(230,57,70,0.12)"},data:f}]})}}if(window.echarts&&c("#skills-radar")){const b=c("#skills-radar"),$={};t.forEach(f=>{var F;const g=((F=f.challenge)==null?void 0:F.category)||"Unknown";$[g]=($[g]||0)+1});const v=Object.keys($).map(f=>({skill:f,value:Math.min($[f]*20+40,100)}));if(v.length>0){b._echarts&&b._echarts.dispose();const f=window.echarts.init(b);b._echarts=f,f.setOption({radar:{indicator:v.map(g=>({name:g.skill,max:100})),axisLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitArea:{show:!1},axisName:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10}},series:[{type:"radar",data:[{value:v.map(g=>g.value),name:"Skills",areaStyle:{color:"rgba(230,57,70,0.22)"},lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"}}]}]})}}}function Ct(){ft(),ct(),dt(),Lt()}async function Lt(){try{const[e,t]=await Promise.all([fetch("/api/v1/challenges"),fetch("/api/v1/users")]),a=await e.json(),n=await t.json(),o=a.success?a.data.length:16,s=n.success?n.data.length:148,r=D(".landing-stat-value");r[0]&&(r[0].textContent=String(o).padStart(2,"0")),r[2]&&(r[2].textContent=String(s))}catch(e){console.error("Failed to load landing stats:",e)}}function Dt(){const e=c("#mobile-nav-toggle"),t=c("#mobile-nav-menu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("hidden"),t.classList.toggle("fade-in")})}let S=null;function Tt(){if(!(typeof window.EventSource>"u"||S))try{S=new EventSource("/events"),S.addEventListener("notification",e=>{try{const t=JSON.parse(e.data),a=t.title||"Whisper",n=t.content?t.content.length>80?t.content.slice(0,80)+"...":t.content:"";A(`${a}: ${n}`,"info"),V()}catch{A("New whisper received","info"),V()}}),S.addEventListener("hint",()=>{A("A new hint has been unlocked for a trial","hint")}),S.addEventListener("scoreboard",()=>{window.location.pathname.startsWith("/scoreboard")&&Q()}),S.onerror=()=>{}}catch(e){console.warn("Could not initiate /events listener:",e)}}const nt="ronin-whispers-seen";function Bt(){try{const e=JSON.parse(localStorage.getItem(nt)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Mt(e){try{const t=e.slice().sort((a,n)=>new Date(n.date||0)-new Date(a.date||0)).slice(0,200).map(at);localStorage.setItem(nt,JSON.stringify(t))}catch{}}function I(e){const t=c("#notification-badge"),a=c("#mobile-notification-badge");[t,a].forEach(n=>{n&&(e>0?(n.textContent=e>99?"99+":e,n.classList.remove("hidden")):(n.textContent="0",n.classList.add("hidden")))})}function V(){const e=c("#notification-badge");if(!e)return;const t=parseInt(e.textContent,10)||0;I(t+1)}function at(e){return`${e.id||""}|${e.title||""}|${e.date||""}`}async function _t(){const e=c("#notification-badge"),t=c("#mobile-notification-badge");if(!(!e&&!t)){if(window.location.pathname==="/notifications"){try{const n=await(await fetch("/api/v1/notifications")).json();n.success&&Array.isArray(n.data)&&Mt(n.data)}catch{}I(0);return}try{const n=await(await fetch("/api/v1/notifications")).json();if(n.success&&Array.isArray(n.data)){const o=Bt(),s=new Set(o),r=n.data.filter(l=>!s.has(at(l)));I(r.length)}}catch{}}}async function Ht(){Rt(),Nt()}async function Rt(){const e=c("#hof-reigning-body");if(e){try{const a=await(await fetch("/plugins/hall_of_fame/api/inductees")).json();if(a&&a.success&&Array.isArray(a.data)){const n=a.data.find(o=>o.current===!0||o.current==="true");if(n){Pt(n);return}}}catch{}try{const a=await(await fetch("/api/v1/scoreboard/top/1")).json();if(a.success&&Array.isArray(a.data)&&a.data.length>0){const n=a.data[0],o=n.account_url||(n.account_id?`/users/${n.account_id}`:"#");e.innerHTML=`
        <a href="${o}" class="inline-block group">
          <h3 class="font-heading text-3xl sm:text-4xl font-black text-[#D4AF37] group-hover:text-[#FFD966] transition-colors">${x(n.name||"Unknown")}</h3>
        </a>
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
          <span class="font-heading text-xl font-black text-[#F5F2EB]">${(n.score||0).toLocaleString()}<span class="text-xs text-[#D4AF37]/70 ml-1.5">PTS</span></span>
          <span class="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#71717A]">wearer of the crown</span>
        </div>
        ${n.account_id?`<a href="${o}" class="inline-flex mt-5 font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#71717A] hover:text-[#D4AF37] transition-colors">View Profile →</a>`:""}
      `;return}}catch{}e.innerHTML=`
    <p class="font-kanji text-3xl text-[#D4AF37]/30">皇空</p>
    <p class="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#71717A] mt-3">The throne stands empty — crown one in the Tenno Registry.</p>`}}function Pt(e){const t=c("#hof-reigning-body");if(!t)return;t.innerHTML=st({idx:0,name:e.name,uid:e.user_id,age:e.age,batch:e.batch,season:e.season,date:e.date,img:e.image,quote:e.quote,current:!1}),B();const a=String(e.user_id||"").trim();a&&/^\d+$/.test(a)&&fetch(`/api/v1/users/${a}`).then(n=>n.json()).then(n=>{if(!n.success)return;const o=n.data,s=t.querySelector(".hof-stats");s&&o.score!==void 0&&o.score!==null&&(s.innerHTML=`
            <span class="font-heading text-lg font-black text-[#D4AF37]">${Number(o.score).toLocaleString()}<span class="text-[10px] text-[#D4AF37]/70 ml-1">PTS</span></span>
            ${o.place?`<span class="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#71717A]">Now #${o.place}</span>`:""}
          `)}).catch(()=>{})}function Nt(){const e=c("#hof-source");c("#hof-grid")&&fetch("/plugins/hall_of_fame/api/inductees").then(a=>a.json()).then(a=>{if(a&&a.success&&Array.isArray(a.data)){const n=a.data.filter(o=>!(o.current===!0||o.current==="true"));if(n.length>0){ot(n);return}}Y(e)}).catch(()=>Y(e))}function Y(e,t){const a=e?Array.from(e.querySelectorAll(".tenno-inductee")):[];if(a.length===0){const o=c("#hof-empty");o&&o.classList.remove("hidden");return}const n=a.map((o,s)=>({idx:s,name:o.dataset.name||"",uid:(o.dataset.userId||"").trim(),season:o.dataset.season||"",date:o.dataset.date||"",img:o.dataset.img||"",current:(o.dataset.current||"").toLowerCase()==="true",quote:(o.textContent||"").trim(),score:null,solves:null}));ot(n)}function ot(e){const t=c("#hof-grid");t&&(t.innerHTML=e.map((a,n)=>st({...a,idx:a.idx!==void 0?a.idx:n})).join(""),e.forEach(a=>{if(!a.user_id&&!a.uid)return;const n=String(a.user_id||a.uid||"").trim();if(!/^\d+$/.test(n))return;const o=a.idx!==void 0?a.idx:e.indexOf(a);fetch(`/api/v1/users/${n}`).then(s=>s.json()).then(s=>{if(!s.success)return;const r=s.data,l=t.querySelector(`article[data-idx="${o}"]`);if(!l)return;const i=l.querySelector(".hof-stats");if(i&&r.score!==void 0&&r.score!==null&&(i.innerHTML=`
            <span class="font-heading text-lg font-black text-[#D4AF37]">${Number(r.score).toLocaleString()}<span class="text-[10px] text-[#D4AF37]/70 ml-1">PTS</span></span>
            ${r.place?`<span class="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#71717A]">Now #${r.place}</span>`:""}
          `),r.name&&!a.name){const d=l.querySelector(".hof-name");d&&(d.textContent=r.name)}}).catch(()=>{})}),B())}function st(e){const t=e.idx||0,a=e.name||"Name Unknown",n=e.img||e.image||"",o=String(e.user_id||e.uid||"").trim(),s=e.age||"",r=e.batch||"",l=e.season||"",i=e.date||"",d=e.quote||"",p=e.current===!0||e.current==="true",u=n?`<img src="${x(n)}" alt="${x(a)}" class="hof-portrait absolute inset-0 w-full h-full object-cover object-top" loading="lazy">`:'<div class="hof-portrait absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1206] to-[#0d0d10]"><span class="font-kanji text-7xl text-[#D4AF37]/50">皇</span></div>',h=[];s&&h.push({kanji:"齢",label:"Age",value:x(s)}),r&&h.push({kanji:"期",label:"Batch",value:x(r)}),i&&h.push({kanji:"戴",label:"Crowned",value:x(i)});const m=h.length?`<div class="flex flex-wrap gap-x-8 gap-y-3 mt-5">${h.map(k=>`
      <div>
        <p class="font-mono2 text-[9px] tracking-[0.3em] uppercase text-[#71717A] flex items-center gap-1.5">
          <span class="font-kanji text-[11px] text-[#E63946]">${k.kanji}</span> ${k.label}
        </p>
        <p class="font-heading text-sm font-bold text-[#F5F2EB] mt-1">${k.value}</p>
      </div>`).join("")}</div>`:"",y=d?`<blockquote class="hof-quote mt-6">
        <p class="font-heading text-sm sm:text-base italic leading-relaxed text-[#F5F2EB]"><span class="text-[#D4AF37]">“</span>${x(d)}<span class="text-[#D4AF37]">”</span></p>
        <p class="font-mono2 text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] mt-4">— Words from the Tenno <span class="font-kanji normal-case tracking-normal">言葉</span></p>
      </blockquote>`:"",w=o&&/^\d+$/.test(o)?`<a href="/users/${o}" class="hof-name font-heading text-xl font-black text-[#D4AF37] tracking-wide hover:text-[#FFD966] transition-colors">${x(a)}</a>`:`<span class="hof-name font-heading text-xl font-black text-[#D4AF37] tracking-wide">${x(a)}</span>`;return`
    <article class="hof-card reveal ${p?"hof-card-reigning":""}" data-idx="${t}" style="transition-delay:${Math.min(t*.08,.3)}s">
      <div class="grid grid-cols-1 md:grid-cols-5">
        <div class="relative overflow-hidden md:col-span-2 order-1">
          ${u}
          <span class="absolute top-3 left-3 font-kanji text-2xl hof-seal">天皇</span>
          ${p?'<span class="absolute bottom-14 left-3 font-mono2 text-[9px] tracking-[0.25em] uppercase bg-[#D4AF37] text-black px-2.5 py-1">Reigning Now</span>':""}
          ${l?`<span class="absolute bottom-0 left-0 right-0 hof-ribbon font-mono2 text-[9px] tracking-[0.3em] uppercase text-[#0d0d10] bg-[#D4AF37]/90 px-3 py-1.5">${x(l)}</span>`:""}
        </div>
        <div class="p-6 sm:p-8 flex flex-col md:col-span-3 order-2">
          <p class="font-mono2 text-[9px] tracking-[0.35em] uppercase text-[#71717A] flex items-center gap-2">
            <span class="font-kanji text-sm text-[#E63946]">天皇</span> Tenno of the Ledger
          </p>
          <h3 class="mt-2">${w}</h3>
          ${m}
          ${y}
          <div class="hof-stats flex items-center gap-4 mt-auto pt-5"></div>
        </div>
      </div>
    </article>
  `}function R(){const e=window.location.pathname.replace(/\/+$/,"")||"/";B(),Dt(),Tt(),_t();try{e==="/"||e===""?Ct():e==="/challenges"?(K(),It()):e==="/scoreboard"?Q():e==="/user"||e.startsWith("/users/")?jt():e==="/hall-of-fame"&&Ht()}catch(t){console.error("[RONIN] page init failed:",t)}}function It(){const e=c("#challenge-search");e&&e.addEventListener("input",G(()=>P(),300))}function Ot(){try{const e=c("#splash-intro"),t=sessionStorage.getItem("ronin-entered");e&&!t?pt():(e&&(e.style.display="none",document.body.classList.add("entered")),R())}catch(e){console.error("[RONIN] boot failed:",e)}}document.addEventListener("DOMContentLoaded",Ot);window.addEventListener("popstate",()=>{try{R()}catch(e){console.error("[RONIN] popstate init failed:",e)}});window.setCategory=gt;window.setDifficulty=mt;window.switchBoard=At;window.openChallengeModal=X;window.closeChallengeModal=H;window.switchChallengeModalTab=bt;window.submitFlag=wt;window.unlockHint=vt;window.revealFreeHint=yt;
