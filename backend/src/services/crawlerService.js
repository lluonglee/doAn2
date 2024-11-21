
const getBrowserInstance = require("../config/puppeteer");

async function crawlTimetable(khoaName, hocKyName, thu, tuanList) {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();

  try {
    // URL of the timetable page
    const url = 'https://ems.vlute.edu.vn/vTKBDonVi'; // Replace with the actual URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Map khoa and hocKy names to dropdown values
    const khoaMap = {
      "Khoa Kỹ thuật công nghệ cơ khí": "1",
      "Khoa Công nghệ thông tin": "3",
      "Khoa Kinh tế - Luật": "29",
    };

    const hocKyMap = {
      "Học kỳ 1, 2024-2025": "42",
      "Học kỳ 2, 2024-2025": "43",
    };

    const khoaValue = khoaMap[khoaName];
    const hocKyValue = hocKyMap[hocKyName];

    // Select "Khoa"
    await page.select('select#lstDV', khoaValue);

    // Select "Học Kỳ"
    await page.select('select#hocky', hocKyValue);
    console.log("Selected Khoa:", khoaValue);
    console.log("Selected Hoc Ky:", hocKyValue);

    // Select "Thứ"
    await page.click('ul.select2-selection__rendered'); // Open the dropdown
    await page.waitForSelector('input.select2-search__field'); // Wait for the search field
    await page.type('input.select2-search__field', thu); // Type the desired "Thứ"

    // Wait for options to load and click the matching item
    await page.waitForSelector('ul.select2-results__options');
    await page.evaluate((thuText) => {
      const items = Array.from(document.querySelectorAll('ul.select2-results__options li'));
      const targetItem = items.find((item) => item.innerText.includes(thuText));
      if (targetItem) targetItem.click(); // Click the matching option
    }, thu);

    // Select "Tuần học" (Multiple Selection)
    await page.click('span.select2-selection'); // Open the multi-select dropdown
    await page.waitForSelector('ul.select2-selection__rendered li.select2-selection__choice'); // Wait for options to appear

    for (const tuan of tuanList) {
      await page.evaluate((tuanText) => {
        const items = Array.from(document.querySelectorAll('ul.select2-results__options li'));
        const targetItem = items.find((item) => item.innerText.includes(tuanText));
        if (targetItem) targetItem.click(); // Click the matching item
      }, tuan);
    }

    // Click the search button
    await page.click('button#btnSearch');
    await page.waitForSelector('div#tab_12 table tr'); // Wait for the table to appear

    // Scrape table data
    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll('div#tab_12 table tr');
      const result = [];
      rows.forEach((row, index) => {
        if (index > 0) { // Skip the header row
          const cols = row.querySelectorAll('td');
          const rowData = Array.from(cols).map((col) => col.innerText.trim());
          result.push(rowData);
        }
      });
      return result;
    });

    return data; // Return the scraped data
  } catch (err) {
    console.error('Error crawling timetable:', err);

    // Take a screenshot for debugging
    await page.screenshot({ path: 'error-screenshot.png' });
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = {
  crawlTimetable,
};
