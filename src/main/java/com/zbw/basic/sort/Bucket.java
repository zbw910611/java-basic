package com.zbw.basic.sort;

import com.zbw.basic.sort.utils.NumberUtils;

/**
 * @author bingweizhang
 * @description 桶排序
 * @Date 2019/7/7
 **/
public class Bucket {

    /*
     * 桶排序
     *
     * 参数说明：
     *     a -- 待排序数组
     *     max -- 数组a中最大值的范围
     */
    public static void sort(int[] a, int max) {
        int[] buckets;

        if (a==null || max<1) {
            return;
        }

        // 创建一个容量为max的数组buckets，并且将buckets中的所有数据都初始化为0。
        buckets = new int[max];

        // 1. 计数
        for(int i = 0; i < a.length; i++) {
            buckets[a[i]]++;
        }

        // 2. 排序
        for (int i = 0, j = 0; i < max; i++) {
            while( (buckets[i]--) >0 ) {
                a[j++] = i;
            }
        }

        buckets = null;
    }

    /**
     * @description 执行入口，intArrays：待排序的数组，displaySort：是否显示排序前和排序后的内容。
     * @param intArrays
     * @param max
     * @param displaySort
     * @return void
     * @author bingweizhang
     * @date 2019/7/7
     */
    public static void run(int intArrays[],int max, boolean displaySort) {
        //克隆一份数组
        int arrays[] = intArrays.clone();
        // 判断是否需要显示排序前的内容
        if (displaySort) {
            NumberUtils.display(arrays, 1);
        }
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        sort(arrays,max);
        // 记录结束时间
        long endTime = System.currentTimeMillis();
        // 判断是否需要显示排序前的内容
        if (displaySort) {
            NumberUtils.display(arrays, 2);
        }
        System.out.println("桶排序用时：" + (endTime - startTime) + "毫秒");
    }
}
