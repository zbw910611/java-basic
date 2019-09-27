package com.zbw.basic;

import com.alibaba.fastjson.JSON;
import com.zbw.basic.excel.export.entity.Student;

import java.util.ArrayList;
import java.util.List;

public class JavaBasic {
    public static void main(String[] args){
//        System.out.println("JavaBasic");
//        List<String> stringList = new ArrayList<>();
//        stringList.add("1");
//        stringList.add("2");
//        stringList.add("3");
//        System.out.println(stringList);

//        //使用二维数组生成排班模型
//        int[][] arr = new int[4][31];
//        int data; //数值
//        //循环赋值,获取排班模板
//        for(int row = 0;row < arr.length;row++){
//            for(int col = 0;col <arr[row].length;col++){
//                data = row + col + 1;
//                arr[row][col] = data %3+1;
//            }
//        }
////        System.out.println(JSON.toJSONString(data));
//        System.out.println(JSON.toJSONString(arr));
//
//        for(int row = 0;row < arr.length;row++){
//            for(int col = 0;col <arr[row].length;col++){
//                System.out.print(arr[row][col]);
//            }
//            System.out.println();
//        }

//        Long i = Long.parseLong("1000");
//        Long j = Long.parseLong("1000");
//        System.out.print(i.equals(j));

//        List<Student> studentList1 = new ArrayList<>();
//        List<Student> studentList2 = new ArrayList<>();
//        Student student = new Student();
//        student.setId("11");
//        studentList1.add(student);
//        student = new Student();
//        student.setId("12");
//        studentList1.add(student);
//        student = new Student();
//        student.setId("13");
//        studentList1.add(student);
//
//        student = new Student();
//        student.setId("11");
//        studentList2.add(student);
//        student = new Student();
//        student.setId("12");
//        studentList2.add(student);
//        student = new Student();
//        student.setId("13");
//        studentList2.add(student);
//        student = new Student();
//        student.setId("14");
//        studentList2.add(student);
//        student = new Student();
//        student.setId("15");
//        studentList2.add(student);
//        student = new Student();
//        student.setId("16");
//        studentList2.add(student);
//        System.out.println(JSON.toJSONString(studentList1));
//        System.out.println(JSON.toJSONString(studentList2));
//
//        for (int i = 0;i <= studentList2.size() - 1;i++){
//            if (studentList1.size() -1 >= i){
//                System.out.println(i);
//            } else {
//                System.out.println("a" + i);
//            }
//        }

        String string = "develop##wl0001";
        System.out.println(string.indexOf("#"));
        System.out.println(string.substring(0,string.indexOf("#")));
        System.out.println(string.substring(string.indexOf("#") + 1,string.length()));
        String string1 = "develop#wl0001";
        System.out.println(string1.lastIndexOf("#"));
        System.out.println(string.substring(0,string.lastIndexOf("#")));
        System.out.println(string1.substring(string1.lastIndexOf("#") + 1,string1.length()));


    }


}
