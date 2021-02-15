const fastcsv = require("fast-csv");
const fs = require("fs");
var db = require("../db/index");

const uploadQuestions = (fileName, req, res) => {
  var stream = fs.createReadStream(
    `/workspace/backend/questionsBackup/${fileName}`
  );
  console.log("Here Stream Created");
  var questionData = [];
  var csvStream = fastcsv
    .parse()
    .on("data", (data) => {
      questionData.push(data);
    })
    .on("end", () => {
      questionData.shift();
      const query =
        "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
      questionData.forEach((row) => {
        db.query(query, row)
          .then((resp) => {
            console.log("Inserted Successfully");
          })
          .catch((err) => {
            console.log("DB Error");
            res.json({ success: false });
          })
          .finally(() => {
            res.json({ success: true });
          });
      });
    });
  stream.pipe(csvStream);
};
module.exports = uploadQuestions;
