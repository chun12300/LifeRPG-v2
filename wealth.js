// ======================================
// Wealth Module v2.2 (Fixed)
// ======================================

// ======================================
// 共用工具
// ======================================

function formatMoney(value) {
    if (isNaN(value)) return "0 元";
    return Math.round(value).toLocaleString() + " 元";
}

// ======================================
// 複利計算
// ======================================

function calculateCompound() {
    const monthly = Number(document.getElementById("monthlyAmount").value);
    const rate = Number(document.getElementById("annualRate").value);
    const years = Number(document.getElementById("investmentYears").value);

    if (
        isNaN(monthly) || isNaN(rate) || isNaN(years) ||
        monthly <= 0 || rate <= 0 || years <= 0
    ) {
        alert("請完整輸入資料");
        return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const futureValue =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

    const principal = monthly * months;
    const profit = futureValue - principal;

    showCompoundResult(monthly, principal, futureValue, profit, rate, years);
}

// ======================================
// 顯示結果
// ======================================

function showCompoundResult(monthly, principal, futureValue, profit, rate, years) {
    const box = document.getElementById("compoundResult");
    if (!box) return;

    box.innerHTML = `
        <h3>📈 複利試算結果</h3>
        <p>
            💵 每月投入
            <br>
            ${formatMoney(monthly)}
        </p>
        <hr>
        <p>
            💰 投入本金
            <br>
            ${formatMoney(principal)}
        </p>
        <hr>
        <p>
            🏦 最終資產
            <br>
            ${formatMoney(futureValue)}
        </p>
        <hr>
        <p>
            📈 總收益
            <br>
            ${formatMoney(profit)}
        </p>
        <hr>
        <p>
            📅 投資年數
            <br>
            ${years} 年
        </p>
        <hr>
        <p>
            📈 年化報酬率
            <br>
            ${rate} %
        </p>
        <hr>
        <h3>時間 × 紀律 × 複利 = 財富</h3>
    `;

    showCompoundPreview(monthly, rate);
}

// ======================================
// 成長預覽
// ======================================

function showCompoundPreview(monthly, rate) {
    const box = document.getElementById("compoundPreview");
    if (!box) return;

    const monthlyRate = rate / 100 / 12;
    let html = "";

    [5, 10, 15, 20, 25, 30].forEach(function (year) {
        const months = year * 12;
        const value =
            monthly *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);

        html += `
        <div class="record-item">
            <strong>${year} 年後</strong>
            <br>
            💰 ${formatMoney(value)}
        </div>
        `;
    });

    box.innerHTML = html;
}

// ======================================
// 財富里程碑
// ======================================

function getGoalYear(monthly, rate, target) {
    const monthlyRate = rate / 100 / 12;
    let month = 0;
    let money = 0;

    while (money < target && month < 1200) {
        money = (money + monthly) * (1 + monthlyRate);
        month++;
    }

    return {
        year: (month / 12).toFixed(1),
        money: Math.round(money)
    };
}

// ======================================
// 資產管理
// ======================================

function initAsset() {
    loadAsset();

    const saveBtn = document.getElementById("saveAsset");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveAsset);
    }
}

function saveAsset() {
    const cash = Number(document.getElementById("cashValue").value) || 0;
    const deposit = Number(document.getElementById("depositValue").value) || 0;
    const invest = Number(document.getElementById("investValue").value) || 0;
    const other = Number(document.getElementById("otherValue").value) || 0;

    const total = cash + deposit + invest + other;

    const data = { cash, deposit, invest, other, total };

    localStorage.setItem("assetData", JSON.stringify(data));

    loadAsset();
}

function loadAsset() {
    const data = JSON.parse(localStorage.getItem("assetData") || "{}");

    const cash = data.cash || 0;
    const deposit = data.deposit || 0;
    const invest = data.invest || 0;
    const other = data.other || 0;
    const total = data.total !== undefined ? data.total : cash + deposit + invest + other;

    const cashInput = document.getElementById("cashValue");
    const depositInput = document.getElementById("depositValue");
    const investInput = document.getElementById("investValue");
    const otherInput = document.getElementById("otherValue");

    if (cashInput) cashInput.value = data.cash !== undefined ? data.cash : "";
    if (depositInput) depositInput.value = data.deposit !== undefined ? data.deposit : "";
    if (investInput) investInput.value = data.invest !== undefined ? data.invest : "";
    if (otherInput) otherInput.value = data.other !== undefined ? data.other : "";

    const resultBox = document.getElementById("assetResult");
    if (resultBox) {
        resultBox.innerHTML = `
            <h3>💰 總資產</h3>
            <h2>${formatMoney(total)}</h2>
        `;
    }
}

// ======================================
// 記帳
// ======================================

