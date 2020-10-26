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
  if(request.query.search != null){
    const search = request.query.search;

    console.log('Search content with tags');

    database.SearchContentWithTags(search, response);
  }else{
    console.log('Show all content');
    database.ShowAllContent(response);
  }
}

exports.ShowUserContent = (request, response)=>{
  const UID = request.body.UID;

  database.ShowUserContent(UID, response);
}

