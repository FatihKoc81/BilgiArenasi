// BİR KELİME BİR İŞLEM (TRT'deki yarışma tarzı)
// Kullanım: index.html'de kelime.js satırından SONRA ekle:  <script src="kelimeislem.js"></script>
(function () {
  const TUR = 6;            // toplam tur sayısı (kelime ve işlem sırayla: 3 + 3)
  const KELIME_SURE = 60;   // kelime turu süresi (sn)
  const ISLEM_SURE = 90;    // işlem turu süresi (sn)
  const HAK = 3;            // kelime turunda tahmin hakkı
  const EKSTRA = "AAEEİIOÖUÜBCÇDFGHKLMNPRSŞTVYZ"; // kelimeye eklenen şaşırtıcı harfler

  // [ "Kelime", "İpucu" ]  —  yeni kelime eklemek için listeye bir satır ekle (4-9 harf)
  const KELIMELER = [
    ["Sansar", "Kürkü değerli, küçük bir etçil memeli"],
    ["Kartal", "Güçlü pençeli, yüksekten uçan yırtıcı kuş"],
    ["Ceylan", "Zarif yapılı, hızlı koşan geyik türü"],
    ["Kaplan", "Çizgili postlu iri kedigil"],
    ["Tilki", "Kurnazlığıyla bilinen, kızıl tüylü yabani hayvan"],
    ["Yılan", "Bacaksız, sürünerek ilerleyen sürüngen"],
    ["Papağan", "Konuşmayı taklit edebilen, renkli tüylü kuş"],
    ["Leylek", "Uzun bacaklı, göçmen, yuvasını çatıya kuran kuş"],
    ["Serçe", "Şehirlerde yaşayan küçük, kahverengi kuş"],
    ["Martı", "Deniz kıyısında yaşayan, beyaz kanatlı kuş"],
    ["Balina", "Denizlerin en büyük memelisi"],
    ["Akrep", "Kuyruğunda zehirli iğne bulunan küçük hayvan"],
    ["Kitaplık", "Kitapların dizildiği mobilya"],
    ["Defter", "Ders notlarının yazıldığı, sayfalı kâğıt takımı"],
    ["Silgi", "Kurşun kalem yazısını yok eden küçük nesne"],
    ["Cetvel", "Düz çizgi çizmeye ve uzunluk ölçmeye yarayan alet"],
    ["Bardak", "İçecek koymak için kullanılan, genelde cam kap"],
    ["Tabak", "Yemek konulan yayvan sofra kabı"],
    ["Kaşık", "Çorba içmeye yarayan yemek aleti"],
    ["Tencere", "Yemek pişirmeye yarayan, kapaklı metal kap"],
    ["Fırın", "Ekmek ve pasta pişirilen sıcak yer"],
    ["Buzdolabı", "Yiyecekleri soğuk tutan ev aleti"],
    ["Elbise", "Kadınların giydiği, tek parça giysi"],
    ["Gömlek", "Önü düğmeli, kollu üst giysi"],
    ["Şapka", "Başa takılan giysi"],
    ["Eldiven", "Elleri soğuktan koruyan giysi"],
    ["Bisiklet", "İki tekerlekli, pedalla giden araç"],
    ["Otobüs", "Çok sayıda yolcu taşıyan toplu taşıma aracı"],
    ["Vapur", "Boğazda yolcu taşıyan deniz aracı"],
    ["Havlu", "Yıkandıktan sonra vücudu kurulamaya yarayan bez"],
    ["Sabun", "Elleri yıkarken kullanılan köpüklü madde"],
    ["Mevsim", "Yılın dört bölümünden her biri"],
    ["Kasım", "Ekim'den sonra gelen ay"],
    ["Perşembe", "Çarşamba'dan sonra gelen gün"],
    ["Kırmızı", "Domatesin ve kanın rengi"],
    ["Çikolata", "Kakaodan yapılan tatlı"],
    ["Kiraz", "Kırmızı, saplı, küçük yaz meyvesi"],
    ["Armut", "Aşağıya doğru şişkinleşen, tatlı meyve"],
    ["Şeftali", "Tüylü kabuklu, sulu yaz meyvesi"],
    ["Domates", "Salatada kullanılan kırmızı, sulu sebze"],
    ["Soğan", "Doğrarken gözümüzü yaşartan sebze"],
    ["Sarımsak", "Dişleri olan, keskin kokulu sebze"],
    ["Yoğurt", "Sütün mayalanmasıyla yapılan besin"],
    ["Peynir", "Sütten yapılan, kahvaltı sofrasının vazgeçilmezi"]
  ];

  const rnd = n => Math.floor(Math.random() * n);
  const karistir = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // Çözülebilir bir işlem sorusu üretir: 6 sayı + hedef + örnek çözüm
  function sayilariUret() {
    for (let deneme = 0; deneme < 1000; deneme++) {
      const buyuk = karistir([25, 50, 75, 100]).slice(0, 1 + rnd(2));
      const kucuk = [];
      while (buyuk.length + kucuk.length < 6) kucuk.push(1 + rnd(10));
      const sayilar = karistir(buyuk.concat(kucuk));
      let havuz = sayilar.slice();
      const adim = [];
      const n = 3 + rnd(3);
      let ok = true;
      for (let s = 0; s < n; s++) {
        const i = rnd(havuz.length);
        let j = rnd(havuz.length - 1); if (j >= i) j++;
        const a = havuz[i], b = havuz[j];
        let r = null, op = null;
        for (const o of karistir(["+", "×", "−", "÷"])) {
          if (o === "+") r = a + b;
          else if (o === "×") { if (a === 1 || b === 1) continue; r = a * b; }
          else if (o === "−") { if (a <= b) continue; r = a - b; }
          else { if (b === 1 || a % b !== 0) continue; r = a / b; }
          op = o; break;
        }
        if (op === null) { ok = false; break; }
        adim.push(a + " " + op + " " + b + " = " + r);
        havuz = havuz.filter((_, k) => k !== i && k !== j);
        havuz.push(r);
      }
      if (!ok) continue;
      const hedef = havuz[havuz.length - 1];
      if (hedef >= 101 && hedef <= 999 && !sayilar.includes(hedef)) return { sayilar, hedef, adim };
    }
    return { sayilar: [25, 50, 75, 100, 3, 6], hedef: 250, adim: ["100 + 75 = 175", "175 + 50 = 225", "225 + 25 = 250"] };
  }

  // Node ile test için (tarayıcıda çalışmaz)
  if (typeof document === "undefined") { module.exports = { sayilariUret, KELIMELER }; return; }

  // ---------- Stil ----------
  const css = document.createElement("style");
  css.textContent = `
  .btn.oval{border-radius:999px}
  #bkUst{display:flex;justify-content:space-between;color:#8e9bc4;font-size:15px}
  #bkSure{font-weight:700;margin:4px 0 8px}
  #bkIpucu{font-size:17px;line-height:1.35;margin:6px 0 12px}
  #bkCevap{display:flex;justify-content:center;gap:4px;flex-wrap:wrap;margin-bottom:12px}
  .bkC{width:34px;height:42px;border-radius:10px;background:#0d1426;border:1px solid #1d2540;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px}
  .bkC.d{background:#14532d;border-color:#22c55e}
  .bkC.y{background:#7f1d1d;border-color:#ef4444}
  #bkHarfler{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:8px}
  .bkT{width:42px;height:46px;border-radius:12px;background:#5b21b6;font-weight:700;font-size:21px}
  .bkT:disabled{opacity:.2}
  #bkHedefKutu{display:inline-flex;flex-direction:column;align-items:center;background:#5b21b6;border-radius:18px;padding:8px 36px}
  #bkHedefKutu span{font-size:12px;letter-spacing:2px;color:#d8c8ff}
  #bkHedef{font-size:44px;line-height:1.1}
  #bkSayilar{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:14px 0}
  .bkN{min-width:54px;height:50px;padding:0 10px;border-radius:12px;background:#1d4ed8;font-weight:700;font-size:21px}
  .bkN.s{outline:3px solid #ffe9c7}
  #bkOps{display:flex;justify-content:center;gap:10px;margin-bottom:10px}
  .bkO{width:56px;height:48px;border-radius:12px;background:#222f45;font-size:24px;font-weight:700}
  .bkO.s{background:#581818;outline:2px solid #ffe9c7}
  #bkAdimlar{min-height:48px;color:#8e9bc4;font-size:15px;line-height:1.5}
  .bkFb{min-height:22px;font-weight:700;margin:6px 0 0}
  .bkSatir{display:flex;gap:8px}
  .bkSatir .btn{margin-top:6px;padding:13px 6px;font-size:16px}
  .bkTitre{animation:bkt .3s}
  @keyframes bkt{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  `;
  document.head.append(css);

  // ---------- Ana menü butonu ----------
  const ana = document.getElementById("ana");
  const menuBtn = document.createElement("button");
  menuBtn.className = "btn ikinci oval";
  menuBtn.textContent = "🧮 Bir Kelime Bir İşlem";
  ana.append(menuBtn);

  // ---------- Ekran ----------
  const sec = document.createElement("section");
  sec.className = "kart hidden";
  sec.id = "bk";
  sec.innerHTML = `
    <div id="bkGiris">
      <h2>🧮 Bir Kelime Bir İşlem</h2>
      <p class="alt"><b>Kelime turu:</b> verilen harflerden ipucuna uyan kelimeyi bul (bazı harfler fazladır). <b>İşlem turu:</b> 6 sayıyla dört işlemi kullanarak hedef sayıya ulaş. 3 kelime + 3 işlem.</p>
      <button class="btn" id="bkBasla">▶️ Başla</button>
      <button class="btn ikinci" id="bkGeri">Ana menü</button>
    </div>
    <div id="bkOyun" class="hidden">
      <div id="bkUst"><b id="bkTur"></b><span id="bkPuan"></span></div>
      <div id="bkSure"></div>
      <div id="bkKelime">
        <p id="bkIpucu"></p>
        <div id="bkCevap"></div>
        <div id="bkHarfler"></div>
        <p class="bkFb" id="bkFbK"></p>
        <div class="bkSatir">
          <button class="btn ikinci" id="bkSil">⌫ Sil</button>
          <button class="btn ikinci" id="bkKaristir">🔀</button>
          <button class="btn" id="bkGonder">Gönder</button>
        </div>
      </div>
      <div id="bkIslem" class="hidden">
        <div id="bkHedefKutu"><span>HEDEF</span><b id="bkHedef"></b></div>
        <div id="bkSayilar"></div>
        <div id="bkOps"></div>
        <div id="bkAdimlar"></div>
        <p class="bkFb" id="bkFbI"></p>
        <div class="bkSatir">
          <button class="btn ikinci" id="bkGeriAl">↩️ Geri al</button>
          <button class="btn" id="bkBitir">Bitir</button>
        </div>
      </div>
    </div>
    <div id="bkSon" class="hidden">
      <h2 id="bkSBaslik"></h2>
      <p class="alt" id="bkSMetin"></p>
      <button class="btn" id="bkTekrar">Tekrar oyna</button>
      <button class="btn ikinci" id="bkMenu">Ana menü</button>
    </div>`;
  ana.insertAdjacentElement("afterend", sec);

  const $ = id => document.getElementById(id);
  const giris = $("bkGiris"), oyun = $("bkOyun"), son = $("bkSon");

  // ---------- Durum ----------
  let tur, toplam, kPuan, iPuan, sira, zaman, sure, kilit;
  // kelime turu
  let hedefKelime, n, tiles, secili, hak;
  // işlem turu
  let soru, sayiTiles, sel, op, gecmis, adimlar, idCnt;

  const fb = (m, renk) => ["bkFbK", "bkFbI"].forEach(id => { $(id).textContent = m || ""; $(id).style.color = renk || "#fff"; });
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
  const sureYaz = () => { $("bkSure").textContent = "⏱️ " + sure; };
  const ustYaz = () => {
    $("bkTur").textContent = "Tur " + (tur + 1) + "/" + TUR + " • " + (tur % 2 === 0 ? "Kelime" : "İşlem");
    $("bkPuan").textContent = "⭐ " + toplam;
  };
  function sayacBaslat(sn, bitisFn) {
    clearInterval(zaman);
    sure = sn;
    sureYaz();
    zaman = setInterval(() => { sure--; sureYaz(); if (sure <= 0) bitisFn(); }, 1000);
  }

  // ---------- Genel akış ----------
  function baslat() {
    tur = 0; toplam = 0; kPuan = 0; iPuan = 0; sira = karistir(KELIMELER);
    bolum("oyun");
    turBaslat();
  }
  function turBaslat() {
    kilit = false;
    fb("");
    ustYaz();
    if (tur % 2 === 0) kelimeTuru(); else islemTuru();
  }
  function sonrakiTur() {
    tur++;
    if (tur >= TUR) return bitir();
    turBaslat();
  }
  function bitir() {
    clearInterval(zaman);
    let en = 0;
    try {
      en = Number(localStorage.getItem("bkbiEn")) || 0;
      if (toplam > en) { en = toplam; localStorage.setItem("bkbiEn", String(en)); }
    } catch (e) { if (toplam > en) en = toplam; }
    $("bkSBaslik").textContent = "🏁 Oyun bitti!";
    $("bkSMetin").textContent = "Toplam: " + toplam + " puan • Kelime: " + kPuan + " • İşlem: " + iPuan + " • En yüksek: " + en;
    bolum("son");
  }

  // ---------- KELİME TURU ----------
  function kelimeTuru() {
    $("bkKelime").classList.remove("hidden");
    $("bkIslem").classList.add("hidden");
    const [w, ipucu] = sira[Math.floor(tur / 2)];
    hedefKelime = Array.from(w.toLocaleUpperCase("tr"));
    n = hedefKelime.length;
    const ekstra = [];
    for (let i = 0; i < (n >= 7 ? 2 : 3); i++) ekstra.push(EKSTRA[rnd(EKSTRA.length)]);
    tiles = karistir(hedefKelime.concat(ekstra)).map(ch => ({ ch, used: false }));
    secili = [];
    hak = HAK;
    $("bkIpucu").textContent = n + " harfli bir kelime bul: " + ipucu;
    kelimeCiz();
    sayacBaslat(KELIME_SURE, () => kelimeBitir(false, "⏰ Süre doldu!"));
  }
  function kelimeCiz(durum) {
    let cells = "";
    for (let i = 0; i < n; i++) cells += `<div class="bkC ${durum || ""}">${durum === "y" ? hedefKelime[i] : (secili[i] ? secili[i].ch : "")}</div>`;
    $("bkCevap").innerHTML = cells;
    const kutu = $("bkHarfler");
    kutu.innerHTML = "";
    tiles.forEach(t => {
      const b = document.createElement("button");
      b.className = "bkT";
      b.textContent = t.ch;
      b.disabled = t.used || kilit;
      b.onclick = () => {
        if (kilit || t.used || secili.length >= n) return;
        t.used = true; secili.push(t); fb(""); kelimeCiz();
      };
      kutu.append(b);
    });
  }
  function kelimeBitir(dogru, mesaj) {
    if (kilit) return;
    kilit = true;
    clearInterval(zaman);
    if (dogru) {
      const p = n * 100;
      toplam += p; kPuan += p;
      kelimeCiz("d");
      fb("✅ Doğru! +" + p + " puan", "#22c55e");
      ustYaz();
      setTimeout(sonrakiTur, 1500);
    } else {
      kelimeCiz("y");
      fb(mesaj + " Cevap: " + hedefKelime.join(""), "#ef4444");
      setTimeout(sonrakiTur, 2200);
    }
  }
  function gonder() {
    if (kilit) return;
    if (secili.length !== n) return fb(n + " harf seçmelisin", "#ffe9c7");
    if (secili.map(t => t.ch).join("") === hedefKelime.join("")) return kelimeBitir(true);
    hak--;
    if (hak <= 0) return kelimeBitir(false, "❌ Hakkın bitti!");
    tiles.forEach(t => t.used = false);
    secili = [];
    kelimeCiz();
    fb("❌ Yanlış, kalan hak: " + hak, "#ef4444");
    const c = $("bkCevap");
    c.classList.remove("bkTitre"); void c.offsetWidth; c.classList.add("bkTitre");
  }
  $("bkSil").onclick = () => { if (kilit || !secili.length) return; secili.pop().used = false; fb(""); kelimeCiz(); };
  $("bkKaristir").onclick = () => { if (kilit) return; tiles = karistir(tiles); kelimeCiz(); };
  $("bkGonder").onclick = gonder;

  // ---------- İŞLEM TURU ----------
  function islemTuru() {
    $("bkKelime").classList.add("hidden");
    $("bkIslem").classList.remove("hidden");
    soru = sayilariUret();
    idCnt = 0;
    sayiTiles = soru.sayilar.map(v => ({ id: idCnt++, v }));
    sel = null; op = null; gecmis = []; adimlar = [];
    $("bkHedef").textContent = soru.hedef;
    const ops = $("bkOps");
    ops.innerHTML = "";
    ["+", "−", "×", "÷"].forEach(o => {
      const b = document.createElement("button");
      b.className = "bkO";
      b.textContent = o;
      b.onclick = () => {
        if (kilit) return;
        if (sel === null) return fb("Önce bir sayı seç", "#ffe9c7");
        op = op === o ? null : o;
        fb("");
        islemCiz();
      };
      ops.append(b);
    });
    islemCiz();
    sayacBaslat(ISLEM_SURE, () => islemBitir());
  }
  function islemCiz() {
    const kutu = $("bkSayilar");
    kutu.innerHTML = "";
    sayiTiles.forEach((t, i) => {
      const b = document.createElement("button");
      b.className = "bkN" + (sel === i ? " s" : "");
      b.textContent = t.v;
      b.disabled = kilit;
      b.onclick = () => sayiTikla(i);
      kutu.append(b);
    });
    Array.from($("bkOps").children).forEach(b => b.classList.toggle("s", b.textContent === op));
    $("bkAdimlar").innerHTML = adimlar.map(a => a).join("<br>");
  }
  function sayiTikla(i) {
    if (kilit) return;
    fb("");
    if (sel === null) { sel = i; return islemCiz(); }
    if (op === null) { sel = sel === i ? null : i; return islemCiz(); }
    if (i === sel) return;
    const a = sayiTiles[sel].v, b = sayiTiles[i].v;
    let r;
    if (op === "+") r = a + b;
    else if (op === "×") r = a * b;
    else if (op === "−") {
      if (a <= b) { op = null; islemCiz(); return fb("Çıkarma sonucu pozitif olmalı", "#ef4444"); }
      r = a - b;
    } else {
      if (b === 0 || a % b !== 0) { op = null; islemCiz(); return fb("Bölme tam sayı çıkmalı", "#ef4444"); }
      r = a / b;
    }
    gecmis.push({ tiles: sayiTiles.slice(), adimlar: adimlar.slice() });
    adimlar.push(a + " " + op + " " + b + " = " + r);
    const eski = [sel, i];
    sayiTiles = sayiTiles.filter((_, k) => !eski.includes(k));
    sayiTiles.push({ id: idCnt++, v: r });
    sel = null; op = null;
    islemCiz();
    if (r === soru.hedef) islemBitir();
  }
  function islemBitir() {
    if (kilit) return;
    kilit = true;
    clearInterval(zaman);
    const enYakin = sayiTiles.reduce((m, t) => Math.abs(t.v - soru.hedef) < Math.abs(m - soru.hedef) ? t.v : m, sayiTiles[0].v);
    const fark = Math.abs(enYakin - soru.hedef);
    const p = fark === 0 ? 1000 : fark <= 5 ? 700 : fark <= 10 ? 500 : 0;
    toplam += p; iPuan += p;
    ustYaz();
    islemCiz();
    if (fark === 0) {
      fb("✅ Tam isabet! +" + p + " puan", "#22c55e");
      setTimeout(sonrakiTur, 1700);
    } else {
      fb((p ? "En yakın: " + enYakin + " (fark " + fark + ") +" + p + " puan" : "Olmadı, en yakın: " + enYakin) , p ? "#ffe9c7" : "#ef4444");
      $("bkAdimlar").innerHTML = "<b>Örnek çözüm:</b><br>" + soru.adim.join("<br>");
      setTimeout(sonrakiTur, 4500);
    }
  }
  $("bkGeriAl").onclick = () => {
    if (kilit || !gecmis.length) return;
    const g = gecmis.pop();
    sayiTiles = g.tiles; adimlar = g.adimlar; sel = null; op = null;
    fb(""); islemCiz();
  };
  $("bkBitir").onclick = islemBitir;

  // ---------- Olaylar ----------
  menuBtn.onclick = () => { ana.classList.add("hidden"); sec.classList.remove("hidden"); bolum("giris"); };
  $("bkBasla").onclick = baslat;
  $("bkTekrar").onclick = baslat;
  $("bkGeri").onclick = menuyeDon;
  $("bkMenu").onclick = menuyeDon;

  // Başlığa tıklanınca (ortak.js) süreyi durdur ve ana sayfaya dön
  document.addEventListener("anasayfa", menuyeDon);
})();
