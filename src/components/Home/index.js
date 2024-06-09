import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
          <img
            className="digital-card-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </>
    )
  }
}

export default Home
