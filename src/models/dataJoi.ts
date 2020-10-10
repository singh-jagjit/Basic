import Joi from '@hapi/joi';

const dataSchemaValidate = Joi.object({
    data: Joi.string().min(2).max(5).required()
});

export default dataSchemaValidate;