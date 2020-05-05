package com.zbw.basic.sort;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class recursion {

    public static void main(String[] args) {
        BigDecimal amount = new BigDecimal("101");
        List<BigDecimal> list = new ArrayList<>();
        deal(amount,list);
        System.out.println(list);
    }

    private static void deal(BigDecimal amount,List<BigDecimal> list){
        if (amount.compareTo(new BigDecimal("3")) == 1){
            list.add(new BigDecimal("3"));
            amount = amount.subtract(new BigDecimal("3"));
            deal(amount,list);
        } else {
            list.add(amount);
        }
    }

}
