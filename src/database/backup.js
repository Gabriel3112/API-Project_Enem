const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore().collection('content');

db.get().then((docs)=>{

  exports.SearchContentWithTags = async (search, response )=>{
    let content = [];
    await docs.forEach((doc)=>{
      doc.data().tags.forEach((tag)=>{
        if(tag == search.toLowerCase()){
          content.push({
            id: doc.id, matter: doc.data().matter, title: doc.data().title, content: doc.data().content, author: doc.data().author
          });
        }
      });
    });
    response.json(content);
  }


  exports.ShowAllContent = async (response)=>{
    let content = [];

    await docs.forEach((doc)=>{
      content.push({
        id: doc.id, matter: doc.data().matter, title: doc.data().title, content: doc.data().content, author: doc.data().author
      })
    });
    console.log(content)
    response.send(content);
  }
});

exports.InsertContent = async(matter, title, content, author, response)=>{
  var strAuthor = `${author}`.split(' ');
  var strTitle = `${title}`.split(' ');
  var tagsArray = [matter, title, author ].concat(strAuthor).concat(strTitle);
  var tags = tagsArray.map(str => str.toLowerCase());

  db.add({
    matter: matter, 
    title: title, 
    content: content, 
    author: author,
    tags: tags
  }).then(()=>{
    response.status(200);
  });
}
