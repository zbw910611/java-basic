package com.zbw.basic.twentythreemodel.factory.simplefactory;

import com.zbw.basic.twentythreemodel.factory.simplefactory.impl.AppleIceCream;
import com.zbw.basic.twentythreemodel.factory.simplefactory.impl.BananaIceCream;
import com.zbw.basic.twentythreemodel.factory.simplefactory.impl.OrangeIceCream;

public class IceCreamFactory {
    public static IceCream creamIceCream(String taste){

        IceCream iceCream = null;

        // 这里我们通过switch来判断，具体制作哪一种口味的冰激凌
        switch(taste){

            case "Apple":
                iceCream = new AppleIceCream();
                break;

            case "Orange":
                iceCream = new OrangeIceCream();
                break;

            case "Banana":
                iceCream = new BananaIceCream();
                break;

            default:
                break;
        }

        return iceCream;
    }
}
