/* ===== Bärn Kit v1 · micro-interactions (no network, no storage except session flag) ===== */
(function(){
'use strict';
var K=window.K=window.K||{};
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* splash: once per session, removed after animation */
(function(){
  var s=document.querySelector('.k-splash'); if(!s) return;
  var seen=false; try{ seen=sessionStorage.getItem('k-splash')==='1'; sessionStorage.setItem('k-splash','1'); }catch(e){}
  if(seen||reduced){ s.remove(); return; }
  var done=false; function kill(){ if(done) return; done=true; s.remove(); }
  s.addEventListener('animationend',function(e){ if(e.target===s) kill(); });
  setTimeout(kill,1400);
})();
/* haptics: tiny tick on primary actions where supported */
var armed=false; document.addEventListener('pointerdown',function(){ armed=true; },{passive:true,once:true}); document.addEventListener('keydown',function(){ armed=true; },{passive:true,once:true});
K.tick=function(ms){ try{ if(armed&&navigator.vibrate) navigator.vibrate(ms||8); }catch(e){} };
/* shake feedback for invalid input / wrong answer */
K.shake=function(el){ if(!el||reduced) return; el.classList.remove('k-shake'); void el.offsetWidth; el.classList.add('k-shake'); K.tick([12,40,12]); el.addEventListener('animationend',function h(){ el.classList.remove('k-shake'); el.removeEventListener('animationend',h); }); };
K.pop=function(el){ if(!el||reduced) return; el.classList.remove('k-pop'); void el.offsetWidth; el.classList.add('k-pop'); };
/* toast */
var tt,ttT; K.toast=function(m){ if(!tt){ tt=document.createElement('div'); tt.className='k-toast'; tt.setAttribute('role','status'); document.body.appendChild(tt); } tt.textContent=m; tt.classList.add('show'); clearTimeout(ttT); ttT=setTimeout(function(){ tt.classList.remove('show'); },2000); };
/* stagger entrance for freshly rendered lists: K.stagger(container) */
K.stagger=function(root,max){ if(!root||reduced) return; var kids=root.children,n=Math.min(kids.length,max||14); for(var i=0;i<n;i++){ kids[i].style.setProperty('--i',i); kids[i].classList.add('k-in'); } };
/* delegated haptics on primary buttons */
document.addEventListener('pointerdown',function(e){ var b=e.target.closest&&e.target.closest('.k-btn.primary,.k-chip,.k-seg button'); if(b) K.tick(6); },{passive:true});
/* language persistence for the kit switcher (.lang button[data-l]) */
(function(){ var KEY='k-lang'; document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.lang button[data-l]'); if(b){ try{ localStorage.setItem(KEY,b.dataset.l); }catch(x){} } },true);
  function restore(){ var v=null; try{ v=localStorage.getItem(KEY); }catch(x){} if(!v) return; var b=document.querySelector('.lang button[data-l="'+v+'"]'); if(b&&b.getAttribute('aria-pressed')!=='true') b.click(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',restore); else restore(); })();
/* sticky header shadow */
var top=document.querySelector('.k-top.sticky'); if(top){ var on=false; window.addEventListener('scroll',function(){ var s=window.scrollY>8; if(s!==on){ on=s; top.classList.toggle('scrolled',s); } },{passive:true}); }
})();
