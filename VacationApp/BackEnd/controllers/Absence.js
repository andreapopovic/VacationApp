import Absence from "../models/AbsenceModel.js";

export const getAllAbsences = async (req, res) => {
    try {
        const absence = await Absence.findAll();

        res.json(absence);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAbsenceById = async (req, res) => {
    try {
        const absence = await Absence.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(absence[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createAbsence = async (req, res) => {
    try {
        await Absence.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAbsence = async (req, res) => {
    try {
        await Absence.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAbsence = async (req, res) => {
    try {
        await Absence.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}