define(['jquery', 'knockout', 'compevent', 'bignumber', 'billcheck', '/iwebap/erm/js/up.js', '/iwebap/js/BillFormActionUtils.js', 'artDialog', '/iwebap/erm/js/SimpleMap.js', 'director', 'sco.message', '/iwebap/js/ImageBrowser.js', '/iwebap/erm/js/jquery_resize.js', '/iwebap/ssccloud/credit/credit.js', '/iwebap/ssccloud/pub/getsysparameter.js', '/iwebap/erm/js/messenger.js', '/iwebap/erm/js/multilinepanel.js'], function ($, ko, compevent, bignumber, billcheck, up) {

	// $(window).resize(function() {
	// 	var bw = $(document.body).width(),cw = bw*0.9
	// 	$('body > .container').css('width', cw)
	// }).resize()
	//fung+
		

	var ctrl = {};
	window.ctrl = ctrl;
	ctrl.bodyButtongroups = [];//表体操作按钮注册
	ctrl.mainOrg = {};
	ctrl.pkFieldName = "";
	ctrl.funcnode = "";
	ctrl.bignumber = bignumber;
	ctrl.isLoadingData = false;
	ctrl.org_local_currtype = "";
	ctrl.router = Router();
	ctrl.jkyjye;
	ctrl.isCopy = "N";
	ctrl.accessorybillid="";
	ctrl.accessorypkfildname="";
	ctrl.reimDim=[];//报销标准维度
	ctrl.freecustValue="";
	ctrl.visibleSettingParams = undefined;//可见性控制参数
	ctrl.router.on('/add', function(){
		appModel.setUIState($.UIState.ADD);
		$("#approvalinfos").hide();
		ctrl.mainOrg.setEnable(true);
	});
	ctrl.router.on('/view/:id', function(id){
		ctrl.openbillid = id
		appModel.setUIState($.UIState.NOT_EDIT);
		$("#approvalinfos").show();			
	});

	window.onbeforeunload = function(){
		if(appModel.getUIState() != $.UIState.NOT_EDIT && localStorage.getItem("allowCopy") != "Y"){
			return "";
		}
	};

	ctrl.extendViewModel = function(viewModel, app, preProcessInfo){
		//preProcessInfo包含有模板对外提供的用于帮助设置预处理信息的参数，节点开发可以从中获取当前模板组件中使用的dataTableID，
		//而不是通过写死的方式设置dataTableID

		//options 模板中u-meta内的控件属性
		
		var gridid = $('#gridlistSignf').find('div:first-child').attr('id');
		var gridColumnOutDivId = $('#'+gridid);
		var deviceWidth = gridColumnOutDivId.width();
		var gridColumnWidth;
		var gridColumnNum = gridColumnOutDivId.find('div').length;
		if (gridColumnNum<=10) {
			gridColumnWidth = (parseInt(deviceWidth)-40-100)/gridColumnNum;
		}else if (gridColumnNum>10) {
			gridColumnWidth = (parseInt(deviceWidth)-40-100)/10;
		}
		gridColumnOutDivId.find('div').each(function(index, el) {
			var gridColumnId = $(this).attr("id");
			var optionsStr = $(this).attr("options");
			var jsonOptionsStr = JSON.parse(optionsStr);
			if (gridColumnId!='CRED') {
				jsonOptionsStr.width = gridColumnWidth;
			}else{
				jsonOptionsStr.width = 100;
			};
			
			$(this).attr("options",JSON.stringify(jsonOptionsStr));
		});
		
		ctrl.viewModel = viewModel;
		ctrl.funcnode = getRequest().nodecode;
		app.setAdjustMetaFunc(function(options) {
			var dataTableIDs = preProcessInfo.dataTableIDs;
			ctrl.dataTableIDs = dataTableIDs;
			if (dataTableIDs.length > 0) {
				for (var x in dataTableIDs) {
					if (typeof dataTableIDs[x] == 'string') {
						if (dataTableIDs[x].indexOf('head') >= 0) {
							ctrl.dataTableIDs.head = dataTableIDs[x];
						} else if (dataTableIDs[x].indexOf('body') >= 0) {
							ctrl.dataTableIDs.body = dataTableIDs[x];
						}
					}
					if (options['type'] === 'grid' && options['id'] && options['id'] === dataTableIDs[x]) {
						//options['multiSelect'] = true
						options['editable'] = true
					}

				}
			} 
			if (options.type == 'gridColumn' && options.columns) {
				// // 隐藏列表视图上不显示字段
				// var flag = 0; 
				// for(var i=0;i < options.columns.length;i++) { 
				// 	var column = options.columns[i]; 
				// 	if(column.visible){
				// 		flag++; 
				// 	}
				// 	if(flag > 8 && column.visible && i != options.columns.length -1){ 
				// 		options.columns[i].visible = false; 
				// 	} 
				// }
			}
		})
		
		//设置参照初始化参数
		setPageInitRefCfg(viewModel, app);
		ctrl.viewModel.headform.setMeta("zy","refcfg","{\"autoCheck\":false}");
	}

	function function_getSupplier(){
		if(ctrl.freecustValue){
			return ctrl.freecustValue;
		}
	}
	
	function initFreecustPara() {
    	var freecustPara = {};
		if(ctrl.freecustValue == "" || ctrl.freecustValue.length ==0 || ctrl.freecustValue == null){
			freecustPara['function_getSupplier'] = function_getSupplier;
		}else{
			freecustPara['function_getSupplier'] = ctrl.freecustValue;
		}
    	window.freecustPara = freecustPara;  
	}

	function setPageInitRefCfg(viewModel) {
		var pk_contractno = {};// @sscct@合同模块补丁合并增加pk_contractno--20170701
		pk_contractno.refUIType = 'RefGrid';// @sscct@合同模块补丁合并增加pk_contractno--20170701  
		//处理合同号参照 
		// @sscct@合同模块补丁合并增加pk_contractno--20170701
		pk_contractno.refModelHandlerClass = "nc.web.erm.utils.ERMRefModelHandler"; 
		if(ctrl.viewModel.headform.getMeta("pk_contractno")!=null)
		ctrl.viewModel.headform.setMeta("pk_contractno","refcfg",JSON.stringify(pk_contractno));
	
		
	
		var accountcfg = {};
		accountcfg.refUIType = 'RefGrid';
		accountcfg.refModelHandlerClass = 'nc.web.erm.utils.ERMRefModelHandler';
		if(ctrl.viewModel.headform.meta['custaccount']){
			ctrl.viewModel.headform.setMeta("custaccount","refcfg", JSON.stringify(accountcfg));
		}
		if(ctrl.viewModel.body_1arap_bxbusitem && ctrl.viewModel.body_1arap_bxbusitem.meta['custaccount']){
			ctrl.viewModel.body_1arap_bxbusitem.setMeta("custaccount","refcfg",JSON.stringify(accountcfg));
		}
		var freecustomcfg = {};
		freecustomcfg.refUIType = "FreeCustGrid";
		var extendModel="nc.web.erm.utils.ERMRefModelHandler";
		freecustomcfg.refModelHandlerClass = extendModel;
       		
        ctrl.viewModel.headform.setMeta("freecust","refcfg",JSON.stringify(freecustomcfg));
    
		for (var key in viewModel) {
			 var dataTable = viewModel[key];
			
            if(key.indexOf("body_1")>-1 && dataTable.meta['freecust']){
                
                 dataTable.setMeta("freecust","refcfg",JSON.stringify(freecustomcfg));
               }

		}
		

		
	}

	ctrl.beforeInit = function(app, appModel, billForm) {
		//注册表体行编辑按钮
		var actionutil = new ActionUtils(billForm, ctrl);
		ctrl.gridOperRenderType = actionutil.getActions();
		ctrl.fullGridOperRenderType = actionutil.getDetailActions();
		if(getRequestString("applyPull") == "Y" && (getRequest().tradetype.indexOf(263) >= 0 || getRequest().tradetype =="2647")){
			ctrl.fullGridOperRenderType.splice(2,2);
			ctrl.gridOperRenderType.splice(2,2);
		}
		$("#bfCjk").on("mouseenter",
			function (){
				var el= $(this);
				el.popover({
				 	html:true,
		        	placement:'top',
		        	template:'<div id="pop-set" class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" style="height: 50px;"></div><div class="popover-tail" style="text-align: center;"></div></div>',
		        	content:function(){
		        		return ctrl.jkyjye;
		        	}
				});
				
		        
		        el.popover('show');

			});

		$(function () {
	            $('[data-toggle="tooltip"]').tooltip()
	        })
	    $(function () {
	        $('[data-toggle="popover"]').popover()
	    })
	    $("#bfCjk").on("mouseleave",function (){
	    	var el= $(this);
	    	el.popover('hide');
	    });
	    if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
		 	$("#grid_ys_title").hide();
			$("#grid_pz_title").hide();
		}
		if(getRequestString("tradetype").indexOf("263")>=0 || getRequestString("tradetype").indexOf("2647")>=0 || getRequestString("applyPull") == "Y"){
			$("#verify").hide();
		}
		if(getRequestString("tradetype").indexOf("263")>=0 || getRequestString("tradetype").indexOf("2647")>=0){
			$("#grid_fyyt_title").hide();
		}
	}

	ctrl.init = function(viewModel, app, billForm, appModel) {
		ctrl.viewModel = viewModel;
		ctrl.app = app;
		ctrl.billForm = billForm;
		var dataTables = ctrl.app.getDataTables();
		ctrl.headTable = app.getDataTable(ctrl.dataTableIDs[0]);
		ctrl.busitemTables = [];//业务行页签数组
        ctrl.bodyTables = [];//表体行数组
		for (var key in dataTables) {
			var dataTable = dataTables[key];
			if (dataTable.getParam("cls") === "nc.vo.ep.bx.BXBusItemVO" || dataTable.getParam("cls") === "nc.vo.ep.bx.JKBusItemVO") {
				ctrl.busitemTables.push(dataTable);
				ctrl.bodyTotal(dataTable);
			}
            if(key.indexOf("body_1")>-1 && dataTable.meta['freecust']){
                 ctrl.bodyTables.push(dataTable);
               }

		}
		var n = {};
		n.display = "N";
		n.value = "N";
		var y = {};
		y.display = "Y";
		y.value = "Y";
		
		for(var i=0;i<ctrl.bodyTables.length;i++){
			var bodymeta = ctrl.bodyTables[i].getMeta();
			for(var key in bodymeta){
				if(bodymeta[key].default&&bodymeta[key].default.value=="否"){
					ctrl.bodyTables[i].setMeta(key,"default",n);
				}else if(bodymeta[key].default&&bodymeta[key].default.value=="是"){
					ctrl.bodyTables[i].setMeta(key,"default",y);
				}
			}
		}
		ctrl.contrastTable = dataTables["body_1er_bxcontrast"];//冲销明细页签
		ctrl.shareTable = dataTables["body_1er_cshare_detail"];//分摊页签
		// var openbillid = getRequest().openbillid;
		appModel.addListener(ctrl);
		// 添加联动事件监听
		registerEvent();
		ctrl.router.init()
	    //start @sscct@合同模块补丁合并增加--20170701
		var headApctRefparam = {};

		if(ctrl.headTable.meta['pk_contractno']!=null && ctrl.headTable.meta['pk_contractno'].refparam){
			headApctRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
		}
		headApctRefparam.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		if(ctrl.headTable.getCurrentRow()!=null && ctrl.headTable.getCurrentRow().data!=null)
		{
		headApctRefparam.bzbm = ctrl.headTable.getCurrentRow().data.bzbm.value;
		headApctRefparam.qcbz = ctrl.headTable.getCurrentRow().data.qcbz.value;
		headApctRefparam.hbbm = ctrl.headTable.getCurrentRow().data.hbbm.value;
		}
		if(ctrl.headTable.getMeta('pk_contractno')!=null)
		ctrl.headTable.setMeta('pk_contractno','refparam',JSON.stringify(headApctRefparam));
		//end  @sscct@合同模块补丁合并增加--20170701	
	}

	ctrl.afterInit = function(viewModel, app) {
	 	viewModel[ctrl.dataTableIDs.head].on('hbbm.valueChange',function(event){
			var freecustRefparam = {};
			var rowdata = ctrl.headTable.getCurrentRow().data;
			if(rowdata.hbbm.value && isFreecust('supplier',rowdata.hbbm.value)){
				ctrl.freecustValue = rowdata.hbbm.value;
				initFreecustPara();		
		    } 
		
		});
      	viewModel[ctrl.dataTableIDs.head].on('customer.valueChange',function(event){
			var freecustRefparam = {};
			var rowdata = ctrl.headTable.getCurrentRow().data;
			if(rowdata.customer.value && isFreecust('customer',rowdata.customer.value)){
				ctrl.freecustValue = rowdata.customer.value;
				initFreecustPara();
			} 
		
		});
		
		
		
   		//供应商客户事件绑定
        for(var i =0;i< ctrl.bodyTables.length;i++){
            var bodyid=ctrl.bodyTables[i].id;
            viewModel[bodyid].on('hbbm.valueChange',function(event){
		    var freecustRefparam = {};
			    if(ctrl.app.getDataTable(event.dataTable).getCurrentRow()){
					var rowdata = ctrl.app.getDataTable(event.dataTable).getCurrentRow().data;
				    if(rowdata.hbbm.value && isFreecust('supplier',rowdata.hbbm.value)){
						ctrl.freecustValue = rowdata.hbbm.value;
						initFreecustPara();
			        }
			    }
			}).on('customer.valueChange',function(event){
		    var freecustRefparam = {};
		    if(ctrl.app.getDataTable(event.dataTable).getCurrentRow()){
			    var rowdata = ctrl.app.getDataTable(event.dataTable).getCurrentRow().data;
			    if(rowdata.customer.value && isFreecust('customer',rowdata.customer.value)){
					ctrl.freecustValue = rowdata.customer.value;
					initFreecustPara();
		        }
		    }
	    	}).on('focus',function(){
				var freecustRefparam = {};
			//start @sscct@合同模块补丁合并增加--20170701
			var headApctRefparam = {};

			if(ctrl.headTable.meta['pk_contractno']!=null && ctrl.headTable.meta['pk_contractno'].refparam){
				headApctRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
			}
            if(ctrl.headTable.getCurrentRow().data.pk_contractno!=null)
			headApctRefparam.pk_contractno = ctrl.headTable.getCurrentRow().data.pk_contractno.value;
			headApctRefparam.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
			if(ctrl.headTable.getCurrentRow()!=null && ctrl.headTable.getCurrentRow().data!=null)
		    {
			headApctRefparam.bzbm = ctrl.headTable.getCurrentRow().data.bzbm.value;
		    headApctRefparam.qcbz = ctrl.headTable.getCurrentRow().data.qcbz.value;
		    headApctRefparam.hbbm = ctrl.headTable.getCurrentRow().data.hbbm.value;
		    }
		    if(ctrl.headTable.getMeta('pk_contractno')!=null)
			ctrl.headTable.setMeta('pk_contractno','refparam',JSON.stringify(headApctRefparam));
			//end  @sscct@合同模块补丁合并增加--20170701		
			
				if(ctrl.app.getDataTable(bodyid).getCurrentRow()){
					var rowdata = ctrl.app.getDataTable(bodyid).getCurrentRow().data;
					if(rowdata.hbbm.value && isFreecust('supplier',rowdata.hbbm.value)){
						ctrl.freecustValue = rowdata.hbbm.value;
						initFreecustPara();
					}else if(rowdata.customer.value && isFreecust('customer',rowdata.customer.value)){
						ctrl.freecustValue = rowdata.customer.value;
						initFreecustPara();
					}
				}
	        });
        }	 
		paytargetChangeInit(viewModel);
		ctrl.viewModel = viewModel;
		ctrl.headTable.on('valueChange',function(event){
			// 将当前报销单标记为待摊，供各会计期间摊销
            if("isexpamt" === event.field) {  // 是否待摊
              if ($("#0arap_bxzb_isexpamt").is(':checked')) {
				ctrl.headTable.setMeta("start_period", "enable", true);
                ctrl.headTable.setMeta("total_period", "enable", true);
              } else {
				  var newValue = $("#0arap_bxzb_start_period").val();
                  $.showMessageDialog({
                    type: "warning",
                    title: "温馨提示",
                    msg: '请确认是否要取消标记待摊？',
                    backdrop: true,
                    okfn: function () {
					  ctrl.headTable.setMeta("start_period", "enable", false);
                      ctrl.headTable.setMeta("total_period", "enable", false);
                      $("#0arap_bxzb_start_period").val(" ");
                      $("#0arap_bxzb_total_period").val(" ");
                    },
                    cancelfn: function(){
						$("#0arap_bxzb_isexpamt").click();
						$("#0arap_bxzb_start_period").val(newValue);
                    }

                  });
                }
            }
			if("iscostshare"===event.field){//是否分摊
				if ("Y"===event.newValue) {
					ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
						ctrl: 'JKBXLinkAttrController',
						method: 'calAssumeAmount',
						async: false,
						success: function(data) {
							$("#bodytab_1er_cshare_detail").show();
							if($(".row-fluid.clearfix.row-submit")[0].style.display == 'none'){
								$(".row-fluid.clearfix.row-submit").show();
							}
						} 
					});
				}else{ 
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:"即将删除分摊数据，是否继续？",backdrop:true,
						okfn:function(){
							ctrl.shareTable.removeAllRows();
							ctrl.shareTable.createEmptyRow();
							$("#bodytab_1er_cshare_detail").hide();
						},
						cancelfn:function(){
							$("#0arap_bxzb_iscostshare").trigger("click");
					}});
				}
			}
		});
		if(getRequestString("isCopyBtn")== "Y" && appModel.uiState == $.UIState.ADD){
			ctrl.copy();
		}else{
			var nodecode = getRequest().nodecode;
			for(var i=0;i<ctrl.busitemTables.length;i++){
				viewModel[ctrl.busitemTables[i].id].on('delete',function(event){
					headTotal();//表体删行时触发表头合计金额计算
				}).on('insert',function(event){
					headTotal();
				}).on('valueChange',function(event){
					if($(".row-fluid.clearfix.row-submit")[0].style.display == 'none'){
						$(".row-fluid.clearfix.row-submit").show();
						$(".row-fluid.clearfix.row-submit").addClass('row-submit-fixed');
					}
					if($("#"+event.dataTable+"_content_edit_menu_save")[0] && $("#"+event.dataTable+"_content_edit_menu_save")[0].style.display == 'none'){
						$("#"+event.dataTable+"_content_edit_menu_save").show();
					}
				});
			}
			var param = {};
			param.tradetype = getRequest().tradetype;
			param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
			param.openbillid = ctrl.openbillid;
			//(不确定谁调整的，只调整了后台)代码有误需要传入uid，获取的版本前端未传入uid,20170914
			var user = getRequestString("uid");
			if(user==null || user ==undefined)
			user = getRequestString("userid");
			param.uid = user;
			var source = getRequest().from;
			if (param.openbillid != null && param.openbillid != "" && param.openbillid != undefined) {
				$.showLoading();
				$.ajax({
					type: "GET",
					url: "/iwebap/jkbx_maintain_ctr/viewbill?time=" + (new Date()).getTime(),
					data: param,
					// async: false,
					dataType: "json",
					success: function(result) {
						$.hideLoading();
						if (result["success"] == "true") {
							openbillid = result.head.primarykey;
							var pk_org = result.head.pk_org;
							ctrl.mainOrg.setRowSelect(0);
							ctrl.mainOrg.getCurrentRow().setValue("pk_org", pk_org.pk);
							setRefOrg(pk_org.pk, ctrl.app.getDataTables());
							if (appModel.uiState == $.UIState.NOT_EDIT) {
								ctrl.mainOrg.setEnable(false);
							} else {
								ctrl.mainOrg.setEnable(true);
							};

							appModel.datas.push(result);
							appModel.datapks.push(result.head.primarykey);
							var selectedIndex = appModel.datas.length - 1;
							ctrl.onSelectionChanged(result);
							setNullTableHideOrShow(0,false);
							$("#approvalinfos").show(); 
							getApproveInfosNew(openbillid, param.tradetype, $("#approvalinfos"), pk_org.pk);
							/*if(appModel.getUIState() == $.UIState.NOT_EDIT && $(".btn-group.bill-view-btns > #imageupload")){
								$(".btn-group.bill-view-btns > #imageupload").hide();
							}	*/				
							setStampAll();//根据是否超标设置印章效果
							setBtnHide();//根据单据生效、审批状态设置按钮隐藏
							ApplyPullHKHideCopy();//隐藏拉单后的单据复制按钮
							SetBzHide();//设置拉单的单据币种、pk_org不能修改
							//获取附件数量
							showAttachNum(openbillid);
							ctrl.setFieldVisible4ListAll();//设置列表字段可见性
							//start @sscct@合同模块补丁合并增加--20170701		
						    if(appModel.uiState == $.UIState.NOT_EDIT){
                				ctrl.setPayContractLink();
               			    	}
							//end @sscct@合同模块补丁合并增加--20170701
							// 显示信用信息
							sscCloudCredit.showCreditInfo(result.head.creator.pk, $(".panel-title"));
							// 显示会话
							sscCloudPub.showSscCloudMsg(openbillid, param.tradetype, getCookie("usercode"));
						} else {
							if (!result["message"]) {
								result["message"] = "没有返回错误信息";
							}
							$.showMessageDialog({type: "info",title: "未查找到相应单据！",msg: result["message"],backdrop: true});
						}
					}
				});
			}
			$("#body_1er_bxcontrast_content_edit_menu").hide();//隐藏冲销页签的编辑按钮
			$("#grid_rowaddbtn_body_1er_bxcontrast").hide();
			$("#LcShow").on("click",function(){
				if($("#LcContent")[0].style.display == "none"){
					$("#LcContent")[0].style.display = "block";
				}else{
					$("#LcContent")[0].style.display = "none"
				}
			});
		}
		
	}




