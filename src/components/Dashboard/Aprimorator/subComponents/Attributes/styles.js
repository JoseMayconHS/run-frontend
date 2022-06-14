import styled from 'styled-components'

export const Ul = styled.ul`
	background: #0096ed99;
  width: 98%;
  min-height: 110px;
  margin: 10px 0px;
  border-radius: 10px;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

export const Li = styled.li`
	height: 35px;
  width: 120px;
  margin: 10px;
  position: relative;

  display: inline-flex;

  .attrName {
  	display: inline-flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  background: gray;
	  border-top-left-radius: 10px;
	  border-bottom-left-radius: 10px;
	  height: 100%;
	  width: 35%;
  }

  .attrValue {
  	display: inline-flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  border-top-right-radius: 10px;
	  border-bottom-right-radius: 10px;
	  background: #f5f5f5;
	  height: 100%;
	  width: 65%;
  }
`

export const ButtonArea = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  background: #111;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
`
