package com.zbw.basic;

import com.alibaba.fastjson.JSON;

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

        Long i = Long.parseLong("1000");
        Long j = Long.parseLong("1000");
        System.out.print(i.equals(j));


    }


}
