// 合计报销单表体自定义项金额到表头
function headTotalBody(){
    if(appModel.uiState == $.UIState.NOT_EDIT){
        return;
    }
    var nodecode = getRequest().nodecode;
    var busiitemfield = ["defitem25"];
    var individualincometax = defitem28;
    var busiitemtotal = [new ctrl.bignumber(0)];
    var totalhead = new ctrl.bignumber(0);
    var busitemTable = ctrl.app.getDataTables()['arap_bxbusitem'];
    //默认每个页签每行都打开一行，计算表头合计金额有误，每行都减去一行，将没点确定的行剔除
    var rowlength = busitemTable.getAllRows().length; //业务行页签表体行个数
    for(var i=0; i < rowlength; i++){
        //if(i == rowlength-1) continue;
        var busitemrow = busitemTable.getAllRows()[i];
        for(var j=0; j<busiitemfield.length; j++){
            if(null!==busitemrow.data[busiitemfield[j]] && undefined!==busitemrow.data[busiitemfield[j]]
                && null!==busitemrow.data[busiitemfield[j]].value && undefined!==busitemrow.data[busiitemfield[j]]){
                busiitemtotal[j] = busiitemtotal[j].plus(new ctrl.bignumber(busitemrow.data[busiitemfield[j]].value =="" ? "0.00" : busitemrow.data[busiitemfield[j]].value));
                // busiitemtotal[j] = busiitemtotal[j].minus(new ctrl.bignumber(busitemrow.data[individualincometax].value =="" ? "0.00" : busitemrow.data[individualincometax].value));
                totalhead = totalhead.plus(busiitemtotal[j]);
            }
        }
    }
    //修改表头金额信息
    ctrl.headTable.getCurrentRow().setValue("zyx25",totalhead);//合计金额
    for(var i=1; i<busiitemfield.length; i++){
        if(null!=ctrl.headTable.getCurrentRow().data[busiitemfield[i]]
            && undefined!=ctrl.headTable.getCurrentRow().data[busiitemfield[i]]){
            ctrl.headTable.getCurrentRow().setValue(busiitemfield[i],busiitemtotal[i].toString());
        }
    }
}