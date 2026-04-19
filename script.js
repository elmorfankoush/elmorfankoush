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
const UNLOCKED_EPS = [1, 2, 3];

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

const vid         = document.getElementById('mainVideo');
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

// ══ preloadNext — يحمّل الفيديو الجاي في hidden video elements ══
const _preloadCache = {};
const _preloadEls   = {};

function preloadNext(seg) {
  const f = FLOW[seg];
  if (!f) return;
  const candidates = [];
  if (f.type === 'choice')        { candidates.push('elm_1', 'fan_1'); }
  else if (f.type === 'continue') { candidates.push(f.next, 'ending'); }

  candidates.forEach(next => {
    const url = VIDEOS[next];
    if (!url || _preloadCache[url]) return;
    _preloadCache[url] = true;

    // إنشاء video element مخفي يبدأ التحميل فوراً
    const v = document.createElement('video');
    v.src      = url;
    /* على النت البطيء نحمّل الـ metadata بس — على الفاست نحمّل كامل */
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slow  = conn && (conn.saveData || ['slow-2g','2g','3g'].includes(conn.effectiveType));
    v.preload  = slow ? 'metadata' : 'auto';
    v.muted    = true;
    v.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';
    document.body.appendChild(v);
    v.load();
    _preloadEls[url] = v;
  });
}

// ══ loadSeg ══
function loadSeg(seg, play=false){
  curSeg = seg;
  const url = VIDEOS[seg];

  // لو الفيديو ده اتحمل مسبقاً — استخدم الـ buffered data
  if (_preloadEls[url]) {
    const cached = _preloadEls[url];
    /* لو الـ cached حمّل بيانات كافية، انسخه للـ main video */
    if (cached.readyState >= 2) {
      document.body.removeChild(cached);
    }
    delete _preloadEls[url];
    vid.src = url;
    /* مش بنعمل load() لو الـ src مش اتغير — المتصفح بيحتفظ بالـ cache */
    if (vid.src !== url) vid.load();
  } else {
    vid.src = url;
    vid.load();
  }

  updateProgressUI(seg);
  updateMeta(seg);
  if(seg !== 'ending' && window.hideVoteSection) window.hideVoteSection();

  if(play){
    // استنى canplay الأول عشان يبدأ فوراً بدون تقطيع
    const onReady = () => {
      vid.removeEventListener('canplay', onReady);
      vid.play().catch(() => {});
    };
    // لو الفيديو جاهز بالفعل — اشتغل فوراً
    if (vid.readyState >= 3) {
      vid.play().catch(() => {});
    } else {
      vid.addEventListener('canplay', onReady, { once: true });
    }
  }

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

  // ابدأ تحميل الـ intro فوراً قبل الانتظار
  vid.src = VIDEOS['intro'];
  vid.load();

  goPage('home', document.querySelector('.nav-links a'));
  setTimeout(() => {
    scrollToPlayer();
    // الفيديو بيكون اتحمل شوية بالفعل — اشتغل فوراً
    curSeg = 'intro';
    updateProgressUI('intro');
    updateMeta('intro');
    if (vid.readyState >= 3) {
      vid.play().catch(() => {});
    } else {
      vid.addEventListener('canplay', function onReady(){
        vid.removeEventListener('canplay', onReady);
        vid.play().catch(() => {});
      }, { once: true });
    }
    preloadNext('intro');
  }, 400);

  const heroBtn = document.querySelector('.btn-p');
  if(heroBtn){
    heroBtn.textContent = `شاهد الحلقة ${epName} ↓`;
    heroBtn.onclick = () => scrollToPlayer();
  }

  updateEpNav(ep);
}

// ══ preloadEpOnHover — يحمّل intro الحلقة لما الماوس يحوم على الكارت ══
function preloadEpOnHover(ep) {
  const videos = getVideos(ep);
  const url    = videos['intro'];
  if (_preloadCache[url]) return;   // اتحمل قبل كده
  _preloadCache[url] = true;
  const v = document.createElement('video');
  v.src     = url;
  v.preload = 'auto';
  v.muted   = true;
  v.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';
  document.body.appendChild(v);
  v.load();
  _preloadEls[url] = v;
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
  // ابدأ تحميل الفيديو فوراً قبل ما الـ overlay يتخفى
  const seg = path + '_1';
  const url = VIDEOS[seg];
  vid.src = url;
  vid.load();
  // خفّي الـ overlay
  hideOverlay();
  // اشتغل بعد ما يكون جاهز
  if (vid.readyState >= 3) {
    vid.play().catch(() => {});
    updateProgressUI(seg);
    updateMeta(seg);
    if(window.hideVoteSection) window.hideVoteSection();
    preloadNext(seg);
    curSeg = seg;
  } else {
    vid.addEventListener('canplay', function onReady(){
      vid.removeEventListener('canplay', onReady);
      vid.play().catch(() => {});
    }, { once: true });
    updateProgressUI(seg);
    updateMeta(seg);
    if(window.hideVoteSection) window.hideVoteSection();
    preloadNext(seg);
    curSeg = seg;
  }
}

function goNext(seg){
  const url = VIDEOS[seg];
  // ابدأ تحميل الفيديو فوراً قبل ما الـ overlay يتخفى
  vid.src = url;
  vid.load();
  hideOverlay();
  if (vid.readyState >= 3) {
    vid.play().catch(() => {});
    updateProgressUI(seg);
    updateMeta(seg);
    if(seg !== 'ending' && window.hideVoteSection) window.hideVoteSection();
    preloadNext(seg);
    curSeg = seg;
  } else {
    vid.addEventListener('canplay', function onReady(){
      vid.removeEventListener('canplay', onReady);
      vid.play().catch(() => {});
    }, { once: true });
    updateProgressUI(seg);
    updateMeta(seg);
    if(seg !== 'ending' && window.hideVoteSection) window.hideVoteSection();
    preloadNext(seg);
    curSeg = seg;
  }
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

// ── VIDEO EVENTS ──
vid.addEventListener('play', () => {
  pBtn.textContent = '⏸';
  clearTimeout(ctrlTimer);
  ctrlTimer = setTimeout(() => ctrl.classList.remove('visible'), 2500);
});
vid.addEventListener('pause', () => {
  pBtn.textContent = '▶';
  clearTimeout(ctrlTimer);
  ctrl.classList.add('visible');
});
vid.addEventListener('timeupdate', () => {
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
vid.addEventListener('ended', () => {
  pBtn.textContent = '▶';
  clearTimeout(ctrlTimer);
  ctrl.classList.add('visible');

  const f = FLOW[curSeg];
  if(!f) return;

  if(f.type === 'auto') {
    loadSeg(f.next, true);
  } else if(f.type === 'end') {
    // ١) اعرض زرار "جرّب المسار الآخر"
    showRestartBtn();
    // ٢) بعد ثانية اعرض قسم التصويت الخاص بالحلقة دي
    setTimeout(() => {
      if(window.showPoll) window.showPoll(currentEp);
      if(window.ewfOnEpisodeComplete) window.ewfOnEpisodeComplete(currentEp);
    }, 900);
  } else {
    showOverlay(curSeg);
  }
});

// ── PLAYER CONTROLS ──
function handleWrapClick(){ if(!olay.classList.contains('visible')) togglePlay(); }
function togglePlay(){ vid.paused ? vid.play() : vid.pause(); }
function seekVid(e){
  const b = document.getElementById('pBar'), r = b.getBoundingClientRect();
  if(vid.duration) vid.currentTime = ((e.clientX - r.left) / r.width) * vid.duration;
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
