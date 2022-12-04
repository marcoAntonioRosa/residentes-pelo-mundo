const Testimony = require("../models").Testimony
const User = require("../models").User;
const Company = require("../models").Company;
const { TESTIMONY_STATUS } = require('../utils/definitions');

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        req.body.studentId = req.user.id
        req.body.adminId = null
        req.body.status = TESTIMONY_STATUS.pending

        const testimonyCreated = await Testimony.create(req.body)

        if (testimonyCreated.dataValues.id)
            return res.sendStatus(201)
        else
            return res.status(500).send("An error has occurred.")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.findAll = async (req, res) => {

    try {
        const rawTestimonies = await Testimony.findAll({
            include: [{
                    model: User,
                    as: 'student',
                    attributes: ['id', 'name']
                },
                {
                    model: Company,
                    as: 'company',
                    attributes: ['id', 'companyName', 'tradingName', 'mapCoordinates']
                }
            ],
            order: [
                ['updatedAt', 'DESC']
            ]
        });

        let companies = []
        let testimonies = []
        let students = []

        let records = rawTestimonies.map(result => result.dataValues)
        records.forEach(element => {

            let newCompany = createCompanyArray(element)
            if (!companies.some(company => company.id === newCompany.id))
                companies.push(newCompany)

            let newTestimony = createTestimonyArray(element)
            if (!testimonies.some(testimony => testimony.id === newTestimony.id))
                testimonies.push(newTestimony)

            let newStudent = createNewStudentArray(element)
            if (!students.some(user => user.id === newStudent.id))
                students.push(newStudent)

        });

        processTestimonies(companies, testimonies, students)

        if (companies)
            return res.status(200).send(companies)
        else
            return res.status(404).send("No testimony found")

    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

createCompanyArray = (element) => {
    let {
        id,
        companyName,
        tradingName,
        mapCoordinates
    } = element.company

    return newCompany = {
        id,
        companyName,
        tradingName,
        mapCoordinates,
        testimonies: []
    }
}

createTestimonyArray = (element) => {
    let {
        id,
        title,
        description,
        status,
        studentId,
        companyId,
        initialDate,
        endDate,
        createdAt,
        updatedAt,
    } = element

    return newTestimony = {
        id,
        title,
        description,
        status,
        studentId,
        companyId,
        initialDate,
        endDate,
        createdAt,
        updatedAt,
        student: {}
    }
}

createNewStudentArray = (element) => {

    let {
        id,
        name
    } = element.student

    return newStudent = {
        id,
        name
    }
}

processTestimonies = (companies, testimonies, students) => {

    testimonies.forEach(testimony => {
        let relatedStudent = students.filter(student => student.id === testimony.studentId)[0]
        testimony.student = relatedStudent
    })

    companies.forEach(company => {
        let relatedTestimonies = testimonies.filter(testimony => testimony.companyId === company.id)
        company.testimonies.push(relatedTestimonies)
    })

}

exports.findOne = async (req, res) => {

    if (req.params) {
        return res.status(400).send({
            message: "Parms cannot be empty!"
        });
    }

    try {
        const id = req.params.id;
        const testimony = await Testimony.findByPk(id)
        if (testimony)
            return res.status(200).send(testimony)
        else
            return res.status(404).send("No testimony found")
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
        req.body.status = TESTIMONY_STATUS.pending

        const id = req.params.id;

        const testimony = await Testimony.findOne({
            where: {
                id: id
            },
            attributes: ['studentId']
        })

        if (!testimony)
            return res.status(404).send("Testimony not found")

        if (req.user.id != testimony.studentId)
            return res.status(401).send("This testimony does not belong to the authenticated user")

        const testimonyUpdate = await Testimony.update(req.body, {
            where: {
                id: id
            }
        })

        if (testimonyUpdate == 1)
            return res.status(200).send("Testimony updated successfully.")
        else
            return res.status(500).send("Error while trying to update testimony.")
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
        const testimony = await Testimony.destroy({
            where: {
                id: id
            }
        })

        if (testimony)
            return res.status(200).send("Testimony deleted successfully")
        else
            return res.status(404).send("No testimony found")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.approve = async (req, res) => {

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
        req.body.adminId = req.user.id
        req.body.status = TESTIMONY_STATUS.approved

        const id = req.params.id;

        const testimonyUpdate = await Testimony.update(req.body, {
            where: {
                id: id
            },
            silent: true
        })

        if (testimonyUpdate == 1)
            return res.status(200).send("Testimony updated successfully.")
        else
            return res.status(500).send("Error while trying to update testimony.")

    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
}