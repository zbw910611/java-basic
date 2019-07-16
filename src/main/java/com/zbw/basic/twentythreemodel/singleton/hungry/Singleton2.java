package com.zbw.basic.twentythreemodel.singleton.hungry;

/*
 * @description 饿汉式单例第二种方式
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton2 {

    //私有构造
    private Singleton2() {}

    private static Singleton2 singleton = null;

    //静态代码块
    static{
        singleton = new Singleton2();
    }

    //静态工厂方法
    public static Singleton2 getInstance(){
        return singleton;
    }
}
