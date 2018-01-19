const knex = require("./db");

class TransactionManager {
    constructor() {
        this.transactions = {};
        this.usedIds = [];
        this.activeTransactions = [];
    }

    transactionExists(id) {
        return this.activeTransactions.includes(id);
    }

    getTransaction(id) {
        if (this.activeTransactions.includes(id))
            return this.transactions[id];
        else
            return null;
    }

    newTransaction() {
        let id;
        if (this.usedIds.length === 0) {
            id = 0;
        } else {
            id = this.usedIds[this.usedIds.length - 1] + 1;
        }
        this.usedIds.push(id);
        this.activeTransactions.push(id);
        this.transactions[id] = new Transaction(id);
        return id;
    }

    deleteTransaction(id) {
        delete this.transactions[id];
    }

    markTransactionAsDead(id) {
        if (!this.transactionExists(id))
            return false;
        const index = this.activeTransactions.indexOf(id);
        this.activeTransactions.splice(index, 1);
        this.deleteTransaction(id);
        return true;
    }
}

class Transaction {
    constructor(id) {
        this.id = id;
        this.statements = [];
    }

    add(knexObj) {
        this.statements.push(knexObj);
    }

    run() {
        const transactionStatements = this.statements;
        return knex.transaction(function(trx) {
            //converts the queue of statements or promises into one long promise chain, so that it executes sequentially.
            let p = Promise.resolve(); 
            transactionStatements.forEach(function (knexStatement) {
                p = p.then(function () { return knexStatement.transacting(trx); }); // or .bind
            });
            return p
            .then(trx.commit)
            .catch(trx.rollback);
        });
    }
}


module.exports = new TransactionManager();