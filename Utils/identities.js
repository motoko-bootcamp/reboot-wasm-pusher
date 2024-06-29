//identity.ts
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import HdKey from 'hdkey';
import Bip39 from 'bip39';

const identityFromSeed = async function (phrase) {
  const seed = await Bip39.mnemonicToSeed(phrase);
  const root = HdKey.fromMasterSeed(seed);
  const addrnode = root.derive("m/44'/223'/0'/0/0");

  return Secp256k1KeyIdentity.fromSecretKey(addrnode.privateKey);
};

const newMnemonic = async function() {
  return Bip39.generateMnemonic();
};

export {
  identityFromSeed,
  newMnemonic
};