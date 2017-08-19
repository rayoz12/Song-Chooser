const ORM = require("../core/ORM");

const model = {
	id: {
		type: ORM.Types.BIGINT,
		autoIncrement: true,
	},
	song_name: ORM.Types.VARCHAR,
	path: ORM.Types.VARCHAR,
	tags: ORM.Types.VARCHAR,
}
const modelInterface = new ORM.Table("Song", model);

module.exports = modelInterface;