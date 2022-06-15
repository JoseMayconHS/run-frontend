/* Função que faz a mudança de posições na tela */ import changePosition from './changePosition'
/* Função que retorna a posição atual */ import myPositionNow from './myPositionNow'
/* Função de preparação */ import setPreparetion from '../preparetion'
/* Função de start */ import start from '../clickStart'
/* Função de stop */ import stop from '../clickStop'
/* Funções de reproduzir os sons */ import { somCorrida, somNitro } from '../som'
/* Importanto o conômetro */ import Conometro from '../stopwatch'
/* Importando mecânismo de start e stop */ import Brain from '../brain'
/* Função que retorna um objeto */ import transformToClass from '../class/transform'

import cambio_1 from '../../images/insideTable/cambio_1.png'
import cambio_2 from '../../images/insideTable/cambio_2.png'
import cambio_3 from '../../images/insideTable/cambio_3.png'
import cambio_4 from '../../images/insideTable/cambio_4.png'
import cambio_5 from '../../images/insideTable/cambio_5.png'
import cambio_6 from '../../images/insideTable/cambio_6.png'
import cambio_7 from '../../images/insideTable/cambio_7.png'
import cambio_8 from '../../images/insideTable/cambio_8.png'
const cambios = [cambio_1, cambio_2, cambio_3, cambio_4, cambio_5, cambio_6, cambio_7, cambio_8]

let tempoAtual

const tempo = new Conometro()

const cerebro = new Brain()

export default function instanciar(participants = Array, limit = Number, cb = Function) {
  if (cerebro.startado) {
    finish(true)
  } else {
    const cars = []
    const pilots = []
    for (let p = 0; p < participants.length; p++) {
      cars.push(transformToClass('car', participants[p].car))
      pilots.push(transformToClass('pilot', participants[p].pilot))
    }

    start(pilots.length)
    cerebro.parar = false
    cerebro.startado = true
    corrida(pilots, cars, limit, cb)
    setTimeout(() => somCorrida(0), 1000)
  }
}

export function finish(wasStopped) {
  cerebro.parar = true
  cerebro.startado = false
  somCorrida(wasStopped ? null : 2)
  stop()
  clearInterval(tempoAtual)
  tempo.reset()
}

function corrida(pilots, cars, limit, win) {

  const soltarTurbos = []

  for (let st = 0; st < cars.length; st++) {
    soltarTurbos.push(false)
  }

  let cf = 0
  let p = cars.length + 1
  let f = 1

  function completude(c = 0) {
    cars[c].setDistanciaPecorrida(p)
    changePosition(c, `${f}° ${pilots[c].getNome()} [${cars[c].getModelo()}] - ${tempo.getTempo()} <span class='span-porcentagem-lideres' style='color: darkviolet;'>100%</span>`, cf)

    --p
    f++
    cf++

    if (cf === pilots.length || c !== 0) {
      finish()
      win(false)
    } else if (c === 0) {
      finish()
      win(true)
    }
  }

  setPreparetion(cars, limit)

  const runs = []

  cars.forEach((car, index) => {
    //======FUNÇÕES PRINCIPAIS======\\
    runs.push(() => {
      car.acelerar()
      if (!soltarTurbos[index]) {
        if (car.getBtnNitro()) {
          somNitro(index)
          soltarTurbos[index] = true
        }
      }
      if (car.getCilindro()) car.turbo()
      document.getElementById(`distancia${index}`).innerHTML = `${(car.getDistanciaPecorrida()).toFixed(3)} m`
      myPositionNow(car.getDistanciaPecorrida(), index, cars, pilots, limit)
      document.querySelectorAll(`.aproveitamento${index}`).forEach(area =>area.style.background = `linear-gradient(to bottom, #909090, rgb(255, ${car.getAproveitamento()}, ${car.getAproveitamento()}))`)
      document.querySelector(`#ponteiro${index} img`).style.transform = `translate(0px, 0px) rotate(${car.getVelocidadeAtual() * (33 * (car.getTotMarchas() + 1))  / (car.getVelocidade() * (car.getMarcha() * 20) / 100)}deg)`
      document.getElementById(`velocidade${index}`).innerHTML = `${(car.getVelocidadeAtual()).toFixed(0)} km/h`
      document.getElementById(`quebra${index}`).innerHTML = `${(100 * car.getResistencia() / car.getQualidade()).toFixed(0)}%`
      document.getElementById(`cambio${index}`).src = cambios[car.getMarcha() - 1]
      document.querySelector(`#grau${index} span`).style.width = `${(car.getDistanciaPecorrida() * 100 / limit).toFixed(0)}%`
      if (car.getCilindro() === true && car.getBtnNitro() === false) {
        document.getElementById(`nitro${index}`).style.height = `${100 - 100 * car.getTanque() / car.getNitro()}%`
        document.getElementById(`nitro${index}`).style.background = `linear-gradient(to bottom, #909090, rgb(255, ${car.getAproveitamento()}, ${car.getAproveitamento()}))`
      } else if (car.getBtnNitro() === true && car.getTanque() <= (car.getNitro() / 4 + car.getNitro()) && car.getCilindro() === true) {
        document.getElementById(`nitro${index}`).style.height = `${0 + 100 * (car.getTanque() - car.getNitro()) / (car.getNitro() / 8)}%`
        document.getElementById(`nitro${index}`).style.background = `linear-gradient(to bottom, #909090, rgb(255, ${car.getAproveitamento()}, ${car.getAproveitamento()}))`
        document.getElementById(`chama${index}`).style.display = 'block'
      } else if (car.getCilindro() === false) {
        document.getElementById(`chama${index}`).style.display = 'none'
        document.getElementById(`div-nitro${index}`).style.display = 'none'
      }
      if (car.getDistanciaPecorrida() <= limit) {
        if (!cerebro.parar) {
          window.requestAnimationFrame(runs[index])
        }
      } else {
        completude(index)
      }
    })
  })

  cars.forEach((car, index) => {
    myPositionNow(car.getDistanciaPecorrida(), index, cars, pilots, limit)
  })

  setTimeout(() => {
    runs.forEach(run => window.requestAnimationFrame(run))

    const freios = []
    pilots.forEach((pilot, index) => {
      freios[index] = setInterval(() => {
          cars[index].frear()
          pararDeFreiar()
        }, pilot.getHabilidade() * 2000)
    })

    function pararDeFreiar() {
      if (cerebro.parar) {
        freios.forEach(temporizador => {
          clearInterval(temporizador)
        })
        clearInterval(tempoAtual)
      }
    }

    tempoAtual = setInterval(() => {
      tempo.setTempo()
      try { document.querySelector('#display-time').innerHTML = tempo.getTempo() } catch(e) { console.log(e) }
    }, 1000)
  }, 2500)

}
