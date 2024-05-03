const puppeteer = require('puppeteer');

async function scrapeCompatibility(req, res) {
    try {
    
        const { sign1,sign2 } = req.body;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const url = `https://www.horoscope.com/us/games/compatibility/game-love-compatibility.aspx?ZodiacSignSelector_alphastring=${sign1}&PartnerZodiacSignSelector_alphastring=${sign2}`;
        await page.goto(url);

        // Selector for horoscope content might change on the website. Update as needed.
        const compatibilityScore = await page.evaluate(() => document.querySelector('.game-compatibility-score').innerText);
        const compatibilityText = await page.evaluate(() => document.querySelector('.module-skin p').innerText);
        await browser.close();
        console.log(compatibilityScore);
        console.log(compatibilityText);
        return res.status(200).json({
            success: true,
            data: {compatibilityScore, compatibilityText }
       })
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message:"Something went wrong"
        })
    }
    

}

module.exports = { scrapeCompatibility };
