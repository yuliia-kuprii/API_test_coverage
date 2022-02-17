const axios = require('axios');
const { SERVER_URL } = require('../credentials.js')
const USER_DATA = require('./test_data')

describe("Get a new user", () => {
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
})
