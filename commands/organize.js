let fs=require("fs");
let path=require("path");

let types = {
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function dirCreator(dir){
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir); 
    }
}

function organize(dirpath){
    let organizedPath=path.join(dirpath,"organized_files");
    dirCreator(organizedPath);
    for(let key in types){
        let innerpath=path.join(organizedPath,key);
        dirCreator(innerpath);
    }
    let otherpath=path.join(organizedPath,"others");
    dirCreator(otherpath);
    organizeDir(dirpath,organizedPath);
}
function organizeDir(src,organizedPath){
    let isFile=isFileOrNot(src);
        if(isFile==true){
            let exts=src.split(".");
            let myExt=exts.pop();
            let folderName=getDirectoryName(myExt);
            let destpath=path.join(organizedPath,folderName)
            let orgFileName=path.basename(src);
            fs.copyFileSync(src,path.join(destpath,orgFileName));
        }else{
            let content=listContent(src);
            for(let i=0;i<content.length;i++){
                let childPath=path.join(src,content[i]);
                organizeDir(childPath,organizedPath);
            }
        }
}
function getDirectoryName(myExt){
    for(let i=0;i<types.length;i++){
        if(types[i].includes(myExt)){
            return types[i];
        }
    }
    return "others";
}
function isFileOrNot(dirpath){
return fs.lstatSync(dirpath).isFile();
}

function listContent(dirpath){
    return fs.readdirSync(dirpath);
}
module.exports={
    organizefn:organize
}

