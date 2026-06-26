// ===================================
// 人生RPG v2.1
// app.js
// ===================================


// ===============================
// Auto Login
// ===============================

if (
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

        if(nickname==""){

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

    }

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
    localStorage.getItem("lifeMotto") ||
    "人生，不需要打怪。";

}



// ===============================
// 世界入口
// ===============================

const worldLinks={

    healthCard:"health.html",

    wealthCard:"wealth.html",

    lifeCard:"life.html",

    growthCard:"growth.html",

    exploreCard:"explore.html"

};

for(const id in worldLinks){

    const card=document.getElementById(id);

    if(card){

        card.onclick=function(){

            location.href=worldLinks[id];

        }

    }

}



// ===============================
// 運動紀錄
// ===============================

const saveExercise=document.getElementById("saveExercise");

if(saveExercise){

    loadExercise();

    saveExercise.onclick=function(){

        const input=document.getElementById("exerciseInput");

        const text=input.value.trim();

        if(text==""){

            alert("請輸入今天的運動內容");

            return;

        }

        let list=
        JSON.parse(localStorage.getItem("exerciseList") || "[]");

        list.unshift({

            text:text,

            time:new Date().toLocaleString()

        });

        localStorage.setItem(

            "exerciseList",

            JSON.stringify(list)

        );

        input.value="";

        loadExercise();

    }

}



function loadExercise(){

    const box=document.getElementById("exerciseList");

    if(!box) return;

    const list=
    JSON.parse(localStorage.getItem("exerciseList") || "[]");

    if(list.length===0){

        box.innerHTML="尚無紀錄";

        return;

    }

    let html="";

    list.forEach(function(item,index){

        html+=`

        <div class="record-item">

            <div class="record-time">

                ${item.time}

            </div>

            <div class="record-text">

                ${item.text}

            </div>

            <button
            onclick="deleteExercise(${index})">

            🗑 刪除

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}



function deleteExercise(index){

    let list=
    JSON.parse(localStorage.getItem("exerciseList") || "[]");

    list.splice(index,1);

    localStorage.setItem(

        "exerciseList",

        JSON.stringify(list)

    );

    loadExercise();

}



// ===============================
// 返回
// ===============================

const backBtn=document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick=function(){

        location.href="health.html";

    }

}
