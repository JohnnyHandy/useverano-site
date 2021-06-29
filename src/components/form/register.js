import React from 'react'
import { Link } from 'gatsby'
import { reduxForm } from 'redux-form'
import styled from '@emotion/styled'

import Loading from '../loading'

import { colors } from '../../utils/constants'
import AddressForm from './Address'
import UserDataForm from './UserData'
import AccessDataForm from './AccessData'

const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  align-items: flex-start;
  align-content: flex-start;
  display: grid;
  padding: 1em;
`

const FormTitle = styled('label')`
    color: ${colors.veranoBlue};
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
`
const FormSectionTitle = styled('label')`
    color: ${colors.veranoBlue};
    font-size: 1.5em;
    padding: 0.2em;
`



const FormButton = styled('button')`
  background: ${colors.veranoBlue};
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 2em;
  font-weight: bold;
  margin: auto;
  padding: 0.5em;
  & :disabled {
    background: white;
    color: ${colors.veranoBlue};
    cursor: not-allowed;
  }
`
const LoginLink = styled(Link)`
  color: ${colors.veranoBlue};
  font-size: 1.5em;
`

const ErrorSpan = styled('span')`
  color: red;
  font-size: 0.7em;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  max-width: 15em;
  margin:auto;
`


let RegisterFormComponent = (props) => {
  const { formValues, isFormValid, onSubmit, handleSubmit, errors, status} = props
  return (
    <div
      style={{
        color: '${colors.veranoBlue}',
        display: 'flex',
        fontFamily: 'Quicksand',
        minHeight: '70vh'
      }}
    >
      <div
        style={{
          background: '#f1d6ce',
          margin: 'auto',
          padding: '1em',
          textAlign: 'center'
        }}
      >
        {status === 'waiting'
        ? (<>
          
        <FormTitle> Registre-se </FormTitle>
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            style={{ display: 'flex' }}
          >
          <InputsContainer>
            <FormSectionTitle> Dados de acesso </FormSectionTitle>
            <AccessDataForm />
          </InputsContainer>
          <InputsContainer>
            <FormSectionTitle> Dados Pessoais </FormSectionTitle>
            <UserDataForm />
          </InputsContainer>
          <InputsContainer>
            <FormSectionTitle> Endereço </FormSectionTitle>
            <AddressForm formValues={formValues} />
          </InputsContainer>
          </div>
          {errors.map(error => (
            <ErrorSpan
            key={error}
            >
              {error}
            </ErrorSpan>
          ))}
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Registrar
          </FormButton>
        </FormComponent>
        </>)
         : status === 'loading' ? (
          <Loading />
        ) : status === 'confirmed' ? (
          <InputsContainer>
            <FormTitle>Conta registrada</FormTitle>
            <span> Para continuar, confirme o seu email através das instruções enviadas par ao email cadastrado! </span>
            <Link to='/'> Ir para o login </Link>
          </InputsContainer>
        ) : null
        }
        <LoginLink to='/login'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent