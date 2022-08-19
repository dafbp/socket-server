/**
 * All Scheme
 * 
 */
import Joi from 'joi'

const abi = Joi.array().label('params')
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: method] is required as string',
        })
    );
    
const auth = Joi.array().label('params')
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
const auth_login = Joi.array().label('params')
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
const authenticate = Joi.array().label('params')
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: token] is required as string',
        }),
    );
const auth_register = Joi.array().label('params')
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
const cmc_crypto_info = Joi.array().label('params')
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: symbol_id] is required as string',
        }),
    );
const cmc_crypto_category = Joi.array().label('params')
    .length(1)
    .required()
    .ordered(
        Joi.string().required().messages({
            'string.empty': '[{{#label}}: id_category] is required as string',
        }),
    );
const cmc_crypto_categories = Joi.array().label('params')
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
    authenticate
}