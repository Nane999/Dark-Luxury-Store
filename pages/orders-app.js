const patverneriKotak = document.getElementById('orders-container');

function stanalPatverner() {
    let dataner = localStorage.getItem('luxury_orders');
    if (dataner) {
        return JSON.parse(dataner);
    }
    return [];
}

function cucadrelPatverner() {
    let patverner = stanalPatverner();

    if (patverner.length == 0) {
        patverneriKotak.innerHTML = '<p class="empty-orders-text">Դուք դեռևս չունեք կատարված պատվերներ</p>';
        return;
    }

    let html = '';

    for (let i = 0; i < patverner.length; i++) {
        let patver = patverner[i];
        let apranqneriHtml = '';
        let miasnakanGumar = 0;

        for (let j = 0; j < patver.items.length; j++) {
            let item = patver.items[j];
            let qanak = item.quantity;
            if (!qanak) {
                qanak = 1;
            }
            let gine = item.price * qanak;
            miasnakanGumar = miasnakanGumar + gine;

            apranqneriHtml = apranqneriHtml + 
            '<div class="order-item-row">' +
                '<img src="' + item.thumbnail + '" alt="' + item.title + '" class="order-item-img">' +
                '<div class="order-item-info">' +
                    '<h4>' + item.title + '</h4>' +
                    '<p>Քանակ՝ ' + qanak + ' | Արժեքը՝ ' + gine + ' $</p>' +
                '</div>' +
            '</div>';
        }

        let hertakanNomar = i + 1;
        html = html + 
        '<div class="order-card">' +
            '<div class="order-header">' +
                '<h3>Պատվեր #' + hertakanNomar + ' (ID: ' + patver.id + ')</h3>' +
                '<span class="order-date"><i class="fa-regular fa-calendar"></i> ' + patver.date + '</span>' +
            '</div>' +
            '<p class="order-address">' +
                '<i class="fa-solid fa-location-dot"></i> Առաքման հասցե՝ ' + patver.address +
            '</p>' +
            '<div class="order-items-list">' + apranqneriHtml + '</div>' +
            '<div class="order-footer-total">' +
                '<span>Ընդհանուր գումար՝</span>' +
                '<span class="order-total-price">' + miasnakanGumar + ' $</span>' +
            '</div>' +
        '</div>';
    }

    patverneriKotak.innerHTML = html;
}

cucadrelPatverner();