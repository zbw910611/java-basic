package gxwh;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class kuaijikemu {

//    select * from bd_defdoclist where code = 'kuaijikemu';
//
//    select * from bd_defdoc where pk_defdoclist in (select pk_defdoclist from bd_defdoclist where code = 'kuaijikemu');
//
//    delete from bd_defdoc where pk_defdoclist in (select pk_defdoclist from bd_defdoclist where code = 'kuaijikemu');



    public static void main(String[] args) {

        String sendKey = "113202,113203,113204,113299,140306,140399,140501,140502,140503,140504,140505,140599,140601,140602,140603,140604,140699,148103,148104,148199,150101,150102,150103,1502,150301,150302,150303,150401,150402,160103,160104,160105,160106,160203,160204,160205,160206,160303,160304,160305,160306,160603,160604,160603,160606,221102,22210101,222128,222129,22212901,22212902,22212903,22212904,222199,22410103,22410104,22410105,22410106,22410107,22410108,22410109,5405,5406,5407,5408,1491,1502,150301,150302,150303,220501,220502,220599,600101,600102,600103,600104,600105,605103,605104,605105,611106,620101,620102,620103,640101,640102,640103,640104,640105,640199,640206,640299,64030101,64030102,64030103,64030104,64030105,64030106,64030107,64030199,6601010205,6601010206,6601010207,660240,660241,670201,670202,670203,670204";
        String sendValue = "债权投资,其他债权投资,其他权益工具投资,其他,半成品,其他,产成品,OEM,外购商品,线材,半成品,其他,产成品,OEM,外购商品,线材,其他,长期股权投资,其他应收款,其他,面值,利息调整,应计利息,债权投资减值准备,成本,利息调整,公允价值变动,成本,公允价值变动,运输工具,电子设备,其他设备,办公家具,运输工具,电子设备,其他设备,办公家具,运输工具,电子设备,其他设备,办公家具,运输工具,电子设备,电子设备,办公家具,不在岗职工薪酬,进项税额,待分摊进项税额,应交软件项目增值税,进项税额,销项税额,转出未交增值税,软件退税,其他,本部党费,本部工会,本部团费,安全环保风险抵押金,质保金,房租押金,集团工会,合同履约成本,合同履约成本减值准备,合同取得成本,合同取得成本减值准备,合同资产,债权投资减值准备,成本,利息调整,公允价值变动,合同负债-货款,合同负债-安装服务费,合同负债-其他,产品销售收入,软件销售收入,OEM收入,服务收入,外购商品收入,代理服务,劳务服务,设备租金,债权投资收益,软件退税,政府补助,其他,产品销售成本,软件销售成本,OEM成本,服务成本,外购商品成本,其他,设备租赁成本,其他,城市维护建设税,教育费附加,地方教育费附加,房产税,土地使用税,车船使用税,印花税,其他,餐费,体检费,采暖,停工损失,会费,应收票据坏账损失,应收账款坏账损失,其他应收款坏账损失,合同资产坏账损失";
        String receiveKey = "113299,113299,113299,113299,14039901,14039999,14059901,14059902,14059903,14059904,14059905,14059999,14069901,14069902,14069903,14069904,14069999,148104,14810501,14810599,15019911,15019912,15019913,150202,15039911,15039912,15039913,15039914,15039915,160104,160103,160199,160105,160204,160203,160299,160205,160304,160303,160399,160305,160604,160603,160699,160605,22110201,2221010101,222199,222199,222199,222199,222199,222199,222199,22410104,22410103,22410108,22410109,22410110,22410111,22410103,14039902,14039903,14039904,14039905,112202,15020201,15039911,15039912,15039913,220202,220202,220202,6001019911,6001019912,6001019913,6001019914,6001019915,605104,605105,605199,611199,6117,6117,6117,6401019911,6401019912,6401019913,6401019914,6401019915,6401019999,640299,640299,640301,640301,640301,640301,640301,640301,640301,640301,6601010205,6601010206,6601010207,660240,660241,67019901,67019902,67019903,67019904";
        String receiveValue = "其他,其他,其他,其他,半成品,其他,产成品,OEM,外购商品,线材,半成品,其他,产成品,OEM,外购商品,线材,其他,长期股权投资,其他应收款,其他,面值,利息调整A,应计利息A,其他投资,其他债券投资成本,其他债权投资利息调整,公允价值变动A,其他权益工具投资-成本,其他权益投资工具公允价值变动,运输工具,电子设备,其他固定资产,办公家具,运输工具,电子设备,其他固定资产,办公家具,运输工具,电子设备,其他固定资产,办公家具,运输工具,电子设备,其他固定资产,办公家具,工资,进项税额17,其他,其他,其他,其他,其他,其他,其他,本部党费,集团工会,本部团费,安全环保风险抵押金,质保金,房租押金,集团工会,合同履约成本,合同履约成本减值准备,合同取得成本,合同取得成本减值准备,集团外部,债权投资减值准备,其他债券投资成本,其他债权投资利息调整,公允价值变动A,集团外部,集团外部,集团外部,产品销售收入,软件销售收入,OEM收入,服务收入,外购商品收入,劳务服务,设备租金,其他,其他投资收益,其他收益,其他收益,其他收益,产品销售成本,软件销售成本,OEM成本,服务成本,外购商品成本,其他,其他,其他,主营税金及附加,主营税金及附加,主营税金及附加,主营税金及附加,主营税金及附加,主营税金及附加,主营税金及附加,主营税金及附加,餐费,体检费,采暖,停工损失,会费,应收票据坏账损失,应收账款坏账损失,其他应收款坏账损失,合同资产坏账损失";
        String pk_defdoc = "1001ZZ100000000AYYD8,1001ZZ100000000AYYD9,1001ZZ100000000AYYDA,1001ZZ100000000AYYDB,1001ZZ100000000AYYDC,1001ZZ100000000AYYDD,1001ZZ100000000AYYDE,1001ZZ100000000AYYDF,1001ZZ100000000AYYDG,1001ZZ100000000AYYDH,1001ZZ100000000AYYDI,1001ZZ100000000AYYDJ,1001ZZ100000000AYYDK,1001ZZ100000000AYYDL,1001ZZ100000000AYYDM,1001ZZ100000000AYYDN,1001ZZ100000000AYYDO,1001ZZ100000000AYYDP,1001ZZ100000000AYYDQ,1001ZZ100000000AYYDR,1001ZZ100000000AYYDS,1001ZZ100000000AYYDT,1001ZZ100000000AYYDU,1001ZZ100000000AYYDV,1001ZZ100000000AYYDW,1001ZZ100000000AYYDX,1001ZZ100000000AYYDY,1001ZZ100000000AYYDZ,1001ZZ100000000AYYE0,1001ZZ100000000AYYE1,1001ZZ100000000AYYE2,1001ZZ100000000AYYE3,1001ZZ100000000AYYE4,1001ZZ100000000AYYE5,1001ZZ100000000AYYE6,1001ZZ100000000AYYE7,1001ZZ100000000AYYE8,1001ZZ100000000AYYE9,1001ZZ100000000AYYEA,1001ZZ100000000AYYEB,1001ZZ100000000AYYEC,1001ZZ100000000AYYED,1001ZZ100000000AYYEE,1001ZZ100000000AYYEF,1001ZZ100000000AYYEG,1001ZZ100000000AYYEH,1001ZZ100000000AYYEI,1001ZZ100000000AYYEJ,1001ZZ100000000AYYEK,1001ZZ100000000AYYEL,1001ZZ100000000AYYEM,1001ZZ100000000AYYEN,1001ZZ100000000AYYEO,1001ZZ100000000AYYEP,1001ZZ100000000AYYEQ,1001ZZ100000000AYYER,1001ZZ100000000AYYES,1001ZZ100000000AYYET,1001ZZ100000000AYYEU,1001ZZ100000000AYYEV,1001ZZ100000000AYYEW,1001ZZ100000000AYYEX,1001ZZ100000000AYYEY,1001ZZ100000000AYYEZ,1001ZZ100000000AYYF0,1001ZZ100000000AYYF1,1001ZZ100000000AYYF2,1001ZZ100000000AYYF3,1001ZZ100000000AYYF4,1001ZZ100000000AYYF5,1001ZZ100000000AYYF6,1001ZZ100000000AYYF7,1001ZZ100000000AYYF8,1001ZZ100000000AYYF9,1001ZZ100000000AYYFA,1001ZZ100000000AYYFB,1001ZZ100000000AYYFC,1001ZZ100000000AYYFD,1001ZZ100000000AYYFE,1001ZZ100000000AYYFF,1001ZZ100000000AYYFG,1001ZZ100000000AYYFH,1001ZZ100000000AYYFI,1001ZZ100000000AYYFJ,1001ZZ100000000AYYFK,1001ZZ100000000AYYFL,1001ZZ100000000AYYFM,1001ZZ100000000AYYFN,1001ZZ100000000AYYFO,1001ZZ100000000AYYFP,1001ZZ100000000AYYFQ,1001ZZ100000000AYYFR,1001ZZ100000000AYYFS,1001ZZ100000000AYYFT,1001ZZ100000000AYYFU,1001ZZ100000000AYYFV,1001ZZ100000000AYYFW,1001ZZ100000000AYYFX,1001ZZ100000000AYYFY,1001ZZ100000000AYYFZ,1001ZZ100000000AYYG0,1001ZZ100000000AYYG1,1001ZZ100000000AYYG2,1001ZZ100000000AYYG3,1001ZZ100000000AYYG4,1001ZZ100000000AYYG5,1001ZZ100000000AYYG6,1001ZZ100000000AYYG7,1001ZZ100000000AYYG8,1001ZZ100000000AYYG9";

        String[] sendKeyArr= sendKey.split(",");
        String[] sendValueArr= sendValue.split(",");
        String[] receiveKeyArr= receiveKey.split(",");
        String[] receiveValueArr= receiveValue.split(",");
        String[] pk_defdocArr= pk_defdoc.split(",");
        List<String> sendKeyList = Arrays.asList(sendKeyArr);
        List<String> sendValueList = Arrays.asList(sendValueArr);
        List<String> receiveKeyList = Arrays.asList(receiveKeyArr);
        List<String> receiveValueList = Arrays.asList(receiveValueArr);
        List<String> pk_defdocList = Arrays.asList(pk_defdocArr);
        String pk_defdoclist = "1001ZZ1000000004Z9QN";
        String creater = "1001ZZ1000000001CSYK";
        String pk_group = "0001A5100000000009L3";

        System.out.println(sendKeyList.size()+"&"+sendKeyList.size()+"&"+sendKeyList.size()+"&"+sendKeyList.size());

        List<String> sqlList = new ArrayList<>();
        for (int i = 0; i < sendKeyList.size(); i++) {
            String sql = getSql(sendKeyList.get(i),sendValueList.get(i),receiveKeyList.get(i),
                    receiveValueList.get(i),pk_defdocList.get(i),pk_defdoclist,creater,pk_group);
            sqlList.add(sql);
        }
        writeSql(sqlList,"kuaijikemu");
    }


    /**
     *
     * @param code sendKey
     * @param name sendValue
     * @param memo receiveKey
     * @param def1 receiveValue
     * @param pk_defdoc
     * @param pk_defdoclist
     */
    private static String getSql(String code,String name,String memo,String def1,String pk_defdoc,
                                 String pk_defdoclist,String creater,String pk_group){
        StringBuffer bf = new StringBuffer();
        bf.append("INSERT INTO \"BD_DEFDOC\"(\"CODE\", \"CREATIONTIME\", \"CREATOR\", \"DATAORIGINFLAG\", \"DATATYPE\", \"DEF1\", \"DEF10\", \"DEF11\", \"DEF12\", \"DEF13\", \"DEF14\", \"DEF15\", \"DEF16\", \"DEF17\", \"DEF18\", \"DEF19\", \"DEF2\", \"DEF20\", \"DEF3\", \"DEF4\", \"DEF5\", \"DEF6\", \"DEF7\", \"DEF8\", \"DEF9\", \"DR\", \"ENABLESTATE\", \"INNERCODE\", \"MEMO\", \"MNECODE\", \"MODIFIEDTIME\", \"MODIFIER\", \"NAME\", \"NAME2\", \"NAME3\", \"NAME4\", \"NAME5\", \"NAME6\", \"PID\", \"PK_DEFDOC\", \"PK_DEFDOCLIST\", \"PK_GROUP\", \"PK_ORG\", \"SHORTNAME\", \"SHORTNAME2\", \"SHORTNAME3\", \"SHORTNAME4\", \"SHORTNAME5\", \"SHORTNAME6\", \"TS\") VALUES ('");
        bf.append(code);
        bf.append("', '2020-09-12 15:49:35', '");
        bf.append(creater);
        bf.append("', '0', '1', '");
        bf.append(def1);
        bf.append("', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '0', '2', NULL, '");
        bf.append(memo);
        bf.append("', NULL, NULL, '~', '");
        bf.append(name);
        bf.append("', NULL, NULL, NULL, NULL, NULL, '~', '");
        bf.append(pk_defdoc);
        bf.append("','");
        bf.append(pk_defdoclist);
        bf.append("','");
        bf.append(pk_group);
        bf.append("','");
        bf.append(pk_group);
        bf.append("', NULL, NULL, NULL, NULL, NULL, NULL, '2020-09-12 15:49:12');");
        return bf.toString();
    }

    private static void writeSql(List<String> sqlList, String sqlName){
        String url = System.getProperty("user.dir").substring(0, 2) + "\\sqltempfile\\" + sqlName + ".sql";
        System.out.println(url);

        File file = new File(url);
        if(!file.exists()){
            file.getParentFile().mkdirs();
        }
        try {
            file.createNewFile();
        } catch (IOException e1) {
            // TODO 自动生成的 catch 块
            e1.printStackTrace();
        }

        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            for (String sql:sqlList) {
                bw.write(sql);
                bw.write("\n");
            }
            bw.close();
        } catch (IOException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }





//    public static void main(String[] args) {
//        String fuzhuhesuan = "{\"112201\":{\"0004\":\"2020512\"},\"112202\":{\"0004\":\"2020512\"},\"1123\":{\"0004\":\"2020512\"},\"1132\":{\"0004\":\"2020512\"},\"113201\":{\"0004\":\"2020512\"},\"113202\":{\"0004\":\"2020512\"},\"113203\":{\"0004\":\"2020512\"},\"113204\":{\"0004\":\"2020512\"},\"113299\":{\"0004\":\"2020512\"},\"1221\":{\"0004\":\"2020512\"},\"122101\":{\"0004\":\"2020512\"},\"12210101\":{\"0004\":\"2020512\"},\"12210102\":{\"0004\":\"2020512\"},\"12210103\":{\"0004\":\"2020512\"},\"12210104\":{\"0004\":\"2020512\"},\"12210105\":{\"0004\":\"2020512\"},\"122102\":{\"0004\":\"2020512\"},\"12210201\":{\"0004\":\"2020512\"},\"12210202\":{\"0004\":\"2020512\"},\"12210203\":{\"0004\":\"2020512\"},\"12210204\":{\"0004\":\"2020512\"},\"12210205\":{\"0004\":\"2020512\"},\"12210206\":{\"0004\":\"2020512\"},\"12210207\":{\"0004\":\"2020512\"},\"1231\":{\"0004\":\"2020512\"},\"1511\":{\"0004\":\"2020512\"},\"151101\":{\"0004\":\"2020512\"},\"15110101\":{\"0004\":\"2020512\"},\"15110102\":{\"0004\":\"2020512\"},\"15110103\":{\"0004\":\"2020512\"},\"151102\":{\"0004\":\"2020512\"},\"15110201\":{\"0004\":\"2020512\"},\"15110202\":{\"0004\":\"2020512\"},\"15110203\":{\"0004\":\"2020512\"},\"151103\":{\"0004\":\"2020512\"},\"15110301\":{\"0004\":\"2020512\"},\"15110302\":{\"0004\":\"2020512\"},\"15110303\":{\"0004\":\"2020512\"},\"2201\":{\"0004\":\"2020512\"},\"2202\":{\"0004\":\"2020512\"},\"220201\":{\"0004\":\"2020512\"},\"220202\":{\"0004\":\"2020512\"},\"220203\":{\"0004\":\"2020512\"},\"2203\":{\"0004\":\"2020512\"},\"220301\":{\"0004\":\"2020512\"},\"220302\":{\"0004\":\"2020512\"}}";
//        Gson gson = new Gson();
//        Map<String,Map<String,String>> fuzhuhesuanMap = gson.fromJson(fuzhuhesuan, HashMap.class);
//
//
//        for (Map.Entry<String,Map<String,String>> map : fuzhuhesuanMap.entrySet()){
//            String pkdefdoc = UUID.randomUUID().toString().replace("-","").substring(0,20);
////            System.out.println(pkdefdoc);
//            System.out.print("INSERT INTO \"BD_DEFDOC\"(\"CODE\", \"CREATIONTIME\", \"CREATOR\", \"DATAORIGINFLAG\", \"DATATYPE\", \"DEF1\", \"DEF10\", \"DEF11\", \"DEF12\", \"DEF13\", \"DEF14\", \"DEF15\", \"DEF16\", \"DEF17\", \"DEF18\", \"DEF19\", \"DEF2\", \"DEF20\", \"DEF3\", \"DEF4\", \"DEF5\", \"DEF6\", \"DEF7\", \"DEF8\", \"DEF9\", \"DR\", \"ENABLESTATE\", \"INNERCODE\", \"MEMO\", \"MNECODE\", \"MODIFIEDTIME\", \"MODIFIER\", \"NAME\", \"NAME2\", \"NAME3\", \"NAME4\", \"NAME5\", \"NAME6\", \"PID\", \"PK_DEFDOC\", \"PK_DEFDOCLIST\", \"PK_GROUP\", \"PK_ORG\", \"SHORTNAME\", \"SHORTNAME2\", \"SHORTNAME3\", \"SHORTNAME4\", \"SHORTNAME5\", \"SHORTNAME6\", \"TS\") VALUES ('");
//            System.out.print(map.getKey());
//            System.out.print("', '2020-08-25 15:49:35', '1001A51000000000060M', '0', '1', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '0', '2', NULL, '");
//            Map<String,String> myMap = map.getValue();
//            System.out.print(getJson(myMap));
//            System.out.print("', NULL, NULL, '~', '");
//            System.out.print(map.getKey());
//            System.out.println("', NULL, NULL, NULL, NULL, NULL, '~', '" +
//                    pkdefdoc +
//                    "', '1001ZZ1000000001XBET', '0001A5100000000009L3', '0001A5100000000009L3', NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-25 15:49:35');");
//        }
//    }
//    private static String getJson( Map<String,String> myMap){
//        //{"FI01":"XNDA","FI02":"TZLX","FI03":"DKXXZ","FI04":"SL"}
//        String str = "";
//        if(myMap.size() == 1){
//            for (Map.Entry<String,String> map : myMap.entrySet()){
//                str = "{\"" + map.getKey() + "\":\"" + map.getValue() + "\"}";
//            }
//        } else {
//            String str1 = "{";
//            for (Map.Entry<String,String> map : myMap.entrySet()){
//                str1 = "\"" + map.getKey() + "\":\"" + map.getValue() + "\",";
//            }
//            str = str1.substring(0,str1.length() - 1);
//            str += "}";
//        }
//        return str;
//    }



}
