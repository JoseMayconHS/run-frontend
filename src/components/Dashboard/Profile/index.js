import React, { useState } from 'react'
import { AwesomeButton } from 'react-awesome-button'
import Modal from 'react-awesome-modal'

import baseUrl from '../../../baseUrl'

import 'react-awesome-button/dist/styles.css'

//Estilos
import {
	CardImage,
	ContentTitle,
	Dashboard,
} from '../../../pages/Dashboard/styles'
import { Table } from '../../../styles'
import {
	AreaConfirm,
	ButtonEdit,
	ButtonPadlock,
	ConfirmItem,
	ConfirmMessage,
	Data,
	Fieldset,
	ImgProfile,
	InputAsSpan,
	InputConfirm,
	Span,
	SubTitle,
} from './styles'

import {
	transformAsCoint,
	transformAsNumberValid,
} from '../../../pages/Dashboard/functions'
import {
	validationEmail,
	validationNickName,
	validationPassword,
} from '../../Home/Inicio/functions'
import { checkPassword, doRemove, getAttr, getFc, getJoin } from './functions'

const initialState = {
	edit: false,
	index: 0,
	body: [
		{
			label: 'Editar',
			style: { background: '#d7ff00' },
			action(field) {
				return new Promise((resolve) => {
					const state = { ...initialState }
					state.edit = true
					state.index = 1
					document.getElementById(`change-${field}`).focus()

					resolve({ status: 'edit', state })
				})
			},
		},
		{
			label: 'Salvar',
			style: { background: '#20d800' },
			action(field, { function: execute, data, verify }) {
				return new Promise((resolve) => {
					if (data.original !== data.other) {
						if (verify(data.other)) {
							execute(field, data.other).then((status) => {
								if (status) {
									resolve({
										status: true,
										state: { ...initialState },
										message: 'Alterado ',
									})
								} else {
									resolve({ status: false })
								}
							})
						} else {
							resolve({ status: false })
						}
					} else {
						resolve({ status: false })
					}
				})
			},
		},
	],
	message: '',
}

const initialStateConfirm = {
	modal: false,
	value: '',
	valid: false,
	message: 'Verificação',
	waiting: false,
}

