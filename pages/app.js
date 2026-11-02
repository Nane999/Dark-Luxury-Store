import { bernelTargmanutyunner } from './lang.js';
import { stanalKargerianer, stanalApranqner, stanalMekApranq } from './api.js';
import { lcnelKargerianer, tsucadrelApranqner, tsucadrelMekApranq, karelShowMoreKotak, cuycTalSxal } from './ui.js';

let bolorApranqner = [];
let yntacikKargeria = '';
let yntacikVoronum = '';
let cucadrvoxQanak = 8;

const voronmanDash = document.getElementById('voronman-dash');
const kargeriSelect = document.getElementById('kargeri-select');
const arzhuytSelect = document.getElementById('currency-select');
const hasceSelect = document.getElementById('address-select');
const avelacnelKotak = document.getElementById('show-more-btn');
const manramasnPatuhan = document.getElementById('product-modal');
const phakeluKotak = document.querySelector('.close-btn');

const navPahunakner = document.querySelectorAll('.nav-btn .badge');
const sritikHashvich = navPahunakner[0];
const zambyuxHashvich = document.getElementById('cart-count');

let yntacikArzhuyt = localStorage.getItem('arzhuyt');
if (!yntacikArzhuyt) {
  yntacikArzhuyt = 'USD';
}

let yntacikHascen = localStorage.getItem('hasce');
if (!yntacikHascen) {
  yntacikHascen = '';
}

arzhuytSelect.value = yntacikArzhuyt;
if (yntacikHascen) {
  hasceSelect.value = yntacikHascen;
}

let srtikneriQanak = 0;

const pahvacZambyux = localStorage.getItem('zambyux');
let zambyuxiApranqner = [];
if (pahvacZambyux) {
  zambyuxiApranqner = JSON.parse(pahvacZambyux);
}

zambyuxHashvich.textContent = hashvarkelZambyuxiQanak();

function hashvarkelZambyuxiQanak() {
  let qanak = 0;
  zambyuxiApranqner.forEach(function (apranq) {
    qanak = qanak + apranq.quantity;
  });
  return qanak;
}

function erbSexmumenApranqiVra(id) {
  location.href = 'product.html?id=' + id;
}

function erbSexmumenZambyuxin(id) {
  let gtvacApranq = null;
  bolorApranqner.forEach(function (item) {
    if (item.id == parseInt(id)) {
      gtvacApranq = item;
    }
  });

  if (!gtvacApranq) {
    return;
  }

  let zambyuxiApranq = null;
  zambyuxiApranqner.forEach(function (item) {
    if (item.id == gtvacApranq.id) {
      zambyuxiApranq = item;
    }
  });

  if (zambyuxiApranq) {
    zambyuxiApranq.quantity = zambyuxiApranq.quantity + 1;
  } else {
    zambyuxiApranqner.push({
      id: gtvacApranq.id,
      title: gtvacApranq.title,
      price: gtvacApranq.price,
      thumbnail: gtvacApranq.thumbnail,
      quantity: 1
    });
  }

  localStorage.setItem('zambyux', JSON.stringify(zambyuxiApranqner));
  zambyuxHashvich.textContent = hashvarkelZambyuxiQanak();
}

function erbSexmumenSrtikin(isAdded) {
  if (isAdded) {
    srtikneriQanak = srtikneriQanak + 1;
  } else {
    if (srtikneriQanak > 0) {
      srtikneriQanak = srtikneriQanak - 1;
    }
  }
  sritikHashvich.textContent = srtikneriQanak;
}

arzhuytSelect.addEventListener('change', function () {
  yntacikArzhuyt = arzhuytSelect.value;
  localStorage.setItem('arzhuyt', yntacikArzhuyt);
  bernelApranqner();
});

hasceSelect.addEventListener('change', function () {
  yntacikHascen = hasceSelect.value;
  localStorage.setItem('hasce', yntacikHascen);
});

function poxarkelGine(ginUSD, arzhuyt) {
  if (arzhuyt == 'AMD') {
    return ginUSD * 400;
  } else if (arzhuyt == 'RUB') {
    return ginUSD * 95;
  }
  return ginUSD;
}

function stanalArzhuytiNshane(arzhuyt) {
  if (arzhuyt == 'AMD') return '֏';
  if (arzhuyt == 'RUB') return '₽';
  return '$';
}

function bernelKargerianer() {
  stanalKargerianer()
    .then(function (kargerianer) {
      lcnelKargerianer(kargerianer);
    })
    .catch(function (sxal) {
      console.log('Կատեգորիաների սխալ:', sxal);
    });
}

function bernelApranqner() {
  let url = 'https://dummyjson.com/products';
  if (yntacikVoronum !== '') {
    url = 'https://dummyjson.com/products/search?q=' + yntacikVoronum;
  } else {
    if (yntacikKargeria !== '') {
      url = 'https://dummyjson.com/products/category/' + yntacikKargeria;
    }
  }

  stanalApranqner(url)
    .then(function (tvyalner) {
      bolorApranqner = tvyalner.products;

      bolorApranqner.forEach(function (aprang) {
        aprang.displayPrice = poxarkelGine(aprang.price, yntacikArzhuyt);
        aprang.symbol = stanalArzhuytiNshane(yntacikArzhuyt);
      });

      let mas = bolorApranqner.slice(0, cucadrvoxQanak);
      tsucadrelApranqner(
        mas,
        erbSexmumenApranqiVra,
        function (id) {
          erbSexmumenZambyuxin(id);
        },
        erbSexmumenSrtikin
      );

      bernelTargmanutyunner();
      karelShowMoreKotak(bolorApranqner.length, cucadrvoxQanak);
    })
    .catch(function (sxal) {
      console.log('Ապրանքների բեռնման սխալ:', sxal);
      cuycTalSxal();
    });
}

avelacnelKotak.addEventListener('click', function () {
  cucadrvoxQanak = cucadrvoxQanak + 8;
  let mas = bolorApranqner.slice(0, cucadrvoxQanak);
  tsucadrelApranqner(
    mas,
    erbSexmumenApranqiVra,
    function (id) {
      erbSexmumenZambyuxin(id);
    },
    erbSexmumenSrtikin
  );
  bernelTargmanutyunner();
  karelShowMoreKotak(bolorApranqner.length, cucadrvoxQanak);
});

voronmanDash.addEventListener('input', function () {
  yntacikVoronum = voronmanDash.value;
  yntacikKargeria = '';
  kargeriSelect.value = '';
  cucadrvoxQanak = 8;
  bernelApranqner();
});

kargeriSelect.addEventListener('change', function () {
  yntacikKargeria = kargeriSelect.value;
  yntacikVoronum = '';
  voronmanDash.value = '';
  cucadrvoxQanak = 8;
  bernelApranqner();
});

phakeluKotak.addEventListener('click', function () {
  manramasnPatuhan.className = 'modal';
});

bernelKargerianer();
bernelApranqner();