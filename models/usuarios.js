import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  data_nasc: {
    type: DataTypes.DATEONLY,
  },
  cpf: {
    type: DataTypes.CHAR(11),
    unique: true,
  },
  foto_url: { 
    type: DataTypes.STRING(150), 
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

export default Usuario;
