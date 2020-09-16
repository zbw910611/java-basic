package gxwh;

public class record {

    public static void main(String[] args) {
        String erremsg = "123456789";
        if(erremsg != null && erremsg.length() >8) {
            erremsg = erremsg.substring(0,8);
            System.out.println(erremsg);

        }
    }

}
