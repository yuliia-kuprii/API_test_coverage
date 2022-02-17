const axios = require('axios');
const { SERVER_URL } = require('./credentials.js')
const USER_DATA = require('./crud_user/test_data')


describe("CRUD testing for user", () => {

  it("Should GET a userId after user was created with method POST", (done) => {
    axios.post(`${SERVER_URL}/user`, USER_DATA)
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.data.message).toEqual(`User ${USER_DATA.name} was created.`);
      const userId = response.data.userId
      axios.get(`${SERVER_URL}/user/${userId}`)
      .then((response) => {
        expect(response.data.user.id).toEqual(userId)
        done();
      });
    })
    .catch((error) => {
      done(error);
    });
  });

  it("Should return successful status code on GET user.", (done) => {
    axios.post(`${SERVER_URL}/user`, USER_DATA)
    .then((response) => {
      const userId = response.data.userId;
      axios.get(`${SERVER_URL}/user/${userId}`)
      .then((response) => {  
        expect(response.status).toBe(200);
        done();
      });
    })
    .catch((error) => {
      done(error);
    });
  });

  it("Should return response body on GET user.", (done) => {
    axios.post(`${SERVER_URL}/user`, USER_DATA)
    .then((response) => {
      const userId = response.data.userId;
      axios.get(`${SERVER_URL}/user/${userId}`)
      .then((response) => {
        expect(response.data.user).toEqual({ ...USER_DATA, id: userId });
        done();
      });
    })
    .catch((error) => {
      done(error);
    });
  });

  it("Should successfully POST, GET and DELETE a user", (done) => {
    axios.post(`${SERVER_URL}/user`, USER_DATA)
    .then((response) => {
      let userId = response.data.userId;
      axios.get(`${SERVER_URL}/user/${userId}`)
      .then((response) => {
        let id = response.data.user.id
        axios.delete(`${SERVER_URL}/user/${id}`)
        .then((response) => {
          expect(response.status).toBe(202);
          expect(response.data).toEqual({"message": "Deleted"})
          done();
        });
      });
    })
    .catch((error) => {
      done(error);
    });
  });
  
  it("Should return a message and status code about newly created user was deleted by specified ID", (done) => {
    axios.post(`${SERVER_URL}/user`, USER_DATA)
    .then((response) => {
      const userId = response.data.userId;
      axios.delete(`${SERVER_URL}/user/${userId}`)
        .then((response) => {
          expect(response.status).toBe(202);
          expect(response.data).toEqual({"message": "Deleted"})
          done();
        });
    })
    .catch((error) => {
      done(error);
    });
  })
});
