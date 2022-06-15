import React from 'react'
import { Link } from 'react-router-dom'

import baseUrl from '../../../baseUrl'

//Estilos
import { Img, ImgAws, Header, Limit, Left, Right, Menu, LimitMenu, OpenMenu } from '../../Menu/styles'
import { FastInfo, Profile, Xp } from './styles'

import { border } from './functions'
import { transformAsCoint } from '../../../pages/Dashboard/functions'

export default ({ data, changeBody, openModal }) => {
  const { src } = data.auth.user

  return (
    <Header>
      <Limit>
        <Left>
          <Profile border={border(data.auth.user.nvl)}>

            {
              src === 'pilots/default' ? (
                <Img src={ `${ baseUrl }/files/${ src }.jpg` } alt='Imagem do usuário' />
              ) : (
                <ImgAws style={{
                    backgroundImage: `url(${ src })`
                  }}
                />
              )
            }
          </Profile>
          <FastInfo>
            <span>{transformAsCoint(data.auth.user.gold)}</span>
            <Xp
              title={`${ data.auth.user.xp }/${ data.auth.user.limit_xp }`}
              start={data.auth.user.xp} end={data.auth.user.limit_xp}
            >{data.auth.user.nvl}</Xp>
          </FastInfo>
        </Left>
        <Right>
          <OpenMenu dash type='checkbox' id='open-settings' />
          <LimitMenu dash>
            <label htmlFor='open-settings'><i className="fa fa-cog"></i></label>
            <Menu dash className='Header-limit-right-menu'>
              <span onClick={() => changeBody('play')}>Jogar</span>
              <span onClick={() => changeBody('profile')}>Meu perfil</span>
              <span onClick={openModal}>Meu carro</span>
              <span><Link to='/logout'>Sair</Link></span>
            </Menu>
          </LimitMenu>
        </Right>
      </Limit>
    </Header>
  )
}
