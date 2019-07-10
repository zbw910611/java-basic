package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.BigIceCream;

public class BigOrangeIceCream implements BigIceCream {

    @Override
    public void taste() {
        System.out.println("这是橘子味冰激凌(大份)");
    }
}
