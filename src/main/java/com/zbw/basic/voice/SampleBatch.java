package com.zbw.basic.voice;

import com.alibaba.fastjson.JSON;
import org.json.JSONObject;

import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

public class SampleBatch {

    private static final String serverURL = "http://vop.baidu.com/server_api";
    private static String token = "";
//    private static final String testFileName = "E:\\baiduVoice\\public\\8k.wav"; // 百度语音提供技术支持 北京科技馆
//    同学们，你们好，欢迎来到立德树人教育，我是王颢老师，下面我们学习第四节的内容，辅导员如何做好评优评先工作，在这一节里。
//    private static final String testFileName = "E:\\baiduVoice\\第四讲第四节_2020212195054截取视频.pcm"; // 百度语音提供技术支持
//    同学们，你们好，欢迎来到立德树人教育，我是王颢老师。
//    private static final String testFileName = "C:\\cygwin64\\home\\admin\\speech-vad-demo\\output_pcm\\第四讲第四节_2020212195054截取视频.pcm_0-11479_A.pcm"; // 百度语音提供技术支持
    //put your own params here
    // 下面3个值要填写自己申请的app对应的值
    private static final String apiKey = "k0lZyw0dspBHfyGcBezrUFYn";
    private static final String secretKey = "LXSp9GxHAIk9RfGDus9sD0c4Aj4rNiUk";
    private static final String cuid = "18453574";

    public static void main(String[] args) throws Exception {
        Long startTime = System.currentTimeMillis();
        StringBuffer stringBuffer = new StringBuffer();
        getToken();

        // 创建 File对象
        File file = new File("C:\\cygwin64\\home\\admin\\speech-vad-demo\\output_pcm\\");
        // 取 文件/文件夹
        File files[] = file.listFiles();
        ArrayList<String>  stringArrayList = new ArrayList<>();
        // 存在文件 遍历 判断
        for (File f : files) {

            // 判断是否为 文件夹
            if(f.isDirectory()){

                System.out.print("文件夹: ");
                System.out.println(f.getAbsolutePath());

                // 为 文件夹继续遍历
//                recursiveFiles(f.getAbsolutePath());


                // 判断是否为 文件
            } else if(f.isFile()){
                stringArrayList.add(f.getAbsolutePath()); //把文件名放入list里面

//                System.out.print("文件: ");
//                System.out.println(f.getAbsolutePath());

//                method1(f.getAbsolutePath());
//                String result = method2(f.getAbsolutePath());
//                stringBuffer.append(result);

            } else {
                System.out.print("未知错误文件");
            }

        }
//        System.out.println(stringBuffer.toString());
//        writeResult(stringBuffer.toString());
//        for (String str : stringArrayList){
//            System.out.println(str);
//        }

        // 对 list 排序
        System.out.println("***************************");
        System.out.println("***************************");
        System.out.println("***************************");
        System.out.println("***************************");
        System.out.println("***************************");
        List<Map<String,String>> listMap = new ArrayList<>();
        for (String str : stringArrayList){
            Map<String,String> strMap = new HashMap<>();
            strMap.put("name",str);
            //第四讲第四节_2020212195054.pcm_0-11479_A.pcm
            //第四讲第四节_2020212195054.pcm_4299168126-4299210935_I.pcm
            strMap.put("first",str.substring(str.lastIndexOf("-") + 1,str.lastIndexOf("_")));
            strMap.put("second",str.substring(str.lastIndexOf("_") + 1,str.lastIndexOf(".")));
            listMap.add(strMap);
        }


        Collections.sort(listMap, new Comparator<Map<String, String>>() {
            @Override
            public int compare(Map<String, String> o1, Map<String, String> o2) {
//                Integer name1 = Integer.valueOf(o1.get("first").toString()) ;//name1是从你list里面拿出来的一个
//                Integer name2 = Integer.valueOf(o2.get("first").toString()) ; //name1是从你list里面拿出来的第二个name
                BigInteger name1 = new BigInteger(o1.get("first").toString());
                BigInteger name2 = new BigInteger(o2.get("first").toString());
                if (name1.compareTo(name2) != 0){
                    return name1.compareTo(name2);
                } else {
                    Integer name3 = Integer.valueOf(o1.get("second").toString()) ;//name1是从你list里面拿出来的一个
                    Integer name4 = Integer.valueOf(o2.get("second").toString()) ; //name1是从你list里面拿出来的第二个name
                    return name3.compareTo(name4);
                }

            }
        });
        for(Map<String,String> strMapTemp : listMap){
//            pathList.add(strMapTemp.get("name"));
            System.out.println(strMapTemp.get("name"));
            method1(strMapTemp.get("name"));
            String result = method2(strMapTemp.get("name"));
            stringBuffer.append(result);
        }
        writeResult(stringBuffer.toString());
        Long endTime = System.currentTimeMillis();
        System.out.println("总时间：" + (endTime - startTime));



    }

