const secret=document.getElementById('secret');
secret?.addEventListener('click',()=>{
  secret.classList.toggle('revealed');
  secret.setAttribute('aria-expanded',secret.classList.contains('revealed'));
});
document.getElementById('openCase')?.addEventListener('click',()=>{
  document.getElementById('cases').scrollIntoView({behavior:'smooth'});
});
document.getElementById('shareBtn')?.addEventListener('click',async()=>{
  const data={title:document.title,text:'Дело раскрыто. Главная улика — внимание.',url:location.href};
  try{
    if(navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(location.href);
  }catch(e){}
});


const bgMusic = document.getElementById('bgMusic');
const clockTick = document.getElementById('clockTick');
const soundToggle = document.getElementById('soundToggle');

let soundOn = false;
let audioUnlocked = false;

if (bgMusic) bgMusic.volume = 0.24;
if (clockTick) clockTick.volume = 0.10;

async function startAudio() {
  try {
    await Promise.all([
      bgMusic?.play(),
      clockTick?.play()
    ]);
    soundOn = true;
    audioUnlocked = true;
    soundToggle?.setAttribute('aria-pressed', 'true');
    if (soundToggle) {
      soundToggle.querySelector('.sound-icon').textContent = '🔊';
      soundToggle.setAttribute('aria-label', 'Выключить звук');
    }
  } catch (e) {
    // Browser may require a direct user gesture.
  }
}

function stopAudio() {
  bgMusic?.pause();
  clockTick?.pause();
  soundOn = false;
  soundToggle?.setAttribute('aria-pressed', 'false');
  if (soundToggle) {
    soundToggle.querySelector('.sound-icon').textContent = '🔇';
    soundToggle.setAttribute('aria-label', 'Включить звук');
  }
}

soundToggle?.addEventListener('click', async () => {
  if (soundOn) stopAudio();
  else await startAudio();
});

// Unlock audio on the first meaningful interaction with the page.
// Sound starts only after a user gesture, which works reliably on mobile browsers.
const unlockOnce = async (event) => {
  if (audioUnlocked) return;
  if (event.target.closest('#soundToggle')) return;
  await startAudio();
  if (audioUnlocked) {
    document.removeEventListener('pointerdown', unlockOnce, true);
    document.removeEventListener('touchstart', unlockOnce, true);
  }
};
document.addEventListener('pointerdown', unlockOnce, true);
document.addEventListener('touchstart', unlockOnce, true);

// Fade music slightly when the user switches tabs and restore on return.
document.addEventListener('visibilitychange', () => {
  if (!bgMusic || !clockTick || !soundOn) return;
  if (document.hidden) {
    bgMusic.volume = 0.10;
    clockTick.volume = 0.04;
  } else {
    bgMusic.volume = 0.24;
    clockTick.volume = 0.10;
  }
});
