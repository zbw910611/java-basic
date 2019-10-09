package com.zbw.basic.excel.export.entity;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.ArrayList;
import java.util.List;

public class GenerateEntityData {
    
    /**
     * 
     * 生成studentList数据
     * @return java.util.List<com.zbw.basic.excel.export.entity.SortEntity>
     * @author bingweizhang
     * @date 2019/8/1
     * @throws 
     */ 
    public static List<Student> dealStudentList(){
        Student student1 = new Student();
        student1.setName("zhangshui");
        student1.setName("1");
        Student student2 = new Student();
        student2.setName("zhanghong");
        student2.setName("2");
        List<Student> studentList = new ArrayList<>();
        studentList.add(student1);
        studentList.add(student2);
        return studentList;
    }

    /**
     *
     * 生成Workbook
     * @return org.apache.poi.ss.usermodel.Workbook
     * @author bingweizhang
     * @date 2019/8/1
     * @throws
     */
    public static Workbook dealStudentWorkBoot(String title, String sheetName){
        List<Student> studentList = dealStudentList();
        Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams(title, sheetName),Student.class,studentList);
        return workbook;
    }



}
