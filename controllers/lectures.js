const Subject = require('../models/subject'); // Import your Subject model

class LectureController {
    static async getIndex(req, res) {
        try {
            const sub = await Subject.find({});
            res.render('lecture/index', { sub });
        } catch (err) {
            // Handle errors here
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getShow(req, res) {
        try {
            const sub = await Subject.findById(req.params.id);
            res.render('lecture/show', { sub });
        } catch (err) {
            // Handle errors here
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static async postMarkPresence(req, res) {
        const lectureid = req.params.id;
        try {
            const sub = await Subject.findById(lectureid);
            console.log(sub)
            sub.attended++
            sub.total++
            sub.save()
            console.log(sub)
            res.render('lecture/show', {sub})
        } catch (err) {
            // Handle errors here
            console.error(err);
            res.status(500).send('Internal Server Error');
        }

    }
    static async postMarkAbsence(req, res) {
        const lectureid = req.params.id;
        try {
            const sub = await Subject.findById(lectureid);
            console.log(sub)
            sub.total++
            sub.save()
            console.log(sub)
            res.render('lecture/show', { sub })
        } catch (err) {
            // Handle errors here
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = LectureController;
