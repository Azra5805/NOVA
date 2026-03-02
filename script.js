// ==========================================
// 1. MOCK DATA (SAHTE VERİLER)
// ==========================================

// --- 1. KULLANICILAR (Linkler Eklendi) ---
const users = {
    me: { 
        userId: "u1", 
        username: "Lucky Çelik", 
        profilePic: "asset/image/profil.jpg",
        profileLink: "profil.html" // Kendi profilin
    },
    ali: { 
        userId: "u2", 
        username: "James Hill", 
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        profileLink: "james.html" 
    },
    ayse: { 
        userId: "u3", 
        username: "Scarlett Anderson", 
        profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        profileLink: "scarlett.html"
    },
    mert: { 
        userId: "u4", 
        username: "Donghyun Shin", 
        profilePic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
        profileLink: "dong.html"
    },
    zeynep: { 
        userId: "u5", 
        username: " Swift", 
        profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
        profileLink: "gloria.html"
    }
};
// --- 2. POST VERİLERİ ---
const postsData = [
    {
        postId: "p1",
        content: "Java backend entegrasyonu tamamlandı! ☕ Kodlar GitHub'da.",
        time: "10 dk önce",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000",
        author: users.me,
        likeCount: 120
    },
    {
        postId: "p2",
        content: "Bugün İtalyan mutfağından makarna denemeleri... 🍝😋 Tarif yakında!",
        time: "2 saat önce",
        imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000",
        author: users.ayse,
        likeCount: 845
    },
    {
        postId: "p3",
        content: "Kapadokya'da balon turu... 🎈 Manzara inanılmaz.",
        time: "5 saat önce",
        imageUrl: "https://images.unsplash.com/photo-1533052448366-26759d997232?w=1000",
        author: users.ali,
        likeCount: 2300
    },
    {
        postId: "p4",
        content: "Yeni ekipmanlar geldi, yayına hazırız! 🔴 Link biyografide.",
        time: "1 gün önce",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000",
        author: users.mert,
        likeCount: 45
    },
    {
        postId: "p5",
        content: "Yeni sergi hazırlıkları başladı. 🎨 Renklerin uyumu...",
        time: "2 gün önce",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000",
        author: users.zeynep,
        likeCount: 150
    }
];

// --- 3. EKRANA BASMA FONKSİYONU (RENDER) ---
// İşte eksik olan motor burası!
document.addEventListener("DOMContentLoaded", function() {
    
    // HTML'deki kutuyu bulmaya çalışıyoruz
    const feedContainer = document.getElementById("feed-container");
    
    // Eğer kutuyu bulamazsa hata vermesin diye kontrol
    if (!feedContainer) {
        console.error("HATA: HTML içinde id='feed-container' olan bir div bulunamadı!");
        return;
    }

    // Verileri döngüye sokup HTML oluşturuyoruz
    postsData.forEach(post => {
        const postHTML = `
            <div class="post-card" style="background:white; border:1px solid #dbdbdb; margin-bottom:20px; border-radius:3px;">
                <div class="post-header" style="display:flex; align-items:center; padding:10px;">
                    <img src="${post.author.profilePic}" style="width:32px; height:32px; border-radius:50%; margin-right:10px; object-fit:cover;">
                    <span style="font-weight:600; font-size:14px;">${post.author.username}</span>
                    <i class="fa-solid fa-ellipsis" style="margin-left:auto; cursor:pointer;"></i>
                </div>

                <img src="${post.imageUrl}" style="width:100%; display:block;">

                <div class="post-actions" style="padding:10px; font-size:24px;">
                    <i class="fa-regular fa-heart" style="margin-right:15px; cursor:pointer;"></i>
                    <i class="fa-regular fa-comment" style="margin-right:15px; cursor:pointer;"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                    <i class="fa-regular fa-bookmark" style="float:right;"></i>
                </div>

                <div style="padding:0 10px; font-weight:600; font-size:14px; margin-bottom:5px;">
                    ${post.likeCount} beğenme
                </div>

                <div style="padding:0 10px 10px 10px; font-size:14px;">
                    <span style="font-weight:600; margin-right:5px;">${post.author.username}</span>
                    ${post.content}
                </div>
                
                <div style="padding:0 10px 10px 10px; font-size:10px; color:gray;">
                    ${post.time}
                </div>
            </div>
        `;
        
        // Oluşan HTML'i kutunun içine ekle
        feedContainer.innerHTML += postHTML;
    });
});

