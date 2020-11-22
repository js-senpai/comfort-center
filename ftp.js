const FtpDeploy = require("ftp-deploy")
const ftpDeploy = new FtpDeploy()
require('dotenv').config()
const config = {
    user: process.env.FTP_NAME,
    // Password optional, prompted if none given
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname+'/dist/',
    remoteRoot: process.env.FTP_DIR,
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: ["node_modules/**", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
}

ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));