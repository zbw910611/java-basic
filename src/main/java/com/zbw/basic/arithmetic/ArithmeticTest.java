package com.zbw.basic.arithmetic;

import java.util.*;
import java.util.Map.Entry;


public class ArithmeticTest {

	public static void main(String[] args) {
		//日期
		List<String> listDate=new ArrayList<>();
		for (int i = 1; i <= 30; i++) {
			listDate.add(String.valueOf(i));
		}
		System.out.println(listDate);
		
		//人员
		/*List<String> listUser=new ArrayList<>();
		listUser.add("张三");
		listUser.add("李四");
		listUser.add("王五");
		System.out.println(listUser);*/
		
		Map<String, Object> userMap=new HashMap<>();
		userMap.put("1", "张三");
		userMap.put("2", "李四");
		userMap.put("3", "王五");
		
		LinkedHashMap<String, Map<String, Object>> mapMap=new LinkedHashMap<>();
		
		int[][] arr = Test3.getLaDingFangZhen();
		for (Entry<String,Object> entryParam : userMap.entrySet()) {
		for (int i = 0; i < arr.length; i++) {
			for (int j = 0; j < arr[i].length; j++) {
				
					//System.out.println("key="+entryParam.getKey()+",value="+entryParam.getValue());
					if(String.valueOf(arr[i][j]).equals(entryParam.getKey())){
						mapMap.put(String.valueOf(j+1), userMap);
					}
				
				
				System.out.print(arr[i][j]);
				System.out.print(" ");
			}
			System.out.println();
		}
		}
		System.out.println(mapMap);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/*int x=0;
		List<Map<String,Object>> listMap=new ArrayList<>();
		for (int j = 0; j < listUser.size(); j++) {
			for (int i = 0; i < listDate.size(); i++) {
				Map<String, Object> map=new HashMap<>();
					if(i==0){
						if(x==0){
							map.put(String.valueOf(i), listUser.get(j));
							x=1;
						}else{
							map.put(String.valueOf(i), null);
							x=0;
						}
					}else if(i==1){
						if(listMap.get(i-1).get(String.valueOf(i-1))==null){
							map.put(String.valueOf(i), listUser.get(j));
						}else{
							map.put(String.valueOf(i), null);
						}
					}else{
						if(listMap.get(i-1).get(String.valueOf(i-1))==null){
							map.put(String.valueOf(i), listUser.get(j));
						}else if(listMap.get(i-2).get(String.valueOf(i-2))!=null&&listMap.get(i-1).get(String.valueOf(i-1))!=null){
							map.put(String.valueOf(i), null);
						}else{
							map.put(String.valueOf(i), listUser.get(j));
						}
					}
				listMap.add(map);
			}
			
		}
		
		//System.out.println(listMap);
		
		
		List<Map<String,Object>> listMap1=new ArrayList<>();
		List<Map<String,Object>> listMap2=new ArrayList<>();
		List<Map<String,Object>> listMap3=new ArrayList<>();
		
		for (int i = 0; i < listMap.size(); i++) {
			if(i<30){
				listMap1.add(listMap.get(i));
			}else if(i<60){
				listMap2.add(listMap.get(i));
			}else if(i<90){
				listMap3.add(listMap.get(i));
			}
		}
		
		System.out.println(listMap1);
		System.out.println(listMap2);
		System.out.println(listMap3);*/
		
		
		
		
		
		
		
		
		
		
		/*Map<String, Object> shiftMap=new HashMap<>();
		shiftMap.put("changban8h", "a");
		shiftMap.put("riban11h", "b");
		shiftMap.put("yeban11.5", "c");
		//shiftMap.put("zhiban", "d");
		System.out.println(shiftMap);
		
		LinkedHashMap<String,Map<String, Map<Object, Object>>> mapMapMap=new LinkedHashMap<>();
		for (int i = 1; i <= listDate.size(); i++) {
			Map<String, Map<Object, Object>> mapMap=new HashMap<String, Map<Object, Object>>();
			Map<Object, Object> userShiftMap=new HashMap<>();
			for (Entry<String, Object> entryParam : shiftMap.entrySet()) {
				//System.out.println("key="+entryParam.getKey()+",value="+entryParam.getValue());
				for (int j = 0; j < listUser.size(); j++) {
					userShiftMap.put(entryParam, listUser.get(j));
				}
			}
			mapMap.put(String.valueOf(i), userShiftMap);
			mapMapMap.put(String.valueOf(i), mapMap);
		}
		
		
		System.out.println(mapMapMap);*/
		
		
		
		
		
		/*for (Entry<String,Object> entryParam : myMap.entrySet()) {
			//System.out.println("key="+entryParam.getKey()+",value="+entryParam.getValue());
		}*/
		
		
		
		/*List<String> listShift=new ArrayList<String>();
		listShift.add("常班");
		listShift.add("日班");
		listShift.add("夜班");
		listShift.add("休息");
		System.out.println(listShift);
		int yeban = 0;
		int xiuxi = 0;
		Map<String, Object> mapShift=new HashMap<String, Object>();
		for (int i = 0; i < listShift.size(); i++) {
			if(listShift.get(i).equals("夜班")){
				yeban=i;
			}else{
				xiuxi=i;
			}
			mapShift.put(String.valueOf(i), listShift.get(i));
		}
		System.out.println(yeban);
		System.out.println(mapShift);
		
		
		
		
		
		List<Map<String, Map<String, Object>>> listMapMap=new ArrayList<Map<String, Map<String, Object>>>();
		
		for (int i = 0; i < listDate.size(); i++) {
			int x=0;
			Map<String, Map<String, Object>> MapMap=new HashMap<String, Map<String, Object>>();
			Map<String, Object> map=new HashMap<String, Object>();
			for (int j = 0; j < listUser.size(); j++) {
				for (int k = x; k < mapShift.size();) {
					if(i>0){
						if(listMapMap.get(i-1).get(String.valueOf(i)).containsKey("夜班")){
							if(listMapMap.get(i-1).get(String.valueOf(i)).get("夜班").equals(listUser.get(j))){
								map.put("休息",listUser.get(j));
							}else{
								map.put(String.valueOf(mapShift.get(String.valueOf(k))),listUser.get(j));
							}
						}else{
							map.put(String.valueOf(mapShift.get(String.valueOf(k))),listUser.get(j));
						}
					}else{
						map.put(String.valueOf(mapShift.get(String.valueOf(k))),listUser.get(j));
					}
					
					x++;
					break;
				}			
			}
			MapMap.put(listDate.get(i), map);
			listMapMap.add(MapMap);
		}
		System.out.println(listMapMap);*/
		
		
		
		
		
		
		
		

	}

}
