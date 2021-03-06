const { check} = require('express-validator');
module.exports=[
    check('fname').matches(/^[a-zA-Z ]{2,30}$/),
    check('lname').matches(/^[a-zA-Z ]{2,30}$/),
    check('uname').matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/),
    check('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }),
]