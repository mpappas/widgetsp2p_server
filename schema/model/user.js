var db = require('./../db.js');							// ← use the database object 
var ottoman = require('ottoman');						// ← use ottoman



var UserMdl = ottoman.model('User', {
    userID: {type:'string', auto:'uuid', readonly:true},	// ← auto-increment UUID
    createdON: {type: 'Date', default:new Date()},	// ← auto populate date field
    name:{						// ← embedded string document
        first:'string',
        last:'string'},
    email:'string',
    active:{type:'boolean',default:true}
},{
    index: {
        findByUserID:{				// ← refdoc index
            by:'userID',
            type:'refdoc'
        },
        findByEmail: {					// ← refdoc index
            by: 'email',
            type: 'refdoc'
        },
        findByFirstName: {				// ← secondary index
            by: 'name.first'
        },
        findByLastName: {				// ← secondary index
            by: 'name.last'
        }
    }
});

UserMdl.createAndSave = function (firstname, lastname, email, done) {
    this.create({
        name: {first: firstname, last: lastname},
        email: email
    }, done);
}

module.exports = UserMdl;						// ← export for other modules to use