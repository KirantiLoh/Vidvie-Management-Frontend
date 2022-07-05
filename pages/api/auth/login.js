import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body

        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username':username, 'password':password})
            })
            let data = await response.json()
            if (response.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('refresh', data.refresh, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 ,
                        path: '/api/'
                    })
                ])
                return res.status(200).json(data)
            } else {
                return res.status(response.status).json({message: 'Authentication failed'})
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`})
    }
}