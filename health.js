// ======================================
// LifeRPG Beta
// Health Module v1.0
// ======================================


// ===============================
// 返回按鈕
// ===============================

const backBtn=document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick=function(){

        location.href="health.html";

    };

}



// ===============================
// 運動紀錄
// ===============================

const saveExercise=document.getElementById("saveExercise");

if(saveExercise){

    loadExercise();

    saveExercise.onclick=function(){

        saveExerciseRecord();

    };

}



// ===============================
// 儲存
// ===============================

function saveExerciseRecord(){

    const type=

    document.getElementById("exerciseType").value;

    const minute=

    document.getElementById("exerciseMinute").value;

    const note=

    document.getElementById("exerciseNote").value.trim();



    if(minute==""){

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

                ${item.note ? "<br><br>📝 "+item.note : ""}

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

    const check=confirm("確定要刪除這筆紀錄嗎？");

    if(!check){

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



// ===============================
// 頁面初始化
// ===============================

document.addEventListener("DOMContentLoaded",function(){

    if(document.getElementById("exerciseList")){

        loadExercise();

    }

});
