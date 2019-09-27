package com.zbw.basic.gps;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * @description 根据两个位置的经纬度，来计算两地的距离（单位为m）
 * @author bingweizhang
 * @Date 2019/9/11
 */
public class GPSUtil {
    //6378.137为地球半径，单位为千米；
    private static final double EARTH_RADIUS = 6378.137;

    private static double rad(double d){
        return d * Math.PI / 180.0;
    }
    /**
     * 根据经纬度算距离（单位为m）
     * @param long1 位置1经度
     * @param lat1 位置1纬度
     * @param long2
     * @param lat2
     * @return
     */
    public static double getMeter(double long1, double lat1, double long2, double lat2) {
        double a, b, d, sa2, sb2;
        lat1 = rad(lat1);
        lat2 = rad(lat2);
        a = lat1 - lat2;
        b = rad(long1 - long2);

        sa2 = Math.sin(a / 2.0);
        sb2 = Math.sin(b / 2.0);
        d = 2   * EARTH_RADIUS
                * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1)
                * Math.cos(lat2) * sb2 * sb2));
        d= d * 1000;
        BigDecimal bg = new BigDecimal(d).setScale(2, RoundingMode.UP);
        return bg.doubleValue();

    }

    public static void main(String[] args) {
        System.out.println(getMeter(116.236689, 40.06679, 116.236689, 40.06679));
    }

}
