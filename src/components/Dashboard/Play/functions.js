import React from 'react'

function setDistance(nvl = Number) {
  if (nvl < 5) return .2
  if (nvl < 10) return .5
  if (nvl < 15) return .8
  if (nvl < 20) return 1.1
  if (nvl < 25) return 1.5
  if (nvl < 30) return 1.9
  if (nvl < 35) return 2.3
  if (nvl < 40) return 2.7
  return 4.1
}

function renderP(pilots = Array) {
  const ps = []
  pilots.forEach(({ pilot, car }, index) => ps.push(<p key={index} id={`carro${index}`} className={`posicao${index}`}>0° - {pilot.nickname} [{car.model}] - 0 km/h</p>))

  return ps
}

function shadowAndBorder(nvl) {
	if (nvl > 0 && nvl < 11) return `
		border: 1px solid green;
    box-shadow: 0px 0px 10px green;
	`
	if (nvl >= 11 && nvl < 21) return `
		border: 1px solid yellow;
    box-shadow: 0px 0px 10px yellow;
	`
	if (nvl >= 21 && nvl < 31) return `
		border: 1px solid blue;
    box-shadow: 0px 0px 10px blue;
	`
	if (nvl >= 31 && nvl < 41) return `
		border: 1px solid purple;
    box-shadow: 0px 0px 10px purple;
	`

	return `
		border: 1px solid black;
    box-shadow: 0px 0px 10px black;
	`
}

export { setDistance, renderP, shadowAndBorder }
