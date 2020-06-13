package com.zbw.basic.bigdecimal;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class BigDecimalTest {

    public static void main(String[] args) {
//        BigDecimal a = new BigDecimal("-1");
//        BigDecimal b = new BigDecimal("-2");
//        BigDecimal c = a.abs().add(b.abs());
//        System.out.println(c);

//        BigDecimal a = new BigDecimal("9");
//        BigDecimal b = new BigDecimal("10");
//        BigDecimal c = a.divide(b).setScale(0, RoundingMode.HALF_DOWN);
//        System.out.println(c);

        BigDecimal a = new BigDecimal("9");
        BigDecimal b = new BigDecimal("0.9");
        BigDecimal c = a.divide(b).setScale(0, RoundingMode.HALF_DOWN);
        System.out.println(c);


    }


}
