'use strict';
import Joi from 'joi';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //       len: {
    //           args: 2,
    //           msg: "FirstName must be atleast 2 characters in length"
    //       }
    //   }
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //       len: {
    //           args: [6, 128],
    //           msg: "Email address must be between 6 and 128 characters in length"
    //       },
    //       isEmail: {
    //           msg: "Email address must be valid"
    //       }
    //   }
    // },
    // userName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     len: {
    //       args: 6,
    //       msg: "UserName must me a latleast 6 characters in length"
    //     }
    //   }
    // },
    // passWord: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //       len: {
    //           args: 3
    //       }
    //   }
    // },
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    passWord: DataTypes.STRING,
    userImage: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
return User;
};