// ======================================
// LifeRPG Beta
// Health Module v3.0
// ======================================

console.log("health.js loaded");

// ======================================
// 共用工具
// ======================================

function getData(key){

    return JSON.parse(

        localStorage.getItem(key) || "[]"

    );

}

function setData(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

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



// ======================================
// 返回
// ======================================

const backBtn=document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick=function(){

        location.href="health.html";

    };

}



// ======================================
// 健康首頁
// ======================================

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



// ======================================
// 判斷目前頁面
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    if(document.getElementById("saveExercise")){

        initExercise();

    }

    if(document.getElementById("saveWeight")){

        initWeight();

    }

    if(document.getElementById("saveWater")){

        initWater();

    }

    if(document.getElementById("saveSleep")){

        initSleep();

    }

    if(document.getElementById("saveBMI")){

        initBMI();

    }

});
// ======================================
// Exercise
// ======================================

function initExercise(){

    loadExercise();

    document
        .getElementById("saveExercise")
        .addEventListener("click",saveExercise);

}

function saveExercise(){

    const type=document.getElementById("exerciseType").value;

    const minute=document.getElementById("exerciseMinute").value;

    const note=document.getElementById("exerciseNote").value.trim();

    if(minute===""){

        alert("請輸入運動時間");

        return;

    }

    const now=getNow();

    let list=getData("exerciseList");

    list.unshift({

        type:type,

        minute:Number(minute),

        note:note,

        date:now.date,

        time:now.time

    });

    setData("exerciseList",list);

    document.getElementById("exerciseMinute").value="";

    document.getElementById("exerciseNote").value="";

    loadExercise();

}

