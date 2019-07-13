package com.zbw.basic.producerconsumer;

/**
 * @description 1 首先创建一个实体类
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class WoTou {
    //用来标记生产的每个实例
    int id;

    public WoTou(int id){
        this.id = id;
    }

    @Override
    public String toString(){
        //重写toString方法，方便打印
        return "WoTou:" + id;
    }
}
