//DB collection.
Posts = new Mongo.Collection("posts");
if (Meteor.isClient) {
//BODY - helpers.
  Template.body.helpers({
    posts:function(){
      return Posts.find();
    }
  });
//POSTFORM - events.
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
          owner: Meteor.userId(),
          author:Meteor.user().emails[0].address,
          tag:tag
        });

        event.target.title.value = '';
        event.target.body.value = '';
        event.target.tag.value = '';
        return false
      }
    }
  });
//POST - helpers.
  Template.post.helpers({
    isOwner:function(){
      return this.owner === Meteor.userId();
    }
  });
//POST - events.
  Template.post.events({
    "click .remove-post":function(){
      Posts.remove(this._id)
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
