import Request from "../models/RequestModel.js";

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll();

      res.json(requests)

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRequestById = async (req, res) => {
    try {
        const request = await Request.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(request[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}
export const getRequestByEmployeeId = async (req, res) => {
    try {


        const request = await Request.findAll({
            where: {
                idUser: req.params.id
            }
        });
        res.json(request[0]);

    } catch (error) {
        res.json({ message: error.message });
    }

}

export const createRequest = async (req, res) => {
    try {
        await Request.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateRequest = async (req, res) => {
    try {
        await Request.update(req.body, {
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

export const deleteRequest = async (req, res) => {
    try {
        await Request.destroy({
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