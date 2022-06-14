import styled from 'styled-components'

import { rotate } from '../../styles'

export const LogoReact = styled.img`
	width: 50px;
  height: 50px;
  border-radius: 10px;
/*
  -webkit-animation: ${rotate} 5s linear infinite;
  -moz-animation: ${rotate} 5s linear infinite;
  -ms-animation: ${rotate} 5s linear infinite;
  -o-animation: ${rotate} 5s linear infinite;
  animation: ${rotate} 5s linear infinite; */

  :hover { cursor: pointer; }
`

export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const Header = styled.header`
	position: fixed;
  left: 0;
  width: 100%;
  z-index: 5;
  top: 10px;
  padding: 0 10px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Limit = styled.div`
	width: 100%;
  max-width: 1100px;
  /* background: linear-gradient(to right, #f9f9f9, #888, #666, #222, #222); */
  background: #222;
  margin: auto;
  height: 59px;
  padding: 0 20px;
  position: relative;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px black;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 760px) {
  	overflow: hidden;
  }
`

export const Left = styled.div`
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > div { margin: 0px 5px; }
`

export const Right = styled.div`
	margin-right: 10px;
  font-size: 30px;
  color: white;

  i { z-index: 5 };
  i:hover { cursor: pointer; }

  @media (min-width: 760px) {
  	position: relative;
    height: 100%;
    width: 300px;
  }

  @media (max-width: 759px) {
  	position: relative;
    height: 100%;
    width: ${({ dash }) => dash ? 80 : 100}px;
  }
`

export const LimitMenu = styled.div`
	@media (min-width: 760px) {
		position: absolute;
	  left: 0%;
	  top: 10px;

	  display: flex;
	  transition: all .7s linear;
	}

	@media (max-width: 759px) {
		position: absolute;
    left: 0%;
    top: -${ ({ dash }) => dash ? '155' : '119' }px;

    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    transition: all .7s linear;
	}
`

export const Menu = styled.nav`
	span:hover { cursor: pointer; }

	@media (min-width: 760px) {
		width: 258px;
    margin-left: ${({ dash }) => dash ? 2 : 1 }0px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: 16px;

      :hover {
        color: #888;
      }
    }
	}

	@media (max-width: 759px) {
		width: 100px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    span { font-size: 16px; padding: 8px 5px; width: 100%; text-align: center; }
    span:not(:last-child) { border-bottom: 1px solid white; }
	}
`

export const OpenMenu = styled.input`
	@media (min-width: 760px) { :checked ~ div { left: 9${ ({ dash }) => dash ? 4 : 0 }%; } }
	@media (max-width: 759px) { :checked ~ div { display: flex; top: 0px; background: #222; border-radius: 10px; border: 2px solid #FFF } }
`
