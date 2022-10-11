import joi from 'joi';
const urlPattern = new RegExp(
  '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
);

const urlSchema = joi.object({
  url: joi.string().regex(urlPattern).required().messages({
    'string.base': `"url" should be of type 'string'`,
    'string.empty': `"url" cannot be an empty field`,
    'any.required': `"url" is a required field`,
    'any.regex': `"url" must be an URL`,
  }),
});

export default urlSchema;
