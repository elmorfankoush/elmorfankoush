/* ══════════════════════════════════════════
   علم ولا فنكوش؟ — script.js
   ══════════════════════════════════════════ */

// ── CUSTOM CURSOR ──
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px'; cur.style.top = my+'px';
});
(function animRing(){
  rx += (mx-rx)*.12; ry += (my-ry)*.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();

// ── PARTICLES ──
const pc = document.getElementById('particles');
for(let i=0;i<25;i++){
  const p = document.createElement('div');
  p.className = 'particle';
  const sz = Math.random()*3+1, e = Math.random()>.5;
  p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;
    background:${e?'rgba(56,189,248,':'rgba(251,146,60,'}${Math.random()*.4+.1});
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
    box-shadow:0 0 ${sz*3}px ${e?'rgba(56,189,248,.5)':'rgba(251,146,60,.5)'};`;
  pc.appendChild(p);
}

// ── REVEAL ON SCROLL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('revealed'); ro.unobserve(e.target); }
  });
}, { threshold:.15 });
document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));

// ── PAGE NAVIGATION ──
function goPage(name, el){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if(el) el.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
  setTimeout(() => {
    document.querySelectorAll('#page-'+name+' [data-reveal]').forEach(el => {
      if(!el.classList.contains('revealed')) ro.observe(el);
    });
  }, 100);
}

function scrollToPlayer(){
  document.getElementById('playerSection').scrollIntoView({ behavior:'smooth' });
}

// ══════════════════════════════════════════
//  EPISODES CONFIG
// ══════════════════════════════════════════
const EPISODES = {
  1:  { suffix:'',   title:'تفسير الأحلام: حلمك رسالة ولا هبد؟',               desc:'تفسير الأحلام — بين علم الأعصاب والتراث الشعبي',               endingDesc:'الصورة الكاملة — ماذا يقول العلم وما الفرق الحقيقي؟',              overlayQ:'تفسير الأحلام…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  2:  { suffix:'2',  title:'الأبراج: حظك اليوم ولا اشتغالة؟',                     desc:'الأبراج — بين علم النفس والتراث الشعبي',                       endingDesc:'الصورة الكاملة — ماذا يقول العلم عن الأبراج؟',                      overlayQ:'الأبراج…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  3:  { suffix:'3',  title:'السحر: قوة خفية ولا وهم نفسي؟',              desc:'السحر والشعوذة — الفارق بين الاعتقاد الشعبي والتفسير النفسي',   endingDesc:'الصورة الكاملة — ماذا يقول العلم عن السحر والشعوذة؟',              overlayQ:'السحر والشعوذة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  4:  { suffix:'4',  title:'الفنجان والكف: مستقبلك في إيدك؟',         desc:'قراءة الكف والفنجان — أداة نفسية أم خداع؟',                    endingDesc:'الصورة الكاملة — ماذا يقول العلم عن قراءة الكف والفنجان؟',         overlayQ:'قراءة الكف والفنجان…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  5:  { suffix:'5',  title:'التنويم المغناطيسي: سيطرة ولا تمثيل؟',          desc:'التنويم المغناطيسي — علم حقيقي يستخدمه الأطباء أم مجرد تمثيل؟', endingDesc:'الصورة الكاملة — ماذا يقول العلم عن التنويم المغناطيسي؟',         overlayQ:'التنويم المغناطيسي…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  6:  { suffix:'6',  title:'المؤامرة: إحنا متراقبين فعلاً؟',             desc:'نظريات المؤامرة — ليه دماغنا بتصدق؟',                          endingDesc:'الصورة الكاملة — علم النفس وراء نظريات المؤامرة',                   overlayQ:'نظريات المؤامرة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  7:  { suffix:'7',  title:'وصفات جدتي: علاج ولا خرافة؟',             desc:'الوصفات الشعبية — إيه اللي العلم بيثبته وإيه اللي خرافة؟',     endingDesc:'الصورة الكاملة — العلم والوصفات الشعبية',                          overlayQ:'الوصفات الشعبية…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  8:  { suffix:'8',  title:'القدرات الخارقة: سوبرمان موجود؟',             desc:'القدرات الخارقة — اللي بيطير، اللي مينامش، اللي بيشيل عربيات', endingDesc:'الصورة الكاملة — ماذا يقول العلم عن القدرات الخارقة؟',             overlayQ:'القدرات الخارقة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  9:  { suffix:'9',  title:'التنمية البشرية: طاقة إيجابية ولا نصب؟',             desc:'التنمية البشرية — صناعة بمليارات، علم أم Placebo؟',             endingDesc:'الصورة الكاملة — ماذا يقول العلم عن التنمية البشرية؟',             overlayQ:'التنمية البشرية…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  10: { suffix:'10', title:'العلاج بالطاقة: هالة ولا وهم؟',              desc:'العلاج بالطاقة — إحساسك بالتحسن حقيقي… بس هل سببه حقيقي؟',     endingDesc:'الصورة الكاملة — ماذا يقول العلم عن العلاج بالطاقة؟',             overlayQ:'العلاج بالطاقة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  11: { suffix:'11', title:'الفضائيين: إحنا لوحدنا في الكون؟',    desc:'علم الأجسام الطائرة — بين الشهادات الحقيقية والتفسيرات العلمية', endingDesc:'الصورة الكاملة — ماذا يقول العلم عن الأجسام الطائرة المجهولة؟', overlayQ:'الأجسام الطائرة المجهولة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  12: { suffix:'12', title:'ما وراء الطبيعة: الأشباح حقيقة؟',       desc:'ظواهر ما وراء الطبيعة — الـ Paranormal تحت مجهر العلم',        endingDesc:'الصورة الكاملة — ماذا يقول العلم عن ظواهر ما وراء الطبيعة؟',    overlayQ:'ظواهر ما وراء الطبيعة…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  13: { suffix:'13', title:'الخدع البصرية: عينك بتضحك عليك؟',        desc:'الخدع البصرية — حتى عينك مش دليل… مخك بيكمّل الصورة غلط',     endingDesc:'الصورة الكاملة — العلم وراء خداع الحواس',                          overlayQ:'الخدع البصرية…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  14: { suffix:'14', title:'الاستنساخ: نسخة تانية منك؟',                   desc:'الاستنساخ — لو استنسخنا الإنسان نفسه، هو نفس الشخص؟',          endingDesc:'الصورة الكاملة — الاستنساخ بين العلم والفلسفة',                   overlayQ:'الاستنساخ…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
  15: { suffix:'15', title:'الذكاء الاصطناعي: هيحتل العالم؟', desc:'البرنامج معمول بالـ AI — فالـ AI هيكشف أسراره أمام الشخصية',   endingDesc:'الصورة الكاملة — الذكاء الاصطناعي: علم ولا فنكوش؟',              overlayQ:'الذكاء الاصطناعي…<br><span style="color:var(--elm)">علم</span> ولا <span style="color:var(--fan)">فنكوش</span>؟' },
};

const EP_NAMES = {
  1:'الأولى', 2:'الثانية', 3:'الثالثة', 4:'الرابعة', 5:'الخامسة',
  6:'السادسة', 7:'السابعة', 8:'الثامنة', 9:'التاسعة', 10:'العاشرة',
  11:'الحادية عشر', 12:'الثانية عشر', 13:'الثالثة عشر', 14:'الرابعة عشر', 15:'الخامسة عشر'
};

/* ── الحلقات المتاحة بالترتيب — عدّل هنا لما تفتح حلقة جديدة
   مثال: لما تنزل الحلقة 3 → غيّر السطر لـ [1, 2, 3]
   ── */
const UNLOCKED_EPS = [1, 2, 3, 4, 5, 6, 7];

let currentEp = 1;
window._currentEpNum = 1;
window._currentPath  = null;  /* elm | fan — يتحدث مع كل اختيار */

function getVideos(ep) {
  const s = EPISODES[ep].suffix;
  return {
    intro:  `intro${s}.mp4`,
    elm_1:  `elm_1${s}.mp4`, elm_2: `elm_2${s}.mp4`, elm_3: `elm_3${s}.mp4`,
    fan_1:  `fan_1${s}.mp4`, fan_2: `fan_2${s}.mp4`, fan_3: `fan_3${s}.mp4`,
    ending: `ending${s}.mp4`
  };
}

let VIDEOS = getVideos(1);

const FLOW = {
  intro  : { type:'choice'                                       },
  elm_1  : { type:'continue', path:'elm', step:1, next:'elm_2'  },
  elm_2  : { type:'continue', path:'elm', step:2, next:'elm_3'  },
  elm_3  : { type:'auto',     path:'elm', step:3, next:'ending' },
  fan_1  : { type:'continue', path:'fan', step:1, next:'fan_2'  },
  fan_2  : { type:'continue', path:'fan', step:2, next:'fan_3'  },
  fan_3  : { type:'auto',     path:'fan', step:3, next:'ending' },
  ending : { type:'end'                                          }
};

let   vid         = document.getElementById('mainVideo');   /* بقى let — بيتبدل بين عناصر الـ pool */
const olay        = document.getElementById('choiceOverlay');
const overlayQ    = document.getElementById('overlayQ');
const overlayBtns = document.getElementById('overlayBtns');
const overlayHint = document.getElementById('overlayHint');
const pBtn        = document.getElementById('playBtn');
const pFill       = document.getElementById('pFill');
const tDisp       = document.getElementById('timDisp');
const wrap        = document.getElementById('playerWrap');
const pathProg    = document.getElementById('pathProgress');
const pathLbl     = document.getElementById('pathLabel');
const metaDesc    = document.getElementById('metaDesc');
const ctrl        = document.querySelector('.player-controls');

let curSeg    = '';
let ctrlTimer = null;

// ══════════════════════════════════════════════════════════
//  VIDEO POOL — كذا <video> حقيقي. اللي بيتحمّل في الخلفية هو نفسه
//  اللي بيتعرض → مفيش إعادة تحميل ومفيش شاشة سودة.
// ══════════════════════════════════════════════════════════
const POOL_SIZE = 6;
const _pool = [vid];
vid.classList.add('vid-active');
vid._t = 0;
for (let i = 1; i < POOL_SIZE; i++) {
  const v = document.createElement('video');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
  v.preload = 'none';
  v._t = 0;
  vid.parentNode.insertBefore(v, vid.nextSibling);
  _pool.push(v);
}

const _conn   = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const _slowNet = () => !!(_conn && (_conn.saveData || ['slow-2g','2g'].includes(_conn.effectiveType)));

/* spinner بدل الشاشة السودة */
const _spin = document.createElement('div');
_spin.className = 'vid-spinner';
wrap.appendChild(_spin);
function _busy(on){ _spin.classList.toggle('on', !!on); }

/* حضّر فيديو في عنصر (أو رجّع العنصر لو متحمّل بالفعل) */
function _prep(url, eager){
  let el = _pool.find(e => e._url === url);
  if (!el) {
    el = _pool.filter(e => e !== vid).sort((a, b) => a._t - b._t)[0];
    if (!el) return null;
    el.pause();
    el._url   = url;
    el.muted  = true;
    el.preload = eager ? 'auto' : 'metadata';
    el.src    = url;
    el.load();
  } else if (eager && el.preload !== 'auto') {
    el.preload = 'auto';
  }
  if (el !== vid) el._t = Date.now();
  return el;
}

function _reveal(el){
  _pool.forEach(e => e.classList.toggle('vid-active', e === el));
  if (el.readyState >= 3) _busy(false);
}

/* بدّل للفيديو ده فورًا (من الـ pool لو جاهز) */
function _switchTo(url, play){
  const old = vid;
  const el  = _prep(url, true);
  if (el !== old) {
    old.pause();
    el.muted  = old.muted;
    el.volume = old.volume;
    vid = el;
    pFill.style.width = '0%';
  }
  if (el.currentTime > 0.05 || el.ended) { try { el.currentTime = 0; } catch (_) {} }

  if (el.readyState >= 2) {
    _reveal(el);                       /* فيه فريم جاهز → اعرض فورًا */
  } else {
    _busy(true);                       /* لسه → سيب الفريم القديم + spinner لحد أول فريم */
    const f = () => { el.removeEventListener('loadeddata', f); if (vid === el) _reveal(el); };
    el.addEventListener('loadeddata', f);
  }
  if (play) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
}

/* نفّذ حاجة بعد ما الفيديو الحالي يبقى جاهز (عشان الـ preload ميزاحمش) */
function _afterCurrentReady(fn){
  if (vid.readyState >= 3) { fn(); return; }
  const cur = vid;
  let done = false;
  const go = () => { if (done) return; done = true; cur.removeEventListener('canplay', go); fn(); };
  cur.addEventListener('canplay', go);
  setTimeout(go, 3000);
}

// ══ preloadNext ══
function preloadNext(seg) {
  const f = FLOW[seg];
  if (!f) return;
  const c = [];
  if (f.type === 'choice')        { c.push('elm_1', 'fan_1'); }
  else if (f.type === 'continue') { c.push(f.next, 'ending'); }
  if (!c.length) return;
  _afterCurrentReady(() => c.forEach(n => { if (VIDEOS[n]) _prep(VIDEOS[n], !_slowNet()); }));
}

// ══ preload الحلقة السابقة والتالية (عشان زراير التنقل تبقى فورية) ══
function preloadNeighbours(ep){
  const idx = UNLOCKED_EPS.indexOf(ep);
  if (idx === -1) return;
  _afterCurrentReady(() => {
    [UNLOCKED_EPS[idx + 1], UNLOCKED_EPS[idx - 1]].forEach(e => {
      if (e) _prep(getVideos(e).intro, !_slowNet());
    });
  });
}

// ══ loadSeg ══
function loadSeg(seg, play=false){
  curSeg = seg;
  _endingDone = false;
  _switchTo(VIDEOS[seg], play);

  updateProgressUI(seg);
  updateMeta(seg);
  if(seg !== 'ending' && window.hideVoteSection) window.hideVoteSection();

  // حمّل الفيديو الجاي في الخلفية
  preloadNext(seg);
}

function updateProgressUI(seg){
  const f = FLOW[seg];
  if(!f || !f.path){ pathProg.classList.remove('visible'); return; }
  pathProg.classList.add('visible');
  const isElm = f.path === 'elm';
  pathLbl.className   = 'path-label ' + (isElm ? 'elm-label' : 'fan-label');
  pathLbl.textContent = isElm ? 'مسار العلم 🔬' : 'مسار الفنكوش 🔮';
  for(let i=1;i<=3;i++){
    const d = document.getElementById('dot'+i);
    d.className = 'step-dot' + (isElm ? '' : ' fan-dot');
    if(i < f.step)        d.classList.add('done');
    else if(i === f.step) d.classList.add('current');
  }
  const swBtn = document.getElementById('switchPathBtn');
  if(swBtn){
    swBtn.textContent = isElm ? '🔮 عايز تسمع رأي الفنكوش؟' : '🔬 عايز تسمع رأي العلم؟';
    swBtn.className   = 'switch-path-btn ' + (isElm ? 'switch-to-fan' : 'switch-to-elm');
  }
}

function switchPath(){
  const f = FLOW[curSeg];
  if(!f || !f.path) return;
  const newPath  = f.path === 'elm' ? 'fan' : 'elm';
  const otherSeg = newPath + '_' + f.step;
  window._currentPath = newPath;       /* ← track المسار بعد التبديل */
  hideOverlay();
  loadSeg(otherSeg, true);
}

// ══ loadEpisode ══
function loadEpisode(ep) {
  currentEp = ep;
  window._currentEpNum = ep;
  window._currentPath  = null;
  VIDEOS = getVideos(ep);
  const epData = EPISODES[ep];
  const epName = EP_NAMES[ep] || ep;

  const titleEl = document.getElementById('epTitle');
  if(titleEl) titleEl.textContent = `الحلقة ${epName}: ${epData.title}`;

  const rb = document.getElementById('restartBtn');
  if(rb) rb.remove();
  hideOverlay();
  if(window.hideVoteSection) window.hideVoteSection();
  curSeg = '';

  // شغّل الـ intro فورًا (من الـ pool لو متحمّل) — من غير ما نستنى أي timeout
  curSeg = 'intro';
  _endingDone = false;
  _switchTo(VIDEOS['intro'], true);
  updateProgressUI('intro');
  updateMeta('intro');
  goPage('home', document.querySelector('.nav-links a'));
  setTimeout(scrollToPlayer, 250);
  preloadNext('intro');
  preloadNeighbours(ep);

  const heroBtn = document.querySelector('.btn-p');
  if(heroBtn){
    heroBtn.textContent = `شاهد الحلقة ${epName} ↓`;
    heroBtn.onclick = () => scrollToPlayer();
  }

  updateEpNav(ep);
}

// ══ preloadEpOnHover — يحمّل intro الحلقة لما الماوس يحوم على الكارت ══
function preloadEpOnHover(ep) {
  if (!EPISODES[ep] || _slowNet()) return;
  _prep(getVideos(ep).intro, true);
}

function updateMeta(seg){
  const badge  = document.getElementById('epBadge');
  const epData = EPISODES[currentEp];
  if(seg === 'intro'){
    metaDesc.textContent = epData.desc;
    badge.textContent    = 'مسار مزدوج ✦';
    badge.style.cssText  = 'background:rgba(56,189,248,.08);border-color:rgba(56,189,248,.25);color:var(--elm)';
  } else if(seg === 'ending'){
    metaDesc.textContent = epData.endingDesc;
    badge.textContent    = 'الخاتمة الموحدة ✦';
    badge.style.cssText  = 'background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.15);color:#fff';
  } else {
    const f = FLOW[seg]; if(!f) return;
    const isElm = f.path === 'elm';
    const names = {
      elm_1:'المعلومة الأولى', elm_2:'المعلومة الثانية', elm_3:'المعلومة الثالثة',
      fan_1:'المعلومة الأولى', fan_2:'المعلومة الثانية', fan_3:'المعلومة الثالثة'
    };
    metaDesc.textContent = (names[seg]||'') + (isElm ? ' — مسار العلم' : ' — مسار الفنكوش');
    badge.textContent    = isElm ? 'مسار العلم 🔬' : 'مسار الفنكوش 🔮';
    badge.style.cssText  = isElm
      ? 'background:rgba(56,189,248,.08);border-color:rgba(56,189,248,.25);color:var(--elm)'
      : 'background:rgba(251,146,60,.08);border-color:rgba(251,146,60,.25);color:var(--fan)';
  }
}

function showOverlay(seg){
  const f = FLOW[seg];
  if(!f || f.type === 'end') return;
  olay.classList.remove('visible');
  overlayBtns.innerHTML = '';
  if(f.type === 'choice'){
    overlayQ.innerHTML      = EPISODES[currentEp].overlayQ;
    overlayHint.textContent = 'اختر المسار الذي تريد متابعته';
    overlayBtns.innerHTML   = `
      <div class="overlay-btns-choice">
        <button class="ov-btn elm" onclick="choosePath('elm');event.stopPropagation()">علم</button>
        <button class="ov-btn fan" onclick="choosePath('fan');event.stopPropagation()">فنكوش</button>
      </div>`;
  } else if(f.type === 'continue'){
    const isElm   = f.path === 'elm';
    const col     = isElm ? 'var(--elm)' : 'var(--fan)';
    const cls     = isElm ? 'elm-next'   : 'fan-next';
    const nextTxt = f.step === 2 ? 'المعلومة الثالثة ←' : 'المعلومة التالية ←';
    overlayQ.innerHTML      = `المعلومة <span style="color:${col}">${f.step} / 3</span> انتهت…`;
    overlayHint.textContent = 'أو تخطّ للخاتمة الموحدة مباشرة';
    overlayBtns.innerHTML   = `
      <div class="overlay-btns-continue">
        <button class="ov-btn-next ${cls}" onclick="goNext('${f.next}');event.stopPropagation()">${nextTxt}</button>
        <button class="ov-btn-next skip"   onclick="goNext('ending');event.stopPropagation()">انتقل للخاتمة ←</button>
      </div>`;
  }
  requestAnimationFrame(() => requestAnimationFrame(() => olay.classList.add('visible')));
}

function hideOverlay(){ olay.classList.remove('visible'); }

function choosePath(path){
  window._currentPath = path;
  hideOverlay();
  loadSeg(path + '_1', true);
}

function goNext(seg){
  hideOverlay();
  loadSeg(seg, true);
}

function showRestartBtn(){
  if(document.getElementById('restartBtn')) return;
  const btn = document.createElement('button');
  btn.id          = 'restartBtn';
  btn.textContent = '↺ جرّب المسار الآخر';
  btn.onclick = (e) => {
    e.stopPropagation();
    btn.remove();
    if(window.hideVoteSection) window.hideVoteSection();
    /* _currentPath أموثق دايمًا، _userChoice fallback لو الـ vote قديم */
    const chosen    = window._currentPath || window._userChoice || 'elm';
    const otherPath = chosen === 'elm' ? 'fan' : 'elm';
    loadSeg(otherPath + '_1', true);
  };
  const topRow = document.querySelector('.vov-top-row');
  if(topRow) topRow.appendChild(btn);
  else wrap.appendChild(btn);
}

// ── CONTROLS AUTO-HIDE ──
function showControls(){
  ctrl.classList.add('visible');
  clearTimeout(ctrlTimer);
  ctrlTimer = setTimeout(() => {
    if(!vid.paused) ctrl.classList.remove('visible');
  }, 2500);
}
wrap.addEventListener('mousemove', showControls);
wrap.addEventListener('touchstart', () => {
  ctrl.classList.contains('visible')
    ? ctrl.classList.remove('visible')
    : showControls();
}, { passive:true });

// ── VIDEO EVENTS (على كل عناصر الـ pool — بس العنصر الشغال هو اللي بينفّذ) ──
function _on(type, fn){
  _pool.forEach(el => el.addEventListener(type, e => { if (el === vid) fn(e); }));
}
_on('waiting', () => _busy(true));
_on('canplay', () => _busy(false));
_on('playing', () => _busy(false));
_on('play', () => {
  pBtn.textContent = '⏸';
  clearTimeout(ctrlTimer);
  ctrlTimer = setTimeout(() => ctrl.classList.remove('visible'), 2500);
});
_on('pause', () => {
  pBtn.textContent = '▶';
  clearTimeout(ctrlTimer);
  ctrl.classList.add('visible');
});
_on('timeupdate', () => {
  if(!vid.duration) return;
  pFill.style.width = (vid.currentTime / vid.duration * 100) + '%';
  tDisp.textContent = fmt(vid.currentTime) + ' / ' + fmt(vid.duration);
  // لو المستخدم رجّع الشريط وهو في الـ ending → خلّي التصويت فاضل ظاهر (مش نخفيه)
  if(curSeg === 'ending' && !vid.ended){
    const overlay = document.getElementById('voteOverlay');
    if(overlay && overlay.classList.contains('visible') && false /* disabled: كنا بنخفي — دلوقتي لأ */){
      overlay.classList.remove('visible');
    }
  }
});
let _endingDone = false;

_on('ended', () => {
  pBtn.textContent = '▶';
  clearTimeout(ctrlTimer);
  ctrl.classList.add('visible');

  const f = FLOW[curSeg];
  if(!f) return;

  if(f.type === 'auto') {
    loadSeg(f.next, true);
  } else if(f.type === 'end') {
    if(_endingDone) return;
    _endingDone = true;
    showRestartBtn();
    setTimeout(() => {
      if(window.showPoll) window.showPoll(currentEp);
      if(window.ewfOnEpisodeComplete) window.ewfOnEpisodeComplete(currentEp);
    }, 900);
  } else {
    showOverlay(curSeg);
  }
});

// ── PLAYER CONTROLS ──
function handleWrapClick(){
  if(!olay.classList.contains('visible')) togglePlay();
}
function togglePlay(){
  if(curSeg === 'ending' && vid.ended) return;
  vid.paused ? vid.play() : vid.pause();
}
function seekVid(e){
  const b = document.getElementById('pBar'), r = b.getBoundingClientRect();
  if(!vid.duration) return;
  vid.currentTime = ((e.clientX - r.left) / r.width) * vid.duration;
  if(curSeg === 'ending') { vid.pause(); }
}
function toggleMute(){
  vid.muted = !vid.muted;
  document.getElementById('volBtn').textContent = vid.muted ? '🔇' : '🔊';
}
function toggleFS(){
  document.fullscreenElement ? document.exitFullscreen() : wrap.requestFullscreen();
}
function fmt(s){ return Math.floor(s/60) + ':' + Math.floor(s%60).toString().padStart(2,'0'); }

// ── EP NAV — الحلقة السابقة / التالية ──
function navigateEp(direction) {
  const idx = UNLOCKED_EPS.indexOf(currentEp);
  if (idx === -1) return;
  const targetIdx = idx + direction;
  if (targetIdx >= 0 && targetIdx < UNLOCKED_EPS.length) {
    loadEpisode(UNLOCKED_EPS[targetIdx]);
  }
}

function updateEpNav(ep) {
  const nav      = document.getElementById('epNav');
  const prevBtn  = document.getElementById('epNavPrev');
  const nextBtn  = document.getElementById('epNavNext');
  const prevName = document.getElementById('epNavPrevName');
  const nextName = document.getElementById('epNavNextName');
  if (!nav || !prevBtn || !nextBtn) return;

  const idx     = UNLOCKED_EPS.indexOf(ep);
  const hasPrev = idx > 0;
  const hasNext = idx !== -1 && idx < UNLOCKED_EPS.length - 1;

  /* الحلقة التالية المقفلة — لو مفيش حلقة تالية متاحة، دور على أول حلقة مقفلة بعدها */
  const nextLockedEp   = !hasNext ? ep + 1 : null;
  const hasNextLocked  = nextLockedEp !== null && EPISODES[nextLockedEp] !== undefined;

  /* أخفِ الـ nav كله لو مفيش أي اتجاه خالص */
  if (!hasPrev && !hasNext && !hasNextLocked) {
    nav.style.display = 'none';
    return;
  }
  nav.style.display = '';

  prevBtn.style.display = hasPrev ? '' : 'none';
  nextBtn.style.display = (hasNext || hasNextLocked) ? '' : 'none';

  prevBtn.style.flex = hasPrev && !hasNext && !hasNextLocked ? '0 0 auto' : '';
  nextBtn.style.flex = (hasNext || hasNextLocked) && !hasPrev ? '0 0 auto' : '';

  if (hasPrev) {
    const prevEp = UNLOCKED_EPS[idx - 1];
    prevName.textContent = EPISODES[prevEp].title;
  }

  if (hasNext) {
    /* حلقة تالية متاحة — شغّال عادي */
    const nextEp = UNLOCKED_EPS[idx + 1];
    nextName.textContent = EPISODES[nextEp].title;
    nextBtn.onclick = () => navigateEp(1);
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor  = 'pointer';
    const lbl = nextBtn.querySelector('.ep-nav-label');
    if (lbl) lbl.textContent = 'الحلقة التالية';
  } else if (hasNextLocked) {
    /* حلقة تالية مقفلة — اعرضها كـ "قريباً" بدون تنقل */
    nextName.textContent = EPISODES[nextLockedEp].title;
    nextBtn.onclick = null;
    nextBtn.style.opacity = '0.45';
    nextBtn.style.cursor  = 'default';
    const lbl = nextBtn.querySelector('.ep-nav-label');
    if (lbl) lbl.textContent = '🔒 قريباً';
  }
}

// ── BOOT ──
loadSeg('intro', true);
ctrl.classList.add('visible');
updateEpNav(1);   /* ← init الزرارين عند التحميل الأول */

// ── LOADER CONTROL ──
(function initLoader() {
  const loader = document.getElementById('appLoader');
  const fill   = document.getElementById('loaderFill');
  if (!loader) return;

  // شريط تقدم وهمي بسيط يحس المستخدم بالتحميل
  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18, 85);
    if (fill) fill.style.width = pct + '%';
  }, 120);

  // اخفِ الـ loader لما الفيديو يبقى جاهز للتشغيل
  const hideLoader = () => {
    clearInterval(tick);
    if (fill) fill.style.width = '100%';
    setTimeout(() => loader.classList.add('hidden'), 250);
  };

  if (vid.readyState >= 3) {
    hideLoader();
  } else {
    vid.addEventListener('canplay', hideLoader, { once: true });
    // fallback — لو فضل 4 ثواني اخفيه على أي حال
    setTimeout(hideLoader, 4000);
  }
})();

// ── ABOUT SLOGAN ──
const sbo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('.step-item').forEach((s,i)     => setTimeout(() => s.classList.add('animated'), i*220));
      e.target.querySelectorAll('.step-connector').forEach((c,i) => setTimeout(() => c.classList.add('show'),    (i+1)*220+100));
      sbo.unobserve(e.target);
    }
  });
}, { threshold:.3 });
const sb = document.getElementById('sloganBig');
if(sb) sbo.observe(sb);

document.addEventListener('keydown', e => {
  if(e.code === 'Space' && document.activeElement.tagName !== 'BUTTON'){
    e.preventDefault(); togglePlay();
  }
});
