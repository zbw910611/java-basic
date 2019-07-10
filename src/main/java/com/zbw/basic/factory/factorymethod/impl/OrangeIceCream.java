package com.zbw.basic.factory.factorymethod.impl;

import com.zbw.basic.factory.factorymethod.IceCream;

public class OrangeIceCream implements IceCream {

    @Override
    public void taste(){
        System.out.println("这是橘子口味的冰激凌");
    }
}
