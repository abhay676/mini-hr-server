export const Form = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'forms',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'text', action: 3, position: 1 },
      },
      email: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'email', action: 3, position: 2 },
      },
      phoneNumber: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'number', action: 3, position: 3 },
      },
      designation: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'text', action: 2, position: 4 },
      },
      currentCTC: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'number', action: 3, position: 5 },
      },
      expectedCTC: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'number', action: 1, position: 6 },
      },
      noticePeriod: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'number', action: 3, position: 7 },
      },
      resume: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'file', action: 3, position: 0 },
      },
      linkedInUrl: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'text', action: 2, position: 8 },
      },
      githubUrl: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'text', action: 2, position: 9 },
      },
      otherLink: {
        type: DataTypes.JSONB,
        defaultValue: { type: 'text', action: 2, position: 10 },
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
