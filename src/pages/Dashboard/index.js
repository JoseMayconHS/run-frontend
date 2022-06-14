import React, { Component } from 'react'
import Modal from 'react-awesome-modal'

import {
  updateMyCar, auth, changePart,
  changePhoto, getAdv, partSelected,
  withdrawal, winOrLose, victory,
  lose, shame, pointerEvents,
  changeInfo } from './functions'

//Estilos
import { Container, Loading } from '../../styles'

import Header from '../../components/Dashboard/Header'
import Aprimorator from '../../components/Dashboard/Aprimorator'
import Play from '../../components/Dashboard/Play'
import Profile from '../../components/Dashboard/Profile'


const initialScreenAprimore = {
  engine: false,
  transmission: false,
  whells: false,
  cylinder: false,
  protection: false
}

const initialBody = {
  play: false,
  profile: false
}

export default class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      push: props.history,
      ready: false,
      sale: false,
      auth: {},
      adv: [],
      play: {
        played: false,
        startStop: situation => {
          if (situation) {
            pointerEvents(false, ['Header-limit-right-menu', 'preparetion'])
            setTimeout(() => pointerEvents(true, ['btn-stop']), 5000)
          } else {
            pointerEvents(true, ['Header-limit-right-menu', 'preparetion'])
            const gold = this.state.auth.user.gold - shame(this.state.auth.user, this.state.adv)
            withdrawal({ auth: this.state.auth, gold: gold < 0? 0: gold })
              .then(auth => this.setState({ auth }))
          }
          const play = { ...this.state.play }
          play.played = situation
          this.setState({ play })
        },
        changeAdv: async () => {
          let advs = []
          do {
            advs = await getAdv()
          } while (advs[0].pilot.nickname === this.state.adv[0].pilot.nickname)
          this.setState({ adv: advs })
        },
        win: (winner = Boolean) => {
          const gold = winner? this.state.auth.user.gold + victory('gold', this.state.auth.user, this.state.adv) : this.state.auth.user.gold + lose('gold', this.state.auth.user, this.state.adv)
          const xp = winner? this.state.auth.user.xp + victory(null, this.state.auth.user, this.state.adv) : this.state.auth.user.xp + lose(null, this.state.auth.user, this.state.adv)

          winOrLose({ auth: this.state.auth }, { gold: gold < 999999999? gold: 999999999, xp })
            .then(auth => {
              const play = { ...this.state.play }
              play.played = false
              this.setState({ auth })
              setTimeout(() => {
                pointerEvents(true, ['preparetion', 'Header-limit-right-menu'])
                this.setState({ play })
              }, 2000)
            })
        }
      },
      profile: {
        updateProfile: file => changePhoto({ auth: this.state.auth, file }).then(auth => this.setState({ auth })),
        updateInfo: (field, value) => new Promise(resolve => {
          changeInfo({ auth: this.state.auth, field, value })
            .then(({ auth, status}) => {
              status && this.setState({ auth })

              resolve(status)
            })
          })
      },
      insideAprimore: {
        modalAprimore: false,
        messageUpdate: 'Pronto?',
        updatePart: (obj, field) => updateMyCar({ auth: this.state.auth }, obj, field).then(auth => {
          pointerEvents(false, ['Dashboard-Aprimorator-content-inside-body-btn', 'Dashboard-Aprimorator-buttonsBase'])
          const insideAprimore = { ...this.state.insideAprimore }
          insideAprimore.messageUpdate = 'Sucesso'
          this.setState({ auth, insideAprimore })
          setTimeout(() => {
            pointerEvents(true, ['Dashboard-Aprimorator-content-inside-body-btn', 'Dashboard-Aprimorator-buttonsBase'])
            const insideAprimore = { ...this.state.insideAprimore }
            insideAprimore.messageUpdate = 'Pronto?'
            this.setState({ insideAprimore })
          }, 1300)
        }),
        buyPart: (part, table, field, price) => {
          if (part === this.state.auth.car[field]) return
          if (this.state.auth.user.gold < price) return
          changePart({ auth: this.state.auth }, part, table, field, this.state.auth.user.gold, price).then(auth => this.setState({ auth }))
        },
        attrToSale: () => this.setState({ sale: !this.state.sale }),
        changeAprimore: (part, selected) => {
          partSelected(selected)
          const aprimore = { ...initialScreenAprimore }
          aprimore[part] = true
          this.setState({ aprimore })
        }
      },
      changeBody: content => {
        const body = { ...initialBody }
        body[content] = true
        this.setState({ body })
      },
      aprimore: { ...initialScreenAprimore },
      body:  { ...initialBody }
    }
  }

  componentDidMount() {
    auth()
      .then(res => {
          if (!res) return this.state.push.push('/')
          const aprimore = { ...initialScreenAprimore }
          aprimore.engine = true
          const body = { ...initialBody }
          body.play = true
          getAdv()
            .then(advs => this.setState({ auth: res, ready: true, aprimore, body, adv: advs }))
        })
  }

  openModal = () => {
    const insideAprimore = { ...this.state.insideAprimore }
    insideAprimore.modalAprimore = true
    this.setState({ insideAprimore })
  }

  closeModal = () => {
    const insideAprimore = { ...this.state.insideAprimore }
    insideAprimore.modalAprimore = false
    this.setState({ insideAprimore })
  }

  renderBody(state) {
    if (state.body.play) return <Play play={state.play} data={state.auth} adv={state.adv} change={state.play.changeAdv} />
    if (state.body.profile) return <Profile push={state.push} data={state.auth} updatePhoto={state.profile.updateProfile} changeInfo={state.profile.updateInfo} />
  }


  render() {
    return this.state.ready? (
      <Container>
        <Header data={this.state} changeBody={this.state.changeBody} openModal={this.openModal} />
        <Modal
          visible={this.state.insideAprimore.modalAprimore} width="450" height='600'
          effect="fadeInUp" onClickAway={this.closeModal}
        >
          <Aprimorator data={this.state} change={this.state.insideAprimore.changeAprimore} closeModal={this.closeModal} />
        </Modal>
        {this.renderBody(this.state)}
      </Container>
    ) : (
      <Loading>
        <img src='./image/loading.gif' alt='Logo de carregamento' />
      </Loading>
    )
  }
}
