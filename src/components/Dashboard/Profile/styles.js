import styled from 'styled-components'

export const Fieldset = styled.div`
	position: relative;
	width: 99%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const ImgProfile = styled.div`
	position: relative;
	width: 100%;
	max-width: 600px;
	display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  color: white;

  label {
  	width: 100%;
  	max-width: 200px;
  	display: flex;
  	flex-wrap: wrap;
  	justify-content: center;
  	border-bottom: 1px solid #f9f9f9;
  }

  button { margin: 10px; width: 100%; }

  img, .profile { margin: 9px; border-radius: 10px; }
`

export const Data = styled.div`
	position: relative;
	color: white;
	width: 800px;
	max-width: 99%;
  padding: 10px;
  margin: auto;
  cursor: default;
  ${({ edit }) => {
  	if (edit) return `

  		@media (min-width: 620px) {
  			display: flex;
	  		justify-content: space-between;
	  		align-items: center;

	  		span:nth-child(1) {
	  			position: relative;
			  	width: 76%;
			  }

			  span:nth-child(2) {
			  	display: flex;
			  	flex-flow: row wrap;
			  	align-items: center;
			  	justify-content: center;
			  }
  		}
  		@media (max-width: 620px) {
  			display: flex;
  			flex-direction: column;
	  		justify-content: space-between;
	  		align-items: center;

	  		span:nth-child(1) {
	  			position: relative;
			  	width: 100%;
			  }

			  span:nth-child(2) {
	  			position: relative;
			  	display: flex;
			  	flex-direction: column;
			  	align-items: center;
			  	justify-content: center;
			  }
  		}
  	`
  }}

	:before {
		content: '';
		height: 2px;
		background: #f9f9f9;
		width: 100%;
		left: 0px;
		position: absolute;
		bottom: 0px;
		transform: scaleX(0);
		transition: transform .3s ease-in;
		transform-origin: right;
	}

	:hover:before {
		transform-origin: left;
		transform: scaleX(1);
	}
`

export const SubTitle = styled.span`
	display: block;
	width: 90%;
	text-align: center;
	padding: 5px 0px;
	font-size: 40px;
	border-bottom: 2px solid #f9f9f9;
	color: #f9f9f9;
`

export const InputAsSpan = styled.input`
	border: none;
	padding: 2px 10px;
	outline: none;
	pointer-events: ${({ changing }) => changing? 'painted': 'none' };
	color: white;
	font-size: 20px;
	background: transparent;
	width: 90%;
`

export const ButtonEdit = styled.button`
	border: none;
	padding: 5px 0px;
	border-radius: 7px;
	border-bottom: 3px solid black;
	border-right: 3px solid black;
	margin: 0px 3px;
	font-weight: 600;
	margin: 10px 2px;
	margin-left: 10px;
	width: 110px;
	height: 29px;

	:active {
		border-bottom: .5px solid black;
		border-right: .5px solid black;
		border-top: 2px solid black;
		border-left: 2px solid black;
	}
	${({ bg, color = 'black' }) => {
		if (bg) {
		 return `background: ${bg};
			color: ${ color };
			opacity: .8;

			:hover { opacity: 1; }`
		}
	}}
`

export const InputConfirm = styled.input`
	position: relative;
	width: 95%;
	padding: 5px;
	border-radius: 5px;
	font-size: 15px;
	margin: 10px;

	::placeholder {
		font-weight: bold;
		color: black;
	}

	:after {
		content: '';
		background: black;
		height: 2px;
		width: 0px;
		position: absolute;
		bottom: -2px;
		left: 0px;
		right: 0px;
		transform: scaleX(0);
		transition: all 1s ease-in;
	}

	:focus:after {
		transform: scaleX(1);
	}
`

export const AreaConfirm = styled.form`
	position: relative;
	width: 100%;
	background: #222;
	height: 100%;
	padding-top: 20px;

	display: flex;
	flex-direction: column;
	align-items: center;
`

export const ConfirmItem = styled.div`
	width: 100%;
	display: flex;
	flex-direction: ${({ flex }) => flex};
	justify-content: space-around;
	align-items: center;
`

export const ConfirmMessage = styled.span`
	color: white;
	font-weight: 600;
	width: 100%;
	text-align: center;
`


export const Span = styled.span`
	margin: 5px 0px;
  padding: 3px 0px;
  display: flex;
  flex-direction: column-reverse;

  label {
    position: relative;
    ${({ edit }) => {
    	if (edit) return `
    		:after {
	      content: '';
	      height: 10px;
	      width: 10px;
	      position: absolute;
	      background: black;
	      transform: rotate(45deg);
	      left: -10px;
	      bottom: -20px;
	      border: 1px solid black;
	    }
    	`
    }}
  }

  input:focus ~ label:after { background: yellow; }

  input:focus:valid ~ label:after,
  input:valid ~ label:after { background: ${({ verify }) => verify()? 'green': 'red' }; }
`

export const ButtonPadlock = styled.button`
	position: relative;
	background: none;
	font-size: 25px;
	color: white;
	border: none;
	padding-top: 2px;
`

export const Del = styled.button`
	position: absolute;
	top: 0;
	left: 5px;
	padding: 10px;
	font-size: 18px;
	background: rgba(200, 0, 0, .7);
	border: none;
	border-radius: 6px;
	opacity: .5;
	color: #FFF;

	transition: opacity .4s ease-out;
	:hover {
		opacity: 1;
	}
`
