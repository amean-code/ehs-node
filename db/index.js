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

const CV = sequelize.define(
	"cv",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const MentoringProcessGeneralInformation = sequelize.define(
	"mentoring_process_general_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		cv_id: {
			type: DataTypes.INTEGER
		},
		question_1: {
			type: DataTypes.STRING
		},
		question_2: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		question_3: {
			type: DataTypes.STRING
		},
		question_4: {
			type: DataTypes.STRING
		},
		question_5: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
)

const UniversityRepresentationProcessGeneralInformation = sequelize.define(
	"university_representation_process_general_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		cv_id: {
			type: DataTypes.INTEGER
		},
		question_1: {
			type: DataTypes.STRING
		},
		question_2: {
			type: DataTypes.STRING
		},
		question_3: {
			type: DataTypes.STRING
		},
		question_4: {
			type: DataTypes.STRING
		},
		question_5: {
			type: DataTypes.STRING
		},
		question_6: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
)

const PostMentoringProcess = sequelize.define(
	"post_mentoring_process",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		cv_id: {
			type: DataTypes.INTEGER
		},
		question_1: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		question_2: {
			type: DataTypes.STRING
		},
		question_3: {
			type: DataTypes.STRING
		},
		question_4: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
)

const MentoringProcessDetailedInformation = sequelize.define(
	"mentoring_process_detailed_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		cv_id: {
			type: DataTypes.INTEGER
		},
		lisans_ve_lisansustu_tez_mentorlugu_question_1: {
			type: DataTypes.STRING
		},
		lisans_ve_lisansustu_tez_mentorlugu_question_2: {
			type: DataTypes.STRING
		},
		lisans_ve_lisansustu_tez_mentorlugu_question_3: {
			type: DataTypes.STRING
		},
		proje_mentorlugu_question_1: {
			type: DataTypes.STRING
		},
		proje_mentorlugu_question_2: {
			type: DataTypes.STRING
		},
		proje_mentorlugu_question_3: {
			type: DataTypes.STRING
		},
		akademik_ve_kariyer_mentorlugu_question_1: {
			type: DataTypes.STRING
		},
		akademik_ve_kariyer_mentorlugu_question_2: {
			type: DataTypes.STRING
		},
		girisimcilik_mentorlugu_question_1: {
			type: DataTypes.STRING
		},
		girisimcilik_mentorlugu_question_2: {
			type: DataTypes.STRING
		},
		girisimcilik_mentorlugu_question_3: {
			type: DataTypes.STRING
		},
		akran_mentorlugu_question_1: {
			type: DataTypes.STRING
		},
		akran_mentorlugu_question_2: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
)

const Hobby = sequelize.define(
	"hobby",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},name: {
			type: DataTypes.STRING(250),
		},description: {
			type: DataTypes.STRING(4000),
		},isProfiessional: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2Hobby = sequelize.define(
	"cv2hobby",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},hobby_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const Language = sequelize.define(
	"language",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},language: {
			type: DataTypes.STRING(250),
		},flag: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2Language = sequelize.define(
	"cv2language",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},language_id: {
			type: DataTypes.INTEGER,
		},point: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const Publish = sequelize.define(
	"publish",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},name: {
			type: DataTypes.STRING(250),
		},publishing_institution: {
			type: DataTypes.STRING(250),
		},publish_date: {
			type: DataTypes.STRING(250),
		},DOI: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2Publish = sequelize.define(
	"cv2publish",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},publish_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const ComputerSkill = sequelize.define(
	"computer_skill",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},skill: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2ComputerSkill = sequelize.define(
	"cv2computer_skill",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},computer_skill_id: {
			type: DataTypes.INTEGER,
		},point: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const EducationInformation = sequelize.define(
	"education_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},university: {
			type: DataTypes.STRING(250),
		},department: {
			type: DataTypes.STRING(250),
		},rate: {
			type: DataTypes.STRING(250),
		},start_date: {
			type: DataTypes.DATE,
		},finish_date: {
			type: DataTypes.DATE,
		},interesting_lesson: {
			type: DataTypes.STRING(250),
		},project_research_topics: {
			type: DataTypes.STRING(1000),
		},active_clubs: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2EducationInformation = sequelize.define(
	"cv2education_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},education_information_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const ExperienceInformation = sequelize.define(
	"experience_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},position: {
			type: DataTypes.STRING(250),
		},institution: {
			type: DataTypes.STRING(250),
		},start_date: {
			type: DataTypes.DATE,
		},finish_date: {
			type: DataTypes.DATE,
		},task_1: {
			type: DataTypes.STRING(250),
		},task_2: {
			type: DataTypes.STRING(250),
		},task_3: {
			type: DataTypes.STRING(250),
		},technologies: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2ExperienceInformation = sequelize.define(
	"cv2experience_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},experience_information_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CourseInformation = sequelize.define(
	"course_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},name: {
			type: DataTypes.STRING(250),
		},institution: {
			type: DataTypes.STRING(250),
		},finish_date: {
			type: DataTypes.DATE,
		},skill_1: {
			type: DataTypes.STRING(250),
		},skill_2: {
			type: DataTypes.STRING(250),
		},skill_3: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2CourseInformation = sequelize.define(
	"cv2course_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},course_information_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const ProjectInformation = sequelize.define(
	"project_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},project: {
			type: DataTypes.STRING(250),
		},city: {
			type: DataTypes.STRING(250),
		},supporting_institution: {
			type: DataTypes.STRING(250),
		},funding_institution: {
			type: DataTypes.STRING(250),
		},budget: {
			type: DataTypes.STRING(250),
		},task_1: {
			type: DataTypes.STRING(250),
		},task_2: {
			type: DataTypes.STRING(250),
		},task_3: {
			type: DataTypes.STRING(250),
		},technologies: {
			type: DataTypes.STRING(250),
		},awards: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2ProjectInformation = sequelize.define(
	"cv2project_information",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},project_information_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

