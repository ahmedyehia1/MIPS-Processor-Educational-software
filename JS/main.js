$(function(){
    let status;
    $(".btn-group").children().click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("#run").click(function(){
            status="running";
            $("#Assembly").focus();
            str = $("#Assembly").val().split("\n");
            var insts = GetInstructions(str);
            var scale = Number($("#scale").val());
            for(i in insts){
                let type = insts[i].class_type;
                let ctrl = control_line[type];
                animateText("ALUOp-content",ctrl.ALUOp,scale*i);
                control_line_names.forEach((sig,index) => {
                    if(ctrl.main[index]=='1')
                        animate(sig,"#26f",scale*i,scale);
                    else if(ctrl.main[index]=='0'){
                        if(sig=='sgn-extd'){
                            if(insts[i].mac_code.opcode==8||insts[i].mac_code.opcode==10)
                                animate(sig,"#48f",scale*i,scale);
                            else
                                animate(sig,"#e83030",scale*i,scale);
                        } else{
                            animate(sig,"#e83030",scale*i,scale);
                        }
                    }
                    else
                        animate(sig,"#888",scale*i,scale);
                });
                if(type[0]=='R')
                animate(type,"#009000",scale*i,scale);
                if(type[0]=='I')
                    animate(type,"#fbdd00",scale*i,scale);
                if(type[0]=='J')
                    animate(type,"#80a",scale*i,scale);
            }
        var code="";
        $('.list-group').empty();
        $("#machine-code").children().text("");
        var parent = document.getElementsByClassName("list-group")[0];
        $("#toBin").click(function(){
            if(insts){
                $('.list-group').empty();
                for(ins of insts){
                    code = macCode_Gen(ins.mac_code);
                    var s1 = document.createElement('span');
                    s1.innerHTML = readable(code);
                    var child = document.createElement('li');
                    child.className="list-group-item";
                    child.appendChild(s1);
                    parent.appendChild(child);
                    }
                }
            });
            $("#toHex").click(function(){
                if(insts){
                    $('.list-group').empty();
                    for(ins of insts){
                        code = macCode_Gen(ins.mac_code);
                        var s1 = document.createElement('span');
                        s1.innerHTML = "0x "+readable(hex(code));
                        var child = document.createElement('li');
                        child.className="list-group-item";
                        child.appendChild(s1);
                        parent.appendChild(child);
                    }
                }
            });
            for(ins of insts){
                code = macCode_Gen(ins.mac_code);
                var s1 = document.createElement('span');
                s1.innerHTML = readable(code);
                var child = document.createElement('li');
                child.className="list-group-item";
                child.appendChild(s1);
                parent.appendChild(child);
            }
        $("#resume").addClass("disabled");
    });
    document.getElementById("stop").addEventListener("click",function(){
        status="stoped";
        $("#resume").removeClass("disabled");
        for(t of timeline)
        t.pause();
    });
    document.getElementById("resume").addEventListener("click",function(e){
        if(status=="stoped"){
            for(t of timeline)
            t.resume();
        }
        status="resumed";
    });
});
