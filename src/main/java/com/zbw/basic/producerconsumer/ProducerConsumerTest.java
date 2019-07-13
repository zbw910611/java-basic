package com.zbw.basic.producerconsumer;

/**
 * @description 5 主函数创建线程并运行
 * 生产者-消费者模型Java代码实现
 * Java的并发编程时，手写”生产者-消费者模型”是一个经典问题
 * 步骤：
 * 1. 创建一个实体类（本例为WoTou）
 * 2. 创建一个”容器”
 * 3. 创建生产者线程类
 * 4. 创建消费者线程类
 * @author bingweizhang
 * @Date 2019/7/10
 */
public class ProducerConsumerTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        Container container = new Container();
        Producer p = new Producer(container);
        Consumer c = new Consumer(container);
        new Thread(p).start();

        //可以创建多个生产者消费者线程
        //new Thread(p).start();
        //new Thread(p).start();
        //new Thread(c).start();
        new Thread(c).start();
    }
}
