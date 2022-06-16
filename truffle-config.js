module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    dashboard: {}
  },

  environments: {
    infura: {
      ipfs: {
        address: "https://ipfs.infura.io:5001"
      }
    }
  },

  compilers: {
    solc: {
      version: "0.8.13",
    }
  },

  db: {
    enabled: false,
  },

  plugins: [
    "@truffle/preserve-fs",
    "@truffle/preserve-to-ipfs"
  ]
};
