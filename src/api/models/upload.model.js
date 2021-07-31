export const Upload = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'uploads',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fileId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      resumeLink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
