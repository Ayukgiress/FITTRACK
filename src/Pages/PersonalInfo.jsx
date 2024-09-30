import React from 'react'

const PersonalInfo = () => {
  return (
    <div>
      <form >
        <div>
          <label htmlFor="height">Height</label>
          <input type="num"  placeholder='height'/>
        </div>
        <div>
          <label htmlFor="weight">Current Weight</label>
          <input type="num" placeholder='weight' />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </form>
    </div>
  )
}

export default PersonalInfo