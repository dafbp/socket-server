/**
 * All Scheme
 *
 */
var Joi = require('joi');
var abi = Joi.array()
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: method] is required as string',
        })
    );
console.log(abi.validate(['']));
