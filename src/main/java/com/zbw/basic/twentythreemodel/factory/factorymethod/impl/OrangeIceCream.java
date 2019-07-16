package com.zbw.basic.twentythreemodel.factory.factorymethod.impl;

import com.zbw.basic.twentythreemodel.factory.factorymethod.IceCream;

public class OrangeIceCream implements IceCream {

    @Override
    public void taste(){
        System.out.println("这是橘子口味的冰激凌");
    }
}
