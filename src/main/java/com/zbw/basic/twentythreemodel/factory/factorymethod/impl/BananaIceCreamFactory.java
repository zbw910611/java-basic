package com.zbw.basic.twentythreemodel.factory.factorymethod.impl;

import com.zbw.basic.twentythreemodel.factory.factorymethod.IceCream;
import com.zbw.basic.twentythreemodel.factory.factorymethod.IceCreamFactory;

public class BananaIceCreamFactory implements IceCreamFactory {

    @Override
    public IceCream createIceCream() {
        return new BananaIceCream();
    }
}
