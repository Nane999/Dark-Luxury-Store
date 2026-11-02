const productsContainer = document.getElementById('products-container');
const avelacnelKotakContainer = document.querySelector('.load-more-container');
const kargeriSelect = document.getElementById('kargeri-select');
const manramasnPatuhan = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');

export function lcnelKargerianer(kargerianer) {
  let html = '<option value="" data-i18n="allCategories">Բոլոր կատեգորիաները</option>';
  kargerianer.forEach(function (cat) {
    let catName = '';
    let catDisplayName = '';

    if (typeof cat == 'object') {
      catName = cat.slug;
      catDisplayName = cat.name;
    } else {
      catName = cat;
      catDisplayName = cat;
    }

    html = html + '<option value="' + catName + '">' + catDisplayName + '</option>';
  });

  kargeriSelect.innerHTML = html;
}

export function tsucadrelApranqner(apranqner, clickCallback, onCartClick, onHeartClick) {
  let html = '';

  if (apranqner.length == 0) {
    html = '<p class="no-products-msg" data-i18n="noProducts">Ապրանքներ չեն գտնվել</p>';
    productsContainer.innerHTML = html;
    return;
  }

  apranqner.forEach(function (aprang) {
    let discountHtml = '';
    if (aprang.discountPercentage) {
      discountHtml = '<div class="badge-discount">-' + Math.round(aprang.discountPercentage) + '%</div>';
    }

    html = html +
      '<div class="card">' +
      discountHtml +
      '<div class="card-heart"><i class="fa-regular fa-heart"></i></div>' +
      '<div class="card-img-wrapper" data-id="' + aprang.id + '">' +
      '<img src="' + aprang.thumbnail + '" alt="' + aprang.title + '">' +
      '</div>' +
      '<h3 data-id="' + aprang.id + '">' + aprang.title + '</h3>' +
      '<div class="card-rating"><i class="fa-solid fa-star"></i> ' + aprang.rating + '</div>' +
      '<div class="card-footer">' +
      '<p class="card-price">' + aprang.displayPrice + ' ' + aprang.symbol + '</p>' +
      '<button class="cart-add-btn" data-i18n="addToCart" data-id="' + aprang.id + '">+ Զամբյուղ</button>' +
      '</div>' +
      '</div>';
  });

  productsContainer.innerHTML = html;

  const cardElements = productsContainer.querySelectorAll('.card');
  cardElements.forEach(function (card) {
    const heartBtn = card.querySelector('.card-heart');
    const imgWrapper = card.querySelector('.card-img-wrapper');
    const titleEl = card.querySelector('h3');
    const addBtn = card.querySelector('.cart-add-btn');

    heartBtn.addEventListener('click', function () {
      heartBtn.classList.toggle('active-heart');
      const isAdded = heartBtn.classList.contains('active-heart');
      onHeartClick(isAdded);
    });

    imgWrapper.addEventListener('click', function () {
      const id = imgWrapper.getAttribute('data-id');
      clickCallback(id);
    });

    titleEl.addEventListener('click', function () {
      const id = titleEl.getAttribute('data-id');
      clickCallback(id);
    });

    addBtn.addEventListener('click', function () {
      const id = addBtn.getAttribute('data-id');
      onCartClick(id);
    });
  });
}

export function tsucadrelMekApranq(aprang, onCartClick) {
  let discountHtml = '';
  if (aprang.discountPercentage) {
    discountHtml = '<p class="modal-discount">Զեղչ: -' + Math.round(aprang.discountPercentage) + '%</p>';
  }

  let html =
    '<div class="modal-wrapper">' +
    '<img src="' + aprang.thumbnail + '" alt="' + aprang.title + '" class="modal-img">' +
    '<div class="modal-info">' +
    '<h2>' + aprang.title + '</h2>' +
    '<p class="modal-desc">' + aprang.description + '</p>' +
    discountHtml +
    '<p class="modal-price">' + aprang.price + ' $</p>' +
    '<div class="card-rating"><i class="fa-solid fa-star"></i> ' + aprang.rating + '</div>' +
    '<button class="cart-add-btn modal-btn" id="modal-add-btn" data-id="' + aprang.id + '">+ Ավելացնել զամբյուղ</button>' +
    '</div>' +
    '</div>';

  modalBody.innerHTML = html;
  manramasnPatuhan.className = 'modal active-modal';

  const modalAddBtn = document.getElementById('modal-add-btn');
  modalAddBtn.addEventListener('click', function () {
    onCartClick(aprang.id);
  });
}

export function karelShowMoreKotak(totalLength, cucadrvoxQanak) {
  if (cucadrvoxQanak >= totalLength) {
    avelacnelKotakContainer.classList.add('hidden');
  } else {
    avelacnelKotakContainer.classList.remove('hidden');
  }
}

export function cuycTalSxal() {
  productsContainer.innerHTML = '<p class="error-msg" data-i18n="errorLoading">Տեղի ունեցավ սխալ ապրանքների բեռնման ժամանակ:</p>';
}