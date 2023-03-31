module.exports = {
  chains: ['eos', 'kylin', 'wax', 'jungle', 'telosTest', 'waxTest'],
  endpoints: {
    eos: ['https://eos.eosn.io','https://eos.api.animus.is',  'https://eos.dfuse.eosnation.io/'],
    kylin: ['https://kylin.eosn.io', 'https://kylin.eossweden.org'],
    jungle: ['https://jungle3.cryptolions.io', 'https://jungle3.greymass.com'],
    telosTest: ['https://testnet.telos.caleos.io'],
    waxTest: ['https://testnet.waxsweden.org'],
    wax: ['https://wax.greymass.com']
  },
  accountName: {
    wax: "tlmsplitting",
  },
  explorer: {
    waxTest: "https://wax-test.bloks.io",
    telosTest: "https://explorer-test.telos.net",
    wax: "https://wax.bloks.io"
  },
  contractName:"contract"
}