// ==========================================
// 2. SINIF YAPILARI (OOP)
// ==========================================

// Yardımcı Fonksiyon: Zaman Hesaplama
function getTimeString(timestamp) {
    const diff = new Date().getTime() - timestamp;
    const min = Math.floor(diff / 60000);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (min < 1) return "ŞİMDİ";
    if (min < 60) return `${min}dk`;
    if (hour < 24) return `${hour}s`;
    return `${day}g`;
}

class Notification {
    constructor(data) {
        this.type = data.type;
        this.sender = data.sender;
        this.timestamp = data.timestamp;
    }

    // Java'daki getMessage() metodunun Frontend karşılığı
    getMessage() {
        switch (this.type) {
            case 'LIKE': return `gönderini beğendi.`;
            case 'COMMENT': return `gönderine yorum yaptı.`;
            case 'NEW_FOLLOWER': return `seni takip etmeye başladı.`;
            default: return `bir işlem yaptı.`;
        }
    }

    getHTML() {
        const iconType = this.type === 'LIKE' || this.type === 'COMMENT' 
            ? '<img src="https://via.placeholder.com/40" style="width:30px; height:30px;">' // Post resmi olabilir (basitlik için placeholder)
            : '<button style="border:none; background:#0095f6; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">Takip Et</button>';

        return `
        <div class="notif-item">
            <img src="${this.sender.profilePic}" class="notif-user-img">
            <div class="notif-text">
                <span>${this.sender.username}</span> ${this.getMessage()}
                <div style="color:#8e8e8e; font-size:12px;">${getTimeString(this.timestamp)}</div>
            </div>
             <div style="margin-left:auto;">${this.type === 'NEW_FOLLOWER' ? iconType : ''}</div>
        </div>
        `;
    }
}

class Post {
    constructor(data) {
        this.data = data;
    }

    getHTML() {
        // Yorumları HTML'e çevirme (İlk yorumu gösterelim)
        let commentsHTML = "";
        if (this.data.comments.length > 0) {
            const firstComment = this.data.comments[0];
            commentsHTML = `
                <div style="margin-top:5px;">
                    <span style="font-weight:bold; margin-right:5px;">${firstComment.author.username}</span>
                    <span>${firstComment.content}</span>
                </div>
                ${this.data.comments.length > 1 ? `<div style="color:#8e8e8e; margin-top:5px; cursor:pointer;">${this.data.comments.length} yorumun tümünü gör</div>` : ''}
            `;
        }

        return `
        <div class="post" id="post-${this.data.postId}">
            <div class="info">
                <div class="user">
                    <img src="${this.data.author.profilePic}" class="profile-pic">
                    <p class="username">${this.data.author.username}</p>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            
            <img src="${this.data.imageUrl}" class="post-image">
            
            <div class="post-content">
                <div class="reaction-wrapper">
                    <i class="${this.data.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart" 
                       style="color: ${this.data.isLiked ? 'red' : 'black'}"
                       onclick="app.toggleLike('${this.data.postId}')"></i>
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                    <i class="fa-regular fa-bookmark" style="margin-left: auto;"></i>
                </div>
                <p class="likes" id="likes-text-${this.data.postId}">${this.data.likeCount} beğenme</p>
                
                <p class="description">
                    <span>${this.data.author.username}</span> ${this.data.content}
                </p>

                <div class="comments-section" style="font-size:14px;">
                    ${commentsHTML}
                </div>

                <p class="post-time">${getTimeString(this.data.timestamp).toUpperCase()} ÖNCE</p>
            </div>
        </div>
        `;
    }
}

// ==========================================
// 3. UYGULAMA YÖNETİCİSİ (APP MANAGER)
// ==========================================


class AppManager {
    constructor() {
        this.postContainer = document.getElementById('posts-container');
        this.notifContainer = document.getElementById('notification-list');
        this.notifDropdown = document.getElementById('notification-dropdown');
        
        // Mock verileri class'lara çevir
        this.posts = postsData.map(p => new Post(p));
        this.notifications = notificationsData.map(n => new Notification(n));
    }

    init() {
        this.renderPosts();
        this.renderNotifications();
        this.setupEventListeners();
    }

    renderPosts() {
        if(this.postContainer) {
            this.postContainer.innerHTML = "";
            this.posts.forEach(post => {
                this.postContainer.innerHTML += post.getHTML();
            });
        }
    }

