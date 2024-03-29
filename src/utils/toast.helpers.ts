import { toast } from 'react-toastify'

export const showSignupSuccessToastMessage = () => {
    toast.success('Account successfully created!', {
      position: toast.POSITION.TOP_CENTER,
    })
}

export const showLoginSuccessToastMessage = () => {
  toast.success('Login successful', {
    position: toast.POSITION.TOP_CENTER,
  })
}

export const showLoginErrorToastMessage = () => {
  toast.error('Password and username do not match!', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

export const showEmailDoesNotExistErrorToastMessage = () => {
  toast.error('Email does not exist.', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

export const showIncorrectLoginInfoErrorToastMessage = () => {
  toast.error('Incorrect username or password combination.', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

export const showPasswordResetSuccessfullyToastMessage = () => {
  toast.success('Password successfully reset!', {
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