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
// const Course = require("../models/courseModel");
// const Subject = require("../models/subjectModel");
// const ClassTime = require("../models/classTimeModel");
// const Schedule = require("../models/schedule");
// const Semester = require("../models/semesterModel");
// const ClassRoom = require("../models/classRoomModal");

// async function crawlTimetable(khoaName, hocKyName) {
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
//       "Học kỳ hè, 2023-2024": "41",
//       "Học kỳ 2, 2023-2024": "40",
//       "Học kỳ phụ, 2023-2024": "39",
//       "Học kỳ 1, 2023-2024": "37",
//       "Học kỳ hè, 2022-2023": "36",
//     };

//     const khoaValue = khoaMap[khoaName];
//     const hocKyValue = hocKyMap[hocKyName];

//     const semesterNumber = hocKyName.match(/\d+/); // This regex matches the first number in the string (e.g., "1")
//     const semesterNumberValue = semesterNumber ? semesterNumber[0] : null;

//     // Check and save Semester if it doesn't exist
//     const existingSemester = await Semester.findOne({
//       hoc_ky: semesterNumberValue,
//     });
//     if (!existingSemester) {
//       const newSemester = new Semester({
//         hoc_ky: semesterNumberValue, // Save only the semester number
//         nam_hoc: hocKyName.split(",")[1].trim(),
//       });
//       await newSemester.save();
//       console.log("Semester saved:", newSemester);
//     }

//     // Select options in the dropdown
//     await page.select("select#lstDV", khoaValue);
//     await page.select("select#hocky", hocKyValue);

//     // Clear default options in "Tuần học" multi-select
//     await page.evaluate(() => {
//       const removeButtons = document.querySelectorAll(
//         ".select2-selection__choice__remove"
//       );
//       removeButtons.forEach((button) => button.click());
//     });

//     await page.click("span.select2-selection");
//     await page.click("button#btnSearch");
//     await page.waitForSelector("div#tab_12 table tr");

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

//     // Transform and parse the data
//     const structuredData = data.map((entry) => {
//       const [category, details] = entry;

//       const courseCodeMatch = details.match(/(\d+_[^\s]+)/);
//       const subjectNameMatch = details.match(/(\w+\s-\s[^\(]+)/);
//       const instructorMatch = details.match(/GV:\s(.*?)Phòng:/);
//       const scheduleMatch = details.match(/(Tiết\s\d\s-\s\d,\s[^\)]+)/);
//       const roomMatch = details.match(/Phòng:\s([^\(]+)/); // Extract the room info
//       const creditMatch = details.match(/\((\d+\.\d)\)/); // Match the credit value like (0.2)

//       let ma_mon = "";
//       let ten_mon = "";
//       if (subjectNameMatch) {
//         const subjectParts = subjectNameMatch[0].split(" - ");
//         if (subjectParts.length > 1) {
//           ma_mon = subjectParts[0].trim();
//           ten_mon = subjectParts[1].trim();
//         }
//       }

//       const studentGroupMatch = details.match(/(\d+)\s+sv/);
//       const studentGroup = studentGroupMatch
//         ? parseInt(studentGroupMatch[1], 10)
//         : 0;

//       let tenCa = "";
//       let thoiGian = "";
//       if (scheduleMatch) {
//         const scheduleParts = scheduleMatch[1].split(",");
//         if (scheduleParts.length > 1) {
//           tenCa = scheduleParts[0].trim();
//           thoiGian = scheduleParts[1].trim();
//         }
//       }
//       const roomName = roomMatch ? roomMatch[1].trim() : null; // Room information

//       let tin_chi_ly_thuyet = 0; // Default value for theory credits
//       let tin_chi_thuc_hanh = 0; // Default value for practice credits
//       let totalCredit = 0;

//       if (creditMatch) {
//         const creditValue = parseFloat(creditMatch[1]);
//         tin_chi_ly_thuyet = Math.floor(creditValue); // Theory credits (integer part)
//         tin_chi_thuc_hanh = Math.round((creditValue - tin_chi_ly_thuyet) * 10); // Round practice credits to nearest integer
//         totalCredit = tin_chi_ly_thuyet + tin_chi_thuc_hanh; // Sum of theory and practice credits
//       }

