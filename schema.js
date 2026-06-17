const Joi = require("joi");
const reviews = require("./models/reviews");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("", null)
        })
    }).required()
});

module.exports.reviewschema=Joi.object({
    review:Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment:Joi.string().required()
    }).required()

})