const secret=document.getElementById('secret');
secret?.addEventListener('click',()=>{secret.classList.toggle('revealed');secret.setAttribute('aria-expanded',secret.classList.contains('revealed'));});
document.getElementById('openCases')?.addEventListener('click',()=>document.getElementById('cases').scrollIntoView({behavior:'smooth'}));
const bgMusic=document.getElementById('bgMusic'); const clockTick=document.getElementById('clockTick');
if(bgMusic) bgMusic.volume=.26; if(clockTick) clockTick.volume=.08;
async function startAtmosphere(){try{await bgMusic?.play()}catch(e){} try{await clockTick?.play()}catch(e){}}
startAtmosphere();
const unlock=()=>{startAtmosphere();document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('touchstart',unlock,true);document.removeEventListener('click',unlock,true);};
document.addEventListener('pointerdown',unlock,true);document.addEventListener('touchstart',unlock,true);document.addEventListener('click',unlock,true);
