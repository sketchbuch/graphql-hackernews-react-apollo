import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../constants/auth'

export const Headercomp = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          Latest
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              Submit News
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken && (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              props.history.push(`/`)
            }}
          >
            logout
          </div>
        )}
        {!authToken && (
          <Link to="/login" className="ml1 no-underline black">
            Login
          </Link>
        )}
      </div>
    </div >
  )
}

export const Header = withRouter(Headercomp)