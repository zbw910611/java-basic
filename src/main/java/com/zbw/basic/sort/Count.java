package com.zbw.basic.sort;

import com.zbw.basic.sort.utils.NumberUtils;

import java.util.Arrays;

/**
 * @description 计数排序
 * @author bingweizhang
 * @Date 2019/7/7
 **/
public class Count {

    private static int[] sort(int[] array, int k) {
        int[] C = new int[k + 1];//构造C数组
        int length = array.length, sum = 0;//获取A数组大小用于构造B数组
        int[] B = new int[length];//构造B数组
        for (int i = 0; i < length; i++) {
            C[array[i]] += 1;// 统计A中各元素个数，存入C数组
        }
        for (int i = 0; i < k + 1; i++)//修改C数组
        {
            sum += C[i];
            C[i] = sum;
        }
        for (int i = length - 1; i >= 0; i--)//遍历A数组，构造B数组
        {

            B[C[array[i]] - 1] = array[i];//将A中该元素放到排序后数组B中指定的位置
            C[array[i]]--;//将C中该元素-1，方便存放下一个同样大小的元素

        }
        return B;//将排序好的数组返回，完成排序
    }

    /**
     * @description 执行入口，intArrays：待排序的数组，displaySort：是否显示排序前和排序后的内容。
     * @param intArrays
     * @param max
     * @param displaySort
     * @return void
     * @author bingweizhang
     * @date 2019/7/7
     * @throws
     */
    
    /**
     * @description 
     * @param intArrays 
     * @param max 
     * @param displaySort 
     * @return void
     * @author bingweizhang
     * @date 2019/7/7
     * @throws 
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
        System.out.println("计数排序用时：" + (endTime - startTime) + "毫秒");
    }
}
