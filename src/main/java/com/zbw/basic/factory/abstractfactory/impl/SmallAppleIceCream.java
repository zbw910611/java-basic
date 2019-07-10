package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.SmallIceCream;

public class SmallAppleIceCream implements SmallIceCream {

    @Override
    public void taste() {
        System.out.println("这是苹果味冰激凌(小份)");
    }
}
