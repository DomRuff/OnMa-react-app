import React from 'react'

const Modal = ({isOpen, onClose, children}) => {
    
    if(!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-3xl">
        {children}
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal