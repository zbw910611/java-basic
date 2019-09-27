package com.zbw.basic.md5;

import java.security.MessageDigest;

public class Md5Util {

    /**
     * 密码加密工具类
     * @param inStr  需要加密的对象
     * @param salt        盐
     * @author sun
     * @date 2017/12/5 10:16
     * @return 加密后的字符串
     */
    public static String encryption(String inStr,String salt){
        MessageDigest md5 = null;
        try{
            md5 = MessageDigest.getInstance("MD5");
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
        char[] charArray = (inStr+salt).toCharArray();
        byte[] byteArray = new byte[charArray.length];

        for (int i = 0; i < charArray.length; i++){
            byteArray[i] = (byte) charArray[i];
        }
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++){
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16){
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();

    }

    public static void main(String[] args) {
        System.out.println(encryption("1234567","wl0001"));;
    }
}
