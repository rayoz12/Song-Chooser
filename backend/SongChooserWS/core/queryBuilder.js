module.exports = {
    whereQuery,
    whereQueryKnex,
    insertQueryKnex,
    insertBatchQueryKnex,
    updateQuery
}
//this knex object is only used for query building
const knexSQL = require("./db");
const moment = require("moment");

const types = {
    DATE: 1,
    TIME: 2,
    DATETIME: 3,
    BIGINT: 4,
    INT: 5,
    VARCHAR: 6,
    MONEY: 7,
    NVARCHAR: 8,
}

let specialOps = {
    $or: "$or",
    $between: "$between",
}

//TODO: remove the query paramter.
/**
 * Constructs a Where query and returs a string of the string after the where keyword
 * @param {Object} filter Filter to contruct from
 * @param {Object} model The model of the table to refer to
 */
function whereQuery(filter, model) {
    let validFilter = false;
    const query = knexSQL("temp");//table name doesn't matter we're only going to build the where query.
    for (let filterKey in filter) {
        if (model.hasOwnProperty(filterKey) || filterKey.indexOf(".") > -1) {
            //key is in model or filter explicitly defines the table field comes from
            //Check for special cases. This could be a switch statement but each case has a big block of code                
            if (typeof filter[filterKey] == "object" && filter[filterKey] !== null) {
                //can check for more options here. Limitation only works with or on one field
                //check if OR is here
                if (filter[filterKey].hasOwnProperty(specialOps.$or) && filter[filterKey][specialOps.$or].length !== 0) {
                    query.whereIn(filterKey, filter[filterKey][specialOps.$or]);
                    validFilter = true;
                }
                //between option
                else if (filter[filterKey].hasOwnProperty(specialOps.$between) && filter[filterKey][specialOps.$between].length !== 0) {
                    query.whereBetween(filterKey,
                        filter[filterKey][specialOps.$between]);
                    validFilter = true;
                }
                //here add more options
                //default {operator:value} syntax
                else {
                    //no special option, default to operator: value syntax
                    const operator = Object.keys(filter[filterKey])[0];
                    const value = filter[filterKey][operator];
                    query.where(filterKey, operator, value);
                    validFilter = true;
                }
            }
            //basic {key: value} syntax
            else {
                const value = filter[filterKey];
                query.where(filterKey, value);
                validFilter = true;
            }
        }
    };
    if (!validFilter) {
        //no conditions were applied to query. This means that everything will be effected! return throw error
        throw new Error("Bad Filter, All records will be effected. Fix the filter");
    }
    const stringQuery = query.toString();
    return stringQuery.split("where")[1];
}
//TODO: Split up the operator parsing functions to allow parsing up to n levels deep.
/**
 * Given a knex object this contructs a where query and adds on to the knex object, mutating it.
 * @param {Object} filter Filter to contruct from
 * @param {Object} model The model of the table to refer to
 * @param {Knex} knex The Knex Object to add the where query on.
 * @return {string} toString() of the knex Object which is the generated SQL.
 */
function whereQueryKnex(knex, filter, model) {
    let validFilter = false;
    for (let filterKey in filter) {
        if (model.hasOwnProperty(filterKey) || filterKey.indexOf(".") > -1) {
            //key is in model or filter explicitly defines the table field comes from
            //Check for special cases. This could be a switch statement but each case has a big block of code                
            if (typeof filter[filterKey] == "object" && filter[filterKey] !== null) {
                //can check for more options here. Limitation only works with or on one field
                //check if OR is here
                if (filter[filterKey].hasOwnProperty(specialOps.$or)) {
                    if (filter[filterKey][specialOps.$or].length === 0) {
                        throw new Error("$or filter broken (There are no paramters)");
                        //knex.andWhere(filterKey, "");
                        //validFilter = true;
                        //continue;
                    }
                    knex.andWhere(function() {
                        for (let i = 0; i < filter[filterKey][specialOps.$or].length; i++) {
                            const currentVal = filter[filterKey][specialOps.$or][i];
                            if (typeof currentVal == "object" && currentVal !== null) {
                                this.orWhere(filterKey,
                                    Object.keys(currentVal)[0],
                                    currentVal[Object.keys(currentVal)[0]]);
                            } else {
                                this.orWhere(filterKey, currentVal);
                            }
                        }
                    });
                    validFilter = true;
                }
                //between option
                else if (filter[filterKey].hasOwnProperty(specialOps.$between) && filter[filterKey][specialOps.$between].length !== 0) {
                    knex.whereBetween(filterKey,
                        filter[filterKey][specialOps.$between]);
                    validFilter = true;
                }
                //here add more options
                //default {operator:value} syntax
                else {
                    //no special option, default to operator: value syntax
                    const operator = Object.keys(filter[filterKey])[0];
                    const value = filter[filterKey][operator];
                    knex.where(filterKey, operator, value);
                    validFilter = true;
                }
            }
            //basic {key: value} syntax
            else {
                const value = filter[filterKey];
                knex.where(filterKey, value);
                validFilter = true;
            }
        }
    };
    if (!validFilter) {
        //no conditions were applied to query. This means that everything will be effected! throw error
        throw new Error("Bad Filter, All records will be effected. Fix the filter");
    }
    return knex.toString();
}

