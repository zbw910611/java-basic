package com.zbw.basic.twentythreemodel.singleton.hungry;

import com.zbw.basic.twentythreemodel.singleton.lazy.Singleton3;

public class Test1 {
    public static void main(String[] args) {
//        Singleton1 singleton1 = new Singleton1();//实例化
//        System.out.println(singleton1);
        Singleton1 singleton1 = Singleton1.getInstance();//实例化
        System.out.println(singleton1);

    }
}
