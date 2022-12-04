const Company = require("../models").Company;

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {

        req.body.adminId = req.user.id

        const companyCreated = await Company.create(req.body)

        if (companyCreated.dataValues.id)
            return res.sendStatus(201)
        else
            return res.status(500).send("An error has occurred.")

    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }

};

exports.findAll = async (req, res) => {

    try {
        const companies = await Company.findAll()
        if (companies)
            return res.status(200).send(companies)
        else
            return res.status(404).send("No company found")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }

};

exports.findAllBasic = async (req, res) => {

    try {

        const companies = await Company.findAll({
            attributes: ['id', 'companyName', 'tradingName']
        })

        if (companies)
            return res.status(200).send(companies)
        else
            return res.status(404).send("No company found")

    } catch (error) {

    }
}

exports.findOne = async (req, res) => {

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {

        const id = req.params.id;
        const company = await Company.findByPk(id)
        if (company)
            return res.status(200).send(company)
        else
            return res.status(404).send("Company not found")

    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {
        const id = req.params.id;
        const updatedCompany = await Company.update(req.body, {
            where: {
                id: id
            }
        })

        if (updatedCompany == 1)
            return res.status(200).send("Company updated successfully.")
        else
            return res.status(500).send("Error while trying to update company.")

    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.delete = async (req, res) => {

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {
        const id = req.params.id;
        const companyDestroyed = await Company.destroy({
            where: {
                id: id
            }
        })

        if (companyDestroyed == 1)
            return res.status(200).send("Company deleted successfully.")
        else
            return res.status(500).send("Error while trying to update company.")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};