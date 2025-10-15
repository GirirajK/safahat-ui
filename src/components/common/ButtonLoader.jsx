import React from 'react'

const ButtonLoader = ({loaderColor = "var(--color-primary)"}) => {
  return (
    <div className="btn-loader"   style={{borderTopColor: loaderColor}}>
      <div className="loader"></div>
    </div>
  )
}

export default ButtonLoader