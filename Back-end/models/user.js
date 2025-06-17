
module.exports = (sequelize,DataTypes)=>{

const User = sequelize.define('User',{

    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
},
{
    timestamps: false, 
    tableName: 'users'
});

User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
  }; // this is a way to associate the user with the task
  

return User;
}


