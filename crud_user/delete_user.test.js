const axios = require('axios');
const { SERVER_URL } = require('../credentials.js')
const USER_DATA = require('./test_data')


describe("Delete a newly created user", () => {
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
                expect(response.data).toEqual({ "message": "Deleted" })
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
            expect(response.data).toEqual({ "message": "Deleted" })
            done();
          });
      })
      .catch((error) => {
        done(error);
      });
  })
})
