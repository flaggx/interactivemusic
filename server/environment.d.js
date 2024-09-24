/**
 * @typedef {Object} ProcessEnv
 * @property {string} NEO4J_URI
 * @property {string} NEO4J_USER
 * @property {string} NEO4J_PASSWORD
 * @property {string} JWKS_ENDPOINT
 */

/**
 * @type {ProcessEnv}
 */
const processEnv = {
    NEO4J_URI: process.env.NEO4J_URI,
    NEO4J_USER: process.env.NEO4J_USER,
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
    JWKS_ENDPOINT: process.env.JWKS_ENDPOINT,
};

export default processEnv;