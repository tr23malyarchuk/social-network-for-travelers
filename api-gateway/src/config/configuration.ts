export default () => ({
  userService: {
    host: process.env.USER_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.USER_SERVICE_PORT || '3001', 10),
  },
});