export default ({ push, data, updatePhoto, changeInfo }) => {
	const [confirm, setConfirm] = useState({ ...initialStateConfirm })
	const [nickname, setNickname] = useState({
		state: { ...initialState },
		original: data.user.nickname,
		other: data.user.nickname,
	})
	const [email, setEmail] = useState({
		state: { ...initialState },
		original: data.user.email,
		other: data.user.email,
	})
	const [name, setName] = useState({
		state: { ...initialState },
		original: data.user.name,
		other: data.user.name,
	})
	const [password, setPassword] = useState({
		state: { ...initialState },
		original: '',
		other: '',
	})
	const [photoUpdating, setPhotoUpdating] = useState(false)

	const { src } = data.user

	const bodyOfTheFunctions = ({ state, setState, keyWord }, verifyFunction) => {
		return alert(
			'Essas informações não podem ser alteradas, obrigado por testar'
		)
		state.state.body[state.state.index]
			.action(keyWord, {
				function: changeInfo,
				data: { original: state.original, other: state.other },
				verify: verifyFunction,
			})
			.then(({ status, index, state: newState, message }) => {
				status === 'edit' &&
					(() => {
						setState({ ...state, state: newState, message: '' })
					})()
				status === true &&
					(() => {
						const { other } = state
						const newName = { original: other, other, message }
						setState({ state: newState, ...newName })
					})()
			})
	}

	const bodyOfTheFunctionsCancel = ({ state, setState, keyWord }) => {
		document.getElementById(`change-${keyWord}`).value = state.original
		setState({
			state: { ...initialState },
			...{ original: state.original, other: state.original, message: '' },
		})
	}

	const takeOff = () => {
		setConfirm({ ...initialStateConfirm })

		nickname.state.edit &&
			setNickname({
				state: { ...initialState },
				original: data.user.nickname,
				other: data.user.nickname,
			})
		name.state.edit &&
			setName({
				state: { ...initialState },
				original: data.user.name,
				other: data.user.name,
			})
		email.state.edit &&
			setEmail({
				state: { ...initialState },
				original: data.user.email,
				other: data.user.email,
			})
		password.state.edit &&
			setPassword({ state: { ...initialState }, original: '', other: '' })
	}

	const del = async () => {
		if (await doRemove()) push.push('/')
	}

	return (
		<Dashboard>
			{/* { confirm.valid && <Del onClick={del}>Excluir conta</Del> } */}
			<Modal
				visible={confirm.modal}
				width='250'
				height='150'
				effect='fadeInDown'
				onClickAway={() => setConfirm({ ...initialStateConfirm, modal: false })}
			>
				<AreaConfirm
					onSubmit={(e) => {
						e.preventDefault()

						setConfirm({ ...confirm, waiting: true })
						checkPassword(confirm, { password: confirm.value }).then((state) =>
							setConfirm({ ...state })
						)
					}}
				>
					<ConfirmItem flex='column'>
						<ConfirmMessage>{confirm.message}</ConfirmMessage>
						<InputConfirm
							id='confirm-password'
							type='password'
							value={confirm.value}
							placeholder='Confirme sua senha'
							onChange={({ target }) =>
								setConfirm({ ...confirm, value: target.value })
							}
							maxLength='15'
							minLength='5'
						/>
					</ConfirmItem>
					<ConfirmItem flex='row'>
						<ButtonEdit
							type='submit'
							style={{
								pointerEvents:
									confirm.valid || confirm.waiting ? 'none' : 'painted',
							}}
							bg='#20d800'
						>
							Prosseguir
						</ButtonEdit>
						<ButtonEdit
							bg='#d7ff00'
							onClick={() =>
								setConfirm({ ...initialStateConfirm, modal: false })
							}
						>
							Voltar
						</ButtonEdit>
					</ConfirmItem>
				</AreaConfirm>
			</Modal>
			<ContentTitle>Perfil</ContentTitle>
			<Fieldset>
				<SubTitle>{data.user.name}</SubTitle>

				{confirm.valid ? (
					<ConfirmMessage>
						{confirm.message}{' '}
						<ButtonPadlock title='Tirar permissão' onClick={takeOff}>
							<i className='fa fa-expeditedssl'></i>
						</ButtonPadlock>
					</ConfirmMessage>
				) : (
					<ButtonEdit
						bg='#20d800'
						onClick={() => {
							document.getElementById('confirm-password').focus()
							setConfirm({ ...confirm, modal: true })
						}}
					>
						Sou eu!
					</ButtonEdit>
				)}
				<ImgProfile>
					{confirm.valid && (
						<label htmlFor='file'>
							<AwesomeButton
								size='large'
								type='primary'
								ripple
								disabled={photoUpdating}
								action={() => document.getElementById('file').click()}
							>
								{photoUpdating ? 'Aguarde' : 'Trocar foto'}
							</AwesomeButton>
						</label>
					)}
					{confirm.valid && <span>Imagem quadrada</span>}
					{src === 'pilots/default' ? (
						<img src={`${baseUrl}/files/${src}.jpg`} alt='Sua foto do perfil' />
					) : (
						<CardImage
							style={{
								backgroundImage: `url(${src})`,
							}}
						/>
					)}
					<input
						id='file'
						type='file'
						accept='.png, .jpg, .jpeg'
						onChange={(e) => {
							const file = e.target.files[0]

							if (file) {
								setPhotoUpdating(true)
								updatePhoto(file, () => {
									setPhotoUpdating(false)
								})
							}
						}}
					/>
				</ImgProfile>
				<Data edit>
					<Span
						edit={name.state.edit}
						verify={() =>
							name.original !== name.other && validationNickName(name.other)
						}
					>
						<InputAsSpan
							id='change-name'
							defaultValue={data.user.name}
							onChange={(e) => setName({ ...name, other: e.target.value })}
							changing={name.state.edit}
							maxLength='20'
							minLength='3'
						/>
						<label htmlFor='change-name'>Name: </label>
					</Span>
					<span>
						{confirm.valid && (
							<>
								{name.message}
								<ButtonEdit
									bg={name.state.body[name.state.index].style.background}
									onClick={() =>
										bodyOfTheFunctions(
											{ state: name, setState: setName, keyWord: 'name' },
											validationNickName
										)
									}
								>
									{name.state.body[name.state.index].label}
								</ButtonEdit>
								{name.state.edit && (
									<ButtonEdit
										bg='#ff0000'
										onClick={() =>
											bodyOfTheFunctionsCancel({
												state: name,
												setState: setName,
												keyWord: 'name',
											})
										}
									>
										Cancelar
									</ButtonEdit>
								)}
							</>
						)}
					</span>
				</Data>
				<Data edit>
					<Span
						edit={nickname.state.edit}
						verify={() =>
							nickname.original !== nickname.other &&
							validationNickName(nickname.other)
						}
					>
						<InputAsSpan
							id='change-nickname'
							defaultValue={data.user.nickname}
							onChange={(e) =>
								setNickname({ ...nickname, other: e.target.value })
							}
							changing={nickname.state.edit}
							maxLength='13'
							minLength='3'
						/>
						<label htmlFor='change-nickname'>Nickname: </label>
					</Span>
					<span>
						{confirm.valid && (
							<>
								{nickname.message}
								<ButtonEdit
									bg={
										nickname.state.body[nickname.state.index].style.background
									}
									onClick={() =>
										bodyOfTheFunctions(
											{
												state: nickname,
												setState: setNickname,
												keyWord: 'nickname',
											},
											validationNickName
										)
									}
								>
									{nickname.state.body[nickname.state.index].label}
								</ButtonEdit>
								{nickname.state.edit && (
									<ButtonEdit
										bg='#ff0000'
										onClick={() =>
											bodyOfTheFunctionsCancel({
												state: nickname,
												setState: setNickname,
												keyWord: 'nickname',
											})
										}
									>
										Cancelar
									</ButtonEdit>
								)}
							</>
						)}
					</span>
				</Data>
				<Data edit>
					<Span
						edit={email.state.edit}
						verify={() =>
							email.original !== email.other && validationEmail(email.other)
						}
					>
						<InputAsSpan
							id='change-email'
							defaultValue={data.user.email}
							onChange={(e) => setEmail({ ...email, other: e.target.value })}
							changing={email.state.edit}
							maxLength='50'
						/>
						<label htmlFor='change-email'>Email: </label>
					</Span>
					<span>
						{confirm.valid && (
							<>
								{email.message}
								<ButtonEdit
									bg={email.state.body[email.state.index].style.background}
									onClick={() =>
										bodyOfTheFunctions(
											{ state: email, setState: setEmail, keyWord: 'email' },
											validationEmail
										)
									}
								>
									{email.state.body[email.state.index].label}
								</ButtonEdit>
								{email.state.edit && (
									<ButtonEdit
										bg='#ff0000'
										onClick={() =>
											bodyOfTheFunctionsCancel({
												state: email,
												setState: setEmail,
												keyWord: 'email',
											})
										}
									>
										Cancelar
									</ButtonEdit>
								)}
							</>
						)}
					</span>
				</Data>
				{confirm.valid && (
					<Data edit>
						<span>
							<span>Senha: </span> <br />
							<Span
								style={{ marginLeft: 20 }}
								edit={password.state.edit}
								verify={() =>
									password.original !== confirm.value &&
									validationPassword(password.original)
								}
							>
								<InputAsSpan
									id='change-password'
									className='change-password'
									placeholder='*******'
									type='password'
									onChange={({ target }) =>
										setPassword({ ...password, original: target.value })
									}
									changing={password.state.edit}
									minLength='5'
									maxLength='15'
								/>
								<label htmlFor='change-password'>Nova senha: </label>
							</Span>
							<Span
								style={{ marginLeft: 20 }}
								edit={password.state.edit}
								verify={() =>
									password.other !== confirm.value &&
									password.original === password.other &&
									validationPassword(password.other)
								}
							>
								<InputAsSpan
									className='change-password'
									type='password'
									placeholder='*******'
									onChange={({ target }) =>
										setPassword({ ...password, other: target.value })
									}
									changing={password.state.edit}
									minLength='5'
									maxLength='15'
								/>
								<label htmlFor='change-password2'>Repita a senha: </label>
							</Span>
						</span>
						<span>
							{password.message}
							<ButtonEdit
								bg={password.state.body[password.state.index].style.background}
								onClick={() => {
									return alert(
										'Essas informações não podem ser alteradas, obrigado por testar'
									)
									password.state.body[password.state.index]
										.action('password', {
											function: changeInfo,
											data: { original: '', other: password.original },
											verify: (p) =>
												password.original !== confirm.value &&
												password.original === password.other &&
												validationPassword(p),
										})
										.then(({ status, index, state: newState, message }) => {
											status === 'edit' &&
												(() => {
													setPassword({
														...password,
														state: newState,
														message: '',
													})
												})()
											status === true &&
												(() => {
													document
														.querySelectorAll('.change-password')
														.forEach((input) => (input.value = ''))
													const newpassword = {
														original: '',
														other: '',
														message,
													}
													setPassword({ state: newState, ...newpassword })
													setConfirm({ ...confirm, valid: false, value: '' })
												})()
										})
								}}
							>
								{password.state.body[password.state.index].label}
							</ButtonEdit>
							{password.state.edit && (
								<ButtonEdit
									bg='#ff0000'
									onClick={() => {
										document
											.querySelectorAll('.change-password')
											.forEach((input) => (input.value = ''))
										setPassword({
											state: { ...initialState },
											...{ original: '', other: '', message: '' },
										})
									}}
								>
									Cancelar
								</ButtonEdit>
							)}
						</span>
					</Data>
				)}
				<Data>
					<span>Nivel: </span>
					<span>{data.user.nvl}</span>
				</Data>
				<Data>
					<span>Experiência: </span>
					<span>
						Atual - {transformAsNumberValid(data.user.xp)} | Meta -{' '}
						{transformAsNumberValid(data.user.limit_xp)}
					</span>
				</Data>
				<Data>
					<span>Dinheiro: </span>
					<span>{transformAsCoint(data.user.gold)}</span>
				</Data>
				<Fieldset>
					<SubTitle>{data.car.model}</SubTitle>
					<Data>
						<span>Motor: </span>
						<span>{data.car.engine}</span>
					</Data>
					<Data>
						<span>Câmbio: </span>
						<span>{data.car.transmission}</span>
					</Data>
					<Data>
						<span>Rodas: </span>
						<span>{data.car.whells}</span>
					</Data>
					<Data>
						<span>Cilindro: </span>
						<span>{data.car.cylinder}</span>
					</Data>
					<Data>
						<span>Proteção: </span>
						<span>{data.car.protection}</span>
					</Data>
					<Table cellSpacing='0' cellPadding='0'>
						<thead>
							<tr>
								<th colSpan='7'>Visão geral</th>
							</tr>
							<tr>
								<th>Atributo</th>
								<th>Motor +{JSON.parse(data.car.engine_object).ups}</th>
								<th>Câmbio +{JSON.parse(data.car.transmission_object).ups}</th>
								<th>Rodas +{JSON.parse(data.car.whells_object).ups}</th>
								<th>Cilindro +{JSON.parse(data.car.cylinder_object).ups}</th>
								<th>Proteção +{JSON.parse(data.car.protection_object).ups}</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Velocidade</td>
								<td>{getAttr(JSON.parse(data.car.engine_object), 'speed')}</td>
								<td>
									{getAttr(JSON.parse(data.car.transmission_object), 'speed')}
								</td>
								<td>{getAttr(JSON.parse(data.car.whells_object), 'speed')}</td>
								<td>
									{getAttr(JSON.parse(data.car.cylinder_object), 'speed')}
								</td>
								<td>
									{getAttr(JSON.parse(data.car.protection_object), 'speed')}
								</td>
								<td>{getJoin(data.car, 'speed')}</td>
							</tr>
							<tr>
								<td>Aceleração</td>
								<td>
									{getAttr(JSON.parse(data.car.engine_object), 'acceleration')}
								</td>
								<td>
									{getAttr(
										JSON.parse(data.car.transmission_object),
										'acceleration'
									)}
								</td>
								<td>
									{getAttr(JSON.parse(data.car.whells_object), 'acceleration')}
								</td>
								<td>
									{getAttr(
										JSON.parse(data.car.cylinder_object),
										'acceleration'
									)}
								</td>
								<td>
									{getAttr(
										JSON.parse(data.car.protection_object),
										'acceleration'
									)}
								</td>
								<td>{getJoin(data.car, 'acceleration')}</td>
							</tr>
							<tr>
								<td>Turbo</td>
								<td>{getAttr(JSON.parse(data.car.engine_object), 'turbo')}</td>
								<td>
									{getAttr(JSON.parse(data.car.transmission_object), 'turbo')}
								</td>
								<td>{getAttr(JSON.parse(data.car.whells_object), 'turbo')}</td>
								<td>
									{getAttr(JSON.parse(data.car.cylinder_object), 'turbo')}
								</td>
								<td>
									{getAttr(JSON.parse(data.car.protection_object), 'turbo')}
								</td>
								<td>{getJoin(data.car, 'turbo')}</td>
							</tr>
							<tr>
								<td>Resistência</td>
								<td>
									{getAttr(JSON.parse(data.car.engine_object), 'resistance')}
								</td>
								<td>
									{getAttr(
										JSON.parse(data.car.transmission_object),
										'resistance'
									)}
								</td>
								<td>
									{getAttr(JSON.parse(data.car.whells_object), 'resistance')}
								</td>
								<td>
									{getAttr(JSON.parse(data.car.cylinder_object), 'resistance')}
								</td>
								<td>
									{getAttr(
										JSON.parse(data.car.protection_object),
										'resistance'
									)}
								</td>
								<td>{getJoin(data.car, 'resistance')}</td>
							</tr>
							<tr>
								<td colSpan='5'>FC</td>
								<td colSpan='2'>{getFc(data.car)}</td>
							</tr>
						</tbody>
					</Table>
				</Fieldset>
			</Fieldset>
		</Dashboard>
	)
}
