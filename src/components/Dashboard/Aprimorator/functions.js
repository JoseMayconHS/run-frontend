
function setEffect(key) {
  document.querySelectorAll('.Dashboard-Aprimorator-content-inside-body-inside-Sale-info').forEach((div, index) => {
		if (key) {
			if (index + 1 !== key) div.style.display = 'none'
			else div.style.display = div.style.display === 'block'? 'none': 'block'
		} else {
			div.style.display = 'none'
		}
  })
	if (key)  {
		document.querySelectorAll('.Dashboard-Aprimorator-content-inside-body-inside-Sale-name').forEach((span, index) => {
			if (index + 1 !== key) {
				span.classList.remove('name_selectedAndEquiped')
				span.classList.remove('name_selected')
			}	else {
				span.classList.toggle('name_selected')
				if (span.getAttribute('class').indexOf('myPartEquiped') !== -1) {
					span.classList.toggle('name_selectedAndEquiped')
				}
			}
		})
	}
}

export { setEffect }
