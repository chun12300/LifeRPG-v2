// ======================================
// LifeRPG Beta
// Health Module v2.0
// ======================================

// ===============================
// 返回 Dashboard
// ===============================

const backBtn=document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick=function(){

        location.href="dashboard.html";

    };

}

// ===============================
// 健康首頁導航
// ===============================

const pageMap={

    exerciseCard:"exercise.html",

    weightCard:"weight.html",

    waterCard:"water.html",

    sleepCard:"sleep.html",

    bmiCard:"bmi.html"

};

Object.keys(pageMap).forEach(function(id){

    const card=document.getElementById(id);

    if(card){

        card.onclick=function(){

            location.href=pageMap[id];

        };

    }

});
// ===============================
// 共用 LocalStorage
// ===============================

function getData(key){

    return JSON.parse(

        localStorage.getItem(key) || "[]"

    );

}

function saveData(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

// ===============================
// 共用日期時間
// ===============================

function getNow(){

    const now=new Date();

    return{

        date:
        now.getFullYear()+"/"+
        String(now.getMonth()+1).padStart(2,"0")+"/"+
        String(now.getDate()).padStart(2,"0"),

        time:
        String(now.getHours()).padStart(2,"0")+":"+
        String(now.getMinutes()).padStart(2,"0")

    };

}
// ===============================
// Exercise
// ===============================

function initExercise(){

    loadExercise();

    document
        .getElementById("saveExercise")
        .addEventListener("click",saveExercise);

}

function saveExercise(){

    const type=
        document.getElementById("exerciseType").value;

    const minute=
        document.getElementById("exerciseMinute").value;

    const note=
        document.getElementById("exerciseNote").value.trim();

    if(minute===""){

        alert("請輸入運動時間");

        return;

    }

    const now=new Date();

    const date=

        now.getFullYear()+"/"+

        String(now.getMonth()+1).padStart(2,"0")+"/"+

        String(now.getDate()).padStart(2,"0");

    const time=

        String(now.getHours()).padStart(2,"0")+":"+

        String(now.getMinutes()).padStart(2,"0");

    let list=

        JSON.parse(

            localStorage.getItem("exerciseList") || "[]"

        );

    list.unshift({

        type:type,

        minute:Number(minute),

        note:note,

        date:date,

        time:time

    });

    localStorage.setItem(

        "exerciseList",

        JSON.stringify(list)

    );

    document.getElementById("exerciseMinute").value="";

    document.getElementById("exerciseNote").value="";

    loadExercise();

}
// ===============================
// 載入運動紀錄
// ===============================

function loadExercise(){

    const box=document.getElementById("exerciseList");

    if(!box){

        return;

    }

    const list=JSON.parse(

        localStorage.getItem("exerciseList") || "[]"

    );

    if(list.length===0){

        box.innerHTML="尚無紀錄";

        return;

    }

    let html="";

    list.forEach(function(item,index){

        html+=`

        <div class="record-item">

            <div class="record-date">

                📅 ${item.date}　🕒 ${item.time}

            </div>

            <div class="record-title">

                🏋️ ${item.type}

            </div>

            <div class="record-content">

                ⏱ ${item.minute} 分鐘

                ${item.note ? `<br><br>📝 ${item.note}` : ""}

            </div>

            <button

                class="record-delete"

                onclick="deleteExercise(${index})">

                🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}

// ===============================
// 刪除運動紀錄
// ===============================

function deleteExercise(index){

    if(!confirm("確定刪除這筆運動紀錄？")){

        return;

    }

    let list=JSON.parse(

        localStorage.getItem("exerciseList") || "[]"

    );

    list.splice(index,1);

    localStorage.setItem(

        "exerciseList",

        JSON.stringify(list)

    );

    loadExercise();

}
// ======================================
// LifeRPG Beta
// Health Module v2.0
//
// 已完成：
// ✔ Health 首頁導航
// ✔ Exercise 初始化
// ✔ Exercise 儲存
// ✔ Exercise 載入
// ✔ Exercise 刪除
//
// 下一版：
// Weight
// Water
// Sleep
// BMI
// ======================================

console.log("Health Module v2.0 Loaded");
// ===============================
// Weight
// ===============================

function initWeight(){

    loadWeight();

    document
        .getElementById("saveWeight")
        .addEventListener("click",saveWeight);

}

function saveWeight(){

    const weight=

        document
        .getElementById("weightValue")
        .value;

    const note=

        document
        .getElementById("weightNote")
        .value
        .trim();

    if(weight===""){

        alert("請輸入體重");

        return;

    }

    const now=new Date();

    const date=

        now.getFullYear()+"/"+

        String(now.getMonth()+1).padStart(2,"0")+"/"+

        String(now.getDate()).padStart(2,"0");

    const time=

        String(now.getHours()).padStart(2,"0")+":"+

        String(now.getMinutes()).padStart(2,"0");

    let list=

        JSON.parse(

            localStorage.getItem("weightList") || "[]"

        );

    list.unshift({

        weight:Number(weight),

        note:note,

        date:date,

        time:time

    });

    localStorage.setItem(

        "weightList",

        JSON.stringify(list)

    );

    document
        .getElementById("weightValue")
        .value="";

    document
        .getElementById("weightNote")
        .value="";

    loadWeight();

}
// ===============================
// 載入體重紀錄
// ===============================

function loadWeight(){

    const box=document.getElementById("weightList");

    if(!box){

        return;

    }

    const list=JSON.parse(

        localStorage.getItem("weightList") || "[]"

    );

    if(list.length===0){

        box.innerHTML="尚無紀錄";

        return;

    }

    let html="";

    list.forEach(function(item,index){

        html+=`

        <div class="record-item">

            <div class="record-date">

                📅 ${item.date}　🕒 ${item.time}

            </div>

            <div class="record-title">

                ⚖️ 體重紀錄

            </div>

            <div class="record-content">

                ⚖️ ${item.weight} kg

                ${item.note ? `<br><br>📝 ${item.note}` : ""}

            </div>

            <button

                class="record-delete"

                onclick="deleteWeight(${index})">

                🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}
// ===============================
// 刪除體重紀錄
// ===============================

function deleteWeight(index){

    if(!confirm("確定刪除這筆體重紀錄？")){

        return;

    }

    let list=JSON.parse(

        localStorage.getItem("weightList") || "[]"

    );

    list.splice(index,1);

    localStorage.setItem(

        "weightList",

        JSON.stringify(list)

    );

    loadWeight();

}



// ===============================
// Weight 初始化完成
// ===============================

if(document.getElementById("weightList")){

    loadWeight();

}
// ===============================
// Weight Module Ready
// ===============================

console.log("Weight Module Ready");



// ===============================
// Health Module Ready
// ===============================

console.log("Health Module v2.1 Ready");
