import { stanalMekApranq } from './api.js';

const apranqiTarats = document.getElementById('apranqi-manramasn-tarats');

const hasceiGrutyun = location.search;
const maser = hasceiGrutyun.split('=');
const apranqiId = parseInt(maser[1]);

function bernelManramasn() {
  stanalMekApranq(apranqiId)
    .then(function(apranq) {
      let karciqneriHtml = '';

      if (apranq.reviews) {
        if (apranq.reviews.length > 0) {
          apranq.reviews.forEach(function(karciq) {
            karciqneriHtml = karciqneriHtml + 
              '<div class="review-card">' +
                '<div class="review-header">' +
                  '<strong><i class="fa-solid fa-user"></i> ' + karciq.reviewerName + '</strong>' +
                  '<span><i class="fa-solid fa-star"></i> ' + karciq.rating + '</span>' +
                '</div>' +
                '<p class="review-comment">' + karciq.comment + '</p>' +
              '</div>';
          });
        } else {
          karciqneriHtml = '<p>Այս ապրանքը դեռ կարծիքներ չունի:</p>';
        }
      } else {
        karciqneriHtml = '<p>Այս ապրանքը դեռ կարծիքներ չունի:</p>';
      }

      apranqiTarats.innerHTML = 
        '<div class="detail-flex">' +
          '<img src="' + apranq.thumbnail + '" alt="' + apranq.title + '" class="detail-img">' +
          '<div class="detail-info">' +
            '<h2>' + apranq.title + '</h2>' +
            '<p>' + apranq.description + '</p>' +
            '<p><strong>Կատեգորիա՝</strong> ' + apranq.category + '</p>' +
            '<p class="modal-price">Գինը՝ ' + apranq.price + ' $</p>' +
            '<p class="card-rating"><i class="fa-solid fa-star"></i> ' + apranq.rating + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="reviews-section">' +
          '<h3>Հաճախորդների կարծիքները</h3>' +
          karciqneriHtml +
        '</div>';
    })
    .catch(function(sxal) {
      console.log('Տվյալների բեռնման սխալ:', sxal);
      apranqiTarats.innerHTML = '<p class="error-message">Տվյալները չհաջողվեց բեռնել:</p>';
    });
}

bernelManramasn();