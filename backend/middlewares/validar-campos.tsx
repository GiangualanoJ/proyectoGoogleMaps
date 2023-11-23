import { Request, Response, NextFunction, RequestHandler } from 'express';
const { validationResult } = require('express-validator');

const validarCampos: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped(),
        });
    }

    next();
};

export { validarCampos };