// CV - Mentee bağlantı
// CV.hasOne(MenteeForm);
// MenteeForm.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// Mentee.hasOne(MenteeForm);
// MenteeForm.belongsTo(Mentee, {
// 	foreignKey: 'mentee_id'
// });

// // CV - Hobby bağlantı
// CV.hasOne(CV2Hobby);
// CV2Hobby.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// Hobby.hasOne(CV2Hobby);
// CV2Hobby.belongsTo(Hobby, {
// 	foreignKey: 'hobby_id'
// });

// // CV - Language bağlantı
// CV.hasOne(CV2Language);
// CV2Language.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// Language.hasOne(CV2Language);
// CV2Language.belongsTo(Language, {
// 	foreignKey: 'language_id'
// });

// // CV - Publish bağlantı
// CV.hasOne(CV2Publish);
// CV2Publish.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// Publish.hasOne(CV2Publish);
// CV2Publish.belongsTo(Publish, {
// 	foreignKey: 'publish_id'
// });

// // CV - ComputerSkill bağlantı
// CV.hasOne(CV2ComputerSkill);
// CV2ComputerSkill.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// ComputerSkill.hasOne(CV2ComputerSkill);
// CV2ComputerSkill.belongsTo(ComputerSkill, {
// 	foreignKey: 'computer_skill_id'
// });

// // CV - EducationInformation bağlantı
// CV.hasOne(CV2EducationInformation);
// CV2EducationInformation.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// EducationInformation.hasOne(CV2EducationInformation);
// CV2EducationInformation.belongsTo(EducationInformation, {
// 	foreignKey: 'education_information_id'
// });

// // CV - ExperienceInformation bağlantı
// CV.hasOne(CV2ExperienceInformation);
// CV2ExperienceInformation.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// ExperienceInformation.hasOne(CV2ExperienceInformation);
// CV2ExperienceInformation.belongsTo(ExperienceInformation, {
// 	foreignKey: 'experience_information_id'
// });

// // CV - CourseInformation bağlantı
// CV.hasOne(CV2CourseInformation);
// CV2CourseInformation.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// CourseInformation.hasOne(CV2CourseInformation);
// CV2CourseInformation.belongsTo(CourseInformation, {
// 	foreignKey: 'course_information_id'
// });

// // CV - ProjectInformation bağlantı
// CV.hasOne(CV2ProjectInformation);
// CV2ProjectInformation.belongsTo(CV, {
// 	foreignKey: 'cv_id'
// });
// ProjectInformation.hasOne(CV2ProjectInformation);
// CV2ProjectInformation.belongsTo(ProjectInformation, {
// 	foreignKey: 'project_information_id'
// });


// Export
export default sequelize;
export { sequelize, PublicUser, SuperAdmin, Mentee, MenteeForm, CV, 
		Hobby, CV2Hobby, Language, CV2Language, Publish, CV2Publish, ComputerSkill, 
		CV2ComputerSkill, EducationInformation , CV2EducationInformation, 
		ExperienceInformation, CV2ExperienceInformation, CourseInformation, CV2CourseInformation, 
		ProjectInformation , CV2ProjectInformation,MentoringProcessGeneralInformation,MentoringProcessDetailedInformation, PostMentoringProcess, UniversityRepresentationProcessGeneralInformation};