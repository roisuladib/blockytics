const network = process.env.NETWORK || 'eth';

const envs = '';

const jsContent = `window.__envs = ${JSON.stringify(combinedEnvs, null, 2)};`;
