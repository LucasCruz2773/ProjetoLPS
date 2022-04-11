module.exports = (sequelize, DataTypes) => {
    const Treservation = sequelize.define("Treservation", {
        id_reservation: DataTypes.INTEGER,
        id_title: DataTypes.INTEGER,
    });

    return Treservation;
}