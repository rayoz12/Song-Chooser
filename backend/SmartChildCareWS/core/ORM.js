let knex = require("./db");
let queryBuilder = require("./queryBuilder");

let types = {
    DATE: 1,
    TIME: 2,
	DATETIME: 3,
    BIGINT: 4,
	INT: 5,
    VARCHAR: 6,
    MONEY: 7,
    NVARCHAR: 8
}
// this will be merged into all models
let timeStampFields = {
	owner: types.BIGINT,
	created_by: types.BIGINT,
	last_modified_by: types.BIGINT,
	created_at: types.DATETIME,
	last_updated_at: types.DATETIME
}

class Table {
    /**
     * Constructs the Table from the model provided.
     * @param {string} tableName The name of the table in the DB
     * @param {Object} model An object that maps the tables fields to types provided the ORM module.
     */
    constructor(tableName, model) {
        //table name string
        this.tableName = tableName;//escape special tables
        //model is the fields to expect with for the database. If fields exist in the database but not this model they will be set as null.
        this.model = model;
		//merge model with timestamp fields
		Object.assign(model, timeStampFields);
        Object.freeze(this.model);//Makes changes to model not work.
        this.autoIncrement = false;
        this.identityField = "";
        //For loop to check model for any options.
        for (let key in this.model) {
            if (!this.model.hasOwnProperty(key))
                continue;
            //This condition checks if the values aren't numbers (which are set by the types). If they aren't numbers then that means the user has entered some extra data in.
            if (typeof this.model[key] == "object") {
                //auto increment option
                if (this.model[key].hasOwnProperty("autoIncrement")) {
                    if (this.model[key].autoIncrement) {
                        //check if already defined and throw error, there should only be one identity
                        if (this.autoIncrement) {
                            throw new Error("Auto increment field has already been defined");
                        }
                        this.autoIncrement = true;
                        this.identityField = key;
                    }
                }
                //can check for more options here.
            }
        }
    }
    /**
     * Creates a record with newRecord passed. Any fields given in newRecord but not in the model will be ignored
     * @param {Object} newRecord An object that maps fields to the value to create.
     * @param {Object} user The user that's calling this create method.
     */
    create(newRecord) {
        const knexInsert = knex(this.tableName);
        queryBuilder.insertQueryKnex(knexInsert, this.model, newRecord, this.identityField);
        console.log(`[ORM] INSERTING INTO ${this.tableName}: ${knexInsert.toString()}`);
        return knexInsert;
    }
    /**
     * Creates the new records in a batch operation.
     * @param {Array<Object>} newRecords An array of new records to create.
     * @param {Object} user The user that's calling this create method
     */
    createBatch(newRecords) {
        const knexInsertBatch = knex(this.tableName);
        queryBuilder.insertBatchQueryKnex(knexInsertBatch, this.model, newRecords, this.identityField);
        console.log(`[ORM] Batch INSERTING INTO ${this.tableName}`);
        return knexInsertBatch;
    }
    /**
     * Update a record with the ID in updatedRecord. The model's fields must map to the values to update. Any fields not in the model will be ignored.
     * @param {Object} updatedRecord The Updated record must have a key ID with the id of the record
     * @param {Object} user The user calling this method
     */
    update(updatedRecord) {
        const updateKnex = knex(this.tableName);
        queryBuilder.updateQuery(updateKnex, this.model, updatedRecord, this.identityField);
        console.log(`[ORM] UPDATING ${this.tableName}: ${updateKnex.toString()}`);
        return updateKnex;
    }

