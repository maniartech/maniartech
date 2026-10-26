/* Home > What we do: the practice picker (see _mt.scss ".pz").
 * One set of 36 dots re-forms into the shape of the practice the visitor picks and
 * plays that practice's own sequence. Copy and order come from the DOM, which comes
 * from site.context.homePractices (tajmahal.yaml); only the four drawings live here.
 * Runs only while on screen. Reduced motion: each drawing rests in its finished state. */
(function(){
if(!document.querySelector('[data-pz]'))return;
var NS="http://www.w3.org/2000/svg",N=36,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
var G=[141,141,141],M=[20,207,147],W=[255,255,255];
var sv=document.getElementById('pz-svg'),K=1,SC2=1,vis=false,raf=0,dotsG=$('dots'),trG=$('trails'),decs=$('decs'),D=[],T=[],now=0,cur=-1,tagI=-1;
function $(i){return document.getElementById('pz-'+i)}
for(var i=0;i<N;i++){var tr=[0,1].map(function(){var c=document.createElementNS(NS,'circle');c.setAttribute('r','5');c.setAttribute('opacity','0');trG.appendChild(c);return c});
 var e=document.createElementNS(NS,'circle');e.setAttribute('r','7');dotsG.appendChild(e);
 D.push({el:e,tr:tr,h:[],x:180,y:200,fx:180,fy:200,tx:180,ty:200,t0:0,dur:1,arc:0,c:1,cf:1,ct:1,tc0:0,tcd:1,glow:0,s:i*1.7})}
var DEC=[0,1,2,3].map(function(){var g=document.createElementNS(NS,'g');g.setAttribute('class','pz-dec');decs.appendChild(g);return g});
function ease(u){return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2}
function mv(i,x,y,o){o=o||{};var d=D[i];d.fx=d.x;d.fy=d.y;d.tx=x;d.ty=y;d.dur=RM?1:(o.dur||900);d.t0=now+(RM?0:(o.delay||0));d.arc=o.arc||0;
 if(o.col!==undefined){d.cf=d.c;d.ct=o.col;d.tc0=d.t0;d.tcd=RM?1:(o.cdur||450)}}
function after(ms,f){T.push(setTimeout(f,RM?0:ms))}
function clr(){T.forEach(clearTimeout);T=[]}
function mix(a,b,u){return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u]}
function rgb(c){return'rgb('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+')'}
function rs(v){return v*SC2/K}
function tag(i,txt){var t=$('tag');if(i<0){t.style.opacity=0;tagI=-1;return}tagI=i;$('tagt').textContent=txt;$('tagr').setAttribute('width',rs(txt.length*6.4+16).toFixed(1));$('tagr').setAttribute('height',rs(20).toFixed(1));$('tagr').setAttribute('rx',rs(6).toFixed(1));$('tagt').setAttribute('x',rs(8).toFixed(1));$('tagt').setAttribute('y',rs(14).toFixed(1));t.style.opacity=1}
var LOGN=3,logBody=null;
function logReset(head,right){var c=cards[cur];if(!c)return;var L=c.querySelector('.pz-log');if(!L)return;L.querySelector('.pz-log-h').innerHTML='<span>'+head+'</span><span>'+(right||'')+'</span>';logBody=L.querySelector('.pz-log-b');logBody.innerHTML=''}
function logPush(t,c){if(!logBody)return;var d=document.createElement('div');d.textContent=t;if(c)d.className=c;logBody.appendChild(d);while(logBody.children.length>LOGN)logBody.removeChild(logBody.firstChild)}
function logSet(i,t,c){if(!logBody)return;while(logBody.children.length<=i)logBody.appendChild(document.createElement('div'));var d=logBody.children[i];d.textContent=t;d.className=c||''}
function banner(txt){if(txt)logPush(txt,'mi')}
function frame(ts){now=ts;
 D.forEach(function(d){var u=Math.max(0,Math.min(1,(now-d.t0)/d.dur)),e=ease(u);
  d.x=d.fx+(d.tx-d.fx)*e;d.y=d.fy+(d.ty-d.fy)*e-Math.sin(Math.PI*u)*d.arc;
  var cu=Math.max(0,Math.min(1,(now-d.tc0)/d.tcd));d.c=d.cf+(d.ct-d.cf)*cu;
  d.glow*=.94;var col=rgb(mix(mix(G,M,d.c),W,Math.min(.85,d.glow*.8)));
  var id=RM?0:1,px=d.x+Math.sin(now/1100+d.s)*1.1*id/K,py=d.y+Math.cos(now/1300+d.s*1.3)*1.1*id/K;
  d.el.setAttribute('cx',px.toFixed(2));d.el.setAttribute('cy',py.toFixed(2));
  d.el.setAttribute('r',(rs(7)+rs(d.glow*3.2)+Math.sin(now/700+d.s)*.25*id/K).toFixed(2));d.el.setAttribute('fill',col);
  d.h.push([d.x,d.y]);if(d.h.length>14)d.h.shift();
  var a=d.h[Math.max(0,d.h.length-5)],b=d.h[0],mvg=!RM&&u>0&&u<1&&Math.hypot(d.x-a[0],d.y-a[1])>2.2;
  d.tr[0].setAttribute('cx',a[0]);d.tr[0].setAttribute('cy',a[1]);d.tr[1].setAttribute('cx',b[0]);d.tr[1].setAttribute('cy',b[1]);
  d.tr[0].setAttribute('opacity',mvg?.28:0);d.tr[1].setAttribute('opacity',mvg?.12:0);d.tr[0].setAttribute('fill',col);d.tr[1].setAttribute('fill',col)});
 if(tagI>=0){var d=D[tagI],w=+$('tagr').getAttribute('width'),x=Math.min(d.x+rs(11),354-w),y=Math.max(40,d.y-rs(27));$('tag').setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+')')}
 if(vis)raf=requestAnimationFrame(frame)}
