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
}