    updateBatch(updatedRecords) {
        let query = "SET xact_abort ON;\n" +
            "BEGIN TRANSACTION\n";

        for (let i = 0; i < updatedRecords.length; i++) {
            for (let key in updatedRecords[i]) {
                //delete any collumns not in the model.
                if (!this.model.hasOwnProperty(key))
                    delete updatedRecords[i][key];
            }
            //remove escaping brackets.
            const table = this.tableName[0] === "[" ? this.tableName.slice(1, -1) : this.tableName;
            const id = updatedRecords[i].id;
            delete updatedRecords[i].id;
            const recordQuery = knex(table).update(updatedRecords[i]).where("id", id).toString();
            query += recordQuery.slice(0, recordQuery.indexOf("select @@rowcount")); // remove extra text added by knex.
            query += "\n";
        }
        query += "COMMIT TRANSACTION";
        console.log(`[ORM] Updating Batch for ${this.tableName}:\n ${query}`);
        return knex.raw(query);
        //return new Promise(resolve => { resolve(query) });
    }
    /**
     * Delete a record from the table.
     * @param {number} id The ID of the row to delete.
     */
    delete(id) {
        const knexDelete = knex(this.tableName).del().where("id", id);
        console.log(`[ORM] Deleteing record from ${this.tableName}: ${knexDelete.toString()}`);
        return knexDelete;
    }
    /**
     * Delete records from the table conditionally. If no fields from the model are matched an error is thrown
     * @param {Object} filter A filter which maps model's fields to the values to select.
     */
    deleteWhere(filter) {
        const knexDeleteWhere = knex(this.tableName).del();
        queryBuilder.whereQueryKnex(knexDeleteWhere, filter, this.model);
        console.log(`[ORM] DeleteWhere called for: ${this.tableName}: ${knexDeleteWhere.toString()}`);
        return knexDeleteWhere;
    }
    /**
     * Find records that match the filter provided. 
     * @param {Object} filter A filter which maps model's fields to the values to select.
     * @param {Number} [limit=null] The limit of records to return. Ommiting this would give all records (from offset if defined)
     * @param {Number} [offset=null] The offset of records to look from. Ommiting this would give records from the start
     */
    where(filter, limit = null, offset = null, orderBy = null) {
        const knexWhere = knex(this.tableName);
        const query = queryBuilder.whereQueryKnex(knexWhere, filter, this.model);
        knexWhere.offset(offset);
        if (limit !== null) {
            knexWhere.limit(limit);
            knexWhere.orderBy(orderBy);
        }
        console.log(`[ORM] Where called for: ${this.tableName}: ${query}`);
        return knexWhere;
    }
    //fields is an array of json objects that indicate the left and right tables and joins.
    //JSON object format is: {tableLeft: Person, tableRight: Staff, fieldLeft: id, fieldRight: person_id}
    /**
     * Inner join Tables requested with an optional where filter to select records.
     * @param {Object[]} fields An Object that describes the tables and columns to inner join on.
     * @param {any} whereFilter An optional filter to select particular records. Pass null if you don't this need a filter.
     */
    innerJoin(fields, whereFilter, limit = null, offset = null, orderBy = null) {
        //assign joins first
        const table = this.tableName[0] === "[" ? this.tableName.slice(1, -1) : this.tableName;
        const baseJoin = knex(table);
        const tableJoins = []; //keeps a track of all tables used so that duplicates ones can be alaised.
        for (let i = 0; i < fields.length; i++) {
            let tableLeft = fields[i].tableLeft;
            let tableRight = fields[i].tableRight;
            const fieldLeft = fields[i].fieldLeft;
            const fieldRight = fields[i].fieldRight;
            if (tableJoins.includes(tableRight)) {
                tableRight = `${tableRight} as ${tableRight[0]}_${i}`;
                baseJoin.innerJoin(tableRight,
                    `${tableLeft}.${fieldLeft}`,
                    `${tableRight[0]}_${i}.${fieldRight}`);
            } else {
                tableJoins.push(tableRight);
                baseJoin.innerJoin(tableRight,
                    `${tableLeft}.${fieldLeft}`,
                    `${tableRight}.${fieldRight}`);
            }
        }
        //remove escaping brackets.
        if (whereFilter !== null && Object.keys(whereFilter).length !== 0) {
            queryBuilder.whereQueryKnex(baseJoin, whereFilter, this.model);
        }
        baseJoin.offset(offset);
        if (limit !== null) {
            baseJoin.limit(limit);
            baseJoin.orderBy(orderBy);
        }
        console.log(`[ORM] innerJoin called for: ${this.tableName}: ${baseJoin.toString()}`);
        return baseJoin;
    }

    //callback recives 2 params, (data, error)
    /**
     * Get all the records from this table.
     */
    findAll(limit = null, offset = null, orderBy = null) {
        const query = knex(this.tableName).select();
        query.offset(offset);
        if (limit !== null) {
            query.limit(limit);
            query.orderBy(orderBy);
        }
        console.log(`[ORM] Finding all for ${this.tableName}: ${query.toString()}`);
        return query;        
    }

    //callback recives 2 params, (data, error)
    /**
     * Get a record with a given ID
     * @param {number} id The ID of the record to get.
     */
    findbyId(id) {
        const query = `select * from ${this.tableName} where id = ${id}`;
        console.log(`[ORM] Getting ID for ${this.tableName}: ${query}`);
        return knex.raw(query);
    }
    //callback recives 2 params, (data, error)
    //Important! This data in the callback is an array so make sure to grab the first index
    /**
     * Gets the last ID in a table. The returned value is an Array with 1 object in it with 1 key called id that has the last ID value
     */
    getLastId() {
        const query = `SELECT MAX(id) AS id FROM ${this.tableName}`;
        console.log(`[ORM] Getting last ID for ${this.tableName}: ${query}`);
        return knex.raw(query);
    }
    /**
     * Executes Raw SQL on the DB, bypassing any checks that the ORM does. Also useful for any query that the ORM doesn't support. Warning!!!! This is highly dangerous please make sure that a user cannot enter details directly into this call.
     * @param {string} query The query string
     */
    rawSQL(query) {
        console.log(`[ORM] Raw SQL: ${query}`);
        return knex.raw(query);
    }

    //model functions
    /**
     * Utility function to check if the model has a certain field in it.
     * @param {string} property The Field to check
     */
    includes(property) {
        return this.model.hasOwnProperty(property);
    }
    /**
     * Gets the number of rows in a table
     * @returns {Promise<Object>} A promise that resolves to an object in the form {TableName: <Table>, Records: 13}
     */
    getTableRowLength() {
        return knex.raw("select t.name TableName, i.rows Records from sysobjects t, sysindexes i where t.xtype = 'U' and i.id = t.id and i.indid in (0, 1) and t.name = '" + this.tableName + "'");
    }

    getKnex() {
        return knex(this.tableName);
    }
}

module.exports.Table = Table;
module.exports.Types = types