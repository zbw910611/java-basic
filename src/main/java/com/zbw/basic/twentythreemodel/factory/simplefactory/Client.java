package com.zbw.basic.twentythreemodel.factory.simplefactory;

/**
 * @description 简单工厂模式，工厂类是整个模式的关键所在，包含了必要的逻辑判断，能够外界给定的信息， 决定究竟创建哪个具体类的对象。
 * @author bingweizhang
 * @Date 2019/7/9
 **/
public class Client {
    public static void main(String[] args) {

        IceCream appleIceCream = IceCreamFactory.creamIceCream("Apple");
        appleIceCream.taste();

        IceCream bananaIceCream = IceCreamFactory.creamIceCream("Banana");
        bananaIceCream.taste();

        IceCream orangeIceCream = IceCreamFactory.creamIceCream("Orange");
        orangeIceCream.taste();
    }
}
