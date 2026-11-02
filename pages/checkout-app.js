const qartiHamariDash = document.getElementById('card-number');
const qartiZhamketiDash = document.getElementById('card-expiry');
const qartiCvvDash = document.getElementById('card-cvv');
const vcharmanKozhak = document.getElementById('pay-btn');
const hajoxutyanHaxordagrutyanKotak = document.getElementById('success-msg-container');

let pahvacQart = JSON.parse(localStorage.getItem('saved_card_data'));
if (pahvacQart) {
  qartiHamariDash.value = pahvacQart.number || '';
  qartiZhamketiDash.value = pahvacQart.expiry || '';
  qartiCvvDash.value = pahvacQart.cvv || '';
}

vcharmanKozhak.addEventListener('click', function () {
  let qartiTvyalner = {
    number: qartiHamariDash.value,
    expiry: qartiZhamketiDash.value,
    cvv: qartiCvvDash.value
  };
  localStorage.setItem('saved_card_data', JSON.stringify(qartiTvyalner));

  let zambyugh = JSON.parse(localStorage.getItem('zambyux')) || [];

  if (zambyugh.length > 0) {
    let patverner = JSON.parse(localStorage.getItem('luxury_orders')) || [];
    let norPatver = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: zambyugh,
      address: localStorage.getItem('hasce') || 'Yerevan'
    };
    patverner.push(norPatver);
    localStorage.setItem('luxury_orders', JSON.stringify(patverner));
    localStorage.removeItem('zambyux');
  }

  hajoxutyanHaxordagrutyanKotak.innerHTML = 
    '<p class="success-text">Վճարումը հաջողությամբ իրականացվեց։ Շնորհակալություն գնումների համար։</p>' +
    '<a href="orders.html" class="back-btn success-link">' +
      '<i class="fa-solid fa-arrow-left"></i> Անցնել Իմ պատվերներ' +
    '</a>';
});