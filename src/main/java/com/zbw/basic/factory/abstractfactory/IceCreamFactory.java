package com.zbw.basic.factory.abstractfactory;

import com.zbw.basic.factory.abstractfactory.BigIceCream;
import com.zbw.basic.factory.abstractfactory.SmallIceCream;

public interface IceCreamFactory {

    public BigIceCream createBigIceCream();

    public SmallIceCream createSmallIceCream();
}
