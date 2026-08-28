
(() => {
  const root = document.documentElement;

  /* ---------- Core interactions ---------- */
  const secret = document.getElementById('secret');
  secret?.addEventListener('click', () => {
    secret.classList.toggle('revealed');
    secret.setAttribute('aria-expanded', secret.classList.contains('revealed'));
  });

  document.getElementById('openCases')?.addEventListener('click', () => {
    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Audio ---------- */
  const bgMusic = document.getElementById('bgMusic');
  const clockTick = document.getElementById('clockTick');
  if (bgMusic) bgMusic.volume = 0.26;
  if (clockTick) clockTick.volume = 0.075;

  async function startAtmosphere() {
    try { await bgMusic?.play(); } catch (_) {}
    try { await clockTick?.play(); } catch (_) {}
  }
  startAtmosphere();

  const unlockAudio = () => {
    startAtmosphere();
    document.removeEventListener('pointerdown', unlockAudio, true);
    document.removeEventListener('touchstart', unlockAudio, true);
    document.removeEventListener('click', unlockAudio, true);
  };
  document.addEventListener('pointerdown', unlockAudio, true);
  document.addEventListener('touchstart', unlockAudio, true);
  document.addEventListener('click', unlockAudio, true);

  /* ---------- Visual theme overrides ---------- */
  const style = document.createElement('style');
  style.textContent = `
    :root{
      --case-gold:#c59a55;
      --case-gold-soft:#e0bd7e;
      --case-red:#6f1c12;
      --case-red-hi:#912b1c;
      --case-black:#090705;
      --case-panel:#15100b;
      --case-paper:#c99b60;
    }

    body{background:#050403!important;color:var(--case-gold-soft)!important}
    main{background:#050403}

    .hero-inner{
      width:min(88vw,420px)!important;
      padding-top:12svh!important;
    }
    .hero-bg{filter:saturate(.82) contrast(1.08) brightness(.88)}
    .hero:after,.finale:after{
      content:"";
      position:absolute;inset:0;
      pointer-events:none;z-index:-1;
      background:
        radial-gradient(circle at 12% 18%,rgba(255,178,69,.14),transparent 18%),
        radial-gradient(circle at 82% 46%,rgba(255,178,69,.08),transparent 14%),
        linear-gradient(to bottom,rgba(0,0,0,.06),rgba(0,0,0,.35));
    }

    .case-tag{
      background:#9e713e!important;
      color:#1d120b!important;
      border:1px solid #c69959!important;
      box-shadow:0 7px 18px #000a!important;
      transform:rotate(-1deg)
    }
    .eyebrow{color:#a7432e!important}
    h1{color:#d7b476!important;text-shadow:0 3px 16px #000}
    .lead{color:#d8b87a!important}
    .secret{
      border:1px solid #9d743b!important;
      background:rgba(8,6,4,.82)!important;
      color:#d7b77b!important
    }
    .primary{
      background:linear-gradient(#8d2c1e,#57140e)!important;
      border-color:#a04e30!important;
      color:#efd398!important
    }

    /* Catalogue like an archival case index */
    .cases{
      padding:3.2rem .72rem 4rem!important;
      background:
        radial-gradient(circle at 50% 0,rgba(130,83,32,.18),transparent 25%),
        linear-gradient(rgba(7,5,3,.9),rgba(6,4,3,.98))!important;
    }
    .section-head h2{
      color:#d4af70!important;
      font-size:clamp(2rem,9vw,3rem)!important;
      text-shadow:0 3px 14px #000
    }
    .section-head p{color:#bf995f!important}

    .cases-stack{
      gap:.65rem!important;
    }
    .case-card{
      display:grid!important;
      grid-template-columns:42% 58%!important;
      min-height:128px!important;
      background:#18110b!important;
      border:1px solid #815a2c!important;
      box-shadow:0 8px 18px #000a!important;
      overflow:hidden!important;
      cursor:pointer!important;
      position:relative!important;
    }
    .case-card:after{
      content:"";
      position:absolute;inset:4px;
      border:1px solid rgba(191,143,70,.23);
      pointer-events:none
    }
    .case-image{
      height:100%!important;
      min-height:128px!important;
      order:2;
      background-position:center!important;
      filter:sepia(.2) saturate(.85) contrast(1.05) brightness(.88)
    }
    .case-copy{
      order:1;
      background:
        linear-gradient(rgba(213,174,112,.94),rgba(190,140,82,.93))!important;
      padding:.82rem .75rem!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      min-width:0!important;
    }
    .case-number{font-size:.67rem!important}
    .case-card h3{
      font-size:.93rem!important;
      line-height:1.05!important;
      margin:.34rem 0!important;
      overflow-wrap:anywhere
    }
    .case-card .rule{margin:.06rem 0!important}
    .case-card p,
    .case-card .telegram-btn,
    .case-card .telegram-link{display:none!important}
    .case-card .case-copy:after{
      content:"ОТКРЫТЬ ДЕЛО";
      font-size:.58rem;
      letter-spacing:.08em;
      color:#5d351c;
      margin-top:.35rem;
      font-weight:900
    }

    /* Final page */
    .final-bg{filter:saturate(.82) contrast(1.08) brightness(.85)}
    .final-inner{width:min(88vw,420px)!important;padding-top:9svh!important}
    .final-title{color:#d6b172!important;text-shadow:0 3px 14px #000}
    .false-leads span{color:#c7a56a!important}
    .notice{
      background:
        linear-gradient(rgba(207,165,105,.96),rgba(185,135,77,.97))!important;
      border:1px solid #8e6130!important;
      box-shadow:0 14px 30px #000b!important;
      position:relative
    }
    .notice:before{
      content:"";
      position:absolute;inset:8px;border:1px solid rgba(94,59,27,.35);
      pointer-events:none
    }

    /* fixed page menu */
    #caseMenuButton{
      position:fixed;top:max(14px,env(safe-area-inset-top));right:14px;z-index:1200;
      width:46px;height:46px;border-radius:50%;
      border:1px solid #a1783f;background:rgba(8,6,4,.84);
      color:#d5ad69;font-size:1.35rem;line-height:1;
      display:grid;place-items:center;box-shadow:0 6px 18px #0009;
      backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)
    }

    .case-overlay{
      position:fixed;inset:0;z-index:1500;
      background:#080604;
      color:#d6b273;
      overflow-y:auto;
      overscroll-behavior:contain;
      padding:max(18px,env(safe-area-inset-top)) 14px max(24px,env(safe-area-inset-bottom));
      display:none;
    }
    .case-overlay.open{display:block;animation:caseFade .25s ease-out}
    @keyframes caseFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

    .overlay-shell{
      width:min(100%,430px);margin:auto;min-height:100%;
      position:relative;padding:3.1rem 0 2rem
    }
    .overlay-close{
      position:absolute;right:0;top:0;width:44px;height:44px;
      border:1px solid #8b6433;border-radius:50%;
      background:#100b07;color:#d8b574;font-size:1.35rem
    }
    .overlay-tag{
      width:max-content;margin:0 auto .9rem;padding:.42rem .8rem;
      background:#9c6e3b;color:#21130b;border:1px solid #c29454;
      font-weight:900;font-size:.76rem;transform:rotate(-1deg)
    }
    .overlay-title{
      text-align:center;margin:.2rem auto .9rem;
      font-size:clamp(2rem,10vw,3.15rem);line-height:.95;
      color:#d9b575;text-shadow:0 3px 16px #000
    }
    .overlay-image{
      width:100%;aspect-ratio:4/3;background-size:cover;background-position:center;
      border:1px solid #93672f;box-shadow:0 10px 24px #000b;
      filter:sepia(.15) saturate(.9) brightness(.9);
      position:relative
    }
    .overlay-image:after{
      content:"";position:absolute;inset:0;
      box-shadow:inset 0 0 60px #0008;border:7px solid rgba(20,12,6,.18)
    }
    .overlay-copy{
      text-align:center;color:#c9a469;font-size:.94rem;line-height:1.45;
      margin:1rem auto .9rem;max-width:360px
    }
    .time-heading{
      text-align:center;font-size:.73rem;letter-spacing:.13em;
      color:#c8a066;font-weight:900;margin:1.2rem 0 .55rem
    }
    .time-grid{display:grid;gap:.45rem}
    .time-option{
      border:1px solid #8d4228;background:linear-gradient(#81291d,#4f140e);
      color:#e7c98f;min-height:48px;padding:.72rem .8rem;
      display:grid;grid-template-columns:28px 1fr auto;align-items:center;
      text-decoration:none;font-weight:900;font-size:.78rem;
      box-shadow:0 5px 12px #0007
    }
    .time-option .time-label{text-align:left;letter-spacing:.06em}
    .time-option .time-range{font-size:.72rem;font-weight:500;color:#cfae76}
    .overlay-telegram{
      display:block;text-align:center;margin:1rem auto 0;
      color:#caa56d;text-decoration:none;font-size:.78rem
    }

    .menu-panel{
      position:fixed;inset:0;z-index:1600;display:none;
      background:rgba(4,3,2,.9);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);
      padding:max(70px,calc(env(safe-area-inset-top) + 60px)) 18px 30px
    }
    .menu-panel.open{display:block}
    .menu-card{
      width:min(100%,420px);margin:auto;border:1px solid #8c6534;
      background:#100c08;padding:1rem;box-shadow:0 12px 34px #000c
    }
    .menu-card h3{text-align:center;color:#d4ad6d;margin:.35rem 0 1rem}
    .menu-item{
      width:100%;min-height:48px;margin:.4rem 0;border:1px solid #684421;
      background:#18100a;color:#d2ad70;text-align:left;padding:.8rem 1rem
    }
    .menu-close{
      width:100%;margin-top:.8rem;min-height:46px;border:1px solid #8a3b27;
      background:#641b12;color:#e4c58b
    }

    .info-panel{
      position:fixed;inset:0;z-index:1700;display:none;
      background:rgba(4,3,2,.94);padding:max(48px,env(safe-area-inset-top)) 16px 28px;
      overflow-y:auto
    }
    .info-panel.open{display:block}
    .info-card{
      width:min(100%,420px);margin:2rem auto 0;padding:1.15rem;
      border:1px solid #8b6330;background:#100c08;color:#d1aa6b;
      box-shadow:0 14px 32px #000c;text-align:center
    }
    .info-card h2{margin:.25rem 0 1rem;color:#d6af6f;font-size:1.7rem}
    .info-card p{line-height:1.55;color:#c5a067}
    .info-step{
      display:grid;grid-template-columns:38px 1fr;gap:.65rem;text-align:left;
      margin:.85rem 0;padding:.65rem 0;border-bottom:1px solid #4f341a
    }
    .info-step b{font-size:1.35rem;color:#c7964f}
    .info-close{
      margin-top:1rem;width:100%;min-height:48px;border:1px solid #8d3b27;
      background:#6d1c13;color:#e6c88e
    }

    @media(min-width:600px){
      .case-overlay,.menu-panel,.info-panel{left:50%;right:auto;width:430px;transform:translateX(-50%)}
    }
  `;
  document.head.appendChild(style);

  /* ---------- Menu ---------- */
  const menuButton = document.createElement('button');
  menuButton.id = 'caseMenuButton';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Открыть меню');
  menuButton.textContent = '☰';
  document.body.appendChild(menuButton);

  const menu = document.createElement('div');
  menu.className = 'menu-panel';
  menu.innerHTML = `
    <div class="menu-card">
      <h3>МАТЕРИАЛЫ ДЕЛА</h3>
      <button class="menu-item" data-go="top">⌂ &nbsp; Начало расследования</button>
      <button class="menu-item" data-go="cases">⌕ &nbsp; Выбрать следующее дело</button>
      <button class="menu-item" data-info="how">◉ &nbsp; Как это работает?</button>
      <button class="menu-item" data-info="music">♫ &nbsp; Музыка детектива</button>
      <button class="menu-item" data-go="finale">✦ &nbsp; Заключение следствия</button>
      <button class="menu-close" type="button">ЗАКРЫТЬ</button>
    </div>`;
  document.body.appendChild(menu);

  menuButton.addEventListener('click', () => menu.classList.add('open'));
  menu.querySelector('.menu-close').addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      menu.classList.remove('open');
      document.getElementById(btn.dataset.go)?.scrollIntoView({behavior:'smooth'});
    });
  });

  /* ---------- Info panels ---------- */
  const info = document.createElement('div');
  info.className = 'info-panel';
  info.innerHTML = `<div class="info-card"></div>`;
  document.body.appendChild(info);
  const infoCard = info.querySelector('.info-card');

  function openInfo(type){
    if(type === 'how'){
      infoCard.innerHTML = `
        <h2>КАК ЭТО РАБОТАЕТ?</h2>
        <div class="info-step"><b>1</b><div><strong>Выберите дело</strong><br>Каждое дело — это идея, как провести время вместе.</div></div>
        <div class="info-step"><b>2</b><div><strong>Выберите время</strong><br>Утро, день, вечер или ночь — выберите удобный вариант.</div></div>
        <div class="info-step"><b>3</b><div><strong>Напишите в Telegram</strong><br>Сообщение уже будет подготовлено. Останется только отправить.</div></div>
        <p>Детективная история продолжается с вами.</p>
        <button class="info-close" type="button">ПОНЯТНО</button>`;
    } else {
      infoCard.innerHTML = `
        <h2>МУЗЫКА ДЕТЕКТИВА</h2>
        <div style="font-size:4rem;margin:.5rem 0">♬</div>
        <p>Музыка и тихое тиканье часов работают в фоне и поддерживают атмосферу расследования.</p>
        <p>На мобильных браузерах звук может начать воспроизводиться после первого касания страницы.</p>
        <button class="info-close" type="button">ПОНЯТНО</button>`;
    }
    info.classList.add('open');
    infoCard.querySelector('.info-close').addEventListener('click',()=>info.classList.remove('open'));
  }
  menu.querySelectorAll('[data-info]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      menu.classList.remove('open');
      openInfo(btn.dataset.info);
    });
  });

  /* ---------- Case detail overlay ---------- */
  const overlay = document.createElement('div');
  overlay.className = 'case-overlay';
  overlay.innerHTML = `<div class="overlay-shell"></div>`;
  document.body.appendChild(overlay);
  const shell = overlay.querySelector('.overlay-shell');

  const cards = [...document.querySelectorAll('.case-card')];
  const timeSlots = [
    ['☀','УТРО','09:00 – 12:00'],
    ['◉','ДЕНЬ','12:00 – 16:00'],
    ['◧','ВЕЧЕР','16:00 – 20:00'],
    ['◔','НОЧЬ','20:00 – 23:00']
  ];

  function telegramUrl(title, slot){
    const msg = `Привет! Я выбираю «${title}». Удобное время: ${slot[1].toLowerCase()} (${slot[2]}). Давай договоримся 🙂`;
    return `https://t.me/vshooroop?text=${encodeURIComponent(msg)}`;
  }

  function openCase(card, index){
    const number = card.querySelector('.case-number')?.textContent?.trim() || `ДЕЛО №${String(index+1).padStart(2,'0')}`;
    const title = card.querySelector('h3')?.textContent?.trim() || 'СЛЕДУЮЩЕЕ ДЕЛО';
    const desc = card.querySelector('p')?.textContent?.trim() || '';
    const imageStyle = card.querySelector('.case-image')?.style.backgroundImage || '';

    const times = timeSlots.map(slot => `
      <a class="time-option" href="${telegramUrl(title,slot)}" target="_blank" rel="noopener">
        <span>${slot[0]}</span>
        <span class="time-label">${slot[1]}</span>
        <span class="time-range">${slot[2]}</span>
      </a>`).join('');

    shell.innerHTML = `
      <button class="overlay-close" type="button" aria-label="Закрыть">×</button>
      <div class="overlay-tag">${number}</div>
      <h2 class="overlay-title">${title}</h2>
      <div class="overlay-image" style="background-image:${imageStyle}"></div>
      <p class="overlay-copy">${desc}</p>
      <div class="time-heading">ВЫБРАТЬ ВРЕМЯ:</div>
      <div class="time-grid">${times}</div>
      <a class="overlay-telegram" href="https://t.me/vshooroop" target="_blank" rel="noopener">✈ Написать в Telegram</a>`;

    overlay.classList.add('open');
    document.body.style.overflow='hidden';
    shell.querySelector('.overlay-close').addEventListener('click', closeCase);
  }

  function closeCase(){
    overlay.classList.remove('open');
    document.body.style.overflow='';
  }

  cards.forEach((card,index)=>{
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.setAttribute('aria-label',`Открыть ${card.querySelector('h3')?.textContent || 'дело'}`);
    card.addEventListener('click',e=>{
      e.preventDefault();
      openCase(card,index);
    });
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openCase(card,index); }
    });
  });

  overlay.addEventListener('click',e=>{
    if(e.target===overlay) closeCase();
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeCase();
      menu.classList.remove('open');
      info.classList.remove('open');
    }
  });
})();
