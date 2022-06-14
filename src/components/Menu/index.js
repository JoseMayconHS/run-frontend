import React from 'react'

//Estilos
import { LogoReact, Header, Limit, Left, Right, Menu, LimitMenu, OpenMenu } from './styles'

export default ({ changeBody }) =>
  <Header>
    <Limit>
      <Left>
        <LogoReact onClick={() => changeBody('inicio')} src='./favicon.ico' alt='Run' />
      </Left>
      <Right>
        <OpenMenu type='checkbox' id='open-settings' />
        <LimitMenu className='Header-limit-right-limitMenu'>
          <label htmlFor='open-settings'><i className="fa fa-bars"></i></label>
          <Menu className='Header-limit-right-menu'>
            <span onClick={() => changeBody('inicio')}>Inicio</span>
            <span onClick={() => changeBody('bots')}>Bots</span>
            <span onClick={() => changeBody('parts')}>Peças</span>
          </Menu>
        </LimitMenu>
      </Right>
    </Limit>
  </Header>
