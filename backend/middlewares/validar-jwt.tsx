import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    uid: string;
}

const validarJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET || '') as { uid: string }; 
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
};

export { validarJWT };
