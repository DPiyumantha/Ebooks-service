'use strict';

module.exports.hello = async event => {
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.saveEBook = async event => {

  const data=JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: {
          userId:data.userId,
          bookId: data.bookId
        },
        event
      },
      null,
      2
    ),
  }
}

module.exports.getAllEBooks = async event => {

  const data=JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'All e books',
        
        event
      },
      null,
      2
    ),
  }
}