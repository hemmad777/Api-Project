const { create } = require("domain");
const multer=require("multer");
const path=require("path");

const storage=function upload(folder){
    return multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,folder)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    } 
});
}

module.exports=storage