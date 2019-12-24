const Joi =require('@hapi/joi');


//Register Validation
const registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().min(4).required().max(255),
        email : Joi.string().min(8).required().max(255).email(),
        password:Joi.string().min(6).required(),
        age: Joi.number().integer().min(18).max(100).required(),
        sexe: Joi.string().required()
    })
     // DATA VALIDATION FIRST
     return schema.validate(data);
     //if(error) return res.status(400).send(error.details[0].message);

};

const loginValidation = (data)=>{
    const schema = Joi.object({
        email : Joi.string().min(8).required().max(255).email(),
        password:Joi.string().min(6).required(),
    })
     // DATA VALIDATION FIRST
     return schema.validate(data);
     //if(error) return res.status(400).send(error.details[0].message);

};

const editValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().min(8).required().max(255).email(),
        name: Joi.string().min(4).required().max(255),
        age: Joi.number().integer().min(18).max(100).required()

    })
    return schema.validate(data);
}

const voteValidation = (score) => {
    const schema = Joi.object({
        Score : Joi.number().required(),
        userId : Joi.string().required()
    })
    return schema.validate(score)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editValidation = editValidation;
module.exports.voteValidation = voteValidation;
