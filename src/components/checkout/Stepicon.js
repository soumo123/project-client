import React from 'react'

const Stepicon = (props) => {
    const { active, completed, icon } = props;
    const step = steps[icon - 1];
  return (
   <>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24
      }}
    >
      <img src={step.img} alt={step.label} style={{ width: '100%', height: '100%' }} />
    </div>
   </>
  )
}

export default Stepicon