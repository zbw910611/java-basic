package com.zbw.basic.excel.export.map;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @description map单sheet页导出
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class OneSheet {

    public static void main(String[] args){
        dynaCol();
    }

    public static void dynaCol() {
        try {
            List<ExcelExportEntity> colList = GenerateData.dealColList();
            List<Map<String, Object>> list = GenerateData.dealDataList();

            Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("价格分析表", "数据"), colList,
                    list);

            Sheet sheet = workbook.getSheetAt(0);
            //解除锁定行
            sheet.createFreezePane(0, 0, 0, 0);
            //插入第二行（把第一行至最后一行下移一行）
            sheet.shiftRows(1, sheet.getLastRowNum(), 1);
            //锁定第四行
            sheet.createFreezePane(0, 4, 0, 4);
//            int lastRowNum = sheet.getLastRowNum();
            Row firstRow = sheet.getRow(0);
            Row fourRow = sheet.getRow(3);
//            System.out.println(lastRowNum);
            Row insertRow = sheet.createRow(1);
            insertRow.createCell(0).setCellValue("qqq");
            insertRow.createCell(1).setCellValue("");
            insertRow.createCell(2).setCellValue("eee");
            insertRow.createCell(3).setCellValue("rrr");
            insertRow.createCell(4).setCellValue("ttt");
            insertRow.createCell(5).setCellValue("yyy");
            insertRow.setHeight(firstRow.getHeight());
//            CellStyle style = workbook.createCellStyle();
//            Font font = workbook.createFont();
//            font.setFontHeightInPoints(firstRow.getCell(0).getCellStyle().getFontIndex());
//            style.setFont(font);
            insertRow.getCell(0).setCellStyle(fourRow.getCell(2).getCellStyle());
            insertRow.getCell(1).setCellStyle(fourRow.getCell(2).getCellStyle());
            insertRow.getCell(2).setCellStyle(fourRow.getCell(2).getCellStyle());
            insertRow.getCell(3).setCellStyle(fourRow.getCell(2).getCellStyle());
            insertRow.getCell(4).setCellStyle(fourRow.getCell(2).getCellStyle());
            insertRow.getCell(5).setCellStyle(fourRow.getCell(2).getCellStyle());
//            insertRow.setHeight(firstRow.getHeight());
//            sheet.shiftRows(lastRowNum + 1,lastRowNum + 1,-34,true,false);

            //合并第二行第一第二列
            CellRangeAddress region=new CellRangeAddress(1, 1, 0, 1);
            sheet.addMergedRegion(region);
            FileOutputStream fos = new FileOutputStream("E:/IOStreamTest/价格分析表OneSheet.xls");
            workbook.write(fos);
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
