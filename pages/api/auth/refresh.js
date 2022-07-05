import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? '')

        const refresh = cookies.refresh ?? false

        if (refresh === false) {
            return res.status(401).json({error: 'User unauthorized'})
        }

        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token/refresh`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"refresh": refresh})
            })
            let data = await response.json()
            if (response.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 24 ,
                            secure: process.env.NODE_ENV !== 'development',
                            path: '/api/'
                        }
                    )
                ])
                return res.status(200).json(data)
            } else {
                return res.status(response.status).json(data)
            }
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`})
    }
}