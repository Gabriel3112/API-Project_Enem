const database = require('../database/connection');

exports.InsertContent = (request, response)=>{
  const UID = request.body.UID;
  const matter = request.body.matter;
  const title = request.body.title;
  const content = request.body.content;
  const author = request.body.author;

  database.InsertContent(UID ,matter, title, content, author, response);
}

exports.SearchContent = (request, response)=>{
  let skip = request.query.skip;
  let limit = request.query.limit;
  database.ShowAllContent(skip, limit,response);
}

exports.ShowUserContent = (request, response)=>{
  const UID = request.query.UID;

  database.ShowUserContent(UID, response);
}

exports.DeleteContent = (request, response)=>{
  const id = request.query.id;

  database.DeleteContent(id, response);
}

