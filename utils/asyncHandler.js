const asyncHandler = (fn) => {
    // yahan socho:
    // async function ko receive karna hai
    // usko execute karna hai
    // error aaye toh next(error)
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;