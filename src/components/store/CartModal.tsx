const CartModal = () => {
  return (
    <div className="flex flex-col">
      <div
        style={{ width: '450px' }}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 className="text-black text-center">Sign Up with Email</h2>
        {/* <form>
              <div className="al">
                <p style={pStyle} className="mx-10">
                  <span className="text-[#0069FF]">first name </span>
                  <span className="text-red-600 relative top-1">*</span>
                </p>
                <TextField
                  required
                  id="outlined-required"
                  size="small"
                  className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="al">
                <p style={pStyle} className="mx-10">
                  <span className="text-[#0069FF]">last name </span>
                  <span className="text-red-600 relative top-1">*</span>
                </p>
                <TextField
                  required
                  id="outlined-required"
                  size="small"
                  className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <p style={pStyle} className="mx-10">
                <span className="text-[#0069FF]">email </span>
                <span className="text-red-600 relative top-1">*</span>
              </p>
              <TextField
                id="outlined-email-input"
                size="small"
                autoComplete="current-email"
                className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && validEmail && (
                <p className="text-red-600 relative mx-10 top-1">{errorMessage}</p>
              )}
              {!validEmail && (
                <div className="h-6">
                  <p className="text-red-600 mx-10">Email address must be valid</p>
                </div>
              )}
              <p style={pStyle} className="mx-10">
                <span className="text-[#0069FF]">password </span>
                <span className="text-red-600 relative top-1">*</span>
              </p>
              <TextField
                id="outlined-password-input"
                type="password"
                size="small"
                autoComplete="current-password"
                className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={pStyle} className="mx-10">
                <span className="text-[#0069FF]">confirm password </span>
                <span className="text-red-600 relative top-1">*</span>
              </p>
              <TextField
                id="outlined-password-input"
                type="password"
                size="small"
                autoComplete="current-password"
                className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setPasswordsMatch(e.target.value === password)
                }}
              />
              {!passwordsMatch && (
                <div className="h-6">
                  <p className="text-red-600 mx-10">Passwords do not match</p>
                </div>
              )}
    
              <button
                type="submit"
                className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
                style={submitButtonStyle}
                onClick={handleSignup}
              >
                Sign Up
              </button>
              <Button
                variant="outlined"
                size="medium"
                className="inline-block text-black bg-white hover:bg-[#0061EB] rounded-lg border-gray-200 border-2 mx-10"
                sx={googleButtonStyle}
                onClick={() => handleGoogleLogin()}
              >
                <Image
                  src={GoogleLogo}
                  width="16"
                  height="16"
                  alt="Google"
                  className="inline-block mx-2"
                />
                Sign Up with Google
              </Button>
            </form> */}
      </div>
    </div>
  )
}

export default CartModal
