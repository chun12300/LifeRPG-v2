// ===================================
// 人生RPG
// Health Module v1.0
// ===================================

// ------------------------------
// 返回 Dashboard
// ------------------------------

const backBtn=document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick=function(){

        location.href="dashboard.html";

    };

}

// ------------------------------
// 運動紀錄
// ------------------------------

const saveExercise=document.getElementById("saveExercise");

if(saveExercise){

    console.log("Health Module Loaded");

}
