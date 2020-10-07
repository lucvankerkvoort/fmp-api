module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        client: "mongo",
        uri: `${process.env.DATABASE_URI}`,
      },
      options: {
        ssl: true,
      },
    },
  },
});
