import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../../constants/auth'
import { SIGNUP_MUTATION } from '../../graphql/mutations/signupMutation'
import { LOGIN_MUTATION } from '../../graphql/mutations/loginMutation'

export const Login = (props) => {
  const [state, setState] = React.useState({
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  })
  const { login, email, password, name } = state
  const [signupMutation, { error: signupError, loading: signupLoading }] = useMutation(SIGNUP_MUTATION);
  const [loginMutation, { error: loginError, loading: loginLoading }] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (name) => (event) => {
    if (name === 'login') {
      setState({ ...state, login: !login })
    } else {
      setState({ ...state, [name]: event.target.value })
    }
  }

  const submitForm = async () => {
    if (login) {
      loginMutation({ variables: { email, password, name } }).then(({ data }) => {
        confirm({ ...data })
      }).catch(error => {
        // Do nothing...
      })
    } else {
      signupMutation({ variables: { email, password, name } }).then(({ data }) => {
        confirm({ ...data })
      }).catch(error => {
        // Do nothing...
      })
    }
  }

  const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const confirm = data => {
    const { token } = login ? data.login : data.signup
    saveUserData(token)
    props.history.push(`/`)
  }

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={handleInputChange('name')}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={handleInputChange('email')}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={handleInputChange('password')}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={submitForm}>
          {login ? 'login' : 'create account'}
        </div>
        <div
          className="pointer button"
          onClick={handleInputChange('login')}
        >
          {login
            ? 'Need to create an account?'
            : 'Already have an account?'}
        </div>
      </div>
      {loginLoading && <p>Logging in...</p>}
      {loginError && <p>Error signing up: {loginError.message}</p>}
      {signupLoading && <p>Creating account...</p>}
      {signupError && <p>Error signing up: {signupError.message}</p>}
    </div>
  )
}

export default Login