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

const Hobi = sequelize.define(
	"hobi",
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

const CV2HOBI = sequelize.define(
	"cv2hobi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},hobi_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const Dil = sequelize.define(
	"dil",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},dil: {
			type: DataTypes.STRING(250),
		},bayrak: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2DIL = sequelize.define(
	"cv2dil",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},dil_id: {
			type: DataTypes.INTEGER,
		},puan: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const Yayin = sequelize.define(
	"yayin",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},name: {
			type: DataTypes.STRING(250),
		},yayinlayan_kurum: {
			type: DataTypes.STRING(250),
		},yayin_tarihi: {
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

const CV2YAYIN = sequelize.define(
	"cv2yayin",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},yayin_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const BilgisayarBecerisi = sequelize.define(
	"bilgisayar_becerisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},beceri: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2BilgisayarBecerisi = sequelize.define(
	"cv2bilgisayar_becerisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},bilgisayar_becerisi_id: {
			type: DataTypes.INTEGER,
		},puan: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const EgitimBilgisi = sequelize.define(
	"egitim_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},okul: {
			type: DataTypes.STRING(250),
		},bölüm: {
			type: DataTypes.STRING(250),
		},derece: {
			type: DataTypes.STRING(250),
		},baslangic: {
			type: DataTypes.DATE,
		},bitis: {
			type: DataTypes.DATE,
		},ilgini_ceken_ders: {
			type: DataTypes.STRING(250),
		},proje_arastirma_konulari: {
			type: DataTypes.STRING(1000),
		},aktif_klupler: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2EgitimBilgisi = sequelize.define(
	"cv2egitim_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},egitim_bilgisi_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const TecrubeBilgisi = sequelize.define(
	"tecrube_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},pozisyon: {
			type: DataTypes.STRING(250),
		},kurum: {
			type: DataTypes.STRING(250),
		},baslangic: {
			type: DataTypes.DATE,
		},bitis: {
			type: DataTypes.DATE,
		},gorev_1: {
			type: DataTypes.STRING(250),
		},gorev_2: {
			type: DataTypes.STRING(250),
		},gorev_3: {
			type: DataTypes.STRING(250),
		},teknolojiler: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2TecrubeBilgisi = sequelize.define(
	"cv2tecrube_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},tecrube_bilgisi_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const KursBilgisi = sequelize.define(
	"kurs_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},name: {
			type: DataTypes.STRING(250),
		},kurum: {
			type: DataTypes.STRING(250),
		},tamamlama_tarihi: {
			type: DataTypes.DATE,
		},yetenek_1: {
			type: DataTypes.STRING(250),
		},yetenek_2: {
			type: DataTypes.STRING(250),
		},yetenek_3: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2KursBilgisi = sequelize.define(
	"cv2kurs_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},kurs_bilgisi_id: {
			type: DataTypes.INTEGER,
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const ProjeBilgisi = sequelize.define(
	"proje_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},proje: {
			type: DataTypes.STRING(250),
		},yer: {
			type: DataTypes.STRING(250),
		},destekleyen_kurum: {
			type: DataTypes.STRING(250),
		},fonlayan_kurum: {
			type: DataTypes.STRING(250),
		},butce: {
			type: DataTypes.STRING(250),
		},gorev_1: {
			type: DataTypes.STRING(250),
		},gorev_2: {
			type: DataTypes.STRING(250),
		},gorev_3: {
			type: DataTypes.STRING(250),
		},teknolojiler: {
			type: DataTypes.STRING(250),
		},oduller: {
			type: DataTypes.STRING(250),
		}
	},
	{
		freezeTableName: true,
        createdAt: true,
        updatedAt: true
	}
);

const CV2ProjeBilgisi = sequelize.define(
	"cv2proje_bilgisi",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},cv_id: {
			type: DataTypes.INTEGER,
		},proje_bilgisi_id: {
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
CV.hasOne(MenteeForm);
MenteeForm.belongsTo(CV, {
	foreignKey: 'cv_id'
});
Mentee.hasOne(MenteeForm);
MenteeForm.belongsTo(Mentee, {
	foreignKey: 'mentee_id'
});

// CV - Hobi bağlantı
CV.hasOne(CV2HOBI);
CV2HOBI.belongsTo(CV, {
	foreignKey: 'cv_id'
});
Hobi.hasOne(CV2HOBI);
CV2HOBI.belongsTo(Hobi, {
	foreignKey: 'hobi_id'
});

// CV - Dil bağlantı
CV.hasOne(CV2DIL);
CV2DIL.belongsTo(CV, {
	foreignKey: 'cv_id'
});
Dil.hasOne(CV2DIL);
CV2DIL.belongsTo(Dil, {
	foreignKey: 'dil_id'
});

// CV - Yayin bağlantı
CV.hasOne(CV2YAYIN);
CV2YAYIN.belongsTo(CV, {
	foreignKey: 'cv_id'
});
Yayin.hasOne(CV2YAYIN);
CV2YAYIN.belongsTo(Yayin, {
	foreignKey: 'yayin_id'
});

// CV - BilgisayarBecerisi bağlantı
CV.hasOne(CV2BilgisayarBecerisi);
CV2BilgisayarBecerisi.belongsTo(CV, {
	foreignKey: 'cv_id'
});
BilgisayarBecerisi.hasOne(CV2BilgisayarBecerisi);
CV2BilgisayarBecerisi.belongsTo(BilgisayarBecerisi, {
	foreignKey: 'bilgisayar_becerisi_id'
});

// CV - EgitimBilgisi bağlantı
CV.hasOne(CV2EgitimBilgisi);
CV2EgitimBilgisi.belongsTo(CV, {
	foreignKey: 'cv_id'
});
EgitimBilgisi.hasOne(CV2EgitimBilgisi);
CV2EgitimBilgisi.belongsTo(EgitimBilgisi, {
	foreignKey: 'egitim_bilgisi_id'
});

// CV - TecrubeBilgisi bağlantı
CV.hasOne(CV2TecrubeBilgisi);
CV2TecrubeBilgisi.belongsTo(CV, {
	foreignKey: 'cv_id'
});
TecrubeBilgisi.hasOne(CV2TecrubeBilgisi);
CV2TecrubeBilgisi.belongsTo(TecrubeBilgisi, {
	foreignKey: 'tecrube_bilgisi_id'
});

// CV - KursBilgisi bağlantı
CV.hasOne(CV2KursBilgisi);
CV2KursBilgisi.belongsTo(CV, {
	foreignKey: 'cv_id'
});
KursBilgisi.hasOne(CV2KursBilgisi);
CV2KursBilgisi.belongsTo(KursBilgisi, {
	foreignKey: 'kurs_bilgisi_id'
});

// CV - ProjeBilgisi bağlantı
CV.hasOne(CV2ProjeBilgisi);
CV2ProjeBilgisi.belongsTo(CV, {
	foreignKey: 'cv_id'
});
ProjeBilgisi.hasOne(CV2ProjeBilgisi);
CV2ProjeBilgisi.belongsTo(ProjeBilgisi, {
	foreignKey: 'proje_bilgisi_id'
});


// Export
export default sequelize;
export { sequelize, PublicUser, SuperAdmin, Mentee, MenteeForm, CV, 
		Hobi, CV2HOBI, Dil, CV2DIL, Yayin, CV2YAYIN, BilgisayarBecerisi, 
		CV2BilgisayarBecerisi, EgitimBilgisi , CV2EgitimBilgisi, 
		TecrubeBilgisi, CV2TecrubeBilgisi, KursBilgisi, CV2KursBilgisi, 
		ProjeBilgisi , CV2ProjeBilgisi};