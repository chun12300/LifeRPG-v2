// ===================================
// Wealth Module v1.0
// ===================================

console.log("Wealth Module Loaded");
// ======================================
// LifeRPG Beta
// Wealth Module v1.0
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    const backBtn=document.getElementById("backBtn");

    if(backBtn){

        backBtn.onclick=function(){

            location.href="wealth.html";

        };

    }

    const btn=document.getElementById("calculateCompound");

    if(btn){

        btn.addEventListener("click",calculateCompound);

    }

});

// ======================================
// 複利計算
// ======================================

function calculateCompound(){

    const monthly=

        Number(document.getElementById("monthlyAmount").value);

    const rate=

        Number(document.getElementById("annualRate").value);

    const years=

        Number(document.getElementById("investmentYears").value);

    if(

        monthly<=0 ||

        rate<=0 ||

        years<=0

    ){

        alert("請完整輸入資料");

        return;

    }

    const monthlyRate=rate/100/12;

    const months=years*12;

    const futureValue=

        monthly*

        (

            (Math.pow(1+monthlyRate,months)-1)

            /monthlyRate

        )*

        (1+monthlyRate);

    const principal=

        monthly*months;

    const profit=

        futureValue-principal;

    showCompoundResult(

        principal,

        futureValue,

        profit,

        rate,

        years

    );

}
// ======================================
// 顯示計算結果
// ======================================

function showCompoundResult(

    principal,

    futureValue,

    profit,

    rate,

    years

){

    const result=document.getElementById("compoundResult");

    if(!result){

        return;

    }

    result.innerHTML=`

        <h3>📊 計算結果</h3>

        <p>

        💰 投入本金

        <br>

        ${Math.round(principal).toLocaleString()} 元

        </p>

        <p>

        📈 預估資產

        <br>

        ${Math.round(futureValue).toLocaleString()} 元

        </p>

        <p>

        🪙 累積獲利

        <br>

        ${Math.round(profit).toLocaleString()} 元

        </p>

        <p>

        📅 投資期間

        <br>

        ${years} 年

        </p>

        <p>

        📊 年化報酬率

        <br>

        ${rate} %

        </p>

        <hr>

        <h3>

        時間 × 紀律 × 複利 = 財富

        </h3>

    `;

    showCompoundPreview(

        principal,

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

    const box=document.getElementById("compoundPreview");

    if(!box){

        return;

    }

    const monthlyRate=rate/100/12;

    let html="";

    [5,10,15,20,25,30].forEach(function(year){

        const months=year*12;

        const value=

            monthly*

            (

                (Math.pow(1+monthlyRate,months)-1)

                /monthlyRate

            )*

            (1+monthlyRate);

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

console.log("Wealth Module v1.0 Ready");
// ======================================
// 財富里程碑
// ======================================

function getGoalYear(

    monthly,

    rate,

    target

){

    const monthlyRate=rate/100/12;

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

        money:money

    };

}
// ======================================
// Asset
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    if(document.getElementById("saveAsset")){

        initAsset();

    }

});

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

    const data=JSON.parse(

        localStorage.getItem("assetData") ||

        "{}"

    );

    if(data.cash!==undefined){

        document.getElementById("cashValue").value=data.cash;

        document.getElementById("depositValue").value=data.deposit;

        document.getElementById("investValue").value=data.invest;

        document.getElementById("otherValue").value=data.other;

        document.getElementById("assetResult").innerHTML=`

            <h3>💰 總資產</h3>

            <h2>

            ${data.total.toLocaleString()} 元

            </h2>

        `;

    }

}

console.log("Asset Module Ready");
