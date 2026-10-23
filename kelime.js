// KELİME OYUNU (TV'deki Kelime Oyunu tarzı: ipucuna bak, altıgenlerdeki kelimeyi bul)
// Kullanım: index.html'de passaparola.js satırından SONRA ekle:  <script src="kelime.js"></script>
(function () {
  const TUR = 10;     // bir oyundaki kelime sayısı
  const SURE = 60;    // her kelime için saniye
  const HAK = 3;      // her kelime için tahmin hakkı
  const PUAN = 100;   // kapalı her harf için puan

  // [ "Kelime", "İpucu" ]  —  yeni kelime eklemek için listeye bir satır ekle
  const KELIMELER = [
    ["Kütüphane", "Çok sayıda kitabın bulunduğu, ödünç kitap alınabilen yer"],
    ["Bilgisayar", "Verileri işleyen, ekranı ve klavyesi olan elektronik cihaz"],
    ["Pencere", "Odaya ışık ve hava girmesini sağlayan, camlı açıklık"],
    ["Merdiven", "Bir kattan diğerine çıkmaya yarayan basamaklı yapı"],
    ["Kelebek", "Renkli kanatlı, tırtıldan dönüşen böcek"],
    ["Çiçek", "Bahçede açan, güzel kokulu bitki parçası"],
    ["Terazi", "Nesnelerin ağırlığını ölçmeye yarayan alet"],
    ["Mutfak", "Evde yemeklerin pişirildiği oda"],
    ["Ayakkabı", "Ayağa giyilen, yürümeyi kolaylaştıran eşya"],
    ["Sinema", "Filmlerin büyük perdede gösterildiği yer"],
    ["Havuç", "Turuncu renkli, tavşanların sevdiği kök sebze"],
    ["Okyanus", "Denizden de büyük, kıtaları ayıran geniş su kütlesi"],
    ["Kaplumbağa", "Sırtında kabuk taşıyan, çok yavaş yürüyen hayvan"],
    ["Telefon", "Uzaktaki kişilerle konuşmaya yarayan cihaz"],
    ["Gözlük", "Görmeyi kolaylaştıran, burna takılan cam eşya"],
    ["Fotoğraf", "Kamerayla çekilen sabit görüntü"],
    ["Kamyon", "Yük taşımak için kullanılan büyük taşıt"],
    ["Çorba", "Kaşıkla içilen, sıcak ve sulu yemek"],
    ["Baklava", "Fıstıklı, şerbetli, ince yufkalı Türk tatlısı"],
    ["Simit", "Üzeri susamlı, halka biçimli hamur işi"],
    ["Hastane", "Hastaların tedavi edildiği sağlık kurumu"],
    ["Eczane", "İlaçların satıldığı yer"],
    ["Sandalye", "Oturmaya yarayan, arkalıklı eşya"],
    ["Yıldırım", "Gök gürültüsüyle birlikte çakan elektrik boşalması"],
    ["Deprem", "Yer kabuğundaki hareketlerle oluşan sarsıntı"],
    ["Volkan", "Lav püskürten dağ"],
    ["Şelale", "Yüksekten dökülen akarsu"],
    ["Yarımada", "Üç yanı sularla çevrili kara parçası"],
    ["Harita", "Yeryüzünün küçültülerek çizilmiş hâli"],
    ["Pusula", "Yön bulmaya yarayan, ibresi kuzeyi gösteren alet"],
    ["Mikroskop", "Gözle görülemeyen küçük şeyleri büyüterek gösteren alet"],
    ["Teleskop", "Uzaktaki gök cisimlerini yakından göstermeye yarayan alet"],
    ["Termometre", "Sıcaklığı ölçen alet"],
    ["Roket", "Uzaya fırlatılan, yakıtla yükselen araç"],
    ["Astronot", "Uzaya giden kişi"],
    ["Orkestra", "Birçok çalgıcının birlikte müzik yaptığı topluluk"],
    ["Tiyatro", "Oyuncuların sahnede canlı oynadığı gösteri"],
    ["Gazete", "Her gün yayımlanan haber basılısı"],
    ["Karınca", "Koloniler hâlinde yaşayan, çok çalışkan küçük böcek"],
    ["Kanguru", "Yavrusunu karnındaki keseyle taşıyan Avustralya hayvanı"],
    ["Mercimek", "Çorbası yapılan, küçük taneli kırmızı veya yeşil bakliyat"],
    ["Salatalık", "Yeşil renkli, turşusu yapılan sulu sebze"],
    ["Patlıcan", "Mor renkli, musakkası yapılan sebze"],
    ["Karpuz", "Yazın yenen, içi kırmızı, kabuğu yeşil iri meyve"],
    ["Çilek", "Kırmızı, küçük, yaz mevsiminde yenen meyve"]
  ];

  // ---------- Stil ----------
  const css = document.createElement("style");
  css.textContent = `
  .btn.oval{border-radius:999px}
  #kk.kkK{padding:14px 12px}
  #kkBilgi{display:flex;justify-content:space-between;color:#8e9bc4;font-size:15px;margin-bottom:4px}
  #kkHeks{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;margin:10px 0}
  .kkH{display:flex;align-items:center;justify-content:center;background:#5b21b6;color:#fff;font-weight:700;clip-path:polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)}
  .kkH.a{background:#fff;color:#1d1040}
  .kkH.d{background:#22c55e;color:#fff}
  .kkH.y{background:#ef4444;color:#fff}
  #kkPot{color:#ffe9c7;font-weight:700;font-size:16px}
  #kkIpucu{font-size:17px;line-height:1.35;margin:8px 0 10px}
  #kkCevap{width:100%;padding:12px;border-radius:16px;border:1px solid #1d2540;background:#0d1426;color:#fff;font:inherit;font-size:18px;text-align:center;outline:none}
  #kkCevap:focus{border-color:#8e9bc4}
  #kkGeriBildirim{min-height:22px;margin-top:6px;font-weight:700}
  .kkSatir{display:flex;gap:8px}
  .kkSatir .btn{margin-top:6px;padding:13px 6px;font-size:15px}
  .kkTitre{animation:kkt .3s}
  @keyframes kkt{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  `;
  document.head.append(css);

  // ---------- Ana menü butonu ----------
  const ana = document.getElementById("ana");
  const menuBtn = document.createElement("button");
  menuBtn.className = "btn ikinci oval";
  menuBtn.textContent = "🔷 Kelime Oyunu";
  ana.append(menuBtn);

  // ---------- Ekran ----------
  const sec = document.createElement("section");
  sec.className = "kart hidden";
  sec.id = "kk";
  sec.innerHTML = `
    <div id="kkGiris">
      <h2>🔷 Kelime Oyunu</h2>
      <p class="alt">İpucunu oku, altıgenlerdeki kelimeyi bul. Ne kadar az harf açarsan o kadar çok puan kazanırsın. ${TUR} kelime, her kelime için ${SURE} saniye ve ${HAK} tahmin hakkı var. Türkçe karakterleri doğru yaz.</p>
      <button class="btn" id="kkBasla">▶️ Başla</button>
      <button class="btn ikinci" id="kkGeri">Ana menü</button>
    </div>
    <div id="kkOyun" class="hidden">
      <div id="kkBilgi"><b id="kkSayi"></b><span id="kkPuan"></span></div>
      <div id="kkHeks"></div>
      <div id="kkBilgi2" style="display:flex;justify-content:space-between"><span id="kkPot"></span><span id="kkSure" style="font-weight:700"></span></div>
      <p id="kkIpucu"></p>
      <input id="kkCevap" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Tahminin (Türkçe karakterle)">
      <p id="kkGeriBildirim"></p>
      <div class="kkSatir">
        <button class="btn ikinci" id="kkHarfAl">💡 Harf Al</button>
        <button class="btn ikinci" id="kkPas">Pas</button>
        <button class="btn" id="kkTahmin">Tahmin</button>
      </div>
    </div>
    <div id="kkSon" class="hidden">
      <h2 id="kkSBaslik"></h2>
      <p class="alt" id="kkSMetin"></p>
      <button class="btn" id="kkTekrar">Tekrar oyna</button>
      <button class="btn ikinci" id="kkMenu">Ana menü</button>
    </div>`;
  ana.insertAdjacentElement("afterend", sec);

  const $ = id => document.getElementById(id);
  const giris = $("kkGiris"), oyun = $("kkOyun"), son = $("kkSon");
  const inp = $("kkCevap"), fb = $("kkGeriBildirim"), heks = $("kkHeks");

  // ---------- Durum ----------
  let liste, k, harfler, acik, hak, sure, toplam, dogruSayi, zaman, kilit;

  const norm = s => s.toLocaleLowerCase("tr").replace(/[^a-zçğıöşü0-9]/g, "");
  const karistir = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const kapali = () => acik.filter(x => !x).length;

  const bolum = b => {
    giris.classList.toggle("hidden", b !== "giris");
    oyun.classList.toggle("hidden", b !== "oyun");
    son.classList.toggle("hidden", b !== "son");
    sec.classList.toggle("kkK", b === "oyun");
    
  };

  function menuyeDon() {
    clearInterval(zaman);
    sec.classList.add("hidden");
    sec.classList.remove("kkK");
    document.querySelector("h1").style.display = "";
    ana.classList.remove("hidden");
  }

  function sureYaz() { $("kkSure").textContent = "⏱️ " + sure; }

  function ciz(durum) {
    const n = harfler.length;
    const s = Math.max(24, Math.min(40, Math.floor(300 / n) - 4));
    heks.innerHTML = harfler.map((h, i) => {
      const c = durum || (acik[i] ? "a" : "");
      const goster = durum || acik[i];
      return `<div class="kkH ${c}" style="width:${s}px;height:${Math.round(s * 0.92)}px;font-size:${Math.round(s * 0.5)}px">${goster ? h : ""}</div>`;
    }).join("");
    $("kkSayi").textContent = "Kelime " + (k + 1) + "/" + liste.length;
    $("kkPuan").textContent = "⭐ " + toplam;
    $("kkPot").textContent = "💰 " + kapali() * PUAN + "  " + "❤️".repeat(hak);
    $("kkIpucu").textContent = liste[k][1];
    $("kkHarfAl").disabled = kilit || kapali() <= 1;
    sureYaz();
  }

  function yeniKelime() {
    harfler = Array.from(liste[k][0].toLocaleUpperCase("tr"));
    acik = harfler.map(() => false);
    hak = HAK;
    sure = SURE;
    kilit = false;
    fb.textContent = "";
    inp.value = "";
    ciz();
    inp.focus();
    clearInterval(zaman);
    zaman = setInterval(() => {
      sure--;
      sureYaz();
      if (sure <= 0) kelimeBitir("⏰ Süre doldu! Cevap: " + harfler.join(""));
    }, 1000);
  }

  function baslat() {
    liste = karistir(KELIMELER).slice(0, TUR);
    k = 0; toplam = 0; dogruSayi = 0;
    bolum("oyun");
    yeniKelime();
    setTimeout(kaydir, 400);
  }

  function sonraki() {
    k++;
    if (k >= liste.length) return bitir();
    yeniKelime();
  }

  function kelimeBitir(mesaj) {
    if (kilit) return;
    kilit = true;
    clearInterval(zaman);
    ciz("y");
    fb.textContent = mesaj;
    fb.style.color = "#ef4444";
    setTimeout(sonraki, 1900);
  }

  function tahmin() {
    if (kilit) return;
    const v = norm(inp.value);
    if (!v) return;
    if (v === norm(liste[k][0])) {
      const p = kapali() * PUAN;
      toplam += p;
      dogruSayi++;
      kilit = true;
      clearInterval(zaman);
      ciz("d");
      fb.textContent = "✅ Doğru! +" + p + " puan";
      fb.style.color = "#22c55e";
      setTimeout(sonraki, 1300);
    } else {
      hak--;
      inp.value = "";
      inp.classList.remove("kkTitre");
      void inp.offsetWidth;
      inp.classList.add("kkTitre");
      if (hak <= 0) return kelimeBitir("❌ Hakkın bitti! Cevap: " + harfler.join(""));
      fb.textContent = "❌ Yanlış, kalan hak: " + hak;
      fb.style.color = "#ef4444";
      ciz();
    }
  }

  function harfAl() {
    if (kilit || kapali() <= 1) return;
    const kapaliIdx = acik.map((x, i) => x ? -1 : i).filter(i => i >= 0);
    acik[kapaliIdx[Math.floor(Math.random() * kapaliIdx.length)]] = true;
    ciz();
    inp.focus();
  }

  function bitir() {
    clearInterval(zaman);
    kilit = true;
    let en = 0;
    try {
      en = Number(localStorage.getItem("kelimeEn")) || 0;
      if (toplam > en) { en = toplam; localStorage.setItem("kelimeEn", String(en)); }
    } catch (e) { if (toplam > en) en = toplam; }
    $("kkSBaslik").textContent = dogruSayi === liste.length ? "🏆 Hepsini bildin!" : "Oyun bitti!";
    $("kkSMetin").textContent = "Puanın: " + toplam + " • Bildiğin kelime: " + dogruSayi + "/" + liste.length + " • En yüksek puan: " + en;
    bolum("son");
  }

  // ---------- Olaylar ----------
  menuBtn.onclick = () => { ana.classList.add("hidden"); sec.classList.remove("hidden"); bolum("giris"); };
  $("kkBasla").onclick = baslat;
  $("kkTekrar").onclick = baslat;
  $("kkGeri").onclick = menuyeDon;
  $("kkMenu").onclick = menuyeDon;
  $("kkTahmin").onclick = tahmin;
  $("kkHarfAl").onclick = harfAl;
  $("kkPas").onclick = () => kelimeBitir("⏭️ Pas geçildi. Cevap: " + harfler.join(""));
  inp.addEventListener("keydown", e => { if (e.key === "Enter") tahmin(); });

  // Klavye açılınca butonlar görünür kalsın
  const kaydir = () => $("kkTahmin").scrollIntoView({ block: "end", behavior: "smooth" });
  inp.addEventListener("focus", () => setTimeout(kaydir, 400));
  const mv = document.querySelector('meta[name="viewport"]');
  if (mv && !/interactive-widget/.test(mv.content)) mv.content += ", interactive-widget=resizes-content";

  // Başlığa tıklanınca (ortak.js) süreyi durdur ve ana sayfaya dön
  document.addEventListener("anasayfa", menuyeDon);
})();
