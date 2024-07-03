const jwt= require ("jsonwebtoken");
const ApiError= require("../utils/apiError")
const asyncHandler= require("../utils/asyncHandler");

const User= require("../model/auth")

  const verifyJWT = asyncHandler(async(req, _, next)=> {
    try {
        const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
        if(!accessToken) throw new ApiError(401, "Unauthorized request");

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password");
        if(!user) throw new ApiError(401, "Invalid access token");

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(error?.statusCode || 401, error?.message || "Invalid access token");
    }
})
module.exports=verifyJWT;