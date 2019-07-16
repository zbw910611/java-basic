package com.zbw.basic.twentythreemodel.singleton.lazy;

/*
 * @description 懒汉式单例线程不安全写法
 * @author bingweizhang
 * @Date 2019/7/17
 */
public class Singleton3 {

    //私有构造
    private Singleton3() {}

    private static Singleton3 singleton = null;

    //静态工厂方法
    public static Singleton3 getInstance(){
        if(singleton == null){
            try {
                //让线程休息10毫秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            singleton = new Singleton3();
        }
        return singleton;
    }
}
