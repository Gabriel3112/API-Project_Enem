const MongoClient = require('mongodb').MongoClient;
const { response } = require('express');
const shortid = require('shortid');

const url = process.env.CONNECTION_DATABASE;

MongoClient.connect(url,{useUnifiedTopology: true}, (err, client)=>{
  if(err){
    console.log(err);
  }else{
    
  console.log('Connected successfully to database');
  const dbo = client.db(process.env.NAME_DATABASE);
  const contentCollection = dbo.collection(process.env.NAME_COLLECTION_ONE);




  /*
  * InsertContent = inserir conteúdo no banco de dados
  */
  exports.InsertContent = async (matter,title,content,author, response)=>{

    var strAuthor = `${author}`.split(' ');
    var strTitle = `${title}`.split(' ');
    var tagsArray = [matter, title, author ].concat(strAuthor).concat(strTitle);
    var tags = tagsArray.map(str => str.toLowerCase());

    await contentCollection.insertOne(
    {
      _id: shortid.generate(),
      matter: matter,
      title: title,
      content: content,
      author: author,
      datePublished: Date(),
      tags: tags
    }).then(()=>{
      response.send({message: 'Sending for database'});
    }).catch((err)=>{
      client.close();
      throw err;
    });
  }

  /*
  * SerchContentWithTags = pesquisar conteúdo no banco de dados por tags
  */
  exports.ShowAllContent = async (response)=>{
    await contentCollection.find({}).toArray().then((result)=>{
      response.send(result);
    })
  }

  exports.SearchContentWithTags = async(search, response)=>{
    var searchLowerCase = search.toLowerCase();

    await contentCollection.find({tags: searchLowerCase}.toArray().then((result)=>{
      response.send(result);
    }))
  }
  
  

}

});

 