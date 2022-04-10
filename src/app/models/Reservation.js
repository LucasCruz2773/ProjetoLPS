module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define("Reservation", {
        id_user: DataTypes.INTEGER,
        initial_date: DataTypes.DATE,
        final_date: DataTypes.DATE,
        status: DataTypes.STRING
    });

    return Reservation;
}