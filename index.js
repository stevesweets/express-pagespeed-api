const express = require('express');
const app = express();
const cron = require('cron').CronJob;
const fs = require('fs');
const pagespeed_key = 'AIzaSyDHtEzg_UazWlbJ1IThSxHIJ36ESnqApR4';

// bit meh
const sites = ['https://www.hotel-internet-marketing.com', 'https://www.bbc.co.uk', 'https://www.google.com'];
const data_file = 'data/sites.json';

// data file doesn't exist? create it.
try {
	if (!fs.existsSync(data_file)) {
		fs.writeFileSync(data_file, JSON.stringify([]));
	}
} catch(err) {
	console.error(err)
}

// why not? periodically update the data.
const update_data = new cron({
	cronTime: '0 0 * * * *',
	onTick: function() {
		console.log('tick');
		console.log(sites);
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

app.listen(8080, () => {
	console.log('up');
});
