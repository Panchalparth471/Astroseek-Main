const puppeteer = require('puppeteer');

async function scrapeHoroscope(req, res) {
    try {
    
        const { sign,day } = req.body;
       const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
        const page = await browser.newPage();

        const url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-${day}.aspx?sign=${sign}`;
        await page.goto(url);

        // Selector for horoscope content might change on the website. Update as needed.
        const horoscopeText = await page.evaluate(() => document.querySelector('.main-horoscope p').innerText);

        await browser.close();
        return res.status(200).json({
            success: true,
            data: { sign, horoscopeText }
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

module.exports = { scrapeHoroscope };
