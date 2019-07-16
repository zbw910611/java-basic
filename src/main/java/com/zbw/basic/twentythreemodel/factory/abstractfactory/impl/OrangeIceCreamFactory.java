package com.zbw.basic.twentythreemodel.factory.abstractfactory.impl;

import com.zbw.basic.twentythreemodel.factory.abstractfactory.BigIceCream;
import com.zbw.basic.twentythreemodel.factory.abstractfactory.IceCreamFactory;
import com.zbw.basic.twentythreemodel.factory.abstractfactory.SmallIceCream;

public class OrangeIceCreamFactory implements IceCreamFactory {

    @Override
    public BigIceCream createBigIceCream() {
        return new BigOrangeIceCream();
    }

    @Override
    public SmallIceCream createSmallIceCream() {
        return new SmallOrangeIceCream();
    }
}
