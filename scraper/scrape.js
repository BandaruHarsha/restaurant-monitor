// scrape.js
const puppeteer = require('puppeteer');
const fs = require('fs');

const restaurants = [
  {
    name: "Domino's Pizza – Banjara Hills",
    url: "https://www.swiggy.com/city/hyderabad/dominos-pizza-masab-tank-banjara-hills-rest24622"
  },
  {
    name: "Domino's Pizza – Gachibowli",
    url: "https://www.swiggy.com/city/hyderabad/dominos-pizza-cyber-city-gachibowli-rest79490"
  },
  {
    name: "Domino's Pizza – Kukatpally",
    url: "https://www.swiggy.com/city/hyderabad/dominos-pizza-alluri-trade-center-kukatpally-rest24619"
  },
  {
    name: "Domino's Pizza – Madhapur",
    url: "https://www.swiggy.com/city/hyderabad/dominos-pizza-saroor-nagar-l-b-nagar-rest24629"
  },
  {
    name: "Domino's Pizza – Hitech City",
    url: "https://www.swiggy.com/city/hyderabad/dominos-pizza-hitech-city-hitec-city-rest24611"
  }
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const restaurant of restaurants) {
    try {
      await page.goto(restaurant.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      const availability = await page.evaluate(() => {
        const statusText = document.body.innerText.toLowerCase();
        if (statusText.includes("not accepting orders")) return "unavailable";
        if (statusText.includes("currently closed")) return "unavailable";
        return "available";
      });

      const hours = await page.evaluate(() => {
        const timeInfo = Array.from(document.querySelectorAll('div')).find(el =>
          el.textContent.includes("Timing") || el.textContent.includes("Today")
        );
        return timeInfo?.innerText || "N/A";
      });

      results.push({
        name: restaurant.name,
        url: restaurant.url,
        actualAvailability: availability,
        expectedHours: hours,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      results.push({
        name: restaurant.name,
        url: restaurant.url,
        actualAvailability: "error",
        expectedHours: "error",
        error: error.message
      });
    }
  }

  await browser.close();

  fs.writeFileSync('../data/availability.json', JSON.stringify(results, null, 2));
  console.log("Scraping Complete! Data saved to ../data/availability.json");
})();
