/* Kelime Çemberi - Words of Wonders tarzı oyun. Butonunu ana menüye (#ana) kendisi ekler. */
(function () {
var LEVELS = [
  { l: "KALEM", w: ["KALEM", "KALE", "ELMA", "ALEM", "KEL", "KAL"] },
  { l: "KİTAP", w: ["KİTAP", "KAP", "TAK", "KİT", "TİP", "PİK"] },
  { l: "GÜNEŞ", w: ["GÜNEŞ", "GÜN", "ŞEN", "GEN", "EŞ", "ÜN"] },
  { l: "DENİZ", w: ["DENİZ", "DİZ", "DİN", "DEN", "İZ", "EZ"] },
  { l: "YAĞMUR", w: ["YAĞMUR", "YAĞ", "MAY", "RAY", "YAR", "YUM"] }
];

var css = document.createElement("style");
css.textContent =
"#cm{position:fixed;inset:0;background:#050510;color:#fff;z-index:9999;display:none;flex-direction:column;align-items:center;font-family:inherit;overflow:hidden}" +
"#cm .top{width:100%;display:flex;justify-content:space-between;align-items:center;padding:14px 16px;box-sizing:border-box}" +
"#cm button.sm{background:#1b1b33;color:#fff;border:0;border-radius:14px;padding:10px 14px;font-size:16px}" +
"#cm .words{flex:1;width:100%;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 0}" +
"#cm .row{display:flex;gap:6px}" +
"#cm .box{width:38px;height:38px;border-radius:8px;background:#1b1b33;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#fff}" +
"#cm .box.on{background:#e0892b}" +
"#cm .box.hint{background:#2a3b6b;color:#9bb2ff}" +
"#cm .cur{height:44px;font-size:30px;font-weight:800;letter-spacing:3px;color:#ffd27a}" +
"#cm .wheel{position:relative;width:280px;height:280px;margin:6px 0 24px;border-radius:50%;background:#12122a;touch-action:none}" +
"#cm .wheel svg{position:absolute;inset:0;pointer-events:none}" +
"#cm .let{position:absolute;width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;user-select:none}" +
"#cm .let.sel{background:#e0892b}" +
"#cm .msg{height:24px;color:#8aa;font-size:15px}";
document.head.appendChild(css);

var root = document.createElement("div");
root.id = "cm";
root.innerHTML =
  '<div class="top"><button class="sm" id="cmBack">‹ Menü</button><div id="cmLv" style="font-weight:700;font-size:18px"></div>' +
  '<button class="sm" id="cmHint">💡 İpucu</button></div>' +
  '<div class="words" id="cmWords"></div><div class="msg" id="cmMsg"></div><div class="cur" id="cmCur"></div>' +
  '<div class="wheel" id="cmWheel"><svg id="cmSvg" width="280" height="280"></svg></div>' +
  '<button class="sm" id="cmShuf" style="margin-bottom:20px">🔀 Karıştır</button>';
document.body.appendChild(root);

var $ = function (id) { return document.getElementById(id); };
var lvIdx = 0, found = {}, hints = {}, letters = [], sel = [], drag = false;
try { lvIdx = Math.min(parseInt(localStorage.getItem("cemberLv") || "0", 10) || 0, LEVELS.length - 1); } catch (e) {}

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}

function startLevel() {
  var L = LEVELS[lvIdx];
  found = {}; hints = {}; sel = [];
  letters = shuffle(L.l.split(""));
  $("cmLv").textContent = "Seviye " + (lvIdx + 1);
  $("cmMsg").textContent = "";
  drawWords(); drawWheel(); drawCur();
}

function drawWords() {
  var L = LEVELS[lvIdx];
  var ws = L.w.slice().sort(function (a, b) { return a.length - b.length || (a < b ? -1 : 1); });
  var h = "";
  ws.forEach(function (w) {
    h += '<div class="row">';
    for (var i = 0; i < w.length; i++) {
      if (found[w]) h += '<div class="box on">' + w[i] + "</div>";
      else if (hints[w] > i) h += '<div class="box hint">' + w[i] + "</div>";
      else h += '<div class="box"></div>';
    }
    h += "</div>";
  });
  $("cmWords").innerHTML = h;
}

function pos(i) {
  var n = letters.length, a = (i / n) * 2 * Math.PI - Math.PI / 2;
  return { x: 140 + 98 * Math.cos(a), y: 140 + 98 * Math.sin(a) };
}

function drawWheel() {
  var w = $("cmWheel");
  Array.prototype.slice.call(w.querySelectorAll(".let")).forEach(function (e) { e.remove(); });
  letters.forEach(function (ch, i) {
    var p = pos(i), d = document.createElement("div");
    d.className = "let"; d.textContent = ch; d.dataset.i = i;
    d.style.left = p.x + "px"; d.style.top = p.y + "px";
    w.appendChild(d);
  });
  drawLine();
}

function drawLine() {
  var pts = sel.map(function (i) { var p = pos(i); return p.x + "," + p.y; }).join(" ");
  $("cmSvg").innerHTML = '<polyline points="' + pts + '" fill="none" stroke="#e0892b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>';
  Array.prototype.slice.call($("cmWheel").querySelectorAll(".let")).forEach(function (e) {
    e.classList.toggle("sel", sel.indexOf(+e.dataset.i) > -1);
  });
}

function word() { return sel.map(function (i) { return letters[i]; }).join(""); }
function drawCur() { $("cmCur").textContent = word(); }

function hit(e) {
  var el = document.elementFromPoint(e.clientX, e.clientY);
  if (el && el.classList && el.classList.contains("let")) {
    var i = +el.dataset.i;
    if (sel.indexOf(i) === -1) { sel.push(i); }
    else if (sel.length > 1 && sel[sel.length - 2] === i) { sel.pop(); }
    drawLine(); drawCur();
  }
}

var wh = $("cmWheel");
wh.addEventListener("pointerdown", function (e) { drag = true; sel = []; hit(e); });
wh.addEventListener("pointermove", function (e) { if (drag) hit(e); });

function end() {
  if (!drag) return;
  drag = false;
  var w = word(), L = LEVELS[lvIdx];
  if (w.length > 1) {
    if (L.w.indexOf(w) > -1 && !found[w]) {
      found[w] = true;
      $("cmMsg").textContent = "✅ " + w;
      drawWords();
      if (L.w.every(function (x) { return found[x]; })) {
        $("cmMsg").textContent = "🎉 Seviye tamamlandı!";
        setTimeout(function () {
          lvIdx = (lvIdx + 1) % LEVELS.length;
          try { localStorage.setItem("cemberLv", lvIdx); } catch (e) {}
          startLevel();
        }, 1400);
      }
    } else if (found[w]) {
      $("cmMsg").textContent = "Zaten buldun";
    } else {
      $("cmMsg").textContent = "❌ Yanlış";
    }
  }
  sel = []; drawLine(); drawCur();
}
window.addEventListener("pointerup", end);
window.addEventListener("pointercancel", end);

$("cmShuf").onclick = function () { letters = shuffle(letters); sel = []; drawWheel(); drawCur(); };
$("cmHint").onclick = function () {
  var L = LEVELS[lvIdx];
  for (var k = 0; k < L.w.length; k++) {
    var w = L.w[k];
    if (!found[w] && (hints[w] || 0) < w.length - 1) { hints[w] = (hints[w] || 0) + 1; drawWords(); return; }
  }
};
function kapat() { root.style.display = "none"; }
$("cmBack").onclick = kapat;
document.addEventListener("anasayfa", kapat);

// Ana menüye (#ana) buton ekler; diğer oyun butonları gibi oyun açılınca otomatik gizlenir.
var ekli = null;
function boya() {
  if (!ekli) return;
  ekli.style.setProperty("background", "#e0892b", "important");
  ekli.style.setProperty("color", "#fff", "important");
}
function addButton(zorla) {
  if (ekli) return;
  var ana = $("ana");
  if (!ana) return;
  var hedef = null;
  ana.querySelectorAll("button").forEach(function (b) {
    if (/İşlem/.test(b.textContent)) hedef = b;
  });
  if (!hedef && !zorla) return; // İşlem butonu henüz eklenmedi, bekle
  var b;
  if (hedef) {
    b = hedef.cloneNode(false);
  } else {
    b = document.createElement("button");
    b.className = "btn";
  }
  b.removeAttribute("id");
  b.textContent = "🔤 Kelime Çemberi";
  b.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    root.style.display = "flex";
    startLevel();
  });
  if (hedef) hedef.parentNode.insertBefore(b, hedef.nextSibling);
  else ana.appendChild(b);
  ekli = b;
  boya();
}
addButton(false);
// Diğer scriptler menüye butonları sonradan ekliyorsa, İşlem butonu gelince çemberi arkasına ekle
var anaEl = $("ana");
if (anaEl) {
  var mo = new MutationObserver(function () {
    addButton(false);
    if (ekli) mo.disconnect();
  });
  mo.observe(anaEl, { childList: true, subtree: true });
}
window.addEventListener("load", function () { addButton(true); boya(); });
})();
