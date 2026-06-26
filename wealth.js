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