function grid(x,y,c,dx,dy,n){var a=[];for(var i=0;i<n;i++)a.push([x+(i%c)*dx,y+Math.floor(i/c)*dy]);return a}
function scat(sd,x0,y0,w,h,n){var s=sd,a=[];for(var i=0;i<n;i++){s=(s*16807)%2147483647;var u=s/2147483647;s=(s*16807)%2147483647;a.push([x0+u*w,y0+s/2147483647*h])}return a}
function flash(el,cls,ms){el.classList.add(cls);setTimeout(function(){el.classList.remove(cls)},ms)}
function moveAll(Pp,o){o=o||{};D.forEach(function(d,i){mv(i,Pp[i][0],Pp[i][1],{delay:(o.stag||14)*i+(o.delay||0),dur:o.dur||900,arc:o.arc||0,col:o.col})})}

/* ---------- 01 handoffs ---------- */
var CX=[0,1,2,3].map(function(k){return 10+k*88}),S1=[];
CX.forEach(function(x){grid(x+16,154,3,22,34,9).forEach(function(q){S1.push(q)})});
function scene1(){
 var h='';['intake','review','authorize','deliver'].forEach(function(n,k){h+='<rect x="'+CX[k]+'" y="104" width="76" height="166" rx="10"/><text x="'+(CX[k]+38)+'" y="126" text-anchor="middle">'+n+'</text>'});
 for(var g=0;g<3;g++)h+='<line id="pz-g'+g+'" x1="'+(CX[g]+82)+'" y1="92" x2="'+(CX[g]+82)+'" y2="270"/>';
 h+='<path d="M24 84H336"/>';
 DEC[0].innerHTML='<g transform="translate(0,2)">'+h+'</g>';logReset('ledger','append-only');
 function ledger(t,c){logPush(t,c)}
 var steps=['Record #1042 | intake','Record #1042 | in review','Record #1042 | authorized','Record #1042 | delivered'],who=['logged at intake','reviewed by Reviewer A','authorized by Approver B','delivered, receipt verified'];
 moveAll(S1,{arc:24,col:1});if(RM)return;
 function wave(k){if(cur!==0)return;if(k>3){after(500,skip);return}
  for(var j=1;j<9;j++)(function(j){after(j*45,function(){D[k*9+j].glow=1})})(j);
  mv(0,CX[k]+38,86,{dur:700,col:1});tag(0,steps[k]);
  after(650,function(){D[0].glow=1;ledger('10:0'+(2+k)+'  '+who[k]);banner('')});
  if(k>0)after(300,function(){flash($('g'+(k-1)),'fl',600)});
  after(1250,function(){wave(k+1)})}
 function skip(){var m=0;tag(0,'try: jump to authorize');mv(0,CX[2]-12,86,{dur:900,col:.5});
  after(900,function(){flash($('g1'),'am',1100);D[0].glow=1;tag(0,'refused: review required');ledger('10:06  refused: skipped review','am')});
  after(1500,function(){mv(0,CX[0]+38,86,{dur:700,col:1});tag(0,'Record #1043 | intake')});
  after(2300,function(){tag(-1);banner('Invalid transitions are impossible.')});
  after(4000,function(){wave(0)})}
 after(1200,function(){wave(0)})}

