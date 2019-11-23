function GetInstructions(str){
    var insts=[];
    for(l of str)
        insts.push(new getParameters(l));
    return insts;
}
function getParameters(inst){
    var temp=[],args=[];
    inst.split(',').forEach(e => e.split(' ').forEach(s => temp.push(s.split('('))));
    temp.flat().filter(e => args.push((e.indexOf(")")<0)?e:e.substr(0,e.length-1)));
    if(args.length>2)//not j type
        if(Math.floor(Math.log10(args[2])+1)==args[2].length)//not lw or sw
            [args[2], args[3]] = [args[3], args[2]]
    var type=getType(args[0]);
    return new instruction(args,type);
}
function instruction(arg,type){
    this.class_type = getClassification(arg[0].toUpperCase());
    if(type=="R"){
        (equalize(arg[0].substr(0,2),'sr') || equalize(arg[0],'sll'))?
              this.mac_code = new assemble(arg,['name','rd','rt','shamt'])
            :(equalize(arg[0],'jr'))?
            this.mac_code = new assemble(arg,['name','rs']):
            this.mac_code = new assemble(arg,['name','rd','rs','rt']);
    }
    else if(type=="I")
        this.mac_code = new assemble(arg,['name','rt','rs','im']);
    else if(type=="J")
        this.mac_code = new assemble(arg,['name','adr']);
}
function assemble(arg,n){
    var data = {};
    var name = arg[0];
    for(i in arg)
        data[n[i]]=arg[i];
    var count = 0;
    this.opcode=instruction_name[name.toUpperCase()].opcode;
    var order=["rs","rt","rd"],ind;
    for(r of order){
        ind=n.indexOf(r);
        if(ind>-1)
            this[n[ind]] = reg[arg[ind].toUpperCase()];
        ind=instruction_name[name.toUpperCase()][r];
        if(ind!=undefined)
            this[r] = reg[instruction_name[name.toUpperCase()][ind]];
    }
    for(key in instruction_name[name.toUpperCase()]){
        if(count){
            if(instruction_name[name.toUpperCase()][key] != null)
                this[key]=(instruction_name[name.toUpperCase()][key] < 0)?
                Number(data[key]):instruction_name[name.toUpperCase()][key];
        }
        count++;
    }
}