/* home.js - GÜNCELLENMİŞ VE SORUNSUZ VERSİYON */

console.log("Home.js yüklendi! ✅");

// --- 1. VERİLER ---
const users = {
    me: { username: "James Hill", profilePic: "asset/image/1.jpg", profileLink: "james.html" },
    ali: { username: "alikaptan", profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", profileLink: "#" },
    ayse: { username: "ayse_mutfakta", profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", profileLink: "#" },
    mert: { username: "pro_mert_tr", profilePic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200", profileLink: "#" },
    zeynep: { username: "art.zeynep", profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", profileLink: "#" }
};

const postsData = [
    {
        postId: "p1",
        content: "This Christmas will be amazing, man!.",
        time: "4 hours",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000",
        author: users.me,
        likeCount: 1205,
        isLiked: false
    },
    {
        postId: "p2",
        content: "Bugün İtalyan mutfağından makarna denemeleri... 🍝😋 Tarif yakında!",
        time: "2 saat önce",
        imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000",
        author: users.ayse,
        likeCount: 845,
        isLiked: true
    },
    {
        postId: "p3",
        content: "Kapadokya'da balon turu... 🎈 Manzara inanılmaz.",
        time: "5 saat önce",
        imageUrl: "https://images.unsplash.com/photo-1533052448366-26759d997232?w=1000",
        author: users.ali,
        likeCount: 2300,
        isLiked: false
    },
    {
        postId: "p4",
        content: "Yeni ekipmanlar geldi, yayına hazırız! 🔴 Link biyografide.",
        time: "1 gün önce",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000",
        author: users.mert,
        likeCount: 45,
        isLiked: false
    },
    // --- YENİ EKLENEN POSTLAR ---
    {
        postId: "p5",
        content: "Sergi hazırlıkları tüm hızıyla devam ediyor. Renklerin uyumu büyüleyici! 🎨🖌️",
        time: "2 gün önce",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000",
        author: users.zeynep,
        likeCount: 312,
        isLiked: false
    },
    {
        postId: "p6",
        content: "Sabah sporu gibisi yok! 💪 Herkese günaydın.",
        time: "3 gün önce",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000",
        author: users.ali,
        likeCount: 89,
        isLiked: true
    }
];

// --- 2. SAYFA YÜKLENİNCE POSTLARI BAS ---
document.addEventListener("DOMContentLoaded", function() {
    renderPosts();
});

function renderPosts() {
    const feedContainer = document.getElementById("feed-container");
    if (!feedContainer) return;

    feedContainer.innerHTML = ""; // Temizle

    postsData.forEach(post => {
        // Beğeni durumuna göre ikon sınıfı
        const heartClass = post.isLiked ? "fa-solid liked" : "fa-regular";
        // Beğeni rengi stili (Eğer beğenildiyse kırmızı olsun)
        const heartStyle = post.isLiked ? "color: #ed4956;" : "";

        const postHTML = `
            <div class="post-card" id="post-${post.postId}" style="background:white; border:1px solid #dbdbdb; margin-bottom:20px; border-radius:3px;">
                
                <div class="post-header" style="padding:10px; display:flex; align-items:center;">
                    <a href="${post.author.profileLink}" style="display:flex; align-items:center; text-decoration:none; color:inherit;">
                        <img src="${post.author.profilePic}" style="width:32px; height:32px; border-radius:50%; margin-right:10px; object-fit:cover;">
                        <span style="font-weight:600; font-size:14px;">${post.author.username}</span>
                    </a>
                    <i class="fa-solid fa-ellipsis" style="margin-left:auto; cursor:pointer;"></i>
                </div>

                <img src="${post.imageUrl}" style="width:100%; display:block;">

                <div class="post-actions" style="padding:10px; font-size:24px;">
                    <i class="${heartClass} fa-heart" onclick="likePost('${post.postId}')" id="heart-${post.postId}" style="margin-right:15px; cursor:pointer; ${heartStyle}"></i>
                    <i class="fa-regular fa-comment" onclick="focusComment('${post.postId}')" style="margin-right:15px; cursor:pointer;"></i>
                    <i class="fa-regular fa-paper-plane" style="cursor:pointer;"></i>
                    <i class="fa-regular fa-bookmark" onclick="savePost(this)" style="float:right; cursor:pointer;"></i>
                </div>

                <div style="padding:0 10px; font-weight:600; font-size:14px; margin-bottom:5px;">
                    <span id="likes-${post.postId}">${post.likeCount}</span> beğenme
                </div>

                <div style="padding:0 10px 10px 10px; font-size:14px;">
                    <div style="margin-bottom:5px;">
                        <span style="font-weight:600; margin-right:5px;">${post.author.username}</span>
                        ${post.content}
                    </div>
                    <div id="comments-list-${post.postId}"></div>
                    <div style="font-size:10px; color:gray; margin-top:5px;">${post.time}</div>
                </div>

                <div class="add-comment-section" style="border-top:1px solid #efefef; padding:10px; display:flex; align-items:center;">
                    <i class="fa-regular fa-face-smile" style="font-size:24px; margin-right:10px;"></i>
                    <input type="text" id="input-${post.postId}" placeholder="Yorum ekle..." style="border:none; outline:none; flex:1;">
                    <button onclick="addComment('${post.postId}')" style="border:none; background:none; color:#0095f6; font-weight:bold; cursor:pointer;">Paylaş</button>
                </div>
            </div>
        `;
        feedContainer.innerHTML += postHTML;
    });
}

// --- 3. FONKSİYONLAR (GLOBAL WINDOW NESNESİNE EKLENDİ) ---

// Post Beğenme
window.likePost = function(postId) {
    const heartIcon = document.getElementById(`heart-${postId}`);
    const likesText = document.getElementById(`likes-${postId}`);
    
    // Sayıyı al
    let currentLikes = parseInt(likesText.innerText);

    if (heartIcon.classList.contains("fa-regular")) {
        // Beğen
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid", "liked");
        heartIcon.style.color = "#ed4956"; // Kırmızı yap
        currentLikes++;
    } else {
        // Geri al
        heartIcon.classList.remove("fa-solid", "liked");
        heartIcon.classList.add("fa-regular");
        heartIcon.style.color = ""; // Rengi sıfırla (siyah)
        currentLikes--;
    }
    likesText.innerText = currentLikes;
};

// Post Kaydetme
window.savePost = function(icon) {
    if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    }
};

// Yorum Yapma
window.addComment = function(postId) {
    const inputField = document.getElementById(`input-${postId}`);
    const commentText = inputField.value.trim();
    const commentsList = document.getElementById(`comments-list-${postId}`);

    if (commentText === "") return; // Boşsa işlem yapma

    const newCommentHTML = `
        <div style="margin-top:5px;">
            <span style="font-weight:600; margin-right:5px;">kodinnggg</span>
            <span>${commentText}</span>
        </div>
    `;

    commentsList.innerHTML += newCommentHTML;
    inputField.value = ""; // Inputu temizle
};

// Yorum ikonuna tıklayınca inputa odaklanma
window.focusComment = function(postId) {
    const inputField = document.getElementById(`input-${postId}`);
    if(inputField) inputField.focus();
};

// Enter tuşu ile yorum gönderme desteği (Dinamik event listener)
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // Tıklanan element bir input mu kontrol et
        if (e.target.tagName === 'INPUT' && e.target.id.startsWith('input-')) {
            // ID'den postId'yi çıkar (örn: input-p1 -> p1)
            const postId = e.target.id.split('-')[1];
            addComment(postId);
        }
    }
});