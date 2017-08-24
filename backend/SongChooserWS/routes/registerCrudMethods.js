const transactionManager = require("./../core/transaction");

function registerMethods(router, model) {
    const tableName = model.tableName;

    const defaultLimit = 50;//this is the limit of records in one read operation.
    const defaultOffset = 0;//this is the default offset
    const defaultOrderColumn = 'id';

    /**
     * @api {post} /<model>/Create/ Create a record in the model.
     * @apiName Create
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object} POSTBody An object of the record to add with key value pairs that correspond with columns and values.
     *
     * @apiSuccess {Number} success A number indicating success which should be 1.
     * @apiSuccess {Object} data The inserted id of the record created.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1,
     *       "data": {inserted_id: "45"}
     *     }
     *
     * @apiError {Object} err The server encountered an error in attempting to create the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "err": {}
     *     }
     */
    router.post("/Create", function (req, res) {
        model.create(req.body)
        .then(data => res.json({ "success": 1, data: { inserted_id: data[0] } }))
        .catch(err => res.status(500).json({ "success": 0, "err": err }));
    });

    /**
     * @api {post} /<model>/CreateBatch/ Create a record in the model.
     * @apiName CreateBatch
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object[]} data An array of objects that represent records for the model to create.
     *
     * @apiSuccess {Number} success A number indicating success which should be 1.
     * @apiSuccess {Array} data An array of inserted ID's.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1,
     *       "data": ["45", "25", "15"]
     *     }
     *
     * @apiError {Object} err The server encountered an error in attempting to create the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "err": {}
     *     }
     */
    router.post("/CreateBatch", function (req, res) {
        if (req.body.data.length === 0) {
            res.json({ "success": 1 });
            return;
        }
        model.createBatch(req.body.data)
        .then(data => res.json({ "success": 1, data }))
        .catch(err => res.json({ "success": 0, "err": err }));
	});

    /**
     * @api {put} /<model>/Edit/ Edit or update a record in the model.
     * @apiName Edit
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object} POSTBody An object that maps columns to the new value. Not all columns are required only the ones that need to be changed
     *
     * @apiSuccess {Number} success A number indicating success which should be 1.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1
     *     }
     *
     * @apiError {Object} err The server encountered an error in attempting to create the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "err": {}
     *     }
     */
    router.put("/Edit", function (req, res) {
        model.update(req.body)
        .then(data => res.json({ "success": 1, data}))
        .catch(err => res.json({ "success": 0, "err": err }));
    });

    /**
     * @api {put} /<model>/EditBatch/ Edit or Update many records in the model.
     * @apiName EditBatch
     * @apiDescription This updates many records in batch however there is no way to know if an error
     * occured please avoid using this if you can use <a href="#api-CRUDMethods-Edit">CRUDMethods:Edit</a>
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object[]} data An array of objects that represent records for the model to Edit/Update.
     *
     * @apiSuccess {Number} success A number indicating success which should be 1.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1
     *     }
     *
     */
    router.put("/EditBatch", function (req, res) {
        model.updateBatch(req.body.data)
            .then(data => res.json({ "success": 1, data}))
            .catch(err => res.json({ "success": 0, "err": err }));
    });

    /**
     * @api {post} /<model>/Delete/ Delete a record by ID.
     * @apiName Delete
     * @apiDescription Delete a record by the given ID. This is an un-revertable action!
     * @apiGroup CRUDMethods
     *
     * @apiParam {String} id The ID of the record to delete.
     *
     * @apiSuccess {Number} success A number indicating success which should be 1 in this case.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Delete", function (req, res) {
        const id = req.body.id;
        model.delete(id)
        .then(data => res.json({ "success": 1, data}))
        .catch(err => res.status(500).json({ "success": 0, "err": err }));
    });

    /**
     * @api {post} /<model>/DeleteWhere/ Delete a record with a condition.
     * @apiName DeleteWhere
     * @apiDescription Delete multiple records that match the condition presented by the where.
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object} POSTBody A filter that matches columns to the values to match.
     *
     * @apiSuccess {Number} success A number indicating success which should be 1 in this case.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": 1
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/DeleteWhere", function (req, res) {
        model.deleteWhere(req.body)
        .then(data => res.json({ "success": 1, data}))
        .catch(err => res.json({ "success": 0, "err": err }));        
    });

    /**
     * @api {get} /<model>/GetAll/ Get all records in a model .
     * @apiName GetAll
     * @apiDescription Get all the records in a model. Warning! This will be very slow and a large transfer for
     * tables with many records. If you need to filter with a condition you should go with <a href="#api-CRUDMethods-Where">CRUDMethods:Where</a>
     * Please note this API call is subject to permission restrictions of allowed centres.
     * @apiGroup CRUDMethods
     *
     * @apiParam {Number} limit=50 The record limit to get.
     * @apiParam {Number} offset=0 The offset to get the recrods from.
     * @apiParam {Number} orderBy='id' The default orderby if paging is active. This value must be a column in the model.
     * @apiParam {Number=0,1} paging=0 Request the result in a paginated format. Set to 1 to enable paging.
     *
     * @apiSuccess {Object[]} Response The array of records.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *       ...
     *     ]
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.get("/GetAll", function (req, res) {
        const isPaging = (req.query.paging || "0") === "1";
        //these statements check if paging is enabled if not assign null
        const limit = isPaging ? parseInt(req.query.limit) || defaultLimit : null;
        const offset = isPaging ? parseInt(req.query.offset) || defaultOffset : null;
        const orderColumn = isPaging ? parseInt(req.query.orderBy) || defaultOrderColumn : null;
        const paginatedRes = { results: [], pagingMeta: {} };
        //meta info
        const baseRoutePath = req.headers.host + req.baseUrl + req.route.path + "?orderBy=" + orderColumn;
        model.findAll(limit, offset, orderColumn)
        .then(data => {
            if (!isPaging) {
                res.json(data);
                return;
            }
            paginatedRes.results = data;
            model.getTableRowLength().then(data => {
                const len = data[0].Records;
                paginatedRes.pagingMeta = constructPagingMetaFields(baseRoutePath, limit, offset, len);
                res.json(paginatedRes);
            });
        })
        .catch(err => res.json({ "success": 0, "err": err }));
        
    });

    /**
     * @api {get} /<model>/GetById/ Get a record by id in the Model
     * @apiName GetById
     * @apiDescription Get a record by ID
     * @apiGroup CRUDMethods
     *
     * @apiParam {String} id The ID to get.
     *
     * @apiSuccess {Object} Response An object of the record requested.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       ...
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.get("/GetById", function (req, res) {
        model.findbyId(req.query.id)
        .then(data => res.json(data[0] || {}))
        .catch(err => res.json({ "success": 0, "err": err }));
    });

    /**
     * @api {get} /<model>/GetLastId/ Get the last ID of a model
     * @apiName GetLastId
     * @apiDescription Get the last ID in the model
     * @apiGroup CRUDMethods
     *
     *
     * @apiSuccess {Object} Response An object of the record requested.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "44"
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.get("/GetLastId", function (req, res) {
        model.getLastId()
        .then(data => res.json(data[0]))
        .catch(err => res.json({ "success": 0, "err": err }));
    });

    /**
     * @api {post} /<model>/Where/ Get records from a model that match the where filter
     * @apiName Where
     * @apiDescription Get the records in a model that matche the filter. This is subject to centre permission restrictions.
     * @apiGroup CRUDMethods
     *
     * @apiParam {Object} POSTBody A filter that matches columns to the values to match.
     *
     * @apiSuccess {Object[]} Response An array of records that matches the filter given.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *       ...
     *     ]
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Where", function (req, res) {
        model.where(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ "success": 0, "err": err }));
    });

    /**
     * @api {post} /<model>/InnerJoin/ Join tables to get associated data
     * @apiName InnerJoin
     * @apiDescription Get the records in a model that matche the filter. This is subject to centre permission restrictions.
     * @apiGroup CRUDMethods
     *
     * @apiParam {Number} limit=50 The record limit to get.
     * @apiParam {Number} offset=0 The offset to get the recrods from.
     * @apiParam {Number} orderBy='id' The default orderby if paging is active. This value must be a column in the model.
     * @apiParam {Number=0,1} paging=0 Request the result in a paginated format. Set to 1 to enable paging.
     *
     * @apiParam {Object[]} data An array of tables and the joins to perform on them.
     * @apiParam {Object} where A filter that matches columns to the values to match.
     *
     * @apiSuccess {Object[]} Response An array of records that matches the filter given.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *       ...
     *     ]
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to delete the record.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/InnerJoin", function (req, res) {
        //Also need to check if other tables in inner join req are able to be read by user.
        const isPaging = (req.query.paging || "0") === "1";
        const limit = isPaging ? parseInt(req.query.limit) || defaultLimit : null;
        const offset = isPaging ? parseInt(req.query.offset) || defaultOffset : null;
        const orderColumn = isPaging ? req.query.orderBy || req.body.data[0].tableLeft + "." + defaultOrderColumn : null;
        const paginatedRes = { results: [], pagingMeta: {} };
        //meta info
        const baseRoutePath = req.headers.host + req.baseUrl + req.route.path + "?orderBy=" + orderColumn;
        

        const where = req.body.where;
        model.innerJoin(req.body.data, where, limit, offset, orderColumn)
        .then(data => {
            if (!isPaging) {
                res.json(data);
                return;
            }
            paginatedRes.results = data;
            model.getTableRowLength().then(data => {
                const len = data[0].Records;
                paginatedRes.pagingMeta = constructPagingMetaFields(baseRoutePath, limit, offset, len);
                //check if request is on last page
                if (offset + limit === len) {
                    paginatedRes.pagingMeta.next = null;
                }
                res.json(paginatedRes);
            });
        })
        .catch(err => res.json({ "success": 0, "err": err }));
    });

    /**
     * @apiDefine TransactionNotFound
     * @apiError TransactionNotFound No Such Transaction!
     */
    /**
     * @api {get} /<model>/Transaction/New Request to start a new transaction from the server. 
     * @apiName NewTransaction
     * @apiUse TransactionNotFound
     * @apiDescription The server registeres a new transaction and returns its ID to you so that you can add requests under it.
                       Note although this is registered under a model the transaction will apply across all models.
     * @apiGroup Transactions
     *
     * @apiSuccess {Number} success Number indicating success which should be 1.
     * @apiSuccess {Number} transaction_id The transaction ID registered.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *       transaction_id: 0
     *     }
     */
    router.get("/Transaction/New", function (req, res) {
        const transactionId = transactionManager.newTransaction();
        res.json({ success: 1, transaction_id: transactionId });
    });

     /**
     * @api {post} /<model>/Transaction/Run Run a transaction given its ID 
     * @apiName RunTransaction
     * @apiUse TransactionNotFound
     * @apiDescription The server runs a transaction. The intended use is to run the transaction after you have added actions to it.
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to run.
     *
     * @apiSuccess {Number} success A Number that indicates success.
     * @apiSuccess {Number} savedRecords The last ID of the inserted row (or 0 when none was inserted).
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *       savedRecords: 0
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to run the transaction.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/Run", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.run()
            .then(function (inserts) {
                inserts = inserts || 0;
                console.log(`${inserts} saved.`);
                transactionManager.markTransactionAsDead(transaction.id);
                res.json({ success: 1, savedRecords: inserts });
            })
            .catch(function (error) {
                console.error(error);
                res.status(500).json({ success: 0, err: error.message });
            });
    });

    /**
     * @api {post} /<model>/Transaction/Cancel Cancel a transaction given its ID 
     * @apiName CancelTransaction
     * @apiUse TransactionNotFound
     * @apiDescription Cancel a transaction, frees resources associated with the transaction. 
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered when attempting to run the transaction.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/Cancel", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        transactionManager.markTransactionAsDead(transactionId);
        res.json({ success: 1 });
    });

    //Only Modifing operations need to be transactioned
    /**
     * @api {post} /<model>/Transaction/Create Add a create transaction
     * @apiName TransactionCreate
     * @apiUse TransactionNotFound
     * @apiDescription Add a create transaction to the transaction. Refer to (#CRUDMethods:Create)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object} data The data to create
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/Create", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.create(req.body.data));
        res.json({ success: 1 });
    });

    /**
     * @api {post} /<model>/Transaction/CreateBatch Add a create Batch transaction
     * @apiName TransactionCreateBatch
     * @apiUse TransactionNotFound
     * @apiDescription Add a create Batch transaction to the transaction. Refer to (#CRUDMethods:CreateBatch)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object[]} data The data to createBatch
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/CreateBatch", function (req, res) {
        if (req.body.data.length === 0) {
            res.json({ "success": 1 });
            return;
        }
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.createBatch(req.body.data));
        res.json({ success: 1 });
    });

    /**
     * @api {put} /<model>/Transaction/Edit Add a Edit transaction
     * @apiName TransactionEdit
     * @apiUse TransactionNotFound
     * @apiDescription Add a edit transaction to an existing transaction. Refer to (#CRUDMethods:Edit)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object} data The data to edit
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.put("/Transaction/Edit", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.update(req.body.data));
        res.json({ success: 1 });
    });

    /**
     * @api {put} /<model>/Transaction/EditBatch Add a Edit Batch transaction
     * @apiName TransactionEditBatch
     * @apiUse TransactionNotFound
     * @apiDescription Add a edit Batch transaction to an existing transaction. Refer to (#CRUDMethods:EditBatch)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object[]} data The data to editBatch with 
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.put("/Transaction/EditBatch", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.updateBatch(req.body.data));
        res.json({ success: 1 });
    });

    /**
     * @api {put} /<model>/Transaction/Delete Add a Delete transaction
     * @apiName TransactionDelete
     * @apiUse TransactionNotFound
     * @apiDescription Add a delete transaction to an existing transaction. Refer to (#CRUDMethods:Delete)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object} data The data to Delete with. It has only one field, id; with the id of the record to delete.
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/Delete", function (req, res) {
        const id = req.body.data.id;
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.delete(id));
        res.json({ success: 1 });
    });

    /**
     * @api {post} /<model>/Transaction/DeleteWhere Add a Delete Where transaction
     * @apiName TransactionDeleteWhere
     * @apiUse TransactionNotFound
     * @apiDescription Add a delete transaction to an existing transaction. Refer to (#CRUDMethods:DeleteWhere)
     * @apiGroup Transactions
     *
     * @apiParam {Number} transaction The transaction ID to cancel.
     * @apiParam {Object} data The data to Delete Where with.
     *
     * @apiSuccess {Number} success A Number that indicates success.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       success: 1,
     *     }
     *
     * @apiError {Number} success A number indicating success which should be 0 in this case.
     * @apiError {Object} err The error the server encountered.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "success": 0,
     *       "err": {}
     *     }
     */
    router.post("/Transaction/DeleteWhere", function (req, res) {
        const transactionId = req.body.transaction;
        if (!transactionManager.transactionExists(transactionId)) {
            res.json({ success: 0, err: "No Such Transaction!" });
            return;
        }
        delete req.body.transaction;
        const transaction = transactionManager.getTransaction(transactionId);
        transaction.add(model.deleteWhere(req.body.data));
        res.json({ success: 1 });
    });

    return router;
}

function constructPagingMetaFields(fullUrl, limit, offset, length) {
    const pagingMeta = {};
    const newOffset = limit < offset ? offset + limit : limit * 2;

    pagingMeta.first = `${fullUrl}&limit=${limit}&offset=0`;
    pagingMeta.previous = offset - limit > 0 ? `${fullUrl}&limit=${limit}&offset=${offset - limit}` : null;
    pagingMeta.current = `${fullUrl}&limit=${limit}&offset=${offset}`;
    //round up offset of last page to maintain consistency
    const last = ((limit - (length % limit)) + length) - limit;
    pagingMeta.last = `${fullUrl}&limit=${limit}&offset=${last}`;
    pagingMeta.next = length > limit + offset ? `${fullUrl}&limit=${limit}&offset=${newOffset}` : null;
    pagingMeta.totalLength = length;
    return pagingMeta;
}

module.exports = registerMethods;