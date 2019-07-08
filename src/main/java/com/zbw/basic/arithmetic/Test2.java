package com.zbw.basic.arithmetic;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * java护士排班 test 根据 1天24小时分成6班，一个护士一天上8个小时，一周上40小时，进行一周排班安排！拷贝，直接运行。
 * http://blog.csdn.net/zsm136767349700/article/details/53142952
 * @author zbw
 * 2017-11-9
 */
public class Test2 {

	 static int[] xuqiu = {60,70,60,50,20,30,60,70,60,50,20,30,60,70,60,50,20,30,60,70,60,50,20,30,60,70,60,50,20,30,60,70,60,50,20,30,60,70,60,50,20,30};  
	    static int[] xuqiuleijia = new int[42];//需求数量临时保存  
	    static int[][] husishnagabncishu;  //每天  2班  
	    static int[][] paiban;  
	    static Map<Integer,int[]> map;  
	      
	    public static void main(String[] args) {  
//	        text1 text1 = new text1();  
//	        text1.anpaifangjia(203);  
	    	anpaifangjia(203);
	    }  
	      
	    /** 
	     * 安排放假 
	     * */  
	    public static void anpaifangjia(int paibanlen){  
	        /* Map 格式 
	         *  一                     二                     三                     四                     五                     六                     七 
	         * 1，3，5     2，4     4，6       ............... 
	         * */  
	        int perlen = paibanlen;//行数  x2 求放假数  
	        int intpersoncount = perlen*2;//行数  x2 求放假数  
	        int chu = intpersoncount/7;//求余  
	        int yu = intpersoncount%7;//求余  
	        paiban = new int[perlen][42];  
	        map = new HashMap<Integer,int[]>();//保存 每天  放假 人的 序号  
	        for(int x = 0;x<7;x++){  
	            int[] i = new int[chu];  
	            if(yu > 0){  
	                i = new int[chu + 1];  
	                yu--;  
	            }  
	            map.put((x+1), i);  
	        }  
	        int[] arr;  
	        int per = 1;  
	        int m = 0;  
	        for(int r = 0;r<intpersoncount;r++){  
	            m++;  
	            if(m > 7) m = 1;// 1~7循环  
	            arr = map.get(m);  
	            if(Arrays.binarySearch(arr, per) < 0){//判断是否不存在  
	                for(int i=0,len=arr.length;i<len;i++){  
	                    if(arr[i] == 0){  
	                        System.out.println("第"+(m) +"组："+ per);  
	                        arr[i] = per;  
	                        per++;  
	                        if(per > perlen) {  
	                            per = 1;  
	                        }  
	                        break;  
	                    }  
	                }  
	                map.put(m, arr);  
	            }else {  
	                per++;  
	                if(per > perlen) {  
	                    per = 1;  
	                }  
	                r--;  
	                m--;  
	            }  
	        }  
	        for(int r = 0;r<perlen;r++){  
	            for(int c = 0;c<42;c++){  
	                if((c+1) %6 ==1){System.out.print(" ");}  
	                m = (c+1)/6;  
	                if((c+1)%6>0) m++;  
	                arr = map.get(m);  
	                Arrays.sort(arr); //首先对数组排序  
	                if(Arrays.binarySearch(arr, (r+1)) > -1){  
	                    paiban[r][c] = 0;  
	                    System.out.print(paiban[r][c] +" ");  
	                    continue;  
	                }else {  
	                    paiban[r][c] = 2;  
	                    System.out.print(paiban[r][c] +" ");  
	                }  
	            }  
	            System.out.println();  
	        }  
	        paiban(perlen);  
	    }  
	      
	    /** 
	     * 算出 隔班 安排 
	     * husishu 人数 
	     * */  
	    private static void paiban(int husishu){  
	        System.out.println("----------------------------------------------------show1");  
	        husishnagabncishu = new int[husishu][7];//每天  2班  
	        for(int r = 0;r<husishu;r++){  
	            for(int c = 0;c<42;c++){  
	                if(paiban[r][c] == 0){  
	                    paiban[r][c] = 0;  
	                }else {  
	                    if(xuqiushu1(r,xinqi(c))){  
	                        paiban[r][c] = 1;  
	                        if(c - 1 > -1){if(paiban[r][c-1] == 1){paiban[r][c] = 0;}}  
	                        xuqiuleijia[c] = xuqiuleijia[c] + paiban[r][c];  
	                        husishnagabncishu[r][xinqi(c)] += paiban[r][c];   
	                    }else {  
	                        paiban[r][c] = 0;  
	                    }  
	                }  
	            }  
	        }  
	        show(husishu);  
	        paiban2(husishu);  
	    }  
	      
	    /** 
	     * 整理  顺对换 
	     * husishu 人数 
	     * */  
	    private static void paiban2(int husishu){  
	        System.out.println("----------------------------------------------------show2");  
	        for(int r = 0;r<husishu;r++){  
	            for(int c = 0;c<42;c++){  
	                if(xuqiushu(c)){  
	                    if(paiban[r][c] != 0){  
	                        duihuan(r,c);  
	                    }  
	                }  
	                husishnagabncishu[r][xinqi(c)] += paiban[r][c];  
	            }  
	        }  
	        show(husishu);  
	        paiban3(husishu);  
	    }  
	      
