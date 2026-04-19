/* ══════════════════════════════════════════════════════
   علم ولا فنكوش؟ — functions/index.js
   Firebase Cloud Function لإرسال الـ notifications
   ══════════════════════════════════════════════════════

   📦 SETUP (مرة واحدة بس):
   ─────────────────────────
   1. npm install -g firebase-tools
   2. firebase login
   3. firebase init functions  (اختار المشروع elm-fankosh)
   4. الصق الكود ده في functions/index.js
   5. npm install   (جوا فولدر functions/)
   6. firebase deploy --only functions

   🚀 الاستخدام (كل ما تنزل حلقة):
   ──────────────────────────────────
   curl "https://REGION-elmorfankoush.cloudfunctions.net/sendEpisodeNotification?ep=3&secret=ewf2026"

   أو من المتصفح مباشرة:
   https://REGION-elmorfankoush.cloudfunctions.net/sendEpisodeNotification?ep=3&secret=ewf2026
   ══════════════════════════════════════════════════════ */

const functions = require('firebase-functions');
const admin     = require('firebase-admin');

admin.initializeApp();
const db = admin.database();

/* ══ رسائل كل حلقة ══ */
const EPISODE_MESSAGES = {
  1:  { title: '😴 تفسير الأحلام — علم ولا فنكوش؟',  body: 'هل الأحلام رسايل من عقلك الباطن… ولا مجرد ضوضاء؟ اختار مسارك!' },
  2:  { title: '🔮 الأبراج — علم ولا فنكوش؟',         body: 'هل شخصيتك فعلاً مكتوبة في النجوم… ولا في دماغك إنت؟ 👀' },
  3:  { title: '🪄 السحر والشعوذة — علم ولا فنكوش؟',  body: 'بين الاعتقاد والتفسير النفسي — الحقيقة أغرب مما تتخيل!' },
  4:  { title: '✋ قراءة الكف — علم ولا فنكوش؟',      body: 'أداة نفسية قوية… أم خداع كامل؟ الحلقة الجديدة نزلت 🔥' },
  5:  { title: '😵‍💫 التنويم المغناطيسي — علم ولا فنكوش؟', body: 'بيستخدمه الأطباء فعلاً… بس إيه اللي بيحصل في دماغك؟' },
  6:  { title: '🕵️ نظريات المؤامرة — علم ولا فنكوش؟', body: 'ليه دماغنا بتصدق؟ الإجابة هتغير نظرتك لنفسك! 🧠' },
  7:  { title: '🌿 الوصفات الشعبية — علم ولا فنكوش؟', body: 'كركم وعسل وثوم — إيه اللي العلم بيثبته فعلاً؟' },
  8:  { title: '⚡ القدرات الخارقة — علم ولا فنكوش؟', body: 'اللي بيطير، اللي مينامش — الحقيقة أغرب من الخيال 🔥' },
  9:  { title: '📈 التنمية البشرية — علم ولا فنكوش؟',  body: 'صناعة بمليارات… بس هل فيها علم حقيقي؟ الجواب هيفاجأك!' },
  10: { title: '✨ العلاج بالطاقة — علم ولا فنكوش؟',  body: 'إحساسك بالتحسن حقيقي… بس هل السبب حقيقي؟ 🤔' },
  11: { title: '🛸 الأجسام الطائرة — علم ولا فنكوش؟', body: 'شهادات حقيقية من طيارين وعسكريين — العلم بيقول إيه؟' },
  12: { title: '👻 ما وراء الطبيعة — علم ولا فنكوش؟', body: 'الـ Paranormal تحت مجهر العلم — الحلقة الجديدة نزلت!' },
  13: { title: '🧬 الاستنساخ — علم ولا فنكوش؟',       body: 'لو استنسخنا إنسان — هو نفس الشخص؟ سؤال مش له إجابة سهلة' },
  14: { title: '👁️ الخدع البصرية — علم ولا فنكوش؟',  body: 'حتى عينك بتكدب عليك — الحلقة الجديدة هتغير طريقة شوفتك للدنيا!' },
  15: { title: '🤖 الذكاء الاصطناعي يحلل نفسه!',      body: 'البرنامج معمول بالـ AI — والـ AI هيكشف أسراره دلوقتي 🔥' },
};

