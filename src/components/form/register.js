import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm, change, clearFields } from 'redux-form'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'
import axios from 'axios'

import { required, minBRPhoneNumberLength, minPassLength, validEmail, validCep, validConfirmPassword } from './validation'

const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  align-items: flex-start;
  display: grid;
  padding: 1em;
`

const FormLabel = styled('label')`
    font-size: 1em;
    padding: 0.2em;
` 
const FormTitle = styled('label')`
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
` 

const InputWrapper = styled('div')`
  display: inline-grid;
  text-align: initial
`
const StyledSelect = styled(Select)`

`

const FormButton = styled('button')`
  background: #1A4350;
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
    color: #1A4350;
    cursor: not-allowed;
  }
`
const LoginLink = styled(Link)`
  color: #1A4350;
  font-size: 1.5em;
`

const genderOptions = [
  {
    label: 'Masculino',
    value: 'M'
  },
  {
    label: 'Feminino',
    value: 'F'
  },
  {
    label: 'Outro',
    value: 'Outro'
  }
  
]

const InputComponent = (props) => {
  const { input, placeholder, style, meta, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <InputMask placeholder={placeholder} {...input} {...rest} />
      { meta && meta.error && meta.touched && meta.visited && <span style={{ color: 'red' }}> {meta.error} </span> }
    </InputWrapper>
  )
}
const SelectComponent = (props) => {
  const { input, placeholder, style, ...rest } = props

  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <StyledSelect {...input} {...rest} onBlur={() => input.onBlur(input.value)} placeholder={placeholder}  />
    </InputWrapper>
  )
}

let RegisterFormComponent = (props) => {
  const {dispatch, formValues, isFormValid, onSubmit, handleSubmit} = props
  const passwordValue = formValues && formValues['password']
  return (
    <div
      style={{
        color: '#1A4350',
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
        <FormTitle> Registre-se </FormTitle>
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
          <Field
            name='name'
            type='text'
            placeholder='Nome'
            component={InputComponent}
            validate={[required]}
          />
          <Field
            type='text'
            placeholder='Email'
            name='email'
            component={InputComponent} 
            validate={[required, validEmail]}
          />
          <Field
            type='text'
            placeholder='Genêro'
            name='gender'
            component={SelectComponent}
            options={genderOptions}
            validate={[required]}
          />
          <Field
            type='password'
            placeholder='Senha'
            name='password'
            component={InputComponent}
            validate={[required, minPassLength]}
          />
          <Field
            type='password'
            placeholder='Confirmar senha'
            name='password_confirmation'
            component={InputComponent}
            validate={[required, minPassLength, validConfirmPassword]}
          />
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Registrar
          </FormButton>
        </FormComponent>
        <LoginLink to='/entrar'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent