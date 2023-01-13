import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Request = db.define('Request',{
    dateOf:{
        type: DataTypes.DATE
    },
    dateUntil:{
        type: DataTypes.DATE
    },
    type:{
        type: DataTypes.STRING
    },
    reason:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    idUser: {
        type: DataTypes.INTEGER

    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Request;