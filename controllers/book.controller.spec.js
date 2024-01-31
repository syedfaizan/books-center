const expect = require("chai").expect;
const sinon = require("sinon");
const bookController = require("./book");

describe("Testing: Books controller ", () => {
  const sampleBook = {
    id: 1,
    title: "Interstellar",
    ISBN: 3,
    UserId: 1,
    createdAt: "2018-03-22T18:13:23.795Z",
    updatedAt: "2018-03-22T18:13:23.795Z",
    User: {
      id: 1,
      username: "syedfaizan",
      createdAt: "2018-03-25T06:46:00.193Z",
      updatedAt: "2018-03-25T06:46:00.193Z",
    },
  };
  const sampleBookList = [
    {
      id: 1,
      title: "Interstellar",
      ISBN: 3,
      UserId: 1,
      createdAt: "2018-03-22T18:13:23.795Z",
      updatedAt: "2018-03-22T18:13:23.795Z",
      User: {
        id: 1,
        username: "syedfaizan",
        createdAt: "2018-03-25T06:46:00.193Z",
        updatedAt: "2018-03-25T06:46:00.193Z",
      },
    },
  ];
  const sampleDeleteResponse = 1;
  const sampleBookId = 1;
  const params = {};
  const dbObject = {
    id: 1,
    ISBN: 1,
    title: "Harry Potter",
    createdAt: "2018-03-25T06:46:00.193Z",
    updatedAt: "2018-03-25T06:46:00.193Z",
  };
  beforeEach(() => {
    sinon.stub(bookController, "create").resolves(dbObject);
    sinon.stub(bookController, "list").resolves(sampleBookList);
    sinon.stub(bookController, "read").resolves(sampleBook);
    sinon.stub(bookController, "remove").resolves(sampleDeleteResponse);
  });

  afterEach(() => {
    bookController.list.restore();
    bookController.read.restore();
    bookController.create.restore();
    bookController.remove.restore();
  });

  it("Book:Create - Should create a new Book", (done) => {
    bookController.create(sampleBook).then((response) => {
      expect(response).to.have.property("id");
      expect(response).to.have.property("createdAt");
      done();
    });
  });

  it("Book:List - Should List all books from db", (done) => {
    bookController.list(params).then((response) => {
      expect(response).to.be.a("array");
      done();
    });
  });

  it("Book:read - Should fetch single book from db via BookId", (done) => {
    bookController.read(sampleBookId).then((response) => {
      expect(response).to.be.a("object");
      expect(response.id).to.equal(sampleBookId);
      expect(response).to.have.property("User");
      done();
    });
  });

  it("Book:remove - should delete book from db", (done) => {
    bookController.remove(sampleBookId).then((res) => {
      expect(res).to.be.equal(1);
      done();
    });
  });
});
