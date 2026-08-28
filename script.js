const cases=[
{n:'01',t:'Велосипедное приключение',d:'Маршрут выберем вместе. Главное — дорога, разговор и немного приключения.',img:'assets/case-01.jpg'},
{n:'02',t:'Кофе и разговор',d:'Без спешки и лишнего шума. Просто хороший кофе и время поговорить.',img:'assets/case-02.jpg'},
{n:'03',t:'Вечер настольных игр',d:'Стратегия, смех и азарт. Победит дружба. Или нет?',img:'assets/case-03.jpg'},
{n:'04',t:'Прогулка без маршрута',d:'Улицы, истории и случайные находки. Идём туда, куда захочется.',img:'assets/case-04.jpg'},
{n:'05',t:'Киновечер',d:'Выберем фильм, что-нибудь вкусное и устроим спокойный вечер.',img:'assets/case-05.jpg'},
{n:'06',t:'Приготовим вместе',d:'Выберем блюдо, включим музыку и приготовим его вместе.',img:'assets/case-06.jpg'}];
const secret=document.getElementById('secret');secret?.addEventListener('click',()=>secret.classList.toggle('revealed'));
document.getElementById('toCases')?.addEventListener('click',()=>document.getElementById('cases').scrollIntoView({behavior:'smooth'}));
document.getElementById('backToCases')?.addEventListener('click',()=>document.getElementById('cases').scrollIntoView({behavior:'smooth'}));
const music=document.getElementById('music'),tick=document.getElementById('tick');if(music)music.volume=.26;if(tick)tick.volume=.08;
async function startAudio(){try{await music?.play()}catch(e){}try{await tick?.play()}catch(e){}}startAudio();
const unlock=()=>{startAudio();document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('touchstart',unlock,true)};document.addEventListener('pointerdown',unlock,true);document.addEventListener('touchstart',unlock,true);
const modal=document.getElementById('caseModal'),close=document.getElementById('modalClose'),number=document.getElementById('modalNumber'),title=document.getElementById('modalTitle'),image=document.getElementById('modalImage'),desc=document.getElementById('modalDesc'),grid=document.getElementById('timeGrid');
const slots=[['УТРО','09:00 – 12:00'],['ДЕНЬ','12:00 – 16:00'],['ВЕЧЕР','16:00 – 20:00'],['НОЧЬ','20:00 – 23:00']];
function openCase(i){const c=cases[i];number.textContent=`ДЕЛО №${c.n}`;title.textContent=c.t;image.src=c.img;image.alt=c.t;desc.textContent=c.d;grid.innerHTML='';slots.forEach(([label,time])=>{const a=document.createElement('a');const msg=`Привет! Я выбираю «${c.t}». Удобное время: ${label.toLowerCase()} (${time}). Давай договоримся 🙂`;a.className='time-option';a.href=`https://t.me/vshooroop?text=${encodeURIComponent(msg)}`;a.target='_blank';a.rel='noopener';a.innerHTML=`<span>${label}</span><small>${time}</small>`;grid.appendChild(a)});modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
document.querySelectorAll('.open-case').forEach(btn=>btn.addEventListener('click',()=>openCase(Number(btn.dataset.index))));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}close?.addEventListener('click',closeModal);modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});