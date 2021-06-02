const notNumerical = (answer) => {
  return JSON.stringify(answer.useranswer) == JSON.stringify(answer.answers);
};
const numerical = (answer) => {
  if (
    parseFloat(answer.options[0], 10) <= parseFloat(answer.useranswer, 10) &&
    parseFloat(answer.useranswer, 10) <= parseFloat(answer.options[1], 10)
  ) {
    return true;
  }
  return false;
};
const mac = (answer, macCorrectMarks) => {
  var marks = 0;
  if (answer.useranswer.every((ans) => answer.answers.includes(ans))) {
    return [true, macCorrectMarks];
  }
  for (var i = 0; i < answer.useranswer.length; i++) {
    if (answer.answers.includes(answer.useranswer[i])) {
      marks++;
    } else {
      return [false, 0];
    }
  }
  return [true, marks];
};
module.exports = {
  notNumerical: notNumerical,
  numerical: numerical,
  mac: mac,
};
