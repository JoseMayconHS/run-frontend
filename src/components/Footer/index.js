import React from 'react'

import { Footer, LimitFooter, Links } from './styles'

export default () =>
  <Footer>
    <LimitFooter>
      <span>Desenvolvido por Maycon Silva</span>
      <Links>
        <a href='https://github.com/JoseMayconHS' target='_blank' rel="noopener noreferrer"><i className="fa fa-github-square"></i> GitHub</a>
        <a href='https://www.facebook.com/profile.php?id=100008160376957' target='_blank' rel="noopener noreferrer"><i className="fa fa-facebook-square"></i> Facebook</a>
      </Links>
    </LimitFooter>
  </Footer>
