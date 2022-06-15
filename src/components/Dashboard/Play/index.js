import React from 'react'
import { AwesomeButton } from "react-awesome-button"

import baseUrl from '../../../baseUrl'

import "react-awesome-button/dist/styles.css"

import Table from './Components/Table'
import { Dashboard, ContentTitle, CardImage} from '../../../pages/Dashboard/styles'
import { Card, CardInfo, Advs, Game, Preparetion, AllPlayers, Buttons, Gif, DivLideres, Lideres, HeaderLideres, Players } from './styles'

import { transformAsCoint, victory, lose, shame } from '../../../pages/Dashboard/functions'
import { setDistance, renderP } from './functions'
import run from './script/engine'

export default ({ play, data, adv, change }) => {
  const { src } = data.user

  return (
    <Dashboard>
      <ContentTitle>Play</ContentTitle>
      <Preparetion className='preparetion'>
        <AllPlayers>
          <Card>
            {
              src === 'pilots/default' ? (
                <img src={ `${ baseUrl }/files/${ data.user.src }.jpg` } alt='Foto do usuário' />
              ) : (
                <CardImage style={{
                  backgroundImage: `url(${ src })`
                }} />
              )
            }
            <CardInfo nvl={data.user.nvl}>{data.user.nickname}</CardInfo>
          </Card>
          <AwesomeButton size='large' type='secondary' ripple action={change}>Outro adversário</AwesomeButton>
          <Advs>
            {adv.map(({ pilot, car }, index) => {
              return (
                <Card key={pilot.id}>
                  <img src={`${baseUrl}/files/${pilot.src}.jpg`} alt='Foto do adversário' />
                  <CardInfo nvl={pilot.nvl}>{pilot.nickname}</CardInfo>
                </Card>
              )
            })}
          </Advs>
        </AllPlayers>
        <Buttons>
          <span>Vitória {transformAsCoint(victory('gold', data.user, adv))} | Derrota {transformAsCoint(lose('gold', data.user, adv))}</span>
          <AwesomeButton size='large' type='primary' ripple action={() => {
              play.startStop(true)
              setTimeout(() => run([{ pilot: data.user, car: data.car }, ...adv], setDistance(data.user.nvl), play.win), 1000)
            }} >Correr</AwesomeButton>
        </Buttons>
      </Preparetion>
      <Game>
        {!play.played? (
          <Gif src='./image/carGif.gif' alt='gif animado' />
        ) : (
          <>
            <span id='som-corrida'></span>
            <DivLideres id='lideres-table'>
              <HeaderLideres>
                <span id='display-time'>00:00:00</span>
                <span>Lideres</span>
                <span>{setDistance(data.user.nvl)} km</span>
              </HeaderLideres>
              <Lideres>
                {renderP([{ pilot: data.user, car: data.car }, ...adv])}
              </Lideres>
            </DivLideres>
            <Players>
              <Table pilot={data.user} car={data.car} index='0' />
              {adv.map(({ pilot, car }, index) => <Table key={pilot.id} pilot={pilot} car={car} index={index + 1} /> )}
            </Players>
            <Buttons desistir className='btn-stop'>
              <span>Pejuizo {transformAsCoint(shame(data.user, adv), true)}</span>
              <AwesomeButton size='large' type='secondary' ripple action={() => {
                  run()
                  setTimeout(() => play.startStop(false), 2000)
                }}>Desistir</AwesomeButton>
            </Buttons>
          </>
        )}
      </Game>
    </Dashboard>
  )
}
