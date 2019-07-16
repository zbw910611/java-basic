package com.zbw.basic.twentythreemodel.singleton.lazy;

public class Test3 {
    public static void main(String[] args) {
//        System.out.println(singleton3);
//        System.out.println(singleton3);
//        System.out.println(singleton3);

        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton3.getInstance());
            }
        }.start();

        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton3.getInstance());
            }
        }.start();

        new Thread(){
            @Override
            public void run(){
                System.out.println(Singleton3.getInstance());
            }
        }.start();


    }
}
