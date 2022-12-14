const User = require('./User');
const Post = require("./Post");
const Comment = require("./Comment");
const Category = require("./Category");
 


// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// categories
Post.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Post, {
  foreignKey: 'category_id'
});




//comments
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Category };