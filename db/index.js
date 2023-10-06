import dotenv from 'dotenv';
dotenv.config();
import { Sequelize, DataTypes } from "sequelize";
let sequelize;

// Veri Tabani Bağlantı
if (process.env.NODE_ENV == "production") {
	if (process.env.DATABASE_URL == undefined) {
		throw new Error("DATABASE_URL is not available");
	} else {
		sequelize = new Sequelize(process.env.DATABASE_URL, {
			dialect: "postgres",
			dialectOptions: {
				ssl: {
					rejectUnauthorized: false
				}
			}
		});
	}
} else {
	sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
		dialect: "postgres",
	});
}

// Ana Tablolar

const PublicUser = sequelize.define(
	"public_user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		surname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		verified: {
			type: DataTypes.BOOLEAN
		},
		verify_code: {
			type: DataTypes.STRING
		},
		accepted: {
			type: DataTypes.BOOLEAN
		}
	},
	{
		freezeTableName: true,
	}
);

const SuperAdmin = sequelize.define(
	"super_admin",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		surname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
	}
);

const Mentee = sequelize.define(
	"mentee",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		surname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
        phone: {
            type: DataTypes.STRING
        },
        linkedin: {
            type: DataTypes.STRING
        },
        form_id: {
            type: DataTypes.INTEGER
        },
		password: {
			type: DataTypes.STRING,
		},
		verified: {
			type: DataTypes.BOOLEAN
		},
		verify_code: {
			type: DataTypes.STRING
		},
		accepted: {
			type: DataTypes.BOOLEAN
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const MenteeForm = sequelize.define(
	"mentee_form",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		mentee_id: {
            type: DataTypes.INTEGER
        },
        cv_id: {
            type: DataTypes.INTEGER
        }
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

// Export
export default sequelize;
export { sequelize, PublicUser, SuperAdmin, Mentee};