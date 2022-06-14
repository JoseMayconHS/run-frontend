import styled from 'styled-components'

export const Footer = styled.footer`
	position: fixed;
  bottom: 0px;
  left: 0px;
  padding: 0 10px;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
`

export const LimitFooter = styled.div`
	width: 100%;
  max-width: 1100px;
  height: 59px;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  background: #222;
  box-shadow: 0px 0px 10px black;
  margin: auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
`

export const Links = styled.span`
	width: 100%;
  max-width: 300px;

  display: flex;
  justify-content: space-around;
`
