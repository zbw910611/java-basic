package com.zbw.basic.producerconsumer;

/**
 * @description 2 创建一个“容器”，用栈这一数据结构实现，生产者每次从将生产的物品放到最上边，同时消费者每次消费最上边的物品。
 * （也可以用循环队列这一数据结构实现）
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class Container {
    int index = 0;
    WoTou []arrWT = new WoTou[6];

    //通过synchronized这一关键字来同步
    public synchronized void set(WoTou wotou){//生产方法，加锁

        while(index == arrWT.length){
            //必须使用while，而不是if
            //因为如果用if抛出异常，后边的代码还会继续执行
            //while的话抛出异常后还是回到while里边执行
            try {
                this.wait();
            } catch ( InterruptedException e) {
                e.printStackTrace();
            }
        }

        //唤醒其他线程
        this.notifyAll();

        arrWT[index++] = wotou;

    }

    //通过synchronized这一关键字来同步
    public synchronized WoTou get(){//消费方法，加锁

        while(index == 0){
            //同理，必须使用while
            try{
                this.wait();
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        this.notifyAll();


        WoTou woTou = arrWT[--index];
        return woTou;
    }
}
