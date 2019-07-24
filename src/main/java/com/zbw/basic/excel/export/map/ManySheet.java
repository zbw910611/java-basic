package com.zbw.basic.excel.export.map;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import cn.afterturn.easypoi.excel.export.ExcelExportService;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

/**
 * @description map多sheet页导出
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class ManySheet {

    public static void main(String[] args){
        dynaCol();
    }

    public static void dynaCol() {
        try {

            List<Map<String, Object>> mapList = new ArrayList<>();
            Map<String, Object> stringObjectMap1 = GenerateData.dealOneSheetData("价格分析表1", "数据1");
            mapList.add(stringObjectMap1);
            Map<String, Object> stringObjectMap2 = GenerateData.dealOneSheetData("价格分析表2", "数据2");
            mapList.add(stringObjectMap2);
            Map<String, Object> stringObjectMap3 = GenerateData.dealOneSheetData("价格分析表3", "数据3");
            mapList.add(stringObjectMap3);

            Workbook workbook = ExcelExportUtilSelf.exportExcelMap(mapList, ExcelType.HSSF);
            FileOutputStream fos = new FileOutputStream("E:/IOStreamTest/价格分析表.xls");
            workbook.write(fos);
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
