package com.zbw.basic.twentythreemodel.factory.abstractfactory.impl;

import com.zbw.basic.twentythreemodel.factory.abstractfactory.SmallIceCream;

public class SmallOrangeIceCream implements SmallIceCream {

    @Override
    public void taste() {
        System.out.println("这是橘子味冰激凌(小份)");
    }
}
