module.exports = {
  VTC: {
		type: 'BTC',
		messagePrefix: '\x19Vertcoin Signed Message:\n',
		bech32: 'vtc',
		bip32: {
			public: 0x0488b212,
			private: 0x0488ade4, 
    },
    bip49: {
      public: 0x049d7cb2,
      private: 0x049d7878
    },
		bip84: {
			public: 0x04b24746,
			private: 0x04b2430c
		},
		pubKeyHash: 0x47,
		scriptHash: 0x05,
		wif: 0x80,
		testnet: false
	}
}