function loadExercise(){

    const box=document.getElementById("exerciseList");

    if(!box){

        return;

    }

    const list=getData("exerciseList");

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

function deleteExercise(index){

    if(!confirm("確定刪除這筆運動紀錄？")){

        return;

    }

    let list=getData("exerciseList");

    list.splice(index,1);

    setData("exerciseList",list);

    loadExercise();

}
// ======================================
// Weight
// ======================================

function initWeight(){

    loadWeight();

    document
        .getElementById("saveWeight")
        .addEventListener("click",saveWeight);

}

function saveWeight(){

    const weight=document.getElementById("weightValue").value;

    const note=document.getElementById("weightNote").value.trim();

    if(weight===""){

        alert("請輸入體重");

        return;

    }

    const now=getNow();

    let list=getData("weightList");

    list.unshift({

        weight:Number(weight),

        note:note,

        date:now.date,

        time:now.time

    });

    setData("weightList",list);

    document.getElementById("weightValue").value="";

    document.getElementById("weightNote").value="";

    loadWeight();

}

function loadWeight(){

    const box=document.getElementById("weightList");

    if(!box){

        return;

    }

    const list=getData("weightList");

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

function deleteWeight(index){

    if(!confirm("確定刪除這筆體重紀錄？")){

        return;

    }

    let list=getData("weightList");

    list.splice(index,1);

    setData("weightList",list);

    loadWeight();

}
// ======================================
// Water
// ======================================

function initWater(){

    loadWater();

    document
        .getElementById("saveWater")
        .addEventListener("click",saveWater);

}

function saveWater(){

    const water=document.getElementById("waterValue").value;

    const note=document.getElementById("waterNote").value.trim();

    if(water===""){

        alert("請輸入喝水量");

        return;

    }

    const now=getNow();

    let list=getData("waterList");

    list.unshift({

        water:Number(water),

        note:note,

        date:now.date,

        time:now.time

    });

    setData("waterList",list);

    document.getElementById("waterValue").value="";

    document.getElementById("waterNote").value="";

    loadWater();

}

function loadWater(){

    const box=document.getElementById("waterList");

    if(!box){

        return;

    }

    const list=getData("waterList");

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

                💧 喝水紀錄

            </div>

            <div class="record-content">

                💧 ${item.water} ml

                ${item.note ? `<br><br>📝 ${item.note}` : ""}

            </div>

            <button
                class="record-delete"
                onclick="deleteWater(${index})">

                🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}

function deleteWater(index){

    if(!confirm("確定刪除這筆喝水紀錄？")){

        return;

    }

    let list=getData("waterList");

    list.splice(index,1);

    setData("waterList",list);

    loadWater();

}
// ======================================
// Sleep
// ======================================

function initSleep(){

    loadSleep();

    document
        .getElementById("saveSleep")
        .addEventListener("click",saveSleep);

}

function saveSleep(){

    const hour=document.getElementById("sleepHour").value;

    const note=document.getElementById("sleepNote").value.trim();

    if(hour===""){

        alert("請輸入睡眠時數");

        return;

    }

    const now=getNow();

    let list=getData("sleepList");

    list.unshift({

        hour:Number(hour),

        note:note,

        date:now.date,

        time:now.time

    });

    setData("sleepList",list);

    document.getElementById("sleepHour").value="";

    document.getElementById("sleepNote").value="";

    loadSleep();

}

function loadSleep(){

    const box=document.getElementById("sleepList");

    if(!box){

        return;

    }

    const list=getData("sleepList");

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

                😴 睡眠紀錄

            </div>

            <div class="record-content">

                😴 ${item.hour} 小時

                ${item.note ? `<br><br>📝 ${item.note}` : ""}

            </div>

            <button

                class="record-delete"

                onclick="deleteSleep(${index})">

                🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}

function deleteSleep(index){

    if(!confirm("確定刪除這筆睡眠紀錄？")){

        return;

    }

    let list=getData("sleepList");

    list.splice(index,1);

    setData("sleepList",list);

    loadSleep();

}
// ======================================
// BMI
// ======================================

function initBMI(){

    loadBMI();

    document
        .getElementById("calculateBMI")
        .addEventListener("click",calculateBMI);

    document
        .getElementById("saveBMI")
        .addEventListener("click",saveBMI);

}

function calculateBMI(){

    const height=document.getElementById("heightValue").value;

    const weight=document.getElementById("weightValue").value;

    if(height==="" || weight===""){

        alert("請輸入身高與體重");

        return null;

    }

    const bmi=(

        Number(weight) /

        Math.pow(Number(height)/100,2)

    ).toFixed(1);

    let level="";

    if(bmi<18.5){

        level="🔵 過輕";

    }else if(bmi<24){

        level="🟢 正常";

    }else if(bmi<27){

        level="🟡 過重";

    }else{

        level="🔴 肥胖";

    }

    document.getElementById("bmiResult").innerHTML=

        `<h2>${bmi}</h2><p>${level}</p>`;

    return{

        bmi:bmi,

        level:level,

        height:Number(height),

        weight:Number(weight)

    };

}

function saveBMI(){

    const result=calculateBMI();

    if(!result){

        return;

    }

    const note=document.getElementById("bmiNote").value.trim();

    const now=getNow();

    let list=getData("bmiList");

    list.unshift({

        height:result.height,

        weight:result.weight,

        bmi:result.bmi,

        level:result.level,

        note:note,

        date:now.date,

        time:now.time

    });

    setData("bmiList",list);

    document.getElementById("bmiNote").value="";

    loadBMI();

}

function loadBMI(){

    const box=document.getElementById("bmiList");

    if(!box){

        return;

    }

    const list=getData("bmiList");

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

                📏 BMI ${item.bmi}

            </div>

            <div class="record-content">

                身高：${item.height} cm<br>

                體重：${item.weight} kg<br>

                ${item.level}

                ${item.note ? `<br><br>📝 ${item.note}` : ""}

            </div>

            <button
                class="record-delete"
                onclick="deleteBMI(${index})">

                🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}

function deleteBMI(index){

    if(!confirm("確定刪除這筆 BMI 紀錄？")){

        return;

    }

    let list=getData("bmiList");

    list.splice(index,1);

    setData("bmiList",list);

    loadBMI();

}
// ======================================
// Health Summary
// ======================================

function loadHealthSummary(){

    const exercise=getData("exerciseList");

    const box=document.getElementById("exerciseSummary");

    if(box){

        if(exercise.length){

            box.innerHTML=

                `${exercise[0].type} ${exercise[0].minute} 分鐘`;

        }else{

            box.innerHTML="尚無紀錄";

        }

    }

}
