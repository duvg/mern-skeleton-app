const getUniqueErrorMessage = (err) => {
  let output;
  console.log(err);
  try {
    console.log('enter');
    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    console.log('enter 3');
  } catch (ex) {
    output = 'Unique field already exists';
  }
  return output;
}

const getErrorMessage = (err) => {
  let message = '';
  if(err.code) {
    switch(err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Something went wrong'
    }
    return message;
  }

  for(let errName in err.errors) {
    if(err.errors[errName].message) {
      message = err.errors[errName].message;
    }
  }
  return message;
}

export default {
  getErrorMessage,
  getUniqueErrorMessage
};