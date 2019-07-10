package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.BigIceCream;
import com.zbw.basic.factory.abstractfactory.IceCreamFactory;
import com.zbw.basic.factory.abstractfactory.SmallIceCream;
import com.zbw.basic.factory.abstractfactory.impl.BigBananaIceCream;
import com.zbw.basic.factory.abstractfactory.impl.SmallBananaIceCream;

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
