function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let expression = expr.replace(/ */g, "");
  let numbers = [];
  let signs = [];
  let brackets = [];
  let number = "";
  let bracketsExpression = "";
  let bracketsMode = false;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (bracketsMode === true) {
      if (/\(/.test(char)) {
        brackets.push(char);
        bracketsExpression += char;
        continue;
      }
      if (/\)/.test(char)) {
        if (brackets.length === 0) {
          throw Error("ExpressionError: Brackets must be paired 1 ");
        }
        if (brackets.length === 1) {
          bracketsMode = false;
          numbers.push(expressionCalculator(bracketsExpression));
          bracketsExpression = "";
          brackets = [];
          continue;
        }

        brackets.pop();
      }
      bracketsExpression += char;
      continue;
    }

    if (/[0-9]/.test(char)) {
      number += char;
      continue;
    }
    if (number !== "") {
      numbers.push(number);
      number = "";
    }

    if (/[*/+\-]/.test(char)) {
      signs.push(char);
      continue;
    }

    if (/\(/.test(char)) {
      brackets.push(char);
      bracketsMode = true;
    }
    if (/\)/.test(char)) {
      if (brackets.length === 0) {
        throw Error("ExpressionError: Brackets must be paired 2 ");
      }
    }
  }

  if (number !== "") {
    numbers.push(number);
    number = "";
  }
  if (brackets.length !== 0) {
    throw Error("ExpressionError: Brackets must be paired 3");
  }

  return calculate(numbers, signs);
}
function calculate(numbers, signs) {
  let res = 0;
  if (!(signs.length === 0)) {
    while (true) {
      let signsIndex = signs.findIndex(element => {
        if (element === "*" || element === "/") {
          return true;
        }
      });

      if (signsIndex !== -1) {
        numbers[signsIndex] = mainExpression(
          numbers[signsIndex],
          numbers[signsIndex + 1],
          signs[signsIndex]
        );
        numbers.splice(signsIndex + 1, 1);
        signs.splice(signsIndex, 1);
      } else {
        break;
      }
    }

    res = +numbers[0];
    for (let i = 0; i < signs.length; i++) {
      res = mainExpression(res, numbers[i + 1], signs[i]);
    }
  }

  return res;
}
function mainExpression(operand1, operand2, operator) {
  let a = +operand1;
  let b = +operand2;
  if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    if (b === 0) {
      throw Error("TypeError: Division by zero.");
    } else {
      return a / b;
    }
  } else if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  }
}

module.exports = {
  expressionCalculator
};
