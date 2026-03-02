/* mainpost.js - FULL VERSİYON (6 Post + Silme + Beğeni + Kaydetme + Yorum) */

console.log("mainpost.js yüklendi! ✅");

// --- 1. KULLANICILAR ---
const feedUsers = {
    me: { name: "kodinnggg", pic: "asset/image/profil.jpg", link: "profile2.html" },
    ali: { name: "alikaptan", pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", link: "james.html" },
    ayse: { name: "ayse_mutfakta", pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", link: "scarlett.html" },
    mert: { name: "pro_mert_tr", pic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200", link: "mert.html" },
    zeynep: { name: "art.zeynep", pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", link: "zeynep.html" }
};

// --- 2. VARSAYILAN POSTLAR (Burayı 6'ya Çıkardık) ---
const defaultPosts = [
    {
        id: "p1",
        user: feedUsers.me,
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000",
        desc: "Java backend entegrasyonu tamamlandı! ☕ Kodlar GitHub'da.",
        time: "10 dk önce",
        likes: 120,
        isLiked: false
    },
    {
        id: "p2",
        user: feedUsers.ayse,
        img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000",
        desc: "Bugün İtalyan mutfağından makarna denemeleri... 🍝😋 Tarif yakında!",
        time: "2 saat önce",
        likes: 845,
        isLiked: true
    },
    {
        id: "p3",
        user: feedUsers.ali,
        img: "https://images.unsplash.com/photo-1533052448366-26759d997232?w=1000",
        desc: "Kapadokya'da balon turu... 🎈 Manzara inanılmaz.",
        time: "5 saat önce",
        likes: 2300,
        isLiked: false
    },
    {
        id: "p4",
        user: feedUsers.mert,
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000",
        desc: "Yeni ekipmanlar geldi, yayına hazırız! 🔴 Link biyografide.",
        time: "1 gün önce",
        likes: 45,
        isLiked: false
    },
    {
        id: "p5",
        user: feedUsers.zeynep,
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000",
        desc: "Sergi hazırlıkları tüm hızıyla devam ediyor. Renklerin uyumu büyüleyici! 🎨🖌️",
        time: "2 gün önce",
        likes: 312,
        isLiked: false
    },
    {
        id: "p6",
        user: feedUsers.ali,
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000",
        desc: "Sabah sporu gibisi yok! 💪 Herkese günaydın.",
        time: "3 gün önce",
        likes: 89,
        isLiked: true
    }
];

// --- 3. EKRANA BASMA (RENDER) ---
document.addEventListener("DOMContentLoaded", function() {
    renderFeed();
});

function renderFeed() {
    const container = document.getElementById("feed-container");
    if (!container) return;

    container.innerHTML = ""; // Temizle

    // LocalStorage (Senin eklediklerin) ve Sabit Postları Birleştir
    let yeniPaylasilanlar = JSON.parse(localStorage.getItem('yeniPostlar')) || [];
    const tumPostlar = [...yeniPaylasilanlar, ...defaultPosts];

    tumPostlar.forEach(post => {
        const kalpClass = post.isLiked ? "fa-solid" : "fa-regular";
        const kalpRenk = post.isLiked ? "color: #ed4956;" : "";

        const html = `
        <div class="post-card" id="post-${post.id}" style="background:white; border:1px solid #dbdbdb; margin-bottom:20px; border-radius:3px; position:relative;">
            
            <div style="padding:10px; display:flex; align-items:center;">
                <a href="${post.user.link}" style="display:flex; align-items:center; text-decoration:none; color:inherit;">
                    <img src="${post.user.pic}" style="width:32px; height:32px; border-radius:50%; margin-right:10px; object-fit:cover;">
                    <span style="font-weight:600; font-size:14px;">${post.user.name}</span>
                </a>
                
                <div style="margin-left:auto; position:relative;">
                    <i class="fa-solid fa-ellipsis" onclick="menuAc('${post.id}')" style="cursor:pointer; padding: 5px;"></i>
                    
                    <div id="menu-${post.id}" class="delete-menu" style="display:none;">
                        <button onclick="postSil('${post.id}')" style="color:red; font-weight:bold;">Sil</button>
                        <button onclick="menuAc('${post.id}')">İptal</button>
                    </div>
                </div>
            </div>

            <img src="${post.img}" style="width:100%; display:block;">

            <div style="padding:10px; font-size:24px; display:flex; gap:15px;">
                <i class="${kalpClass} fa-heart" id="kalp-${post.id}" onclick="postBegen('${post.id}')" style="cursor:pointer; ${kalpRenk}"></i>
                <i class="fa-regular fa-comment" onclick="yorumOdakla('${post.id}')" style="cursor:pointer;"></i>
                <i class="fa-regular fa-paper-plane" style="cursor:pointer;"></i>
                <i class="fa-regular fa-bookmark" onclick="postKaydet(this)" style="margin-left:auto; cursor:pointer;"></i>
            </div>

            <div style="padding:0 10px; font-weight:600; font-size:14px;">
                <span id="sayi-${post.id}">${post.likes}</span> beğenme
            </div>

            <div style="padding:10px; font-size:14px;">
                <div style="margin-bottom:5px;">
                    <span style="font-weight:600;">${post.user.name}</span> ${post.desc}
                </div>
                <div id="yorumlar-${post.id}"></div>
                <div style="color:gray; font-size:10px; margin-top:5px;">${post.time}</div>
            </div>

            <div style="border-top:1px solid #efefef; padding:10px; display:flex; align-items:center;">
                <i class="fa-regular fa-face-smile" style="font-size:24px; margin-right:10px;"></i>
                <input type="text" id="input-${post.id}" placeholder="Yorum ekle..." style="border:none; outline:none; flex:1;">
                <button onclick="yorumYap('${post.id}')" style="border:none; background:none; color:#0095f6; font-weight:bold; cursor:pointer;">Paylaş</button>
            </div>
        </div>
        `;
        
        container.innerHTML += html;
    });
}

// --- 4. FONKSİYONLAR ---

// Menü Aç/Kapa
window.menuAc = function(id) {
    const menu = document.getElementById(`menu-${id}`);
    document.querySelectorAll('.delete-menu').forEach(m => {
        if(m.id !== `menu-${id}`) m.style.display = 'none';
    });
    menu.style.display = (menu.style.display === "none") ? "block" : "none";
};

// Post Silme
window.postSil = function(id) {
    if(confirm("Are you sure to delete this?")) {
        const postDiv = document.getElementById(`post-${id}`);
        if(postDiv) postDiv.remove();

        let kayitliPostlar = JSON.parse(localStorage.getItem('yeniPostlar')) || [];
        let guncelListe = kayitliPostlar.filter(post => post.id !== id);
        localStorage.setItem('yeniPostlar', JSON.stringify(guncelListe));
    }
};

// Beğenme
window.postBegen = function(id) {
    const kalp = document.getElementById(`kalp-${id}`);
    const sayiSpan = document.getElementById(`sayi-${id}`);
    let sayi = parseInt(sayiSpan.innerText);
    if (kalp.classList.contains('fa-regular')) {
        kalp.classList.remove('fa-regular'); kalp.classList.add('fa-solid'); kalp.style.color = "#ed4956"; sayi++;
    } else {
        kalp.classList.remove('fa-solid'); kalp.classList.add('fa-regular'); kalp.style.color = ""; sayi--;
    }
    sayiSpan.innerText = sayi;
};

// Yorum Yapma
window.yorumYap = function(id) {
    const input = document.getElementById(`input-${id}`);
    const liste = document.getElementById(`yorumlar-${id}`);
    const yazi = input.value.trim();
    if (yazi !== "") {
        liste.innerHTML += `<div style="margin-top:3px;"><span style="font-weight:600;">kodinnggg</span> ${yazi}</div>`;
        input.value = "";
    }
};

// Diğer Yardımcılar
window.postKaydet = function(ikon) {
    if (ikon.classList.contains('fa-regular')) { ikon.classList.remove('fa-regular'); ikon.classList.add('fa-solid'); } 
    else { ikon.classList.remove('fa-solid'); ikon.classList.add('fa-regular'); }
};

window.yorumOdakla = function(id) {
    const input = document.getElementById(`input-${id}`);
    if (input) input.focus();
};

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.id.startsWith('input-')) {
        const id = e.target.id.split('-')[1];
        window.yorumYap(id);
    }
});

// Boşluğa tıklayınca menüleri kapat
window.onclick = function(event) {
    if (!event.target.matches('.fa-ellipsis')) {
        var dropdowns = document.getElementsByClassName("delete-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].style.display === "block") dropdowns[i].style.display = "none";
        }
    }
}