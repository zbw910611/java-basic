package com.zbw.basic.producerconsumer;

/**
 * @description 3 创建生产者线程
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class Producer implements Runnable{//生产者线程

    Container container = null;

    public Producer(Container container) {
        this.container = container;
    }

    @Override
    public void run() {

        for(int i=0;i<100;i++){

            WoTou wotou = new WoTou(i);
            container.set(wotou);
            System.out.println("生产了:" + wotou);
            try{
                Thread.sleep((int)(Math.random() * 200));
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
