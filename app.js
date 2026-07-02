// ===================================
// LifeRPG Beta v3.0
// app.js
// ===================================

// ===============================
// Auto Login
// ===============================
if(
    location.pathname.includes("index.html") ||
    location.pathname.endsWith("/LifeRPG-v2/") ||
    location.pathname.endsWith("/LifeRPG-v2")
){
    if(localStorage.getItem("lifeNickname")){
        location.href="dashboard.html";
    }
}

// ===============================
// Landing
// ===============================
const startBtn=document.getElementById("startBtn");
if(startBtn){
    startBtn.onclick=function(){
        const nickname=document.getElementById("nickname").value.trim();
        const motto=document.getElementById("motto").value.trim();
        if(nickname===""){
            alert("請輸入你的暱稱");
            return;
        }
        localStorage.setItem("lifeNickname",nickname);
        localStorage.setItem(
            "lifeMotto",
            motto || "人生，不需要打怪，而是超越昨天的自己。"
        );
        localStorage.setItem("lifeLevel","1");
        location.href="dashboard.html";
    };
}

// ===============================
// Dashboard
// ===============================
{
    const playerName=document.getElementById("playerName");
    if(playerName){
        playerName.textContent=
            localStorage.getItem("lifeNickname") || "玩家";
    }
    const playerMotto=document.getElementById("playerMotto");
    if(playerMotto){
        playerMotto.textContent=
            localStorage.getItem("lifeMotto") ||
            "人生，不需要打怪，而是超越昨天的自己。";
    }
}

// ===============================
// 世界入口
// ===============================
const worldLinks={
    healthCard:"health.html",
    wealthCard:"wealth.html",
    lifeCard:"food.html",
    growthCard:"meme.html",
    exploreCard:"explore.html"
};
Object.keys(worldLinks).forEach(function(id){
    const card=document.getElementById(id);
    if(card){
        card.onclick=function(){
            location.href=worldLinks[id];
        };
    }
});
