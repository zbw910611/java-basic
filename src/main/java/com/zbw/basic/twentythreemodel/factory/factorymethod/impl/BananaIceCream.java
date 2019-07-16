package com.zbw.basic.twentythreemodel.factory.factorymethod.impl;

import com.zbw.basic.twentythreemodel.factory.factorymethod.IceCream;

public class BananaIceCream implements IceCream {

    @Override
    public void taste(){
        System.out.println("这是香蕉口味的冰激凌");
    }
}
