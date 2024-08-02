const { Comment, Like, Post, Profile, User } = require("./models/index");

// Define your associations here

/** 
A User can have one Profile and vice versa.
A User can have many Post instances, but a Post can only have one User.
A Post can have many Comment instances, but a Comment can only have one Post.
A User can have many Like instances and vice versa. */

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Like);
Like.hasMany(User);

module.exports = {
  Comment,
  Like,
  Post,
  Profile,
  User,
};
