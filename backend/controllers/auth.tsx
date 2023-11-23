const { generarJWT } = require('../helpers/jwt');
const admin = require('firebase-admin');
const Usuario = require("../models/usuario")
import { RequestWithFirebaseToken } from '../types';


const login = async (req: RequestWithFirebaseToken, res: Response) => {
  try {
    const { firebaseToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const user = {
      nombre: decodedToken.name,
      email: decodedToken.email,
    };

    let usuarioDB = await Usuario.findOne({ where: { email: user.email } });

    if (!usuarioDB) {
      usuarioDB = await Usuario.create(user);
    }
/* 
    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    res.status(200).send({
      ok: true,
      token,
      usuario: usuarioDB,
    }); */
  } catch (error) {
    console.log(error);
    /* res.status(500).send({
      ok: false,
      msg: "Hable con el administrador",
    }); */
  }
};

export { login };
