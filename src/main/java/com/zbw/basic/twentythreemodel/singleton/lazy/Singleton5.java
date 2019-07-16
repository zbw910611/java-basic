package com.zbw.basic.twentythreemodel.singleton.lazy;

/*
 * @description 懒汉式单例双重检查同步锁
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton5 {

    //私有构造
    private Singleton5() {}

    private static Singleton5 singleton = null;

    //静态工厂方法
    public static Singleton5 getInstance(){
        if(singleton == null){
            try {
                //让线程休息10毫秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized(Singleton5.class){
                if(singleton == null){
                    singleton = new Singleton5();
                }
            }
        }
        return singleton;
    }
}
