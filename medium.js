//DB collection.
Posts = new Mongo.Collection("posts");
if (Meteor.isClient) {
//BODY - helpers.
  Template.body.helpers({
    posts:function(){
      return Posts.find({}, {sort: {thumbs: -1}});
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
        Meteor.call("addPost",title,body,tag);

        event.target.title.value = '';
        event.target.body.value = '';
        event.target.tag.value = '';
        return false;
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
      Meteor.call("removePost", this._id);
    },
    "click .up":function(){
      var id = this._id;
      var thumbs = this.thumbs;
      Meteor.call("thumbsUp", id, thumbs);
      $(".up").addClass("thumbsup");
      Meteor.call("disableButtons");
  }
});

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


//Meteor secure methods.

Meteor.methods({
  addPost:function(title, body ,tag){
    Posts.insert({
      title:title,
      body:body,
      owner: Meteor.userId(),
      thumbs:0,
      upvoters:{},
      tag:tag
    });
  },
  removePost:function(id){
    Posts.remove(id);
  },
  thumbsUp:function(id, thumbs){
    Posts.update(id, {
      $set:{
        thumbs: thumbs+1
      }
    });
  },
  disableButtons:function(){
    $(".up").attr("disabled", "disabled");
  }
});
