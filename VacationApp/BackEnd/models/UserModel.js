import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('Users',{
    type:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    lastname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default User;