const notNumerical = (answer) => {
  return JSON.stringify(answer.useranswer) == JSON.stringify(answer.answers);
};
const numerical = (answer) => {
  if (
    parseInt(answer.answers[0], 10) <= parseInt(answer.useranswer, 10) &&
    parseInt(answer.useranswer, 10) <= parseInt(answer.answers[1], 10)
  ) {
    return true;
  }
  return false;
};
module.exports = {
  notNumerical: notNumerical,
  numerical: numerical,
};
