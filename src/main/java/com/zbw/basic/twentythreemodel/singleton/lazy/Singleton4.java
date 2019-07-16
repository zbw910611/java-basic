package com.zbw.basic.twentythreemodel.singleton.lazy;

/*
 * @description 懒汉式单例同步锁
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton4 {

    //私有构造
    private Singleton4() {}

    private static Singleton4 singleton = null;

    //静态工厂方法
    synchronized public static Singleton4 getInstance(){
        if(singleton == null){
            try {
                //让线程休息10毫秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            singleton = new Singleton4();
        }
        return singleton;
    }
}
