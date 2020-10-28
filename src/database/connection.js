const MongoClient = require('mongodb').MongoClient;

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
  exports.InsertContent = async (UID,matter,title,content,author, response)=>{

    let strAuthor = `${author}`.split(' ');
    let strTitle = `${title}`.split(' ');
    let tagsArray = [matter, title, author ].concat(strAuthor).concat(strTitle);
    let tags = tagsArray.map(str => str.toLowerCase());

    let strContent = content.trim();

    await contentCollection.insertOne(
    {
      userUID: UID,
      matter: matter,
      title: title,
      content: strContent,
      author: author,
      datePublished: Date(),
      tags: tags
    }).then((result)=>{
      response.status(201);
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

  exports.ShowUserContent = async(UID ,response) =>{
    await contentCollection.find({userUID: UID}).toArray().then((result)=>{
      response.send(result);
    });
  }

  exports.DeleteContent = async(id,response)=>{
    await contentCollection.deleteOne({_id: id}).then(()=>{
      response.status(204);
    });
  }
  
  

}

});

 