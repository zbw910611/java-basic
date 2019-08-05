package com.zbw.basic.sort;

import com.alibaba.fastjson.JSON;
import com.zbw.basic.sort.dto.SortEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SortEntityList {

//    public static void main(String[] args){
//        List<SortEntity> sortEntityList = new ArrayList<>();
//
//        SortEntity sortEntity2 = new SortEntity();
//        sortEntity2.setId(8);
//        sortEntity2.setName("w");
//        SortEntity sortEntity3 = new SortEntity();
//        sortEntity3.setId(9);
//        sortEntity3.setName("e");
//        SortEntity sortEntity4 = new SortEntity();
//        sortEntity4.setId(11);
//        sortEntity4.setName("r");
//        SortEntity sortEntity1 = new SortEntity();
//        sortEntity1.setId(1);
//        sortEntity1.setName("q");
//        sortEntityList.add(sortEntity1);
//        sortEntityList.add(sortEntity2);
//        sortEntityList.add(sortEntity3);
//        sortEntityList.add(sortEntity4);
//
//        List<Integer> integerList = new ArrayList<>();
//        integerList.add(8);
//        integerList.add(11);
//        integerList.add(1);
//        integerList.add(9);
//
//        String[] fields = new String[1];
//        fields[0] = "id";
//
//        String[] sorts = new String[4];
//        sorts[0] = "8";
//        sorts[1] = "11";
//        sorts[2] = "1";
//        sorts[3] = "9";
//
////        System.out.println(JSON.toJSONString(SortListUtil.sort(sortEntityList,fields,sorts)));
//
//        List<String> orderings= Stream.of("运行时间","温度").collect(Collectors.toList());
//        List<String> target= Stream.of("运行时间ss", "温度1", "运行时间ss","运行时间","运行时间", "温度1", "运行时间ss","运行时间", "温度").collect(Collectors.toList());
//        // 补充数据
//        List<String> newOrdering = Stream.concat(orderings.stream(), target.stream().filter(item -> !orderings.contains(item))).collect(Collectors.toList());
//
//
//
////        Ordering ordering = Ordering.explicit(newOrdering);
////
////        List<String> strings = target.stream().sorted(new Comparator<String>() {
////            @Override
////            public int compare (String o1, String o2) {
////                if (newOrdering.contains(o1) && newOrdering.contains(o2)) {
////                    return ordering.compare(o1, o2);
////                } else {
////                    return 0;
////                }
////            }
////        }).collect(Collectors.toList());
//
////        sortEntityList.stream().sorted(Comparator.comparing(SortEntity::getId)).collect(Collectors.toList());
////
////        System.out.println(JSON.toJSONString(sortEntityList));
//
//
//
//
//
//
//
//    }

//    public void test4(List<SortEntity> sortEntityList){
//        List<String> list = Arrays.asList("aaa","ddd","ccc","eee","bbb");
//        list.stream().sorted().forEach(System.out::println);
//
//        sortEntityList.stream().sorted((x1,x2)->{
//            if(x1.getName().equals(x2.getName())){
//                return x1.getName().compareTo(x2.getName());
//            }else{
//                return x1.getName().compareTo(x2.getName());
//            }
//        }).forEach(System.out::println);
//    }


    public static void main(String[] args) {
        List<SortEntity> sortEntityList = new ArrayList<>();

        SortEntity sortEntity1 = new SortEntity();
        sortEntity1.setId(9);
        sortEntity1.setName("e");
        SortEntity sortEntity2 = new SortEntity();
        sortEntity2.setId(8);
        sortEntity2.setName("w");
        SortEntity sortEntity3 = new SortEntity();
        sortEntity3.setId(11);
        sortEntity3.setName("r");
        SortEntity sortEntity4 = new SortEntity();
        sortEntity4.setId(1);
        sortEntity4.setName("q");
        sortEntityList.add(sortEntity1);
        sortEntityList.add(sortEntity2);
        sortEntityList.add(sortEntity3);
        sortEntityList.add(sortEntity4);
		/*Comparator<Obj> byName =  Comparator.comparing(Obj::getName).reversed();
		Comparator<Obj> finalByPrice= byName.thenComparing(Obj::getPrice,Comparator.nullsFirst(BigDecimal::compareTo)).reversed();
		List<Obj> result = list.stream().filter(new Predicate<Obj>() {
			    @Override
			    public boolean test(Obj obj) {
			    	if(obj.getName() == null && obj.getPrice() ==null){
			    		return false;
			    	}
			    	return true;
			    }
		    }).sorted(finalByPrice).collect(Collectors.toList());*/
        //此处模拟从数据读取配置到list
        List<String> sortList =  Arrays.asList("q","w","e","r");
        List<SortEntity> result = sortEntityList.stream().sorted(
                Comparator.comparing(SortEntity::getName,(x,y)->{
                    if(x == null && y != null){
                        return 1;
                    }else if(x !=null && y == null){
                        return -1;
                    }else if(x == null && y == null){
                        return -1;
                    }else{
                        //按照读取的list顺序排序
                        for(String sort : sortList){
                            if(sort.equals(x) || sort.equals(y)){
                                if(x.equals(y)){
                                    return 0;
                                }else if(sort.equals(x)){
                                    return -1;
                                }else{
                                    return 1;
                                }
                            }
                        }
                        return 0;
                    }
                })
        ).collect(Collectors.toList());
//
//        System.out.println(JSON.toJSONString(sortEntityList));

        sortEntityList.stream().sorted(Comparator.comparing(SortEntity::getId)).collect(Collectors.toList()).forEach(System.out::println);

//        List<SortEntity> result = sortEntityList.stream().sorted(Comparator.comparing(SortEntity::getId)).collect(Collectors.toList());

        System.out.println(JSON.toJSONString(sortEntityList));
        System.out.println(JSON.toJSONString(result));

    }


}
