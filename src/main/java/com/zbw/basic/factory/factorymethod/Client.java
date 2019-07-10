package com.zbw.basic.factory.factorymethod;

import com.zbw.basic.factory.factorymethod.impl.AppleIceCreamFactory;
import com.zbw.basic.factory.factorymethod.impl.BananaIceCreamFactory;
import com.zbw.basic.factory.factorymethod.impl.OrangeIceCreamFactory;

/**
 * @description 工厂方法模式 是对简单工厂方法模式的一个抽象，抽离出了一个Factory类(或者接口)，这个接口不负责具体产品的生产，
 * 而只是指定一些规范，具体的生产工作由其子类去完成。这个模式中，工厂类和产品类往往是一一对应的，完全解决了简单工厂模式中违背“开闭原则”的问题，
 * 实现了可扩展；
 * @author bingweizhang
 * @Date 2019/7/9
 **/
public class Client {
    /**
     * @param args
     */
    public static void main(String[] args) {

        //生产苹果味冰激凌
        IceCreamFactory appleFactory = new AppleIceCreamFactory();
        IceCream appleIceCream = appleFactory.createIceCream();
        appleIceCream.taste();

        //生产香蕉口味冰激凌
        IceCreamFactory  bananaFactory = new BananaIceCreamFactory();
        IceCream bananaIceCream = bananaFactory.createIceCream();
        bananaIceCream.taste();

        //生产橘子口味冰激凌
        IceCream orangeIceCream = new OrangeIceCreamFactory().createIceCream();
        orangeIceCream.taste();
    }
}
