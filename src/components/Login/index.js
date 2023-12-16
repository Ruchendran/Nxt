import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    inputType: false,
    username: '',
    password: '',
    error: '',
  }

  passwordOrText = e => {
    this.setState(s => ({
      inputType: !s.inputType,
    }))
  }

  inputUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  inputPassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  failure = status => {
    this.setState({
      error: "*Username and password didn't match ",
    })
  }

  submit = async e => {
    e.preventDefault()

    const {username, password} = this.state

    const data = {username, password}

    const options = {
      method: 'POST',

      body: JSON.stringify(data),
    }

    const url = 'https://apis.ccbp.in/login'

    const fetApi = await fetch(url, options)

    const jsonData = await fetApi.json()

    if (fetApi.ok === true) {
      console.log('hit')

      Cookies.set('token', jsonData.jwt_token, {expires: 30})
    } else {
      this.failure(jsonData)
    }
  }

  render() {
    const {inputType, username, password, error} = this.state

    return (
      <div className="login-main">
        <form className="login-form" onSubmit={this.submit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt=""
            className="login-img"
          />
          <div className="inpu-main">
            <label htmlFor="s1">USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              id="s1"
              className="inpu"
              onChange={this.inputUsername}
              value={username}
            />

            <label htmlFor="s2">PASSWORD</label>
            <input
              type={inputType ? 'text' : 'password'}
              placeholder="Password"
              id="s2"
              className="inpu"
              onChange={this.inputPassword}
              value={password}
            />
            <div className="show-main">
              <input type="checkbox" id="s3" onChange={this.passwordOrText} />
              <label htmlFor="s3"> Show Password </label>
            </div>
          </div>
          <button type="submit" className="log">
            Login
          </button>

          {error === '' ? '' : error}
        </form>
      </div>
    )
  }
}

export default Login
