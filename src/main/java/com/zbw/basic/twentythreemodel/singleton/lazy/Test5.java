package com.zbw.basic.twentythreemodel.singleton.lazy;

public class Test5 {
    public static void main(String[] args) {
//        System.out.println(singleton3);
//        System.out.println(singleton3);
//        System.out.println(singleton3);
        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton5.getInstance());
            }
        }.start();

        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton5.getInstance());
            }
        }.start();

        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton5.getInstance());
            }
        }.start();

    }
}