/* ---------- 02 product ---------- */
var CP=[[14,70],[188,70],[14,180],[188,180]],S2=[];
CP.forEach(function(c){grid(c[0]+55,c[1]+34,3,22,22,9).forEach(function(q){S2.push(q)})});
var MN=['interface','workflows','rules engine','file storage'],MD=['domain split','data ownership','rules as data','storage contract'];
function scene2(){
 var h='<rect id="pz-bx" x="6" y="58" width="348" height="236" rx="14" style="stroke-dasharray:1300;stroke-dashoffset:1300"/><text x="16" y="50">boundary: one product</text>';
 CP.forEach(function(c,m){h+='<rect class="mc" id="pz-mc'+m+'" x="'+c[0]+'" y="'+c[1]+'" width="158" height="104" rx="10" style="opacity:0"/><text id="pz-l'+m+'" class="hid" x="'+(c[0]+12)+'" y="'+(c[1]+22)+'">'+MN[m]+'</text><text id="pz-a'+m+'" class="hid" x="'+(c[0]+12)+'" y="'+(c[1]+94)+'">ADR-0'+(m+1)+'</text>'});
 DEC[1].innerHTML=h;logReset('decision records','ADR');
 if(RM){$('bx').style.strokeDashoffset=0;CP.forEach(function(c,m){$('mc'+m).style.opacity=1;$('l'+m).classList.remove('hid');$('a'+m).classList.remove('hid')});D.forEach(function(d,i){mv(i,S2[i][0],S2[i][1],{col:1})});banner('Four modules. Every decision on record.');return}
 D.forEach(function(d,i){mv(i,S2[i][0],-24,{dur:500,delay:i*8,col:0})});
 after(650,function(){var b=$('bx');b.style.transition='stroke-dashoffset 1.6s ease-out';b.style.strokeDashoffset=0;
  CP.forEach(function(c,m){after(m*520,function(){var r=$('mc'+m);r.style.transition='opacity .6s';r.style.opacity=1})});
  D.forEach(function(d,i){var m=Math.floor(i/9),dl=m*520+(i%9)*55+250;mv(i,S2[i][0],S2[i][1],{dur:850,delay:dl,col:1});after(dl+820,function(){D[i].glow=.9})});
  for(var m=0;m<4;m++)(function(m){after(m*520+1100,function(){$('l'+m).classList.remove('hid');$('a'+m).classList.remove('hid')})})(m);
  after(3800,function(){banner('Four modules. Every decision on record.');pulse(0)})});
 function pulse(m){if(cur!==1)return;var a=$('a'+m);a.textContent='ADR-0'+(m+1)+' decided';logPush('ADR-0'+(m+1)+'  '+MN[m]+': '+MD[m]);a.classList.add('mi');tag(m*9+4,'decided: '+MD[m]);
  for(var j=0;j<9;j++)(function(j){after(j*50,function(){D[m*9+j].glow=1})})(j);
  after(1100,function(){a.textContent='ADR-0'+(m+1);a.classList.remove('mi')});
  after(1400,function(){pulse((m+1)%4)})}
 }
