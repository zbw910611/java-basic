package com.zbw.basic.excel.export.map;

import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @description map多sheet页导出
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class WaybillManySheet {

    public static void main(String[] args){
        dynaCol();
    }

    public static void dynaCol() {
        try {

            List<Map<String, Object>> mapList = new ArrayList<>();
            Map<String, Object> stringObjectMap1 = GenerateData.dealWaybillOneSheetData("发货清单1", "发货清单数据1");
            mapList.add(stringObjectMap1);
            Map<String, Object> stringObjectMap2 = GenerateData.dealWaybillOneSheetData("发货清单2", "发货清单数据2");
            mapList.add(stringObjectMap2);
            Map<String, Object> stringObjectMap3 = GenerateData.dealWaybillOneSheetData("发货清单3", "发货清单数据3");
            mapList.add(stringObjectMap3);

            Workbook workbook = ExcelExportUtilSelf.exportExcelMap(mapList, ExcelType.HSSF);
            FileOutputStream fos = new FileOutputStream("E:/IOStreamTest/发货清单ManySheet.xls");
            workbook.write(fos);
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
