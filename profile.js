/* profile.js - Profil Sayfası Yönetimi (Final ve Temiz Versiyon) */

document.addEventListener("DOMContentLoaded", function() {
    
    // ======================================================
    // 1. BÖLÜM: YENİ PAYLAŞILANLARI GETİR VE EKRANA BAS
    // ======================================================
    
    const galleryPosts = document.getElementById('gallery-posts');
    const totalPostsSpan = document.getElementById('total-posts'); // Sayı yazan yer

    // Tarayıcı hafızasındaki (LocalStorage) veriyi çek
    const yeniPostlar = JSON.parse(localStorage.getItem('yeniPostlar')) || [];

    // Her bir yeni postu döngüye alıp HTML'e ekle
    yeniPostlar.forEach(post => {
        // Yeni kutu oluştur
        const div = document.createElement('div');
        div.className = 'grid-item'; 
        
        // Yeni resim oluştur
        const img = document.createElement('img');
        img.src = post.img; // Base64 resim verisi
        
        // Tıklayınca Modal açılsın
        img.onclick = function() {
            openModal(this.src);
        };

        // Resmi kutuya koy
        div.appendChild(img);

        // Kutuyu galerinin EN BAŞINA ekle
        if (galleryPosts) {
            galleryPosts.prepend(div);
        }
    });

    // ======================================================
    // 2. BÖLÜM: TOPLAM GÖNDERİ SAYISINI GÜNCELLE
    // ======================================================
    
    if (galleryPosts && totalPostsSpan) {
        // Galerideki toplam 'div' sayısını bul (Sabitler + Yeniler)
        const toplamSayi = galleryPosts.querySelectorAll('.grid-item').length;
        // Sayıyı HTML'e yaz
        totalPostsSpan.innerText = toplamSayi;
    }

    // ======================================================
    // 3. BÖLÜM: MODAL (RESİM BÜYÜTME) İŞLEMLERİ
    // ======================================================
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close");
    const likeCountElement = document.getElementById("like-count");

    // HTML'de önceden var olan (sabit) resimlere de tıklama özelliği ver
    const staticImages = document.querySelectorAll(".grid-item img");
    staticImages.forEach(img => {
        img.addEventListener("click", function() {
            openModal(this.src);
        });
    });

    // Modalı Açan Fonksiyon
    function openModal(src) {
        if (modal) {
            modal.style.display = "flex"; // CSS'te flex ise flex, block ise block
            modalImg.src = src;

            // Süs olsun diye rastgele beğeni sayısı üret
            if (likeCountElement) {
                const randomLike = Math.floor(Math.random() * 5000) + 100;
                likeCountElement.innerText = randomLike + " beğenme";
            }
        }
    }

    // Çarpı (X) butonuna basınca kapat
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };
    }

    // Siyah boşluğa basınca kapat
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // ESC tuşuna basınca kapat
    document.onkeydown = function(e) { 
        if(e.key === "Escape" && modal) {
            modal.style.display = "none"; 
        }
    };

    // ======================================================
    // 4. BÖLÜM: SEKME (TAB) GEÇİŞLERİ (Posts - Saved - Tags)
    // ======================================================
    
    const tabs = document.querySelectorAll('.tab');
    const grids = document.querySelectorAll('.photo-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Önce tüm sekmelerden 'active' sınıfını sil
            tabs.forEach(t => t.classList.remove('active'));
            
            // 2. Tüm galeri kutularını gizle (CSS'teki .hidden sınıfı ile)
            grids.forEach(g => g.classList.add('hidden'));

            // 3. Tıklanan sekmeye 'active' ver (Altı siyah olsun)
            tab.classList.add('active');

            // 4. İlgili galeriyi göster
            if (tab.id === 'tab-posts') {
                const pGrid = document.getElementById('gallery-posts');
                if(pGrid) pGrid.classList.remove('hidden');
            } 
            else if (tab.id === 'tab-saved') {
                const sGrid = document.getElementById('gallery-saved');
                if(sGrid) sGrid.classList.remove('hidden');
            } 
            else if (tab.id === 'tab-tagged') {
                const tGrid = document.getElementById('gallery-tagged');
                if(tGrid) tGrid.classList.remove('hidden');
            }
        });
    });

});