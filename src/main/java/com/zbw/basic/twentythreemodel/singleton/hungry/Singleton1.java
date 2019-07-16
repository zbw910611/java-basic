package com.zbw.basic.twentythreemodel.singleton.hungry;

/*
 * @description 饿汉式单例第一种方式
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton1 {

    //私有构造
    private Singleton1() {}

    private static Singleton1 singleton1 = new Singleton1();

    //静态工厂方法
    public static Singleton1 getInstance(){
        return singleton1;
    }
}
