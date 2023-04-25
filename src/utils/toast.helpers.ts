import { ToastContainer, toast } from 'react-toastify'

export const showSignupSuccessToastMessage = () => {
    toast.success('Account successfully created!', {
      position: toast.POSITION.TOP_CENTER,
    })
}

export const showPasswordMatchErrorToastMessage = () => {
    toast.error('Passwords must match!', {
      position: toast.POSITION.BOTTOM_CENTER,
    })
}

export const showPasswordNotValidErrorToastMessage = () => {
    toast.error(
      'Local password must contain at least 8 characters, at least one letter, at least one number, and at least one special character (@$!%*#?&)',
      {
        position: toast.POSITION.BOTTOM_CENTER,
      }
    )
}

export const showEmailNotValidErrorToastMessage = () => {
    toast.error('Email must be valid for signup!', {
      position: toast.POSITION.BOTTOM_CENTER,
    })
}