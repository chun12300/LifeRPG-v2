// ======================================
// LifeRPG Beta
// Analysis Module v1.0
// ======================================

console.log("Analysis Module Loaded");

document.addEventListener("DOMContentLoaded",loadAnalysis);

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

    const totalAsset=

        asset.total || 0;

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

                <br>

                ${percent} %

            </div>

            `;

        });

    }

    let level="LV1 新手";

    if(totalAsset>=100000){

        level="LV2 小資族";

    }

    if(totalAsset>=300000){

        level="LV3 穩定成長";

    }

    if(totalAsset>=500000){

        level="LV4 財富累積";

    }

    if(totalAsset>=1000000){

        level="LV5 百萬俱樂部";

    }

    if(totalAsset>=3000000){

        level="LV6 財富自由邁進";

    }

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

            ${level}

        </div>

        <h3>

        🎯 財務目標

        </h3>

        ${goalHtml}

    `;

}

console.log("Analysis Module Ready");
