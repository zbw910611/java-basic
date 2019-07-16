package com.zbw.basic.twentythreemodel.factory.abstractfactory.impl;

import com.zbw.basic.twentythreemodel.factory.abstractfactory.SmallIceCream;

public class SmallBananaIceCream implements SmallIceCream {

    @Override
    public void taste() {
        System.out.println("这是香蕉味冰激凌(小份)");
    }
}
