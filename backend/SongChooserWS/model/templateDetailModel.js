const ORM = require("../core/ORM");

const model = {
	id: {
		type: ORM.Types.BIGINT,
		autoIncrement: true,
	},
	template_id: ORM.Types.BIGINT,
	song_id: ORM.Types.BIGINT,
	order_index: ORM.Types.BIGINT,
	template_song_name: ORM.Types.VARCHAR,
}
const modelInterface = new ORM.Table("TemplateDetail", model);

module.exports = modelInterface;