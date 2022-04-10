module.exports = (sequelize, DataTypes) => {
    const titlereservations = sequelize.define("titlereservations", {
        id_reservation: DataTypes.INTEGER,
        id_title: DataTypes.INTEGER
    },{
        tableName: 'titlereservations'
    });

    return titlereservations;
}