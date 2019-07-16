package com.zbw.basic.twentythreemodel.factory.abstractfactory.impl;

import com.zbw.basic.twentythreemodel.factory.abstractfactory.BigIceCream;
import com.zbw.basic.twentythreemodel.factory.abstractfactory.IceCreamFactory;
import com.zbw.basic.twentythreemodel.factory.abstractfactory.SmallIceCream;

public class BananaIceCreamFactory implements IceCreamFactory {

    @Override
    public BigIceCream createBigIceCream() {
        return new BigBananaIceCream();
    }

    @Override
    public SmallIceCream createSmallIceCream() {
        return new SmallBananaIceCream();
    }
}
