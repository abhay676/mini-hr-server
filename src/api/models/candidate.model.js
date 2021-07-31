export const Candidate = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'candidates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentCTC: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expectedCTC: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      noticePeriod: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkedInUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      githubUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otherLink: {
        type: DataTypes.STRING,
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
