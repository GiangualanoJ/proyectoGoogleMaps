import jwt from 'jsonwebtoken';

const generarJWT = (uid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };

        const secret = process.env.JWT_SECRET || '';
        jwt.sign(payload, secret, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else if (typeof token === 'string') {
                resolve(token);
            } else {
                reject('No se pudo generar el JWT');
            }
        });
    });
}

export {generarJWT} ;
