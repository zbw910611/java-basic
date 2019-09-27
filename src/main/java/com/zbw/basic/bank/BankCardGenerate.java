package com.zbw.basic.bank;

import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @description 清河 工商 6212260200105136280
 * @author bingweizhang
 * @Date 2019/8/23
 */
public class BankCardGenerate {

    public static void main(String[] args){
        String bankCardBasic = "6212260200105133000";
//        System.out.println(bankCardBasic.substring(0,bankCardBasic.length()-3));
//        List<String> bankCardList = new ArrayList<>();
        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("E://IOStreamTest//BankCardGenerate3000.txt", true));
            for (int i=0;i<500;i++){
                String str = bankCardBasic.substring(0,bankCardBasic.length()-3) + (100 + i);
                // 输出内容
                bos.write(str.getBytes());
                // 输出换行符
                bos.write("\r\n".getBytes());
            }
            // 刷新此缓冲的输出流
            bos.flush();
            // 关闭流
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
//        for (int i=0;i<500;i++){
//            String str = bankCardBasic.substring(0,bankCardBasic.length()-3) + 500 + i;
//            bankCardList.add(str);
//        }
//        System.out.println(bankCardList);
    }

    public static void bufferedOutputStream(){
        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("E://IOStreamTest//test.txt", true));
            // 输出换行符
            bos.write("\r\n".getBytes());
            // 输出内容
            bos.write("Hello Android".getBytes());
            // 输出换行符
            bos.write("\r\n".getBytes());
            // 输出内容
            bos.write("张兵伟".getBytes());
            // 刷新此缓冲的输出流
            bos.flush();
            // 关闭流
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println();

    }

}
