package com.zbw.basic.producerconsumer;

/**
 * @description 4 创建消费者线程
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class Consumer implements Runnable{//消费者线程

    Container container = null;

    public Consumer(Container container) {
        this.container = container;
    }

    @Override
    public void run() {

        while(true){

            WoTou woTou = container.get();
            System.out.println("消费了:"+woTou);

            try {
                Thread.sleep((int)(Math.random() * 1000));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
