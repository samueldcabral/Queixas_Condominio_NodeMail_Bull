// export default {
  
// };

const UserReport = {
  key: 'UserReport',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { user } = data;

    console.log(user);
  },
}

module.exports = UserReport;