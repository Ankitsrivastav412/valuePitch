const personModel = require("../models/model");
const validator = require("../validator/validation")
const jwt = require("jsonwebtoken");

const createPerson = async function (req, res) {
    try {

        let data = req.body;
        let { Name, Email, Password, Age, Address, Avatar, Country } = data;

        if (validator.isEmptyBody(data)) {
            return res.status(404).send({ status: false, msg: "data is Mandatory" })
        }

        if (!validator.isValid(Name)) {
            return res.status(400).send({ status: false, msg: "Name is required" })
        }

        if (!validator.isValid(Email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        }

        if (!validator.isValid(Password)) {
            return res.status(400).send({ status: false, msg: "password is required" })
        }

        if (!validator.isValid(Age)) {
            return res.status(400).send({ status: false, msg: "Age is required" })
        }

        if (!validator.isValid(Address)) {
            return res.status(400).send({ status: false, msg: "Address is required" })
        }

        if (!validator.isValid(Avatar)) {
            return res.status(400).send({ status: false, msg: "Avatar is required" })
        }

        if (!validator.isValid(Country)) {
            return res.status(400).send({ status: false, msg: "Country is required" })
        }

        let newData = await personModel.create(data)
        return res.status(201).send({ status: true, msg: "person created succesfully", data: newData })

    }
    catch (err) {
        return res.status(500).send({ status: false, data: err.message })
    }

}


const login = async function (req, res) {
    try {
        let data = req.body
        let email = data.Email;
        let password = data.Password;
        if (!email || !password) {
            return res.status(400).send({ status: false, msg: "email &password mandatory" })
        }
        let check = await personModel.findOne({ Email: email, Password: password })
        if (!check) {
            return res.status(404).send({ status: false, msg: "invalid email & password" })
        } else {
            let payload = { personId: check._id }
            let token = jwt.sign(payload, "valuePitch")
            if (token) {
                res.setHeader("x-auth-token", token)
            }

            res.status(201).send({ status: true, msg: "token created succesfully", data: token })
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

const updatePerson = async function (req, res) {
    try {
        if (req.personId != req.params.personId) {
            return res.status(400).send({ status: false, msg: "Not Authorize" })
        }
        let personId = req.params.personId;
        let personData = await personModel.findById(personId)
        if (!personData) {
            return res.status(404).send({ status: false, msg: "personId is invalid" })
        }
        let updateData = req.body;
        personData.Name = updateData.Name
        personData.Email = updateData.Email
        personData.Password = updateData.Password
        personData.Age = updateData.Age
        personData.Address = updateData.Address
        personData.Avatar = updateData.Avatar
        personData.Country = updateData.Country
        personData.save()
        return res.status(200).send({ status: true, msg: "personData updated succesfully", data: personData })
    }
    catch (err) {
        return res.status(500).send({ statuts: false, msg: err.message })
    }
}


const getDetailsById = async function (req, res) {
    try {
        if (req.personId != req.params.personId) {
            return res.status(400).send({ status: false, msg: "Not Authorize" })
        }
        let personId = req.params.personId;
        if (!personId) {
            return res.status(400).send({ status: false, msg: "please fill person Id " })
        }
        let personDetails = await personModel.findById(personId)
        if (!personDetails) {
            return res.status(404).send({ status: false, msg: "no details found" })
        } else {
            return res.status(200).send({ status: true, msg: "person Details found ", data: personDetails })
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { createPerson, login, updatePerson, getDetailsById }