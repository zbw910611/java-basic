package com.zbw.basic.voice;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.xml.bind.DatatypeConverter;

import org.json.JSONObject;

public class Sample {

    private static final String serverURL = "http://vop.baidu.com/server_api";
    private static String token = "";
//    private static final String testFileName = "E:\\baiduVoice\\public\\8k.wav"; // 百度语音提供技术支持 北京科技馆
//    同学们，你们好，欢迎来到立德树人教育，我是王颢老师，下面我们学习第四节的内容，辅导员如何做好评优评先工作，在这一节里。
    private static final String testFileName = "E:\\baiduVoice\\第四讲第四节_2020212195054截取视频.pcm"; // 百度语音提供技术支持
//    同学们，你们好，欢迎来到立德树人教育，我是王颢老师。
//    private static final String testFileName = "C:\\cygwin64\\home\\admin\\speech-vad-demo\\output_pcm\\第四讲第四节_2020212195054截取视频.pcm_0-11479_A.pcm"; // 百度语音提供技术支持
    //put your own params here
    // 下面3个值要填写自己申请的app对应的值
    private static final String apiKey = "k0lZyw0dspBHfyGcBezrUFYn";
    private static final String secretKey = "LXSp9GxHAIk9RfGDus9sD0c4Aj4rNiUk";
    private static final String cuid = "18453574";

    public static void main(String[] args) throws Exception {
        getToken();
        method1();
        method2();
    }

    private static void getToken() throws Exception {
        String getTokenURL = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials" +
                "&client_id=" + apiKey + "&client_secret=" + secretKey;
        HttpURLConnection conn = (HttpURLConnection) new URL(getTokenURL).openConnection();
        token = new JSONObject(printResponse(conn)).getString("access_token");
        System.out.println(token);
    }

    private static void method1() throws Exception {
        File pcmFile = new File(testFileName);
        System.out.println(pcmFile.exists());
        HttpURLConnection conn = (HttpURLConnection) new URL(serverURL).openConnection();

        // construct params
        JSONObject params = new JSONObject();
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

    private static void method2() throws Exception {
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

        System.out.println(printResponse(conn));
    }

    private static String printResponse(HttpURLConnection conn) throws Exception {
        if (conn.getResponseCode() != 200) {
            // request error
            System.out.println("conn.getResponseCode() = " + conn.getResponseCode());
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
        System.out.println(new JSONObject(response.toString()).toString(4));
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
}
