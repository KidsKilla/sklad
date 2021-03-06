describe('Migration scripts context tests', function () {
    var dbName = 'dbName' + Math.random();

    function closeConnection(cb) {
        if (conn) {
            conn.close();
            conn = null;

            cb();
        }
    }

    it('should create index during first migration', function (done) {
        openBaseConnection(dbName, function (connection) {
            connection.close();
            done();
        });
    });

    it('should add index to existing object store', function (done) {
        sklad.open(dbName, {
            version: 2,
            migration: {
                '2': function () {
                    var objectStore = this.transaction.objectStore('keypath_true__keygen_false_0');
                    objectStore.createIndex("foo", "bar");

                    expect(objectStore.indexNames.contains("sort_login")).toBe(true);
                    expect(objectStore.indexNames.contains("sort_name")).toBe(true);
                    expect(objectStore.indexNames.contains("foo")).toBe(true);
                }
            }
        }, function (err, connection) {
            if (err) {
                throw new Error(err.name + ': ' + err.message);
            }

            connection.close();
            done();
        });
    });
});
