import assert from 'assert';
import * as bip39 from 'bip39';
import { isValidPrivate } from 'ethereumjs-util';
import Wallet, {
    seedFromMnemonic, hdKeyFromSeed, walletFromPrivateKey, walletFromMnemonic, generateWallet, isValidMnemonic,
} from '~/src';

const MNEMONIC = 'exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone';
const PRIVATE_KEY = '0x5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da';
const fixturewallet = walletFromMnemonic(MNEMONIC);

describe('seedFromMnemonic()', () => {
    const seedBuffer = seedFromMnemonic(MNEMONIC);
    it('should have correct length', () => {
        assert.strictEqual(seedBuffer.length, 64);
    });
    it('should have correct value', () => {
        assert.strictEqual(seedBuffer.toString('hex'), '4ca64bd07f7765099f856e554504900953f59bd874009b4905fca674158ea0563bd7c35b79bff3feb3b33fcbdcdb771b93338ea4f29fcb9cfbb2f570093878c1');
    });
});

describe('hd key from mnemonic', () => {
    it('should work', () => {
        const seed = seedFromMnemonic(MNEMONIC);
        const hdKey = hdKeyFromSeed(seed);
        const privateKey = hdKey._privateKey.toString('hex');
        assert.strictEqual(privateKey.length, 64);
        assert.strictEqual(`0x${privateKey}`, PRIVATE_KEY);
    });
});

describe('.getPrivateKey()', () => {
    it('should work', () => {
        assert.strictEqual(`0x${fixturewallet.getPrivateKey().toString('hex')}`, PRIVATE_KEY);
    });
});

describe('.getPrivateKeyString()', () => {
    it('should work', () => {
        assert.strictEqual(fixturewallet.getPrivateKeyString(), PRIVATE_KEY);
    });
});

describe('.getPublicKey()', () => {
    it('should work', () => {
        assert.strictEqual(fixturewallet.getPublicKey().toString('hex'), 'f9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3cb8a015b8031d02e79456aedb361fa20ec1a119d6009e5c08e9d1eeb5b29ad92');
    });
});

describe('.getPublicKeyString()', () => {
    it('should work', () => {
        assert.strictEqual(fixturewallet.getPublicKeyString(), 'Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3');
    });
});

describe('.getAddress()', () => {
    it('should work', () => {
        assert.strictEqual(fixturewallet.getAddress().toString('hex'), '7633980c000139dd3bd24a3f54e06474fa941e16');
    });
});

describe('.getAddressString()', () => {
    it('should work', () => {
        assert.strictEqual(fixturewallet.getAddressString(), 'Mx7633980c000139dd3bd24a3f54e06474fa941e16');
    });
});

describe('generate random wallet', () => {
    const wallet = generateWallet();
    it('should have valid mnemonic', () => {
        assert.ok(bip39.validateMnemonic(wallet.getMnemonic()));
    });
    it('should have valid private key', () => {
        assert.ok(isValidPrivate(wallet.getPrivateKey()));
    });
});

describe('private key only wallet', () => {
    const privKey = Buffer.from(PRIVATE_KEY.substr(2), 'hex');
    const wallet = walletFromPrivateKey(privKey);
    it('walletFromPrivateKey() should work', () => {
        assert.strictEqual(wallet.getPublicKey().toString('hex'),
            'f9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3cb8a015b8031d02e79456aedb361fa20ec1a119d6009e5c08e9d1eeb5b29ad92');
    });
    it('walletFromPrivateKey() should not accept invalid key', () => {
        assert.throws(() => {
            walletFromPrivateKey(Buffer.from('001122', 'hex'));
        });
    });
    it('.getAddress() should work', () => {
        assert.strictEqual(wallet.getAddress().toString('hex'), '7633980c000139dd3bd24a3f54e06474fa941e16');
    });
    it('.getMnemonic() should fail', () => {
        assert.throws(() => {
            wallet.getMnemonic();
        }, /^Error: This is a private key only wallet$/);
    });
});

describe('Wallet', () => {
    it('constructor should throw with 2 arguments', () => {
        assert.throws(() => {
            const privKey = Buffer.from(PRIVATE_KEY, 'hex');
            return new Wallet(privKey, MNEMONIC);
        });
    });
});

describe('walletFromMnemonic()', () => {
    it('should throw on invalid mnemonic', () => {
        assert.throws(() => {
            walletFromMnemonic('a b c d e f g h i j k l');
        });
    });
});

describe('isValidMnemonic()', () => {
    it('should work on valid 15 words mnemonic', () => {
        assert.strictEqual(isValidMnemonic(MNEMONIC), true);
    });
    it('should work on valid 15 words mnemonic', () => {
        assert.strictEqual(isValidMnemonic(bip39.generateMnemonic(160)), true);
    });
    it('should work on valid 12 words mnemonic', () => {
        assert.strictEqual(isValidMnemonic(bip39.generateMnemonic()), true);
    });
    it('should fail on invalid 12 words mnemonic', () => {
        assert.strictEqual(isValidMnemonic('a b c d e f g h i j k l'), false);
    });
});
