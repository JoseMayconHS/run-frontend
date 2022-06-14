import React from 'react'

import { FormArea, Inicio, BlockForm, InsideBlock } from './styles'

import Login from './forms/Login'
import Register from './forms/Register'

export default ({ push }) =>
  <Inicio className='Inicio'>
    <BlockForm className='Inicio-form'>
      <InsideBlock side='left' className='Inicio-form-desc l-left'>
        <p>Já tem uma conta? Entre já e divirta-se!!!</p>
      </InsideBlock>
      <InsideBlock side='right' className='Inicio-form-inputs l-right'><FormArea><Login push={push} /></FormArea></InsideBlock>
    </BlockForm>
    <BlockForm className='Inicio-form'>
      <InsideBlock side='right' className='Inicio-form-desc l-right'>
        <p>Se ainda não criou sua conta, crie agora!!!</p>
      </InsideBlock>
      <InsideBlock side='left' className='Inicio-form-inputs l-left'><FormArea><Register push={push} /></FormArea></InsideBlock>
    </BlockForm>
  </Inicio>
