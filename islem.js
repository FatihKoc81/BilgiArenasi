// TRT 1 Bir İşlem Oyunu Motoru
let verilenSayilar = [];
let hedefSayi = 0;

function islemOyununuBaslat() {
    // 5 Adet Tek Haneli Sayı (1-9)
    verilenSayilar = [];
    for (let i = 0; i < 5; i++) {
        verilenSayilar.push(Math.floor(Math.random() * 9) + 1);
    }
    
    // 1 Adet Büyük Sayı (10, 25, 50, 75, 100)
    const buyukSayilar = [10, 25, 50, 75, 100];
    const rastgeleBuyuk = buyukSayilar[Math.floor(Math.random() * buyukSayilar.length)];
    verilenSayilar.push(rastgeleBuyuk);

    // 3 Haneli Hedef Sayı (100 - 999)
    hedefSayi = Math.floor(Math.random() * 900) + 100;

    // Arayüze Yansıt
    document.getElementById("hedef-sayi").innerText = hedefSayi;
    
    const sayiKutulari = document.querySelectorAll(".sayi-kutusu");
    verilenSayilar.forEach((sayi, index) => {
        if(sayiKutulari[index]) {
            sayiKutulari[index].innerText = sayi;
        }
    });
}
