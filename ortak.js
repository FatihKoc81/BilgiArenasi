// ORTAK AYARLAR (tüm oyunlar için)
// index.html'de </body> öncesine ekle:  <script src="ortak.js"></script>
// "BİLGİ ARENASI" başlığına tıklayınca, hangi oyunda olursan ol ana sayfaya döner.
(function () {
  // Ana menü düzenlemesi: "İlerlemeyi Sıfırla" kaldırılır, "Oyuna Başla" -> "Milyoner"
  const sifirla = document.getElementById("sifirla");
  if (sifirla) sifirla.remove();
  const basla = document.getElementById("basla");
  if (basla) basla.textContent = "🎯 Milyoner";

  const baslik = document.querySelector("h1");
  baslik.style.cursor = "pointer";
  baslik.addEventListener("click", () => {
    // Oyunlar bu olayı dinleyip kendi sayaçlarını durdurabilir
    document.dispatchEvent(new Event("anasayfa"));
    // Tüm oyun/sonuç ekranlarını gizle (ana menü <main id="ana"> olduğu için etkilenmez)
    document.querySelectorAll("section.kart").forEach(e => e.classList.add("hidden"));
    if (typeof menu === "function") menu();
    document.getElementById("ana").classList.remove("hidden");
  });
})();
