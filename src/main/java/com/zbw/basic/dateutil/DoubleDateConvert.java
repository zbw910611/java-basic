package com.zbw.basic.dateutil;

import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Date;

public class DoubleDateConvert {

    /**
     * 时间转double
     * @param date
     * @return 返回值类似：43322.3770190278
     */
    public static double Date2Double(Date date){
//        @SuppressWarnings("deprecation")
//        long localOffset  = date.getTimezoneOffset()*60000;
//        double dd = (double)(date.getTime()-localOffset)/ 24 / 3600 / 1000 + 25569.0000000;
//        DecimalFormat df = new DecimalFormat("#.0000000000");//先默认保留10位小数

        Calendar calendar = Calendar.getInstance();
        long localOffset = -(calendar.get(Calendar.ZONE_OFFSET) + calendar.get(Calendar.DST_OFFSET));//计时时区
        double dd = (double)(date.getTime()-localOffset)/ 24 / 3600 / 1000 + 25569.0000000;
        DecimalFormat df = new DecimalFormat("#.0000000000");//先默认保留10位小数

        return Double.valueOf(df.format(dd));
    }

    /**
     * double 转  Date 时间
     * @param dVal
     */
    public static Date DoubleToDate(Double dVal){
        Date oDate = new Date();
//        @SuppressWarnings("deprecation")
//        long localOffset = oDate.getTimezoneOffset() * 60000; //系统时区偏移 1900/1/1 到 1970/1/1 的 25569 天
        Calendar calendar = Calendar.getInstance();
        long localOffset = -(calendar.get(Calendar.ZONE_OFFSET) + calendar.get(Calendar.DST_OFFSET));//计时时区
        oDate.setTime((long) ((dVal - 25569) * 24 * 3600 * 1000 + localOffset));

        return oDate;
    }

    

    public static void main(String[] args) {
        System.out.println(DateUtil.getDateConvertStr(DoubleToDate(1569392865.824),DateUtil.DATE_TIME_FORMAT_YYYY_MM_DD_HH_MI_SS));
    }


}
