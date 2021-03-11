let viewfnObj=require("./commands/view")
let helpfnObj=require("./commands/help")
let organizefnObj=require("./commands/organize")
let input=process.argv.slice(2);
let cmd=input[0];

switch(cmd){
    case "view":
        console.log("view command executed");
        viewfnObj.viewfn(input[1],input[2]);
        break;
    case "organize":
        console.log("organize command executed");
        organizefnObj.organizefn(input[1]);
        break;
    case "help":
        helpfnObj.helpfn();
        break;
    default:
        console.log("Wrong command .Type help to see the list of all commands");
}