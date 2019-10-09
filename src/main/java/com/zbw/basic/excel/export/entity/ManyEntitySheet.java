package com.zbw.basic.excel.export.entity;

import com.alibaba.fastjson.JSON;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description
 * @author bingweizhang
 * @Date 2019/7/24
 */
public class ManyEntitySheet {

    public static void main(String[] args){
        List<Student> studentList = GenerateEntityData.dealStudentList();
        List<HashMap> map= JSON.parseArray(JSON.toJSONString(studentList),HashMap.class);
        System.out.println(JSON.toJSONString(map));
    }


}
