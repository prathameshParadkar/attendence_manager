const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    title:String,
    duration:Number,
    faculty: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    total: Number,
    attended: Number,
})

module.exports = mongoose.model('Subject',SubjectSchema);