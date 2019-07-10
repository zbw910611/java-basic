package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.BigIceCream;

public class BigBananaIceCream implements BigIceCream {

    @Override
    public void taste() {
        System.out.println("这是香蕉味冰激凌(大份)");
    }
}
