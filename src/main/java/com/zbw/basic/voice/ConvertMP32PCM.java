package com.zbw.basic.voice;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

import javazoom.spi.mpeg.sampled.file.MpegAudioFileReader;

public class ConvertMP32PCM {

    /**
     * MP3转换PCM文件方法
     *
     * @param mp3filepath
     *            原始文件路径
     * @param pcmfilepath
     *            转换文件的保存路径
     * @throws Exception
     */
    public static void convertMP32PCM(String mp3filepath, String pcmfilepath) throws Exception {
        AudioInputStream audioInputStream = getPcmAudioInputStream(mp3filepath);
        AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, new File(pcmfilepath));
    }

    /**
     * 播放MP3方法
     *
     * @param mp3filepath
     * @throws Exception
     */
    public static void playMP3(String mp3filepath) throws Exception {
        File mp3 = new File(mp3filepath);

        // 播放
        int k = 0, length = 8192;
        AudioInputStream audioInputStream = getPcmAudioInputStream(mp3filepath);
        if (audioInputStream == null)
            System.out.println("null audiostream");
        AudioFormat targetFormat;
        targetFormat = audioInputStream.getFormat();
        byte[] data = new byte[length];
        DataLine.Info dinfo = new DataLine.Info(SourceDataLine.class, targetFormat);
        SourceDataLine line = null;
        try {

            line = (SourceDataLine) AudioSystem.getLine(dinfo);
            line.open(targetFormat);
            line.start();

            int bytesRead = 0;
            byte[] buffer = new byte[length];
            while ((bytesRead = audioInputStream.read(buffer, 0, length)) != -1) {
                line.write(buffer, 0, bytesRead);
            }
            audioInputStream.close();

            line.stop();
            line.close();

        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("audio problem " + ex);

        }
    }

    private static AudioInputStream getPcmAudioInputStream(String mp3filepath) {
        File mp3 = new File(mp3filepath);
        AudioInputStream audioInputStream = null;
        AudioFormat targetFormat = null;
        try {
            AudioInputStream in = null;
            MpegAudioFileReader mp = new MpegAudioFileReader();
            in = mp.getAudioInputStream(mp3);
            AudioFormat baseFormat = in.getFormat();
            targetFormat = new AudioFormat(AudioFormat.Encoding.PCM_SIGNED, baseFormat.getSampleRate(), 16,
                    baseFormat.getChannels(), baseFormat.getChannels() * 2, baseFormat.getSampleRate(), false);
            audioInputStream = AudioSystem.getAudioInputStream(targetFormat, in);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return audioInputStream;
    }

    public static void mp3Convertpcm(String mp3filepath,String pcmfilepath) throws Exception{
        File mp3 = new File(mp3filepath);
        File pcm = new File(pcmfilepath);
        //原MP3文件转AudioInputStream
        AudioInputStream mp3audioStream = AudioSystem.getAudioInputStream(mp3);
        //将AudioInputStream MP3文件 转换为PCM AudioInputStream
        AudioInputStream pcmaudioStream = AudioSystem.getAudioInputStream(AudioFormat.Encoding.PCM_SIGNED, mp3audioStream);
        //准备转换的流输出到OutputStream
        OutputStream os = new FileOutputStream(pcm);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead=pcmaudioStream.read(buffer, 0, 8192))!=-1) {
            os.write(buffer, 0, bytesRead);
        }
        os.close();
        pcmaudioStream.close();
    }


    public static void main(String[] args) {
        String mp3filepath = "E:\\baiduVoice\\第四讲第四节_2020212195054.mp3";
        String pcmfilepath = "E:\\baiduVoice\\第四讲第四节_2020212195054.pcm";

        try {
//            ConvertMP32PCM.convertMP32PCM(mp3filepath, pcmfilepath);
//            ConvertMP32PCM.playMP3(mp3filepath);
            mp3Convertpcm(mp3filepath,pcmfilepath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
