package com.zbw.basic.factory.factorymethod.impl;

import com.zbw.basic.factory.factorymethod.IceCream;
import com.zbw.basic.factory.factorymethod.IceCreamFactory;

public class BananaIceCreamFactory implements IceCreamFactory {

    @Override
    public IceCream createIceCream() {
        return new BananaIceCream();
    }
}
