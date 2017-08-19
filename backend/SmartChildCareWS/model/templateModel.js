const ORM = require("../core/ORM");

const model = {
	id: {
		type: ORM.Types.BIGINT,
		autoIncrement: true,
	},
	name: ORM.Types.VARCHAR,
}
const modelInterface = new ORM.Table("Template", model);

module.exports = modelInterface;