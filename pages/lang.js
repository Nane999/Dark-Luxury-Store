
var langSelect = document.getElementById('lang-select');
var yntacikLezu = localStorage.getItem('lezu');
if (yntacikLezu == null) {
  yntacikLezu = 'hy';
}

if (langSelect) {
  langSelect.value = yntacikLezu;
  langSelect.addEventListener('change', function () {
    yntacikLezu = langSelect.value;
    localStorage.setItem('lezu', yntacikLezu);
    bernelTargmanutyunner();
  });
}

export function bernelTargmanutyunner() {
  fetch('../json/i18n.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (targmanutyunner) {
      var tvyalner = targmanutyunner[yntacikLezu];
      if (tvyalner) {
        var searchInput = document.getElementById('voronman-dash');
        if (searchInput) {
          if (tvyalner.searchPlaceholder) {
            searchInput.placeholder = tvyalner.searchPlaceholder;
          }
        }

        var elementner = document.querySelectorAll('[data-i18n]');
        elementner.forEach(function (el) {
          var key = el.getAttribute('data-i18n');
          if (tvyalner[key]) {
            el.textContent = tvyalner[key];
          }
        });
      }
    })
    .catch(function (err) {
      console.log('Սխալ:', err);
    });
}

bernelTargmanutyunner();