/**
 * Takes a knex object and applies an insert query on it given one record to insert. The knex object is mutated.
 * @param {Knex} knex Knex object to apply insert query on.
 * @param {any} model The model of the table. This is used to confirm that the inserting fields are in the model. Only fields in the model will be inserted.
 * @param {any} newRecord The new record to insert.
 * @param {any} identityField The identity field of the table. The returning value of the insert will come from this column.
 */
function insertQueryKnex(knex, model, newRecord, identityField) {
    const insertingRecord = insertValues(model, newRecord, identityField); //this is the modified newRecord that will be inserted into the db.
    knex.insert(insertingRecord);
    return knex.returning(identityField);
}

/**
 * Takes a knex object and mutates it to insert multiple records at once.
 * @param {any} knexInsertBatch
 * @param {any} model
 * @param {any} newRecords
 * @param {any} user
 * @param {any} identityField
 */
function insertBatchQueryKnex(knexInsertBatch, model, newRecords, identityField) {
    const modifiedRecords = [];
    for (let i = 0; i < newRecords.length; i++) {
        const record = newRecords[i];
        modifiedRecords.push(insertValues(model, record, identityField));
    }
    return knexInsertBatch.insert(modifiedRecords).returning(identityField);
}

function insertValues(model, newRecord, identityField) {
    const insertingRecord = {};
    for (let key in newRecord) {
        //delete any columns not in the model.
        if (!model.hasOwnProperty(key)) {
            delete newRecord[key];
            continue;
        }
        if (identityField !== null) {
            if (key === identityField)
                continue;
        }
        const value = newRecord[key];
        const type = model[key];
        let valDate;
        let val;
        //add to insertingRecord
        if (value === null || value == undefined) {
            insertingRecord[key] = null;
        } else if (type === types.DATE) {
            //This is a javascript date object, convert to database recognisable one.
            if (!(value instanceof Date))
                valDate = new Date(value);
            else
                valDate = value;
            val = valDate.getFullYear() + "-" + (valDate.getMonth() + 1) + "-" + valDate.getDate();
            insertingRecord[key] = val;
        } else if (type === types.DATETIME) {
            if (!(value instanceof Date))
                valDate = new Date(value);
            else
                valDate = value;
            insertingRecord[key] = valDate.toISOString();
        } else if (type === types.BIGINT || type == types.INT) {
            insertingRecord[key] = value;
        } else if (type === types.VARCHAR) {
            insertingRecord[key] = value;
        } else if (type === types.NVARCHAR) {
            insertingRecord[key] = value;
        } else if (type === types.TIME) {
            if (moment.isMoment(value)) {
                insertingRecord[key] = value.format()
            } else if (moment.isDate(value)) {
                insertingRecord[key] = moment(value).format();
            } else {
                //not a moment or date, assume a string in format "hh:mm:ss"
                const parsedValue = moment(value, "HH:mm:ss");
                if (!parsedValue.isValid()) {
                    throw new Error("Invalid Time Format");
                }
                insertingRecord[key] = parsedValue.format();
            }
        } else {
            insertingRecord[key] = value;
        }
    }
    return insertingRecord;
}

function updateQuery(knex, model, newRecord, identityField) {
    const updatingRecord = insertValues(model, newRecord, identityField); //this is the modified newRecord that will be inserted into the db.
    knex.update(updatingRecord,"id").where(identityField, newRecord.id);
    return knex;
}