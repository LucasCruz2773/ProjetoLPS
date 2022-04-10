module.exports = (sequelize, DataTypes) => {
    const Title = sequelize.define("Title", {
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        deadline: DataTypes.INTEGER,
        description: DataTypes.STRING,
        type: DataTypes.STRING,
    });

    return Title;
}