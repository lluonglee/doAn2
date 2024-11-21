const puppeteer = require('puppeteer');

async function getBrowserInstance() {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

module.exports = getBrowserInstance;
