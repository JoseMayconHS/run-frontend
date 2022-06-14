import React from 'react'
import { AwesomeButton } from "react-awesome-button"

import images from './images_object'

import "react-awesome-button/dist/styles.css"
import { AprimoreTitle } from './styles'
import { Li } from '../subComponents/Attributes/styles'
import {
  PreviewProduct, ProductName, InfoProductId,
  InfoProductGlobal, InfoProductBlock,
  InfoProductBlocks, InfoProductGlobalActions
} from '../subComponents/Sale/styles'

import { setEffect } from '../functions'
import { transformAsCoint } from '../../../../pages/Dashboard/functions'

import Attributes from '../subComponents/Attributes'
import Sale from '../subComponents/Sale'

function renderLiAttr(atrParam) {
  const attr = { speed: atrParam.speed, acceleration: atrParam.acceleration, resistance: atrParam.resistance }
  const li = []

  Object.entries(attr).forEach((atr, index) => li.push(<Li key={`iamges-attr-${index}`}>
      <span className='attrName'><img src={images[atr[0]]} alt='Ícone do atributo' /></span>
      <span className='attrValue'>{atr[1].toFixed(1)} {atrParam.update_config[atr[0]]? '+' + atrParam.update_config[atr[0]]: ''}</span>
    </Li>))

  return li
}

function submit(gold, data, update) {
  if (gold < data.update_config.price || data.ups >= 10) return

  const part = {
    speed: data.speed + data.update_config.speed,
    acceleration: data.acceleration + data.update_config.acceleration,
    resistance: data.resistance,
    costs: gold - data.update_config.price,
    ups: data.ups + 1
  }

  const newTransmission = { update_config: data.update_config, ...part }

  update(newTransmission, 'transmission_object')
}

function renderProducts(my, toBuy, gold) {
  const sale = JSON.parse(sessionStorage.getItem('transmissions'))

  const divs = []

  sale.forEach(part => {
    const equiped = my === part.name

    divs.push(
      <PreviewProduct key={`sale-transmission-${part.id}`}>
        <ProductName className={`Dashboard-Aprimorator-content-inside-body-inside-Sale-name ${equiped ? 'myPartEquiped': ''}`} onClick={() => setEffect(part.id)}>{part.name}</ProductName>
        <InfoProductId className={`Dashboard-Aprimorator-content-inside-body-inside-Sale-info thisIsProduct-${part.id}`}>
          <InfoProductGlobal>
            <InfoProductBlocks>
              <InfoProductBlock>
                <span className='block-attr'>Peça</span>
                <span className='block-value'>{part.name}</span>
              </InfoProductBlock>
              <InfoProductBlock>
                <span className='block-attr'>Velo.</span>
                <span className='block-value'>{part.speed}</span>
              </InfoProductBlock>
              <InfoProductBlock>
                <span className='block-attr'>Acel.</span>
                <span className='block-value'>{part.acceleration}</span>
              </InfoProductBlock>
              <InfoProductBlock>
                <span className='block-attr'>Resis.</span>
                <span className='block-value'>{part.resistance}</span>
              </InfoProductBlock>
            </InfoProductBlocks>
            <InfoProductBlocks paddingX>
              <InfoProductBlock>
                <span className='block-attr'>Taxa de Atualização</span>
                <span className='block-value'>
                  <span className='block-value-update'>
                    <span>Velo.</span> <span>+{part.update_config.speed}</span>
                  </span>
                  <span className='block-value-update'>
                    <span>Acel.</span ><span>+{part.update_config.acceleration}</span>
                  </span>
                  <span className='block-value-update'>
                    <span>Preço</span> <span>{transformAsCoint(part.update_config.price)}</span>
                  </span>
                </span>
              </InfoProductBlock>
              <InfoProductBlock>
                <span className='block-attr'>Valor</span>
                <span className='block-value'>{transformAsCoint(part.price)}</span>
              </InfoProductBlock>
            </InfoProductBlocks>
          </InfoProductGlobal>
          <InfoProductGlobalActions>
            <AwesomeButton
              size='small' type='secondary' ripple
              action={() => setEffect()}>Voltar</AwesomeButton>
            <InfoProductBlock>
              <span>{ equiped ? 'Equipado' : transformAsCoint(gold) }</span>
              <AwesomeButton
                size='medium' type={ equiped ? 'disabled' : 'primary' }
                ripple action={() => toBuy(part.name, 'transmissions', 'transmission', part.price)}>Comprar</AwesomeButton>
            </InfoProductBlock>
          </InfoProductGlobalActions>
        </InfoProductId>
      </PreviewProduct>
    )
  })

  return divs
}

function renderBody(attr, config) {
  return attr? (
    <Sale name={config.name} renderProducts={renderProducts} gold={config.gold} buyPart={config.buyPart} />
  ) : (
    <>
      <AprimoreTitle>Câmbio '{config.name}' equipada!"</AprimoreTitle>
      <Attributes message={config.message} data={config.data} submit={() => submit(config.gold, config.data, config.update)} render={renderLiAttr} />
    </>
  )
}


export default ({ message, sale, gold, name, data, update, buyPart }) =>
  <>
    {renderBody(sale, { message, gold, name, data, update, buyPart })}
  </>
