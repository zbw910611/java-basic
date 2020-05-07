package com.zbw.basic.list;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Joiner;

/**
 * list转逗号分割字符串
 */
public class JoinerTest {
    public static void main(String[] args) {
        List<String> strList = new ArrayList<>();
        strList.add("aa");
        strList.add("bb");
        strList.add("cc");

        String str = Joiner.on(",").join(strList);

        System.out.println(strList);
        System.out.println(str);
    }
}
