"use strict";
var http = require('http');
var fs = require('fs');
class record {
    constructor(email, longitiude, lattitiude,oauth) {
        this.profile = {
            "name": "on",
            "surname": "on",
            "email": email,
            "oauth": oauth
        }
        this.description = {
            "about": "Would not employ myself as a korepetytor",
            "subjects": [{
                "name": "polish",
                "primaryPrice": 10,
                "secondaryPrice": 60,
                "highschoolPrice": 100,
                "uniPrice": 10
            }, {
                "name": "maths",
                "secondaryPrice": 60,
                "highschoolPrice": 100,
                "uniPrice": 10
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
            "value": 8,
            "review": "mike"
        }];
    }

}

function genRndRec(maxLong, minLong, maxLatt, minLatt) {
    let long = Math.random() * (maxLong - minLong) + minLong;
    let latt = Math.random() * (maxLatt - minLatt) + minLatt;
    let mail = "";
    for (let i = 0; i <6; i++) {
        let rand = Math.random() * 25 + 97;
        mail += String.fromCharCode(rand);
    }
    let oauth = Math.floor(Math.random()*1000000000000000);
    //console.log(oauth);
    mail += "@korko.cf";
    return new record(mail, long, latt,oauth.toString());
}

function main() {
    let maxLong = process.argv.length > 3 ? process.argv[3] : 21.26;
    let minLong = process.argv.length > 4 ? process.argv[4] : 20.26;
    let maxLatt = process.argv.length > 5 ? process.argv[5] : 52.38;
    let minLatt = process.argv.length > 6 ? process.argv[6] : 52.09;
    for (let i = 0; i < 30; i++) {
        console.log(maxLong,minLong,maxLatt,minLatt);
        var record1 = genRndRec(maxLong, minLong, maxLatt, minLatt);
        var options = {
            hostname: 'localhost',
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
/*console.log(record1);
fs.writeFile("./test.json", JSON.stringify(record1), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); */
