// ======================================
// LifeRPG Beta
// ETF Module v1.0
// ======================================

console.log("ETF Module Loaded");

// ======================================
// 初始化
// ======================================

document.addEventListener("DOMContentLoaded",function(){

    document
        .getElementById("calculateETF")
        .addEventListener("click",calculateETF);

});

// ======================================
// ETF 試算
// ======================================

function calculateETF(){

    const name=
        document.getElementById("etfName").value.trim();

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

    if(monthly<=0||rate<=0||years<=0){

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

        )*(1+monthlyRate);

    const principal=

        monthly*months;

    const profit=

        futureValue-principal;

    showETFResult(

        name,

        principal,

        futureValue,

        profit,

        rate,

        years,

        monthly

    );

}

// ======================================
// 顯示結果
// ======================================

function showETFResult(

    name,

    principal,

    futureValue,

    profit,

    rate,

    years,

    monthly

){

    document.getElementById("etfResult").innerHTML=`

        <h3>

        📈 ${name || "ETF"} 試算結果

        </h3>

        <p>

        💰 投入本金

        <br>

        ${Math.round(principal).toLocaleString()} 元

        </p>

        <p>

        📊 預估資產

        <br>

        ${Math.round(futureValue).toLocaleString()} 元

        </p>

        <p>

        🪙 預估獲利

        <br>

        ${Math.round(profit).toLocaleString()} 元

        </p>

        <p>

        📅 投資期間

        <br>

        ${years} 年

        </p>

        <p>

        📈 年化報酬率

        <br>

        ${rate} %

        </p>

    `;

    showPreview(

        monthly,

        rate

    );

}

// ======================================
// 成長預覽
// ======================================

function showPreview(

    monthly,

    rate

){

    let html="";

    const monthlyRate=
        rate/100/12;

    [5,10,15,20,25,30].forEach(function(year){

        const value=

            monthly*

            (

                (Math.pow(

                    1+monthlyRate,

                    year*12

                )-1)

                /monthlyRate

            )*(1+monthlyRate);

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

    document.getElementById("etfPreview").innerHTML=html;

}

console.log("ETF Module Ready");
