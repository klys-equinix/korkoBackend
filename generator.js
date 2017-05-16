"use strict";
var http = require('http');
var fs = require('fs');
class record {
    constructor(email, longitiude, lattitiude, oauth, commentID, review, subject1Name, subject2Name) {
        this.profile = {
            "name": "on",
            "surname": "on",
            "email": email,
            "oauth": oauth
        }
        this.description = {
            "about": "Would not employ myself as a korepetytor",
            "subjects": [{
                "name": subject1Name,
                "primaryPrice": Math.floor(Math.random() * 100),
                "secondaryPrice": Math.floor(Math.random() * 100),
                "highschoolPrice": Math.floor(Math.random() * 100),
                "uniPrice": Math.floor(Math.random() * 100)
            }, {
                "name": subject2Name,
                "secondaryPrice": Math.floor(Math.random() * 100),
                "highschoolPrice": Math.floor(Math.random() * 100),
                "uniPrice": Math.floor(Math.random() * 100)
            }]
        };
        this.loc = {
            "geometry": {
                "type": "Point",
                "coordinates": [longitiude, lattitiude]
            },
            "properties": {
                "name": "Warsaw"
            }

        };
        this.rating = [{
            "value": Math.floor(Math.random() * 10),
            "review": review,
            "oauth": commentID
        }];
    }

}
let counter = 0;

function genRndRec(maxLong, minLong, maxLatt, minLatt) {
    let oauthOptions = [100000761914830, 100000699550503, 100000595503427, 100008099464806];
    let subjectOptions = ["maths", "polish", "history", "english", "biology", "chemistry", "geography", "wos", "physics"]
    let long = Math.random() * (maxLong - minLong) + minLong;
    let latt = Math.random() * (maxLatt - minLatt) + minLatt;
    let mail = "";
    for (let i = 0; i < 6; i++) {
        let rand = Math.random() * 25 + 97;
        mail += String.fromCharCode(rand);
    }
    let oauth = oauthOptions[Math.floor(Math.random() * oauthOptions.length)] + counter;
    let commentID = oauthOptions[Math.floor(Math.random() * oauthOptions.length)] + counter;
    let review = "";
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
            let rand = Math.random() * 25 + 97;
            review += String.fromCharCode(rand);
        }
        review += " ";
    }
    let subject1 = Math.floor(Math.random() * subjectOptions.length);
    let subject2 = 0;
    if (subject1 == 0) {
        subject2++;
    } else {
        subject2 = subject1 - 1;
    }
    counter++;
    mail += "@korko.cf";
    return new record(mail, long, latt, oauth.toString(), commentID.toString(), review, subjectOptions[subject1], subjectOptions[subject2]);
}

function main() {
    let maxLong = process.argv.length > 3 ? process.argv[3] : 21.26;
    let minLong = process.argv.length > 4 ? process.argv[4] : 20.26;
    let maxLatt = process.argv.length > 5 ? process.argv[5] : 52.38;
    let minLatt = process.argv.length > 6 ? process.argv[6] : 52.09;
    for (let i = 0; i < 50; i++) {
        console.log(maxLong, minLong, maxLatt, minLatt);
        var record1 = genRndRec(maxLong, minLong, maxLatt, minLatt);
        var options = {
            hostname: 'korko.cf',
            port: 3000,
            path: '/api/v1/coach/new',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        var req = http.request(options, (res) => {
            var resString = "";
            res.on('data', (data) => {
                resString += data;
            });
            res.on('end', () => {
                console.log(resString);
            })
        });
        req.on('error', function (err) {
            console.log(err);
        });
        req.write(JSON.stringify(record1));
        req.end();
        fs.writeFile("./test.json", JSON.stringify(record1), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        })

    }
}
main();