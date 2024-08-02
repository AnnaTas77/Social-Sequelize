const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");

const usersSeed = require("./seed/users.json");
const profilesSeed = require("./seed/profiles.json");
const postsSeed = require("./seed/posts.json");
const likesSeed = require("./seed/likes.json");
const commentsSeed = require("./seed/comments.json");

describe("Social Sequelzie Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeEach(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
    // recreates the DB
  });

  // Write your tests here

  test("can create User", async function () {
    await User.bulkCreate(usersSeed);
    const foundUser = await User.findByPk(1);
    expect(foundUser).toEqual(expect.objectContaining(usersSeed[0]));
  });

  test("can create Profile", async function () {
    await Profile.bulkCreate(profilesSeed);
    const foundProfile = await Profile.findByPk(1);
    expect(foundProfile).toEqual(expect.objectContaining(profilesSeed[0]));
  });

  test("can create Post", async function () {
    await Post.bulkCreate(postsSeed);
    const foundPost = await Post.findByPk(1);
    expect(foundPost).toEqual(expect.objectContaining(postsSeed[0]));
  });

  test("can create Like", async function () {
    await Like.bulkCreate(likesSeed);
    const foundLike = await Like.findByPk(1);
    expect(foundLike).toEqual(expect.objectContaining(likesSeed[0]));
  });

  test("can create Comment", async function () {
    await Comment.bulkCreate(commentsSeed);
    const foundComment = await Comment.findByPk(1);
    expect(foundComment).toEqual(expect.objectContaining(commentsSeed[0]));
  });

  test("User can have only one Profile", async () => {
    const myUser = await User.create(usersSeed[0]);
    const myProfile = await Profile.create(profilesSeed[0]);

    await myUser.setProfile(myProfile);
    const associatedProfile = await myUser.getProfile();
    // console.log("associatedProfile: ", associatedProfile.toJSON());

    expect(associatedProfile instanceof Profile).toBeTruthy();
  });

  test("User can have many Likes", async () => {
    let myUser = await User.create(usersSeed[0]);
    let myLike1 = await Like.create(likesSeed[0]);
    let myLike2 = await Like.create(likesSeed[1]);

    await myUser.addLike(myLike1);
    await myUser.addLike(myLike2);

    const associatedLikes = await myUser.getLikes();
    // console.log("associatedLikes: ", JSON.stringify(associatedLikes, null, 2));
    expect(associatedLikes.length).toBe(2);
    expect(associatedLikes instanceof Like).toBeTruthy;
  });
});
