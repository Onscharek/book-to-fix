const{check, validationResul} =require("express-validator")

exports.registerValidation=()=>[
    check("name","Name is required").not().isEmpty(),
    check("email","Email is required").isEmail(),
    check("password","Password is not valid").isLength({min:6})
];

exports.loginValidation=()=>[
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min:6})
]
exports.validation=(req,res,next)=>{
    const errors = validationResul(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
}

next();
}
