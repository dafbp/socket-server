/**
 * All Scheme
 * 
 */

const Joi = require('joi')

const abi = Joi.array()
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: method] is required as string',
        })
    );
    
const auth = Joi.array()
    .length(2)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: username] is required as string',
        }),
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: password] is required as string',
        }),
    );
const auth_login = Joi.array()
    .length(2)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: username] is required as string',
        }),
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: password] is required as string',
        }),
    );
const auth_register = Joi.array()
    .length(3)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: name] is required as string',
        }),
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: username] is required as string',
        }),
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: password] is required as string',
        }),
    );
const cmc_crypto_info = Joi.array()
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: symbol_id] is required as string',
        }),
    );
const cmc_crypto_category = Joi.array()
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: id_category] is required as string',
        }),
    );
const cmc_crypto_categories = Joi.array()
    .length(0)
    .required()



export default {
    abi,
    auth,
    auth_login,
    auth_register,
    cmc_crypto_info,
    cmc_crypto_category,
    cmc_crypto_categories,
}