package com.zbw.basic.excel.export.map;

import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description 生成map导出的表头和数据
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class GenerateData {

    /**
     *
     * 生成excel一个sheet页数据
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static Map<String, Object> dealOneSheetData(String title,String sheetName){
        List<ExcelExportEntity> entityList = dealColList();
        List<Map<String, Object>> dataSet = dealDataList();
        Map<String, Object> stringObjectMap = new HashMap<>();
        stringObjectMap.put("entity",new ExportParams(title, sheetName));
        stringObjectMap.put("title",entityList);
        stringObjectMap.put("data",dataSet);
        return stringObjectMap;
    }

    /**
     *
     * 生成excel一个sheet页数据waybill
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static Map<String, Object> dealWaybillOneSheetData(String title,String sheetName){
        List<ExcelExportEntity> entityList = dealWaybillColList();
        List<Map<String, Object>> dataSet = dealWaybillDataList();
        Map<String, Object> stringObjectMap = new HashMap<>();
        stringObjectMap.put("entity",new ExportParams(title, sheetName));
        stringObjectMap.put("title",entityList);
        stringObjectMap.put("data",dataSet);
        return stringObjectMap;
    }

    /**
     * 表头生成
     * @return java.util.List<cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static List<ExcelExportEntity> dealColList(){
        List<ExcelExportEntity> colList = new ArrayList<>();
        ExcelExportEntity colEntity = new ExcelExportEntity("商品名称", "title");
        colEntity.setNeedMerge(true);
        colEntity.setWidth(20);
        colList.add(colEntity);

        colEntity = new ExcelExportEntity("供应商", "supplier");
        colEntity.setNeedMerge(true);
        colEntity.setWidth(20);
        colList.add(colEntity);

        ExcelExportEntity deliColGroup = new ExcelExportEntity("得力", "deli");
        deliColGroup.setWidth(40);
        List<ExcelExportEntity> deliColList = new ArrayList<ExcelExportEntity>();
        ExcelExportEntity orgPriceDeliColEntity = new ExcelExportEntity("市场价", "orgPrice");
        orgPriceDeliColEntity.setWidth(20);
        ExcelExportEntity salePriceDeliColEntity = new ExcelExportEntity("专区价", "salePrice");
        salePriceDeliColEntity.setWidth(20);
        deliColList.add(orgPriceDeliColEntity);
        deliColList.add(salePriceDeliColEntity);
        deliColGroup.setList(deliColList);
        colList.add(deliColGroup);

        ExcelExportEntity jdColGroup = new ExcelExportEntity("京东", "jd");
        jdColGroup.setWidth(40);
        List<ExcelExportEntity> jdColList = new ArrayList<ExcelExportEntity>();
        ExcelExportEntity orgPriceJdColEntity = new ExcelExportEntity("市场价", "orgPrice");
        orgPriceJdColEntity.setWidth(20);
        ExcelExportEntity salePriceJdColEntity = new ExcelExportEntity("专区价", "salePrice");
        salePriceJdColEntity.setWidth(20);
        jdColList.add(orgPriceJdColEntity);
        jdColList.add(salePriceJdColEntity);
        jdColGroup.setList(jdColList);
        colList.add(jdColGroup);


        return colList;
    }

    /**
     * 数据生成
     * @return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static List<Map<String, Object>> dealDataList(){

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < 10; i++) {
            Map<String, Object> valMap = new HashMap<>();
            valMap.put("title", "名称." + i);
            valMap.put("supplier", "供应商." + i);

            List<Map<String, Object>> deliDetailList = new ArrayList<Map<String, Object>>();
            for (int j = 0; j < 3; j++) {
                Map<String, Object> deliValMap = new HashMap<String, Object>();
                deliValMap.put("orgPrice", "得力.市场价." + j);
                deliValMap.put("salePrice", "得力.专区价." + j);
                deliDetailList.add(deliValMap);
            }
            valMap.put("deli", deliDetailList);

            List<Map<String, Object>> jdDetailList = new ArrayList<Map<String, Object>>();
            for (int j = 0; j < 2; j++) {
                Map<String, Object> jdValMap = new HashMap<String, Object>();
                jdValMap.put("orgPrice", "京东.市场价." + j);
                jdValMap.put("salePrice", "京东.专区价." + j);
                jdDetailList.add(jdValMap);
            }
            valMap.put("jd", jdDetailList);

            list.add(valMap);
        }
        return list;
    }

    /**
     * waybill数据生成
     * @return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static List<Map<String, Object>> dealWaybillDataList(){

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < 10; i++) {
            Map<String, Object> valMap = new HashMap<>();
            List<Map<String, Object>> waybillDetailList = new ArrayList<Map<String, Object>>();
            Map<String, Object> waybillDetailValMap = new HashMap<String, Object>();
            waybillDetailValMap.put("serialNumber", i);
            waybillDetailValMap.put("waybillNumber", "waybillNumber" + i);
            waybillDetailValMap.put("articleNumber", "articleNumber" + i);
            waybillDetailValMap.put("receiveClientName", "receiveClientName" + i);
            waybillDetailValMap.put("receivePhone", "receivePhone" + i);
            waybillDetailValMap.put("receiveAddress", "receiveAddress" + i);
            waybillDetailValMap.put("sendClientName", "sendClientName" + i);
            waybillDetailList.add(waybillDetailValMap);
            valMap.put("waybillDetail", waybillDetailList);
            List<Map<String, Object>> waybillCostList = new ArrayList<Map<String, Object>>();
            Map<String, Object> waybillCostValMap = new HashMap<String, Object>();
            waybillCostValMap.put("receivableGoods", "receivableGoods" + i);
            waybillCostValMap.put("receivableFreight", "receivableFreight" + i);
            waybillCostValMap.put("shouldReceivableGoods", "shouldReceivableGoods" + i);
            waybillCostList.add(waybillCostValMap);
            valMap.put("waybillCost", waybillCostList);
            valMap.put("remark", "remark" + i);
            list.add(valMap);
        }
        return list;
    }

    /**
     * 运单表头生成
     * @return java.util.List<cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity>
     * @author bingweizhang
     * @date 2019/7/24
     * @throws
     */
    public static List<ExcelExportEntity> dealWaybillColList(){
        List<ExcelExportEntity> colList = new ArrayList<>();
        ExcelExportEntity waybillDetailColGroup = new ExcelExportEntity("运单信息", "waybillDetail");
        waybillDetailColGroup.setWidth(40);
        List<ExcelExportEntity> waybillDetailColList = new ArrayList<ExcelExportEntity>();
        ExcelExportEntity serialNumberColEntity = new ExcelExportEntity("序号", "serialNumber");
        serialNumberColEntity.setWidth(20);
        ExcelExportEntity waybillNumberColEntity = new ExcelExportEntity("运单号", "waybillNumber");
        waybillNumberColEntity.setWidth(20);
        ExcelExportEntity articleNumberColEntity = new ExcelExportEntity("货号", "articleNumber");
        articleNumberColEntity.setWidth(20);
        ExcelExportEntity receiveClientNameColEntity = new ExcelExportEntity("收货方", "receiveClientName");
        receiveClientNameColEntity.setWidth(20);
        ExcelExportEntity receivePhoneColEntity = new ExcelExportEntity("联系电话（收）", "receivePhone");
        receivePhoneColEntity.setWidth(20);
        ExcelExportEntity receiveAddressColEntity = new ExcelExportEntity("收货地址", "receiveAddress");
        receiveAddressColEntity.setWidth(20);
        ExcelExportEntity sendClientNameColEntity = new ExcelExportEntity("发货方", "sendClientName");
        sendClientNameColEntity.setWidth(20);
        waybillDetailColList.add(serialNumberColEntity);
        waybillDetailColList.add(waybillNumberColEntity);
        waybillDetailColList.add(articleNumberColEntity);
        waybillDetailColList.add(receiveClientNameColEntity);
        waybillDetailColList.add(receivePhoneColEntity);
        waybillDetailColList.add(receiveAddressColEntity);
        waybillDetailColList.add(sendClientNameColEntity);
        waybillDetailColGroup.setList(waybillDetailColList);
        colList.add(waybillDetailColGroup);

        ExcelExportEntity waybillCostColGroup = new ExcelExportEntity("运单费用", "waybillCost");
        waybillCostColGroup.setWidth(40);
        List<ExcelExportEntity> waybillCostColList = new ArrayList<ExcelExportEntity>();
        ExcelExportEntity receivableGoodsColEntity = new ExcelExportEntity("代收货款", "receivableGoods");
        receivableGoodsColEntity.setWidth(20);
        ExcelExportEntity receivableFreightColEntity = new ExcelExportEntity("运费", "receivableFreight");
        receivableFreightColEntity.setWidth(20);
        ExcelExportEntity shouldReceivableGoodsColEntity = new ExcelExportEntity("应收", "shouldReceivableGoods");
        shouldReceivableGoodsColEntity.setWidth(20);
        waybillCostColList.add(receivableGoodsColEntity);
        waybillCostColList.add(receivableFreightColEntity);
        waybillCostColList.add(shouldReceivableGoodsColEntity);
        waybillCostColGroup.setList(waybillCostColList);
        colList.add(waybillCostColGroup);

        ExcelExportEntity remarkcolEntity = new ExcelExportEntity("备注", "remark");
        remarkcolEntity.setNeedMerge(true);
        remarkcolEntity.setWidth(20);
        colList.add(remarkcolEntity);

        return colList;
    }
}
