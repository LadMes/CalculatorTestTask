function calculator(str) {
  str = str.replace(/\s+/g, '');
  var operationType = checkNumberOfOperations(str);
  var firstOperand = str.split(operationType)[0];
  var secondOperand = str.split(operationType)[1];

  var operands = checkOperands(firstOperand, secondOperand);
  
  return operation(operands[0], operands[1], operands[2], chooseOperation.get(operationType));
}

function operation(a, b, isRoman, func) {
  let result = func(a, b);
  if (isRoman)
      return arabicToRoman(result);
  else
      return String(result); 
}

function sum(a, b) {
  return a + b;  
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return Math.floor(a / b);
}

const chooseOperation = new Map();
chooseOperation.set("+", sum);
chooseOperation.set("-", subtraction);
chooseOperation.set("*", multiplication);
chooseOperation.set("/", division);

function checkNumberOfOperations(str) {
  let operationType = "";
  for (let item of str) {
      if (chooseOperation.get(item) !== undefined) {
          operationType += item;
      }
  }
  if (operationType.length > 1) {
      throw "Calculator works only with 1 operation at time!";
  }
  else if (operationType.length === 0) {
      throw "This is not mathematical operation";
  }
  else {
      return operationType;
  }
}

function checkOperands(firstOperand, secondOperand) {
  let isRoman = false;
  if (isNaN(firstOperand) && isNaN(secondOperand)) {
      firstOperand = romanNumbers.indexOf(firstOperand) + 1;
      secondOperand = romanNumbers.indexOf(secondOperand) + 1;
      isRoman = true;
  }
  else if (firstOperand === "" || secondOperand === "") {
      throw "One or both operands is undefinded";
  }
  else if (isNaN(firstOperand) || isNaN(secondOperand)) {
      throw "Operands belong to different number types (one is Arabic, other is Roman)";
  }
  else {
      firstOperand = parseInt(firstOperand);
      secondOperand = parseInt(secondOperand);
  }

  if (firstOperand < 1 || firstOperand > 10 || secondOperand < 1 || secondOperand > 10 || firstOperand == undefined || secondOperand == undefined) {
      throw "All operands must be in the range 1 to 10";
  }
  else {
      return [firstOperand, secondOperand, isRoman];
  }
}

// Since the max number is 10 and the product of the two max numbers is 100, the check is simplified.
function arabicToRoman(number) {
  let result = "";
  if (number > 0) {    
      while (number !== 0) {
          if (number === 100) {
              number -= 100;
              result += "C";
          }
          else if (number >= 90) {
              number -= 90;
              result += "XC";
          }
          else if (number >= 50) {
              number -= 50;
              result += "L";
          }
          else if (number >= 40) {
              number -= 40;
              result += "XL";
          }
          else if (number >= 10) {
              number -= 10;
              result += "X";
          }
          else if (number < 10)
          {
              result += romanNumbers[number - 1];
              number = 0;
          }
      }
      return result;
  }
  else {
      return result;
  }
}

const romanNumbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
