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
"#cm{position:fixed;top:0;left:0;right:0;bottom:0;height:100dvh;background:#050510;color:#fff;z-index:9999;display:none;flex-direction:column;align-items:center;font-family:inherit;overflow:hidden}" +
"#cm .cm-top{width:100%;display:flex;justify-content:space-between;align-items:center;padding:10px 16px;box-sizing:border-box}" +
"#cm button.cm-sm{background:#1b1b33;color:#fff;border:0;border-radius:14px;padding:10px 14px;font-size:16px}" +
"#cm .cm-words{flex:1;width:100%;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:5px;padding:6px 0;min-height:0}" +
"#cm .cm-row{display:flex!important;flex-direction:row!important;gap:5px;margin:0!important;padding:0!important}" +
"#cm .cm-box{width:28px!important;height:28px!important;min-width:0!important;border-radius:7px!important;background:#2a2a4a!important;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;margin:0!important;padding:0!important;box-sizing:border-box}" +
"#cm .cm-box.cm-on{background:#e0892b!important}" +
"#cm .cm-box.cm-hint{background:#2a3b6b!important;color:#9bb2ff}" +
"#cm .cm-cur{height:34px;font-size:26px;font-weight:800;letter-spacing:3px;color:#ffd27a}" +
"#cm .cm-wheel{position:relative;width:230px;height:230px;margin:4px 0 14px;border-radius:50%;background:#1a1a3a;touch-action:none;flex:none}" +
"#cm .cm-wheel svg{position:absolute;inset:0;pointer-events:none}" +
"#cm .cm-let{position:absolute;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;color:#fff;user-select:none}" +
"#cm .cm-let.cm-sel{background:#e0892b}" +
"#cm .cm-msg{height:20px;color:#8aa;font-size:15px}";
document.head.appendChild(css);

var root = document.createElement("div");
root.id = "cm";
root.innerHTML =
  '<div class="cm-top"><button class="cm-sm" id="cmBack">‹ Menü</button><div id="cmLv" style="font-weight:700;font-size:18px"></div>' +
  '<button class="cm-sm" id="cmHint">💡 İpucu</button></div>' +
  '<div class="cm-words" id="cmWords"></div><div class="cm-msg" id="cmMsg"></div><div class="cm-cur" id="cmCur"></div>' +
  '<div class="cm-wheel" id="cmWheel"><svg id="cmSvg" width="230" height="230"></svg></div>' +
  '<button class="cm-sm" id="cmShuf" style="margin-bottom:14px">🔀 Karıştır</button>';
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
    h += '<div class="cm-row">';
    for (var i = 0; i < w.length; i++) {
      if (found[w]) h += '<div class="cm-box cm-on">' + w[i] + "</div>";
      else if (hints[w] > i) h += '<div class="cm-box cm-hint">' + w[i] + "</div>";
      else h += '<div class="cm-box"></div>';
    }
    h += "</div>";
  });
  $("cmWords").innerHTML = h;
}

function pos(i) {
  var n = letters.length, a = (i / n) * 2 * Math.PI - Math.PI / 2;
  return { x: 115 + 80 * Math.cos(a), y: 115 + 80 * Math.sin(a) };
}

function drawWheel() {
  var w = $("cmWheel");
  Array.prototype.slice.call(w.querySelectorAll(".cm-let")).forEach(function (e) { e.remove(); });
  letters.forEach(function (ch, i) {
    var p = pos(i), d = document.createElement("div");
    d.className = "cm-let"; d.textContent = ch; d.dataset.i = i;
    d.style.left = p.x + "px"; d.style.top = p.y + "px";
    w.appendChild(d);
  });
  drawLine();
}

function drawLine() {
  var pts = sel.map(function (i) { var p = pos(i); return p.x + "," + p.y; }).join(" ");
  $("cmSvg").innerHTML = '<polyline points="' + pts + '" fill="none" stroke="#e0892b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>';
  Array.prototype.slice.call($("cmWheel").querySelectorAll(".cm-let")).forEach(function (e) {
    e.classList.toggle("cm-sel", sel.indexOf(+e.dataset.i) > -1);
  });
}

function word() { return sel.map(function (i) { return letters[i]; }).join(""); }
function drawCur() { $("cmCur").textContent = word(); }

function hit(e) {
  var el = document.elementFromPoint(e.clientX, e.clientY);
  if (el && el.classList && el.classList.contains("cm-let")) {
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
