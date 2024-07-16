import Cache from 'node-cache';

const cache = new Cache({
    stdTTL: 3600
});

export default cache;