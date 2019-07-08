package com.zbw.basic.sort;

import com.zbw.basic.sort.utils.NumberUtils;

/**
 * @description 启动类
 * @author bingweizhang
 * @Date 2019/7/7
 **/
public class Main {

    /**
     * @description 测试排序用的主方法
     * @param args
     * @return void
     * @author bingweizhang
     * @date 2019/7/7
     * @throws
     */
    public static void main(String[] args){
        //数组长度
        int length=10000;
        //最大值
        int max =100000000;
        //是否打印排序后的内容
        boolean display=false;
        //随机获取的排序数组
        int intArrays[]= NumberUtils.getRandomArs(length,max);

/*        //先用希尔排序将数组排序成有序的
        Shell.sortTest(intArrays);
        NumberUtils.display(intArrays,1);*/
//        //冒泡排序
//        Bubble.run(intArrays,display);
        //冒泡排序
        Bubble.run(intArrays,display);
        //选择排序
        Selection.run(intArrays,display);
        //插入排序
        Insertion.run(intArrays,display);
        //希尔排序
        Shell.run(intArrays,display);
        //归并
        Merge.run(intArrays,display);
        //快速
        Quick.run(intArrays,display);
        //堆排序
        Heap.run(intArrays,display);
        //基数排序
        Radix.run(intArrays,max,display);
        //计数排序
        Count.run(intArrays,max,display);
        //桶排序
        Bucket.run(intArrays,max,display);

    }
}
