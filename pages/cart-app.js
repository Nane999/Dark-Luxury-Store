const zambyuxiKontayner = document.getElementById('cart-items-container');
const yndhanurGumarElement = document.getElementById('cart-total-price');
const hasceiGrutyun = document.getElementById('selected-address-text');
const patverKotak = document.getElementById('checkout-btn');

const pahvacZambyux = localStorage.getItem('zambyux');
let zambyuxiApranqner = [];

if (pahvacZambyux) {
  zambyuxiApranqner = JSON.parse(pahvacZambyux);
}

let yntacikArzhuyt = localStorage.getItem('arzhuyt');
if (!yntacikArzhuyt) {
  yntacikArzhuyt = 'USD';
}

let yntacikHascen = localStorage.getItem('hasce');
if (!yntacikHascen) {
  yntacikHascen = 'Հասցե նշված չէ';
}

hasceiGrutyun.textContent = 'Առաքման հասցե՝ ' + yntacikHascen;

function gumaricHashovark() {
  if (zambyuxiApranqner.length == 0) {
    zambyuxiKontayner.innerHTML = '<p class="empty-cart-text">Ձեր զամբյուղը դատարկ է:</p>';
    yndhanurGumarElement.textContent = 'Ընդհանուր՝ 0 ' + stanalArzhuytiNshane(yntacikArzhuyt);
    return;
  }

  let html = '';
  let yndhanurGumar = 0;

  zambyuxiApranqner.forEach(function (apranq, indeks) {
    let poxvacGin = poxarkelGine(apranq.price, yntacikArzhuyt);
    let apranqiGumar = poxvacGin * apranq.quantity;
    yndhanurGumar = yndhanurGumar + apranqiGumar;

    html = html +
      '<div class="cart-item-card">' +
      '<img src="' + apranq.thumbnail + '" alt="' + apranq.title + '" class="cart-item-img">' +
      '<div class="cart-item-info">' +
      '<h4>' + apranq.title + '</h4>' +
      '<p>Գինը՝ ' + poxvacGin + ' ' + stanalArzhuytiNshane(yntacikArzhuyt) + '</p>' +
      '</div>' +
      '<div class="cart-item-qty">Քանակ՝ ' + apranq.quantity + '</div>' +
      '<button class="cart-add-btn remove-item" data-index="' + indeks + '">Հեռացնել</button>' +
      '</div>';
  });

  zambyuxiKontayner.innerHTML = html;
  yndhanurGumarElement.textContent = 'Ընդհանուր՝ ' + yndhanurGumar + ' ' + stanalArzhuytiNshane(yntacikArzhuyt);

  const heracmanKotakner = zambyuxiKontayner.querySelectorAll('.remove-item');
  heracmanKotakner.forEach(function (kotak) {
    kotak.addEventListener('click', function () {
      let idx = parseInt(kotak.getAttribute('data-index'));
      zambyuxiApranqner.splice(idx, 1);
      localStorage.setItem('zambyux', JSON.stringify(zambyuxiApranqner));
      gumaricHashovark();
    });
  });
}

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

patverKotak.addEventListener('click', function () {
  if (zambyuxiApranqner.length == 0) {
    alert('Զամբյուղը դատարկ է:');
    return;
  }
  alert('Պատվերը հաջողությամբ ձևակերպվեց։ Շնորհակալություն գնման համար։');
  localStorage.removeItem('zambyux');
  zambyuxiApranqner = [];
  gumaricHashovark();
});

gumaricHashovark();

