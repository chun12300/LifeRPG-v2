// ======================================
// LifeRPG Beta
// Goal Module v1.0
// ======================================

console.log("Goal Module Loaded");

// ======================================
// 初始化
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    loadGoal();

    document
        .getElementById("saveGoal")
        .addEventListener("click",saveGoal);

});

// ======================================
// 儲存目標
// ======================================

function saveGoal(){

    const name=
        document.getElementById("goalName").value.trim();

    const target=
        Number(
            document.getElementById("goalTarget").value
        );

    const saved=
        Number(
            document.getElementById("goalSaved").value
        );

    if(name===""){

        alert("請輸入目標名稱");

        return;

    }

    if(target<=0){

        alert("請輸入目標金額");

        return;

    }

    let list=

        JSON.parse(

            localStorage.getItem("goalList")

            ||

            "[]"

        );

    list.unshift({

        name:name,

        target:target,

        saved:saved

    });

    localStorage.setItem(

        "goalList",

        JSON.stringify(list)

    );

    document.getElementById("goalName").value="";

    document.getElementById("goalTarget").value="";

    document.getElementById("goalSaved").value="";

    loadGoal();

}

// ======================================
// 載入目標
// ======================================

function loadGoal(){

    const box=

        document.getElementById("goalList");

    if(!box){

        return;

    }

    const list=

        JSON.parse(

            localStorage.getItem("goalList")

            ||

            "[]"

        );

    if(list.length===0){

        box.innerHTML="尚無目標";

        return;

    }

    let html="";

    list.forEach(function(item,index){

        let percent=

            Math.round(

                item.saved/

                item.target*100

            );

        if(percent>100){

            percent=100;

        }

        html+=`

        <div class="record-item">

            <strong>

                🎯 ${item.name}

            </strong>

            <br><br>

            ${item.saved.toLocaleString()} 元

            /

            ${item.target.toLocaleString()} 元

            <br><br>

            <progress

                value="${percent}"

                max="100"

                style="width:100%;height:18px;">

            </progress>

            <br>

            ${percent} %

            <br><br>

            <button

                class="record-delete"

                onclick="deleteGoal(${index})">

                🗑️ 刪除

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

}

// ======================================
// 刪除
// ======================================

function deleteGoal(index){

    if(!confirm("確定刪除？")){

        return;

    }

    let list=

        JSON.parse(

            localStorage.getItem("goalList")

            ||

            "[]"

        );

    list.splice(index,1);

    localStorage.setItem(

        "goalList",

        JSON.stringify(list)

    );

    loadGoal();

}

console.log("Goal Module Ready");
