import styled from 'styled-components'
import { shadowAndBorder } from './functions'

export const Preparetion = styled.div`
	position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const AllPlayers = styled.div`
	width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

export const Card = styled.div`
	position: relative;
  width: 180px;
  height: 180px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid white;
  overflow: hidden;
`

export const CardInfo = styled.span`
	position: absolute;
  background: #1a8acc;
  color: black;
  font-weight: bold;
  text-align: center;
  border-top: 1px solid white;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 2px;

  :after {
    ${({ nvl }) => {
      return `
        content: '${nvl}';
        ${shadowAndBorder(nvl)}
      `
    }}
    color: white;
  	position: absolute;
	  top: -150px;
	  right: 5px;
    height: 19px;
    width: 19px;
	  background: #1a8acc;
	  padding: 6px;
	  border-radius: 20px;
	  font-weight: bold;
	}
`

export const Advs = styled.div`
	display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

export const Buttons = styled.div`
	background: #111;
  padding: 5px;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  width: 350px;
  max-width: 99%;
  ${({ desistir }) => desistir? 'pointer-events: none;': ''}

  button { width: 100%; }
`

export const Play = styled.div`
	margin: 20px 0px;
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 100%;
  min-height: 600px;
  border-radius: 10px;
  overflow: hidden;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

export const Gif = styled.img`
	width: 100%;
	height: 100%;
  border-radius: 50%;
`

export const DivLideres = styled.div`
	position: relative;
  border-radius: 5px;
  overflow: hidden;
  height: 90px;
  width: 100%;
  max-width: 450px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 1fr;
  grid-template-areas:
  'head-lideres'
  'body-lideres';
`

export const Lideres = styled.div`
	grid-area: body-lideres;
  position: relative;
  background: rgb(174, 242, 245);
  border-bottom: 1px solid black;
  padding: 0px 3px;

  p {
  	padding: 4px 0px;
	  margin: 0px;
	  position: absolute;
	  transition: all 1s ease-in;
  }

  p#carro0 {
    font-weight: 900;
  }
`

export const HeaderLideres = styled.div`
	grid-area: head-lideres;
  position: relative;
  padding: 0px 3px;
  background: #111;
  color: white;

  display: flex;
  justify-content: space-between;
`

export const Game = styled.div`
  margin: 20px 0px;
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 100%;
  min-height: 600px;
  border-radius: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

export const Players = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`
