package com.zbw.basic.json;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class GsonJson {

    public static void main(String[] args) {
        String fuzhuhesuan= "{\"1121\":{\"0004\":\"2020512\"},\"1122\":{\"0004\":\"2020512\"},\"112201\":{\"0004\":\"2020512\"},\"112202\":{\"0004\":\"2020512\"},\"1123\":{\"0004\":\"2020512\"},\"1132\":{\"0004\":\"2020512\"},\"113201\":{\"0004\":\"2020512\"},\"113202\":{\"0004\":\"2020512\"},\"113203\":{\"0004\":\"2020512\"},\"113204\":{\"0004\":\"2020512\"},\"113299\":{\"0004\":\"2020512\"},\"1221\":{\"0004\":\"2020512\"},\"122101\":{\"0004\":\"2020512\"},\"12210101\":{\"0004\":\"2020512\"},\"12210102\":{\"0004\":\"2020512\"},\"12210103\":{\"0004\":\"2020512\"},\"12210104\":{\"0004\":\"2020512\"},\"12210105\":{\"0004\":\"2020512\"},\"122102\":{\"0004\":\"2020512\"},\"12210201\":{\"0004\":\"2020512\"},\"12210202\":{\"0004\":\"2020512\"},\"12210203\":{\"0004\":\"2020512\"},\"12210204\":{\"0004\":\"2020512\"},\"12210205\":{\"0004\":\"2020512\"},\"12210206\":{\"0004\":\"2020512\"},\"12210207\":{\"0004\":\"2020512\"},\"1231\":{\"0004\":\"2020512\"},\"1511\":{\"0004\":\"2020512\"},\"151101\":{\"0004\":\"2020512\"},\"15110101\":{\"0004\":\"2020512\"},\"15110102\":{\"0004\":\"2020512\"},\"15110103\":{\"0004\":\"2020512\"},\"151102\":{\"0004\":\"2020512\"},\"15110201\":{\"0004\":\"2020512\"},\"15110202\":{\"0004\":\"2020512\"},\"15110203\":{\"0004\":\"2020512\"},\"151103\":{\"0004\":\"2020512\"},\"15110301\":{\"0004\":\"2020512\"},\"15110302\":{\"0004\":\"2020512\"},\"15110303\":{\"0004\":\"2020512\"},\"2201\":{\"0004\":\"2020512\"},\"2202\":{\"0004\":\"2020512\"},\"220201\":{\"0004\":\"2020512\"},\"220202\":{\"0004\":\"2020512\"},\"220203\":{\"0004\":\"2020512\"},\"2203\":{\"0004\":\"2020512\"},\"220301\":{\"0004\":\"2020512\"},\"220302\":{\"0004\":\"2020512\"}}";
//        System.out.println(fuzhuhesuan);
        Gson gson = new Gson();
        Map<String,Map<String,String>> map = gson.fromJson(fuzhuhesuan, HashMap.class);
//        System.out.println(map);


        String kuaijikemu = "{\"6201\":\"6117\",\"620101\":\"611701\",\"620102\":\"611702\",\"620103\":\"611703\"}";
//        Map map3 = gson.fromJson(kuaijikemu, HashMap.class);
//        System.out.println(map3);


//        Map map1 = JSON.parseObject(fuzhuhesuan, Map.class);
//        System.out.println(map1);
//
//        for (Object map : map1.entrySet()){
//            System.out.println(((Map.Entry)map).getKey()+"     " + ((Map.Entry)map).getValue());
//        }
//        Map mapObj = JSONObject.parseObject(fuzhuhesuan,Map.class);
//        System.out.println(mapObj);


//        Map<String,Map<String,String>> mapMap = new HashMap<>();
//        Map<String,String> map = new HashMap<>();
//        map.put("1","2");
//        mapMap.put("a",map);
//        mapMap.put("b",map);
//        System.out.println(mapMap);
//        String str = JSON.toJSONString(mapMap);
//        System.out.println(str);


//        String fuzhuhesuan=NCConnTool.fuzhuhesuan();
        Map<String,Map<String,String>> fuzhuhesuanMap = gson.fromJson(fuzhuhesuan, HashMap.class);
//        String kuaijikemu = NCConnTool.kuaijikemu();
        Map<String,String> kuaijikemuMap = gson.fromJson(kuaijikemu, HashMap.class);

        HashMap<String, String> accountMap = new HashMap<>();
        accountMap.put("1qaz","1121");

        StringBuffer strBuff = new StringBuffer();
        strBuff.append("<pk_accasoa>");
        //20200617张兵伟凭证传输特殊翻译问题--
        String pk_accasoaCode = "";
        String pk_accasoa = "1qaz";
        if(accountMap != null && accountMap.containsKey(pk_accasoa)) {
            pk_accasoaCode = accountMap.get(pk_accasoa);
            if(kuaijikemuMap.containsKey(pk_accasoaCode)) {
                pk_accasoaCode = kuaijikemuMap.get(pk_accasoaCode);
            }
        }
        strBuff.append(pk_accasoaCode);
        //20200617张兵伟凭证传输特殊翻译问题--
        strBuff.append("</pk_accasoa>");
        //20200617张兵伟凭证传输特殊翻译问题--
        if(fuzhuhesuanMap.containsKey(pk_accasoaCode)) {
            Map<String, String> mapTemp = fuzhuhesuanMap.get(pk_accasoaCode);
            String pk_Checktype = "";
            String pk_Checkvalue = "";
            for (Map.Entry<String,String> entry : mapTemp.entrySet()){
                pk_Checktype = entry.getKey();
                pk_Checkvalue = entry.getValue();
            }
            //<item>
            strBuff.append("<item>");
            //<!-- 辅助核算类型    (会计科目辅助核算)  -->pk_Checktype>0007</pk_Checktype>
            strBuff.append("<pk_Checktype>");
            strBuff.append(pk_Checktype);
            strBuff.append("</pk_Checktype>");
            //<!-- 辅助核算值    （档案转换） --><pk_Checkvalue>luotest</pk_Checkvalue>
            strBuff.append("<pk_Checkvalue>");
            strBuff.append(pk_Checkvalue);
            strBuff.append("</pk_Checkvalue>");
            //</item>
            strBuff.append("</item>");
        }
        //20200617张兵伟凭证传输特殊翻译问题--

        System.out.println(strBuff.toString());

    }

}
