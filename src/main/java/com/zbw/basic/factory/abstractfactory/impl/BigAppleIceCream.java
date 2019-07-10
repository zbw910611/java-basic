package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.BigIceCream;

public class BigAppleIceCream implements BigIceCream {

    @Override
    public void taste() {
        System.out.println("这是苹果味冰激凌(大份)");
    }
}
