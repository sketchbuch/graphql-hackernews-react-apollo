import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

export const Headercomp = () => {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          Latest
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          Submit News
        </Link>
      </div>
    </div>
  )
}

export const Header = withRouter(Headercomp)