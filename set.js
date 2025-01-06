const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0JONjRKZ1lseU1SaXhzZ0lWWTExaDJDWC8rb1FoZEdKUTk3dEprN1dYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlp6aVlCcEg1UXZwZGVXVlI1TGcyTDkzWGtWTkVDdkx3UlhVSlA1dEpUYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRG44OWVyR2N0WEErTEdQdkNPd0cvbXlpZ3ErdDNLOExlaTlTVCtHSVVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNLzIvSVNGU1F4bkN3OHI1RkVuL3dVZkZPci9PWG1KVUNjTUdScHJXRms0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJNdERzNjNVeUVtR0taR3hlN25GR2I5S256cDFDZGIvNlMwUVhPeFhmMUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1rSWZtME9WU3ltaml3c0ViTlFOVGJ0OTVqSm13Ri9sd2tmV1FwMVdRek09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0hyeUltUXVVRXdYMWhDb1BGOTNiS1ZBQWtaN2E3Q0Raem1sUnMrNEhubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTy9EeEljWWlvZGNaS1kwNEZqQlBYaHk3VzBTNWFUcTkrQ3NMKzZnZlkzMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9STGxsSmFoaXE2dGR1ZHhSWlEyUkRsVzRqYzZBdEJHNXNxTm50bk0yYTdZdkJYSTdmOE9POGR3dEJvRlZkbDNzOG9GdDhhbVZxN2wvb0wzTE96b0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6InhCZy9yam5CMEJxMk53UFp3cW9tdEVJb3hLTEZGZitzZUI2RmtFWHFTUmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ii1nYmNQTjRxU2tHQmZQcUVOcFF6aGciLCJwaG9uZUlkIjoiMTZjM2I5MGYtMTBmZS00ZGEzLTgxM2QtZDkyNzgzYjgzYjU5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhOK2dlWE13dkxFa2dUWldTbk9lZE1IUzRXdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhZm84akVhOFYrN2sxZGJ5K0ZlOWhGUEs0NDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVZMN0RRTEgiLCJtZSI6eyJpZCI6IjI2Mzc4MDE1NzUwMDoxNkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTi9VckljR0VJeTQ3N3NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib2dEaVNRT3RORUJtT2t6d01sWCthNW95UmR6Skt5dEpCR1duMVhwUVBFWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWEpaTVpsZkxWMlZzQURCcEFjSnV6bGlQOURGd292MGpxa2ZSL01tZDl5OGdmS3grRXFaNVo3c3B5bzExWVNtN3JZSWhtNEovaENXNmZGNEtTWEtXQWc9PSIsImRldmljZVNpZ25hdHVyZSI6Ijg2T1ErR2I2YWpMOEliUkIvUmtadndwcGhkS1hzNXA1VU8xQld2TVJ1OHUrYUorS0JtbE1mMkNhTFExRStzd0F0QXl1TGsyS200VXRxRkxhcjQ1a0NnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgwMTU3NTAwOjE2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFJQTRra0RyVFJBWmpwTThESlYvbXVhTWtYY3lTc3JTUVJscDlWNlVEeEcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYxNzA1MjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTjAxIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
