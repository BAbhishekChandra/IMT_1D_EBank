import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <div className="login-inner-container">
          <div className="image-container">
            <img
              className="website-login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="login-form" onSubmit={this.onClickLogin}>
              <h1 className="welcome-heading">Welcome Back!</h1>
              <label className="user-id-label" htmlFor="UserId">
                User ID
              </label>
              <input
                className="user-id-input"
                id="UserId"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />

              <label className="pin-label" htmlFor="Pin">
                PIN
              </label>
              <input
                className="pin-input"
                id="Pin"
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePin}
              />

              <button className="submit-button" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
