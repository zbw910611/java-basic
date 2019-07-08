package com.zbw.basic.arithmetic;

import java.util.ArrayList;
import java.util.List;

/**
 * 轮流值班/加班排班
 * @author zbw
 * 2017-11-22
 */
public class Test6 {

	/**
	 * @author zbw
	 * 2017-11-22
	 * @param args
	 */
	public static void main(String[] args) {
		
		
		//1.所选人数小于每日值班人数，则提示不能排班
		//2.所选人数等于每日值班人数，继续排班，按照出勤时间排班；
		//3.所选人数大于每日值班人数，继续排班，根据出勤时间进行做一休一排班
		int everyDayNum=3;
		List<String> list1=new ArrayList<String>();
		list1.add("1");
		list1.add("2");
		list1.add("3");
		list1.add("4");
		list1.add("5");
		list1.add("6");
		list1.add("7");
		List<String> list2=new ArrayList<String>();
		
		for (int i = 0; i < 8; i++) {
			for (int j = 0; j < list1.size(); j++) {
				list2.add(list1.get(j));
			}
		}
		
		System.out.println(list2);
		
		List<String> list3=new ArrayList<String>();
		List<String> list4=new ArrayList<String>();
		for (int i = 0; i < (list2.size()+everyDayNum-1)/everyDayNum; i++) {
			String strTem="";
			for (int j = i*everyDayNum; j < list2.size(); j++) {
				if(list3.size()>everyDayNum-1){
					for (int k = 0; k < list3.size(); k++) {
						if(strTem==""){
							strTem=list3.get(k);
						}else{
							strTem+=","+list3.get(k);
						}
					}
					list4.add(strTem);
					System.out.println(list3);
					list3.clear();
					break;
				}else{
					list3.add(list2.get(j));
				}
				
			}
		}
		
		System.out.println(list4);
		
		
		/*List<String> list5=new ArrayList<String>();
		for (int i = 0; i < 8; i++) {
			int temNum2=i%2+1;
			System.out.println(temNum2);
		}*/
		
		
//		getLaDingFangZhen2();
		
		
		/*int dataSize=50;
		List<String> listIdsPart=new ArrayList<String>();
		for (int j = 0; j <= (listIds.size()+dataSize-1)/dataSize; j++){
			for (int k = j*dataSize; k < listIds.size(); k++){
				if(listIdsPart.size()>dataSize-1){
					assetAclMapper.updateAssectTypeAcl(RUId, listIdsPart,tab,tab_val);
					listIdsPart.clear();
					break;
				}else{
					listIdsPart.add(listIds.get(k));
				}
			}
		}*/
		
		
		/*int tempNum=0;
		for (int i = 0; i < 8; i++) {
			if(tempNum==list.size()-1){
				tempNum=0;
			}
			listNew.clear();
			for (int j = tempNum; j < list.size(); j++) {
				if(j<tempNum+3){
					listNew.add(list.get(j));
				}else{
					tempNum+=3;
					break;
				}
			}
			System.out.println(listNew);
		}*/
		
		
		/*int n = 2;
		int[][] arr = new int[n][9];
		int data; //数值
		//循环赋值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                data = row + col + 1;
		                if(data <= n){
		                arr[row][col] = data;
		                }else{
		                arr[row][col] = data %n;
		                }
		        }
		}
		//输出数组的值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                System.out.print(arr[row][col]);
		                System.out.print(' ');
		        }
		        System.out.println();
		}*/
		
		
		

	}
	
	
	public static int[][] getLaDingFangZhen2(){
		//拉丁方阵**********************
		//2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
		//1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
		//拉丁方阵**********************
		int n = 1;
		int[][] arr = new int[n][31];
		int data; //数值
		//循环赋值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                data = row + col + 1;
		                arr[row][col] = data %n+1;
		        }
		}
		//输出数组的值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                System.out.print(arr[row][col]);
		                System.out.print(' ');
		        }
		        System.out.println();
		}
		
		
		//System.out.println(arr);
		return arr;
		
	}

}
