function add(stringOfNumbers) {
  const arrayOfStrings = getValuesAsArray(stringOfNumbers);
  checkValuesValidity(arrayOfStrings);
  let total = 0;
  for (value of arrayOfStrings) {
    if (value <= 1000) {
      total += parseInt(value) || 0;
    }
  }
  return total;
}

function checkValuesValidity(arrayOfStringValues) {
  const exceptions = [];
  for (value of arrayOfStringValues) {
    if (value < 0) {
      exceptions.push(value)
    }
  }
  if (exceptions.length) {
    throw new Error(`negatives not allowed: ${exceptions.join(', ')}`);
  }

}

function getValuesAsArray(stringOfNumbers) {
  let delimiters = [',', '\n'];
  if (hasCustomDelimiter(stringOfNumbers)) {
    delimiters = delimiters.concat(getNewDelimiter(stringOfNumbers));
    expression = removeCuctomDelimiterFromString(stringOfNumbers);
  }
  return getUndelimitedValues([stringOfNumbers], delimiters)
}

function hasCustomDelimiter(stringOfValues) {
  return /^\/\//.test(stringOfValues);
}

function getNewDelimiter(stringOfValues) {
  const delimiter = stringOfValues.split('\n')[0].substring(2);
  if (/^\[.+\]/.test(delimiter)) {
    return delimiter.substring(1, delimiter.length - 1).split('][');
  }
  return delimiter;
}

function removeCuctomDelimiterFromString(stringOfValues) {
  return stringOfValues.substring(stringOfValues.indexOf('\n') + 1);
}

function getUndelimitedValues(currentArray, delimiters) {
  if (!delimiters.length) {
    return currentArray
  }
  let newCurrentArray = [];
  const delimiter = delimiters.pop();
  for (let i = 0; i < currentArray.length; i++) {
    newCurrentArray = newCurrentArray.concat(currentArray[i].split(delimiter));
  }

  return getUndelimitedValues(newCurrentArray, delimiters);
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function add(stringOfNumbers) {
  const stringAsArray = getArrayFromString(stringOfNumbers);
  const test = checkValidityNumbers(stringAsArray).valuesToAdd;
  let total = 0;
  for (let i = 0; i < test.length; i++) {
    total += test[i] || 0;
  }
  return total;
}

function checkValidityNumbersOls(stringAsArray) {
  const exceptions = [];
  for (let i = 0; i < stringAsArray.length; i++) {
    if (parseInt(stringAsArray[i]) < 0) {
      exceptions.push(stringAsArray[i]);
    }
  }

  if (exceptions.length) {
    throw new Error(`error: ${exceptions.join(', ')}`);
  }
}


function checkValidityNumbers(stringAsArray) {
  const exceptions = [];
  const dataValues = stringAsArray.reduce((allValues, currentValue) => {
    const currentValueNumber = parseInt(currentValue);
    if (currentValueNumber > 0 && currentValueNumber <= 1000) {
      allValues.valuesToAdd.push(currentValueNumber)
    } else if (currentValueNumber < 0) {
      allValues.exceptions.push(currentValueNumber);
    }
    return allValues
  }, {
      exceptions: [],
      valuesToAdd: []
    })

  if (dataValues.exceptions.length) {
    throw new Error(`error: ${dataValues.exceptions.join(', ')}`);
  }

  return dataValues;
}

function getArrayFromString(stringToArray) {
  let delimiters = [',', '\n'];
  if (hasCustomDelimiter(stringToArray)) {
    delimiters = delimiters.concat(getCustomDelimiters(stringToArray));
    expression = removeFirstLine(stringToArray);
  }
  return getUndelimitedValues([stringToArray], delimiters);
}

function hasCustomDelimiter(stringToCheck) {
  return /^\/\//.test(stringToCheck)
}

function getCustomDelimiters(stringToCheck) {
  const delimiterSpecs = stringToCheck.split('\n')[0].substring(2);
  if (/^\[.+\]/.test(delimiterSpecs)) {
    return delimiterSpecs.substring(1, delimiterSpecs.length - 1).split('][');
  }
  return delimiterSpecs;
  // return stringToCheck.charAt(2);
}

function removeFirstLine(stringToReduce) {
  return stringToReduce.substring(stringToReduce.indexOf('\n') + 1);
}

function getUndelimitedValues(expression, delimiters) {
  if (!delimiters.length) {
    return expression;
  }
  const delimiter = delimiters.pop();
  let newExpression = [];
  for (let i = 0; i < expression.length; i++) {
    newExpression = newExpression.concat(expression[i].split(delimiter));
  }
  return getUndelimitedValues(newExpression, delimiters);
}
