var webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BE81SCErz1bZr2TSsIZwkty9_q3MzujdXJjIOvowKuYM4Dc4TOX0i2_A1BoBgUszARgGNQ7CN0all0vPpuo-8Nk",
    "privateKey":"d8VrJItzF05YjAatUFA02MpXnpxQqi94C99ZOSdV1GI"
};

webpush.setGCMAPIKey('AAAAdokS484:APA91bHuteNpq7j19uSzIR3qoKJRiojXtc59wWSbIDEsdZ-xcaiKR5nGqlcllZNQZAkyvj9n-uXVsbMi72eovWYebnUUzHzmmCcLMAJGSxdkp6-BAiZNN6Y2seV7v1TKqDrROhgYTEf2')
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint" : "https://fcm.googleapis.com/fcm/send/fmdCC4NToPQ:APA91bGYLuyqWJ3brCn5Fr3aMu4-b0iFooEjs-8eV3DeagFIym9IOuY5e_QhaYXEPm9eRHzM6JkPize5fAZIIebhkAC7v2uju6mwWI4iXuPgT8f0CC63k7qFMKWEEeIZ-Ckul45KDXNA",
    "keys" : {
        "auth" : "jiZLBBxTBfwUjIKGs8B00g==",
        "p256dh" : "BOsyMHu0907czGBFSWwizHffpB9qnjoRUg/YO94Pmm5nyYJEDHAM2K4tYrfWzuW2e4kt+L2X8npivV9Hnb2Zk28="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '509105857486',
    TTL: 60
};
webpush.sendNotification(pushSubscription, 
    payload,
    options
    );