//       if (
//         courseCodeMatch &&
//         ma_mon &&
//         ten_mon &&
//         instructorMatch &&
//         scheduleMatch
//       ) {
//         return {
//           courseCode: courseCodeMatch[1],
//           subjectName: subjectNameMatch[0].trim(),
//           instructor: instructorMatch[1].trim(),
//           schedule: scheduleMatch[1].trim(),
//           studentGroup, // Default value
//           credit: totalCredit, // Total credit is the sum of theory and practice credits
//           category,
//           ma_mon,
//           ten_mon,
//           tenCa,
//           thoiGian,
//           tin_chi_ly_thuyet,
//           tin_chi_thuc_hanh,
//           roomName, // Include room in the structured data
//         };
//       }
//       return null;
//     });

//     const validData = structuredData.filter((entry) => entry !== null);

//     for (const course of validData) {
//       // Check if the subject already exists
//       let existingSubject = await Subject.findOne({ ma_mon: course.ma_mon });
//       if (!existingSubject) {
//         const newSubject = new Subject({
//           ma_mon: course.ma_mon,
//           ten_mon: course.ten_mon,
//           so_tin_chi: course.credit,
//           tin_chi_ly_thuyet: course.tin_chi_ly_thuyet,
//           tin_chi_thuc_hanh: course.tin_chi_thuc_hanh,
//         });
//         await newSubject.save();
//         console.log("Subject saved:", newSubject);
//         existingSubject = newSubject;
//       }

//       // Check if the course already exists
//       let existingCourse = await Course.findOne({
//         ma_lop_hoc_phan: course.courseCode,
//       });

//       if (!existingCourse) {
//         // Nếu Course chưa tồn tại, tạo mới
//         const newCourse = new Course({
//           ma_lop_hoc_phan: course.courseCode,
//           si_so: course.studentGroup,
//           so_tiet_truc_tiep: 0,
//           so_tiet_tong: 0,
//           loai_mon_hoc: "NG",
//           subject: existingSubject._id, // Gán subjectId
//         });
//         await newCourse.save();
//         console.log("Course saved:", newCourse);
//         existingCourse = newCourse;
//       } else {
//         // Nếu Course đã tồn tại, kiểm tra và cập nhật subject nếu cần
//         if (
//           !existingCourse.subject ||
//           existingCourse.subject.toString() !== existingSubject._id.toString()
//         ) {
//           existingCourse.subject = existingSubject._id; // Gán subjectId mới
//           await existingCourse.save();
//           console.log("Course updated with subjectId:", existingCourse);
//         }
//       }

//       let existingSemester = await Semester.findOne({
//         hoc_ky: semesterNumberValue,
//       });

//       if (!existingSemester) {
//         // If the semester does not exist, create a new one
//         const newSemester = new Semester({
//           hoc_ky: semesterNumberValue,
//           nam_hoc: hocKyName.split(",")[1].trim(),
//         });
//         await newSemester.save();
//         console.log("Semester saved:", newSemester);
//         existingSemester = newSemester;
//       }

//       // Add the course to the semester
//       if (!existingSemester.cac_lop_hoc_phan.includes(existingCourse._id)) {
//         existingSemester.cac_lop_hoc_phan.push(existingCourse._id);
//         await existingSemester.save();
//         console.log("Course added to semester:", existingCourse.courseCode);
//       }

//       // Check if the ClassTime already exists
//       let existingClassTime = await ClassTime.findOne({
//         tenCa: course.tenCa,
//         thoiGian: course.thoiGian,
//       });

//       if (!existingClassTime) {
//         const newClassTime = new ClassTime({
//           tenCa: course.tenCa,
//           thoiGian: course.thoiGian,
//         });
//         await newClassTime.save();
//         console.log("ClassTime saved:", newClassTime);
//         existingClassTime = newClassTime;
//       }

//       // Check if the ClassRoom already exists
//       let existingClassRoom = await ClassRoom.findOne({
//         room: course.roomName,
//       });
//       if (!existingClassRoom) {
//         const newClassRoom = new ClassRoom({
//           room: course.roomName,
//         });
//         await newClassRoom.save();
//         console.log("ClassRoom saved:", newClassRoom);
//         existingClassRoom = newClassRoom;
//       }

