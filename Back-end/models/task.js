
module.exports = (sequelize,DataTypes)=>{
const Task = sequelize.define('Task',{

    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isCompleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
},
{
    tableName: 'tasks',
    timestamps: false,
});

Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }; // this is a way to associate the task with the user
  

return Task;
}


