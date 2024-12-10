// const getBrowserInstance = require("../config/puppeteer");

// async function crawlTimetable(khoaName, hocKyName) {
//   const browser = await getBrowserInstance();
//   const page = await browser.newPage();

//   try {
//     // URL of the timetable page
//     const url = "https://ems.vlute.edu.vn/vTKBDonVi"; // Replace with the actual URL
//     await page.goto(url, { waitUntil: "networkidle2" });

//     // Map khoa and hocKy names to dropdown values
//     const khoaMap = {
//       "Khoa Kỹ thuật công nghệ cơ khí": "1",
//       "Khoa Công nghệ thông tin": "3",
//       "Khoa Kinh tế - Luật": "29",
//     };

//     const hocKyMap = {
//       "Học kỳ 1, 2024-2025": "42",
//       "Học kỳ 2, 2024-2025": "43",
//     };

//     const khoaValue = khoaMap[khoaName];
//     const hocKyValue = hocKyMap[hocKyName];

//     // Select "Khoa"
//     await page.select("select#lstDV", khoaValue);

//     // Select "Học Kỳ"
//     await page.select("select#hocky", hocKyValue);
//     console.log("Selected Khoa:", khoaValue);
//     console.log("Selected Hoc Ky:", hocKyValue);

//     // ===================================================
//     // Select "Tuần học" (Multiple Selection)
//     // delete default option
//     await page.evaluate(() => {
//       // Tìm tất cả các nút "×" trong multi-select
//       const removeButtons = document.querySelectorAll(
//         ".select2-selection__choice__remove"
//       );
//       if (removeButtons.length > 0) {
//         removeButtons[0].click(); // Click vào phần tử
//         removeButtons[1].click();
//       }
//     });
//     await page.screenshot({ path: "error-screenshot.png" });

//     await page.click("span.select2-selection"); // Open the multi-select dropdown

//     // Click the search button
//     await page.click("button#btnSearch");
//     await page.waitForSelector("div#tab_12 table tr"); // Wait for the table to appear

//     // Scrape table data
//     const data = await page.evaluate(() => {
//       const rows = document.querySelectorAll("div#tab_12 table tr");
//       const result = [];
//       rows.forEach((row, index) => {
//         if (index > 0) {
//           // Skip the header row
//           const cols = row.querySelectorAll("td");
//           const rowData = Array.from(cols).map((col) => col.innerText.trim());
//           result.push(rowData);
//         }
//       });
//       return result;
//     });

//     return data; // Return the scraped data
//   } catch (err) {
//     console.error("Error crawling timetable:", err);

//     // Take a screenshot for debugging
//     await page.screenshot({ path: "error-screenshot.png" });
//     throw err;
//   } finally {
//     await browser.close();
//   }
// }

// module.exports = {
//   crawlTimetable,
// };

// const getBrowserInstance = require("../config/puppeteer");

// async function crawlTimetable(khoaName, hocKyName) {
//   const browser = await getBrowserInstance();
//   const page = await browser.newPage();

//   try {
//     // URL of the timetable page
//     const url = "https://ems.vlute.edu.vn/vTKBDonVi"; // Replace with the actual URL
//     await page.goto(url, { waitUntil: "networkidle2" });

//     // Map khoa and hocKy names to dropdown values
//     const khoaMap = {
//       "Khoa Kỹ thuật công nghệ cơ khí": "1",
//       "Khoa Công nghệ thông tin": "3",
//       "Khoa Kinh tế - Luật": "29",
//     };

//     const hocKyMap = {
//       "Học kỳ 1, 2024-2025": "42",
//       "Học kỳ 2, 2024-2025": "43",
//     };

//     const khoaValue = khoaMap[khoaName];
//     const hocKyValue = hocKyMap[hocKyName];

//     // Select "Khoa"
//     await page.select("select#lstDV", khoaValue);

//     // Select "Học Kỳ"
//     await page.select("select#hocky", hocKyValue);
//     console.log("Selected Khoa:", khoaValue);
//     console.log("Selected Hoc Ky:", hocKyValue);

