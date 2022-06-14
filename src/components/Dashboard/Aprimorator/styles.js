import styled from 'styled-components'

export const Aprimore = styled.div`
	background: #9999;
  position: relative;
  height: 600px;
	display: flex;
	flex-direction: column;
`

export const Header = styled.div`
	padding-top: 5px;

	ul {
		margin: 0px;
	  width: 100%;
	  height: 45px;
		padding: 0 10px;
	  position: relative;
	  border-bottom: 1px solid #fff4;

	  display: flex;
	  flex-direction: row wrap;
	  justify-content: space-around;
	  align-items: center;
	}
`

export const HeaderMenuItem = styled.li`
	display: flex;
	width: 45px;
	height: 45px;
	padding: 10px 3px;
  border-radius: 10px;
  position: relative;
  border-top: 1.5px solid transparent;
	border-bottom: 1.5px solid transparent;

  :hover {
  	border-top: 1.5px solid #222 !important;
	  border-bottom: 1.5px solid #222 !important;
	  cursor: pointer;
  }

  :before {
  	content: '';
  	position: absolute;
  	width: 8px;
  	top: ${({ up }) => 4.5 * (11 - (up + 1))}px;
  	left: -10px;
  	bottom: 0px;
  	background: green;
  }

  :after {
  	content: '';
  	position: absolute;
  	width: 10px;
  	border-top: 1px solid black;
  	border-bottom: 1px solid black;
  	border-top: 1px solid black;
  	border-bottom: 1px solid black;
  	border-left: 1px dashed black;
  	border-right: 1px dashed black;
  	top: 0px;
  	left: -12px;
  	bottom: 0px;
  }
`

export const Content = styled.div`
  height: 550px;
  position: relative;
`;

export const InsideContent = styled.div`
  position: relative;
  background: #222;
  height: 100%;
	padding: 0 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Gold = styled.span`
	position: absolute;
  right: 10px;
  top: 10px;
  background: #9c8c8c;
  z-index: 2;
  padding: 10px;
  border-radius: 10px;
`

export const BaseButtons = styled.div`
	/* position: fixed;
  bottom: 0px;
	left: 20px;
	right: 20px; */
  display: flex;
  justify-content: space-between;
	background: #222;
	padding: 0 20px;

  button {
  	border-radius: 50%;
	  padding: 0px;
	  font-size: 50px;
	  border: none;
	  background: transparent;
	  outline: none;
  }
`

export const BtnSale = styled.button`
	i {
		color: green !important;
	}
`

export const BtnExit = styled.button`
	i {
		color: red !important;
	}
`
