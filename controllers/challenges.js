import Challenge from "../models/challenge.js";

export const createChallenge = async (req, res) => {
    try {
        let challenge = {
            user: req.user._id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            description: req.body.description,
            title: req.body.title,
            instructions: req.body.instructions,
            status: req.body.status
        };
        challenge = await Challenge.create(challenge);
        res.status(201).json({data: challenge, message: `Challenge created successfully`});
    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}

export const getChallenge = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}

export const getChallenges = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}

export const updateChallenge = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}

export const deleteChallenge = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}