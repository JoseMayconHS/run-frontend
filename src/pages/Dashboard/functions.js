import api from '../../requests'

function updateMyCar({ auth } = Object, obj = Object, part = String) {
  return new Promise(resolve => {
    api.put(`/auth/car/${part}`, obj, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json'} })
      .then(({ data }) => {
        if (data.status) {
          auth.user.gold = data.gold
          auth.car[part] = data.part
        } else { alert(data.message) }
        resolve(auth)
      })
      .catch(e => console.log(e))
  })
}

function changePart({ auth = Object } = Object, part = String, table = String, field = String, gold = Number, price = Number) {
  return new Promise(resolve => {
    const form = { field, part, costs: gold - price }

    api.put(`/auth/changePart/${table}`, form, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json'} })
      .then(({ data }) => {
        if (data.status) {
          auth.user.gold = data.gold
          auth.car = data.car
        } else { alert(data.message) }
        resolve(auth)
      })
      .catch(e => console.log(e))
  })
}

function changePhoto({ auth = Object, file = String } = Object) {
  return new Promise(resolve => {
    const formData = new FormData()
    formData.append('image', file)
    api.put('/auth/profile', formData, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'multipart/form-data' } })
      .then(({ data }) => {
        if (data.status) {
          auth.user.src = data.src
        } else { alert(data.message) }
        resolve(auth)
      })
      .catch(e => console.log(e))
  })
}

function changeInfo({ auth, field, value, password }) {
  return new Promise(resolve => {
    api.put('/auth/info', { field, value, password }, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json' } })
      .then(({ data }) => {
        if (data.status) {
          auth.user[field] = data.message
        } else { alert(data.message) }

        resolve({ auth, status: data.status })
      })
  })
}

function withdrawal({ auth = Object, gold = Number } = Object) {
  return new Promise(resolve => {
    api.put('/auth/withdrawal', { gold }, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json'} })
    .then(({ data }) => {
      if (data.status) {
        auth.user.gold = data.gold
      }
      resolve(auth)
    })
    .catch(e => console.log(e))
  })
}

function winOrLose({ auth } = Object, { gold, xp } = Object) {
  return new Promise(resolve => {
    api.put('/auth/winOrLose', { gold, xp }, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json'} })
      .then(({ data }) => {
        if (data.status) {
          const { xp, gold, limit_xp, nvl } = data
          auth.user.xp = xp
          auth.user.gold = gold
          auth.user.limit_xp = limit_xp
          auth.user.nvl = nvl
        }
        resolve(auth)
      })
  })
}

function transformAsCoint(value = String || Number, negative) {
  return `R$ ${ negative ? '-' : '' }` + Number(value)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

function transformAsNumberValid(value = Number || String) {
  value = value.toString()
  let numero = ''

  let letraFrente = 0
  let letraTras = value.length - 1

  do {
    numero += letraFrente % 3 === 0 && letraFrente !== 0? Number.isInteger(Number.parseInt(value.charAt(letraTras)))? '.' + value.charAt(letraTras): value.charAt(letraTras): value.charAt(letraTras)
    letraFrente++
    --letraTras
  } while (letraTras >= 0)

  return numero
    .split('')
    .reverse()
    .join('')
}

function auth() {
  return new Promise(resolve => {
    api.post('/auth', {}, { headers: { 'Authorization': sessionStorage.getItem('token') } })
      .then(res => resolve(res.data))
      .catch(e => resolve(false))
  })
}

function getAdv() {
  return new Promise(resolve => {
    api.get(`/auth/adversary`, { headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-type': 'application/json'} })
    .then(res => resolve(res.data.allAdvs))
  })
}

function partSelected(selected = Number) {
  document.querySelector('.Dashboard-Aprimorator-parts-ul').childNodes.forEach((li, indice) => {
    if (selected === indice) {
      li.style.borderTop = '1.5px solid black'
      li.style.borderBottom = '1.5px solid black'
    } else {
      li.style.borderTop = '1.5px solid transparent'
      li.style.borderBottom = '1.5px solid transparent'
    }
  })
}

function pointerEvents(click = Boolean, elements = Array) {
  elements.forEach(classElement => document.querySelectorAll(`.${classElement}`).forEach(element => element.style.pointerEvents = click? 'painted': 'none'))
}

function victory(waited = String, { nvl } = Object, advs = Array) {
  let nvls = 0
  advs.forEach(({ pilot }) => {
    nvls += pilot.nvl
  })

  if (waited === 'gold') return (nvls * 10000) - (nvl * 100)

  return (nvls * 100) - nvl * 5
}

function lose(waited = String, { nvl } = Object, advs = Array) {
  let nvls = 0
  advs.forEach(({ pilot }) => {
    nvls += pilot.nvl
  })

  if (waited === 'gold') return (nvls * 200) - (nvl * 50)

  return (nvls * 20) - nvl * 5
}

function shame({ nvl } = Object, advs = Array) {
  let nvls = 0
  advs.forEach(({ pilot }) => nvls += pilot.nvl)

  return (nvls * 1000) - nvl * 100
}

export {
  updateMyCar, transformAsCoint, transformAsNumberValid,
  auth, changePart,
  changePhoto, getAdv, partSelected,
  withdrawal, winOrLose, victory,
  lose, shame, pointerEvents,
  changeInfo }
