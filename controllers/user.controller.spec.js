const expect = require("chai").expect;
const sinon = require("sinon");
const userController = require("./user");

describe("Testing: User controller ", () => {
  const sampleUserResponse = {
    username: "syedfaizan",
    id: 1,
  };

  const sampleUserRequest = {
    username: "syedfaizan",
  };

  beforeEach(() => {
    sinon.stub(userController, "create").resolves(sampleUserResponse);
  });

  afterEach(() => {
    userController.create.restore();
  });

  it("User: Create = should find existing user", (done) => {
    userController.create(sampleUserRequest).then((user) => {
      expect(user).to.have.property("id");
      expect(user.username).to.equal(sampleUserRequest.username);
      done();
    });
  });
});
