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
module.exports = {
  notNumerical: notNumerical,
  numerical: numerical,
};
