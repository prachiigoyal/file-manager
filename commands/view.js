let fs=require("fs");
let path=require("path");

function view(dirpath,mode){
    if(mode=="flat"){
        viewFlat(dirpath,path.basename(dirpath));
    }else if(view=="tree"){
        viewTree(dirpath,"");
    }
}

function isFileOrNot(dirpath){
return fs.lstatSync(dirpath).isFile();
}

function listContent(dirpath){
    return fs.readdirSync(dirpath);
}

function viewFlat(dirpath,toPrint){
    let isFile=isFileOrNot(dirpath);
    if(isFile==true){
        console.log(toPrint+"*");
    }else{
        console.log(toPrint);
        let content=listContent(dirpath);
        //console.log(content);
        for(let i=0;i<content.length;i++){
            let childPath=path.join(dirpath,content[i]);
            viewFlat(childPath,toPrint+"\\"+content[i]);
        }
    }
}
function viewTree(dirpath,indent){
    let isFile=isFileOrNot(dirpath);
    if(isFile==true){
        console.log(indent,path.basename(dirpath)+"*");
    }else{
        console.log(indent,path.basename(dirpath));
        let content=listContent(dirpath);
        for(let i=0;i<content.length;i++){
            let childPath=path.join(dirpath,content[i]);
            viewTree(childPath,indent+"\t");
        }
    }
}
module.exports={
    viewfn:view
}