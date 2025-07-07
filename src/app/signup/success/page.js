import React from 'react'

const Success = ({message}) => {
  return (
    <div>
        <div className="px-2 min-h-screen w-screen flex justify-center items-center">
              <div className="rounded bg-green-500 text-white text-center py-1">
                {message}
              </div>
            </div>
    </div>
  )
}

export default Success