    renderNotifications() {
        if(this.notifContainer) {
            this.notifContainer.innerHTML = "";
            this.notifications.forEach(notif => {
                this.notifContainer.innerHTML += notif.getHTML();
            });
        }
    }

    // Bildirim Kutusunu Aç/Kapa
    toggleNotifications() {
        this.notifDropdown.classList.toggle('active');
    }

    toggleLike(postId) {
        // Basit bir DOM manipülasyonu (Veri güncelleme simülasyonu)
        const postObj = this.posts.find(p => p.data.postId === postId);
        const postEl = document.getElementById(`post-${postId}`);
        const icon = postEl.querySelector('.fa-heart');
        const countText = postEl.querySelector('.likes');

        if(postObj) {
            if(postObj.data.isLiked) {
                postObj.data.likeCount--;
                postObj.data.isLiked = false;
                icon.classList.replace('fa-solid', 'fa-regular');
                icon.style.color = 'black';
            } else {
                postObj.data.likeCount++;
                postObj.data.isLiked = true;
                icon.classList.replace('fa-regular', 'fa-solid');
                icon.style.color = 'red';
            }
            countText.innerText = `${postObj.data.likeCount} beğenme`;
        }
    }

    setupEventListeners() {
        // Ekranda boş bir yere basınca bildirim kutusunu kapat
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.notification-container');
            if (container && !container.contains(e.target)) {
                this.notifDropdown.classList.remove('active');
            }
        });
    }
}

// Uygulamayı Başlat
const app = new AppManager();
document.addEventListener('DOMContentLoaded', () => app.init());

/* 3. POST YÖNETİCİSİ (Aynı kalıyor) */
/* =========================================
   2. BÖLÜM: POST YÖNETİCİSİ (GÜNCELLENDİ)
   ========================================= */

class PostManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    createPostHTML(post, index) {
        // Her postun elementlerine ulaşmak için data-index veriyoruz
        return `
        <div class="post" id="post-${index}">
            <div class="info">
                <div class="user">
                    <div class="profile-pic"><img src="${post.userImage}" alt=""></div>
                    <p class="username">${post.username}</p>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            
            <img src="${post.postImage}" class="post-image" alt="">
            
            <div class="post-content">
                <div class="reaction-wrapper">
                    <i class="fa-regular fa-heart icon action-like"></i>
                    <i class="fa-regular fa-comment icon action-comment"></i>
                    <i class="fa-regular fa-paper-plane icon action-share"></i>
                    <i class="fa-regular fa-bookmark save icon action-save"></i>
                </div>
                
                <p class="likes-text">${post.likes} beğenme</p>
                
                <p class="description"><span>${post.username}</span> ${post.description}</p>
                
                <div class="comments-container"></div>
                
                <p class="post-time">${post.time}</p>
            </div>
            
            <div class="comment-wrapper">
                <i class="fa-regular fa-face-smile icon"></i>
                <input type="text" class="comment-box" placeholder="Yorum ekle...">
                <button class="comment-btn">Paylaş</button>
            </div>
        </div>
        `;
    }

    render() {
        if (!this.container) return;
        
        const posts = [
            { username: "kodinnggg", userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", postImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=80", likes: 120, description: "Java backend entegrasyonu tamamlandı! ☕", time: "10 DK ÖNCE" },
            { username: "muhendis_bey", userImage: "https://randomuser.me/api/portraits/men/32.jpg", postImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=80", likes: 450, description: "Ofiste çalışma ortamı 🔥 #coding", time: "2 SAAT ÖNCE" }
        ];

        // HTML'i oluştur
        this.container.innerHTML = posts.map((p, index) => this.createPostHTML(p, index)).join('');

        // Olayları (Tıklamaları) Bağla
        this.attachPostEvents();
    }

    // Tüm postların butonlarına can veren fonksiyon
    attachPostEvents() {
        const allPosts = document.querySelectorAll('.post');

        allPosts.forEach(post => {
            // Elementleri Seç
            const likeBtn = post.querySelector('.action-like');
            const commentBtn = post.querySelector('.action-comment');
            const saveBtn = post.querySelector('.action-save');
            const shareBtn = post.querySelector('.action-share');
            
            const likeText = post.querySelector('.likes-text');
            const commentInput = post.querySelector('.comment-box');
            const shareCommentBtn = post.querySelector('.comment-btn');
            const commentsContainer = post.querySelector('.comments-container');

            // 1. BEĞENME (KALP)
            likeBtn.addEventListener('click', () => {
                likeBtn.classList.toggle('liked'); // Rengi değiştir
                likeBtn.classList.toggle('fa-solid'); // İçi dolu/boş
                likeBtn.classList.toggle('fa-regular');

                // Sayıyı Artır/Azalt
                let currentLikes = parseInt(likeText.innerText);
                if (likeBtn.classList.contains('liked')) {
                    likeText.innerText = `${currentLikes + 1} beğenme`;
                } else {
                    likeText.innerText = `${currentLikes - 1} beğenme`;
                }
            });

            // 2. YORUM YAP (Baloncuk)
            commentBtn.addEventListener('click', () => {
                commentInput.focus(); // Kutuya odaklan
            });

            // 3. KAYDET (Bookmark)
            saveBtn.addEventListener('click', () => {
                saveBtn.classList.toggle('saved');
                saveBtn.classList.toggle('fa-solid');
                saveBtn.classList.toggle('fa-regular');
            });

            // 4. PAYLAŞ (DM - Şimdilik alert verelim)
            shareBtn.addEventListener('click', () => {
                alert("Mesaj Gönedrildi");
            });

            // 5. YORUM GÖNDERME (Enter veya Buton)
            const postComment = () => {
                if (commentInput.value.trim() !== "") {
                    // Yeni yorum HTML'i
                    const newComment = document.createElement('p');
                    newComment.className = 'user-comment';
                    newComment.innerHTML = `<span>Ahmet Taha Erçin</span> ${commentInput.value}`;
                    
                    // Yorumu ekle
                    commentsContainer.appendChild(newComment);
                    
                    // Kutuyu temizle
                    commentInput.value = "";
                }
            };

            shareCommentBtn.addEventListener('click', postComment);
            
            // Enter tuşuna basınca da göndersin
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') postComment();
            });
        });
    }
}

