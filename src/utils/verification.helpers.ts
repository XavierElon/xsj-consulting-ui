/*
EMAIL VALIDATION
- starts with an alphanumeric character or one of the following special characters: . ! # $ % & ' * + / = ? ^ _ ` { | } ~ -
- contains an @ symbol
- has a domain name with one or more dots (.)
- contains only lowercase and uppercase letters, numbers, dots, hyphens, and/or underscores
- must end in .com
*/
export const validateEmail = (value: string): boolean => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.com$/
    return regex.test(value)
  }

/*
PASSWORD VALIDATION
- contains at least 8 characters
- contains at least one letter
- contains at least one number
- contains at least one special character (@$!%*#?&)
*/
export const validatePassword = (value: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return regex.test(value)
}