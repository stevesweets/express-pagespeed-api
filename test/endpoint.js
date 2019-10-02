const supertest = require('supertest')('http://127.0.0.1:80');
const chai = require('chai');
chai.use(require('chai-json-schema'));

// console.log(http);

describe('GET /sites', function() {
	it('responds with json matching specific format', function(done) {
		supertest
		.get('/sites')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res) {
			chai.expect(res.body).to.be.jsonSchema({
				type: "array",
				contains: {
					type: "object",
					required: ["title", "response_code", "site_uri", "speed"]
				}
			})
			if (err) return done(err);
			done();
		});
	})
})
