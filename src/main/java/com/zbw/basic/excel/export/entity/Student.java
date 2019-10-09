package com.zbw.basic.excel.export.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;

@Data
public class Student {
    /**
     * id
     */
    private String id;
    /**
     * 学生姓名
     */
    @Excel(name = "学生姓名", orderNum = "1", width = 30)
    private String name;
    /**
     * 学生性别
     */
    @Excel(name = "学生性别", orderNum = "2", width = 30, replace = { "男_1", "女_2" })
    private int sex;
}
