

const validateMiddleware = (validatorFn) => {
    return (req, res, next) => {
        const { error, value } = validatorFn(req.body);

        if (error) {
            return res.status(400).send("Validation failed: " + error.details[0].message);
        }

        req.body = value; 
        next();
    };
};

module.exports = { validateMiddleware };