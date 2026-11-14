'use strict';
const RELEASE = Date.parse('2026-12-18T00:00:00+09:00');
function remaining(now){const total=Math.max(0,Math.ceil((RELEASE-now)/1000));return [Math.floor(total/86400),Math.floor(total/3600)%24,Math.floor(total/60)%60,total%60];}
const ids=['days','hours','minutes','seconds'];
function tick(){const values=remaining(Date.now());ids.forEach((id,i)=>{document.getElementById(id).textContent=String(values[i]).padStart(i===0?1:2,'0');});if(Date.now()>=RELEASE){document.getElementById('release-message').textContent='本日より公開 — 映画館へ、アッセンブル。';if(Date.now()>=RELEASE+86400000)document.getElementById('release-message').textContent='公開日を迎えました。映画館へ、アッセンブル。';document.title='DOOMSDAY — 公開日を迎えました';}else document.title=`公開まで${values[0]}日 | DOOMSDAY`;}
tick();setInterval(tick,1000);document.addEventListener('visibilitychange',tick);
const motion=document.getElementById('motion');let still=matchMedia('(prefers-reduced-motion: reduce)').matches;try{const saved=localStorage.getItem('doomsday-still');if(saved!==null)still=saved==='true';}catch{}
function applyMotion(){document.body.classList.toggle('still',still);motion.setAttribute('aria-pressed',String(still));motion.innerHTML='<span class="status-dot"></span> '+(still?'演出を再開':'演出を停止');}applyMotion();motion.addEventListener('click',()=>{still=!still;applyMotion();try{localStorage.setItem('doomsday-still',String(still));}catch{}});
const fullscreen=document.getElementById('fullscreen');if(!document.fullscreenEnabled)fullscreen.hidden=true;
fullscreen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{fullscreen.querySelector('span').textContent='F11キーで全画面';}});
document.addEventListener('fullscreenchange',()=>{fullscreen.querySelector('span').textContent=document.fullscreenElement?'全画面を閉じる':'全画面で待つ';});

