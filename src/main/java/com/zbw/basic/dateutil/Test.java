package com.zbw.basic.dateutil;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {

    public static void main(String[] args) {
        Long longT = Long.parseLong("1570503697023");
//        Date date = java.sql.Date.valueOf(long);//Long-->Date
        Date date = new Date(longT);//Long-->Date（常用）

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String string=sdf.format(date);//Date-->String

        System.out.println(string);
    }
}
