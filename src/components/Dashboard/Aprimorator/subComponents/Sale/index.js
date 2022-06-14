import React from 'react'

import { Title, Products } from './styles'

export default ({ name, renderProducts, gold, buyPart }) =>
  <>
    <Title>Loja</Title>
    <Products>
      {renderProducts(name, buyPart, gold)}
    </Products>
  </>
