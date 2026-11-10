const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Profile = require("../models/profile.model");
const Link = require("../models/link.models");

const createLink = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    const { platform, url } = req.body;

    if (!platform || !url) {
        throw new ApiError(400, "Platform and URL are required");
    }

    const link = await Link.create({
        profileId: profile._id,
        platform,
        url
    });

    res.status(201).json(
        new ApiResponse(
            201,
            link,
            "Link created successfully"
        )
    );
});

const getLinks = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    const links = await Link.find({ profileId: profile._id });

    res.status(200).json(
        new ApiResponse(
            200,
            links,
            "Links fetched successfully"
        )
    );
});
const updateLink = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });
    const { linkId } = req.params;
    const { platform, url } = req.body; 

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }
    const link = await Link.findOne({ _id: linkId, profileId: profile._id });
    if (!link) {
        throw new ApiError(404, "Link not found");
    }
    if (platform !== undefined) {
        link.platform = platform;
    }
    if (url !== undefined) {
        link.url = url;
    }
    if (platform === undefined && url === undefined) {
    throw new ApiError(400, "No fields to update");
}
    await link.save();
    res.status(200).json(
        new ApiResponse(
            200,
            link,
            "Link updated successfully"
        )
    );

});
const deleteLink = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });
    const { linkId } = req.params;

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }
    const links = await Link.findOne({ _id: linkId, profileId: profile._id });
    if (!links) {
        throw new ApiError(404, "Link not found");
    }
    await links.deleteOne();
    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Link deleted successfully"
        )
    );
});
module.exports = {
    createLink,
    getLinks,
    updateLink,
    deleteLink
};