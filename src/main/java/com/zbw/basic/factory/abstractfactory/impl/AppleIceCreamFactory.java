package com.zbw.basic.factory.abstractfactory.impl;

import com.zbw.basic.factory.abstractfactory.BigIceCream;
import com.zbw.basic.factory.abstractfactory.IceCreamFactory;
import com.zbw.basic.factory.abstractfactory.SmallIceCream;
import com.zbw.basic.factory.abstractfactory.impl.BigAppleIceCream;
import com.zbw.basic.factory.abstractfactory.impl.SmallAppleIceCream;

public class AppleIceCreamFactory implements IceCreamFactory {

    @Override
    public BigIceCream createBigIceCream() {
        return new BigAppleIceCream();
    }

    @Override
    public SmallIceCream createSmallIceCream() {
        return new SmallAppleIceCream();
    }
}
