import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            cookie.serialize('refresh', '', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                path: '/api/'
            })
        ])
        return res.status(200).json({message: 'Logout successful'})
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`})
    }
}