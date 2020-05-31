import React from 'react'

export const Link = (props) => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  )
}