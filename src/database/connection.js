const MongoClient = require('mongodb').MongoClient;
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
  exports.InsertContent = async (UID,matter,title,content,author, response)=>{

    let strAuthor = `${author}`.split(' ');
    let strTitle = `${title}`.split(' ');
    let tagsArray = [matter, title, author ].concat(strAuthor).concat(strTitle);
    let tags = tagsArray.map(str => str.toLowerCase());

    let strContent = content.trim();

    const CheckIDExist = ()=>{
      var id = shortid.generate();
      await contentCollection.find({_id: id}).toArray().then((results)=>{
        results.forEach(result=>{
          if(result._id == id){
            id = shortid.generate();
            return id;
          }else{
            return id;
          }
        });
      }).catch((err)=>{
        console.log(err);
      });
    }

    await contentCollection.insertOne(
    {
      _id: CheckIDExist(),
      userUID: UID,
      matter: matter,
      title: title,
      content: strContent,
      author: author,
      datePublished: Date(),
      tags: tags
    }).then((result)=>{
      console.log(result);
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

  exports.ShowUserContent = async(UID ,response) =>{
    await contentCollection.find({userUID: UID}).toArray().then((result)=>{
      response.send(result);
    });
  }
  
  

}

});

 