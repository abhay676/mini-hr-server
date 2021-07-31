export const OTP = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'otp',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      OTP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return model;
};