/* ---------- 03 migration ---------- */
var OLD=scat(11,18,84,128,200,N),SL=grid(202,96,6,27,27,N);
function scene3(){
 var h='<line x1="176" y1="60" x2="176" y2="296"/><text x="18" y="72">legacy</text><text x="202" y="72">new</text><rect x="202" y="262" width="135" height="10" rx="5"/><rect id="pz-pf" x="202" y="262" width="0" height="10" rx="5" style="fill:#14cf93;stroke:none;stroke-dasharray:none"/><text id="pz-pt" x="202" y="254">parity 0%</text>';
 SL.forEach(function(p){h+='<circle class="slot" cx="'+p[0]+'" cy="'+p[1]+'" r="5.5"/>'});DEC[2].innerHTML=h;logReset('migration','old -> new');
 function cnt(n){logSet(0,'legacy screens in service: '+n,n===0?'mi':'');var p=Math.round((N-n)/N*100);$('pf').setAttribute('width',(135*p/100).toFixed(1));$('pt').textContent='parity '+p+'%'}
 if(RM){D.forEach(function(d,i){mv(i,SL[i][0],SL[i][1],{col:1})});cnt(0);banner('Many screens. One workflow. Parity first.');return}
 moveAll(OLD,{arc:20,col:0});
 function step(j){if(cur!==2)return;if(j>=N){tag(-1);banner('Many screens. One workflow. Parity first.');after(2400,reset);return}
  if(j===0)banner('');tag(j,'Screen '+(101+j*17));
  mv(j,SL[j][0],SL[j][1],{dur:950,arc:46,col:1});if(j%9===8)after(930,function(){logPush('Screen '+(101+j*17)+' moved, parity checked')});
  after(930,function(){D[j].glow=1;cnt(N-j-1)});
  after(215,function(){step(j+1)})}
 function reset(){logReset('migration','old -> new');cnt(N);moveAll(OLD,{dur:850,stag:10,arc:-20,col:0});after(1500,function(){step(0)})}
 after(1250,function(){step(0)})}
/* ---------- 04 AI ---------- */
var Q=[];for(var i=0;i<N;i++)Q.push([18+(i%3)*14,72+Math.floor(i/3)*20]);
var UP=grid(208,86,6,27,27,24),DN=grid(214,236,4,24,24,12),GX=116,GY=190;
function scene4(){
 DEC[3].innerHTML='<line x1="'+GX+'" y1="60" x2="'+GX+'" y2="175"/><line x1="'+GX+'" y1="205" x2="'+GX+'" y2="296"/><circle id="pz-ev" cx="'+GX+'" cy="'+GY+'" r="15"/><text x="208" y="72">answered, with evidence</text><text x="214" y="224">to a person</text><circle cx="322" cy="250" r="10"/><path d="M307 278c2-14 28-14 30 0"/>';
 var a=0,b=0;logReset('routing','by confidence');function cn(){logSet(0,'answered '+a+' | to a person '+b)}
 if(RM){var aa=0,bb=0;D.forEach(function(d,i){if(i%3!==0){var p=UP[aa++];mv(i,p[0],p[1],{col:1})}else{var q=DN[bb++];mv(i,q[0],q[1],{col:0})}});a=24;b=12;cn();banner('Low confidence goes to a person.');return}
 moveAll(Q,{arc:0,col:0});
 function rel(k){if(cur!==3)return;if(k>=N){tag(-1);banner('Low confidence goes to a person.');after(2400,reset);return}
  if(k===0)banner('');var ok=k%3!==0,cf=ok?80+((k*7)%19):30+((k*5)%28);
  tag(k,'request #'+(k+1));mv(k,GX,GY,{dur:520,col:0});
  after(560,function(){var ev=$('ev');tag(k,'conf '+cf+'% -> '+(ok?'answer':'person'));if(k%4===0)logPush('request #'+(k+1)+'  '+cf+'% -> '+(ok?'answered':'to a person'),ok?'':'am');ev.style.stroke=ok?'#14cf93':'#e8b86a';setTimeout(function(){ev.style.stroke=''},520)});
  after(1100,function(){if(ok){var p=UP[a];mv(k,p[0],p[1],{dur:850,arc:26,col:1});after(840,function(){D[k].glow=1;a++;cn()})}
   else{var q=DN[b];mv(k,q[0],q[1],{dur:850,arc:-18,col:0});after(840,function(){D[k].glow=.6;b++;cn()})}});
  after(430,function(){rel(k+1)})}
 function reset(){logReset('routing','by confidence');a=0;b=0;cn();moveAll(Q,{dur:850,stag:12,arc:0,col:0});after(1400,function(){rel(0)})}
 after(1200,function(){rel(0)})}
