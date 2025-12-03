const Doctor = require("../models/Doctor");
const multer = require("multer");

exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, licenseNumber } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            specialization,
            licenseNumber,
            qualificationDocs: req.file.filename
        });

        res.json({ msg: "Doctor registered", doctor });
    } catch (error) {
        res.status(500).json(error);
    }
};
