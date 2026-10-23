// PASSAPAROLA MODU
// Kullanım: index.html'de </body> öncesine şunu ekle:  <script src="passaparola.js"></script>
// Bu dosya kendi butonunu ("İlerlemeyi Sıfırla" altına), ekranını ve stilini kendisi ekler.
(function () {
  const SURE = 240; // saniye (süreyi buradan değiştir)

  const HARFLER = ["A","B","C","Ç","D","E","F","G","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];

  // Her harf için: [ ["ipucu", ["Doğru cevap", "kabul edilen diğer yazım"]], ... ]
  // Bir harfe istediğin kadar soru ekle; oyun her seferinde rastgele birini seçer.
  // Cevaplarda büyük/küçük harf ve Türkçe karakter (ş/s, ı/i gibi) farkı önemsenmez.
  const SORU = {
    "A": [["Türkiye'nin başkenti", ["Ankara"]]],
    "B": [["Çocukların oynadığı, üflenince şişen renkli lastik oyuncak", ["Balon"]]],
    "C": [["Yumurtadan yeni çıkmış tavuk yavrusu", ["Civciv"]]],
    "Ç": [["Yemek yerken kullanılan, uçları dişli sofra aleti", ["Çatal"]]],
    "D": [["Yemekleri çiğnememizi sağlayan, ağızdaki sert yapılar", ["Diş"]]],
    "E": [["Adem ile Havva'nın yediği rivayet edilen meyve", ["Elma"]]],
    "F": [["Hortumu olan, karaların en büyük hayvanı", ["Fil"]]],
    "G": [["Dünyamızı ısıtan ve aydınlatan yıldız", ["Güneş"]]],
    "H": [["Mekke'ye yapılan kutsal ziyaret", ["Hac"]]],
    "I": [["Lambadan ve güneşten yayılan, aydınlatan şey", ["Işık"]]],
    "İ": [["Türkiye'nin en kalabalık şehri", ["İstanbul"]]],
    "J": [["Kırsal bölgelerde görev yapan askeri güvenlik gücü", ["Jandarma"]]],
    "K": [["Yazı yazmaya yarayan araç", ["Kalem"]]],
    "L": [["Sarı renkli, ekşi bir narenciye", ["Limon"]]],
    "M": [["Güneş Sistemi'nin Kızıl Gezegeni", ["Mars"]]],
    "N": [["Mısır'dan geçen, dünyanın en uzun nehirlerinden biri", ["Nil"]]],
    "O": [["Öğrencilerin ders gördüğü yer", ["Okul"]]],
    "Ö": [["Okulda ders anlatan kişi", ["Öğretmen"]]],
    "P": [["İtalyan mutfağından, yuvarlak hamur üzerine peynirli yemek", ["Pizza"]]],
    "R": [["Kırmızı, mavi, sarı gibi şeylere verilen genel ad", ["Renk"]]],
    "S": [["İnekten elde edilen beyaz içecek", ["Süt"]]],
    "Ş": [["Çaya katılan tatlı beyaz kristal", ["Şeker"]]],
    "T": [["Raylar üzerinde giden ulaşım aracı", ["Tren"]]],
    "U": [["Gökyüzünde uçan, yolcu taşıyan araç", ["Uçak"]]],
    "Ü": [["Salkım halinde yetişen, şarabı yapılan meyve", ["Üzüm"]]],
    "V": [["Elektrik geriliminin birimi", ["Volt"]]],
    "Y": [["Bulutlardan damla damla düşen su", ["Yağmur"]]],
    "Z": [["Siyah beyaz çizgili, at benzeri hayvan", ["Zebra"]]]
  };

  // ---------- Stil ----------
  const css = document.createElement("style");
  css.textContent = `
  #ppHarfler{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:20px}
  .ppH{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#0d1426;border:1px solid #1d2540;font-weight:700;font-size:15px}
  .ppH.su{border-color:#ffe9c7;background:#3b0000;color:#ffe9c7}
  .ppH.d{background:#14532d;border-color:#22c55e}
  .ppH.y{background:#7f1d1d;border-color:#ef4444}
  .ppH.p{background:#5b4a14;border-color:#eab308}
  #ppSoru{font-size:20px;line-height:1.45;margin-bottom:16px}
  #ppCevap{width:100%;padding:16px;border-radius:16px;border:1px solid #1d2540;background:#0d1426;color:#fff;font:inherit;font-size:18px;text-align:center;outline:none}
  #ppCevap:focus{border-color:#8e9bc4}
  #ppGeriBildirim{min-height:26px;margin-top:10px;font-weight:700}
  .ppSatir{display:flex;gap:10px}
  .ppSatir .btn{margin-top:10px;padding:16px;font-size:18px}
  `;
  document.head.append(css);

  // ---------- Ana menü butonu ----------
  const ana = document.getElementById("ana");
  const sifirla = document.getElementById("sifirla");
  const menuBtn = document.createElement("button");
  menuBtn.className = "btn ikinci";
  menuBtn.id = "ppAc";
  menuBtn.textContent = "🔤 Passaparola";
  sifirla.insertAdjacentElement("afterend", menuBtn);

  // ---------- Passaparola ekranı ----------
  const sec = document.createElement("section");
  sec.className = "kart hidden";
  sec.id = "pp";
  sec.innerHTML = `
    <div id="ppGiris">
      <h2>🔤 Passaparola</h2>
      <p class="alt">28 harf, ${SURE} saniye. Her harfin sorusunu bil, bilemezsen pas geç; pas geçilenlere sonra tekrar dönersin.</p>
      <button class="btn" id="ppBasla">▶️ Başla</button>
      <button class="btn ikinci" id="ppGeri">Ana menü</button>
    </div>
    <div id="ppOyun" class="hidden">
      <div class="ust"><b id="ppPuan"></b><span id="ppSure"></span></div>
      <div id="ppHarfler"></div>
      <p id="ppSoru"></p>
      <input id="ppCevap" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Cevabını yaz">
      <p id="ppGeriBildirim"></p>
      <div class="ppSatir">
        <button class="btn" id="ppGonder">Cevapla</button>
        <button class="btn ikinci" id="ppPas">Pas</button>
      </div>
    </div>
    <div id="ppSon" class="hidden">
      <h2 id="ppSBaslik"></h2>
      <p class="alt" id="ppSMetin"></p>
      <button class="btn" id="ppTekrar">Tekrar oyna</button>
      <button class="btn ikinci" id="ppMenu">Ana menü</button>
    </div>`;
  ana.insertAdjacentElement("afterend", sec);

  const $ = id => document.getElementById(id);
  const giris = $("ppGiris"), oyun = $("ppOyun"), son = $("ppSon");
  const inp = $("ppCevap"), fb = $("ppGeriBildirim");

  // ---------- Durum ----------
  let dur, sorular, idx, sure, zaman, kilit;
  // dur: 0 bekliyor, 1 doğru, 2 yanlış, 3 pas

  const norm = s => s.toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c")
    .replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u")
    .replace(/[^a-z0-9]/g, "");

  const bolum = b => {
    giris.classList.toggle("hidden", b !== "giris");
    oyun.classList.toggle("hidden", b !== "oyun");
    son.classList.toggle("hidden", b !== "son");
  };

  function menuyeDon() {
    clearInterval(zaman);
    sec.classList.add("hidden");
    ana.classList.remove("hidden");
  }

  function sureYaz() {
    const m = Math.floor(sure / 60), s = sure % 60;
    $("ppSure").textContent = "⏱️ " + m + ":" + String(s).padStart(2, "0");
  }

  function ciz() {
    $("ppHarfler").innerHTML = HARFLER.map((h, i) => {
      const c = ["", "d", "y", "p"][dur[i]];
      return `<div class="ppH ${c} ${i === idx ? "su" : ""}">${h}</div>`;
    }).join("");
    $("ppPuan").textContent = "✅ " + dur.filter(x => x === 1).length + " / " + HARFLER.length;
    $("ppSoru").textContent = HARFLER[idx] + " ile başlar: " + sorular[idx][0];
    sureYaz();
  }

  function sonrakiBul() {
    const n = HARFLER.length;
    for (let k = 1; k <= n; k++) {
      const j = (idx + k) % n;
      if (dur[j] === 0 || dur[j] === 3) return j;
    }
    return -1;
  }

  function ileri() {
    inp.value = "";
    const j = sonrakiBul();
    if (j < 0) return bitir();
    idx = j;
    ciz();
    inp.focus();
  }

  function baslat() {
    dur = HARFLER.map(() => 0);
    sorular = HARFLER.map(h => SORU[h][Math.floor(Math.random() * SORU[h].length)]);
    idx = 0;
    sure = SURE;
    kilit = false;
    fb.textContent = "";
    inp.value = "";
    bolum("oyun");
    ciz();
    inp.focus();
    clearInterval(zaman);
    zaman = setInterval(() => {
      sure--;
      sureYaz();
      if (sure <= 0) bitir();
    }, 1000);
  }

  function gonder() {
    if (kilit) return;
    const v = norm(inp.value);
    if (!v) return;
    const q = sorular[idx];
    if (q[1].map(norm).includes(v)) {
      dur[idx] = 1;
      fb.textContent = "✅ Doğru!";
      fb.style.color = "#22c55e";
      ileri();
    } else {
      dur[idx] = 2;
      kilit = true;
      fb.textContent = "❌ Doğru cevap: " + q[1][0];
      fb.style.color = "#ef4444";
      ciz();
      setTimeout(() => { kilit = false; fb.textContent = ""; ileri(); }, 1300);
    }
  }

  function pas() {
    if (kilit) return;
    dur[idx] = 3;
    fb.textContent = "";
    ileri();
  }

  function bitir() {
    clearInterval(zaman);
    kilit = true;
    const d = dur.filter(x => x === 1).length;
    const y = dur.filter(x => x === 2).length;
    const k = HARFLER.length - d - y;
    $("ppSBaslik").textContent = d === HARFLER.length ? "🏆 Tebrikler, hepsini bildin!" : (sure <= 0 ? "⏰ Süre doldu!" : "Oyun bitti!");
    $("ppSMetin").textContent = "Doğru: " + d + " • Yanlış: " + y + " • Boş: " + k;
    bolum("son");
  }

  // ---------- Olaylar ----------
  menuBtn.onclick = () => { ana.classList.add("hidden"); sec.classList.remove("hidden"); bolum("giris"); };
  $("ppBasla").onclick = baslat;
  $("ppTekrar").onclick = baslat;
  $("ppGeri").onclick = menuyeDon;
  $("ppMenu").onclick = menuyeDon;
  $("ppGonder").onclick = gonder;
  $("ppPas").onclick = pas;
  inp.addEventListener("keydown", e => { if (e.key === "Enter") gonder(); });
})();