function measure(){var w=sv.getBoundingClientRect().width||360;K=Math.max(.8,w/360);SC2=1+(K-1)*.4;
 sv.style.setProperty('--fs',(10*SC2/K).toFixed(2)+'px');sv.style.setProperty('--fst',(10.5*SC2/K).toFixed(2)+'px');
 D.forEach(function(d){d.tr[0].setAttribute('r',rs(5).toFixed(2));d.tr[1].setAttribute('r',rs(5).toFixed(2))});
 if(tagI>=0)tag(tagI,$('tagt').textContent)}
var SC=[scene1,scene2,scene3,scene4];
var root=document.querySelector('[data-pz]'),chips=[].slice.call(root.querySelectorAll('.pz-chip')),cards=[].slice.call(root.querySelectorAll('.pz-card')),pips=[].slice.call(root.querySelectorAll('.pz-pager i')),askEl=$('ask');
if(chips.length!==SC.length||cards.length!==SC.length)return;   // data and scenes must stay four-and-four
root.classList.add('is-js');cards[0].classList.add('on');pips[0].classList.add('on');
function show(k){k=(k+SC.length)%SC.length;if(k===cur)return;cur=k;clr();tag(-1);banner('');
 DEC.forEach(function(g,i){g.classList.toggle('on',i===k)});
 chips.forEach(function(c,i){c.setAttribute('aria-selected',i===k?'true':'false');c.tabIndex=i===k?0:-1});
 pips.forEach(function(c,i){c.classList.toggle('on',i===k)});
 askEl.textContent=chips[k].getAttribute('data-ask');
 cards.forEach(function(c,i){if(i===k){if(!c.classList.contains('on')){c.classList.add('sw','on');requestAnimationFrame(function(){requestAnimationFrame(function(){c.classList.remove('sw')})})}}else c.classList.remove('on','sw')});
 SC[k]()}
chips.forEach(function(c,i){c.addEventListener('click',function(){show(i);c.scrollIntoView({inline:'center',block:'nearest',behavior:RM?'auto':'smooth'})})});
root.querySelector('.pz-chips').addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;e.preventDefault();show(cur+d);chips[cur].focus()});
var sx=0,sy=0,v=$('view');
v.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
v.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))show(cur+(dx<0?1:-1))});
if(!RM&&matchMedia('(pointer:fine)').matches){v.addEventListener('pointermove',function(e){var r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;sv.style.transform='rotateY('+(x*7).toFixed(2)+'deg) rotateX('+(-y*6).toFixed(2)+'deg)'});v.addEventListener('pointerleave',function(){sv.style.transform=''})}
// run only while on screen: the frame loop and every scene timer stop when it leaves, and the sequence restarts on return
function wake(on){if(on===vis)return;vis=on;if(on){measure();now=performance.now();raf=requestAnimationFrame(frame);var k=cur<0?0:cur;cur=-1;show(k)}else{cancelAnimationFrame(raf);clr()}}
if('ResizeObserver' in window){new ResizeObserver(measure).observe(sv)}else{window.addEventListener('resize',measure)}
if('IntersectionObserver' in window){new IntersectionObserver(function(es){wake(es[0].isIntersecting)},{threshold:.15}).observe(v)}else{wake(true)}
})();
