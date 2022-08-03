import api from '../../requests'

function getAllBots() {
	api.get('/getAllBots').then(({ data }) => {
		putInSessionStorage(data.data, ['bots', 'cars'])
	})
}

function getAllParts() {
	api.get('/getAllParts').then(({ data }) => {
		putInSessionStorage(data.data, [
			'engines',
			'transmissions',
			'cylinders',
			'whells',
			'protections',
		])
	})
}

function putInSessionStorage(data, keys) {
	keys.forEach((name) => {
		sessionStorage.setItem(name, JSON.stringify(data[name]))
	})
}

getAllBots()
getAllParts()