//start @sscct@合同模块补丁合并增加--20170701
	ctrl.setPayContractLink =  function(){
	     var divs = $("div.form-readonly-head").find("div.form-readonly-item");
	     divs.each(function(i,e){
	        if($(this).attr('field')=='pk_contractno'){
	          var div = $(this).find("div.form-readonly-content");
	          var openbillid = ctrl.headTable.getCurrentRow().getValue("pk_contractno");
	          div.html("<a href='###' title='联查合同' style='text-decoration:none;' onclick='linkpaycontract(\""+openbillid+"\");'>"+div.text()+"</a>");
	          return;
	        }
	     });
    }
    function showerror(data){
		if(!data.message){
			data.message="无数据";
			ctrl.viewModel.userGrid.setDataSource(null);
		}
		$('#get-more').hide();
		$("#grid1-view").hide();
		$.showMessageDialog({type:"info",title:"提示",msg: data.message,backdrop:true});
	}
     
     /**
	 * 联查合同
	 */
	linkpaycontract = function(e){
			var openbillid = ctrl.viewModel.headform.getCurrentRow().data['pk_contractno'].value;
			var pk_org = ctrl.viewModel.headform.getCurrentRow().data['pk_org'].value;
			if(openbillid==null||openbillid==""||openbillid==undefined){
				$.showMessageDialog({type:"info",title:"温馨提醒",msg:"该单据未关联合同无法联查合同。",backdrop:true});
				return;
			}
			var localurl = window.location.href;
        	var parm ={};
			parm.openbillid = openbillid;
			$.ajax({
				url: "/iwebap/ApctPull/getpcbill"+"?_ts" +(new Date()).getTime(),
				type: "POST",
				data: parm,
				dataType: "json",
				async:true,
				success: function(data) {
					$.hideLoading();
					window.location.href = localurl;
					if(typeof data.success!="undefined"){
						if(data.success=="false"){
							showerror(data);	
						}else{
							window.myJson=data;
							var templateName=data.templateName;
							var userid=data.userid;
							var nodecode = data.nodecode;
							var tradetype = data.tradetype;
						    var templateNameKey = Math.random();
							var keyURL = Math.random();
							var localUrl = window.location.href;
							localUrl = localUrl.substring(0,localUrl.indexOf("&LOCALURLEND")+12);
							localStorage.setItem(keyURL,localUrl);
							localStorage.setItem(templateNameKey,decodeURIComponent(getRequest().templateName));
				 			// 跳转卡片页面
				 			var vo = data.apcttransferVO;//VO 
							$.ajax({
								type: 'GET',
								url: '/iwebap/nodeurl/Finder?templateType=0&funNode='+nodecode+'&nodeKey='+ tradetype +'&pageTemplate=apctcard.html'+"&_ts" +(new Date()).getTime(),
								dataType: 'json',
								success: function (data) {
									if(data["url"] && (openbillid==null || openbillid=="undefined" || openbillid=="")){
										var ahref=window.ctx+data["url"] + "?uid="+userid+"&tradetype="+tradetype+"&nodecode="+nodecode+"&templateNameKey="+templateNameKey+"&templateName="+templateName+"&keyURL="+keyURL+"&pageNum="+0+"&source=addOne&_ts=" +(new Date()).getTime()+"#/add";
										window.open(ahref);
									}else if(data["url"] ){
										var ahref=window.ctx+data["url"] + "?uid="+userid+"&openbillid="+ openbillid + "&pk_org=" + pk_org+  "&uid=" + userid+ "&userid=" + userid + "&tradetype="+tradetype+"&nodecode="+nodecode+"&templateNameKey="+templateNameKey+"&templateName="+templateName+"&keyURL="+keyURL+"&pageNum="+0+"&source=pullOne&_ts=" +(new Date()).getTime()+"#/view/"+openbillid;
										window.open(ahref);
									}else{
										showerror(data);
									}
								},
								error:showerror
							});

						}
					}else{
						showerror(data);	
					}
				},
				error:showerror
			});
	}
