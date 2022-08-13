
import Joi from 'joi'

export const methodModelRequest = Joi.object({
    method: Joi.string().required(),
    id: Joi.number().required(),
    params: Joi.array().required(),
})

export const subModelRequest = Joi.object({
    method: Joi.valid('sub', 'unsub').required(),
    id: Joi.number().required(),
    exchange: Joi.array(),
    trade_filter: Joi.array(),
    value: Joi.array(),
    topic: Joi.array(),
    symbol_ids: Joi.array().required().items(Joi.string().required()),
})