// ===================================
// food_distance.js
// 共用：定位 + 距離計算 + 排序 + 篩選
// ===================================

// Haversine 公式：計算地球表面兩點間的距離（公里）
function calcDistanceKm(lat1, lng1, lat2, lng2) {
    var R = 6371; // 地球半徑（公里）
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// 初始化某個分類頁的距離功能
// restaurantList: 該分類的店家陣列 [{ name, lat, lng, address, note, price }]
// renderFn: 收到「已排序＋已標註距離」的店家清單後，要怎麼畫出畫面（由各頁面自己定義）
function initFoodDistance(restaurantList, renderFn) {
    var statusBox = document.getElementById("locationStatus");
    var filterSelect = document.getElementById("distanceFilter");

    var userLat = null;
    var userLng = null;

    function renderWithDistance() {
        var filterValue = filterSelect ? filterSelect.value : "all";

        var withDistance = restaurantList.map(function (item) {
            var distance = null;
            if (userLat !== null && userLng !== null) {
                distance = calcDistanceKm(userLat, userLng, item.lat, item.lng);
            }
            return Object.assign({}, item, { distance: distance });
        });

        // 依距離排序（近到遠），沒有距離資料的排最後
        withDistance.sort(function (a, b) {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
        });

        // 篩選距離範圍
        if (filterValue !== "all" && userLat !== null) {
            var maxKm = parseFloat(filterValue);
            withDistance = withDistance.filter(function (item) {
                return item.distance !== null && item.distance <= maxKm;
            });
        }

        renderFn(withDistance);
    }

    function onLocationSuccess(position) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;

        if (statusBox) {
            statusBox.innerHTML = "📍 已取得你的位置，店家依距離排序顯示";
        }

        renderWithDistance();
    }

    function onLocationError() {
        if (statusBox) {
            statusBox.innerHTML = "⚠️ 無法取得你的位置（可能拒絕了定位授權），將以原始順序顯示店家";
        }
        renderWithDistance();
    }

    if (navigator.geolocation) {
        if (statusBox) {
            statusBox.innerHTML = "📍 正在取得你的位置...";
        }
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    } else {
        if (statusBox) {
            statusBox.innerHTML = "⚠️ 你的瀏覽器不支援定位功能";
        }
        renderWithDistance();
    }

    if (filterSelect) {
        filterSelect.onchange = renderWithDistance;
    }
}