	    /** 
	     * 整理  倒对换 
	     * husishu 人数 
	     * */  
	    private static void paiban3(int husishu){  
	        System.out.println("----------------------------------------------------show3");  
	        for(int r = 0;r<husishu;r++){  
	            for(int c = 41;c>-1;c--){  
	                if(xuqiushu(c)){  
	                    if(paiban[r][c] != 0){  
	                        duihuan1(r,c);  
	                    }  
	                }  
	                husishnagabncishu[r][xinqi(c)] += paiban[r][c];  
	            }  
	        }  
	        show(husishu);  
	    }  
	      
	    private static void show(int husishu){  
	        String ss = "";  
	        husishnagabncishu = new int[husishu][7];//每天  班次  
	        for(int r = 0;r<husishu;r++){  
	            ss = (r+1)<100?(r+1)<10?"00"+(r+1):"0"+(r+1):(r+1)+"";  
	            System.out.print("护士: " +ss+":");  
	            for(int c = 0;c<42;c++){  
	                if((c+1) %6 ==1){System.out.print(" ");}  
	                husishnagabncishu[r][xinqi(c)] += paiban[r][c];   
	                System.out.print(paiban[r][c] +" ");  
	            }  
	            int s = 0;  
	            for(int j = 0 ;j< 7;j++){  
	                s +=husishnagabncishu[r][j];  
	            }  
	            System.out.println("  一周工作："+s);  
	        }  
	        for(int c = 0;c<42;c++){  
	            int cc= 0;  
	            for(int r = 0;r<husishu;r++){  
	                if(paiban[r][c] == 1){  
	                    cc++;  
	                }  
	            }  
	            System.out.print(" 第 " + (c+1) +"列：" +cc);  
	        }  
	        System.out.println();  
	    }  
	      
	    private static boolean xuqiushu1(int c){  //满足每个时段需求 数量  
	        if(xuqiuleijia[c] < xuqiu[c]){  
	            return true;  
	        }  
	        return false;  
	    }  
	  
	    private static boolean xuqiushu(int c){  //满足每个时段需求 数量  
	        if(xuqiuleijia[c] > xuqiu[c]){  
	            return true;  
	        }  
	        return false;  
	    }  
	      
	    private static void duihuan(int r, int c){//顺对换  
	        int m;// i  的星期 几  
	        int currm;//当前 星期几  
	        int[] arr;//星期 几  的 放假  数组  
	        currm = (c+1)/6;  
	        if((c+1)%6 != 0)currm++;  
	        for(int i = c + 1;i<42;i++){  
	            m = i/6;  
	            if(i%6 != 0) m++;  
	            arr = map.get(m);  
	            Arrays.sort(arr); //首先对数组排序  
	            if(Arrays.binarySearch(arr, (r+1)) > -1){//不能 与 放假 对换  
	                continue;  
	            }  
	            if(currm != m){  
	                if(istowban(r,i)){  
	                    continue;  
	                }  
	            }  
	            if(xuqiushu1(i)){  
	                if(paiban[r][i] == 0){  
	                    paiban[r][i] = paiban[r][c];  
	                    xuqiuleijia[c] = xuqiuleijia[c] - paiban[r][c];  
	                    paiban[r][c]= 0;  
	                    xuqiuleijia[i] = xuqiuleijia[i] + paiban[r][i];  
	                    return;  
	                }  
	            }  
	        }  
	    }  
	      
	    private static void duihuan1(int r, int c){//倒对换  
	        int m;// i  的星期 几  
	        int currm;//当前 星期几  
	        int[] arr;//星期 几  的 放假  数组  
	        currm = (c+1)/6;  
	        if((c+1)%6 != 0)currm++;  
	        for(int i=c-1;i>0;i--){  
	            m = i/6;  
	            if(i%6 != 0) m++;  
	            arr = map.get(m);  
	            Arrays.sort(arr); //首先对数组排序  
	            if(Arrays.binarySearch(arr, (r+1)) > -1){//不能 与 放假 对换  
	                continue;  
	            }  
	            if(currm != m){  
	                if(istowban(r,i)){  
	                    continue;  
	                }  
	            }  
	            if(xuqiushu1(i)){  
	                if(paiban[r][i] == 0){  
	                    paiban[r][i] = paiban[r][c];  
	                    xuqiuleijia[c] = xuqiuleijia[c] - paiban[r][c];  
	                    paiban[r][c]= 0;  
	                    xuqiuleijia[i] = xuqiuleijia[i] + paiban[r][i];  
	                    return;  
	                }  
	            }  
	        }  
	    }  
	      
	    private static boolean istowban(int r,int c){//第 r 人在 这天  是否不是  2班 or 以上    
	        int count = 0;  
	        int m;  
	        int col = 0;  
	        m = (c+1)/6;  
	        if((c+1)%6>0) m++;  
	        col = (m - 1)*6;  
	        for(int j =0;j<6;j++){  
	            if(paiban[r][col] == 1){  
	                count++;  
	                if(count>1){  
	                    return true;  
	                }  
	            }  
	            col++;  
	        }  
	        return false;  
	    }  
	      
	    private static boolean xuqiushu1(int r,int c){  //满足每天 8小时   2班  
	        if(husishnagabncishu[r][c] >= 2){  
	            return false;  
	        }  
	        int intzhoubanci = 0;  
	        for(int col = 0;col < 7;col++){  
	            intzhoubanci  += husishnagabncishu[r][col];  
	        }         
	        if(intzhoubanci >= 10){  
	            return false;  
	        }  
	        return true;  
	    }  
	      
	    private static int xinqi(int banci){//根据  一周42班次 返回  星期几  
	        Double double1 = (double) (banci/6);          
	        return (int) Math.floor(double1);  
	    }  

}
