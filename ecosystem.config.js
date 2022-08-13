/**
 * 
 */


module.exports = {
    apps: [
        {
            name: 'main-server',
            script: 'yarn start:pro',
            time: true, // <----------------------- This is the key to make it work
            watch: false,
            env: {
                PORT: 2022,
                NODE_ENV: 'production',
            },
        },
    ],
};