//     // ===================================================
//     // Select "Tuần học" (Multiple Selection)
//     // delete default option
//     await page.evaluate(() => {
//       // Tìm tất cả các nút "×" trong multi-select
//       const removeButtons = document.querySelectorAll(
//         ".select2-selection__choice__remove"
//       );
//       if (removeButtons.length > 0) {
//         removeButtons[0].click(); // Click vào phần tử
//         removeButtons[1].click();
//       }
//     });
//     await page.screenshot({ path: "error-screenshot.png" });

//     await page.click("span.select2-selection"); // Open the multi-select dropdown

//     // Click the search button
//     await page.click("button#btnSearch");
//     await page.waitForSelector("div#tab_12 table tr"); // Wait for the table to appear

//     // Scrape table data
//     const data = await page.evaluate(() => {
//       const rows = document.querySelectorAll("div#tab_12 table tr");
//       const result = [];
//       rows.forEach((row, index) => {
//         if (index > 0) {
//           // Skip the header row
//           const cols = row.querySelectorAll("td");
//           const rowData = Array.from(cols).map((col) => col.innerText.trim());
//           result.push({
//             // Structure the data in a more accessible way
//             monHoc: rowData[0], // Adjust according to your table structure
//             Lop: rowData[1], // Adjust according to your table structure
//           });
//         }
//       });
//       return result;
//     });

//     return data; // Return the structured data
//   } catch (err) {
//     console.error("Error crawling timetable:", err);

//     // Take a screenshot for debugging
//     await page.screenshot({ path: "error-screenshot.png" });
//     throw err;
//   } finally {
//     await browser.close();
//   }
// }

// module.exports = {
//   crawlTimetable,
// };


// const getBrowserInstance = require("../config/puppeteer");
// const Course = require("../models/courseModel"); // Import Course model
// const Subject = require("../models/subjectModel"); // Import Subject model
// const ClassTime = require("../models/classTimeModel"); // Import ClassTime model
// const Schedule = require("../models/schedule")

//  async function crawlTimetable(khoaName, hocKyName) {
//   const browser = await getBrowserInstance();
//   const page = await browser.newPage();

//   try {
//     const url = "https://ems.vlute.edu.vn/vTKBDonVi"; // Replace with the actual URL
//     await page.goto(url, { waitUntil: "networkidle2" });

//     const khoaMap = {
//       "Khoa Kỹ thuật công nghệ cơ khí": "1",
//       "Khoa Công nghệ thông tin": "3",
//       "Khoa Kinh tế - Luật": "29",
//     };

//     const hocKyMap = {
//       "Học kỳ 1, 2024-2025": "42",
//       "Học kỳ 2, 2024-2025": "43",
//     };

//     const khoaValue = khoaMap[khoaName];
//     const hocKyValue = hocKyMap[hocKyName];

//     await page.select("select#lstDV", khoaValue);
//     await page.select("select#hocky", hocKyValue);

//     // Clear default options in "Tuần học" multi-select
//     await page.evaluate(() => {
//       const removeButtons = document.querySelectorAll(".select2-selection__choice__remove");
//       removeButtons.forEach((button) => button.click()); // Remove all default selections
//     });

//     await page.click("span.select2-selection");

//     await page.click("button#btnSearch");
//     await page.waitForSelector("div#tab_12 table tr");

//     // Scrape table data
//     const data = await page.evaluate(() => {
//       const rows = document.querySelectorAll("div#tab_12 table tr");
//       const result = [];

//       rows.forEach((row, index) => {
//         if (index > 0) { // Skip the header row
//           const cols = row.querySelectorAll("td");
//           const rowData = Array.from(cols).map((col) => col.innerText.trim());
//           result.push(rowData);
//         }
//       });
//       return result;
//     });

//     // Transform and parse the data
//     const structuredData = data.map((entry) => {
//       const [category, details] = entry;

