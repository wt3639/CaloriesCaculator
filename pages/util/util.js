// util.js
function bmiToX(BMITemp) {
  var bmi = parseFloat(BMITemp);
  if (bmi < 18.5) {
    var x = 10 + 160 / 18.5 * bmi
  }
  if (bmi >= 18.5 && bmi < 24) {
    var x = 170 + 160 / 5.5 * (bmi - 18.5)
  }
  if (bmi >= 24 && bmi < 27) {
    var x = 330 + 160 / 3 * (bmi - 24)
  }
  if (bmi >= 27) {
    var x = 490 + 160 / 13 * (bmi - 27)
  }
  if (bmi >= 40) {
    var x = 650
  }
  return x;
}


module.exports.bmiToX = bmiToX
