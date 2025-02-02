import { User } from "../models/userModel.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {
     
    //get user details from frontend
    //validation - not empty
    //check if user already exist or not - email, username
    //check for images , check for avatar
    //upload them in to cloudinary, avatar
    //create user object - cretae entry in db
    //remove refresh token and password from response
    //check for user creation
    //return response

    const {username, email, password, fullName} = req.body
    console.log("Email : ", email)


    //validation
    if (
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check user availabitity
    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409,"User with email or username already exist")
    }


    //check for images , check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file ir required")
    }

    //upload them in to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file ir required")
    }

    //create user object
    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



})

export {registerUser}