function initAccount() {
    loadAccount();

    const saveBtn = document.getElementById("saveAccount");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveAccount);
    }
}

function saveAccount() {
    const type = document.getElementById("accountType").value;
    const money = Number(document.getElementById("accountMoney").value);
    const title = document.getElementById("accountTitle").value.trim();
    const note = document.getElementById("accountNote").value.trim();

    if (isNaN(money) || money <= 0) {
        alert("請輸入有效金額");
        return;
    }

    if (title === "") {
        alert("請輸入項目");
        return;
    }

    const now = new Date();

    const record = {
        id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        type: type,
        money: money,
        title: title,
        note: note,
        date:
            now.getFullYear() + "/" +
            String(now.getMonth() + 1).padStart(2, "0") + "/" +
            String(now.getDate()).padStart(2, "0"),
        time:
            String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0")
    };

    const list = JSON.parse(localStorage.getItem("accountList") || "[]");
    list.unshift(record);
    localStorage.setItem("accountList", JSON.stringify(list));

    document.getElementById("accountMoney").value = "";
    document.getElementById("accountTitle").value = "";
    document.getElementById("accountNote").value = "";

    loadAccount();
}

function loadAccount() {
    const box = document.getElementById("accountList");
    if (!box) return;

    const list = JSON.parse(localStorage.getItem("accountList") || "[]");

    if (list.length === 0) {
        box.innerHTML = "尚無紀錄";
        updateAccountSummary(list);
        return;
    }

    let html = "";

    list.forEach(function (item) {
        html += `
        <div class="record-item">
            <div class="record-date">
            📅 ${item.date}
            🕒 ${item.time}
            </div>
            <div class="record-title">
            ${item.type === "income" ? "💰 收入" : "💸 支出"}
            </div>
            <div class="record-content">
            ${item.title}
            <br><br>
            ${formatMoney(item.money)}
            ${item.note ? "<br><br>📝 " + item.note : ""}
            </div>
            <button
            class="record-delete"
            onclick="deleteAccount('${item.id}')">
            🗑️ 刪除紀錄
            </button>
        </div>
        `;
    });

    box.innerHTML = html;
    updateAccountSummary(list);
}

function deleteAccount(id) {
    if (!confirm("確定刪除這筆紀錄？")) return;

    let list = JSON.parse(localStorage.getItem("accountList") || "[]");
    list = list.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem("accountList", JSON.stringify(list));
    loadAccount();
}

// ======================================
// 更新統計（並同步資產現金）
// ======================================

function updateAccountSummary(list) {
    const box = document.getElementById("accountSummary");
    if (!box) return;

    let income = 0;
    let expense = 0;

    list.forEach(function (item) {
        if (item.type === "income") {
            income += item.money;
        } else {
            expense += item.money;
        }
    });

    const balance = income - expense;

    box.innerHTML = `
        💰 收入
        <br>
        ${formatMoney(income)}
        <br><br>
        💸 支出
        <br>
        ${formatMoney(expense)}
        <br><br>
        💵 結餘
        <br>
        ${formatMoney(balance)}
    `;

    // 同步更新資產現金
    let asset = JSON.parse(localStorage.getItem("assetData") || "{}");

    asset.cash = balance;
    asset.total =
        asset.cash +
        (asset.deposit || 0) +
        (asset.invest || 0) +
        (asset.other || 0);

    localStorage.setItem("assetData", JSON.stringify(asset));
}

// ======================================
// 返回上一頁 / 返回首頁
// ======================================

function initNavButtons() {
    const backBtn = document.getElementById("backBtn");
    const homeBtn = document.getElementById("homeBtn");

    // backBtn 預設回 wealth.html；若該頁想回別處，
    // 在 HTML 上加 data-back="目標頁面.html" 即可覆寫（例如 wealth.html 本身要回 dashboard.html）
    if (backBtn) {
        const backTarget = backBtn.dataset.back || "wealth.html";
        backBtn.onclick = function () {
            location.href = backTarget;
        };
    }

    if (homeBtn) {
        const homeTarget = homeBtn.dataset.back || "dashboard.html";
        homeBtn.onclick = function () {
            location.href = homeTarget;
        };
    }
}

// ======================================
// 初始化
// ======================================

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("saveAccount")) {
        initAccount();
    }

    if (document.getElementById("saveAsset")) {
        initAsset();
    }

    const calcBtn = document.getElementById("calculateCompound");
    if (calcBtn) {
        calcBtn.addEventListener("click", calculateCompound);
    }

    initNavButtons();
});

console.log("Compound Module Ready");
console.log("Asset Module Ready");
console.log("Account Module Ready");
console.log("Nav Module Ready");
console.log("Wealth Module v2.3 Ready");
