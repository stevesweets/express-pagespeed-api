const express = require('express');
const app = express();
const cron = require('cron').CronJob;
const fs = require('fs');
const axios = require('axios').default;
const pagespeed_key = 'AIzaSyDHtEzg_UazWlbJ1IThSxHIJ36ESnqApR4';
const pagespeed_uri = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?filter_third_party_resources=true&key=' + pagespeed_key + '&url=';

// bit meh
const sites = ['https://www.hotel-internet-marketing.com', 'https://www.bbc.co.uk', 'https://www.google.com'];
const data_file = 'data/sites.json';


// why not? periodically update the data.
const update_data = new cron({
	cronTime: '0 0 * * * *',
	onTick: async function() {
		var data = [];

		for (var site_uri of sites) {
			await axios.get(pagespeed_uri + encodeURI(site_uri))
			.then(function (response) {
				data.push({
					"title": response.data.title,
					"response_code": response.data.responseCode,
					"site_uri": site_uri,
					"speed": response.data.ruleGroups.SPEED.score
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		fs.writeFileSync(data_file, JSON.stringify(data));
		console.log('abc');
	},
	start: false,
	timeZone: 'Europe/London',
	runOnInit: true
});
update_data.start();

// the endpoint to return the data.
app.get('/sites', (request, response) => {
	response.send(JSON.parse(fs.readFileSync('data/sites.json')));
})

module.exports = app.listen(80, () => {
	console.log('ready on port 80');
});
