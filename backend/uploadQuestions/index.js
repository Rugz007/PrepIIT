const fastcsv = require("fast-csv");
const fs = require("fs");
var db = require("../db/index");

const uploadQuestions = async (fileName) => {
  try {
    var stream = fs.createReadStream(
      `/workspace/backend/questionsBackup/${fileName}`
    );
    console.log("Here Stream Created");
    var questionData = [];
    var csvStream = fastcsv
      .parse()
      .on("data", (data) => {
        //console.log(data);
        questionData.push(data);
      })
      .on("end", () => {
        questionData.shift();
        const query =
          "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9)";
        questionData.forEach((row) => {
          db.query(query, row)
            .then((resp) => {
              console.log("Inserted Successfully");
            })
            .catch((err) => {
              console.log("DB Error");
            });
        });
      });
    stream.pipe(csvStream);
  } catch (e) {
    return "Error";
  } finally {
    console.log("All have been inserted");
    return "Success";
  }
};
module.exports = uploadQuestions;
