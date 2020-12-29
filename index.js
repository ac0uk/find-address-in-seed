const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const bip32 = require('bip32');
const bs58check = require('bs58check');

const networks = require('./networks')

let seed = bip39.mnemonicToSeedSync('panther receive energy shuffle shrug hood wrong reduce reject click frequent clump limit suggest energy')
let root = bip32.fromSeed(seed);

let pub;
let priv;
let prv;
let next;
let address;
let xpub;
let xprv;

let ppp;

let paths = [`m/84'/28'`, `m/84'/128'`, `m/44'/28'`, `m/44'/128'`, `m/49'/28'`, `m/49'/128'`];

let search = "vtc1quftjdhg8r4a0ke9uj726s293h3exv8e0yxxqup";
let found = false;
let foundPath = false;

paths.forEach( (path) => {
  for( a = 0; a < 5; a++ ) {
    priv = root.derivePath(`${path}/${a}'`);
    xprv = priv.toBase58();
    pub = priv.neutered();
    xpub = pub.toBase58();

    console.log(xprv);
    console.log(xpub);

    for( x = 0; x < 2; x++ ) {
      for( i = 0; i < 25; i++ ) {
        next = pub.derivePath(`${x}/${i}`);
        address = bitcoin.payments.p2wpkh({ pubkey: next.publicKey, network: networks.VTC });

        const newone = bitcoin.payments.p2sh({
          redeem: bitcoin.payments.p2wpkh({ pubkey: next.publicKey }),
        });

        ppp = `${path}/${a}'/${x}/${i}`; 

        // Get private key...
        privkey = root.derivePath(ppp).privateKey;

        console.log(ppp, address.address, newone.address, privkey.toString('hex'))

        if( address.address == search || newone.address == search ) {
          found = true;
          foundPath = ppp;          
        }
      }
    }
  }
});

console.log('found', found, 'foundPath', foundPath)