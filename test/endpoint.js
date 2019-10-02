const supertest = require('supertest');
app = require('../app');

supertest(app)
	.get('/sites')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function(err, res) {
	if (err) throw err;
});