/* ══ السيكريت — غيّره لحاجة تعرفها إنت بس ══ */
const SECRET = 'ewf2026';

/* ══════════════════════════════════════════
   الـ Function الرئيسية — بتبعت لكل المشتركين
   ══════════════════════════════════════════ */
exports.sendEpisodeNotification = functions.https.onRequest(async (req, res) => {

  /* ── أمان بسيط ── */
  if (req.query.secret !== SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const epNum = parseInt(req.query.ep, 10);
  if (!epNum || !EPISODE_MESSAGES[epNum]) {
    return res.status(400).json({ error: 'ep parameter required (1-15)' });
  }

  const msg = EPISODE_MESSAGES[epNum];
  const epUrl = `https://elmorfankoush.github.io/elmorfankoush/?ep=${epNum}`;

  try {
    /* ── جيب كل الـ tokens من Firebase ── */
    const snap   = await db.ref('tokens').once('value');
    const data   = snap.val() || {};
    const tokens = Object.values(data).map(t => t.token).filter(Boolean);

    if (tokens.length === 0) {
      return res.json({ success: true, sent: 0, message: 'لا يوجد مشتركين بعد' });
    }

    /* ── ابعت على دفعات (FCM حد أقصى 500 في المرة) ── */
    const CHUNK = 500;
    let totalSent = 0, totalFailed = 0;

    for (let i = 0; i < tokens.length; i += CHUNK) {
      const chunk = tokens.slice(i, i + CHUNK);
      const result = await admin.messaging().sendEachForMulticast({
        tokens: chunk,
        notification: {
          title: msg.title,
          body:  msg.body,
          imageUrl: 'https://elmorfankoush.github.io/elmorfankoush/og-cover.jpg'
        },
        data: {
          url:   epUrl,
          ep:    String(epNum),
          click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        webpush: {
          notification: {
            icon:  'https://elmorfankoush.github.io/elmorfankoush/og-cover.jpg',
            badge: 'https://elmorfankoush.github.io/elmorfankoush/og-cover.jpg',
            dir:   'rtl',
            lang:  'ar',
            requireInteraction: false,
            actions: [
              { action: 'open',  title: 'شوف دلوقتي 🔥' },
              { action: 'close', title: 'بعدين' }
            ]
          },
          fcmOptions: { link: epUrl }
        }
      });

      totalSent   += result.successCount;
      totalFailed += result.failureCount;

      /* احذف الـ tokens المنتهية تلقائياً */
      result.responses.forEach((r, idx) => {
        if (!r.success) {
          const failedToken = chunk[idx];
          const key = Object.keys(data).find(k => data[k].token === failedToken);
          if (key) db.ref(`tokens/${key}`).remove();
        }
      });
    }

    console.log(`Sent: ${totalSent}, Failed: ${totalFailed}`);
    res.json({ success: true, sent: totalSent, failed: totalFailed, ep: epNum });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ══ Function ثانية — اعرض إحصائيات المشتركين ══ */
exports.getStats = functions.https.onRequest(async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const [tokensSnap, usersSnap] = await Promise.all([
    db.ref('tokens').once('value'),
    db.ref('users').once('value')
  ]);

  const tokens = tokensSnap.val() || {};
  const users  = usersSnap.val() || {};

  /* عدد الحلقات اللي كل مستخدم شافها */
  const seenCounts = {};
  Object.values(users).forEach(u => {
    const seen = (u.seenEpisodes || []).length;
    seenCounts[seen] = (seenCounts[seen] || 0) + 1;
  });

  res.json({
    subscribers: Object.keys(tokens).length,
    sessions:    Object.keys(users).length,
    seenDistribution: seenCounts
  });
});
