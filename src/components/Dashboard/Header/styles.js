import styled from 'styled-components'
import { rotate } from '../../../styles'

export const FastInfo = styled.div`
  font-weight: 900;

  display: flex;
  flex-direction: column;

	span {
		color: #FFF;
		font-weight: 100;
	}
`

export const Profile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;

  :before {
    content: '';
    border-radius: 50%;
    padding: 1px;
    position: absolute;
    height: 100%;
    width: 100%;
    border-top: 4px dashed ${({ border }) => border};
    -webkit-animation: ${rotate} 1s linear infinite;
    -moz-animation: ${rotate} 1s linear infinite;
    -ms-animation: ${rotate} 1s linear infinite;
    -o-animation: ${rotate} 1s linear infinite;
    animation: ${rotate} 1s linear infinite;
  }

	> img {
		width: 109%;
		height: 109%;
	}
`

export const Xp = styled.span`
	position: relative;

	:after {
		content: '${({ start, end }) => (100 - ((end - start) * 100 / (end / 2))) > 0? (100 - ((end - start) * 100 / (end / 2))).toFixed(2) : 0}%';
		position: absolute;
		text-align: center;
		font-size: 10px;
		border-left: 1px solid #FFF;
		border-right: 1px solid #FFF;
		border-top: 1px solid #FFF;
		border-bottom: 1px solid #FFF;
		border-radius: 10px;
		height: 13px;
		width: 120px;
		left: 25px;
		top: 2px;
	}

	:before {
		content: '';
		font-size: 11px;
		border-radius: 12px;
		position: absolute;
		background: green;
		height: 13px;
		width: ${({ start, end }) => Math.floor(120 - ((end - start) * 120 / (end / 2)))}px;
		left: 25.5px;
		top: 2.5px;
	}
`
