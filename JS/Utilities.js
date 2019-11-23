let equalize = (s1,s2) => {
    return s1.toUpperCase() == s2.toUpperCase();
}
let getType = name => {
    if(equalize(name[name.length-1],'i')||equalize(name[0],'b')||equalize(name[0],'l')||(equalize(name[0],'s')&&name.length==2))
        return "I";
    else if(equalize(name,'j')||equalize(name,'jal'))
        return "J";
    return "R";
}
let bin = (val,n) => {
    var str=val.toString(2),s='0';
    var d=n-str.length;
    str=(d!=0)? (d>0)? s.repeat(d)+str:str.substr(-d,str.length):str;
    return str;
}
let readable = bin => {
    var start=bin.length%4,end=bin.length;
    var out=bin.substr(0,start);
    for(i=start;i<end;i+=4)
        out+=((out)?",":"")+bin.substr(i,4);
        return out;
}
let hex = bin => {
    var start=bin.length%4,end=bin.length;
    var out=(start)?parseInt(bin.substr(0,start),2).toString(16):"";
    for(i=start;i<end;i+=4)
        out+=parseInt(bin.substr(i,4),2).toString(16);
    return out;
}
let macCode_Gen = mac_code => {
    var code="";
    for(v in mac_code){
        if(equalize(v,"opcode")||equalize(v,"func"))
            code += bin(mac_code[v],6);
        else if(equalize(v,"im"))
            code += bin(mac_code[v],16);
        else if(equalize(v,"adr"))
            code += bin(mac_code[v],26);
        else
            code += bin(mac_code[v],5);
        }
        return code;
    }
let AppendText = (ident,text) => {
    var old = ident.text();
    ident.text(old+"\n\n"+text);
}
let timeline=[];
let Timer = function(callback, delay) {
    var timerId, start, remaining = delay;
    this.pause = function(){
        window.clearTimeout(timerId);
        remaining -= Date.now()-start;
    };
    this.resume = function(){
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };
    this.resume();
};
function animate(Class,color,start,time) {
    var transition = (time<500)?time/2:250;
    Array.from(document.getElementsByClassName(Class)).forEach(e =>{ 
        var initColor = e.style.color;
        e.style=`transition:stroke ${transition}ms,fill ${transition}ms`;
        timeline.push(new Timer(function(){e.style.fill=color;e.style.stroke=color},start));
        timeline.push(new Timer(function(){e.style.stroke=initColor;e.style.fill=initColor},start+time-transition));
    });
}
function animateText(Class,text,start) {
    Array.from(document.getElementsByClassName(Class)).forEach(e =>{ 
        timeline.push(new Timer(function(){e.innerHTML=text},start));
    });
}
let getClassification = name => {
    for(type of Object.keys(classification))   
    if(classification[type].indexOf(name)>-1)
    return type;
}