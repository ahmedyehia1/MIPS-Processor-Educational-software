var instruction_name={
    //R Format
    ADD:
    {
        opcode: 0,
        shamt: 0,
        func: 32,
        im: null,
        adr: null
    },
    AND:
    {
        opcode: 0,
        shamt: 0,
        func: 36,
        im: null,
        adr: null
    },
    SUB:
    {
        opcode: 0,
        shamt: 0,
        func: 34,
        im: null,
        adr: null
    },
    XOR:
    {
        opcode: 0,
        shamt: 0,
        func: 38,
        im: null,
        adr: null
    },
    OR:
    {
        opcode: 0,
        shamt: 0,
        func: 37,
        im: null,
        adr: null
    },
    NOR:
    {
        opcode: 0,
        shamt: 0,
        func: 39,
        im: null,
        adr: null
    },
    SLL:
    {
        opcode: 0,
        rs: 0,
        shamt: -1,
        func: 0,
        im: null,
        adr: null
    },
    SRL:
    {
        opcode: 0,
        rs: 0,
        shamt: -1,
        func: 2,
        im: null,
        adr: null
    },
    SRA:
    {
        opcode: 0,
        rs: 0,
        shamt: -1,
        func: 3,
        im: null,
        adr: null
    },
    SLT:
    {
        opcode: 0,
        shamt: 0,
        func: 42,
        im: null,
        adr: null
    },
    JR:
    {
        opcode: 0,
        shamt: 0,
        rt: 0,
        rd: 0,
        func: 8,
        im: null,
        adr: null
    },
    //I Format
    ADDI:
    {
        opcode: 8,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    ANDI:
    {
        opcode: 12,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    ORI:
    {
        opcode: 13,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    SLTI:
    {
        opcode: 10,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    XORI:
    {
        opcode: 14,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    LB:
    {
        opcode: 32,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    LH:
    {
        opcode: 33,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    LW:
    {
        opcode: 35,
        func: null,
        shamt: null,
        im: -1,
        adr: null
    },
    LUI:
    {
        opcode: 15,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    SB:
    {
        opcode: 40,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    SH:
    {
        opcode: 41,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    SW:
    {
        opcode: 43,
        func: null,
        shamt: null,
        im: -1,
        adr: null
    },
    BEQ:
    {
        opcode: 4,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    BNE:
    {
        opcode: 5,
        shamt: null,
        func: null,
        im: -1,
        adr: null
    },
    //J Format
    J:
    {
        opcode: 2,
        shamt: null,
        func: null,
        im: null,
        adr: -1
    },
    JAL:
    {
        opcode: 3,
        shamt: null,
        func: null,
        im: null,
        adr: -1
    }
}
var reg={
    $ZERO:0,
    $0:0,
    $AT:1,
    $V0:2,$V1:3,
    $A0:4,$A1:5,$A2:6,$A3:7,
    $T8:24,$T9:25,
    $K0:26,$K1:27,
    $GP:28,$SP:29,$FP:30,
    $RA:31
}
for(i=0;i<8;i++){
    reg['$T'+i]=8+i;
    reg['$S'+i]=16+i;
}
var classification={
    R1:["ADD","AND","NOR","OR","SLT","SUB","XOR"],
    R2:["SLL","SRA","SRL"],
    R3:["JR"],
    I1:["ADDI","SLTI","ANDI","LUI","ORI","XORI"],
    I2:["LW","LH","LB"],
    I3:["SW","SH","SB"],
    I4:["BEQ","BNE"],
    J1:["J"],
    J2:["JAL"]
}
var control_line_names=["RegDst","ALUSrc","MemToReg","RegWrite",
"MemRead","MemWrite","Branch","Jump","Jal","sgn-extd","Jr"];
var control_line={
    R1:{
        main:"101100000x0",
        ALUOp:"010"
    },
    R2:{
        main:"101100000x0",
        ALUOp:"010"
    },
    R3:{
        main:"xxx0x0xxxx1",
        ALUOp:"xxx"
    },
    I1:{
        main:"01110000000",
        ALUOp:"011 : 111"
    },
    I2:{
        main:"01011000010",
        ALUOp:"000"
    },
    I3:{
        main:"x1x00100010",
        ALUOp:"000"
    },
    I4:{
        main:"x0x00010010",
        ALUOp:"001"
    },
    J1:{
        main:"xxx000x1xx0",
        ALUOp:"xxx"
    },
    J2:{
        main:"xxx100011x0",
        ALUOp:"xxx"
    }
}