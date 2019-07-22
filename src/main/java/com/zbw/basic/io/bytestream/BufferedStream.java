package com.zbw.basic.io.bytestream;

import java.io.*;

public class BufferedStream {

    public static void main(String[] args) {

        bufferedOutputStream();
        System.out.print("*****************************************************************************");
        bufferedInputStream();
        System.out.print("*****************************************************************************");

    }

    public static void bufferedInputStream(){
        try {
            InputStream in = new FileInputStream(new File("E://IOStreamTest//test.txt"));
            // 字节缓存流
            BufferedInputStream bis = new BufferedInputStream(in);
            byte[] bs = new byte[20];
            int len = 0;
            while ((len = bis.read(bs)) != -1) {

                System.out.println(new String(bs, 0, len));
                // ABCD
                // hello
            }
            // 关闭流
            bis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }


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


    }
}
