package com.zbw.basic.regular;

/**
 * @description ������ʽƥ��������
 * @author bingweizhang
 * @Date 2019/12/26
 */
public class RegularNum {
    public static void main(String[] args) {
        String str = "1a";
        if (str.matches("^[1-9]\\d*$")){
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
