const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHoroscope(req, res) {
    try {
        const { sign, day } = req.body;
        const url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-${day}.aspx?sign=${sign}`;

        // Fetching HTML content of the horoscope page
        const response = await axios.get(url);
        const html = response.data;

        // Parsing HTML content using Cheerio
        const $ = cheerio.load(html);

        // Selector for horoscope content might change on the website. Update as needed.
        const horoscopeText = $('.main-horoscope p').text();

        return res.status(200).json({
            success: true,
            data: { sign, horoscopeText }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = { scrapeHoroscope };
