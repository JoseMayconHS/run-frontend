import React from 'react'
import { AwesomeButton } from "react-awesome-button"
import "react-awesome-button/dist/styles.css"

import { Ul, ButtonArea } from './styles'

import { transformAsCoint } from '../../../../../pages/Dashboard/functions'

export default ({ message, render, data, submit }) =>
  <>
    <Ul>
      {render(data)}
    </Ul>
    <ButtonArea>
      {
        data.ups < 10 && (
          <>
            <span>{transformAsCoint(data.update_config.price)}</span>
            <AwesomeButton className='Dashboard-Aprimorator-content-inside-body-btn' size='medium' type='primary' ripple action={submit}>Aprimorar</AwesomeButton>
          </>
        )
      }
      <span>{data.ups === 10 ? 'Máximo': message}</span>
    </ButtonArea>
  </>