    private static void getToken() throws Exception {
        String getTokenURL = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials" +
                "&client_id=" + apiKey + "&client_secret=" + secretKey;
        HttpURLConnection conn = (HttpURLConnection) new URL(getTokenURL).openConnection();
        token = new JSONObject(printResponse(conn)).getString("access_token");
//        System.out.println(token);
    }

    private static void method1(String testFileName) throws Exception {
        File pcmFile = new File(testFileName);
//        System.out.println(pcmFile.exists());
        HttpURLConnection conn = (HttpURLConnection) new URL(serverURL).openConnection();

        // construct params
        JSONObject params = new JSONObject();
//        params.put("dev_pid", 1737);
        params.put("format", "pcm");
        params.put("rate", 16000);
        params.put("channel", "1");
        params.put("token", token);
        params.put("lan", "zh");
        params.put("cuid", cuid);
        params.put("len", pcmFile.length());
        params.put("speech", DatatypeConverter.printBase64Binary(loadFile(pcmFile)));

        // add request header
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");

        conn.setDoInput(true);
        conn.setDoOutput(true);

        // send request
        DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
        wr.writeBytes(params.toString());
        wr.flush();
        wr.close();

        printResponse(conn);
    }

    private static String method2(String testFileName) throws Exception {
        File pcmFile = new File(testFileName);
        HttpURLConnection conn = (HttpURLConnection) new URL(serverURL
                + "?cuid=" + cuid + "&token=" + token).openConnection();

        // add request header
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "audio/pcm; rate=16000");

        conn.setDoInput(true);
        conn.setDoOutput(true);

        // send request
        DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
        wr.write(loadFile(pcmFile));
        wr.flush();
        wr.close();

//        System.out.println("start");
        String data = printResponse(conn);
//        System.out.println(data);
        Map maps = (Map)JSON.parse(data);
        System.out.println(maps);
        String result = "";
        if (maps.get("result") != null && maps.get("result").toString() != ""){
            result = maps.get("result").toString().substring(2,maps.get("result").toString().length()-2);
        }
//        System.out.println(result);
//        System.out.println(result.substring(2,result.length()-2));
//        System.out.println("end");
        return result;
    }

    private static String printResponse(HttpURLConnection conn) throws Exception {
        if (conn.getResponseCode() != 200) {
            // request error
//            System.out.println("conn.getResponseCode() = " + conn.getResponseCode());
            return "";
        }
        InputStream is = conn.getInputStream();
        BufferedReader rd = new BufferedReader(new InputStreamReader(is));
        String line;
        StringBuffer response = new StringBuffer();
        while ((line = rd.readLine()) != null) {
            response.append(line);
            response.append('\r');
        }
        rd.close();
//        System.out.println(new JSONObject(response.toString()).toString(4));
        return response.toString();
    }

    private static byte[] loadFile(File file) throws IOException {
        InputStream is = new FileInputStream(file);

        long length = file.length();
        byte[] bytes = new byte[(int) length];

        int offset = 0;
        int numRead = 0;
        while (offset < bytes.length
                && (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
            offset += numRead;
        }

        if (offset < bytes.length) {
            is.close();
            throw new IOException("Could not completely read file " + file.getName());
        }

        is.close();
        return bytes;
    }

    public static void writeResult(String result) {
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyy-MM-dd HH:mm:ss ms");
        File f = new File("E:\\baiduVoice\\result.txt");
        try
        {
            FileOutputStream out = new FileOutputStream(f,true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(out));
            bw.write(simpleDateFormat.format(new Date()));
            bw.newLine();
            bw.write(result);
            bw.newLine();
            bw.flush();

            bw.close();
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}
