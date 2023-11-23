/* const { dbConnection } = require ('../config/database');
const { DataTypes, Model } = require ('sequelize');


interface UsuarioAttributes {
    nombre: string;
    email: string;
}

class Usuario extends Model<UsuarioAttributes, UsuarioAttributes> {
    public nombre!: string;
    public email!: string;

    public readonly id!: number;
}

Usuario.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: dbConnection,
        modelName: 'Usuario',
        timestamps: false,
    }
);

// Sincronizar la tabla
dbConnection.sync({ force: true }) // Cambiar a force: true si deseas recrear la tabla
    .then(() => {
        console.log("Tabla Usuarios sincronizada correctamente");
    })
    .catch((error: any) => console.log(error)); // Puedes definir un tipo más específico para el parámetro error

export default Usuario;
 */