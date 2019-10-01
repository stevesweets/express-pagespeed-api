const express = require('express');
const app = express();
const CronJob = require('cron').CronJob;
const fs = require('fs');

// bit meh
const sites = ['https://www.hotel-internet-marketing.com', 'https://www.bbc.co.uk', 'https://www.google.com'];

// why not? periodically update the data.
const updateSpeeds = new CronJob({
	cronTime: '0 * * * * *',
	onTick: function() {
		console.log(sites);
	},
	start: false,
	timeZone: 'Europe/London'
});
updateSpeeds.start();

app.get('/sites', (request, response) => {
	return response.send('get method');
})

app.listen(8080, () => {
	console.log('up');
});
