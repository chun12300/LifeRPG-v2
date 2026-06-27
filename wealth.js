// ======================================
// LifeRPG Beta
// Wealth Module v2.0
// Part 1 / 2
// ======================================

console.log("Wealth Module v2.0 Loaded");

// ======================================
// 初始化
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    const backBtn=document.getElementById("backBtn");

    if(backBtn){

        if(location.pathname.includes("compound")){

            backBtn.onclick=function(){

                location.href="wealth.html";

            };

        }

        if(location.pathname.includes("asset")){

            backBtn.onclick=function(){

                location.href="wealth.html";

            };

        }

    }

    if(document.getElementById("calculateCompound")){

        document
            .getElementById("calculateCompound")
            .addEventListener("click",calculateCompound);

    }

    if(document.getElementById("saveAsset")){

        initAsset();

    }

});

// ======================================
// 複利計算
// ======================================

function calculateCompound(){

    const monthly=

        Number(
            document.getElementById("monthlyAmount").value
        );

    const rate=

        Number(
            document.getElementById("annualRate").value
        );

    const years=

        Number(
            document.getElementById("investmentYears").value
        );

    if(

        monthly<=0 ||

        rate<=0 ||

        years<=0

    ){

        alert("請完整輸入資料");

        return;

    }

    const monthlyRate=

        rate/100/12;

    const months=

        years*12;

    const futureValue=

        monthly*

        (

            (Math.pow(

                1+monthlyRate,

                months

            )-1)

            /monthlyRate

        )

        *(1+monthlyRate);

    const principal=

        monthly*months;

    const profit=

        futureValue-principal;

    showCompoundResult(

        monthly,

        principal,

        futureValue,

        profit,

        rate,

        years

    );

}

    📈 年化報酬率

    <br>

    ${rate} %

    </p>

    <hr>

    <h3>

    時間 × 紀律 × 複利 = 財富

    </h3>

    `;

    showCompoundPreview(

        monthly,

        rate

    );

}

// ======================================
// 成長預覽
// ======================================

function showCompoundPreview(

    monthly,

    rate

){

    const box=

        document.getElementById(

            "compoundPreview"

        );

    if(!box){

        return;

    }

    const monthlyRate=

        rate/100/12;

    let html="";

    [5,10,15,20,25,30]

    .forEach(function(year){

        const months=

            year*12;

        const value=

            monthly*

            (

                (Math.pow(

                    1+monthlyRate,

                    months

                )-1)

                /monthlyRate

            )

            *(1+monthlyRate);

        html+=`

        <div class="record-item">

            <strong>

            ${year} 年後

            </strong>

            <br>

            💰 ${Math.round(value).toLocaleString()} 元

        </div>

        `;

    });

    box.innerHTML=html;

}
// ======================================
// Wealth Module v2.0
// Part 2 / 2
// ======================================

// ======================================
// 資產管理
// ======================================

function initAsset(){

    loadAsset();

    document
        .getElementById("saveAsset")
        .addEventListener("click",saveAsset);

}

function saveAsset(){

    const cash=
        Number(document.getElementById("cashValue").value)||0;

    const deposit=
        Number(document.getElementById("depositValue").value)||0;

    const invest=
        Number(document.getElementById("investValue").value)||0;

    const other=
        Number(document.getElementById("otherValue").value)||0;

    const total=

        cash+

        deposit+

        invest+

        other;

    const data={

        cash:cash,

        deposit:deposit,

        invest:invest,

        other:other,

        total:total

    };

    localStorage.setItem(

        "assetData",

        JSON.stringify(data)

    );

    loadAsset();

}

function loadAsset(){

    const data=

        JSON.parse(

            localStorage.getItem("assetData") ||

            "{}"

        );

    if(data.cash===undefined){

        return;

    }

    document.getElementById("cashValue").value=

        data.cash;

    document.getElementById("depositValue").value=

        data.deposit;

    document.getElementById("investValue").value=

        data.invest;

    document.getElementById("otherValue").value=

        data.other;

    document.getElementById("assetResult").innerHTML=`

        <h3>

        💰 總資產

        </h3>

        <h2>

        ${Math.round(data.total).toLocaleString()} 元

        </h2>

    `;

}

// ======================================
// 財富里程碑（預留）
// ======================================

function getGoalYear(

    monthly,

    rate,

    target

){

    const monthlyRate=

        rate/100/12;

    let month=0;

    let money=0;

    while(

        money<target &&

        month<1200

    ){

        money=

            (money+monthly)

            *(1+monthlyRate);

        month++;

    }

    return{

        year:(month/12).toFixed(1),

        money:Math.round(money)

    };

}

// ======================================
// 共用工具（預留）
// ======================================

function formatMoney(value){

    return Math.round(value).toLocaleString()+" 元";

}

// ======================================
// Module Ready
// ======================================

console.log("Compound Module Ready");

console.log("Asset Module Ready");

console.log("Wealth Module v2.0 Ready");
// ======================================
// Account
// ======================================

function initAccount(){

    loadAccount();

    document
        .getElementById("saveAccount")
        .addEventListener("click",saveAccount);

}

function saveAccount(){

    const type=
        document.getElementById("accountType").value;

    const money=
        Number(
            document.getElementById("accountMoney").value
        );

    const title=
        document.getElementById("accountTitle").value.trim();

    const note=
        document.getElementById("accountNote").value.trim();

    if(money<=0){

        alert("請輸入金額");

        return;

    }

    if(title===""){

        alert("請輸入項目");

        return;

    }

    const now=new Date();

    const record={

        type:type,

        money:money,

        title:title,

        note:note,

        date:
        now.getFullYear()+"/"+
        String(now.getMonth()+1).padStart(2,"0")+"/"+
        String(now.getDate()).padStart(2,"0"),

        time:
        String(now.getHours()).padStart(2,"0")+":"+
        String(now.getMinutes()).padStart(2,"0")

    };

    let list=

        JSON.parse(

            localStorage.getItem("accountList")

            ||

            "[]"

        );

    list.unshift(record);

    localStorage.setItem(

        "accountList",

        JSON.stringify(list)

    );

    document.getElementById("accountMoney").value="";

    document.getElementById("accountTitle").value="";

    document.getElementById("accountNote").value="";

    loadAccount();

}

function loadAccount(){

    const box=

        document.getElementById("accountList");

    if(!box){

        return;

    }

    const list=

        JSON.parse(

            localStorage.getItem("accountList")

            ||

            "[]"

        );

    if(list.length===0){

        box.innerHTML="尚無紀錄";

        updateAccountSummary(list);

        return;

    }

    let html="";

    list.forEach(function(item,index){

        html+=`

        <div class="record-item">

            <div class="record-date">

            📅 ${item.date}

            🕒 ${item.time}

            </div>

            <div class="record-title">

            ${item.type==="income" ? "💰 收入" : "💸 支出"}

            </div>

            <div class="record-content">

            ${item.title}

            <br><br>

            ${Math.round(item.money).toLocaleString()} 元

            ${item.note ? "<br><br>📝 "+item.note : ""}

            </div>

            <button

            class="record-delete"

            onclick="deleteAccount(${index})">

            🗑️ 刪除紀錄

            </button>

        </div>

        `;

    });

    box.innerHTML=html;

    updateAccountSummary(list);

}
function deleteAccount(index){

    if(!confirm("確定刪除這筆紀錄？")){

        return;

    }

    let list=

        JSON.parse(

            localStorage.getItem("accountList")

            ||

            "[]"

        );

    list.splice(index,1);

    localStorage.setItem(

        "accountList",

        JSON.stringify(list)

    );

    loadAccount();

}

// ======================================
// 更新統計
// ======================================

function updateAccountSummary(list){

    const box=document.getElementById("accountSummary");

    if(!box){

        return;

    }

    let income=0;

    let expense=0;

    list.forEach(function(item){

        if(item.type==="income"){

            income+=item.money;

        }else{

            expense+=item.money;

        }

    });

    const balance=

        income-expense;

    box.innerHTML=`

        💰 收入

        <br>

        ${income.toLocaleString()} 元

        <br><br>

        💸 支出

        <br>

        ${expense.toLocaleString()} 元

        <br><br>

        💵 結餘

        <br>

        ${balance.toLocaleString()} 元

    `;

    // ==========================
    // 同步更新資產現金
    // ==========================

    let asset=

        JSON.parse(

            localStorage.getItem("assetData")

            ||

            "{}"

        );

    if(asset.cash!==undefined){

        asset.cash=balance;

        asset.total=

            asset.cash+

            (asset.deposit||0)+

            (asset.invest||0)+

            (asset.other||0);

        localStorage.setItem(

            "assetData",

            JSON.stringify(asset)

        );

    }

}

// ======================================
// 初始化記帳
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    if(document.getElementById("saveAccount")){

        initAccount();

    }

});

console.log("Account Module Ready");

console.log("Wealth Module v2.1 Ready");
