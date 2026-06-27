// ======================================
// LifeRPG Beta
// Analysis Module v3.0
// Part 1 / 2
// ======================================

console.log("Analysis Module v3.0 Loaded");

document.addEventListener("DOMContentLoaded", loadAnalysis);

// ======================================
// 財富分析
// ======================================

function loadAnalysis(){

    const asset=
        JSON.parse(
            localStorage.getItem("assetData") || "{}"
        );

    const account=
        JSON.parse(
            localStorage.getItem("accountList") || "[]"
        );

    const goals=
        JSON.parse(
            localStorage.getItem("goalList") || "[]"
        );

    const totalAsset=
        asset.total || 0;

    let income=0;
    let expense=0;

    account.forEach(function(item){

        if(item.type==="income"){

            income+=item.money;

        }else{

            expense+=item.money;

        }

    });

    const balance=
        income-expense;

    // ======================================
    // 財富等級
    // ======================================

    const levels=[

        {money:0,name:"LV1 新手"},

        {money:100000,name:"LV2 小資族"},

        {money:300000,name:"LV3 穩定成長"},

        {money:500000,name:"LV4 財富累積"},

        {money:1000000,name:"LV5 百萬俱樂部"},

        {money:3000000,name:"LV6 財富自由邁進"},

        {money:5000000,name:"LV7 財富高手"},

        {money:10000000,name:"LV8 財富自由"}

    ];

    let level=levels[0].name;

    let currentGoal=0;

    let nextGoal=levels[1].money;

    for(let i=0;i<levels.length;i++){

        if(totalAsset>=levels[i].money){

            level=levels[i].name;

            currentGoal=levels[i].money;

            if(i<levels.length-1){

                nextGoal=levels[i+1].money;

            }else{

                nextGoal=levels[i].money;

            }

        }

    }

    const remain=
        Math.max(
            nextGoal-totalAsset,
            0
        );

    let progress=100;

    if(nextGoal>currentGoal){

        progress=Math.round(

            (totalAsset-currentGoal)

            /(nextGoal-currentGoal)

            *100

        );

    }

    progress=Math.max(

        0,

        Math.min(progress,100)

    );

    // ======================================
    // 財富健康度
    // ======================================

    let health=0;

    if(totalAsset>=100000) health++;
    if(balance>0) health++;
    if(income>0) health++;
    if(goals.length>0) health++;
    if(progress>=50) health++;

    let stars="";

    for(let i=1;i<=5;i++){

        stars+=

            i<=health

            ?"★"

            :"☆";

    }

    // ======================================
    // 財富成就
    // ======================================

    const achievements=[

        {money:10000,name:"第一個1萬"},

        {money:100000,name:"第一個10萬"},

        {money:300000,name:"第一個30萬"},

        {money:500000,name:"第一個50萬"},

        {money:1000000,name:"第一個100萬"}

    ];

    let achievementHtml="";

    achievements.forEach(function(item){

        achievementHtml+=`

        <div>

        ${totalAsset>=item.money?"✅":"⬜"}

        ${item.name}

        </div>

        `;

    });
        // ======================================
    // 財務目標
    // ======================================

    let goalHtml="";

    if(goals.length===0){

        goalHtml="尚未建立";

    }else{

        goals.forEach(function(goal){

            const percent=

                Math.min(

                    Math.round(

                        goal.saved/

                        goal.target*100

                    ),

                    100

                );

            goalHtml+=`

            <div class="record-item">

                <strong>

                🎯 ${goal.name}

                </strong>

                <br><br>

                ${goal.saved.toLocaleString()} /

                ${goal.target.toLocaleString()} 元

                <br><br>

                <progress

                    value="${percent}"

                    max="100"

                    style="width:100%;height:18px;">

                </progress>

                <br>

                ${percent} %

            </div>

            `;

        });

    }

    // ======================================
    // 顯示
    // ======================================

    document.getElementById("analysisContent").innerHTML=`

        <div class="record-item">

            💰 總資產

            <br><br>

            <strong>

            ${Math.round(totalAsset).toLocaleString()} 元

            </strong>

        </div>

        <div class="record-item">

            📈 收入

            <br><br>

            ${income.toLocaleString()} 元

        </div>

        <div class="record-item">

            📉 支出

            <br><br>

            ${expense.toLocaleString()} 元

        </div>

        <div class="record-item">

            💵 結餘

            <br><br>

            ${balance.toLocaleString()} 元

        </div>

        <div class="record-item">

            🏆 財富等級

            <br><br>

            <strong>

            ${level}

            </strong>

            <br><br>

            🎯 下一里程碑

            <br>

            ${nextGoal.toLocaleString()} 元

            <br><br>

            還差

            ${remain.toLocaleString()} 元

            <br><br>

            <progress

                value="${progress}"

                max="100"

                style="width:100%;height:18px;">

            </progress>

            <br>

            ${progress} %

        </div>

        <div class="record-item">

            ⭐ 財富健康度

            <br><br>

            ${stars}

        </div>

        <div class="record-item">

            🏅 財富成就

            <br><br>

            ${achievementHtml}

        </div>

        <h3>

        🎯 財務目標

        </h3>

        ${goalHtml}

    `;

}

console.log("Analysis Module v3.0 Ready");
