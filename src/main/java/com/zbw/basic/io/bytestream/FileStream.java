package com.zbw.basic.io.bytestream;

import java.io.*;

public class FileStream {

    public static void main(String[] args) {

//        fileOutputStream();
        System.out.println("*****************************************************************************");
        fileInputStream1();
        System.out.println();
        System.out.println("*****************************************************************************");
        System.out.println();
        fileInputStream2();
        System.out.println();
        System.out.print("*****************************************************************************");


    }

    public static void fileInputStream1(){
        try {
            // 读取f盘下该文件f://hell/test.txt
            //构造方法1
            InputStream inputStream = new FileInputStream(new File("E://IOStreamTest//test.txt"));
            int i = 0;
            //一次读取一个字节
            //从输入流中读取一个字节返回int型变量，若到达文件末尾，则返回-1
            while ((i = inputStream.read()) != -1) {
                // System.out.print(i + " ");// 65 66 67 68
                //为什么会输出65 66 67 68？因为字符在底层存储的时候就是存储的数值。即字符对应的ASCII码。
                // A B C D
                System.out.println((char) i + " ");
            }
            //关闭IO流
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void fileInputStream2(){
        try {
            // 读取f盘下该文件f://hell/test.txt
            //构造方法2
            InputStream inputStream2 = new FileInputStream(new File("E://IOStreamTest//test.txt"));
            // 字节数组
            byte[] b = new byte[2];
            int i2 = 0;
            //  一次读取一个字节数组
            while ((i2 = inputStream2.read(b)) != -1) {
                // AB CD
                System.out.print(new String(b, 0, i2) + " ");
            }
            //关闭IO流
            inputStream2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void fileOutputStream(){
        try {
            OutputStream outputStream = new FileOutputStream(new File("E://IOStreamTest//test.txt"),true);
            // 写出数据
            outputStream.write("ABCD".getBytes());
            // 关闭IO流
            outputStream.close();

            // 内容追加写入
            OutputStream outputStream2 = new FileOutputStream(new File("E://IOStreamTest//test.txt"),true);
            // 输出换行符
            outputStream2.write("\r\n".getBytes());
            // 输出追加内容
            outputStream2.write("hello".getBytes());
            // 关闭IO流
            outputStream2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
