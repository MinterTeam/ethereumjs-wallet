import {isBuffer} from 'buffer-es6';
import {Buffer as safeBuffer} from 'safe-buffer';


// Convert Buffer implementation of bundled `buffer-es6` to `safe-buffer` implementation used in tests and `safe-buffer` used in rollup's browserify
// It requires to satisfy jest's `.toEqual()` deep equality check

const originalExpect = global.expect;

global.expect = (value) => {
    if (isBuffer(value)) {
        value = safeBuffer.from(value);
    }
    return originalExpect(value);
};
