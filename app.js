// ===================================
// Auto Login
// ===================================

if (
    location.pathname.includes("index.html") ||
    location.pathname.endsWith("/LifeRPG-v2/") ||
    location.pathname.endsWith("/LifeRPG-v2")
){

    const nickname = localStorage.getItem("lifeNickname");

    if(nickname){

        location.href="dashboard.html";

    }

}
// ===================================
// 人生RPG v2.0
// app.js
// Step01
// ===================================

// -----------------------------
// Landing Page
// -----------------------------

const startBtn = document.getElementById("startBtn");

if (startBtn) {

    startBtn.addEventListener("click", function () {

        const nickname =
            document.getElementById("nickname").value.trim();

        const motto =
            document.getElementById("motto").value.trim();

        if (nickname === "") {

            alert("請先輸入你的暱稱");

            return;

        }

        localStorage.setItem("lifeNickname", nickname);

        if (motto === "") {

            localStorage.setItem(
                "lifeMotto",
                "人生，不需要打怪，而是超越昨天的自己。"
            );

        } else {

            localStorage.setItem("lifeMotto", motto);

        }

        localStorage.setItem("lifeLevel", "1");

        location.href = "dashboard.html";

    });

}

// -----------------------------
// Dashboard
// -----------------------------

const playerName = document.getElementById("playerName");

if (playerName) {

    playerName.innerText =
        localStorage.getItem("lifeNickname") || "玩家";

}

const playerMotto = document.getElementById("playerMotto");

if (playerMotto) {

    playerMotto.innerHTML =
        localStorage.getItem("lifeMotto") ||
        "人生，不需要打怪。<br>而是超越昨天的自己。";

}

// -----------------------------
// 世界入口（先保留）
// -----------------------------

const healthCard = document.getElementById("healthCard");

if (healthCard) {

    healthCard.onclick = function () {

        alert("💪 獨自升級\n\n即將開放");

    };

}

const wealthCard = document.getElementById("wealthCard");

if (wealthCard) {

    wealthCard.onclick = function () {

        alert("💰 投資有富\n\n即將開放");

    };

}

const lifeCard = document.getElementById("lifeCard");

if (lifeCard) {

    lifeCard.onclick = function () {

        alert("🍽 百匯饗宴\n\n即將開放");

    };

}

const growthCard = document.getElementById("growthCard");

if (growthCard) {

    growthCard.onclick = function () {

        alert("🧠 人生迷因\n\n即將開放");

    };

}

const exploreCard = document.getElementById("exploreCard");

if (exploreCard) {

    exploreCard.onclick = function () {

        alert("🗺 人生探索\n\n即將開放");

    };

}