/* =========================================
   3. BÖLÜM: YAN MENÜ (SIDEBAR) YÖNETİCİSİ
   ========================================= */

/* =========================================
   3. BÖLÜM: YAN MENÜ (SIDEBAR) YÖNETİCİSİ
   (Takip Etme ve Hesap Değiştirme)
   ========================================= */

class SidebarManager {
    constructor() {
        // "Senin için önerilenler" altındaki Takip Et butonları
        this.followButtons = document.querySelectorAll('.suggestion-card .action-btn');
        
        // En üstteki "Geçiş Yap" butonu
        this.switchBtn = document.querySelector('.profile-card .action-btn');
        
        // Login Modal Elementleri
        this.loginModal = document.getElementById('login-modal');
        this.closeLoginBtn = document.getElementById('close-login');
    }

    init() {
        // 1. TAKİP ETME İŞLEMLERİ
        this.followButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleFollow(e.target);
            });
        });

        // 2. GEÇİŞ YAP (HESAP DEĞİŞTİR) İŞLEMİ
        if (this.switchBtn) {
            this.switchBtn.addEventListener('click', () => {
                this.openLoginModal();
            });
        }

        // Modalı Kapatma
        if (this.closeLoginBtn) {
            this.closeLoginBtn.addEventListener('click', () => {
                this.loginModal.style.display = 'none';
            });
        }
    }

    toggleFollow(btn) {
        // Yazının içindeki boşlukları temizle ve kontrol et
        const currentText = btn.innerText.trim();

        if (currentText === "Takip Et") {
            btn.innerText = "Takip Ediliyor";
            btn.classList.add("following"); // CSS'ten siyah renk alır
            btn.style.color = "black"; // Garanti olsun diye elle de siyah yapalım
        } else {
            btn.innerText = "Takip Et";
            btn.classList.remove("following");
            btn.style.color = "#0095f6"; // Maviye geri dön
        }
    }

    openLoginModal() {
        if (this.loginModal) {
            this.loginModal.style.display = 'flex';
        }
    }
}

/* BAŞLAT */
document.addEventListener("DOMContentLoaded", () => {
    const storyManager = new StoryManager('.status-wrapper');
    storyManager.initMockData();
    const postManager = new PostManager('#posts-container');
    postManager.render();
});

/* =========================================
   HESAP YÖNETİCİSİ (Giriş Ekranı İşlemleri)
   ========================================= */
