export const Company = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'company',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return model;
};
