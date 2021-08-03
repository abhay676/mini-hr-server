export const Job = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'jobs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      maxExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      benefits: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      minEquity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      maxEquity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
      },
      maxCompensation: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      minCompensation: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
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