class AccountManager {
    constructor() {
        // Geçiş Yap butonunu bul (Profil kartındaki)
        this.switchBtn = document.querySelector('.profile-card .action-btn');
        
        // Giriş Modalı Elementleri
        this.modal = document.getElementById('login-modal');
        this.closeBtn = document.querySelector('.close-login');
        this.form = document.getElementById('login-form');
        
        // Profil İsimlerini Seç (Değiştirmek için)
        this.usernameText = document.querySelector('.profile-card .username');
        this.navbarProfile = document.querySelector('.nav-items .user-profile img');
        this.bigProfilePic = document.querySelector('.profile-card .profile-pic img');

        this.init();
    }

    init() {
        // Eğer buton veya modal yoksa dur (Hata verme)
        if (!this.switchBtn || !this.modal) return;

        // 1. "Geçiş Yap"a basınca Modalı Aç
        this.switchBtn.addEventListener('click', () => {
            this.modal.style.display = 'flex';
        });

        // 2. Çarpıya basınca Modalı Kapat
        this.closeBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        // 3. Siyah boşluğa basınca kapat
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });

        // 4. "Giriş Yap" butonuna basınca olacaklar
        this.form.addEventListener('submit', (e) => {
            e.preventDefault(); // Sayfanın yenilenmesini engelle
            
            // Kullanıcının yazdığı ismi al (Basit simülasyon)
            const inputName = this.form.querySelector('input[type="text"]').value;
            
            if(inputName.trim() !== "") {
                this.switchAccount(inputName);
            }
        });
    }

    // HESAP DEĞİŞTİRME SİMÜLASYONU
    // HESAP DEĞİŞTİRME VE YÖNLENDİRME
    switchAccount(inputName) {
        // İsmi temizle (boşlukları sil) ve küçük harfe çevir
        const cleanName = inputName.trim().toLowerCase();

        // Eğer kullanıcı "kodinnggg" yazdıysa YÖNLENDİR
        if (cleanName === "ibrahimkrc") {
            alert("İbrahim Karaca hesabına geçiş yapılıyor... 🚀");
            // Sayfayı profile.html'e yönlendir
            window.location.href = "profile2.html";
        } 
        else {
            // Başka bir isimse sadece uyarı ver (Şimdilik)
            alert("Böyle bir kullanıcı bulunamadı! Lütfen 'kodinnggg' yazın.");
        }
        
        // Formu temizle
        this.form.reset();
    }
}

/* --- UYGULAMAYI BAŞLAT --- */
document.addEventListener("DOMContentLoaded", () => {
    // Mevcut kodların (Story ve Post) çalışmaya devam etsin
    if(typeof StoryManager !== 'undefined') new StoryManager('.status-wrapper');
    if(typeof PostManager !== 'undefined') new PostManager('#posts-container');
    
    // YENİ EKLEDİĞİMİZ HESAP YÖNETİCİSİNİ BAŞLAT
    new AccountManager();
});

/* STORY KISMI */
/* 1. STORY MODELİ */
class StoryModel {
    constructor(id, username, imageUrl) {
        this.id = id;
        this.username = username;
        this.imageUrl = imageUrl;
        this.isLiked = false;
    }
}

