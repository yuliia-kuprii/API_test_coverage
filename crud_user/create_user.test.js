const axios = require('axios');
const { SERVER_URL } = require('../credentials.js')
const USER_DATA = require('./test_data')

describe("Create a new user", () => {
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
});
