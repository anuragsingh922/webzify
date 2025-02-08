const themeModel = require("../models/theme.model");

const getTheme = async (req, res) => {
    try {
        const { websiteType, designTone, status } = req.body;

        const query = {};
        if (websiteType) query.websiteType = websiteType;
        if (designTone) query.designTone = designTone;
        // if (status) query.status = status;
        query.status = "Approved";

        const themes = await themeModel.find(query).sort({ updatedAt: -1 });
        return res.status(200).json(themes);
    } catch (error) {
        console.error("Error in fetching theme : ", error);
        return res.status(500).json({ error: 'Failed to fetch themes' });
    }
}

const postTheme = async (req, res) => {
    try {
        const { imageUrl, websiteType, designTone, status } = req.body;
        const newTheme = new themeModel({
            imageUrl, websiteType, designTone, status
        })
        const newSavedTheme = await newTheme.save();
        return res.status(200).json(newSavedTheme);
    } catch (error) {
        console.error("Error in posting new theme : ", error);
        return res.status(500).json("Error in posting new theme");
    }
}


const updateTheme = async (req, res) => {
    try {
        const { themeId, imageUrl, websiteType, designTone, status } = req.body;
        const toUpdateData = {
            imageUrl, websiteType, designTone, status
        }
        const updatedTheme = await themeModel.findOneAndUpdate({ _id: themeId.toString() }, { $set: toUpdateData }, { new: true });
        return res.status(200).json(updatedTheme);
    } catch (error) {
        console.error("Error in updating theme : ", error);
    }
}

const deleteTheme = async (req, res) => {
    try {
        const { themeId } = req.query;
        const deletedTheme = await themeModel.findOneAndDelete({ _id: themeId.toString() });
        return res.status(201).json(deletedTheme);
    } catch (error) {
        console.error("Error in deleting theme : ", error);
        return res.status(500).json("Error in deleting the theme");
    }
}

module.exports = { getTheme, deleteTheme, postTheme, updateTheme }