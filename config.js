require('dotenv').config();

function mapPresence(val) {
    const mapping = {
        typing: 'composing',
        online: 'available',
        recording: 'recording',
        paused: 'paused',
        offline: 'unavailable'
    };
    return mapping[val?.toLowerCase()?.trim()] || 'paused';
}

module.exports = {
    prefixes: process.env.PREFIX
        ? process.env.PREFIX.split(',').map(p => p.trim())
        : [''],

    NUMBER: process.env.YOUR_NUMBER || '255657065205',
    MODE: (process.env.MODE || 'private').toLowerCase().trim(),
    WARN_LIMIT: process.env.WARNINGS || '3',
    ON: process.env.YOUR_NAME || 'FLASH-MD',
    ANTICALL: process.env.ANTICALL || 'off',
    ADM: process.env.ANTIDELETE || 'on',
    AR: process.env.AUTO_REACTION || 'off',

    AUTO_VIEW_STATUS: process.env.AUTO_READ_STATUS === 'on',
    AUTO_LIKE: process.env.AUTO_LIKE === 'on',
    AUTO_READ_MESSAGES: process.env.AUTO_READ_DM === 'on',
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    sessionBase64: process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVaeHlxalE1ZWtyZGZlRmxKbk1FTlV5RFY4OEV3ZTRCZ3JqM1lQREdIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSW5LZ0JGK0czQ2FleTZoeTI5eFRraFIxVGpENU5zQ1JmdXZRMjJVbndtWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSUZ2cklDQmFxTXdTUlpTZi95S3lXWUlneWpjR0ZrSkRaOVZWckhlNG1BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMYTZWQTk4WUdid1MrbXZLZ2ljOGJUYWFQSUNSUHVXSHBBYTk5K2tZSkZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1HeGxGc3dHZnVDdWtsYnRlTXVqYS9FTEt6VmpWakxHczJIK2orWmk1VVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFxMzRHQUxwcWFoK3VtNnRqcmxiVmdPTnBQS0I2NEZ1TVRJRTFvTmZwME09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1BXa1ZvdUhRWE1hQ0VrVFpacURkTk5yQXJHbmYrcFFZV0hWTjlUbTIzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVENrNjA0a0RpSXJucGRmSlo0ZktqL21samJPd2wwaGM1Vk9TYWVRSnlScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik0zNEFiaU5uV0VKYmNnYWR0VGM4ekQrN0xBNDI4VG9nYmRyNUZhbDJVVkdPaGY0VXVnK2lTNWRmeC9WTmY0N2UxcUhqNVV4bXhMS2ZhSGdDY0pQeWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJkKzdscncyRlNiZ3B4OXl3Sk1KZ1Rwd1gyYS9EekZQaEtQMnNpSTdYWmR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJZUjVaSDU0OSIsIm1lIjp7ImlkIjoiMjU1NjU3MDY1MjA1OjU1QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjY3MTQyODU1NDE3OTgyOjU1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUM2OU5NR0VJV04vY1FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSnVqdFFjcDJ2UVlNTlVLNDZjdGxzUkFyNTRCYlBvd1ZYMjJBQnFWTi93RT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVldEaW5lRGtmTE9rWXdleGRnRWpFeE9oZGRDVkN5QlY3ZnZ6TEx1UTVjQmVpUEpRQVlFLzExL0VUdXI4elNuaG81bks1eDdNTGVvZFAyazRic3pPaXc9PSIsImRldmljZVNpZ25hdHVyZSI6ImNuTmIxdzVraU1KQ1Z3WldLaHJJMjVFeEJKZnphenB2c1JzejlVT2lWakRmWFNPZkY3c0s3REE1UytHKzYvVXFSVFdMcmxicUk1T29CYnpST1N3SWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjU3MDY1MjA1OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNibzdVSEtkcjBHRERWQ3VPbkxaYkVRSytlQVd6Nk1GVjl0Z0FhbFRmOEIifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU1MjY4NzU0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==',
    timezone: 'Africa/Nairobi',

    USER_LID: process.env.YOUR_LID,267142855417982 

    PRESENCE_DM: mapPresence(process.env.PRESENCE_DM || 'typing'),
    PRESENCE_GROUP: mapPresence(process.env.PRESENCE_GROUP || 'recording'),

    mapPresence
};
