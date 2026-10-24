// PASSAPAROLA MODU
// Kullanım: index.html'de </body> öncesine şunu ekle:  <script src="passaparola.js"></script>
// Bu dosya kendi butonunu ("İlerlemeyi Sıfırla" altına), ekranını ve stilini kendisi ekler.
(function () {
  const SURE = 240; // saniye (süreyi buradan değiştir)

  const HARFLER = ["A","B","C","Ç","D","E","F","G","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];

  // Her harf için: [ ["ipucu", ["Doğru cevap", "kabul edilen diğer yazım"]], ... ]
  // Bir harfe istediğin kadar soru ekle; oyun her seferinde rastgele birini seçer.
  // Cevaplarda büyük/küçük harf farkı önemsenmez; Türkçe karakterler (ş, ç, ğ, ı, ö, ü) birebir yazılmalıdır.
  const SORU = {
    "A": [
      ["Türkiye'nin başkenti", ["Ankara"]],
      ["Dünyanın en büyük kıtası", ["Asya"]],
      ["Ormanlar kralı olarak bilinen hayvan", ["Aslan"]],
      ["Nuh'un gemisinin karaya oturduğu rivayet edilen, Türkiye'nin en yüksek dağı", ["Ağrı", "Ağrı Dağı"]]
    ],
    "B": [
      ["Çocukların oynadığı, üflenince şişen renkli lastik oyuncak", ["Balon"]],
      ["Gökyüzünde yağmur getiren beyaz veya gri kümeler", ["Bulut"]],
      ["Marmara Bölgesi'nde, Osmanlı'nın ilk başkenti olan şehir", ["Bursa"]],
      ["Çiçeklerin açtığı, kıştan sonra gelen mevsim", ["Bahar"]]
    ],
    "C": [
      ["Yumurtadan yeni çıkmış tavuk yavrusu", ["Civciv"]],
      ["Pantolon ve ceketlerde eşya koymaya yarayan bölüm", ["Cep"]],
      ["Haftanın beşinci günü", ["Cuma"]],
      ["Atatürk'ün 1923'te ilan ettiği yönetim biçimi", ["Cumhuriyet"]]
    ],
    "Ç": [
      ["Yemek yerken kullanılan, uçları dişli sofra aleti", ["Çatal"]],
      ["Kum tepeleriyle kaplı, yağmurun çok az düştüğü kurak bölge", ["Çöl"]],
      ["Türklerin en çok içtiği, demlenerek hazırlanan sıcak içecek", ["Çay"]],
      ["Okula giderken sırtta veya omuzda taşınan eşya taşıma aracı", ["Çanta"]]
    ],
    "D": [
      ["Yemekleri çiğnememizi sağlayan, ağızdaki sert yapılar", ["Diş"]],
      ["Karadeniz ve Akdeniz gibi tuzlu su kütlesi", ["Deniz"]],
      ["Üzerinde yaşadığımız gezegen", ["Dünya"]],
      ["Ağızda bulunan, tat almamızı sağlayan organ", ["Dil"]]
    ],
    "E": [
      ["Adem ile Havva'nın yediği rivayet edilen meyve", ["Elma"]],
      ["Dünyanın en yüksek dağı", ["Everest", "Everest Dağı"]],
      ["Eylül'den sonra gelen ay", ["Ekim"]],
      ["Uzun kulaklı, 'anıran' çiftlik hayvanı", ["Eşek"]]
    ],
    "F": [
      ["Hortumu olan, karaların en büyük hayvanı", ["Fil"]],
      ["Kadıköy'de stadı bulunan sarı lacivert futbol kulübü", ["Fenerbahçe"]],
      ["Başkenti Paris olan ülke", ["Fransa"]],
      ["Türkiye'nin Karadeniz kıyılarında en çok yetiştirilen kuruyemiş", ["Fındık"]]
    ],
    "G": [
      ["Dünyamızı ısıtan ve aydınlatan yıldız", ["Güneş"]],
      ["Yağmurdan sonra gökyüzünde beliren yedi renkli yay", ["Gökkuşağı"]],
      ["Aslan simgeli, sarı kırmızı renkli İstanbul futbol kulübü", ["Galatasaray"]],
      ["Görmemizi sağlayan organ", ["Göz"]]
    ],
    "H": [
      ["Mekke'ye yapılan kutsal ziyaret", ["Hac"]],
      ["Yeryüzünü saran, soluduğumuz gaz karışımı", ["Hava"]],
      ["Doktorun muayene ettiği kişi", ["Hasta"]],
      ["Futbol maçını yöneten ve düdük çalan kişi", ["Hakem"]]
    ],
    "I": [
      ["Lambadan ve güneşten yayılan, aydınlatan şey", ["Işık"]],
      ["Yeşil yapraklı, Temel Reis'in güç almak için yediği sebze", ["Ispanak"]],
      ["Başkenti Bağdat olan ülke", ["Irak"]],
      ["Nehir sözcüğünün Türkçe karşılığı", ["Irmak"]]
    ],
    "İ": [
      ["Türkiye'nin en kalabalık şehri", ["İstanbul"]],
      ["Ege'nin en büyük limanı olan, Kordon'uyla ünlü şehir", ["İzmir"]],
      ["Dikiş dikmeye yarayan, ucu sivri ve iplik geçirilen araç", ["İğne"]],
      ["Sütü içilen, boynuzlu çiftlik hayvanı", ["İnek"]]
    ],
    "J": [
      ["Kırsal bölgelerde görev yapan askeri güvenlik gücü", ["Jandarma"]],
      ["Yarışmalarda puan veren veya karar veren kurul", ["Jüri"]],
      ["Sakal tıraşında kullanılan keskin ince bıçak", ["Jilet"]],
      ["Başkenti Tokyo olan ülke", ["Japonya"]]
    ],
    "K": [
      ["Yazı yazmaya yarayan araç", ["Kalem"]],
      ["Sayfalardan oluşan, okumak için kullanılan ciltli eser", ["Kitap"]],
      ["Vücutta kanı pompalayan organ", ["Kalp"]],
      ["Kış mevsiminde gökten yağan beyaz taneler", ["Kar"]]
    ],
    "L": [
      ["Sarı renkli, ekşi bir narenciye", ["Limon"]],
      ["Hollanda ile özdeşleşen, soğanından yetişen çiçek", ["Lale"]],
      ["Pudra şekerine bulanmış, jelatinimsi Türk tatlısı", ["Lokum"]],
      ["İngiltere'nin başkenti", ["Londra"]]
    ],
    "M": [
      ["Güneş Sistemi'nin Kızıl Gezegeni", ["Mars"]],
      ["Piramitleriyle ünlü, Nil kıyısındaki ülke", ["Mısır"]],
      ["Güneş'e en yakın gezegen", ["Merkür"]],
      ["Yanarak ışık veren, balmumundan yapılan eşya", ["Mum"]]
    ],
    "N": [
      ["Mısır'dan geçen, dünyanın en uzun nehirlerinden biri", ["Nil"]],
      ["Kırmızı, içi taneli, ekşi tatlı meyve", ["Nar"]],
      ["Cümlenin sonuna konulan noktalama işareti", ["Nokta"]],
      ["Yılın dördüncü ayı", ["Nisan"]]
    ],
    "O": [
      ["Öğrencilerin ders gördüğü yer", ["Okul"]],
      ["Askerlerin oluşturduğu büyük topluluk", ["Ordu"]],
      ["Çok sayıda ağacın bulunduğu geniş alan", ["Orman"]],
      ["Soluduğumuz havadaki, yaşam için gerekli gaz", ["Oksijen"]]
    ],
    "Ö": [
      ["Okulda ders anlatan kişi", ["Öğretmen"]],
      ["Gölde yüzen, 'vak vak' diyen kuş", ["Ördek"]],
      ["Öğretmenin evde yapılmak üzere verdiği çalışma", ["Ödev"]],
      ["Ders gören kişi", ["Öğrenci"]]
    ],
    "P": [
      ["İtalyan mutfağından, yuvarlak hamur üzerine peynirli yemek", ["Pizza"]],
      ["Turuncu renkli, suyu içilen narenciye", ["Portakal"]],
      ["Doğum günlerinde mumlarla süslenen tatlı", ["Pasta"]],
      ["Kutuplarda yaşayan, uçamayan siyah beyaz kuş", ["Penguen"]]
    ],
    "R": [
      ["Kırmızı, mavi, sarı gibi şeylere verilen genel ad", ["Renk"]],
      ["Kalem veya boyayla kâğıda yapılan çizim", ["Resim"]],
      ["Müzik ve haber dinlemek için kullanılan, sesi dalgalarla alan cihaz", ["Radyo"]],
      ["İtalya'nın başkenti", ["Roma"]]
    ],
    "S": [
      ["İnekten elde edilen beyaz içecek", ["Süt"]],
      ["Zamanı gösteren araç", ["Saat"]],
      ["Dünyanın en büyük sıcak çölü", ["Sahra", "Sahra Çölü"]],
      ["64 kareli tahtada oynanan, şah ve vezirli zeka oyunu", ["Satranç"]]
    ],
    "Ş": [
      ["Çaya katılan tatlı beyaz kristal", ["Şeker"]],
      ["Yağmurdan korunmak için açılan araç", ["Şemsiye"]],
      ["Köyden büyük, kalabalık yerleşim yeri", ["Şehir"]],
      ["Dizelerden oluşan edebi tür", ["Şiir"]]
    ],
    "T": [
      ["Raylar üzerinde giden ulaşım aracı", ["Tren"]],
      ["Uzun kulaklı, havuç yemeyi seven hayvan", ["Tavşan"]],
      ["Görüntü ve ses yayınlayan ev eşyası", ["Televizyon"]],
      ["Yemeklere lezzet veren beyaz mineral", ["Tuz"]]
    ],
    "U": [
      ["Gökyüzünde uçan, yolcu taşıyan araç", ["Uçak"]],
      ["Geceleri yatakta uzanıp yaptığımız dinlenme hâli", ["Uyku"]],
      ["Gezegenlerin ve yıldızların bulunduğu sonsuz boşluk", ["Uzay"]],
      ["Rüzgârda ipiyle uçurulan kâğıt oyuncak", ["Uçurtma"]]
    ],
    "Ü": [
      ["Salkım halinde yetişen, şarabı yapılan meyve", ["Üzüm"]],
      ["Liseden sonra eğitim alınan yüksek öğretim kurumu", ["Üniversite"]],
      ["Sınırları belli, bir devletin yönettiği toprak parçası", ["Ülke"]],
      ["Kıyafetlerin kırışıklıklarını gideren cihaz", ["Ütü"]]
    ],
    "V": [
      ["Elektrik geriliminin birimi", ["Volt"]],
      ["Çiçek koymak için kullanılan süs kabı", ["Vazo"]],
      ["İnsan veya hayvan bedeninin tamamı", ["Vücut"]],
      ["Kirazı andıran, ekşi kırmızı meyve", ["Vişne"]]
    ],
    "Y": [
      ["Bulutlardan damla damla düşen su", ["Yağmur"]],
      ["Denizde yaşayan, zeki ve sevimli memeli", ["Yunus"]],
      ["Gece gökyüzünde parlayan, Güneş'in de türü olduğu gök cismi", ["Yıldız"]],
      ["Yılın en sıcak mevsimi", ["Yaz"]]
    ],
    "Z": [
      ["Siyah beyaz çizgili, at benzeri hayvan", ["Zebra"]],
      ["En uzun boyunlu kara hayvanı", ["Zürafa"]],
      ["Yağı çıkarılan, kahvaltıda yenen yeşil veya siyah meyve", ["Zeytin"]],
      ["Okulda teneffüsü bildiren, çalan alet", ["Zil"]]
    ]
  };

  // ---------- Stil ----------
  const css = document.createElement("style");
  css.textContent = `
  .btn.oval{border-radius:999px}
  .ppRozet{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#1d4ed8;color:#fff;font-size:12px;font-weight:700;vertical-align:middle;margin-right:6px;letter-spacing:0}
  .ppRozet.b{width:40px;height:40px;font-size:16px}
  #pp.ppK{padding:14px 12px}
  #ppHarfler{position:relative;width:250px;height:250px;margin:0 auto 8px}
  .ppH{position:absolute;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#0d1426;border:1px solid #1d2540;font-weight:700;font-size:11px;line-height:1}
  .ppH.su{border-color:#ffe9c7;background:#3b0000;color:#ffe9c7;transform:scale(1.25);z-index:2}
  .ppH.d{background:#14532d;border-color:#22c55e}
  .ppH.y{background:#7f1d1d;border-color:#ef4444}
  .ppH.p{background:#5b4a14;border-color:#eab308}
  #ppMerkez{position:absolute;inset:36px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
  #ppBuyuk{font-size:56px;font-weight:700;color:#ffe9c7;line-height:1}
  #ppSure{font-size:20px;font-weight:700}
  #ppPuan{font-size:14px;color:#8e9bc4}
  #ppSoru{font-size:17px;line-height:1.35;margin-bottom:10px}
  #ppCevap{box-sizing:border-box;width:100%;min-height:50px;padding:12px;border-radius:16px;border:1px solid #1d2540;background:#0d1426;color:#fff;font:inherit;font-size:18px;line-height:24px;text-align:center;outline:none;caret-color:#fff;white-space:nowrap;overflow:hidden;-webkit-user-select:text;user-select:text}
  #ppCevap:focus{border-color:#8e9bc4}
  #ppGeriBildirim{min-height:22px;margin-top:6px;font-weight:700}
  .ppSatir{display:flex;gap:10px}
  .ppSatir .btn{margin-top:6px;padding:13px;font-size:17px}
  `;
  document.head.append(css);

  // ---------- Ana menü butonu ----------
  const ana = document.getElementById("ana");
  const menuBtn = document.createElement("button");
  menuBtn.className = "btn ikinci oval";
  menuBtn.id = "ppAc";
  menuBtn.innerHTML = '<span class="ppRozet">abc</span> Passaparola';
  ana.append(menuBtn);

  // ---------- Passaparola ekranı ----------
  const sec = document.createElement("section");
  sec.className = "kart hidden";
  sec.id = "pp";
  sec.innerHTML = `
    <div id="ppGiris">
      <h2><span class="ppRozet b">abc</span> Passaparola</h2>
      <p class="alt">28 harf, ${SURE} saniye. Her harfin sorusunu bil, bilemezsen pas geç; pas geçilenlere sonra tekrar dönersin. Cevapları Türkçe karakterlerle yaz (ş, ç, ğ, ı, ö, ü).</p>
      <button class="btn" id="ppBasla">▶️ Başla</button>
      <button class="btn ikinci" id="ppGeri">Ana menü</button>
    </div>
    <div id="ppOyun" class="hidden">
      <div id="ppHarfler">
        <div id="ppMerkez"><div id="ppBuyuk"></div><span id="ppSure"></span><b id="ppPuan"></b></div>
        <div id="ppChips"></div>
      </div>
      <p id="ppSoru"></p>
      <div id="ppCevap" contenteditable="true" role="textbox" aria-label="Cevap" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done"></div>
      <p id="ppGeriBildirim"></p>
      <div class="ppSatir">
        <button class="btn ikinci" id="ppPas">Pas</button>
        <button class="btn" id="ppGonder">Cevapla</button>
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

  // Cevap kutusu bilerek <input> değil, düzenlenebilir bir <div>:
  // Chrome bunu şifre/kart/adres alanı sanıp otomatik doldurma çubuğu göstermesin diye.
  const oku = () => inp.textContent;
  const yaz = v => { inp.textContent = v; };
  const odak = () => {
    inp.focus();
    const r = document.createRange();
    r.selectNodeContents(inp);
    r.collapse(false);
    const sl = getSelection();
    sl.removeAllRanges();
    sl.addRange(r);
  };

  // ---------- Durum ----------
  let dur, sorular, idx, sure, zaman, kilit;
  // dur: 0 bekliyor, 1 doğru, 2 yanlış, 3 pas

  const norm = s => s.toLocaleLowerCase("tr").replace(/[^a-zçğıöşü0-9]/g, "");

  const bolum = b => {
    giris.classList.toggle("hidden", b !== "giris");
    oyun.classList.toggle("hidden", b !== "oyun");
    son.classList.toggle("hidden", b !== "son");
    sec.classList.toggle("ppK", b === "oyun");
    document.querySelector("h1").style.display = b === "oyun" ? "none" : "";
  };

  function menuyeDon() {
    clearInterval(zaman);
    sec.classList.add("hidden");
    sec.classList.remove("ppK");
    document.querySelector("h1").style.display = "";
    ana.classList.remove("hidden");
  }

  function sureYaz() {
    const m = Math.floor(sure / 60), s = sure % 60;
    $("ppSure").textContent = "⏱️ " + m + ":" + String(s).padStart(2, "0");
  }

  function ciz() {
    $("ppChips").innerHTML = HARFLER.map((h, i) => {
      const c = ["", "d", "y", "p"][dur[i]];
      const a = -Math.PI / 2 + i * 2 * Math.PI / HARFLER.length;
      const x = 125 + 111 * Math.cos(a) - 12, y = 125 + 111 * Math.sin(a) - 12;
      return `<div class="ppH ${c} ${i === idx ? "su" : ""}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px">${h}</div>`;
    }).join("");
    $("ppBuyuk").textContent = HARFLER[idx];
    $("ppPuan").textContent = "✅ " + dur.filter(x => x === 1).length + " / " + HARFLER.length;
    $("ppSoru").textContent = sorular[idx][0];
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
    yaz("");
    const j = sonrakiBul();
    if (j < 0) return bitir();
    idx = j;
    ciz();
    odak();
  }

  function baslat() {
    dur = HARFLER.map(() => 0);
    sorular = HARFLER.map(h => SORU[h][Math.floor(Math.random() * SORU[h].length)]);
    idx = 0;
    sure = SURE;
    kilit = false;
    fb.textContent = "";
    yaz("");
    bolum("oyun");
    ciz();
    odak();
    setTimeout(kaydir, 400);
    clearInterval(zaman);
    zaman = setInterval(() => {
      sure--;
      sureYaz();
      if (sure <= 0) bitir();
    }, 1000);
  }

  function gonder() {
    if (kilit) return;
    const v = norm(oku());
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
  const kaydir = () => $("ppGonder").scrollIntoView({ block: "end", behavior: "smooth" });
  inp.addEventListener("focus", () => setTimeout(kaydir, 400));
  const mv = document.querySelector('meta[name="viewport"]');
  if (mv && !/interactive-widget/.test(mv.content)) mv.content += ", interactive-widget=resizes-content";
  inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); gonder(); } });
  inp.addEventListener("paste", e => {
    e.preventDefault();
    const t = (e.clipboardData || window.clipboardData).getData("text").replace(/\s+/g, " ");
    document.execCommand("insertText", false, t);
  });

  // Başlık: oyunda üstte küçük sabit çubuk (klavye açıkken de görünür), tıklayınca ana sayfa
  const stl = document.createElement("style");
  stl.textContent = "body.ppOyunda{padding-top:calc(30px + env(safe-area-inset-top))!important;padding-bottom:0}body.ppOyunda h1{display:block!important;position:fixed!important;top:0;left:0;right:0;margin:0!important;padding:5px 0;padding-top:calc(5px + env(safe-area-inset-top));font-size:15px!important;line-height:1.3;text-align:center;background:rgba(3,3,12,.96);border-bottom:1px solid #1d2540;z-index:5;cursor:pointer}#ppSoru{text-wrap:balance;text-align:center}";
  document.head.append(stl);
  const hGuncelle = () => {
    const a = !sec.classList.contains("hidden") && !oyun.classList.contains("hidden");
    document.body.classList.toggle("ppOyunda", a);
  };
  new MutationObserver(hGuncelle).observe(sec, { attributes: true, attributeFilter: ["class"] });
  new MutationObserver(hGuncelle).observe(oyun, { attributes: true, attributeFilter: ["class"] });
  document.querySelector("h1").addEventListener("click", () => {
    if (document.body.classList.contains("ppOyunda")) menuyeDon();
  });
  document.addEventListener("anasayfa", menuyeDon);
})();
