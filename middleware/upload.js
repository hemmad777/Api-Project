const { create } = require("domain");
const multer=require("multer");
const path=require("path");

exports.upload=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"categories/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    } 
});
