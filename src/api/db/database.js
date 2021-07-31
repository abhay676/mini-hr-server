import sequelizeRoot, { Sequelize } from 'sequelize';
import { Company } from '../models/company.model.js';
import { User } from '../models/user.model.js';
import { Job } from '../models/job.model.js';
import { Form } from '../models/form.model.js';
import { Candidate } from '../models/candidate.model.js';
import { Upload } from '../models/upload.model.js';
import { environment } from '../../config/environment.js';
const { DataTypes } = sequelizeRoot;
const db = {};
let sequelize;
sequelize = new Sequelize(
  environment.DATABASE,
  environment.DB_USERNAME,
  environment.DB_PWD,
  {
    host: environment.DB_HOST,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.Company = Company(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);
db.Job = Job(sequelize, DataTypes);
db.Form = Form(sequelize, DataTypes);
db.Candidate = Candidate(sequelize, DataTypes);
db.Upload = Upload(sequelize, DataTypes);

//! Associations
db.Company.hasMany(db.User);
db.Company.hasMany(db.Job);
db.User.hasMany(db.Job);
db.Job.hasMany(db.Form);
db.Job.hasMany(db.Candidate);
db.Candidate.hasMany(db.Upload);

db.User.belongsTo(db.Company, {
  onDelete: 'cascade',
  as: 'cId',
  foreignKey: 'companyId',
  foreignKeyConstraint: true,
});

db.Job.belongsTo(db.Company, {
  onDelete: 'cascade',
});

db.Job.belongsTo(db.User);
db.Candidate.belongsTo(db.Job);

db.Form.belongsTo(db.Job, {
  onDelete: 'cascade',
});

db.Upload.belongsTo(db.Candidate, {
  onDelete: 'cascade',
});

export default db;