//       const courseCodeMatch = details.match(/(\d+_[^\s]+)/);
//       const subjectNameMatch = details.match(/(\w+\s-\s[^\(]+)/);
//       const instructorMatch = details.match(/GV:\s(.*?)Phòng:/);
//       const scheduleMatch = details.match(/(Tiết\s\d\s-\s\d,\s[^\)]+)/);
//       const weeksMatch = details.match(/Tuần học:\s*([\d\s\-\,]+)$/);
//       const creditMatch = details.match(/(\d+)\s*\(\s*(\d+(\.\d+)?)\s*\)/);
//       const credit = creditMatch ? parseFloat(creditMatch[2]) : 0;

//       const weeksArray = weeksMatch
//         ? weeksMatch[1]
//             .split('-')
//             .map((week) => week.trim())
//             .filter((week) => week)
//             .map((week) => parseInt(week))
//         : [];

//       // Extract studentGroup (numeric value)
//       const studentGroupMatch = details.match(/(\d+)\s+sv/);
//       const studentGroup = studentGroupMatch ? parseInt(studentGroupMatch[1], 10) : 0;

//       // Extract `ma_mon` and `ten_mon` from subjectName
//       let ma_mon = '';
//       let ten_mon = '';
//       if (subjectNameMatch) {
//         const subjectParts = subjectNameMatch[0].split(" - ");
//         if (subjectParts.length > 1) {
//           ma_mon = subjectParts[0].trim(); // e.g., SP1422, TH1507
//           ten_mon = subjectParts[1].trim(); // e.g., Thực tập sư phạm, Đồ án CNTT 1
//         }
//       }

//       // Extract schedule (tenCa, thoiGian)
//       let tenCa = '';
//       let thoiGian = '';
//       if (scheduleMatch) {
//         const scheduleParts = scheduleMatch[1].split(","); // Split by the comma to get Tiết and Time
//         if (scheduleParts.length > 1) {
//           tenCa = scheduleParts[0].trim(); // Tiết 1 - 3
//           thoiGian = scheduleParts[1].trim(); // 07g00 - 09g20
//         }
//       }

//       // Only return valid data
//       if (
//         courseCodeMatch &&
//         ma_mon && // Check if ma_mon is valid
//         ten_mon && // Check if ten_mon is valid
//         instructorMatch &&
//         scheduleMatch &&
//         Array.isArray(weeksArray) && weeksArray.length > 0 &&
//         credit >= 0
//       ) {
//         return {
//           courseCode: courseCodeMatch[1],
//           subjectName: subjectNameMatch[0].trim(),
//           instructor: instructorMatch[1].trim(),
//           schedule: scheduleMatch[1].trim(),
//           weeks: weeksArray,
//           studentGroup: studentGroup, // Corrected student group as a number
//           credit,
//           category,
//           ma_mon, // Add `ma_mon` to the returned object
//           ten_mon, // Add `ten_mon` to the returned object
//           tenCa, // Add `tenCa` for the period (e.g., Tiết 1 - 3)
//           thoiGian, // Add `thoiGian` for the time (e.g., 07g00 - 09g20)
//         };
//       }
//       return null;
//     });

//     // Filter out null values and return the valid data
//     const validData = structuredData.filter(entry => entry !== null);

//     // Save data to database
//     for (const course of validData) {
//       // Save Course data
//       const newCourse = new Course({
//         ma_lop_hoc_phan: course.courseCode,
//         si_so: course.studentGroup, // Numeric student group
//         so_tiet_truc_tiep: 0,
//         so_tiet_tong: 0,
//         loai_mon_hoc: "NG",
//       });
//       console.log("Course saved:", newCourse);

//       // Uncomment to save to the database
//       // await newCourse.save();

//       // Save Subject data
//       const newSubject = new Subject({
//         ma_mon: course.ma_mon,       // e.g., SP1422, TH1507
//         ten_mon: course.ten_mon,     // e.g., Thực tập sư phạm, Đồ án CNTT 1
//         so_tin_chi: course.credit,   // e.g., 0.1
//         tin_chi_ly_thuyet: 0,       // Assuming no theory credits
//         tin_chi_thuc_hanh: 0,       // Assuming no practical credits
//       });
//       console.log("Subject saved:", newSubject);

