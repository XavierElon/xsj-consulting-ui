import { getCookie, getCookies, setCookie } from 'cookies-next'
import { sign, verify } from 'jsonwebtoken'

export const authJwt= async () => {
    const accessToken = getCookie('access-token')
    console.log(accessToken)
    // if (!accessToken) return res.status(400).json({ error: 'User not authenticated '})
    // try {
    //     const validToken = verify(accessToken, process.env.JWT_SECRET)
    //     req.use = validToken
    //     if (validToken) {
    //       req.authenticated = true

    //     }
    //   } catch (err) {
    //     console.log('Error in validateToken: ' + err)
    //     return res.status(400).json({ error: err })
    //   }
}