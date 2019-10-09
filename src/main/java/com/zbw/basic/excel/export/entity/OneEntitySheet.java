package com.zbw.basic.excel.export.entity;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import com.zbw.basic.excel.export.map.GenerateData;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @description entity单sheet页导出
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class OneEntitySheet {

    public static void main(String[] args){
        dynaCol();
    }

    public static void dynaCol() {
        try {
            Workbook workbook = new HSSFWorkbook();
            workbook = GenerateEntityData.dealStudentWorkBoot("student列表导出","student列表导出");

            File savefile = new File("E:/IOStreamTest/");
            if (!savefile.exists()) {
                savefile.mkdirs();
            }
            FileOutputStream fos = new FileOutputStream("E:/IOStreamTest/学生列表导出OneSheet.xls");
            workbook.write(fos);
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
