import React from 'react'
import InputField from '../auth/InputField'

const SearchBox = () => {
  return (
    <div className="mb-3 p-1 w-full max-w-xs">
    <div className="relative">
      <InputField
        type="text"
        placeholder="Search by Tag or Caption"
      />
    </div>
  </div>
  )
}

export default SearchBox