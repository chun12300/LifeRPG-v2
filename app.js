// ===================================
// 人生RPG v2.0
// app.js（完整版）
// ===================================

// ===============================
// Auto Login
// ===============================

if (
    location.pathname.includes("index.html") ||
    location.pathname.endsWith("/LifeRPG-v2/") ||
    location.pathname.endsWith("/LifeRPG-v2")
){

    const nickname = localStorage.getItem("lifeNickname");

    if(nickname){

        location.href = "dashboard.html";

    }

}

// ===============================
// Landing Page
// ===============================

const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.addEventListener("click",function(){

        const nickname =
        document.getElementById("nickname").value.trim();

        const motto =
        document.getElementById("motto").value.trim();

        if(nickname===""){

            alert("請輸入你的暱稱");

            return;

        }

        localStorage.setItem("lifeNickname",nickname);

        if(motto===""){

            localStorage.setItem(
                "lifeMotto",
                "人生，不需要打怪。<br>而是超越昨天的自己。"
            );

        }else{

            localStorage.setItem("lifeMotto",motto);

        }

        localStorage.setItem("lifeLevel","1");

        location.href="dashboard.html";

    });

}

// ===============================
// Dashboard
// ===============================

const playerName=document.getElementById("playerName");

if(playerName){

    playerName.innerText=
    localStorage.getItem("lifeNickname") || "玩家";

}

const playerMotto=document.getElementById("playerMotto");

if(playerMotto){

    playerMotto.innerHTML=
    localStorage.getItem("lifeMotto")
    ||
    "人生，不需要打怪。<br>而是超越昨天的自己。";

}

// ===============================
// 五大世界
// ===============================

// 健康

const healthCard=document.getElementById("healthCard");

if(healthCard){

    healthCard.onclick=function(){

        location.href="health.html";

    };

}

// 財富

const wealthCard=document.getElementById("wealthCard");

if(wealthCard){

    wealthCard.onclick=function(){

        location.href="wealth.html";

    };

}

// 生活

const lifeCard=document.getElementById("lifeCard");

if(lifeCard){

    lifeCard.onclick=function(){

        location.href="life.html";

    };

}

// 成長

const growthCard=document.getElementById("growthCard");

if(growthCard){

    growthCard.onclick=function(){

        location.href="growth.html";

    };

}

// 探索

const exploreCard=document.getElementById("exploreCard");

if(exploreCard){

    exploreCard.onclick=function(){

        location.href="explore.html";

    };

}

// ===============================
// Reset（預留）
// ===============================

const resetBtn=document.getElementById("resetBtn");

if(resetBtn){

    resetBtn.onclick=function(){

        if(confirm("確定重新開始人生？")){

            localStorage.clear();

            location.href="index.html";

        }

    };

}
