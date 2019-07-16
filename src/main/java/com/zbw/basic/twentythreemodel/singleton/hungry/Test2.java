package com.zbw.basic.twentythreemodel.singleton.hungry;

public class Test2 {
    public static void main(String[] args) {
//        Singleton1 singleton1 = new Singleton1();//实例化
//        System.out.println(singleton1);
        Singleton2 singleton2 = Singleton2.getInstance();//实例化
        System.out.println(singleton2);

    }
}