//end @sscct@合同模块补丁合并增加--20170701

	function registerEvent() {
		var dataTables = ctrl.app.getDataTables();
		var pk_billtemplet = pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		for(var tid in dataTables){
			dataTables[tid].on('valueChange',function(event){
				if(checkLinkAttr(event)||checkLinkRefAttr(event)){
					if(event.dataTable == ctrl.dataTableIDs.head){
						if(event.field==="pk_org"){//修改表头组织后的处理
							ctrl.mainOrg.getCurrentRow().setValue("pk_org", event.newValue);//给组织面板赋值
							ctrl.mainOrg.getCurrentRow().setMeta("pk_org", 'display', ctrl.headTable.getCurrentRow().data.pk_org.meta.display);
							ctrl.processOrgChanged(event); //主组织改变后处理
							$("#body_1er_bxcontrast_content_edit_menu").hide();//隐藏冲销页签的编辑按钮
							if (event.newValue == null || event.newValue == "") {
								return;
							}
						}
						var serverEvent = ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').addParameter("tableID",event.dataTable).addParameter("field",event.field).addParameter("newValue",""+event.newValue).addParameter("oldValue",""+event.oldValue);
						if(event.field==="jkbxr" && window.referDataTemp && window.referDataTemp[0] && window.referDataTemp[0]["bd_psnjob.pk_psnjob"]){//修改表头借款报销人，取连带出来的任职信息
							var pk_psnjob = window.referDataTemp[0]["bd_psnjob.pk_psnjob"];
							serverEvent.addParameter("pk_psnjob",pk_psnjob);
						}
						serverEvent.fire({
							ctrl:'JKBXLinkAttrController',
							method:'valueChanged',
							async : false,
							success: function(data){
								//start @sscct@合同模块补丁合并增加--20170701
								if(ctrl.headTable.meta['pk_contractno']!=null && event.field=="hbbm"){
									var contractcodeRefparam = {};
									if(ctrl.headTable.meta['pk_contractno'].refparam){
										contractcodeRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
									}
									contractcodeRefparam.hbbm = event.newValue;
									ctrl.headTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   // ctrl.bodyTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   	if(ctrl.headTable.getCurrentRow().getValue("pk_contractno")!=null && ctrl.headTable.getCurrentRow().getValue("pk_contractno")!=undefined  && !("pull" == getRequestString("source") || ("pullOne" == getRequestString("source"))))
								    ctrl.headTable.getCurrentRow().setValue("pk_contractno","");
								    var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
								    localStorage.setItem(getRequest().tradetype== undefined?"":getRequest().tradetype+getCookie("userid")+"付款合同-undefined-undefined-"+defOrg, JSON.stringify([]));

								}
								if(ctrl.headTable.meta['pk_contractno']!=null && event.field=="bzbm"){
									var contractcodeRefparam = {};
									if(ctrl.headTable.meta['pk_contractno'].refparam){
										contractcodeRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
									}
									contractcodeRefparam.bzbm = event.newValue;
									ctrl.headTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   // ctrl.bodyTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   	if(ctrl.headTable.getCurrentRow().getValue("pk_contractno")!=null && ctrl.headTable.getCurrentRow().getValue("pk_contractno")!=undefined  && !("pull" == getRequestString("source") || ("pullOne" == getRequestString("source"))))
								    ctrl.headTable.getCurrentRow().setValue("pk_contractno","");
								    var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
								    localStorage.setItem(getRequest().tradetype== undefined?"":getRequest().tradetype+getCookie("userid")+"付款合同-undefined-undefined-"+defOrg, JSON.stringify([]));
								    
								}
								if(ctrl.headTable.meta['pk_contractno']!=null && event.field=="qcbz"){
									var contractcodeRefparam = {};
									if(ctrl.headTable.meta['pk_contractno'].refparam){
										contractcodeRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
									}
									contractcodeRefparam.qcbz = event.newValue;
									ctrl.headTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   // ctrl.bodyTable.setMeta('pk_contractno','refparam',JSON.stringify(contractcodeRefparam));
								   var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
								   localStorage.setItem(getRequest().tradetype== undefined?"":getRequest().tradetype+getCookie("userid")+"付款合同-undefined-undefined-"+defOrg, JSON.stringify([]));
								   
								}
								
								//end  @sscct@合同模块补丁合并增加--20170701					
							}
						});				
					}else{
						ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs).addParameter("tableID",event.dataTable).addParameter("field",event.field).addParameter("newValue",""+event.newValue).addParameter("oldValue",""+event.oldValue).fire({
							ctrl:'JKBXLinkAttrController',
							method:'valueChanged',
							async : false,
							success: function(data){
							}
						});					
					}
				}
				var type = event.dataTable.split("_")[0];
				var visibleParams=ctrl.getVisibleSettingParams();
				if(type == "body" && visibleParams){
					if(visibleParams){
						$.each(visibleParams,function(reskey,resvalue){
							if(reskey===event.field){
								var dataTable = ctrl.app.getDataTables()[event.dataTable];
								ctrl.setFieldVisible4Edit(dataTable,true);//设置字段可见性
							}
						});
					}
				}
				// if(checkReimAttr(event)){//重新获取报销标准
				// 	ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').setEvent(event).addParameter("pk_billtemplet", pk_billtemplet).fire({
				// 		ctrl:'JKBXLinkAttrController',
				// 		method:'handleReim',
				// 		async : false,
				// 		success: function(data){
			
				// 		}
				// 	});		
				// }
			});
		}
	}

	function rowSaved(tableCode){
		// setTableCode();//设置页签编码
		// headTotal();//表体增行时触发表头合计金额计算
		// if(appModel.uiState == $.UIState.ADD && $(".row-fluid.clearfix.row-submit")[0].style.display == 'none'){
		// 	$(".row-fluid.clearfix.row-submit").show();
		// }
		// ctrl.app.getDataTables()[tableCode].removeRow(-1);//删一次不存在的行只是为了触发ctrl.viewModel.getTotalMoney计算合计金额，此处不是正解
		setTableCode();//设置页签编码
		headTotal();//表体增行时触发表头合计金额计算
		//event.dataTable = tableCode;
		//var datatableArray = new Array(tableCode);
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs).addParameter("pk_billtemplet", ctrl.app.getClientAttribute("pk_billtemplet")).addParameter("tableID",tableCode).fire({
			ctrl: 'JKBXLinkAttrController',
			method: 'rowSaved',
			async: false,
			success: function(data) {
				//setTableCode();//设置页签编码
				//headTotal();//表体增行时触发表头合计金额计算
				if(appModel.uiState == $.UIState.ADD && $(".row-fluid.clearfix.row-submit")[0].style.display == 'none'){
					$(".row-fluid.clearfix.row-submit").show();
				}
				ctrl.app.getDataTables()[tableCode].removeRow(-1);//删一次不存在的行只是为了触发ctrl.viewModel.getTotalMoney计算合计金额，此处不是正解
			}
		});
	}

	//行保存前
	ctrl.beforeSave = function(event){
		var dataTable = ctrl.app.getDataTables()[event.id];
		var nullFields = ctrl.getVisableFieldIsNull(dataTable);
		//行保存时检查动态显示字段是否为空，如果为空则报错
		if(nullFields!=""){
			nullFields = nullFields.substring(1);
			$.showMessageDialog({type:"info",title:"提示",msg:"字段："+nullFields+"，不能为空！",backdrop:true});
			return false;
		}else{
			return true;
		}
	}

	//行保存时检查动态显示字段是否为空
	ctrl.getVisableFieldIsNull = function(dataTable){
		var nullFields = "";
		var params=ctrl.getVisibleSettingParams();
		if(params){
			$.each(params,function(reskey,resvalue){
			    if(dataTable.getCurrentRow().data[reskey]==undefined || dataTable.getCurrentRow().data[reskey]=="undefined"  || dataTable.getCurrentRow().data[reskey]==null)
			    {//donothing
			    }else{
					var srcValue = dataTable.getCurrentRow().data[reskey].value;
					if(resvalue[srcValue]){
						var showFieldsArr = resvalue[srcValue].split(",");
						for(var i=0;i<showFieldsArr.length;i++){
							if(!dataTable.getCurrentRow().data[showFieldsArr[i]].value 
								|| dataTable.getCurrentRow().data[showFieldsArr[i]].value==""){
								var fieldName = dataTable.meta[showFieldsArr[i]].label;
								nullFields = nullFields + "，" +fieldName;
							}
						}
					}
				}
			});
		}
		return nullFields;
	}

	//行保存后
	ctrl.afterSave = function(event){
		rowSaved(event.id);
		setStampCurrentRow(event.id);//根据是否超标设置印章效果
		//设置字段可见性
		var dataTable = ctrl.app.getDataTables()[event.id];
		ctrl.setFieldVisible4Browsing(dataTable);
		ctrl.setFieldVisible4List(dataTable);
	}

	//行删除
	ctrl.afterDelete = function(event){
		//设置字段可见性
		var dataTable = ctrl.app.getDataTables()[event.id];
		ctrl.setFieldVisible4Edit(dataTable);//设置编辑区字段的可见性
		ctrl.setFieldVisible4List(dataTable);//设置列表字段的可见性
	}

	//行复制
	ctrl.afterCopy = function(dataTable){
		dataTable.getCurrentRow().setValue("pk_busitem",null);
		setStampCurrentRow(dataTable.id);//根据是否超标设置印章效果
		ctrl.setFieldVisible4Edit(dataTable);//设置字段可见性
	}

	//行插入
	ctrl.afterAdd = function(dataTable){
		var bodyRow = dataTable.getCurrentRow();
		var headRowData = ctrl.headTable.getCurrentRow().data;
		if(bodyRow.data.paytarget){
			bodyRow.setValue("paytarget",headRowData.paytarget.value);
		}
		if(bodyRow.data.hbbm){
			bodyRow.setValue("hbbm",headRowData.hbbm.value);
		}
		if(bodyRow.data.customer){
			bodyRow.setValue("customer",headRowData.customer.value);
		}
		if(bodyRow.data.custaccount){
			bodyRow.setValue("custaccount",headRowData.custaccount.value);
		}
		if(bodyRow.data.freecust){
			bodyRow.setValue("freecust",headRowData.freecust.value);
		}
		
		setRowEnable(dataTable);
		ctrl.handleRowRef(dataTable);//处理行参照过滤
		ctrl.setFieldVisible4Edit(dataTable);//设置字段可见性
		if("body_1er_cshare_detail"===dataTable.id){//分摊页签
			ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
				ctrl: 'JKBXLinkAttrController',
				method: 'calAssumeAmount',
				async: false,
				success: function(data) { 
				}   
			});
		}
	}

	//行取消
	ctrl.afterCancel = function(event){
		//设置字段可见性
		var dataTable = ctrl.app.getDataTables()[event.id];
		ctrl.setFieldVisible4Browsing(dataTable);
	}

	//行修改
	ctrl.afterEdit = function(dataTable){
		setRowEnable(dataTable);
		ctrl.handleRowRef(dataTable);//处理行参照过滤
		ctrl.setFieldVisible4Edit(dataTable);//设置字段可见性
	}
	function setRowEnable(dataTable){
		var rowData = dataTable.getCurrentRow().data;
		var groupbbhl = rowData.groupbbhl.value;
		if(groupbbhl=="1" || groupbbhl == 1 || groupbbhl == new bignumber(1)){	
			dataTable.setMeta('groupbbhl','enable',"false");
		}else{
			dataTable.setMeta('groupbbhl','enable',"true");
		}
		var bbhl = rowData.bbhl.value;
		if(bbhl=="1" || bbhl == 1 || bbhl == new bignumber(1)){	
			dataTable.setMeta('bbhl','enable',"false");
		}else{
			dataTable.setMeta('bbhl','enable',"true");
		}
		var globalbbhl = rowData.globalbbhl.value;
		if(globalbbhl=="1" || globalbbhl == 1 || globalbbhl == new bignumber(1)){	
			dataTable.setMeta('globalbbhl','enable',"false");
		}else{
			dataTable.setMeta('globalbbhl','enable',"true");
		}
		// 收款对象
		if(rowData.paytarget){
			var paytarget = rowData.paytarget.value;
			if(paytarget == "0"){//员工
				dataTable.setMeta('custaccount','enable',"false");
				dataTable.setMeta('skyhzh','enable',"true");
			}else if (paytarget == "1"){//供应商
				dataTable.setMeta('custaccount','enable',"true");
				dataTable.setMeta('skyhzh','enable',"false");
			}else if (paytarget == "2"){//客户
				dataTable.setMeta('custaccount','enable',"true");
				dataTable.setMeta('skyhzh','enable',"false");
			}
		}
		//散户
		if(rowData.freecust && rowData.freecust.value){
			dataTable.setMeta('freecust','enable',"true");
		}
	}

	//行新增
	ctrl.afterRowAdd = function(event){
		var dataTable = ctrl.app.getDataTables()[event.id];
		// 调用行插入操作
		ctrl.afterAdd(dataTable);
	}

	//切换到详细视图，主要处理字段的可见性
	ctrl.afterDetailLoad = function(event){
		var dataTable = ctrl.app.getDataTables()[event.id];
		ctrl.setFieldVisible4Browsing(dataTable);
	}

	//判断dataTable是否是业务的
	ctrl.isBusitemTable = function(dataTable){
		var isBusi = false;
		for(var i=0;i<ctrl.busitemTables.length;i++){
			if(ctrl.busitemTables[i].id===dataTable.id){
				isBusi = true;
				break;
			}
		}
		return isBusi;
	}

	ctrl.getVisibleSettingParams = function(){
		if(ctrl.visibleSettingParams===undefined){
			var param = {};
			param.pk_org = ctrl.headTable.getCurrentRow().data.pk_org.value;
			param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
			$.ajax({
				type: "POST",
				url: "/iwebap/jkbx_maintain_ctr/getVisibleSettingParams",
				data: param,
				async: false,
				dataType: "json",
				success: function(result) {
					if(result.success){
						ctrl.visibleSettingParams = result.paramMap;
					}
				}
			});
		}
		return ctrl.visibleSettingParams;
	}

	ctrl.resetVisibleSettingParams = function(){
		var param = {};
		param.pk_org = ctrl.headTable.getCurrentRow().data.pk_org.value;
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		$.ajax({
			type: "POST",
			url: "/iwebap/jkbx_maintain_ctr/getVisibleSettingParams",
			data: param,
			async: false,
			dataType: "json",
			success: function(result) {
				if(result.success){
					ctrl.visibleSettingParams = result.paramMap;
				}
			}
		});
		return ctrl.visibleSettingParams;
	}

	//设置浏览态所有业务页签列表中字段的可见性
	ctrl.setFieldVisible4ListAll = function(){
		for(var i=0;i<ctrl.busitemTables.length;i++){
			ctrl.setFieldVisible4List(ctrl.busitemTables[i]);
		}
	}

	//设置浏览态某个业务页签列表中字段的可见性
	ctrl.setFieldVisible4List = function(dataTable){
		if(!ctrl.isBusitemTable(dataTable)){//如果不是业务页签，返回
			return;
		}
		var params=ctrl.getVisibleSettingParams();
		if(params){
			$.each(params,function(reskey,resvalue){
				if(resvalue && resvalue.allFields){
					var allFieldsArr=resvalue.allFields.split(",");
					var allRows = dataTable.getAllRows();
					for(var i=0;i<allFieldsArr.length;i++){
						var fieldVisible = false;
						for(var j=0;j<allRows.length;j++){
							if(allRows[j].data[allFieldsArr[i]].value){
								fieldVisible = true;
								break;
							}
						}
						var index = $($("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']")).index();
						if(fieldVisible){
							$("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']").show();
							for(var k=0;k<allRows.length;k++){
								$($($("#"+dataTable.id+"_content_tbody").find("tr")[k]).find("td")[index]).show();
							}	
						}else{
							$("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']").hide();
							for(var k=0;k<allRows.length;k++){
								$($($("#"+dataTable.id+"_content_tbody").find("tr")[k]).find("td")[index]).hide();
							}
						}
					}
				}
			});
		}



		if(params && params.srcField && params.allFields){
			var allFieldsArr=params.allFields.split(",");
			var allRows = dataTable.getAllRows();
			for(var i=0;i<allFieldsArr.length;i++){
				var fieldVisible = false;
				for(var j=0;j<allRows.length;j++){
					if(allRows[j].data[allFieldsArr[i]].value){
						fieldVisible = true;
						break;
					}
				}
				var index = $($("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']")).index();
				if(fieldVisible){
					$("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']").show();
					for(var k=0;k<allRows.length;k++){
						$($($("#"+dataTable.id+"_content_tbody").find("tr")[k]).find("td")[index]).show();
					}	
				}else{
					$("#"+dataTable.id+"_header_thead").find(".u-grid-header-th[data-filed='"+allFieldsArr[i]+"']").hide();
					for(var k=0;k<allRows.length;k++){
						$($($("#"+dataTable.id+"_content_tbody").find("tr")[k]).find("td")[index]).hide();
					}
				}
			}
		}
	}

	//设置浏览态所有业务页签上每行详细视图中字段的可见性
	ctrl.setFieldVisible4BrowsingAll = function(){
		for(var i=0;i<ctrl.busitemTables.length;i++){
			ctrl.setFieldVisible4Browsing(ctrl.busitemTables[i]);
		}
	}

	//设置浏览态某个页签上每行详细视图中字段的可见性，实现不同行显示不同字段
	ctrl.setFieldVisible4Browsing = function(dataTable){
		if(!ctrl.isBusitemTable(dataTable)){//如果不是业务页签，返回
			return;
		}
		var params=ctrl.getVisibleSettingParams();
		if(params){
			$.each(params,function(reskey,resvalue){
				if(resvalue && resvalue.allFields){
					var rows = dataTable.getAllRows();
					for(var i=0;i<rows.length;i++){
						var allFieldsArr=resvalue.allFields.split(",");
						for(var j=0;j<allFieldsArr.length;j++){
							$($("#detailtab_"+dataTable.id).find(".receipt-details[field='"+allFieldsArr[j]+"']")[i]).hide();
						}
						var srcValue = rows[i].data[reskey].value;
						if(resvalue[srcValue]){
							var showFieldsArr = resvalue[srcValue].split(",");
							for(var j=0;j<showFieldsArr.length;j++){
								$($("#detailtab_"+dataTable.id).find(".receipt-details[field='"+showFieldsArr[j]+"']")[i]).show();
							}
						}
					}
				}
			});
		}
	}

	//设置编辑态所有业务页签上编辑区中字段的可见性
	ctrl.setFieldVisible4EditAll = function(){
		for(var i=0;i<ctrl.busitemTables.length;i++){
			ctrl.setFieldVisible4Edit(ctrl.busitemTables[i]);
		}
	}

	//设置编辑态某个页签上编辑区中字段的可见性，实现不同行显示不同字段
	ctrl.setFieldVisible4Edit = function(dataTable,needClear) {
		if(!ctrl.isBusitemTable(dataTable)){//如果不是业务页签，返回
			return;
		}
		var params=ctrl.getVisibleSettingParams();
		if(params){
			$.each(params,function(reskey,resvalue){
				if(resvalue && resvalue.allFields){
					var allFieldsArr=resvalue.allFields.split(",");
					for(var j=0;j<allFieldsArr.length;j++){
						$("#"+dataTable.id+"_edit_"+allFieldsArr[j]).parent().hide();
						$("fieldset[fieldname='detial_"+dataTable.id.substring(5)+"_"+allFieldsArr[j]+"']").hide();
						if(needClear){
							dataTable.getCurrentRow().setValue(allFieldsArr[j],null);
						}
					}
					var srcValue = dataTable.getCurrentRow().data[reskey].value;
					if(resvalue[srcValue]){
						var showFieldsArr = resvalue[srcValue].split(",");
						for(var j=0;j<showFieldsArr.length;j++){
							$("#"+dataTable.id+"_edit_"+showFieldsArr[j]).parent().show();
							$("fieldset[fieldname='detial_"+dataTable.id.substring(5)+"_"+showFieldsArr[j]+"']").show();
						}
					}
				}
			});
		}	
	}

	//清空并隐藏编辑态所有业务页签上编辑区中的被控制字段
	ctrl.hideField4EditAll = function(){
		for(var i=0;i<ctrl.busitemTables.length;i++){
			ctrl.hideField4Edit(ctrl.busitemTables[i]);
		}
	}

	//清空并隐藏编辑态某个业务页签上编辑区中的被控制字段
	ctrl.hideField4Edit = function(dataTable) {
		if(!ctrl.isBusitemTable(dataTable)){//如果不是业务页签，返回
			return;
		}
		var params=ctrl.getVisibleSettingParams();
		if(params){
			$.each(params,function(reskey,resvalue){
				if(resvalue && resvalue.allFields){
					var allFieldsArr=resvalue.allFields.split(",");
					for(var j=0;j<allFieldsArr.length;j++){
						$("#"+dataTable.id+"_edit_"+allFieldsArr[j]).parent().hide();
						$("fieldset[fieldname='detial_"+dataTable.id.substring(5)+"_"+allFieldsArr[j]+"']").hide();
						dataTable.getCurrentRow().setValue(allFieldsArr[j],null);
					}
				}
			});
		}	
	}

	//处理行参照过滤
	ctrl.handleRowRef = function(dataTable){
		var rowData = dataTable.getCurrentRow().data;
		var skyhzhRefparam = {};//收款银行账户
		if(dataTable.meta['skyhzh'] && dataTable.meta['skyhzh'].refparam){
			skyhzhRefparam = JSON.parse(dataTable.meta['skyhzh'].refparam);
			var receiver = rowData.receiver.value;
			var bzbm = rowData.bzbm.value;
			var dwbm = rowData.dwbm.value;
			var wherePart = " and pk_psndoc = '" + receiver + "' and pk_currtype = '" + bzbm + "'";
			skyhzhRefparam.wherePart = wherePart;
			skyhzhRefparam.pk_org = dwbm;
			dataTable.setMeta('skyhzh','refparam',JSON.stringify(skyhzhRefparam));
		}
		var custaccountRefparam={};//客商银行账户
		if(dataTable.meta['custaccount'] && dataTable.meta['custaccount'].refparam){
			custaccountRefparam = JSON.parse(dataTable.meta['custaccount'].refparam);
			var dwbm = rowData.dwbm.value;
			var bz = rowData.bzbm.value;
			var paytarget = rowData.paytarget.value;
			if (paytarget == "1"){//供应商
				var hbbm = rowData.hbbm.value;
				var wherePart = " and (pk_cust='"+hbbm+"' and pk_bankaccsub in (select t.pk_bankaccsub from bd_bankaccsub t where t.pk_bankaccsub = pk_bankaccsub and t.pk_currtype = '"+bz+"')  and pk_custbank IN ( SELECT   min(pk_custbank) FROM   bd_custbank GROUP BY pk_bankaccsub,pk_cust) )";
				custaccountRefparam.wherePart = wherePart;
				custaccountRefparam.pk_cust = hbbm;
			}else if (paytarget == "2"){//客户
				var customer = rowData.customer.value;
				var wherePart = " and (pk_cust='"+customer+"' and pk_bankaccsub in (select t.pk_bankaccsub from bd_bankaccsub t where t.pk_bankaccsub = pk_bankaccsub and t.pk_currtype = '"+bz+"')  and pk_custbank IN ( SELECT   min(pk_custbank) FROM   bd_custbank GROUP BY pk_bankaccsub,pk_cust) )";
				custaccountRefparam.wherePart = wherePart;
				custaccountRefparam.pk_cust = customer;
			}
			custaccountRefparam.pk_org = dwbm;
			var cfgParam = {};
			cfgParam.refModelHandlerClass="nc.web.erm.utils.ERMRefModelHandler";
			cfgParam.refUIType="RefGrid";
			dataTable.setMeta('custaccount','refparam',JSON.stringify(custaccountRefparam));
			dataTable.setMeta('custaccount','cfgParam',JSON.stringify(cfgParam));
		}
		var assumedeptRefparam = {};//分摊页签，费用承担部门
		if(dataTable.meta['assume_dept'] && dataTable.meta['assume_dept'].refparam){
			assumedeptRefparam = JSON.parse(dataTable.meta['assume_dept'].refparam);
			var assume_org = rowData.assume_org.value;
			assumedeptRefparam.pk_org = assume_org;
			dataTable.setMeta('assume_dept','refparam',JSON.stringify(assumedeptRefparam));
		}
		var pk_iobsclassRefparam = {};//分摊页签，收支项目
		if(dataTable.meta['pk_iobsclass'] && dataTable.meta['pk_iobsclass'].refparam){
			pk_iobsclassRefparam = JSON.parse(dataTable.meta['pk_iobsclass'].refparam);
			var assume_org = rowData.assume_org.value;
			pk_iobsclassRefparam.pk_org = assume_org;
			dataTable.setMeta('pk_iobsclass','refparam',JSON.stringify(pk_iobsclassRefparam));
		}
		var jobidRefparam = {};//分摊页签，项目
		if(dataTable.id==='body_1er_cshare_detail' && dataTable.meta['jobid'] && dataTable.meta['jobid'].refparam){
			jobidRefparam = JSON.parse(dataTable.meta['jobid'].refparam);
			var assume_org = rowData.assume_org.value;
			jobidRefparam.pk_org = assume_org;
			dataTable.setMeta('jobid','refparam',JSON.stringify(jobidRefparam));
		}
		var jkbxrRefparam = {};//借款报销人
		if(dataTable.meta['jkbxr'] && dataTable.meta['jkbxr'].refparam){
			jkbxrRefparam = JSON.parse(dataTable.meta['jkbxr'].refparam);
			var dwbm = rowData.dwbm.value;
			jkbxrRefparam.pk_org = dwbm;
			dataTable.setMeta('jkbxr','refparam',JSON.stringify(jkbxrRefparam));
		}
		var receiverRefparam = {};//收款人
		if(dataTable.meta['receiver'] && dataTable.meta['receiver'].refparam){
			receiverRefparam = JSON.parse(dataTable.meta['receiver'].refparam);
			var dwbm = rowData.dwbm.value;
			receiverRefparam.pk_org = dwbm;
			dataTable.setMeta('receiver','refparam',JSON.stringify(receiverRefparam));
		}
		var deptidRefparam = {};//报销人部门
		if(dataTable.meta['deptid'] && dataTable.meta['deptid'].refparam){
			deptidRefparam = JSON.parse(dataTable.meta['deptid'].refparam);
			var dwbm = rowData.dwbm.value;
			deptidRefparam.pk_org = dwbm;
			dataTable.setMeta('deptid','refparam',JSON.stringify(deptidRefparam));
		}
		var freecustRefparam = {};//散户
		if(dataTable.meta['freecust'] && dataTable.meta['freecust'].refparam){
			var pk_customsupplier = '';
			freecustRefparam = JSON.parse(dataTable.meta['freecust'].refparam);
			if (rowData.hbbm.value && isFreecust('supplier',rowData.hbbm.value) ) {
				pk_customsupplier = rowData.hbbm.value;
			}else if(rowData.customer.value && isFreecust('customer',rowData.customer.value)){
				pk_customsupplier = rowData.customer.value;
			}
			freecustRefparam.pk_customsupplier = pk_customsupplier;
			dataTable.setMeta('freecust','refparam',JSON.stringify(freecustRefparam));
		}
	}

	function showAttachNum(openbillid) {
		$.ajax({
			type: "POST",
			url: "/iwebap/filenum/" + openbillid,
			dataType: "json",
			success: function(result) {
				if(!result.success){
					$.showMessageDialog({type: "info",title: "查询附件数量",msg: '查询附件数量失败！',backdrop:true});
				}else{
					$('#accessorymanagement').html('附件查看'+'('+'<span style="color:red">'+result.fileNum+'</span>'+')');
				}
			}	
		});
	}
	function setStampAll(){
		var $img = "<img src='/iwebap/css/img/chaobiao.png' class='chaobiao'>"					
		//var $img_end = "<img src='../../../../../../../../../css/img/chaobiao_rectangle.png' class='chaobiao_end'>"
		for(var j= 0;j<ctrl.busitemTables.length;j++){
			var $allrows = ctrl.busitemTables[j].getAllRows();
			var $currentrow_xh = $('#'+ctrl.busitemTables[j].id+'_content_numCol .u-grid-content-num');
			//var $currentrow_end = $('#'+ctrl.busitemTables[j].id+'_content_tbody .oper_td');
			var allrowslenght = $allrows.length;
			for(var i=0;i<allrowslenght;i++){
				if($allrows[i].data.sfcb){
					var sfcbvalue = $allrows[i].data.sfcb.value;
					if(sfcbvalue=='Y'){
						$($currentrow_xh[i]).append($img);
						//$($currentrow_end[i]).append($img_end);
					}
				}
				
			}
		}
	}

	function setStampCurrentRow(tablecode){
		var $img = "<img src='/iwebap/css/img/chaobiao.png' class='chaobiao'>"					
		for(var j= 0;j<ctrl.busitemTables.length;j++){
			if(ctrl.busitemTables[j].id===tablecode){
				var $allrows = ctrl.busitemTables[j].getAllRows();
				var $currentrow_xh = $('#'+ctrl.busitemTables[j].id+'_content_numCol .u-grid-content-num');
				var allrowslenght = $allrows.length;
				//var currentrowid = ctrl.busitemTables[j].getCurrentRow().rowId;
				for(var i=0;i<allrowslenght;i++){
					//if($allrows[i].rowId===currentrowid){
						if($allrows[i].data.sfcb){
							var sfcbvalue = $allrows[i].data.sfcb.value;
							if(sfcbvalue=='Y'){
								$($currentrow_xh[i]).append($img);//打上超标印记
							}else{
								$($currentrow_xh[i]).children().remove();//去掉超标印记
							}
							//break;
						}
					//}
				}
				break;
			}
		}
	}

	function setTableCode(){
		if(appModel.uiState == $.UIState.NOT_EDIT){
			return; 
		}
		for(var i=0;i<ctrl.busitemTables.length;i++){
			var tableCode = ctrl.busitemTables[i].id.substring(6);//去掉body_1，截取tabcode
			if(null!==ctrl.busitemTables[i].getCurrentRow() && undefined!==ctrl.busitemTables[i].getCurrentRow()
//				&&  new bignumber(ctrl.busitemTables[i].getCurrentRow().data.amount.value) != 0 
				){
				ctrl.busitemTables[i].getCurrentRow().setValue("tablecode",tableCode);
			}
		}
	}

	function headTotal(){
		if(appModel.uiState == $.UIState.NOT_EDIT){ 
			return;
		}
		var nodecode = getRequest().nodecode;
		var busiitemfield = ["amount", "ybje", "ybye", "cjkybje", "zfybje", "hkybje", "bbje", "bbye", 
		"cjkbbje", "zfbbje", "hkbbje", "globalbbje", "globalbbye", "globalcjkbbje", "globalzfbbje", "globalhkbbje", 
		"groupbbje", "groupbbye", "groupcjkbbje", "groupzfbbje", "grouphkbbje", "tax_amount", "orgtax_amount", "grouptax_amount", "globaltax_amount", 
		"tni_amount", "orgtni_amount", "grouptni_amount", "globaltni_amount", "vat_amount", "orgvat_amount", "groupvat_amount", "globalvat_amount"];
		var busiitemtotal = [new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),
		new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0),new ctrl.bignumber(0)];

		for(var tabIndex=0;tabIndex<ctrl.busitemTables.length;tabIndex++){//循环表体页签
			//默认每个页签每行都打开一行，计算表头合计金额有误，每行都减去一行，将没点确定的行剔除
			var rowlength = ctrl.busitemTables[tabIndex].getAllRows().length-1; //业务行页签表体行个数
			for(var i=0; i < rowlength; i++){
				//if(i == rowlength-1) continue;  
				var busitemrow = ctrl.busitemTables[tabIndex].getAllRows()[i];
				for(var j=0; j<busiitemfield.length; j++){
					if(null!==busitemrow.data[busiitemfield[j]] && undefined!==busitemrow.data[busiitemfield[j]] 
						&& null!==busitemrow.data[busiitemfield[j]].value && undefined!==busitemrow.data[busiitemfield[j]]){
						busiitemtotal[j] = busiitemtotal[j].plus(new ctrl.bignumber(busitemrow.data[busiitemfield[j]].value =="" ? "0.00" : busitemrow.data[busiitemfield[j]].value));
					}
				} 
			}
		}
		
		//修改表头金额信息
		ctrl.headTable.getCurrentRow().setValue("total",busiitemtotal[0].toString());//合计金额
		for(var i=1; i<busiitemfield.length; i++){
			if(null!=ctrl.headTable.getCurrentRow().data[busiitemfield[i]] 
				&& undefined!=ctrl.headTable.getCurrentRow().data[busiitemfield[i]]){
				ctrl.headTable.getCurrentRow().setValue(busiitemfield[i],busiitemtotal[i].toString());
			}			
		}
	}

	//增加表体合计
	ctrl.bodyTotal = function(dataTable){
		var dataTableID = dataTable.id;
		var rowTotal = 0;
	
		ctrl.viewModel.getRowNum = function(dataTable){
			return ko.pureComputed({		
				read: function(){
					if(appModel.uiState == 'not_edit'){
						rowTotal = dataTable.rows().length;
					}else{
						rowTotal = dataTable.rows().length-1;
					}
					return rowTotal;
				},
				write: function(value){
					
				},
				owner: this
			});
		}
		
		ctrl.viewModel.getTotalMoney = function(dataTable) {
			return ko.pureComputed({
				read: function(){
					//下面这段代码是为了触发ko的订阅事件，不清楚原因
					if(appModel.uiState == 'not_edit'){
						rowTotal = dataTable.rows().length;
					}else{
						rowTotal = dataTable.rows().length-1;
					}
					//上面这段代码是为了触发ko的订阅事件，不清楚原因
					var rows = dataTable.getAllRows();
					var totalNum = new ctrl.bignumber(0.00);
					var maxPrecision = 0;
					for(var i=0; i < rows.length; i++){
						var field = 'vat_amount';
						if(getRequest().tradetype.indexOf("263")>=0 || getRequest().tradetype==="2647"){
							field = "amount";
						}
						var rowPrecision = 0;
						if(rows[i].data[field].value){
							if(rows[i].data[field].meta && rows[i].data[field].meta.precision != undefined){
							rowPrecision = rows[i].data[field].meta.precision;
							}else{
								rowPrecision = rows[i].parent.meta[field].precision;
							}
							maxPrecision = rowPrecision > maxPrecision?rowPrecision:maxPrecision;
							if(rows[i].getValue(field)){
								totalNum = new ctrl.bignumber(totalNum).plus(new ctrl.bignumber(rows[i].getValue(field)));
							}
						}
								
					}
					totalNum = totalNum.toFormat(maxPrecision);
					return totalNum;
				},
				write: function(value){
					
				},
				owner: this
			});
		}	
		$("#"+ dataTableID + "_Desc").html('共&nbsp;&nbsp;<span data-bind="text:getRowNum('+ dataTableID + ')"></span>&nbsp;&nbsp;条,&nbsp;&nbsp;合计：&nbsp;&nbsp;<span data-bind="text:getTotalMoney('+ dataTableID + ')"></span>');
	}	

	ctrl.processOrgChanged = function(event) {
		if(ctrl.isCopy==="Y" || getRequestString("isCopyBtn")== "Y"){
			return;
		}
		if (appModel.uiState == $.UIState.NOT_EDIT) {
			return;
		}
		var dataTables = ctrl.app.getDataTables();
		if (event.newValue != event.oldValue) {
			setRefOrg(event.newValue, dataTables);
			for(var i=0;i<ctrl.busitemTables.length;i++){
				if (ctrl.busitemTables[i].getAllRows().length > 1) {
					ctrl.busitemTables[i].removeAllRows();
					ctrl.busitemTables[i].createEmptyRow();
					ctrl.busitemTables[i].setRowSelect(0);
				}
			}
			if(ctrl.contrastTable){
				ctrl.contrastTable.removeAllRows();
				ctrl.contrastTable.createEmptyRow();
				ctrl.contrastTable.setRowSelect(0);
			}
			if(ctrl.shareTable){
				ctrl.shareTable.removeAllRows();
				ctrl.shareTable.createEmptyRow();
				ctrl.shareTable.setRowSelect(0);
			}
			if (event.newValue == null || event.newValue == "") {
				ctrl.headTable.setEnable(false);
				for(var i=0;i<ctrl.busitemTables.length;i++){
					ctrl.busitemTables[i].setEnable(false);
				}
				if(ctrl.contrastTable){
					ctrl.contrastTable.setEnable(false);
				}
				if(ctrl.shareTable){
					ctrl.shareTable.setEnable(false);
				}	
				ctrl.headTable.setMeta("pk_org","enable",true);//组织改变后有可能为空，会造成单据所有字段不可编辑，这里需要把pk_org设置为可编辑
				$("#body_1bodys_content_edit_menu_add").attr('disabled', 'disabled');
				$("#editBtn").css("display","none");
				return;
			}
			ctrl.headTable.setEnable(true);
			for(var i=0;i<ctrl.busitemTables.length;i++){
				ctrl.busitemTables[i].setEnable(true);
			}
			if(ctrl.contrastTable){
				ctrl.contrastTable.setEnable(true);
			}
			if(ctrl.shareTable){
				ctrl.shareTable.setEnable(true);
			}
			$("#body_1bodys_content_edit_menu_add").removeAttr("disabled");
			$("#editBtn").css("display","block");
			ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs).addParameter("tableID",event.dataTable).addParameter("field",event.field).addParameter("newValue",""+event.newValue).addParameter("oldValue",""+event.oldValue).fire({
				ctrl: 'JKBXLinkAttrController',
				method: 'valueChanged',
				async: false,
				success: function(data) {
					ctrl.hideField4EditAll();//主组织改变后清空并隐藏编辑区的被控制字段
					var params=ctrl.resetVisibleSettingParams();//主组织改变后重新设置动态显示参数
					ctrl.setFieldVisible4EditAll();//重新设置编辑区字段的可见性
				}
			});
		}
	}

	ctrl.getValue = function(isValidate) {
		return ctrl.billForm.getValue(isValidate); 
	}

	function checkReimAttr(event){
		var tradetype = getRequest().tradetype;
		if(tradetype.indexOf("263")===0 || tradetype == "2647"){//借款单不和还款单不处理报销标准
			return false;
		}
		if(ctrl.reimDim.length==0){
			ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
				ctrl:'JKBXLinkAttrController',
				method:'getReimDimList',
				async : false,
				success: function(data){
					ctrl.reimDim = JSON.parse(data);
				}
			});	
		}
		return ctrl.reimDim.indexOf(event.field)>-1;
	}

	function checkLinkAttr(event) {
		var headLinkAttrs = ["jobid"/*项目*/,"pk_org"/*组织*/,"djrq"/*单据日期*/,"bzbm"/*币种*/,"bbhl"/*汇率*/,"dwbm_v"/*报销人单位*/,"dwbm","deptid_v"/*报销人部门_v*/,"deptid"
							,"jkbxr"/*借款报销人*/,"skyhzh"/*个人银行账户*/,"receiver"/*收款人*/,"fydeptid_v"/*费用承担部门_v*/,"fydeptid","fydwbm_v"/*费用承担单位_v*/,"fydwbm"/*费用承担单位_v*/,"pk_payorg_v"/*支付单位_v*/,"pk_payorg","szxmid"/*收支项目*/,"paytarget"/*收款对象*/,"hbbm"/*供应商*/,"customer"/*客户*/,"custaccount"/*客商银行账户*/,"freecust"/*散户*/];
		
		var bodyLinkAttrs = ["jkbxr","dwbm","receiver"/*收款人*/,"amount"/*报销金额*/,"ybje"/*含税原币金额*/,"vat_amount"/*含税原币金额*/,"tni_amount"/*无税原币金额*/,"tax_amount"/*原币税额*/,"bzbm"/*币种编码*/
							,"bbhl"/*汇率*/,"assume_org"/*承担单位*/,"assume_amount"/*承担金额*/,"tax_rate"/*税率*/,"paytarget"/*收款对象*/,"hbbm"/*供应商*/,"customer"/*客户*/];
		var type = event.dataTable.split("_")[0];
		if(type == "headform"){
			return headLinkAttrs.indexOf(event.field) > -1; 
		}
		if(type == "body"){
			return bodyLinkAttrs.indexOf(event.field) > -1;
		}
		return false;
	}
	
	function checkLinkRefAttr(event){
		var dataTables = ctrl.app.getDataTables();
		var tableid = event.dataTable;
		var id = event.field;
		var refcfg = dataTables[tableid].meta[id].refcfg;
		if(refcfg!=null){
			return true;
		}
		return false;
	}

	function loadData() {
		if(ctrl.isCopy==="Y" || getRequestString("isCopyBtn")== "Y"){
			return;
		}
		ctrl.dataTableIDs.push("mainOrg");
		ctrl.app.dataTables.mainOrg = ctrl.mainOrg;
		var pk_billtemplet = pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		$.showLoading();
		SetPk_orgNotEdit();
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,"all").addParameter("uistate", appModel.getUIState()).addParameter("pk_billtemplet", pk_billtemplet).fire({
			ctrl: 'JKBXDefDataController',
			method: 'loadData',
			async : false,
			success: function(data) {
				$.hideLoading();
				// 标记待摊初始化
				if($("#0arap_bxzb_isexpamt").length>0){
	                if($("#0arap_bxzb_isexpamt").is(':checked')){
	                  ctrl.headTable.setMeta("total_period","enable",true);
	                  ctrl.headTable.setMeta("start_period","enable",true);
	                } else {
	                  ctrl.headTable.setMeta("total_period","enable",false);
	                  ctrl.headTable.setMeta("start_period","enable",false);
	                }
	            }
				var tradetype = getRequest().tradetype;
				if(tradetype.indexOf("263")===0 || tradetype == "2647"){//借款单不显示冲借款按钮
					$(".row-submit #bfCjk").hide();
					$(".row-submit #dzfpaccessory").hide();
				}
				if(appModel.uiState == $.UIState.ADD && ctrl.isCopy!=="Y"){
					var needCheckPowerkeys = JSON.parse(data).needCheckPowerkeys;
					for(var i=0;i<needCheckPowerkeys.length;i++){
						ctrl.headTable.getCurrentRow().setValue(needCheckPowerkeys[i],'0001Z0100000000000XZ');
						if(ctrl.headTable.meta[needCheckPowerkeys[i]]){
							var defaultValue = ctrl.headTable.meta[needCheckPowerkeys[i]].default;
							if(defaultValue){
								ctrl.headTable.getCurrentRow().setValue(needCheckPowerkeys[i],defaultValue.value);
							}
						}
						
					}
					//$(".row-fluid.clearfix.row-submit").hide();
					for(var j = 0;j< ctrl.busitemTables.length;j++){
						if($("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save")){
							$("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save").hide();
						}
					}
				}
				if(tradetype.indexOf("264")===0  && tradetype != "2647"){//报销单是否分摊
					var iscostshare = ctrl.headTable.getCurrentRow().data.iscostshare.value;//分摊
					if("Y" === iscostshare){
						$("#bodytab_1er_cshare_detail").show();
					}else{
						$("#bodytab_1er_cshare_detail").hide();
					}
				}
				
				var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
				if (defOrg) {
					ctrl.mainOrg.getCurrentRow().setValue("pk_org", defOrg);
					ctrl.mainOrg.getCurrentRow().setMeta("pk_org", 'display', ctrl.headTable.getCurrentRow().data.pk_org.meta.display);
					setRefOrg(defOrg, ctrl.app.dataTables);
				} else {
					ctrl.headTable.setEnable(false);
					for(var i=0;i<ctrl.busitemTables.length;i++){
						ctrl.busitemTables[i].setEnable(false);
					}	
					if(ctrl.contrastTable){
						ctrl.contrastTable.setEnable(false);
					}
					if(ctrl.shareTable){
						ctrl.shareTable.setEnable(false);
					}	
					ctrl.headTable.setMeta("pk_org","enable",true);//组织改变后有可能为空，会造成单据所有字段不可编辑，这里需要把pk_org设置为可编辑				
					$("#body_1bodys_content_edit_menu_add").attr('disabled', 'disabled');
					$("#editBtn").css("display","none");
				}
				//if(appModel.uiState != $.UIState.ADD){
					rebuildEmptyRow(true);//重新为各个页签创建空行
				//}
				if(data && data!==""){
					if(JSON.parse(data).jkyjye || ""===JSON.parse(data).jkyjye){
						ctrl.jkyjye = JSON.parse(data).jkyjye;
					}
				}
				if(tradetype === "2647"){
					$("#grid_rowaddbtn_body_1arap_bxbusitem").hide();
					$("#rowadd_body_1arap_bxbusitem").hide();
					$("#detail_rowadd_body_1arap_bxbusitem").hide();
					$("#body_1arap_bxbusitem_content_tbody .oper_td").hide();
					$("#body_1er_bxcontrast_content_tbody .oper_td").hide();
					$("#detailEdit").hide();
					$("#detailDel").hide();
					$("#moreiconDetail").hide();
				}
				if(appModel.uiState == $.UIState.ADD || appModel.uiState == $.UIState.EDIT){
					$("#lianchaContainer").hide();
				}else{
					$("#lianchaContainer").show(); 
				}
				if($("#rowadd_body_1er_bxcontrast")){
					$("#rowadd_body_1er_bxcontrast").hide();
				}
				if($("#body_1er_bxcontrast_content_edit_menu_save")){
					$("#body_1er_bxcontrast_content_edit_menu_save").hide();
				}	
				setStampAll();//根据是否超标设置印章效果
				setBtnHide();//根据单据生效、审批状态设置按钮隐藏
				if(tradetype.indexOf("264")===0){//去掉核销预提明细的编辑按钮
					if($("#body_1accrued_verify_content_edit_menu")){
					   $("#body_1accrued_verify_content_edit_menu").remove();
				    }
					if($("#body_1accrued_verify_content_tbody .oper_td")){
						$("#body_1accrued_verify_content_tbody .oper_td").remove();
					}
					if($('#detail_rowadd_body_1accrued_verify')){
						$('#detail_rowadd_body_1accrued_verify').remove();
					}
					if($("#rowadd_body_1accrued_verify")){
						$("#rowadd_body_1accrued_verify").remove();
					}
					$('#body_tab_body_1accrued_verify ul li').eq(1).click(function(){

						$('#detail_rowadd_body_1accrued_verify').remove();
						$("#detailtab_body_1accrued_verify .oper_td").remove();
					});
				}
				
				// @sscct@合同模块补丁合并begin--20170701
		        if(appModel.uiState == $.UIState.NOT_EDIT){
                	ctrl.setPayContractLink();
                }
                // @sscct@合同模块补丁合并end--20170701
				//begin_guotg5  审批人修改设置合同参照过滤条件
				var headApctRefparam = {};
				if(ctrl.headTable.meta['pk_contractno']!=null && ctrl.headTable.meta['pk_contractno'].refparam){
					headApctRefparam = JSON.parse(ctrl.headTable.meta['pk_contractno'].refparam);
				}
				headApctRefparam.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
				if(ctrl.headTable.getCurrentRow()!=null && ctrl.headTable.getCurrentRow().data!=null)
				{
					headApctRefparam.pk_org = ctrl.headTable.getCurrentRow().data.pk_org.value;
					headApctRefparam.bzbm = ctrl.headTable.getCurrentRow().data.bzbm.value;
					headApctRefparam.qcbz = ctrl.headTable.getCurrentRow().data.qcbz.value;
					headApctRefparam.hbbm = ctrl.headTable.getCurrentRow().data.hbbm.value;
				}
				if (ctrl.headTable.getMeta('pk_contractno') != null)
					ctrl.headTable.setMeta('pk_contractno', 'refparam', JSON.stringify(headApctRefparam));
				var nameMultiLine = null;
				//借款单处理关联报批件
				if (getRequestString("tradetype").indexOf("263") >= 0) {
					nameMultiLine = new MultiLinePanel("0arap_jkzb_subject1", { lbl: "关联报批件", enable: true, dataTable: ctrl.headTable, titleField: "subject1", urlField: "url" });
					$("#0arap_jkzb_url").parent().children().hide(1);
				}
				//报销单处理关联报批件
				if (getRequest().tradetype.indexOf("264") >= 0) {
					nameMultiLine = new MultiLinePanel("0arap_bxzb_subject", { lbl: "关联报批件", enable: true, dataTable: ctrl.headTable, titleField: "subject", urlField: "url" });
					$("#0arap_bxzb_url").parent().children().hide(1);
				}
				//var nameMultiLine = new MultiLinePanel("0arap_bxzb_zyx11",{lbl:"关联报批件",enable:true,dataTable:ctrl.headTable,titleField:"subject",urlField:"url"});

				var messenger = new Messenger('parent', 'Messenger');
				// var eleCon = $("#0arap_bxzb_url").parent(); 
				messenger.listen(function (msg) {
					if (!msg) return;
					var re = new Array();//如果需返回多个变量，则采用数组把各个变量分开
					re = msg.split(";");

					var data = new Array();
					var re2 = null;
					for (var i = 0; i < re.length; i++) {
						re2 = re[i].split(",");
						data[i] = new Object();
						data[i].title = re2[0];
						data[i].url = re2[1];
					}
					nameMultiLine.setData(data);
				});
			}
		});
	}

	function loadData4Copy() {
		ctrl.dataTableIDs.push("mainOrg");
		var pk_billtemplet = pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		ctrl.app.dataTables.mainOrg = ctrl.mainOrg;
		$.showLoading();
		SetPk_orgNotEdit();
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,"all").addParameter("uistate", appModel.getUIState()).addParameter("pk_billtemplet", pk_billtemplet).fire({
			ctrl: 'JKBXDefDataController',
			method: 'loadData4CopyHK',
			async:false,
			success: function(data) {
				$.hideLoading();
				var tradetype = getRequest().tradetype;
				if(tradetype.indexOf("263")===0){//借款单不显示冲借款按钮
					$(".row-submit #bfCjk").hide();
				}
				if(tradetype.indexOf("264")===0){//报销单是否分摊
					var iscostshare = ctrl.headTable.getCurrentRow().data.iscostshare.value;//分摊
					if("Y" === iscostshare){
						$("#bodytab_1er_cshare_detail").show();
					}else{
						$("#bodytab_1er_cshare_detail").hide();
					}
				}
				var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
				if (defOrg) {
					ctrl.mainOrg.getCurrentRow().setValue("pk_org", defOrg);
					ctrl.mainOrg.getCurrentRow().setMeta("pk_org", 'display', ctrl.headTable.getCurrentRow().data.pk_org.meta.display);
					setRefOrg(defOrg, ctrl.app.dataTables);
				} else {
					ctrl.headTable.setEnable(false);
					for(var i=0;i<ctrl.busitemTables.length;i++){
						ctrl.busitemTables[i].setEnable(false);
					}					
					$("#body_1bodys_content_edit_menu_add").attr('disabled', 'disabled');
				}
				if(data && data!==""){
					if(JSON.parse(data).jkyjye || ""===JSON.parse(data).jkyjye){
						ctrl.jkyjye = JSON.parse(data).jkyjye;
					}
				}
				$("#lianchaContainer").hide();
				$("#approvalinfos").hide();
			}
		})
	}

	//组织编辑后，设置表头表体参照组织范围
	function setRefOrg(orgValue, dataTables) {
		for (var dt in dataTables) {
			if (dt != 'mainOrg') {
				var meta = dataTables[dt].meta;
				for (var key in meta) {
					if(key == "hbbm" || key == "customer"){
						continue;
					}
					if (meta[key].refmodel && checkRefOrgField(key)) {
						var param = {};
						if (meta[key].refparam) {
							param = JSON.parse(meta[key].refparam);
						}
						param.pk_org = orgValue;
						dataTables[dt].setMeta(key, 'refparam', JSON.stringify(param));
					}
				}
			}
		}
	}

	//判断是否按照组织面板上值的变化来更新参照范围
	function checkRefOrgField(field){
		var noFollowField = ["jkbxr"/*借款报销人*/,"receiver"/*收款人*/,"deptid_v"/*报销人部门_v*/,"fydeptid_v"/*费用承担部门_v*/,"deptid"/*报销人部门*/,"fydeptid"/*费用承担部门*/,"skyhzh"/*个人银行账户*/,"szxmid"/*收支项目*/,"jobid"/*项目*/,"fkyhzh"/*付款银行账户*/,"cashproj"/*资金计划项目*/,"cashitem"/*现金流量项目*/,"pk_cashaccount"/*现金账户*/,"assume_dept"/*费用承担部门*/,"pk_iobsclass"/*收支项目*/];
		return noFollowField.indexOf(field)<0;
	}
	function function_getUser(){
        var arr,reg=new RegExp("(^| )"+"userid"+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return "";
        }
    }

	ctrl.handleEvent = function(event) {
		if ($.AppEventConst.UISTATE_CHANGED == event.type) {
			if (appModel.getUIState() == $.UIState.ADD || appModel.getUIState() == $.UIState.EDIT) {
				$("#xingFlag").css("display","inline");
				$("#inputListFlag").css("display","table-cell");
				$("#mainorg_pk_org").removeClass('not_edit_state');
				$(".billitem-label.label-left-em.fmainorg").removeClass("readonly");	
				//加载初始化数据
				if(getRequest().tradetype =="2647" && appModel.getUIState() == $.UIState.ADD){
					loadHKData();
				}else if(getRequest().applyPull =="Y" && appModel.getUIState() == $.UIState.ADD){
					loadApplyPullData();
				}else{
					loadData();
				}
				ctrl.setFieldVisible4EditAll();//设置编辑区字段的可见性
			}else{
				$("#xingFlag").css("display","none");
				$("#inputListFlag").css("display","none");
				$("#mainorg_pk_org").addClass('not_edit_state');
				$(".billitem-label.label-left-em.fmainorg").addClass("readonly");
			}
		}
	}

	ctrl.clearAllDateTableRows = function(){
		ctrl.headTable.removeAllRows();
		for(var tabIndex=0;tabIndex<ctrl.busitemTables.length;tabIndex++){//循环表体页签
			ctrl.busitemTables[tabIndex].removeAllRows();
		}
		if(ctrl.contrastTable){
			ctrl.contrastTable.removeAllRows();
		}
		if(ctrl.shareTable){
			ctrl.shareTable.removeAllRows();
		}
		if(ctrl.app.dataTables["body_1accrued_verify"]){
			ctrl.app.dataTables["body_1accrued_verify"].removeAllRows();
		}
	}

	ctrl.add=function() {
		if(getRequest().tradetype == "2647"){
			$.ajax({
				url:"/iwebap/jkbx_cjk_ctr/AddToHkUrl?tradetype="+getRequest().tradetype+"&time="+new Date().getTime(),
				async:true,
				type:"POST",
				dataType:"json",
				success:function(result){
					window.location.href=result.url;
				}
			});
		}else{
			location.hash = '/add';
			setNullTableHideOrShow(0,true);
		}
	},
	ctrl.edit=function(e) {

		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		var str = window.location.hash;
		var openbillid = str.substr(str.lastIndexOf('/')+1);
		var iseditssc = getRequest().iseditssc;
		var iseditbzr = "N";//是否来源于报账人门户
		if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
			iseditbzr = "Y";
		} 
		$.ajax({
			type: 'GET',
			url:'/iwebap/jkbx_maintain_ctr/editright?tradetype='+tradetype+'&openbillid='+openbillid +"&iseditssc="+iseditssc+"&iseditbzr="+iseditbzr+"&time=" +(new Date()).getTime(),
			dataType: 'json',
			success: function (result) {	
                if(result["success"] == "true"){	
		            appModel.setUIState($.UIState.EDIT);
					ctrl.mainOrg.setEnable(false);
					ctrl.headTable.setMeta("pk_org","enable",false);
					ctrl.headTable.setMeta("pk_org_v","enable",false);
					$("#approvalinfos").hide();
					$("#body_1er_bxcontrast_content_edit_menu").hide();//隐藏冲销页签的编辑按钮
					$("#grid_rowaddbtn_body_1er_bxcontrast").hide();
					setNullTableHideOrShow(1,true);
					$("#body_1er_bxcontrast_content_tbody .oper_td").hide();
					if($("#rowadd_body_1er_bxcontrast")){
						$("#rowadd_body_1er_bxcontrast").hide();
					}
					$('#body_tab_body_1er_bxcontrast ul li').eq(1).click(function(){
						$('#detail_rowadd_body_1er_bxcontrast').remove();
					});
					
					$(".btn-toolbar.btn-left > #accessorymanagement").show();
					
					var tradetype = getRequest().tradetype;
					if(tradetype.indexOf("264")===0){
						if($("#body_1accrued_verify_content_edit_menu")){
						   $("#body_1accrued_verify_content_edit_menu").remove();
					    }
						if($("#body_1accrued_verify_content_tbody .oper_td")){
							$("#body_1accrued_verify_content_tbody .oper_td").remove();
						}

						if($("#rowadd_body_1accrued_verify")){
							$("#rowadd_body_1accrued_verify").remove();
						}
						$('#body_tab_body_1accrued_verify ul li').eq(1).click(function(){

							$('#detail_rowadd_body_1accrued_verify').remove();
							$("#detailtab_body_1accrued_verify .oper_td").remove();
						});
					}
					if(tradetype==='2647'){
						if(ctrl.headTable.getCurrentRow()){
							var rowdata = ctrl.headTable.getCurrentRow().data;
							if(rowdata.hbbm.value){
								ctrl.freecustValue = rowdata.hbbm.value;
							}
						}
					}
					initFreecustPara();
					$("#lianchaContainer").hide();
				}else{
					$.showMessageDialog({type:"info",title:"失败",msg:result["message"],backdrop:true});
				}				
			}
		});	


		
	},
	ctrl.changeFp=function(e) {
		$.showLoading();
		if(!ctrl.tablesave()){
			$.hideLoading();
			return false;
		}
		var data = ctrl.getValue();
		var param = {};
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.bill = ko.toJSON(data);
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.nodecode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
		param.openbillid = ctrl.openbillid;
		$.ajax({
			type: "POST",
			url: "/iwebap/jkbx_maintain_ctr/changeFp",
			data: param,
			async: false,
			dataType: "json",
			success:function(result){
				ctrl.busitemTables[0].removeAllRows();
				ctrl.loadContrastData(result,true); 
				ctrl.busitemTables[0].createEmptyRow();
				ctrl.busitemTables[0].setRowFocus(ctrl.busitemTables[0].rows().length-1);//这里必须设置焦点行，否则表头不显示
				ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
					ctrl: 'JKBXLinkAttrController',
					method: 'afterCJK',
					async: false,
					success: function(data) {
						headTotal();
						$.hideLoading();
					}
				});	
			}
		});
	},

	ctrl.copy=function(){
		var param = {};
		param.tradetype = getRequest().tradetype;
		param.openbillid = ctrl.openbillid || getRequest().billid;
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		var source = getRequest().from;
		SetPk_orgNotEdit();
		for(var i=0;i<ctrl.busitemTables.length;i++){
			ctrl.viewModel[ctrl.busitemTables[i].id].on('delete',function(event){
				headTotal();//表体删行时触发表头合计金额计算
			}).on('insert',function(event){
					headTotal();
			}).on('valueChange',function(event){
				if($(".row-fluid.clearfix.row-submit")[0].style.display == 'none'){
					$(".row-fluid.clearfix.row-submit").show();
					$(".row-fluid.clearfix.row-submit").addClass('row-submit-fixed');
				}
				if($("#"+event.dataTable+"_content_edit_menu_save")[0] && $("#"+event.dataTable+"_content_edit_menu_save")[0].style.display == 'none'){
					$("#"+event.dataTable+"_content_edit_menu_save").show();
				}
			});
		}
		if (param.openbillid != null && param.openbillid != "" && param.openbillid != undefined) {
			$.showLoading();
			$.ajax({
				type: "GET",
				url: "/iwebap/jkbx_maintain_ctr/copybill?time=" + (new Date()).getTime(),
				data: param,
				// async: false,
				dataType: "json",
				success: function(result) {
					$.hideLoading();
					if (result["success"] == "true") {
						ctrl.isCopy = "Y";
						ctrl.headTable.setMeta("pk_org","enable",true);
						if(getRequestString("isCopyBtn") != "Y" || window.location.hash.indexOf("#/view/") >=0){
							appModel.setUIState($.UIState.ADD);
						}
						appModel.clearData();
						appModel.datas.push(result);
						appModel.datapks.push(result.head.primarykey);	
						ctrl.clearAllDateTableRows();//清除ctrl中各个dataTable的数据	
						ctrl.synchronizeDataFromModel4Copy(result);//插入复制的数据
						rebuildEmptyRow(false);//重新为各个页签创建空行
						var div_id = "#body_tab_body_1jk_busitem ul li" ;
						if(getRequest().tradetype.indexOf("264") >=0){//报销单
							div_id = "#body_tab_body_1arap_bxbusitem ul li";
						}
						var detailflag = $(div_id).eq(1).hasClass('active')
						detail_copy_height_set(detailflag,getRequest().tradetype);
						loadData4Copy();
						ctrl.openbillid = undefined;
						ctrl.accessorybillid = undefined;
						setNullTableHideOrShow(1,true);
						// if(getRequestString("isCopyBtn") == "Y" && window.location.hash.indexOf("#/view/") < 0){
						// 	for(var i = 0;i < ctrl.busitemTables.length;i++){
						// 		var length = ctrl.busitemTables[i].getAllRows().length;
						// 		if(length > 1 || (length = 1 && ctrl.busitemTables[i].getAllRows()[0].data.amount.value == 0)){
						// 			ctrl.busitemTables[i].removeRowByRowId(ctrl.busitemTables[i].getAllRows()[length -1 ].rowId);
						// 		}
                        //
						// 	}
						// 	var contrastRows = ctrl.contrastTable.getAllRows();
						// 	if(contrastRows.length > 1){
						// 		ctrl.contrastTable.removeRowByRowId(contrastRows[contrastRows.length -1].rowId);
						// 	}else if(contrastRows.length==1 && contrastRows[0].data.cjkbbje.value == null && contrastRows[0].data.pk_jkd.value == null){
						// 		ctrl.contrastTable.removeRowByRowId(contrastRows[contrastRows.length -1].rowId);
						// 	}
						// 	var shareRows = ctrl.shareTable.getAllRows().length;
						// 	if(shareRows .length > 1){
						// 		ctrl.shareTable.removeRowByRowId(shareRows[shareRows.length -1].rowId);
						// 	}
                        //
						// }
						// if(localStorage.getItem("allowCopy") == "Y"){
						// 	localStorage.removeItem("allowCopy");
						// }
						// //history.pushState("","",window.location.href.replace("&isCopyBtn=Y",""));
						// if(window.location.href.indexOf("&isCopyBtn=Y") >= 0){
						// 	localStorage.setItem("allowCopy","Y");
						// 	window.location.href=window.location.href.replace("&isCopyBtn=Y","");
						// }
						if(getRequestString("tradetype").indexOf("263") >= 0){
							$("#dzfpaccessory").hide();
						}
						//设置详细视图上显示的字段，实现不同的表体行显示不同的字段
						ctrl.setFieldVisible4BrowsingAll();
						ctrl.setFieldVisible4ListAll();//设置列表字段可见性
						$("#myModal").remove();//复制时清空查看流程的缓存
					}else{
						$.showMessageDialog({type:"info",title:"失败",msg:result["message"],backdrop:true,okfn:function(){
							window.close();
						}});
					}
					$(".row-fluid.clearfix.row-submit").show();
					$("#bodytab_1er_cshare_detail").hide();
				}
			});
		}
	}
	function rebuildEmptyRow(needRemove){
		for(var i=0;i<ctrl.busitemTables.length;i++){
			if(needRemove){
				ctrl.busitemTables[i].removeRow(ctrl.busitemTables[i].getAllRows().length - 1);
			}
			ctrl.busitemTables[i].createEmptyRow();
			ctrl.busitemTables[i].setRowSelect(ctrl.busitemTables[i].getAllRows().length - 1);
		}
		if(ctrl.shareTable){
			if(needRemove){
				ctrl.shareTable.removeRow(ctrl.shareTable.getAllRows().length - 1);
			}
			ctrl.shareTable.createEmptyRow();
			ctrl.shareTable.setRowSelect(ctrl.shareTable.getAllRows().length - 1);
		}
		if(ctrl.contrastTable){
			if(needRemove){
				ctrl.contrastTable.removeRow(ctrl.contrastTable.getAllRows().length - 1);
			}
			ctrl.contrastTable.createEmptyRow();
			ctrl.contrastTable.setRowSelect(ctrl.contrastTable.getAllRows().length - 1);
		}
	}

	ctrl.del=function(e) {
		$.showMessageDialog({type:"warning",title:"温馨提示",msg:"删除是不可恢复的，确实要删除单据吗？",backdrop:true,
			okfn:function(){
				var data = ctrl.getValue();
				var param = {};
				param.openbillid = data.head.pk_jkbx;
				param.tradetype = data.head.pk_tradetype;
				param.ts = data.head.ts;
					// 删除操作
					$.showLoading();
					$.ajax({ 
						type: "GET",  
						url: "/iwebap/jkbx_maintain_ctr/deletebill?time="+ new Date().getTime(), 
						data:param, 
						dataType: "json" ,
						success: function(result) {
							$.hideLoading();
							if(result["success"] == "true"){
								window.close();  
							}else{
								$.showMessageDialog({type:"info",title:"删除失败",msg:result["message"],backdrop:true});
							}
						}
					});
				}}
				);
	},
	ctrl.print = function(e) {
		var data = ctrl.getValue(false);
		var param = {};
		param.openbillid = data.head.pk_jkbx;
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.funcode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
		param.nodekey = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		$.showLoading();
		$.ajax({
	        type: 'GET',
	        url: '/iwebap/jkbxprint/print?time='+ new Date().getTime(), 
	        data: param,
	        dataType: "json" ,
			success: function (result) {
			$.hideLoading();
				if(result["success"] == "true"){
					var filePath = result.filepath;
					window.open('/iwebap/printFileService/download?filePath='+filePath,"_blank","resizable=yes,titlebar=no,location=no,toolbar=no,menubar=no;top=100"); 
				}else{
					$.showMessageDialog({type:"info",title:"提示",msg: result["message"],backdrop:true});
				}
			}
	     });
	},
	/*打印黏贴单*/
	ctrl.prints = function(e) {
		var data = ctrl.getValue(false);
		var openbillid = data.head.pk_jkbx;
		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		var funcode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
		var nodekey = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		
		var d = top.dialog({
				   title:' ',
				   id:"cjk-modal-window",
				   width:window.screen.width*0.25,
				   height:window.screen.height*0.23,
				   padding: 0,
				   url:'/iwebap/jkbxprints/toPrints?openbillid='+openbillid+'&tradetype='+tradetype+'&funcode='+funcode+'&nodekey='+nodekey+'&time='+ new Date().getTime(),
			   	   onclose: function(){
				    	this.remove();
				   }
			    });
		d.showModal();
	},
	ctrl.accessory = function(target, event){
		pk_org  = ctrl.headTable.getCurrentRow().data.pk_org.value;
		if(pk_org=='' || pk_org==undefined){
		    $.showMessageDialog({type:"info",title:"提示",msg: "请先选择财务组织！",backdrop:true});
		        return;
		}	

		

		 if(ctrl.openbillid==undefined){

		     $.ajax({
		        type: 'GET',
		        url:'/iwebap/erm_accessory_ctr/generatBillId?pk_bill='+ctrl.openbillid+'&billtype='+getRequest().tradetype+'&time=' +(new Date()).getTime(),
		        dataType: 'json',
		        success: function (data) {
		            if(data["success"] == "true"){
				        ctrl.accessorypkfildname = data["pkfieldName"];
				        ctrl.openbillid = data[data["pkfieldName"]];
						ctrl.accessorybillid = data[data["pkfieldName"]];//附件生成的单据主键
		      			
						var param = {};
						param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
						param.funcode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
						param.openbillid = 	data[data["pkfieldName"]];
						param.pk_org = ctrl.viewModel.headform.getCurrentRow().data["pk_org"].value;
						param.state = appModel.getUIState();
						param.approverstatus = ctrl.viewModel.headform.getCurrentRow().data["spzt"].value;
						var currentuser = ctrl.viewModel.headform.getCurrentRow().data["creator"]["value"];
						param.iscurrentuser = function_getUser()==currentuser?"Y":"N";
						if(currentuser==null){
							param.iscurrentuser="Y";
						}
						up.init(param);
		      			//window.open('/iwebap/erm_accessory_ctr/accessory'+'?pk_bill=' + ctrl.openbillid + '&state='+appModel.getUIState()+ '&time=' +(new Date()).getTime(),"","height=500, width=1000, top=200,left=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		             }
		        }
		    });
		}else{

			var param = {};
			param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
			param.funcode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
			param.openbillid = 	ctrl.openbillid;
			param.pk_org = ctrl.viewModel.headform.getCurrentRow().data["pk_org"].value;
			param.state = appModel.getUIState();
			param.approverstatus = ctrl.viewModel.headform.getCurrentRow().data["spzt"].value;
			var currentuser = ctrl.viewModel.headform.getCurrentRow().data["creator"]["value"];
			param.iscurrentuser = function_getUser()==currentuser?"Y":"N";
			up.init(param);

			//window.open('/iwebap/erm_accessory_ctr/accessory'+'?pk_bill=' + ctrl.openbillid + '&state='+appModel.getUIState()+ '&time=' +(new Date()).getTime(),"","height=500, width=1000, top=200,left=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		}			             
	},
	ctrl.dzfpaccessory = function(target, event){
		if(ctrl.openbillid==undefined){
		     $.ajax({
		        type: 'GET',
		        async:false,
		        url:'/iwebap/erm_accessory_ctr/generatBillId?pk_bill='+ctrl.openbillid+'&billtype='+getRequest().tradetype+'&time=' +(new Date()).getTime(),
		        dataType: 'json',
		        success: function (data) {
		            if(data["success"] == "true"){
				        ctrl.accessorypkfildname = data["pkfieldName"];
				        ctrl.openbillid = data[data["pkfieldName"]];
						ctrl.accessorybillid = data[data["pkfieldName"]];//附件生成的单据主键
      					
		             }
		        }
		    });
		}
		var spzt = ctrl.app.dataTables["headform"].getAllRows()[0].data.spzt.value;
		if(spzt&&(spzt=='-1'||spzt=='0')){
			spzt = 'edit';
		}
		var d = top.dialog({
				   title:' ',
				   id:"cjk-modal-window",
				   width:window.screen.width - 600,
				   height:window.screen.height - 600,
				   padding: 0,
				   url:'/iwebap/erm_accessory_ctr/dzfpaccessory'+'?pk_bill=' + ctrl.openbillid +'&pk_org='+ctrl.headTable.getCurrentRow().data.pk_org.value
						+ '&state='+spzt+ '&time=' +(new Date()).getTime(),
				   okValue:"确定",
				   ok:function(){
					   //不解析电子发票，不自动增行
					   /*ctrl.changeFp();*/
						retrieveAttachNum(ctrl.openbillid);
				   },
			   	   onclose: function(){
				    	this.remove();
				    	retrieveAttachNum(ctrl.openbillid);
				   }
			    });
		d.showModal();  
	}
	
	//重新获取附件数量
	function retrieveAttachNum(openbillid){
		$.ajax({
			type: "POST",
			url: "/iwebap/filenum/" + openbillid,
			dataType: "json",
			success: function(result) {
				if(!result.success){
					$.showMessageDialog({type: "info",title: "查询附件数量",msg: '查询附件数量失败！',backdrop:true});
				}else{
					$('#accessorymanagement').find("span").html(result.fileNum);
				}
			}
		});
	}

	//提交时关联报批件
	function setBpj(tradetype, openBillId) {
		var tableName = "";
		var fieldId = "";
		if (tradetype.indexOf("263") >= 0) {
			tableName = "er_jkzb";
			fieldId = "subject1";
		}
		if (tradetype.indexOf("264") >= 0) {
			tableName = "er_bxzb";
			fieldId = "subject";
		}
		$.ajax({
			url: "/portal/oagd",
			async: false,
			type: "post",
			data: { "billId": openBillId, "tableName": tableName },
			dataType: "json",
			success: function (result) {
				$("[field=url]").children().hide(1);
				var showMultiLine = new MultiLinePanel(fieldId, { lbl: "关联报批件", enable: false, dataTable: ctrl.headTable, titleField: fieldId, urlField: "url" });
				if (result != null) {
					var urlData = result.url.split(",");
					var subjectData = result.subject.split(",");
					var bpjData = new Array();

					for (var i = 0; i < urlData.length; i++) {
						bpjData[i] = new Object();
						bpjData[i].title = subjectData[i];
						bpjData[i].url = urlData[i];
					}
					showMultiLine.setData(bpjData);
				}
			}	
		});
	}
	//影像扫描
	ctrl.imageupload =function(e){
		imageuploadBrowserSend(ko, ctrl,"iweb");
	},

	//影像查看
	ctrl.imageshow=function(e){
	    imageshowBrowserSend(ko, ctrl);
	},

	ctrl.submitFunc = function(param) {
		$.ajax({ 
			type: "POST",  
			url: "/iwebap/jkbx_maintain_ctr/sendapprove?time="+ new Date().getTime(), 
			data:param, 
			dataType: "json" ,
			success: function(result) {
				$.hideLoading();
				if(result.msg_pk_bill){
					var callback = function(){
						if(appModel.getUIState() == $.UIState.ADD){
							location.hash = '/view/' + result.msg_pk_bill;
						}
						var msg = '保存成功！';
						$.scojs_message(msg, $.scojs_message.TYPE_OK);
						location.reload();
					};
					if(result.success == "false"){
						for(var i = 0;i < ctrl.busitemTables.length;i++){
								var rows = ctrl.busitemTables[i].getAllRows();
								for(var j = 0 ;j< rows.length;j++){
									if(rows[j].data.amount.value == 0){
										ctrl.busitemTables[i].removeRowByRowId(rows[j].rowId);
									}
								}
								setNullTableHideOrShow(0,false);
							}
						}
						billcheck.checkbill(result, callback);
					} else if (result["success"] == "true") {
						openbillid = result.head.primarykey;
						var pk_org = result.head.pk_org;
						appModel.setUIState($.UIState.NOT_EDIT);
						ctrl.clearAllDateTableRows();
						ctrl.onSelectionChanged(result);
						$("#approvalinfos").show();
						location.hash = '/view/' + openbillid;
						getApproveInfosNew(openbillid, param.tradetype, $("#approvalinfos"), pk_org.pk);
						setBpj(param.tradetype,openbillid);//关联报批件提交显示
						setStampAll();//根据是否超标设置印章效果
						setBtnHide();//根据单据生效、审批状态设置按钮隐藏
						//获取附件数量
						showAttachNum(openbillid);
						//设置详细视图上显示的字段，实现不同的表体行显示不同的字段
						ctrl.setFieldVisible4BrowsingAll();
						ctrl.setFieldVisible4ListAll();//设置列表字段可见性
						//start @sscct@合同模块补丁合并增加--20170701
						ctrl.setPayContractLink();
						//end @sscct@合同模块补丁合并增加--20170701
						// 显示会话
						sscCloudPub.showSscCloudMsg(openbillid, param.tradetype, getCookie("usercode"));
					} else if (result["bugetAlarm"]) {//预算预警信息
						$.showMessageDialog({
							type: "warning", title: "温馨提示", msg: result["bugetAlarm"], backdrop: true,
							okfn: function () {
								param.ntbCheck = "true";
								ctrl.submitFunc(param);
							}
						}
						);
					} else if (result["jkAlarm"]) {//借款控制预警信息
						$.showMessageDialog({
							type: "warning", title: "温馨提示", msg: result["jkAlarm"] + "是否继续？", backdrop: true,
							okfn: function () {
								param.jkCheck = "true";
								ctrl.submitFunc(param);
							}
						}
					);
				} else {
					showerror(result, "提交失败"); 
				}
			}
		});
	}
	
	function submitAdapter(result){
		var data = ctrl.getValue();
		var param = {};
		param.openbillid = data.head.pk_jkbx;
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.ts = data.head.ts;
		param.accessorybillid = ctrl.accessorybillid;
		param.card_html = "";
		if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
			param.card_html = "jkbxcard";//保存时不校验预算
		}else{
			param.card_html = "approvecard";
		}
		$.showLoading();
		param.assingUsers = [];
		if(result["isAssing"] === true){
			if(result["assignInfos"] && result["assignInfos"].length>0){
				var users = result["assignInfos"][0]["users"];
				if(users){
					param.assingUsers = users;
				}
			}
		}
		ctrl.submitFunc(param);
	}
	ctrl.submit = function(event) {
		var data = ctrl.getValue();
		var openbillid = ko.toJSON(data);
		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		beforeSubmit(tradetype, openbillid, submitAdapter);
//		ctrl.submitFunc(param);

	}
	
	ctrl.unsendapprove = function(e) { 
		var data = ctrl.getValue(false);
		var param = {};
		param.openbillid = data.head.pk_jkbx;
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.ts = data.head.ts;
		$.showLoading();
		$.ajax({ 
			type: "GET", 
			url: "/iwebap/jkbx_maintain_ctr/unsendapprove?time="+ new Date().getTime(), 
			data:param, 
			dataType: "json" ,
			success: function(result) {
				$.hideLoading();
				if(result.msg_pk_bill){
					var callback = function(){
						if(appModel.getUIState() == $.UIState.ADD){
							location.hash = '/view/' + result.msg_pk_bill;
						}
						var msg = '保存成功！';
						$.scojs_message(msg, $.scojs_message.TYPE_OK);
						location.reload();
					};
					if(result.success == "false"){
						for(var i = 0;i < ctrl.busitemTables.length;i++){
								var rows = ctrl.busitemTables[i].getAllRows();
								for(var j = 0 ;j< rows.length;j++){
									if(rows[j].data.amount.value == 0){
										ctrl.busitemTables[i].removeRowByRowId(rows[j].rowId);
									}
								}
								setNullTableHideOrShow(0,false);
							}
					}
					billcheck.checkbill(result , callback);
				}else if (result["success"] == "true") {
					openbillid = result.head.primarykey;
					var pk_org = result.head.pk_org;
					appModel.setUIState($.UIState.NOT_EDIT);
					ctrl.clearAllDateTableRows();
					ctrl.onSelectionChanged(result); 
					$("#approvalinfos").show(); 
					location.hash = '/view/' + openbillid;
					getApproveInfosNew(openbillid, param.tradetype, $("#approvalinfos"), pk_org.pk);
					setStampAll();//根据是否超标设置印章效果
					setBtnHide();//根据单据生效、审批状态设置按钮隐藏
					//start @sscct@合同模块补丁合并增加--20170701
					ctrl.setPayContractLink();
					//end @sscct@合同模块补丁合并增加--2017070
				} else {
					showerror(result, "收回失败"); 
				}
			}
		});
	}

	ctrl.submitBottomFunc = function(param) {
		var openbillid = "";
		//校验分摊金额与报销金额一致性
		var data = ctrl.getValue();
		if(data.head.iscostshare == 'Y'){
			var shareamount = new ctrl.bignumber(0.00);
			for(var i=0;i<data.body.bodys.length;i++){
				if(data.body.bodys[i].cls==="nc.vo.erm.costshare.CShareDetailVO"){
					shareamount = shareamount.plus(new ctrl.bignumber(data.body.bodys[i].assume_amount));
				}			
			}
			//wangyl7 2018年1月20日11:09:57 校验分摊金额修改 begin
			if(!new ctrl.bignumber(data.head.vat_amount).equals(shareamount)){
			//end
				$.showMessageDialog({type:"warning",title:"温馨提示",msg:"表头勾选了分摊，分摊金额必须等于表头报销金额！",backdrop:true});
				$.hideLoading();
				return false;
			}
		}	
		$.ajax({ 
			type: "POST",  
			url: "/iwebap/jkbx_maintain_ctr/sendapprove?time="+ new Date().getTime(), 
			data:param, 
			dataType: "json" ,
			success: function(result) {   
				$.hideLoading();
				if(result.msg_pk_bill){
					var callback = function(){
						if(appModel.getUIState() == $.UIState.ADD){
							location.hash = '/view/' + result.msg_pk_bill;
						}
						var msg = '保存成功！';
						$.scojs_message(msg, $.scojs_message.TYPE_OK);
						location.reload();
					};
					if(result.success == "false"){
						for(var i = 0;i < ctrl.busitemTables.length;i++){
								var rows = ctrl.busitemTables[i].getAllRows();
								for(var j = 0 ;j< rows.length;j++){
									if(rows[j].data.amount.value == 0){
										ctrl.busitemTables[i].removeRowByRowId(rows[j].rowId);
									}
								}
								setNullTableHideOrShow(0,false);
							}
					}
					billcheck.checkbill(result , callback);
				}else if (result["success"] == "true") {
					openbillid = result.head.primarykey;
					var pk_org = result.head.pk_org;
					appModel.setUIState($.UIState.NOT_EDIT);
					ctrl.clearAllDateTableRows();
					ctrl.onSelectionChanged(result); 
					$("#approvalinfos").show(); 
					location.hash = '/view/' + openbillid;
					getApproveInfosNew(openbillid, param.tradetype, $("#approvalinfos"), pk_org.pk);
					setNullTableHideOrShow(0,false);
					$("#lianchaContainer").show();
					window.lianchactrl.loadData(param.tradetype,openbillid);
					setStampAll();//根据是否超标设置印章效果
					setBtnHide();//根据单据生效、审批状态设置按钮隐藏
					//获取附件数量
					showAttachNum(openbillid);
					//设置详细视图上显示的字段，实现不同的表体行显示不同的字段
					ctrl.setFieldVisible4BrowsingAll();
					ctrl.setFieldVisible4ListAll();//设置列表字段可见性
					//start @sscct@合同模块补丁合并增加--20170701
					ctrl.setPayContractLink();
					//end @sscct@合同模块补丁合并增加--2017070
				} else if(result["bugetAlarm"]){//预算预警信息
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:result["bugetAlarm"],backdrop:true,
						okfn:function(){
								param.ntbCheck = "true";
								ctrl.submitBottomFunc(param);
							}
						}
					);
				} else if(result["jkAlarm"]){//借款控制预警信息
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:result["jkAlarm"]+"是否继续？",backdrop:true,
						okfn:function(){
								param.jkCheck = "true";
								ctrl.submitBottomFunc(param);
							}
						}
					);
				} else {
					showerror(result, "提交失败"); 
				}
				/*if($(".btn-group.bill-view-btns > #imageupload")){
					$(".btn-group.bill-view-btns > #imageupload").hide();
				}*/
			}
		});
	}
	
	//制单人指派回调接口
	function submitBottomAdapter(result){
		var data = ctrl.getValue();
		var param = {};
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.bill = ko.toJSON(data);
		param.state = appModel.getUIState();
		param.accessorybillid = ctrl.accessorybillid;
		param.card_html = "";
		if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
			param.card_html = "jkbxcard";//保存时不校验预算
		}else{
			param.card_html = "approvecard";
		}
		//指派人信息
		param.assingUsers = [];
		if(result["isAssing"] === true){
			if(result["assignInfos"] && result["assignInfos"].length>0){
				var users = result["assignInfos"][0]["users"];
				if(users){
					param.assingUsers = users;
				}
			}
		}
		ctrl.submitBottomFunc(param);
	}
	ctrl.submitBottom = function(event) {
	    $.showLoading();
		if(!ctrl.tablesave()){
			$.hideLoading();
			return false;
		}
		if(getRequestString("isCopyBtn")== "Y"){
			if(ctrl.headTable.getAllRows().length > 1){
				ctrl.headTable.removeRowByRowId(ctrl.headTable.getAllRows()[1].rowId);
			}
		}
		var data = ctrl.getValue();
		if($(".alert-dialog").length > 0){
		    $.hideLoading();
			return;
		}
		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		var billid = ko.toJSON(data);
		if (billid == undefined){
			billid = ko.toJSON(data);//制单人指派，底部提交此时没有单据id，因此传单据信息来处理
		}
		beforeSubmit(tradetype, billid, submitBottomAdapter);
	}

	ctrl.saveFunc = function(param){
		var openbillid = "";
		$.ajax({
			type: "POST",
			url: "/iwebap/jkbx_maintain_ctr/savebill",
			data: param,
			//async: false,
			dataType: "json",
			success: function(result) {
				$.hideLoading();
				if(result.msg_pk_bill){ 
					var callback = function(){ 
						if(appModel.getUIState() == $.UIState.ADD){ 
							location.hash = '/view/' + result.msg_pk_bill; 
						} 
						var msg = '保存成功！'; 
						$.scojs_message(msg, $.scojs_message.TYPE_OK); 
						location.reload(); 
					};
					if(result.success == "false"){
						for(var i = 0;i < ctrl.busitemTables.length;i++){
								var rows = ctrl.busitemTables[i].getAllRows();
								for(var j = 0 ;j< rows.length;j++){
									if(rows[j].data.amount.value == 0){
										ctrl.busitemTables[i].removeRowByRowId(rows[j].rowId);
									}
								}
								setNullTableHideOrShow(0,false);
							}
					}
					billcheck.checkbill(result , callback);
				}else if (result["success"] == "true") {
					openbillid = result.head.primarykey;
					var pk_org = result.head.pk_org;
					appModel.setUIState($.UIState.NOT_EDIT);
					appModel.datas.push(result);
					appModel.datapks.push(result.head.primarykey);
					ctrl.clearAllDateTableRows();
					ctrl.onSelectionChanged(result); 
					$("#approvalinfos").show(); 
					getApproveInfosNew(openbillid, param.tradetype, $("#approvalinfos"), pk_org.pk);
					location.hash = '/view/' + openbillid;
					setNullTableHideOrShow(0,false);
					ctrl.isCopy = "N";//保存成功后设置复制状态为N
					$("#lianchaContainer").show(); 
					window.lianchactrl.loadData(param.tradetype,openbillid);
					/*if($(".btn-group.bill-view-btns > #imageupload")){
						$(".btn-group.bill-view-btns > #imageupload").hide();
					}*/
					setStampAll();//根据是否超标设置印章效果
					setBtnHide();//根据单据生效、审批状态设置按钮隐藏
					//获取附件数量
					showAttachNum(openbillid);
					//设置详细视图上显示的字段，实现不同的表体行显示不同的字段
					ctrl.setFieldVisible4BrowsingAll();
					ctrl.setFieldVisible4ListAll();//设置列表字段可见性
					//start @sscct@合同模块补丁合并增加--20170701
					ctrl.setPayContractLink();
					//end @sscct@合同模块补丁合并增加--2017070
					// 显示信用信息
					sscCloudCredit.showCreditInfo(result.head.creator.pk, $(".panel-title"));
				}else if(result["bugetAlarm"]){//预算预警信息
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:result["bugetAlarm"],backdrop:true,
						okfn:function(){
								param.ntbCheck = "true";
								ctrl.saveFunc(param);//递归调用
							}
						}
					);
				} else if(result["jkAlarm"]){//借款控制预警信息
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:result["jkAlarm"]+"是否继续？",backdrop:true,
						okfn:function(){
								param.jkCheck = "true";
								ctrl.saveFunc(param);//递归调用
							}
						}
					);
				} else {
					showerror(result, "保存失败"); 
				}
			}
		});
	},

	ctrl.save = function(e) {
		$.showLoading();
		if(!ctrl.tablesave()){
			$.hideLoading();
			return false;
		}
		if(getRequestString("isCopyBtn")== "Y"){
			if(ctrl.headTable.getAllRows().length > 1){
				ctrl.headTable.removeRowByRowId(ctrl.headTable.getAllRows()[1].rowId);
			}
		}
		var data = ctrl.getValue();
		if(!data){
			$.hideLoading();
			return;
		}
		//校验分摊金额与报销金额一致性
		if(data.head.iscostshare == 'Y'){
			var shareamount = new ctrl.bignumber(0.00);
			for(var i=0;i<data.body.bodys.length;i++){
				if(data.body.bodys[i].cls==="nc.vo.erm.costshare.CShareDetailVO"){
					shareamount = shareamount.plus(new ctrl.bignumber(data.body.bodys[i].assume_amount));
				}			
			}
			//wangyl7 2018年1月20日11:09:57 校验分摊金额修改 begin
			if(!new ctrl.bignumber(data.head.vat_amount).equals(shareamount)){
			//end	
				$.showMessageDialog({type:"warning",title:"温馨提示",msg:"表头勾选了分摊，分摊金额必须等于表头报销金额！",backdrop:true});
				$.hideLoading();
				return false;
			}
		}		
		var param = {};
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.bill = ko.toJSON(data);
		param.state = appModel.getUIState();
		param.accessorybillid = ctrl.accessorybillid;
		param.card_html = "";
		if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
			param.card_html = "jkbxcard";//保存时不校验预算
		}else{
			param.card_html = "approvecard";
		}
		/*param.source = 'ssc';
		var page = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);
		if("jkbxcard.html"=== page){
			param.source = '';
		}*/
		param.fromssc = getIframeId(this);
		ctrl.saveFunc(param);
	}
	
	function getIframeId(f) {
		var frames = parent.document.getElementsByTagName("iframe");

		for (i = 0; i < frames.length; i++) { //遍历，匹配时弹出id

			if(frames[i].src.indexOf("ssc")>=0){
				return true;
			}

		}
		return false;
	}

	ctrl.tablesave = function(e){
		 for(var i = 0; i < ctrl.busitemTables.length;i++){
		 	if($("#"+ctrl.busitemTables[i].id+"_edit_tr").length > 0  && parseInt(ctrl.busitemTables[i].getCurrentRow().data.amount.value)>0){
		 		if($("#"+ctrl.busitemTables[i].id+"_edit_tr")[0].style.display == 'block'){
		 			//$("#"+ctrl.busitemTables[i].id+"_content_edit_menu_save").trigger("click");
					$.showMessageDialog({type:"warning",title:"温馨提示",msg:"表体有待保存数据行，请保存!",backdrop:true});
					return false;
		 		}
		 	}
		 }   
		 if(ctrl.shareTable && $("#"+ctrl.shareTable.id+"_edit_tr").length > 0 && parseInt(ctrl.shareTable.getCurrentRow().data.assume_amount.value)>0){
		 	if($("#"+ctrl.shareTable.id+"_edit_tr")[0].style.display == 'block'){
		 		// $("#"+ctrl.shareTable.id+"_content_edit_menu_save").trigger("click"); 
				$.showMessageDialog({type:"warning",title:"温馨提示",msg:"表体有待保存数据行，请保存!",backdrop:true});
				return false;
		 	}
		 }
		return true;
	}

	ctrl.cancel = function(e) {
		if(appModel.getUIState() == $.UIState.ADD){
			$.showMessageDialog({type:"warning",title:"温馨提示",msg:"请确认是否要取消？",backdrop:true,okfn:function(){			
					//回到保存成功的浏览态
					var param = {};
					param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
					param.openbillid = ctrl.openbillid;
					$.ajax({
				        type: "POST",
						url: "/iwebap/jkbx_maintain_ctr/cancelbill",
						data: param,
						async: false,
						dataType: "json",
						success: function(result) {
				            if(result != null || result == undefined){
						        showerror(result, "取消失败！"); 
				             }
				        }
				    });
					//关闭当前窗口
					window.close();
				}});
		}else if(appModel.getUIState() == $.UIState.EDIT){
			$.showMessageDialog({type:"warning",title:"温馨提示",msg:"请确认是否要取消？",backdrop:true,okfn:function(){
					//回到保存成功的浏览态
					var param = {};
					param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
					param.openbillid = ctrl.openbillid;
					$.ajax({
				        type: "POST",
						url: "/iwebap/jkbx_maintain_ctr/cancelbill",
						data: param,
						async: false,
						dataType: "json",
						success: function(result) {
				            if(result != null || result == undefined){
						        showerror(result, "取消失败！"); 
				             }
				        }
				    });
					appModel.setUIState($.UIState.NOT_EDIT);
					var data = appModel.datas[appModel.datas.length-1];
					ctrl.clearAllDateTableRows();
					ctrl.onSelectionChanged(data); 
					$("#approvalinfos").show();
					setNullTableHideOrShow(0,false);
					$("#lianchaContainer").show(); 
					//设置详细视图上显示的字段，实现不同的表体行显示不同的字段
					ctrl.setFieldVisible4BrowsingAll();
					ctrl.setFieldVisible4ListAll();//设置列表字段可见性
				}});
		}
	}

	function showerror(data, title) {
		if (!data.message) {
			data.message = "没有返回错误信息";
		}
		if (!title) {
			title = "提示";
		}
		$.showMessageDialog({
			type: "info",
			title: title,
			msg: data.message,
			backdrop: true
		});
	}

	ctrl.setupapp = function(funcViewModel,v_pub_billform){
		
		//注册节点需要的单据模板卡片界面
		var appModel = new BillManageModel();
		window.appModel = appModel;
		// 监听页面状态改变
		appModel.addListener(this);
		this.handleEvent = function(event){
			if ($.AppEventConst.UISTATE_CHANGED == event.type) {
				if (appModel.getUIState() == $.UIState.ADD || appModel.getUIState() == $.UIState.EDIT) {
					funcViewModel.isEditable(true);
				} else if(appModel.getUIState() == $.UIState.NOT_EDIT){
					funcViewModel.isEditable(false);
				}
			}
		}
		
		var app = $.createApp();
		try{
			app.init(funcViewModel,[document.getElementById("panel-heading"),document.getElementById("mainorgpanel"), document.getElementById("editBtn")]);
		}catch(e){
			console.log(e);
		}
		
		var dataTables = app.getDataTables();
		ctrl.mainOrg = dataTables["mainOrg"];
		
		for(var dtid in dataTables){
			dataTables[dtid].createEmptyRow();
			dataTables[dtid].setRowSelect(0);
			dataTables[dtid].on('valueChange', function(event){
				//主组织变动后，到卡片组件控制器中去发起远程处理联动
				//ctrl.processOrgChanged(event);
			})
		}

		var pubBillform = new v_pub_billform()
		ko.applyBindings(pubBillform,$(".cardpanel")[0]);
		if(getRequest().tradetype =="2647" && appModel.getUIState() == $.UIState.ADD){
			$("a[href = '#detailtab_body_1arap_bxbusitem']").click();
			$("a[href = '#gridtab_body_1arap_bxbusitem']").click();
			$("#grid_rowaddbtn_body_1arap_bxbusitem").hide();
			$("#rowadd_body_1arap_bxbusitem").hide();
			$("#detail_rowadd_body_1arap_bxbusitem").hide();
			$("#body_1arap_bxbusitem_content_tbody .oper_td").hide();
			$("#body_1er_bxcontrast_content_tbody .oper_td").hide();
			$("#detailEdit").hide();
			$("#detailDel").hide();
			$("#moreiconDetail").hide();
		}
		//借款单新增时隐藏下方的新增行按钮 addby wangyxk 20180226
		if(getRequest().tradetype.indexOf('263')>=0 && appModel.getUIState() == $.UIState.ADD){
			$("#rowadd_body_1jk_busitem").hide();
		}
		//报销单新增时隐藏下方的新增行按钮 addby wangyxk 20180226
		if(getRequest().tradetype.indexOf('264')>=0 && getRequest().tradetype !="2647" && appModel.getUIState() == $.UIState.ADD){
			for(var i=0;i<ctrl.busitemTables.length;i++){
				if($("#rowadd_"+ctrl.busitemTables[i].id)){
					$("#rowadd_"+ctrl.busitemTables[i].id).hide();
				}
			}
		}
		if($("#rowadd_body_1er_cshare_detail")){
			$("#rowadd_body_1er_cshare_detail").hide();
		}///add end
		//注册卡片界面左下角的按钮
		var btns = [];
		funcViewModel.headButtongroups(btns);

		$('#back-to-top').backtop();

		//var panelheight = $(".panel-body").height();
		$(document).scroll(function() {
			var $container = $('.submit-container');
			var $submit = $('.submit-container>.row-submit');
			if($container.length > 0 && $submit.length > 0) {
				var top = $container[0].getBoundingClientRect().top; //元素顶端到可见区域顶端的距离
				var se = document.documentElement.clientHeight; //浏览器可见区域高度。
				var panelheight = $(".panel-body").height();
				if(panelheight+120 <= se ) {
					$($(".panel-success")[0]).height(se-25);
				}else{
					$($(".panel-success")[0]).height(panelheight+42+51);
				}
				$submit.addClass('row-submit-fixed');
			}	   
		}).scroll()
	}

	ctrl.onSelectionChanged = function(data) {
		ctrl.synchronizeDataFromModel(data);
	}
	ctrl.synchronizeDataFromModel = function(data) {
		if (!data)
			return;
		ctrl.billForm.loadHeadData(data.head, false);
		ctrl.loadBodyData(data.body, false);
	}	

	ctrl.loadBodyData = function(body, isFireEvent) {
		var bodyDatas = body.bodys;
		if (bodyDatas == undefined)
			return;
		var tabRows = {};
		for (var i = 0, count = bodyDatas.length; i < count; i++) {
			var bodyData = bodyDatas[i];
			var dataTable = ctrl.getDataTableByCls2(bodyData);

			var row = new $.Row({
				parent: dataTable
			});
			row.status = $.Row.STATUS.NORMAL;
			ctrl.billForm.setRowValue(row, bodyData);
			dataTable.addRow(row);

			// var bodyData = bodyDatas[i];
			// var dataTable = ctrl.getDataTableByCls2(bodyData);
			// var row = new $.Row({
			// 	parent: dataTable
			// });
			// ctrl.billForm.setRowValue(row, bodyData);
			// var curTabRows = tabRows[bodyData.cls];
			// if (curTabRows == null) {
			// 	curTabRows = [];
			// 	tabRows[bodyData.cls] = curTabRows;
			// }
			// row.status = $.Row.STATUS.NORMAL;
			// curTabRows.push(row);
			// dataTable.addRow(row);
		}
		// for(var key in tabRows){
		// 	var dataTable = this.getDataTableByCls(key);
		// 	var curTabRows = tabRows[key];
		// 	dataTable.addRows(curTabRows);
		// }
		//	this.loadLoadRelationItemValue(this.getDataTablesByTabType("body"));
		var pageCount = bodyDatas.length / 10 + 1;
	}

	ctrl.loadContrastData = function(body, isFireEvent) {
		var bodyDatas = body;
		if (bodyDatas == undefined)
			return;
		var tabRows = {};
		for (var i = 0, count = bodyDatas.length; i < count; i++) {
			var bodyData = bodyDatas[i];
			var dataTable = ctrl.getDataTableByCls2(bodyData);

			var row = new $.Row({
				parent: dataTable
			});
			row.status = $.Row.STATUS.NORMAL;
			ctrl.billForm.setRowValue(row, bodyData);
			dataTable.addRow(row);
		}
		var pageCount = bodyDatas.length / 10 + 1;
	}

	ctrl.synchronizeDataFromModel4Copy = function(data) {
		if (!data)
			return;
		ctrl.loadHeadData4Copy(data.head, false);
		ctrl.loadBodyData4Copy(data.body, false);
	}

	ctrl.loadHeadData4Copy = function(head, isFireEvent){
		var dataTable = ctrl.headTable;
		var row = new $.Row({parent:dataTable});
		ctrl.billForm.setRowValue(row, head);
		dataTable.addRow(row);
		row.status = $.Row.STATUS.NEW;
		dataTable.setRowSelect(0);
	}

	ctrl.loadBodyData4Copy = function(body, isFireEvent) {
		var bodyDatas = body.bodys;
		if (bodyDatas == undefined)
			return;
		var tabRows = {};
		for (var i = 0, count = bodyDatas.length; i < count; i++) {
			var bodyData = bodyDatas[i];
			var dataTable = ctrl.getDataTableByCls2(bodyData);

			var row = new $.Row({
				parent: dataTable
			});
			row.status = $.Row.STATUS.NEW;
			ctrl.billForm.setRowValue(row, bodyData);
			dataTable.addRow(row);
			// dataTable.createEmptyRow();
			// dataTable.setRowSelect(dataTable.getAllRows().length-1);
			// dataTable.setRowFocus(dataTable.getAllRows().length-1);
		}
		var pageCount = bodyDatas.length / 10 + 1;
	}



	/**
	 * 根据class获取对应的表头dataTable
	 * 
	 * @param {} cls
	 * @return {}
	 */
	 ctrl.getDataTableByCls2 = function(cls) {
	 	var dataTable;
	 	var dataTables = ctrl.app.getDataTables();
	 	for (var key in dataTables) {
	 		dataTable = dataTables[key];
	 		if (cls.tablecode) {
	 			if (("body_1" + cls.tablecode.pk) === key) {
		 			return dataTable;
		 		}
	 		}else{
		 		if (dataTable.getParam("cls") === cls.cls) {
					return dataTable;
				}
		 	}
	 	}
		// var _cls = cls.cls;
		// var dataTable = ctrl.billForm.billDataTables[_cls];
		// if (typeof dataTable == 'undefined' || dataTable == null) {
		// 	var dataTables = ctrl.app.getDataTables();
		// 	for (var key in dataTables) {
		// 		var dataTable = dataTables[key];
		// 		if (dataTable.getParam("cls") === _cls) {
		// 			ctrl.billForm.billDataTables[_cls] = dataTable;
		// 			return dataTable;
		// 		}
		// 	}
		// } else {
		// 	if (cls.tablecode) {
		// 		var dataTables = ctrl.app.getDataTables();
		// 		for (var key in dataTables) {
		// 			var dataTable = dataTables[key];
		// 			if (dataTable.getParam("cls") === cls.cls && ("body_1" + cls.tablecode.pk) == key) {
		// 				ctrl.billForm.billDataTables[cls] = dataTable;
		// 				return dataTable;
		// 			}
		// 		}
		// 	}
		// }
		return dataTable;
	}

	//冲借款
	ctrl.cjk = function (e){
		if(!ctrl.tablesave()){
			$.hideLoading();
			return false;
		}
		if($(".alert-dialog").length > 0){
		  		return;
			}
		var total = new ctrl.bignumber(ctrl.headTable.getCurrentRow().data.total.value);//报销总金额
		if (total.toNumber()===0) {
			$.showMessageDialog({type:"info",title:"提示",msg: "报销总金额为0，不能执行冲借款操作",backdrop:true});
			return;
		}
		window.bxjeMap = ctrl.getCJKBXJEParam();
		window.contrastMap = ctrl.getCJKContrastParam();
		window.ybprecision =ctrl.headTable.getCurrentRow().data.total.meta.precision;
		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		if(tradetype.indexOf("264")===0){
			$.ajax({
			type:"POST",
			url:"/iwebap/jkbx_cjk_ctr/gotoCjk?time="+new Date().getTime(),
			dataType:"json",
			success:function(result){
				$(document.body).css('overflow','hidden');
				var height = window.innerHeight;//window.screen.height;
// 				if(navigator.userAgent.indexOf('Firefox') >= 0){
// 					height = height - 200;
// 				}else if(navigator.userAgent.indexOf('Chrome') >= 0 ){
// 					height = height - 200;
// 				}else if(navigator.userAgent.indexOf('MSIE') >= 0){
// 					height = height - 250;
// 				}else if(navigator.userAgent.indexOf('rv:') >= 0){
// 					height = height - 200;
// 				}


                var widthdialog = window.innerWidth;//window.screen.width;
                //不计算screen的宽高，所以不用判断如果在模态框中打开的话，再缩减宽高。changchw
				//if(top.dialog ==null || top.dialog ==undefined || top.dialog =="undefined" )
				//{widthdialog = widthdialog*0.8;height=height*0.5}
				   
				var d = window.dialog({
				   title:' ',
				   id:"cjk-modal-window",
				   width:widthdialog - 200,
				   height:height-140,
				   padding: 0,
				   url:result.url,
				   okValue:"确定",
				   ok:function(){
				   		var cjkResult = window.cjkctrl.cjkConfirm();
				   		if(cjkResult.isEmpty()){
				   			alert("请选择冲借款记录!");
				   			return false;
				   		}
				   		if(cjkResult==false){
				   			return false;
				   		}
				   		ctrl.handleCJK(cjkResult);
						$(document.body).removeAttr("style"); // 2990行 需要记得释放属性 
				   },
			   	   onclose: function(){
				    	this.remove();
						$(document.body).removeAttr("style"); // 2990行 需要记得释放属性 
				   }
			    });
			  	d.showModal();
			}
		});
		}else{
			$.showMessageDialog({
				type:"info",
				title:"错误提示",
				msg:"不允许操作的交易类型",
				backdrop:true
			});
		}

	}

	//获取已经存在的冲借款数据，供冲借款功能使用
	ctrl.getCJKContrastParam = function(){
		var contrastMap = new Map();
		var rowlength = ctrl.contrastTable.getAllRows().length;
		if(rowlength>0){
			for(var i=0; i < rowlength; i++){
				if(i == rowlength-1) continue; 
				var contrastrow = ctrl.contrastTable.getAllRows()[i];
				var pk_busitem = contrastrow.data["pk_busitem"].value;//借款单表体行PK
				var cjkybje = new ctrl.bignumber(contrastrow.data["cjkybje"].value);//冲借款原币金额
				var hkybje = new ctrl.bignumber(contrastrow.data["hkybje"].value);//还款原币金额
				if(contrastMap.containsKey(pk_busitem)){
					var contrastObj = contrastMap.get(pk_busitem);
					contrastObj.cjkybje = new ctrl.bignumber(contrastObj.cjkybje).plus(cjkybje).toNumber();
					contrastObj.hkybje = new ctrl.bignumber(contrastObj.hkybje).plus(hkybje).toNumber();
					contrastMap.remove(pk_busitem);
					contrastMap.put(pk_busitem,contrastObj);
				}else{
					var contrastObj = {};
					contrastObj.pk_busitem = pk_busitem;
					contrastObj.cjkybje = cjkybje.toNumber();
					contrastObj.hkybje = hkybje.toNumber();
					contrastMap.put(pk_busitem,contrastObj);
				}
			}
		}
		return contrastMap;
	}

	//获取报销金额数据，供冲借款功能使用
	ctrl.getCJKBXJEParam = function(){
		var bzjeMap = new Map();
		for(var tabIndex=0;tabIndex<ctrl.busitemTables.length;tabIndex++){//循环表体页签
			var rowlength = ctrl.busitemTables[tabIndex].getAllRows().length; //业务行页签表体行个数
			for(var i=0; i < rowlength; i++){
				if(i == rowlength-1) continue;  
				var busitemrow = ctrl.busitemTables[tabIndex].getAllRows()[i];
				var pk_bzbm = busitemrow.data["bzbm"].value;
				var amount = new ctrl.bignumber(busitemrow.data["vat_amount"].value);//取含税金额
				if(bzjeMap.containsKey(pk_bzbm)){
					var oldAmount = new ctrl.bignumber(bzjeMap.get(pk_bzbm));
					bzjeMap.remove(pk_bzbm);
					bzjeMap.put(pk_bzbm,oldAmount.plus(amount).toNumber());
				}else{
					bzjeMap.put(pk_bzbm,amount.toNumber());
				}
			}
		}
		return bzjeMap;
	}

	//获取冲借款查询参数，供冲借款页面调用
	ctrl.getCJKSearchParam = function(){
		var param = {};
		param.pk_jkbx = ctrl.headTable.getCurrentRow().data["pk_jkbx"].value;
		param.jkbxr = ctrl.headTable.getCurrentRow().data["jkbxr"].value;
		param.receiver = ctrl.headTable.getCurrentRow().data["receiver"].value;
		param.bzbm = ctrl.headTable.getCurrentRow().data["bzbm"].value;
		param.djrq = ctrl.headTable.getCurrentRow().data["djrq"].value;
		param.dwbm = ctrl.headTable.getCurrentRow().data["dwbm"].value;
		if(ctrl.headTable.getCurrentRow().data["pk_item"].value){
			param.pk_item = ctrl.headTable.getCurrentRow().data["pk_item"].value;
		}else{
			param.pk_item = "~";
		}
		
		var bodyBZ = [];
		for(var tabIndex=0;tabIndex<ctrl.busitemTables.length;tabIndex++){//循环表体页签
			var rowlength = ctrl.busitemTables[tabIndex].getAllRows().length; //业务行页签表体行个数
			for(var i=0; i < rowlength; i++){
				if(i == rowlength-1) continue;  
				var busitemrow = ctrl.busitemTables[tabIndex].getAllRows()[i];
				bodyBZ.push(busitemrow.data["bzbm"].value);
			}
		}
		param.bzbms = bodyBZ;
		return ko.toJSON(param);
	}

	//处理冲借款返回的结果
	ctrl.handleCJK = function(cjkResult){
		//1、将冲借款的结果按照币种分摊到业务行上
		ctrl.handleCJK_busitem(cjkResult);
		//2、按照冲借款的结果生成冲销明细
		ctrl.handleCJK_contrast(cjkResult);
	}

	ctrl.handleCJK_busitem=function(cjkResult){
		var bzArr = cjkResult.keys();//所有币种
		for(var bzIndex=0;bzIndex<bzArr.length;bzIndex++){
			var bz = bzArr[bzIndex];
			var totalCJK = new ctrl.bignumber(0);//该币种下冲借款的总金额
			for(var cjkIndex=0;cjkIndex<cjkResult.get(bz).length;cjkIndex++){
				totalCJK = totalCJK.plus(new ctrl.bignumber(cjkResult.get(bz)[cjkIndex].cjkybje.replace(/,/g,"")));
			}
			var firsrRow = null;
			for(var tabIndex=0;tabIndex<ctrl.busitemTables.length;tabIndex++){//循环表体页签
				var rowlength = ctrl.busitemTables[tabIndex].getAllRows().length; //业务行页签表体行个数
				for(var i=0; i < rowlength; i++){
					if(i == rowlength-1) continue;  
					var busitemrow = ctrl.busitemTables[tabIndex].getAllRows()[i];
					if(bz===busitemrow.data["bzbm"].value){//币种相同
						var vat_amount = new ctrl.bignumber(busitemrow.data["vat_amount"].value);//取含税金额
						busitemrow.setValue("cjkybje",new ctrl.bignumber(0).toNumber());//冲借款金额默认为0
						busitemrow.setValue("hkybje",new ctrl.bignumber(0).toNumber());//还款金额默认为0
						busitemrow.setValue("zfybje",vat_amount.toNumber());//支付金额默认为报销金额
						if(totalCJK.toNumber()!==0){//冲借款有余额
							if(firsrRow===null){
								firsrRow = busitemrow;
							}			
							if (totalCJK.toNumber()>=vat_amount.toNumber()) {
								busitemrow.setValue("cjkybje",vat_amount.toNumber());
								busitemrow.setValue("zfybje",new ctrl.bignumber(0).toNumber());
								totalCJK = totalCJK.minus(vat_amount);
							}else{
								busitemrow.setValue("cjkybje",totalCJK.toNumber());
								busitemrow.setValue("zfybje",vat_amount.minus(totalCJK).toNumber());
								totalCJK = new ctrl.bignumber(0);
							}					
							busitemrow.setValue("hkybje",new ctrl.bignumber(0).toNumber());
						}else{//无余额
							busitemrow.setValue("zfybje",vat_amount);
							busitemrow.setValue("cjkybje",new ctrl.bignumber(0).toNumber());
							busitemrow.setValue("hkybje",new ctrl.bignumber(0).toNumber());
						}
					}
				}
			}
			if(totalCJK.toNumber()!==0){//全部分摊完毕后仍存在冲借款余额，产生还款
				if(firsrRow){
					var cjkybje = new ctrl.bignumber(firsrRow.data["cjkybje"].value);
					firsrRow.setValue("hkybje",totalCJK.toNumber());
					firsrRow.setValue("cjkybje",cjkybje.plus(totalCJK).toNumber());
				}
				
			}
		}
		//重新计算本币金额并汇总到表头
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
			ctrl: 'JKBXLinkAttrController',
			method: 'afterCJK',
			async: false,
			success: function(data) {
				headTotal();
			}
		});		
	}

	ctrl.handleCJK_contrast=function(cjkResult){
		var param = {};
		var allRowArr = [];//所有行
		var bzArr = cjkResult.keys();//所有币种
		for(var bzIndex=0;bzIndex<bzArr.length;bzIndex++){
			var bz = bzArr[bzIndex];
			for(var cjkIndex=0;cjkIndex<cjkResult.get(bz).length;cjkIndex++){
				allRowArr.push(cjkResult.get(bz)[cjkIndex]);
			}
		}
		param.allRows = ko.toJSON(allRowArr);
		$.ajax({
			type:"POST",
			url:"/iwebap/jkbx_cjk_ctr/generateContrast?time="+new Date().getTime(),
			dataType:"json",
			data:param,
			success:function(result){
				ctrl.contrastTable.removeAllRows();
				ctrl.loadContrastData(result, true);
				ctrl.contrastTable.createEmptyRow();
				ctrl.contrastTable.setRowFocus(ctrl.contrastTable.rows().length-1);//这里必须设置焦点行，否则表头不显示
				$("#body_1er_bxcontrast_content_tbody .oper_td").hide();
				if($("#rowadd_body_1er_bxcontrast")){//隐藏冲销页签的增加按钮
					$("#rowadd_body_1er_bxcontrast").hide();
				}
			}
		});
	},
	ctrl.handleFP=function(){
		$.showLoading();
		var data = ctrl.getValue();
		var param = {};
		param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		param.bill = ko.toJSON(data);
		param.pk_billtemplet = ctrl.app.getClientAttribute("pk_billtemplet");
		param.nodecode = ctrl.app.getEnvironment().clientAttributes["nodecode"];
		param.openbillid = ctrl.openbillid;
		$.ajax({
			type: "POST",
			url: "/iwebap/jkbx_maintain_ctr/changeFp",
			data: param,
			async: false,
			dataType: "json",
			success:function(result){
				ctrl.busitemTables[0].removeAllRows();
				ctrl.loadBxbusitemData(result,true); 
				ctrl.busitemTables[0].createEmptyRow();
				ctrl.busitemTables[0].setRowFocus(ctrl.busitemTables[0].rows().length-1);//这里必须设置焦点行，否则表头不显示
				ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,'all').fire({
					ctrl: 'JKBXLinkAttrController',
					method: 'afterCJK',
					async: false,
					success: function(data) {
						headTotal();
						$.hideLoading();
				}
		});	
			}
		});
	}
	function setNullTableHideOrShow(rowlength,flag){//设置空页签隐藏or显示
		var AlldataTable = ctrl.app.dataTables;
		for(var table in AlldataTable){
				if(flag && "body_1er_cshare_detail"!==table && "body_1er_bxcontrast"!==table){
					if(AlldataTable[table].rows().length == rowlength){
						$("#"+table.substring(0, table.indexOf("_"))+"tab"+ table.substring(table.indexOf("_"))).show();
					}
				}else{
					if(AlldataTable[table].rows().length == rowlength){
						$("#"+table.substring(0, table.indexOf("_"))+"tab"+ table.substring(table.indexOf("_"))).hide();
					}
				}
		}
	}
	function loadHKData(){
		ctrl.dataTableIDs.push("mainOrg");
		ctrl.app.dataTables.mainOrg = ctrl.mainOrg;
		$.showLoading();
		SetPk_orgNotEdit();
		var cjkparam = localStorage.getItem("cjk_param");
		var myJson = JSON.parse(localStorage.getItem(getRequestString("keyData")));
		var obj = myJson.table;
		appModel.clearData();
		appModel.datas.push(obj);
		appModel.datapks.push(obj.head.primarykey);	
		ctrl.clearAllDateTableRows();//清除ctrl中各个dataTable的数据	
		ctrl.synchronizeDataFromModel4Copy(obj);//插入复制的数据
		rebuildEmptyRow(false);//重新为各个页签创建空行
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,"all").addParameter("uistate", appModel.getUIState()).fire({
			ctrl: 'JKBXDefDataController',
			method: 'loadData4CopyHK',
			success: function(data) {
				$.hideLoading();
				var tradetype = getRequest().tradetype;
				$(".row-submit #bfCjk").hide();
				$(".row-submit #dzfpaccessory").hide();
				$("#verify").hide();
				if(appModel.uiState == $.UIState.ADD){
					//$(".row-fluid.clearfix.row-submit").hide();
					for(var j = 0;j< ctrl.busitemTables.length;j++){
						if($("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save")){
							$("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save").hide();
						}
					}
				}
				
				var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
				if (defOrg) {
					ctrl.mainOrg.getCurrentRow().setValue("pk_org", defOrg);
					ctrl.mainOrg.getCurrentRow().setMeta("pk_org", 'display', ctrl.headTable.getCurrentRow().data.pk_org.meta.display);
					setRefOrg(defOrg, ctrl.app.dataTables);
					// @sscct@合同模块补丁合并begin--20170701
			        if(ctrl.headTable.getMeta("pk_contractno")!=null)
	                 ctrl.headTable.setMeta("pk_contractno","enable",false);	
	                // @sscct@合同模块补丁合并end--20170701
				} else {
					ctrl.headTable.setEnable(false);
					for(var i=0;i<ctrl.busitemTables.length;i++){
						ctrl.busitemTables[i].setEnable(false);
					}					
					$("#body_1bodys_content_edit_menu_add").attr('disabled', 'disabled');
				}
				if(appModel.uiState != $.UIState.ADD){
					rebuildEmptyRow(true);//重新为各个页签创建空行
				}
				if($("#rowadd_body_1er_bxcontrast")){//隐藏冲销页签的增加按钮
					$("#rowadd_body_1er_bxcontrast").hide();
				}
				$('#body_tab_body_1er_bxcontrast ul li').eq(1).click(function(){
					$('#detail_rowadd_body_1er_bxcontrast').remove();
				});
			}
		});
		$("#grid_rowaddbtn_body_1arap_bxbusitem").hide();
		$("#rowadd_body_1arap_bxbusitem").hide();
		$("#detail_rowadd_body_1arap_bxbusitem").hide();
		$("#body_1arap_bxbusitem_content_tbody .oper_td").hide();
		$("#body_1er_bxcontrast_content_tbody .oper_td").hide();
		$("#detailEdit").hide();
		$("#detailDel").hide();
		$("#moreiconDetail").hide();
		if(appModel.getUIState() != $.UIState.NOT_EDIT){
			$("#lianchaContainer").hide();
		}
	}
	//加载申请单拉单数据
	function loadApplyPullData(){
		ctrl.dataTableIDs.push("mainOrg");
		ctrl.app.dataTables.mainOrg = ctrl.mainOrg;
		$.showLoading();
		SetPk_orgNotEdit();
		var myJson = JSON.parse(localStorage.getItem(getRequestString("keyData")));
		var obj = myJson.table;
		appModel.clearData();
		appModel.datas.push(obj);
		appModel.datapks.push(obj.head.primarykey);	
		ctrl.clearAllDateTableRows();//清除ctrl中各个dataTable的数据	
		ctrl.synchronizeDataFromModel4Copy(obj);//插入复制的数据
		rebuildEmptyRow(false);//重新为各个页签创建空行
		ctrl.app.serverEvent().addDataTables(ctrl.dataTableIDs,"all").addParameter("uistate", appModel.getUIState()).fire({
			ctrl: 'JKBXDefDataController',
			method: 'loadData4CopyHK',
			success: function(data) {
				$.hideLoading();
				headTotal();
				var tradetype = getRequest().tradetype;
				if(data && data!==""){
					if(JSON.parse(data).jkyjye || ""===JSON.parse(data).jkyjye){
						ctrl.jkyjye = JSON.parse(data).jkyjye;
					}
				}
				if(tradetype.indexOf("263")===0 || tradetype == "2647"){//借款单不显示冲借款按钮
					$(".row-submit #bfCjk").hide();
					$(".row-submit #dzfpaccessory").hide();
					$("#verify").hide();
				}
				if(appModel.uiState == $.UIState.ADD){
					//$(".row-fluid.clearfix.row-submit").hide();
					for(var j = 0;j< ctrl.busitemTables.length;j++){
						if($("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save")){
							$("#"+ctrl.busitemTables[j].id+"_content_edit_menu_save").hide();
						}
					}
					for(var i = 0;i < ctrl.busitemTables.length;i++){
						var divid = "rowadd_"+ctrl.busitemTables[i].id;
						if(( divid != "rowadd_body1jk_busitem" && divid !="rowadd_body_1arap_bxbusitem") && $("#"+divid)){
							$("#"+divid).hide();
						}
					}
					if($("#rowadd_body_1er_cshare_detail")){
						$("#rowadd_body_1er_cshare_detail").hide();
					}
					if(tradetype.indexOf("264")===0){//报销单是否分摊
						var iscostshare = ctrl.headTable.getCurrentRow().data.iscostshare.value;//分摊
						if("Y" === iscostshare){
							$("#bodytab_1er_cshare_detail").show();
						}else{
							$("#bodytab_1er_cshare_detail").hide();
						}
					}
				}
				
				var defOrg = ctrl.headTable.getCurrentRow().data.pk_org.value;
				if (defOrg) {
					ctrl.mainOrg.getCurrentRow().setValue("pk_org", defOrg);
					ctrl.mainOrg.getCurrentRow().setMeta("pk_org", 'display', ctrl.headTable.getCurrentRow().data.pk_org.meta.display);
					setRefOrg(defOrg, ctrl.app.dataTables);
				} else {
					ctrl.headTable.setEnable(false);
					for(var i=0;i<ctrl.busitemTables.length;i++){
						ctrl.busitemTables[i].setEnable(false);
					}					
					$("#body_1bodys_content_edit_menu_add").attr('disabled', 'disabled');
				}
				if(appModel.uiState != $.UIState.ADD){
					rebuildEmptyRow(true);//重新为各个页签创建空行
				}
				if($("#rowadd_body_1er_bxcontrast")){//隐藏冲销页签的增加按钮
					$("#rowadd_body_1er_bxcontrast").hide();
				}
				ApplyPullHKHideCopy();//设置费用申请单拉借款单,还款单只能修改行，删除行
				SetBzHide();//设置拉单的单据币种、pk_org不能修改
			}
		});
		//$("#grid_rowaddbtn_body_1arap_bxbusitem").hide();
		//$("#body_1arap_bxbusitem_content_tbody .oper_td").hide();
		$("#body_1er_bxcontrast_content_tbody .oper_td div").hide();
		if(appModel.getUIState() != $.UIState.NOT_EDIT){
			$("#lianchaContainer").hide();
		}
	}
	function getRequestString(name){
		if(getRequest()[name] != undefined){
			return getRequest()[name];
		}
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
	getRequestByCookie = function(name){
	  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	  if(arr=document.cookie.match(reg))
	   return unescape(arr[2]);
	  else
	   return null;
	 }

	//设置顶部按钮隐藏
	function setBtnHide(){
		var sxbz = ctrl.app.dataTables["headform"].getAllRows()[0].data.sxbz.value;//单据生效状态
		var spzt = ctrl.app.dataTables["headform"].getAllRows()[0].data.spzt.value//审批状态
		var zdr = ctrl.app.dataTables["headform"].getAllRows()[0].data.operator.value//审批状态
		var iseditbzr = "N";//是否来源于报账人门户
        if("jkbxcard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
              iseditbzr = "Y";
             }
        //审批人门户不显示提交、收回按钮
	    if("approvecard.html"===window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)){//请求来源于报账人门户
	        $("#bfSubmit").hide();
			$("#bfUnsendapprove").hide();
	    }  
		/*var user = getRequestByCookie("userid");
		$(".btn-toolbar.btn-left > #imageupload").hide();
		$(".btn-toolbar.btn-left > #accessorymanagement").removeClass("preline");
		if(zdr != user){
			$(".btn-group.bill-view-btns > #imageupload").hide();
		}*/
		if(ctrl.app.getEnvironment().clientAttributes["tradetype"] =="2647"){
			$("#bfCopy").hide();
		}
		if(sxbz == "1"){//生效
			$("#bfAdd").hide();
			$("#bfEdit").hide();
			//$("#bfCopy").hide();
			$("#bfDelete").hide();
			$("#bfSubmit").hide();
			$("#bfUnsendapprove").hide();
			$(".btn-group.bill-view-btns > #imageupload").hide();
		}else{
			if(iseditbzr == 'Y'){//来源于报账人门户
				if(spzt == "-1"){//初始态
					$("#bfAdd").hide();
					$("#bfEdit").show();
					$("#bfDelete").show();
					$("#bfSubmit").show();
					$("#bfUnsendapprove").hide();
				}else if(spzt == "3"){
					$("#bfAdd").hide();
					$("#bfEdit").show();
					$("#bfDelete").hide();
					$("#bfSubmit").hide();
					$("#bfUnsendapprove").show();
				}else if(spzt == "2"){
					$("#bfAdd").hide();
					$("#bfEdit").show();
					$("#bfDelete").hide();
					$("#bfSubmit").hide();
					$("#bfUnsendapprove").hide();
				}else{
					$("#bfAdd").hide();
					$("#bfEdit").show();
					$("#bfDelete").hide();
					$("#bfSubmit").hide();
					$("#bfUnsendapprove").hide();
				}
			}else{//来源于审批人门户，共享中心
				$("#bfAdd").hide();
				$("#bfEdit").show();
				$("#bfDelete").hide();
				$("#bfSubmit").hide();
				$("#bfUnsendapprove").hide();
			}
		}
		//非制单界面不显示附件管理
		if(iseditbzr == "N"){
			$(".btn-toolbar.btn-left > #accessorymanagement").hide();
		}
		if(ctrl.headTable.getCurrentRow() && ctrl.headTable.getCurrentRow().data && ctrl.headTable.getCurrentRow().data.pk_item){
			if(ctrl.headTable.getCurrentRow().data.pk_item.value){
				$("#verify").hide();
			}

		}
		var djzt = ctrl.app.dataTables["headform"].getAllRows()[0].data.djzt.value//单据状态
		if(djzt=="-1"){
			$("#bfEdit").hide();
			$("#bfDelete").hide();
			$("#bfSubmit").hide();
			$("#bfInvalid").hide();
			$("#imageupload").hide();
		}

		//借款单隐藏“电子发票”按钮
		if(getRequestString("tradetype").indexOf("263") >= 0){
			$("#dzfpaccessory").hide();
		}
	}
	//设置拉单后的页面,还款单去掉"复制"按钮,只能修改行，删除行
	function ApplyPullHKHideCopy(){
		var pk_item = ctrl.app.dataTables["headform"].getAllRows()[0].data.pk_item;//费用申请单的pk
		var srcbilltype = ctrl.app.dataTables["headform"].getAllRows()[0].data.srcbilltype;//来源单据类型
		try{
			if(getRequest().tradetype.indexOf(263) >= 0 || getRequest().tradetype =="2647"){
				if(ctrl.app.getEnvironment().clientAttributes["tradetype"] =="2647"|| (pk_item.value && srcbilltype.value)){
					$('#rowadd_body_1jk_busitem').remove();
					$('#body_tab_body_1jk_busitem ul li').eq(1).click(function(){
						$('#detail_rowadd_body_1jk_busitem').remove();
					});
					$("#bfCopy").hide();
				}
			}
		}catch(e){

		}
		
	}
	//设置拉单的单据币种、pk_org不能修改
	function SetBzHide(){
		var pk_item = ctrl.app.dataTables["headform"].getAllRows()[0].data.pk_item;//费用申请单的pk
		var srcbilltype = ctrl.app.dataTables["headform"].getAllRows()[0].data.srcbilltype;//来源单据类型
		if(pk_item && srcbilltype && pk_item.value && srcbilltype.value){
			ctrl.headTable.setMeta("bzbm","enable",false);
			for(var i=0;i<ctrl.busitemTables.length;i++){
				if(i != "headform" || i != "mainOrg"){
					ctrl.busitemTables[i].setMeta("bzbm","enable",false);
				}
				
			}
		}
		
	}
	//pk_org不可编辑
	function SetPk_orgNotEdit(){
		if(appModel.getUIState() == $.UIState.EDIT || appModel.getUIState() == $.UIState.ADD){
			ctrl.mainOrg.setMeta("pk_org","enable",false); 
		}
		if(getRequestString("applyPull") == "Y"){
			ctrl.headTable.setMeta("pk_org","enable",false);
		}
		ctrl.headTable.setMeta("pk_org_v","enable",false);
		if(ctrl.headTable.meta.pk_fiorg){
			ctrl.headTable.setMeta("pk_fiorg","enable",false);
		}
	}
	ctrl.renderType = function(obj){ 
		var grid = obj.gridObj 
		var column = obj.gridCompColumn 
		 
		var rprec = column.options.precision; 
		var maskerMeta = iweb.Core.getMaskerMeta('float') || {} 
		var precision = typeof(parseFloat(rprec)) == 'number' ? rprec : maskerMeta.precision;
		maskerMeta.precision = precision; 

		var formater = new u.NumberFormater(maskerMeta.precision); 
		var masker = new u.NumberMasker(maskerMeta); 
		var svalue;
		var values = obj.value.split('\r\n');
		if (values.length > 1) {
			var tempvalue;
			tempvalue = values[1];
			svalue = values[0] + '\r\n' + masker.format(formater.format(tempvalue)).value;
		}else{
			svalue = masker.format(formater.format(obj.value)).value;
		}
		obj.element.innerHTML = svalue 
		$(obj.element).css('text-align', 'right') 
		$(obj.element).attr('title', svalue) 

		if(typeof afterRType == 'function'){ 
			afterRType.call(this,obj); 
		} 
	}
	function detail_copy_height_set(detailflag,tradetype){
		if(detailflag){
			var div_id = "#detailtab_body_1jk_busitem";
			if(tradetype.indexOf("264") >= 0){
				div_id = "#detailtab_body_1arap_bxbusitem";
			}
			var trlenght = $(div_id).find('table tr').length;
			$(div_id).find('table tr').each(function(index, el){
				var trheight = parseInt($(this).height());
				if(trheight<130 && index<parseInt(trlenght)-1){
					$(this).height(130);
				}
			});
		}
	}
	ctrl.verify = function(){
		if(!ctrl.tablesave()){
			$.hideLoading();
			return false;
		}
		if($(".alert-dialog").length > 0){
		  	return;
		}
		var total = new ctrl.bignumber(ctrl.headTable.getCurrentRow().data.total.value);//报销总金额
		if (total.toNumber()===0) {
			$.showMessageDialog({type:"info",title:"提示",msg: "报销总金额为0，不能执行核销预提操作",backdrop:true});
			return;
		}
		var tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
		if(tradetype.indexOf("264")===0){
			$.ajax({
			type:"POST",
			url:"/iwebap/fyyt_maintain_ctr/verify?time="+new Date().getTime(),
			dataType:"json",
			success:function(result){
				var param = {};
				param.pk_jkbxr = ctrl.headTable.getCurrentRow().data.jkbxr.value;
				param.pk_bxd = ctrl.headTable.getCurrentRow().data.pk_jkbx.value;
				param.bzbm = ctrl.headTable.getCurrentRow().data.bzbm.value;
				param.pk_org = ctrl.headTable.getCurrentRow().data.pk_org.value;
				param.amount = ctrl.headTable.getCurrentRow().data.total.value;
				param.precision = ctrl.headTable.getCurrentRow().data.total.meta.precision;
				param.verify = ctrl.app.dataTables["body_1accrued_verify"].getAllDatas();
				var d = top.dialog({
				   title:' ',
				   id:"verify-modal-window",
				   width:window.screen.width - 200,
				   height:window.screen.height - 200,
				   padding: 0,
				   url:result.url,
				   data:param,

			   	   onclose: function(){
					   var value = this.returnValue;
					   var data_arr = [];
					   if(value.close == "Y"){
						   // if(value.length > 0){
						   for(var i=0;i < value.length;i++){
							   var data = {};
							   data.accrued_billno = value[i].billno;
							   data.pk_accrued_bill = value[i].pk_accrued_bill;
							   data.pk_accrued_detail = value[i].pk_accrued_detail;
							   data.verify_amount = value[i].defitem1;
							   data.pk_iobsclass = value[i].pk_iobsclass;
							   data.bxd_billno = ctrl.headTable.getCurrentRow().data.djbh.value;
							   data.pk_bxd = ctrl.headTable.getCurrentRow().data.pk_jkbx.value;
							   data.pk_org = ctrl.headTable.getCurrentRow().data.pk_org.value;
							   data_arr.push(data);
						   }

						   $.ajax({
							   type:"POST",
							   data:JSON.stringify(data_arr),
							   url:"/iwebap/fyyt_linkquery_ctr/VerifyConform?time="+new Date().getTime(),
							   dataType:"json",
							   headers: {
									"Content-type": "application/json; charset=utf-8"
							   },
							   success:function(result){
								   // if(result.value.length > 0){
									   var dataTable = ctrl.app.dataTables["body_1accrued_verify"];
									   dataTable.removeAllRows();
									   for(var i=0;i < result.value.length;i++){
										   var bodyData = result.value[i].head;
										   var row = new $.Row({
											   parent: dataTable
										   });
										   row.status = $.Row.STATUS.NORMAL;
										   ctrl.billForm.setRowValue(row, bodyData);
										   dataTable.addRow(row);
									   }
									   ctrl.app.dataTables["body_1accrued_verify"].createEmptyRow();
									   if($("#body_1accrued_verify_content_edit_menu")){
										   $("#body_1accrued_verify_content_edit_menu").remove();
									   }
									   if($("#body_1accrued_verify_content_tbody .oper_td")){
										   $("#body_1accrued_verify_content_tbody .oper_td").remove();
									   }
									   if($("#detailtab_body_1accrued_verify .oper_td")){
										   $("#detailtab_body_1accrued_verify .oper_td").remove();
									   }
									   if($("#rowadd_body_1accrued_verify")){
										   $("#rowadd_body_1accrued_verify").empty();
									   }
									   if($('#detail_rowadd_body_1accrued_verify')){
										   $('#detail_rowadd_body_1accrued_verify').remove();
									   }
									   $('#body_tab_body_1accrued_verify ul li').eq(1).click(function(){

										   $('#detail_rowadd_body_1accrued_verify').remove();
										   $("#detailtab_body_1accrued_verify .oper_td").remove();
									   });
								   }
							   // }
						   });

					   // }
					   }
					   this.remove();
				   }
			    });
			  	d.showModal();
			}
		});
		}else{
			$.showMessageDialog({
				type:"info",
				title:"错误提示",
				msg:"不允许操作的交易类型",
				backdrop:true
			});
		}
	}
	function isFreecust(field,pk){
		var param = {};
		param.field = field;
		param.pk = pk;
		var flag = false;
		$.ajax({ 
			type: "GET", 
			url: "/iwebap/jkbx_maintain_ctr/isFreecust", 
			data:param, 
			async : false,
			dataType: "json" ,
			success: function(result) {
				if(result["success"] == "true"){
					if(result["flag"]=="true")
						flag = true;
				}
			}
		});
		return flag;
	}
	function paytargetChangeInit(viewModel){
		//获取收款对象值
		var row = viewModel["headform"].getCurrentRow();
		if(row != null){
			var value = row.data.paytarget.value;
			paytargetChange(value,"");
		}		
	}
	function paytargetChange(value,dataTable){
		var Unenablefields = [];
		var enablefileds = [];
		var headtable = "headform";
		var bodytable = "body_1arap_bxbusitem";
		//var tradetype = "264X-Cxx-TYBXD";
		var enable = "enable";

		if(value == "0"){//0,员工
			Unenablefields = ["custaccount"/*客商银行账户*/,"freecust"/*散户*/];
			enablefileds = ["receiver"/*收款人*/,"skyhzh"/*收款账户*/];			
		}else if(value == "1"){//1,供应商
			Unenablefields = ["skyhzh"/*收款账户*/,"freecust"/*散户*/];
			enablefileds = ["hbbm"/*供应商*/,"custaccount"/*客商银行账户*/];			
		}else if(value == "2"){//2,客户
			Unenablefields = ["skyhzh"/*收款账户*/,"freecust"/*散户*/];
			enablefileds = ["custaccount"/*客商银行账户*/];
		}
		for(var field in enablefileds){
			if(headtable == dataTable){
				if(ctrl.app.dataTables[headtable].getCurrentRow().data[enablefileds[field]]){
					ctrl.app.dataTables[headtable].getCurrentRow().setMeta(enablefileds[field],enable,true);
				}				
			}
			if(bodytable && getRequest().tradetype.indexOf("264")>=0 && getRequest().tradetype !="2647"){
				if(ctrl.app.dataTables[bodytable].getCurrentRow().data[enablefileds[field]]){
					ctrl.app.dataTables[bodytable].getCurrentRow().setMeta(enablefileds[field],enable,true);
				}				
			}
		}
		for(var i=0;i< Unenablefields.length;i++){
			if(headtable == dataTable){
				if(ctrl.app.dataTables[headtable].getCurrentRow().data[Unenablefields[i]]){
					ctrl.app.dataTables[headtable].getCurrentRow().setMeta(Unenablefields[i],enable,false);
				}
			}
			if(bodytable && getRequest().tradetype.indexOf("264")>=0 && getRequest().tradetype !="2647"){
				if(ctrl.app.dataTables[bodytable].getCurrentRow().data[Unenablefields[i]]){
					ctrl.app.dataTables[bodytable].getCurrentRow().setMeta(Unenablefields[i],enable,false);
				}
			}
		}
	}
	return ctrl;
})