//       // Check if the Schedule already exists for the day
//       let existingSchedule = await Schedule.findOne({
//         dayOfWeek: course.category,
//       });

//       if (!existingSchedule) {
//         // Create a new schedule if it doesn't exist
//         existingSchedule = new Schedule({
//           dayOfWeek: course.category,
//           classes: [],
//         });
//       }

//       const classExists = existingSchedule.classes.some(
//         (cls) =>
//           cls.ma_lop_hoc_phan.toString() === existingCourse._id.toString() &&
//           cls.classTime.toString() === existingClassTime._id.toString()
//       );

//       if (!classExists) {
//         existingSchedule.classes.push({
//           ma_lop_hoc_phan: existingCourse._id,
//           classTime: existingClassTime._id,
//           rooms: existingClassRoom?._id, // Link ClassRoom by ID
//           giang_vien_phu_trach: course.teacherId,
//         });

//         // Save the updated schedule to the database
//         await existingSchedule.save();
//         console.log(`Class added to schedule for ${course.category}`);
//       } else {
//         console.log(`Class already exists in schedule for ${course.category}`);
//       }
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
const ClassRoom = require("../models/classRoomModal");

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
      "Học kỳ hè, 2023-2024": "41",
      "Học kỳ 2, 2023-2024": "40",
      "Học kỳ phụ, 2023-2024": "39",
      "Học kỳ 1, 2023-2024": "37",
      "Học kỳ hè, 2022-2023": "36",
    };

    const khoaValue = khoaMap[khoaName];
    const hocKyValue = hocKyMap[hocKyName];

    const semesterNumber = hocKyName.match(/\d+/); // This regex matches the first number in the string (e.g., "1")
    const semesterNumberValue = semesterNumber ? semesterNumber[0] : null;

    // Check and save Semester if it doesn't exist
    const existingSemester = await Semester.findOne({
      hoc_ky: semesterNumberValue,
    });
    if (!existingSemester) {
      const newSemester = new Semester({
        hoc_ky: semesterNumberValue, // Save only the semester number
        nam_hoc: hocKyName.split(",")[1].trim(),
      });
      await newSemester.save();
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
      const roomMatch = details.match(/Phòng:\s([^\(]+)/); // Extract the room info
      const creditMatch = details.match(/\((\d+\.\d)\)/); // Match the credit value like (0.2)

      let ma_mon = "";
      let ten_mon = "";
      if (subjectNameMatch) {
        const subjectParts = subjectNameMatch[0].split(" - ");
        if (subjectParts.length > 1) {
          ma_mon = subjectParts[0].trim();
          ten_mon = subjectParts[1].trim();
        }
      }

      const studentGroupMatch = details.match(/(\d+)\s+sv/);
      const studentGroup = studentGroupMatch
        ? parseInt(studentGroupMatch[1], 10)
        : 0;

      let tenCa = "";
      let thoiGian = "";
      let thoiGianBatDau = "";
      let thoiGianKetThuc = "";
      if (scheduleMatch) {
        const scheduleParts = scheduleMatch[1].split(",");
        if (scheduleParts.length > 1) {
          tenCa = scheduleParts[0].trim();
          thoiGian = scheduleParts[1].trim();
          const timeParts = thoiGian.split(" - ");
          if (timeParts.length === 2) {
            thoiGianBatDau = timeParts[0].trim();
            thoiGianKetThuc = timeParts[1].trim();
          }
        }
        
      }
      const roomName = roomMatch ? roomMatch[1].trim() : null; // Room information

      let tin_chi_ly_thuyet = 0; // Default value for theory credits
      let tin_chi_thuc_hanh = 0; // Default value for practice credits
      let totalCredit = 0;

      if (creditMatch) {
        const creditValue = parseFloat(creditMatch[1]);
        tin_chi_ly_thuyet = Math.floor(creditValue); // Theory credits (integer part)
        tin_chi_thuc_hanh = Math.round((creditValue - tin_chi_ly_thuyet) * 10); // Round practice credits to nearest integer
        totalCredit = tin_chi_ly_thuyet + tin_chi_thuc_hanh; // Sum of theory and practice credits
      }

      if (
        courseCodeMatch &&
        ma_mon &&
        ten_mon &&
        instructorMatch &&
        scheduleMatch
      ) {
        return {
          courseCode: courseCodeMatch[1],
          subjectName: subjectNameMatch[0].trim(),
          instructor: instructorMatch[1].trim(),
          schedule: scheduleMatch[1].trim(),
          studentGroup, // Default value
          credit: totalCredit, // Total credit is the sum of theory and practice credits
          category,
          ma_mon,
          ten_mon,
          tenCa,
          thoiGian,
          thoiGianBatDau,
          thoiGianKetThuc,
          tin_chi_ly_thuyet,
          tin_chi_thuc_hanh,
          roomName, // Include room in the structured data
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
          tin_chi_ly_thuyet: course.tin_chi_ly_thuyet,
          tin_chi_thuc_hanh: course.tin_chi_thuc_hanh,
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
        // Nếu Course chưa tồn tại, tạo mới
        const newCourse = new Course({
          ma_lop_hoc_phan: course.courseCode,
          si_so: course.studentGroup,
          so_tiet_truc_tiep: 0,
          so_tiet_tong: 0,
          loai_mon_hoc: "NG",
          subject: existingSubject._id, // Gán subjectId
        });
        await newCourse.save();
        console.log("Course saved:", newCourse);
        existingCourse = newCourse;
      } else {
        // Nếu Course đã tồn tại, kiểm tra và cập nhật subject nếu cần
        if (
          !existingCourse.subject ||
          existingCourse.subject.toString() !== existingSubject._id.toString()
        ) {
          existingCourse.subject = existingSubject._id; // Gán subjectId mới
          await existingCourse.save();
          console.log("Course updated with subjectId:", existingCourse);
        }
      }

      let existingSemester = await Semester.findOne({
        hoc_ky: semesterNumberValue,
      });

      if (!existingSemester) {
        // If the semester does not exist, create a new one
        const newSemester = new Semester({
          hoc_ky: semesterNumberValue,
          nam_hoc: hocKyName.split(",")[1].trim(),
        });
        await newSemester.save();
        console.log("Semester saved:", newSemester);
        existingSemester = newSemester;
      }

      // Add the course to the semester
      if (!existingSemester.cac_lop_hoc_phan.includes(existingCourse._id)) {
        existingSemester.cac_lop_hoc_phan.push(existingCourse._id);
        await existingSemester.save();
        console.log("Course added to semester:", existingCourse.courseCode);
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
          thoiGianBatDau:course.thoiGianBatDau,
          thoiGianKetThuc:course.thoiGianKetThuc,
        });
        await newClassTime.save();
        console.log("ClassTime saved:", newClassTime);
        existingClassTime = newClassTime;
      }

      // Check if the ClassRoom already exists
      let existingClassRoom = await ClassRoom.findOne({
        room: course.roomName,
      });
      if (!existingClassRoom) {
        const newClassRoom = new ClassRoom({
          room: course.roomName,
        });
        await newClassRoom.save();
        console.log("ClassRoom saved:", newClassRoom);
        existingClassRoom = newClassRoom;
      }

      // Check if the Schedule already exists for the day
      let existingSchedule = await Schedule.findOne({
        dayOfWeek: course.category,
      });

      if (!existingSchedule) {
        // Create a new schedule if it doesn't exist
        existingSchedule = new Schedule({
          dayOfWeek: course.category,
          classes: [],
        });
      }

      const classExists = existingSchedule.classes.some(
        (cls) =>
          cls.ma_lop_hoc_phan.toString() === existingCourse._id.toString() &&
          cls.classTime.toString() === existingClassTime._id.toString()
      );

      if (!classExists) {
        existingSchedule.classes.push({
          ma_lop_hoc_phan: existingCourse._id,
          classTime: existingClassTime._id,
          rooms: existingClassRoom?._id, // Link ClassRoom by ID
          giang_vien_phu_trach: course.teacherId,
        });

        // Save the updated schedule to the database
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