/* 2. STORY YÖNETİCİSİ */
class StoryManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.stories = [];
        
        // Elementleri Seç
        this.modal = document.getElementById('story-modal');
        this.modalImg = document.getElementById('full-story-img');
        this.closeBtn = document.querySelector('.close-modal');
        
        // Kalp Elementleri
        this.likeBtn = document.getElementById('story-like-btn');
        this.popupHeart = document.querySelector('.pop-up-heart');
        
        this.currentStoryId = null; 

        if (this.modal) this.initModalEvents();
    }

    addStory(story) {
        this.stories.push(story);
    }

    createStoryHTML(story) {
        return `
            <div class="status-card" data-id="${story.id}">
                <div class="profile-pic-story">
                    <img src="${story.imageUrl}" alt="${story.username}">
                </div>
                <p class="username-story">${story.username}</p>
            </div>`;
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = this.stories.map(s => this.createStoryHTML(s)).join('');
        this.attachClickEvents();
    }

    attachClickEvents() {
        const cards = document.querySelectorAll('.status-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id'));
                this.openStory(id);
            });
        });
    }

    openStory(id) {
        const story = this.stories.find(s => s.id === id);
        if (!story || !this.modal) return;

        this.currentStoryId = story.id;
        this.modalImg.src = story.imageUrl;
        this.modal.style.display = 'flex';
        
        // Modal açıldığında SADECE butonun rengini ayarla
        // ASLA burada animasyon tetikleme!
        this.renderHeartState(story.isLiked);
    }

    initModalEvents() {
        // Kapatma Tuşları
        this.closeBtn.onclick = () => this.modal.style.display = 'none';
        
        this.modal.onclick = (e) => {
            if (e.target === this.modal) this.modal.style.display = 'none';
        };

        // BEĞENME İŞLEMİ (Tıklayınca Patlasın)
        this.likeBtn.onclick = () => {
            if (this.currentStoryId === null) return;

            const story = this.stories.find(s => s.id === this.currentStoryId);
            if (story) {
                // Durumu tersine çevir
                story.isLiked = !story.isLiked;
                
                // Görünümü güncelle (Buton Rengi)
                this.renderHeartState(story.isLiked);

                // SADECE beğenme tuşuna basıldığında ve beğeni TRUE olduğunda patlat
                if (story.isLiked) {
                    this.triggerExplosion();
                }
            }
        };
    }

    // Butonun Rengini Ayarlayan Fonksiyon
    // JS KODUNDAKİ BU FONKSİYONU ŞÖYLE DEĞİŞTİR:
    renderHeartState(isLiked) {
        // className = '' YAPMA! Diğer stil classlarını öldürürsün.
        
        // Önce kalp ile ilgili olabilecek ikon classlarını temizle
        this.likeBtn.classList.remove('fa-regular', 'fa-solid', 'fa-heart', 'liked-heart');
        
        if (isLiked) {
            // Dolu ve Kırmızı Kalp
            this.likeBtn.classList.add('fa-solid', 'fa-heart', 'liked-heart');
            this.likeBtn.style.color = ''; // CSS'teki #ff0000 !important çalışsın diye inline stili temizle
        } else {
            // Boş ve Beyaz Kalp
            this.likeBtn.classList.add('fa-regular', 'fa-heart');
            this.likeBtn.style.color = 'white';
        }
    }
    // 🔥 PATLAMA EFEKTİ (Düzeltilen Kısım) 🔥
    triggerExplosion() {
        if (!this.popupHeart) return;

        // 1. Animasyonu başlat
        this.popupHeart.classList.remove('animate-bloom'); // Garanti olsun diye önce sil
        void this.popupHeart.offsetWidth; // Tarayıcıyı resetlemeye zorla (Sihirli kod)
        this.popupHeart.classList.add('animate-bloom'); // Şimdi ekle

        // 2. Animasyon bitince (800ms sonra) temizle!
        // BU KISIM EKSİKTİ, O YÜZDEN TEKRAR PATLIYORDU
        setTimeout(() => {
            this.popupHeart.classList.remove('animate-bloom');
        }, 800);
    }

    initMockData() {
        const data = [
            new StoryModel(1, "kodinnggg", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80"),
            new StoryModel(2, "elon_musk", "https://randomuser.me/api/portraits/men/1.jpg"),
            new StoryModel(3, "steve_jobs", "https://randomuser.me/api/portraits/men/2.jpg"),
            new StoryModel(4, "bill_gates", "https://randomuser.me/api/portraits/men/3.jpg"),
            new StoryModel(5, "mark_zuck", "https://randomuser.me/api/portraits/men/4.jpg"),
        ];
        data.forEach(s => this.addStory(s));
        this.render();
    }
}


/* --- HESAP DEĞİŞTİRME VE LOGIN İŞLEMLERİ --- */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Elementleri Seçelim
    const switchBtn = document.getElementById('switch-btn'); // Geçiş yap butonu
    const loginModal = document.getElementById('login-modal'); // Açılacak pencere
    const closeLoginBtn = document.getElementById('close-login-btn'); // Kapatma çarpısı
    const loginForm = document.getElementById('login-form'); // Giriş formu

    // 2. Modalı Açma Fonksiyonu
    if (switchBtn) {
        switchBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex'; // Modalı görünür yap
        });
    }

    // 3. Modalı Kapatma Fonksiyonu (Çarpıya basınca)
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', function() {
            loginModal.style.display = 'none'; // Modalı gizle
        });
    }

    // 4. Modalı Kapatma (Siyah boşluğa basınca)
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // 5. GİRİŞ YAPMA VE YÖNLENDİRME İŞLEMİ
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfanın yenilenmesini engelle

            // Burada normalde şifre kontrolü yapılır ama biz direkt yönlendiriyoruz
            console.log("Giriş yapılıyor...");

            // YÖNLENDİRME KODU BURASI:
            window.location.href = "profile2.html"; 
        });
    }
});