//       // Uncomment to save subject data to the database
//       // await newSubject.save();

//       // Save ClassTime data
//       const newClassTime = new ClassTime({
//         tenCa: course.tenCa,   // e.g., Tiết 1 - 3
//         thoiGian: course.thoiGian,  // e.g., 07g00 - 09g20
//       });
//       console.log("ClassTime saved:", newClassTime);

//       // Uncomment to save class time data to the database
//       // await newClassTime.save();

//       const newSchedule = new Schedule({
//        dayOfWeek: course.category,
//       });
//       console.log("Schedule saved:", newSchedule);

//       // Uncomment to save class time data to the database
//       // await newClassTime.save();
//     }
//     console.log("Timetable data saved successfully");
//     return validData;

//   } catch (err) {
//     console.error("Error crawling timetable:", err);
//     await page.screenshot({ path: "error-screenshot.png" });
//     throw err;
//   } finally {
//     await browser.close();
//   }
// }

// module.exports = {
//   crawlTimetable,
// };



const getBrowserInstance = require("../config/puppeteer");
const Course = require("../models/courseModel");
const Subject = require("../models/subjectModel");
const ClassTime = require("../models/classTimeModel");
const Schedule = require("../models/schedule");
const Semester = require("../models/semesterModel");

async function crawlTimetable(khoaName, hocKyName) {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();

  try {
    const url = "https://ems.vlute.edu.vn/vTKBDonVi"; // Replace with the actual URL
    await page.goto(url, { waitUntil: "networkidle2" });

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

    // Check and save Semester if it doesn't exist
    const existingSemester = await Semester.findOne({ hoc_ky: hocKyName });
    if (!existingSemester) {
      const newSemester = new Semester({
        hoc_ky: hocKyName,
        nam_hoc: hocKyName.split(",")[1].trim(),
      });
      // await newSemester.save();  // --- Commit: Save Semester to Database ---
      console.log("Semester saved:", newSemester);
    }

    // Select options in the dropdown
    await page.select("select#lstDV", khoaValue);
    await page.select("select#hocky", hocKyValue);

    // Clear default options in "Tuần học" multi-select
    await page.evaluate(() => {
      const removeButtons = document.querySelectorAll(
        ".select2-selection__choice__remove"
      );
      removeButtons.forEach((button) => button.click());
    });

    await page.click("span.select2-selection");
    await page.click("button#btnSearch");
    await page.waitForSelector("div#tab_12 table tr");

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

    // Transform and parse the data
    const structuredData = data.map((entry) => {
      const [category, details] = entry;

      const courseCodeMatch = details.match(/(\d+_[^\s]+)/);
      const subjectNameMatch = details.match(/(\w+\s-\s[^\(]+)/);
      const instructorMatch = details.match(/GV:\s(.*?)Phòng:/);
      const scheduleMatch = details.match(/(Tiết\s\d\s-\s\d,\s[^\)]+)/);
      const weeksMatch = details.match(/Tuần học:\s*([\d\s\-\,]+)$/);
      const creditMatch = details.match(/(\d+)\s*\(\s*(\d+(\.\d+)?)\s*\)/);
      const credit = creditMatch ? parseFloat(creditMatch[2]) : 0;

      const weeksArray = weeksMatch
        ? weeksMatch[1]
            .split("-")
            .map((week) => week.trim())
            .filter((week) => week)
            .map((week) => parseInt(week))
        : [];

      const studentGroupMatch = details.match(/(\d+)\s+sv/);
      const studentGroup = studentGroupMatch
        ? parseInt(studentGroupMatch[1], 10)
        : 0;

      let ma_mon = "";
      let ten_mon = "";
      if (subjectNameMatch) {
        const subjectParts = subjectNameMatch[0].split(" - ");
        if (subjectParts.length > 1) {
          ma_mon = subjectParts[0].trim();
          ten_mon = subjectParts[1].trim();
        }
      }

      let tenCa = "";
      let thoiGian = "";
      if (scheduleMatch) {
        const scheduleParts = scheduleMatch[1].split(",");
        if (scheduleParts.length > 1) {
          tenCa = scheduleParts[0].trim();
          thoiGian = scheduleParts[1].trim();
        }
      }

      if (
        courseCodeMatch &&
        ma_mon &&
        ten_mon &&
        instructorMatch &&
        scheduleMatch &&
        Array.isArray(weeksArray) &&
        weeksArray.length > 0 &&
        credit >= 0
      ) {
        return {
          courseCode: courseCodeMatch[1],
          subjectName: subjectNameMatch[0].trim(),
          instructor: instructorMatch[1].trim(),
          schedule: scheduleMatch[1].trim(),
          weeks: weeksArray,
          studentGroup,
          credit,
          category,
          ma_mon,
          ten_mon,
          tenCa,
          thoiGian,
        };
      }
      return null;
    });

    const validData = structuredData.filter((entry) => entry !== null);
    for (const course of validData) {
      // Check if the subject already exists
      let existingSubject = await Subject.findOne({ ma_mon: course.ma_mon });
      if (!existingSubject) {
        const newSubject = new Subject({
          ma_mon: course.ma_mon,
          ten_mon: course.ten_mon,
          so_tin_chi: course.credit,
          tin_chi_ly_thuyet: 0,
          tin_chi_thuc_hanh: 0,
        });
        await newSubject.save();
        console.log("Subject saved:", newSubject);
        existingSubject = newSubject;
      }

      // Check if the course already exists
      let existingCourse = await Course.findOne({
        ma_lop_hoc_phan: course.courseCode,
      });
      if (!existingCourse) {
        const newCourse = new Course({
          ma_lop_hoc_phan: course.courseCode,
          si_so: course.studentGroup,
          so_tiet_truc_tiep: 0,
          so_tiet_tong: 0,
          loai_mon_hoc: "NG",
          subject: existingSubject._id,
        });
        await newCourse.save();
        console.log("Course saved:", newCourse);
        existingCourse = newCourse;
      }

      // Check if the ClassTime already exists
      let existingClassTime = await ClassTime.findOne({
        tenCa: course.tenCa,
        thoiGian: course.thoiGian,
      });
      if (!existingClassTime) {
        const newClassTime = new ClassTime({
          tenCa: course.tenCa,
          thoiGian: course.thoiGian,
        });
        await newClassTime.save();
        console.log("ClassTime saved:", newClassTime);
        existingClassTime = newClassTime;
      }

      // Check if the Schedule already exists
      // Check if the Schedule already exists for the day
      let existingSchedule = await Schedule.findOne({
        dayOfWeek: course.category,
      });

      if (!existingSchedule) {
        // Create a new schedule if none exists for this day
        existingSchedule = new Schedule({
          dayOfWeek: course.category,
          classes: [],
        });
      }

      // Check if this class is already in the schedule
      const classExists = existingSchedule.classes.some(
        (cls) =>
          cls.ma_lop_hoc_phan.toString() === existingCourse._id.toString() &&
          cls.classTime.toString() === existingClassTime._id.toString()
      );

      if (!classExists) {
        // Add new class to the schedule
        existingSchedule.classes.push({
          ma_lop_hoc_phan: existingCourse._id,
          classTime: existingClassTime._id,
          rooms: course.roomId, // Ensure course.roomId is defined correctly
          giang_vien_phu_trach: course.teacherId, // Ensure course.teacherId is defined correctly
        });

        // Save the updated schedule
        await existingSchedule.save();
        console.log(`Class added to schedule for ${course.category}`);
      } else {
        console.log(`Class already exists in schedule for ${course.category}`);
      }
    }

    console.log("Timetable data saved successfully");
    return validData;
  } catch (err) {
    console.error("Error crawling timetable:", err);
    await page.screenshot({ path: "error-screenshot.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = {
  crawlTimetable,
};
