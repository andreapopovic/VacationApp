import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const Absence = db.define('Absence',{
    dateOf:{
        type: DataTypes.DATE
    },
    dateUntil:{
        type: DataTypes.DATE
    },
    type:{
        type: DataTypes.STRING
    },
    idUser: {
        type: DataTypes.INTEGER

    }
},{
    freezeTableName: true
});

export default Absence
