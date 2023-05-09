import { getCookie, getCookies, setCookie } from 'cookies-next'
import { sign, verify } from 'jsonwebtoken'

export async function GET(request: Request, response: Response) {
    const accessToken = getCookie('access-token')
    // return new Response(accessToken)
  }
  