import styled from 'styled-components'

export const Dashboard = styled.div`
  position: relative;
	width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContentTitle = styled.span`
	color: white;
  font-size: 40px;
`

export const CardImage = styled.div.attrs((_ = {}) => ({
  ..._,
  className: 'classes-backgroundimage profile'
}))`
  height: 180px;
  width: 180px;
`
