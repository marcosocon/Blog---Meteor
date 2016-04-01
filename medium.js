Posts = new Mongo.Collection("posts");
if (Meteor.isClient) {


  Template.body.helpers({
    posts:function(){
      return Posts.find();
    }
  });

  Template.postform.events({
    "submit .post-form": function (event) {
    var title = event.target.title.value;
    var body = event.target.body.value;
    var tag = event.target.tag.value;

      if (!title || !body|| !tag) {
        alert("Please fill in all the fields");
        return false
      }
      else{
        Posts.insert({
          title:title,
          body:body,
          tag:tag
        });

        event.target.title.value = '';
        event.target.body.value = '';
        event.target.tag.value = '';

        return false
      }
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
