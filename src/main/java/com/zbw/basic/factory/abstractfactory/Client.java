package com.zbw.basic.factory.abstractfactory;

import com.zbw.basic.factory.abstractfactory.impl.AppleIceCreamFactory;
import com.zbw.basic.factory.abstractfactory.impl.BananaIceCreamFactory;
import com.zbw.basic.factory.abstractfactory.impl.OrangeIceCreamFactory;

/**
 * @description 抽象工厂模式 的特点是存在多个抽象产品类，每个抽象产品类可以派生出多个具体产品类，工厂提供多种方法，去生产“系列”产品。
 * 简单工厂模式适用于工厂类需要创建的对象比较少的情况，客户只需要传入具体的参数，就可以忽略工厂的生产细节，去获取想要的对象；
 * 工厂方法模式，主要是针对单一产品结构的情景；
 * 抽象工厂模式则是针对多级产品结构(系列产品)的一种工厂模式。
 * 最后在说一下，每种模式都有自己的优点和弊端，没有最好的模式，只有最适合的模式，只要符合实际开发需求就是最好的。
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class Client {

    public static void main(String[] args) {

        //生产苹果味冰激凌
        IceCreamFactory appleIceCreamFactory = new AppleIceCreamFactory();
        BigIceCream appleBigIceCream = appleIceCreamFactory.createBigIceCream();
        SmallIceCream appleSmallIceCream = appleIceCreamFactory.createSmallIceCream();
        appleBigIceCream.taste();
        appleSmallIceCream.taste();

        //生产香蕉味冰激凌
        IceCreamFactory bananaIceCreamFactory = new BananaIceCreamFactory();
        BigIceCream bananaBigIceCream = bananaIceCreamFactory.createBigIceCream();
        SmallIceCream bananaSmallIceCream = bananaIceCreamFactory.createSmallIceCream();
        bananaBigIceCream.taste();
        bananaSmallIceCream.taste();

        //生产橘子味冰激凌
        IceCreamFactory orangeIceCreamFactory = new OrangeIceCreamFactory();
        BigIceCream orangeBigIceCream = orangeIceCreamFactory.createBigIceCream();
        SmallIceCream orangeSmallIceCream = orangeIceCreamFactory.createSmallIceCream();
        orangeBigIceCream.taste();
        orangeSmallIceCream.taste();
    }
}
