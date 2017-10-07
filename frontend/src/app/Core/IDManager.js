/**
 * Created by Ryan on 19/08/2017.
 */


class IDManager {
    constructor(joinFormat, ids) {
        this.joinFormat = joinFormat;
        this.ids = ids;

        this.tables = [];
        this.tableID = {};
        for (let i = 0; i < joinFormat.length; i++) {
            const join = joinFormat[i];
            this.tables.push(join.tableLeft);
            this.tableID[join.tableLeft] = ids[i];
        }
    }

    getID(tableName){
        if (!this.tableID.hasOwnProperty(tableName))
            return null;
        return this.tableID[tableName];
    }
}

export default IDManager;