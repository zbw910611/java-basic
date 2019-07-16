package com.zbw.basic.twentythreemodel.singleton.inside;

import com.zbw.basic.twentythreemodel.singleton.hungry.Singleton1;

public class Test6 {
    public static void main(String[] args) {
        Singleton6 singleton6 = Singleton6.getInstance();//实例化
        System.out.println(singleton6);

    }
}
