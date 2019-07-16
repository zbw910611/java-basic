package com.zbw.basic.twentythreemodel.singleton.inside;

/**
 * @description 静态内部类实现单例
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton6 {

    //私有构造
    private Singleton6(){}

    //静态内部类
    //外部类被加载，内部类没有被加载，除非被调用时使用
    private static class InSideClass{
        private static Singleton6 singleton = new Singleton6();
    }

    //静态工厂方法
    public static Singleton6 getInstance(){
        return InSideClass.singleton;
    }
}
