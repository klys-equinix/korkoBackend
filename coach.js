var mongoose = require('mongoose');

var coach = {
    profile: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        oauth: {
            type: String,
            required: true
        }
    },
    description: {
        about: {
            type: String,
            maxlength: 250
        },
        subjects: [{
            name: {
                type: String
            },
            primaryPrice: {
                type: Number
            },
            secondaryPrice: {
                type: Number
            },
            highschoolPrice: {
                type: Number
            },
            uniPrice: {
                type: Number
            },
        }]
    },
    loc: {
        
        geometry: {
            type: {
                type: String,
                default: 'Point'
            },
            coordinates: [{
                type: Number
            }]
        },
        properties: {
            name: {
                type:String
            }
        }
    },
    rating: [{
        value: {
            type: Number
        },
        review: {
            type: String,
            maxlength: 250
        }
    }]
}
var coachSchema = new mongoose.Schema(coach);
coachSchema.index({
    'loc.geometry': '2dsphere'
});
coachSchema.virtual('avergeRating').get(function () {
    var sum = 0;
    for (i = 0; i < this.rating.length; i++) {
        sum += this.rating[i].value;
    }
    return sum / this.rating.length;
})
coachSchema.virtual('averagePrice').get(function () {
    
    var i;
    var totalSum=0;
    var test;
    for(i=0;i<this.description.subjects.length;i++){
        var divide=0;
        if(this.description.subjects[i].primaryPrice){
            totalSum+=this.description.subjects[i].primaryPrice;
            divide++;
        }
        if(this.description.subjects[i].secondaryPrice){
            totalSum+=this.description.subjects[i].secondaryPrice;
            divide++;
        }
        if(this.description.subjects[i].highschoolPriced){
            totalSum+=this.description.subjects[i].highschoolpricePrice;
            divide++;
        }
        if(this.description.subjects[i].uniPrice){
            totalSum+=this.description.subjects[i].uniPrice;
            divide++;
        }     
        totalSum= totalSum/divide;
    }
    return totalSum/i;
})
coachSchema.set('toObject', {
    virtuals: true
});
coachSchema.set('toJSON', {
    virtuals: true
});
module.exports = coachSchema;
module.exports.coachSchema = coachSchema;