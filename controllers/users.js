import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({data: users, count: users.length, message: `${users.length} users retrieved`});
    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}


export const getUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}


export const deleteUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}


export const updateUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}


export const createUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}