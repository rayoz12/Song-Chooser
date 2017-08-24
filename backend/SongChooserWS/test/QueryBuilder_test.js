var assert = require("assert");
const ORM = require("./../core/ORM");
const queryBuilder = require("./../core/queryBuilder");
const query = "WHERE ";

//music model
const model = {
    id: {
        type: ORM.Types.BIGINT,
        autoIncrement: true,
    },
    track_title: ORM.Types.VARCHAR,
    artist: ORM.Types.VARCHAR,
    album: ORM.Types.VARCHAR,
    published_date: ORM.Types.DATE,
    ranking: ORM.Types.INT,
    publisher_id: ORM.Types.BIGINT
}

const user = {
    user: {
        id: "45"
    }
}

describe("QueryBuilder", function () {
    //-------------------------Insert Tests-------------------------------------




    //--------------------------Where Tests-------------------------------------
    //TODO add test for query like this with internal object for or
    /*
    { 'Booking.start_date': { '<=': '2017-05-26' },
     'Booking.end_date': { '$or': [ null, { '>=': '2017-05-26' } ] }
    */
    describe("#whereQueryKnexDecoupled", function () {
        it("basic equal query", function () {
            //find an artist Ryan Pereira and an album called beat it.
            assert.equal(" [artist] = 'Ryan Pereira' and [album] = 'Beat It'",
                queryBuilder.whereQuery({ artist: "Ryan Pereira", album: "Beat It" }, model));
        });

        it("Explicit operator query", function () {
            const filter = {
                artist: "Ryan Pereira",
                published_date: { "<": "2017-05-19" },
                ranking: { "<=": 25 }
            };
            //find all records where Artist Ryan Pereira and published_date before a certain date and ranking less than 25
            assert.equal(" [artist] = 'Ryan Pereira' and [published_date] < '2017-05-19' and [ranking] <= 25",
                queryBuilder.whereQuery(filter, model));
        });

        it("OR query", function () {
            const filter = {
                artist: { "$or": ["Ryan Pereira", "Michael Jackson"] },
                published_date: { "<": "2017-05-19" },
                ranking: { "<=": 25 }
            };
            assert.equal(" [artist] in ('Ryan Pereira', 'Michael Jackson') and [published_date] < '2017-05-19' and [ranking] <= 25",
                queryBuilder.whereQuery(filter, model));
        });

        it("between query", function () {
            const filter = {
                artist: { "$or": ["Ryan Pereira", "Michael Jackson", "Miami Horror"] },
                published_date: { "<": "2017-05-19" },
                ranking: { "$between": [10, 20] }
            };
            assert.equal(" [artist] in ('Ryan Pereira', 'Michael Jackson', 'Miami Horror') and [published_date] < '2017-05-19' and [ranking] between 10 and 20",
                queryBuilder.whereQuery(filter, model));
        });
    });
    //TODO tests for knex coupled
    describe("#whereQueryKnexCoupled", function () {
        it("basic equal query", function () {
            //find an artist Ryan Pereira and an album called beat it.
            assert.equal(" [artist] = 'Ryan Pereira' and [album] = 'Beat It'",
                queryBuilder.whereQuery({ artist: "Ryan Pereira", album: "Beat It" }, model));
        });

        it("Explicit operator query", function () {
            const filter = {
                artist: "Ryan Pereira",
                published_date: { "<": "2017-05-19" },
                ranking: { "<=": 25 }
            };
            //find all records where Artist Ryan Pereira and published_date before a certain date and ranking less than 25
            assert.equal(" [artist] = 'Ryan Pereira' and [published_date] < '2017-05-19' and [ranking] <= 25",
                queryBuilder.whereQuery(filter, model));
        });

        it("OR query", function () {
            const filter = {
                artist: { "$or": ["Ryan Pereira", "Michael Jackson"] },
                published_date: { "<": "2017-05-19" },
                ranking: { "<=": 25 }
            };
            assert.equal(" [artist] in ('Ryan Pereira', 'Michael Jackson') and [published_date] < '2017-05-19' and [ranking] <= 25",
                queryBuilder.whereQuery(filter, model));
        });

        it("between query", function () {
            const filter = {
                artist: { "$or": ["Ryan Pereira", "Michael Jackson", "Miami Horror"] },
                published_date: { "<": "2017-05-19" },
                ranking: { "$between": [10, 20] }
            };
            assert.equal(" [artist] in ('Ryan Pereira', 'Michael Jackson', 'Miami Horror') and [published_date] < '2017-05-19' and [ranking] between 10 and 20",
                queryBuilder.whereQuery(filter, model));
        });
    });
});

