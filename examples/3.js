document.addEventListener('DOMContentLoaded', function () {
	var words = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
	var databaseName = 'sample_database';
	var objStoreName = 'obj_store_3';
    var keyPath = 'sample_field';
    
    sklad.open(databaseName, {
        version: 3,
        migration: {
            "3": function (database) {
                // keyPath, no key generator
                var objStore = database.createObjectStore(objStoreName, {keyPath: keyPath});
            }
        }
    }, function (err, database) {
        if (err)
            throw err;

        words.forEach(function (word, index) {
        	database.insert(objStoreName, {word: word}, function (err, insertedKey) {
        		if (err)
        			throw err;

        		console.log('word "' + word + '" saved with key ' + insertedKey);
        	});
        });
    });
}, false);