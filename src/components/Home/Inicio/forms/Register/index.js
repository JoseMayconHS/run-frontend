import React, { useState } from 'react'
import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'

//Styles
import {
	AreaInput,
	Form,
	FormHeader,
	FormHeaderLabel,
	FormMessage,
	Input,
	Select,
} from '../../styles'

import {
	checkInvalid,
	register,
	validationEmail,
	validationModel,
	validationNickName,
	validationPassword,
} from '../../functions'
import { countries } from './data/defaults.json'

const Register = ({ push: history }) => {
	const [email, setEmail] = useState(undefined)
	const [name, setName] = useState(undefined)
	const [password, setPassword] = useState(undefined)
	const [password2, setPassword2] = useState(undefined)
	const [nickname, setNickname] = useState(undefined)
	const [model, setModel] = useState(undefined)
	const [message, setMessage] = useState('')

	const confirm = () => {
		if (
			email === undefined ||
			name === undefined ||
			password === undefined ||
			nickname === undefined ||
			model === undefined
		) {
			setMessage('Preencha os campos (todos obrigatórios)')
			return
		}

		if (!validationEmail(email)) {
			checkInvalid('email-register')
			const message =
				'email: ...' +
				email.slice(email.indexOf('@'), email.length) +
				' é inválido'

			setMessage(message)
			return
		}

		if (!validationNickName(nickname)) {
			checkInvalid('nickname-register')
			setMessage('Nickname inválido')
			return
		}

		if (!validationModel(model)) {
			checkInvalid('model-register')
			setMessage('Nome do carro inválido')
			return
		}

		if (!validationPassword(password)) {
			checkInvalid('password-register')
			setMessage('Senha inválida')
			return
		}

		if (password !== password2) {
			checkInvalid('password-2-register')
			setMessage('Senhas diferentes')
			return
		}

		const genre = document.getElementById('genre-register').value
		const country = document.getElementById('country-register').value

		const formData = {
			name,
			email,
			password,
			nickname,
			genre,
			country,
			model,
		}

		register(formData, history).then((res) => {
			// CADASTRO SIMULADO
			return

			if (!res.status) {
				setMessage(res.message)

				return
			}

			sessionStorage.setItem('token', res.message)
			history.push('/dashboard')
		})
	}

	const renderOptions = (continentes) => {
		const paises = []

		countries.forEach(({ name, cn }, indice) => {
			if (cn === continentes)
				paises.push(
					<option key={indice} value={name}>
						{name}
					</option>
				)
		})

		return paises
	}

	return (
		<>
			<FormHeader>
				<FormHeaderLabel>
					<span>Cadastro (DESATIVADO)</span>{' '}
					<FormMessage>{message}</FormMessage>
				</FormHeaderLabel>
			</FormHeader>
			<Form onSubmit={(e) => e.preventDefault()}>
				<AreaInput verify={() => true}>
					<Input
						id='nome-register'
						type='text'
						name='name'
						maxLength='20'
						minLength='4'
						onChange={(e) => setName(e.target.value)}
						placeholder='Seu nome'
						required
					/>
					<label htmlFor='nome-register'>Nome</label>
				</AreaInput>
				<AreaInput verify={() => validationEmail(email)}>
					<Input
						id='email-register'
						type='email'
						name='email'
						maxLength='50'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='...@...'
						required
					/>
					<label htmlFor='email-register'>Email</label>
				</AreaInput>
				<AreaInput double>
					<AreaInput verify={() => validationModel(model)}>
						<Input
							id='model-register'
							type='text'
							name='carName'
							maxLength='9'
							minLength='4'
							onChange={(e) => setModel(e.target.value)}
							placeholder='Digite um modelo fictício'
							required
						/>
						<label htmlFor='model-register'>Nome do carro</label>
					</AreaInput>
					<AreaInput verify={() => validationNickName(nickname)}>
						<Input
							id='nickname-register'
							type='text'
							name='nickname'
							maxLength='13'
							minLength='4'
							onChange={(e) => setNickname(e.target.value)}
							placeholder='Seu nome no jogo'
							required
						/>
						<label htmlFor='nickname-register'>Apelido</label>
					</AreaInput>
				</AreaInput>
				<AreaInput double>
					<AreaInput verify={() => validationPassword(password)}>
						<Input
							id='password-register'
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							placeholder='*********'
							minLength='5'
							maxLength='15'
							required
						/>
						<label htmlFor='password-register'>Senha</label>
					</AreaInput>
					<AreaInput
						verify={() =>
							password === password2 && validationPassword(password)
						}
					>
						<Input
							id='password-2-register'
							type='password'
							name='password2'
							onChange={(e) => setPassword2(e.target.value)}
							placeholder='*********'
							minLength='5'
							maxLength='15'
							required
						/>
						<label htmlFor='password-2-register'>Confirme a senha</label>
					</AreaInput>
				</AreaInput>
				<AreaInput double>
					<AreaInput verify={() => true}>
						<Select name='genre' id='genre-register' required>
							<optgroup label='Gêneros'>
								<option value='Masculino'>Masculino</option>
								<option value='Femilino'>Feminino</option>
							</optgroup>
						</Select>
						<label htmlFor='genre-register'>Gênero</label>
					</AreaInput>
					<AreaInput verify={() => true}>
						<Select name='country' id='country-register' required>
							<optgroup label='América'>{renderOptions('AM')}</optgroup>
							<optgroup label='Europa'>{renderOptions('EU')}</optgroup>
							<optgroup label='Ásia'>{renderOptions('A')}</optgroup>
							<optgroup label='Africa'>{renderOptions('AF')}</optgroup>
						</Select>
						<label htmlFor='country-register'>Pais *Fictício</label>
					</AreaInput>
				</AreaInput>
				<AwesomeButton size='medium' type='secondary' ripple action={confirm}>
					Registrar
				</AwesomeButton>
			</Form>
		</>
	)
}

export default Register
