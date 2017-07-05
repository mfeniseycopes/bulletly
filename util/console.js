var repl = require("repl").start({}),
    promisify = require("repl-promised").promisify,
    db = require('../models');

Object.keys(db.models)
	.forEach(name => 
		repl.context[name] = db.models[name])

promisify(repl);
