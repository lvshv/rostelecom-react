import React, { useRef, useEffect } from 'react'
import data from './Json.json'

export const LastTask = () => {
  let jsonData = useRef(null)
  useEffect(() => {
    jsonData.current.innerHTML = data.map(obj => obj.text)
  }, [])

  return <div className='text-start mb-5' ref={jsonData}></div>
}
