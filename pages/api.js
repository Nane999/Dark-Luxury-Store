
export function stanalKargerianer() {
  let kanch = fetch('https://dummyjson.com/products/categories')
    .then(function (patasxan) {
      return patasxan.json()
    })
  return kanch
}

export function stanalApranqner(url) {
  let kanch = fetch(url)
    .then(function (patasxan) {
      return patasxan.json()
    })
  return kanch
}

export function stanalMekApranq(id) {
  let kanch = fetch('https://dummyjson.com/products/' + id)
    .then(function (patasxan) {
      return patasxan.json()
    })
  return kanch
}

