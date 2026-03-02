// story.js - İSİM HATASI DÜZELTİLMİŞ & SİLME ÖZELLİKLİ SÜRÜM 🚀

console.log("Story.js başarıyla yüklendi! ✅");

// 1. GLOBAL DEĞİŞKENLER
let currentStoryUser = null; // O an hangi hikaye açık?

// 2. VERİTABANI (Sabit veriler)
const storyDatabase = {
    'me': {
        storyImg: "asset/image/o (1).jpg",
        profileImg: "asset/image/5.jpg",
        username: "Your Story",
        profileUrl: "profil.html"
    },
    'ali': {
        storyImg: "asset/scarlett/1 (2).jpg",
        profileImg: "asset/scarlett/1 (14).jpg",
        username: "Scarlett Anderson",
        profileUrl: "scarlett.html"
    },
    'ayse': {
        storyImg: "asset/dog/5.jpg",
        profileImg: "asset/dog/1.jpg",
        username: "Dog Lucky",
        profileUrl: "profile2.html"
    },
    'mert': {
        storyImg: "asset/image/o (2).jpg",
        profileImg: "asset/kayra/a (5).jpg",
        username: "Kayra Gültekin",
        profileUrl: "kayra.html"
    },
    'zeynep': {
        storyImg: "asset/image/o (3).jpg",
        profileImg: "asset/image/1.jpg",
        username: "James Hill",
        profileUrl: "james.html"
    }
};

// 3. HİKAYE AÇMA FONKSİYONU
window.openStory = function (userId) {
    console.log("Hikaye açılıyor: " + userId);

    currentStoryUser = userId;

    const storyModal = document.getElementById('story-modal');
    const fullStoryImg = document.getElementById('full-story-img');
    const headerProfileImg = document.getElementById('story-header-profile');
    const headerUsername = document.getElementById('story-header-username');
    const storyLikeBtn = document.getElementById('story-like-btn');
    const deleteBtn = document.getElementById('story-delete-btn'); // Silme butonu

    // Veritabanından veriyi çek
    const userData = storyDatabase[userId];

    if (storyModal && fullStoryImg && userData) {
        // Resimleri ve yazıları doldur
        fullStoryImg.src = userData.storyImg;

        if (headerProfileImg) headerProfileImg.src = userData.profileImg;

        // --- İŞTE HATAYI ÇÖZEN SATIR BURASI ---
        // Eskiden burada 'userfname' yazıyordu, 'username' yaptık.
        if (headerUsername) headerUsername.innerText = userData.username;
        // --------------------------------------

        // --- SİLME BUTONU MANTIĞI ---
        // 1. LocalStorage'daki storyleri çek
        const localStories = JSON.parse(localStorage.getItem('stories_db')) || [];

        // 2. Şu an açılan 'userId' (yani story ID'si) local listede var mı bak
        // Not: ID kontrolü yaparken string/number hatası olmasın diye '==' kullanıyoruz
        const isMyStory = localStories.some(story => story.id == userId);

        if (isMyStory) {
            // Eğer benim eklediğim bir story ise butonu göster
            if (deleteBtn) deleteBtn.style.display = "block";
        } else {
            // Ali, Ayşe gibi sabit story ise gizle
            if (deleteBtn) deleteBtn.style.display = "none";
        }
        // ------------------------------------

        // Modalı göster
        storyModal.classList.add('active');

        // Kalbi sıfırla
        if (storyLikeBtn) {
            storyLikeBtn.className = "fa-regular fa-heart";
            storyLikeBtn.style.color = "white";
        }
    } else {
        console.error("Hata: Veri veya HTML elemanları eksik! ID:", userId);
    }
}

// 4. SİLME FONKSİYONU
window.deleteCurrentStory = function () {
    if (!currentStoryUser) return;

    if (confirm("Are you sure you want to delete this story?")) {
        // 1. Mevcut listeyi çek
        let localStories = JSON.parse(localStorage.getItem('stories_db')) || [];

        // 2. Şu anki story'yi ID'sine göre filtrele (Sil)
        let newStories = localStories.filter(story => story.id != currentStoryUser);

        // 3. Yeni listeyi kaydet
        localStorage.setItem('stories_db', JSON.stringify(newStories));

        // 4. Modalı kapat ve sayfayı yenile
        closeStory();
        alert("Story deleted! 🗑️");
        window.location.reload();
    }
}

// 5. PROFİLE GİTME FONKSİYONU
window.visitProfile = function () {
    console.log("Profile gitmek için tıklandı!");

    if (currentStoryUser && storyDatabase[currentStoryUser]) {
        const targetUrl = storyDatabase[currentStoryUser].profileUrl;

        if (targetUrl && targetUrl !== "#") {
            window.location.href = targetUrl;
        }
    }
}

// 6. KAPATMA
window.closeStory = function () {
    const storyModal = document.getElementById('story-modal');
    if (storyModal) {
        storyModal.classList.remove('active');
    }
}

// 7. BEĞENME (LIKE)
window.toggleStoryLike = function () {
    const btn = document.getElementById('story-like-btn');
    if (!btn) return;

    if (btn.classList.contains('fa-regular')) {
        btn.classList.remove('fa-regular');
        btn.classList.add('fa-solid');
        btn.style.color = "#ff3040";
        btn.style.transform = "scale(1.2)";
    } else {
        btn.classList.remove('fa-solid');
        btn.classList.add('fa-regular');
        btn.style.color = "white";
        btn.style.transform = "scale(1)";
    }
}

// 8. MESAJ GÖNDERME
window.sendStoryMessage = function (inputElement) {
    if (event.key === 'Enter') {
        const message = inputElement.value;
        if (message.trim() !== "") {
            console.log(`The massage is sent correctly! (${currentStoryUser}): ${message}`);
            inputElement.value = "";
            inputElement.blur();
        }
    }
}