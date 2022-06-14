import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const Global = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

	* { box-sizing: border-box; font-family: 'Roboto', sans-serif; }

	body { padding: 100px 0; margin: 0px; background-color: #333;}

	#root {
		padding: 0 10px;
	}

	a { color: inherit; text-decoration: none; }

	input[type='checkbox'] { display: none; }

	input[type='password'] { letter-spacing: 5px; }

	button:hover { cursor: pointer; }

	input, button { outline: none; }

	ul { list-style: none; padding: 0px; margin: 0px; }

	.pointerDefault { cursor: default !important; }


	p {
		text-indent: 50px;
		text-align: center;
	}

	.input-invalid {
	  border: 1px solid red !important;
	}

	input[type='file'] { display: none; }

	@media (max-width: 600px) {
	  table thead {
	    font-size: 9px;
	  }

	  table {
	    font-size: 12px;
	  }
	}
`

export const Table = styled.table`
	border: 1px solid white;
  padding: 4px;
  border-radius: 10px;
  overflow: hidden;
  background: #111;
  text-align: center;
  margin: 20px 0px;
  cursor: default;
  width: 99%;
  max-width: 650px;

	thead .table-direction {
  	padding: 2px 5px;
	  margin: 0px 10px;
	  cursor: pointer;
  }

  thead {
	  background: #111;
	  color: #f8f8f8;
	  font-size: 14px;
	}

	thead tr th { padding: 4px 0px; }

	tbody {
	  background: #999;
	}

	tbody td {
	  border-bottom: 1px solid #777;
	  border-left: 1px solid #777;
	}

	tbody td:hover {
		background: #555;
		color: white;
	}
`

export const Container = styled.div`
	position: relative;
	border: 1px solid white;
  width: 100%;
	background: red;
	padding: 0 20px;
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
  background: #222;
  box-shadow: 0px 0px 10px black;
	border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 620px) {
  	padding: 40px 15px;
  }
`

export const Loading = styled.div`
	width: 200px;
  margin: auto;
  padding: 0px;
`

export const rotate = keyframes`
	from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`
