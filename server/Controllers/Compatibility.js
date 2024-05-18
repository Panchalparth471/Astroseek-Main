const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeCompatibility(req, res) {
    try {
        const { sign1, sign2 } = req.body;
        const url = `https://www.horoscope.com/us/games/compatibility/game-love-compatibility.aspx?ZodiacSignSelector_alphastring=${sign1}&PartnerZodiacSignSelector_alphastring=${sign2}`;

        // Fetching HTML content of the compatibility page
        const response = await axios.get(url);
        const html = response.data;

        // Parsing HTML content using Cheerio
        const $ = cheerio.load(html);

        // Selectors for compatibility score and text might change on the website. Update as needed.
        const compatibilityScore = $('.game-compatibility-score').text();
        const compatibilityText = $('.module-skin p').text();

        return res.status(200).json({
            success: true,
            data: { compatibilityScore, compatibilityText }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = { scrapeCompatibility };
