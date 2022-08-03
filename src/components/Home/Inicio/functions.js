import api from '../../../requests'

function login(formData = Object) {
	return new Promise((resolve) => {
		api
			.post('/login', formData)
			.then((res) => resolve(res.data))
			.catch((e) => console.log(e))
	})
}

function register(formData, history) {
	const data = {
		email: process.env.REACT_APP_USER_EMAIL,
		password: process.env.REACT_APP_USER_PASSWORD,
	}

	alert(
		`O cadastro foi desativado, existe um acesso único para testes. \n Email: ${data.email} / Senha: ${data.password}`
	)

	login(data).then((res) => {
		if (!res.status) {
			if (res.message.indexOf('Senha') !== -1) {
				checkInvalid('password-login')
			} else {
				checkInvalid('email-login')
			}
			alert(res.message)
			return
		}

		sessionStorage.setItem('token', res.message)
		history.push('/dashboard')
	})

	return new Promise((resolve) => {
		resolve({
			status: false,
			message: '',
		})
	})

	return new Promise((resolve) => {
		api
			.post('/createAccount', formData)
			.then((res) => resolve(res.data))
			.catch((e) => console.log(e))
	})
}

function validationEmail(email = String) {
	if (
		!/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+(\.[a-z]+)?$/g.test(email) ||
		email.length > 50
	)
		return false

	return true
}

function validationNickName(nickname = String) {
	if (
		!Number.isNaN(Number.parseInt(nickname)) ||
		nickname.length < 4 ||
		nickname.length > 15
	)
		return false

	return true
}

function validationModel(model = String) {
	if (
		!Number.isNaN(Number.parseInt(model)) ||
		model.length < 4 ||
		model.length > 10
	)
		return false

	return true
}

function validationPassword(password = String) {
	return (
		password.length > 4 && password.length < 15 && password.indexOf(' ') === -1
	)
}

function checkInvalid(id) {
	const input = document.getElementById(id)
	input.focus()
	input.classList.add('input-invalid')

	input.onchange = (e) => input.classList.remove('input-invalid')
}

export {
	register,
	login,
	validationEmail,
	validationNickName,
	validationModel,
	validationPassword,
	checkInvalid,
}
