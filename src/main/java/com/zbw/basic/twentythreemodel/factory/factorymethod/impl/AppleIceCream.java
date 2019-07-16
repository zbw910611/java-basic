package com.zbw.basic.twentythreemodel.factory.factorymethod.impl;

import com.zbw.basic.twentythreemodel.factory.factorymethod.IceCream;

public class AppleIceCream implements IceCream {

    @Override
    public void taste(){
        System.out.println("这是苹果口味的冰激凌");
    }
}
