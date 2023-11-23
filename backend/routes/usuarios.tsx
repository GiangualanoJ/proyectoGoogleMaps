const { Router } = require('express');
const { Request, Response } = require('express');
const { getUsuarios, createUsuario, updateUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, (req: Request, res: Response) => {
  getUsuarios(req, res);
});
router.post('/createUsuario', (req: Request, res: Response) => {
  createUsuario(req, res);
});
router.put('/:id', validarJWT, (req: Request, res: Response) => {
  updateUsuario(req, res);
});
router.delete('/:id', validarJWT, (req: Request, res: Response) => {
  borrarUsuario(req, res);
});

export default router;
