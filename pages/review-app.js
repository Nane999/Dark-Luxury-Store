const anunicDash = document.getElementById('reviewer-name');
const karciqicDash = document.getElementById('reviewer-text');
const astxericDash = document.getElementById('reviewer-rating');
const uxarkeluKozhak = document.getElementById('submit-review-btn');
const karciqneriKotak = document.getElementById('reviews-container');

function stanalKarciqner() {
    let dataner = localStorage.getItem('luxury_reviews');
    if (dataner) {
        return JSON.parse(dataner);
    }
    return [];
}

function pahpanelKarciqner(karciqneriMasiv) {
    localStorage.setItem('luxury_reviews', JSON.stringify(karciqneriMasiv));
}

function cucadrelKarciqner() {
    let masiv = stanalKarciqner();

    if (masiv.length == 0) {
        karciqneriKotak.innerHTML = '<p class="empty-reviews-text">Դեռևս կարծիքներ չկան։ Եղեք առաջինը:</p>';
        return;
    }

    let html = '';

    for (let i = 0; i < masiv.length; i++) {
        let karciq = masiv[i];
        let astxeriqanak = '';

        for (let j = 0; j < karciq.rating; j++) {
            astxeriqanak = astxeriqanak + '<i class="fa-solid fa-star"></i>';
        }

        html = html + 
        '<div class="review-card">' +
            '<div class="review-author">' + karciq.name + '</div>' +
            '<div class="review-stars">' + astxeriqanak + '</div>' +
            '<p class="review-text">' + karciq.text + '</p>' +
        '</div>';
    }

    karciqneriKotak.innerHTML = html;
}

uxarkeluKozhak.addEventListener('click', function () {
    let anun = anunicDash.value;
    let grvacTexst = karciqicDash.value;
    let gnahatak = astxericDash.value;

    if (anun == '') {
        alert('Խնդրում ենք լրացնել ձեր անունը');
        return;
    }

    if (grvacTexst == '') {
        alert('Խնդրում ենք գրել կարծիքը');
        return;
    }

    let norKarciq = {
        name: anun,
        text: grvacTexst,
        rating: gnahatak
    };

    let karciqner = stanalKarciqner();
    karciqner.push(norKarciq);
    pahpanelKarciqner(karciqner);

    anunicDash.value = '';
    karciqicDash.value = '';
    astxericDash.value = '5';

    cucadrelKarciqner();
});

cucadrelKarciqner();