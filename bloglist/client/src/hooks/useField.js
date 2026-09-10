import { useState } from 'react'

// Custom hook: useField
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  //Export
  return [{ type, value, onChange }, reset]
}
