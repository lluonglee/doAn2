const getBrowserInstance = require("../config/puppeteer");

async function crawlTimetable(khoaName, hocKyName) {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();

  try {
    // URL of the timetable page
    const url = "https://ems.vlute.edu.vn/vTKBDonVi"; // Replace with the actual URL
    await page.goto(url, { waitUntil: "networkidle2" });

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
    await page.select("select#lstDV", khoaValue);

    // Select "Học Kỳ"
    await page.select("select#hocky", hocKyValue);
    console.log("Selected Khoa:", khoaValue);
    console.log("Selected Hoc Ky:", hocKyValue);

    // ===================================================
    // Select "Tuần học" (Multiple Selection)
    // delete default option
    await page.evaluate(() => {
      // Tìm tất cả các nút "×" trong multi-select
      const removeButtons = document.querySelectorAll(
        ".select2-selection__choice__remove"
      );
      if (removeButtons.length > 0) {
        removeButtons[0].click(); // Click vào phần tử
        removeButtons[1].click();
      }
    });
    await page.screenshot({ path: "error-screenshot.png" });

    await page.click("span.select2-selection"); // Open the multi-select dropdown

    // Click the search button
    await page.click("button#btnSearch");
    await page.waitForSelector("div#tab_12 table tr"); // Wait for the table to appear

    // Scrape table data
    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("div#tab_12 table tr");
      const result = [];
      rows.forEach((row, index) => {
        if (index > 0) {
          // Skip the header row
          const cols = row.querySelectorAll("td");
          const rowData = Array.from(cols).map((col) => col.innerText.trim());
          result.push(rowData);
        }
      });
      return result;
    });

    return data; // Return the scraped data
  } catch (err) {
    console.error("Error crawling timetable:", err);

    // Take a screenshot for debugging
    await page.screenshot({ path: "error-screenshot.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = {
  crawlTimetable,
};
