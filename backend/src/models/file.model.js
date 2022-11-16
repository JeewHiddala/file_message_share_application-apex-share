const mongoose = require('mongoose');       //import mongoose


const FileSchema = new mongoose.Schema({    //make schema
    fileUrl: { type: String, required: false, trim: true },
    managerId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'}
},{
    timestamps: true,
});

const File = mongoose.model('files', FileSchema);        //give name for collection
module.exports = File;