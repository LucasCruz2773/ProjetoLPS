module.exports = (sequelize, DataTypes) => {
    const Penalty = sequelize.define("Penalty", {
        id_reservation: DataTypes.INTEGER,
        value: DataTypes.INTEGER,
        paid_at: DataTypes.DATE,
    });

    return Penalty;
}