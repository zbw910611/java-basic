package com.zbw.basic.jdbc;

import java.sql.*;


public class JdbcConnection {
	 //数据库用户名  
    private static final String USERNAME = "u_cloud";
//    private static final String USERNAME = "root";
    //数据库密码
    private static final String PASSWORD = "123";
//    private static final String PASSWORD = "123456";
    //驱动信息
    private static final String DRIVER = "com.mysql.jdbc.Driver";  
    //数据库地址  
    private static final String URL = "jdbc:mysql://172.16.21.173:3306/logistics_order?serverTimezone=UTC";
//    private static final String URL = "jdbc:mysql://172.16.1.235:3306/logistics_crm?serverTimezone=UTC";
    private static Connection connection;
    private static PreparedStatement preparedStatement;  
    private static ResultSet resultSet;  
    public JdbcConnection() {  
        // TODO Auto-generated constructor stub  
        try{  
            Class.forName(DRIVER);  
            System.out.println("数据库连接成功！");  
  
        }catch(Exception e){  
  
        }  
    }  
      
    /** 
     * 获得数据库的连接 
     * @return 
     */  
    public static Connection getConnection(){  
        try {  
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);  
        } catch (SQLException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
        return connection;  
    }  
    
    /**
	 * 增删改；
	 * @param sql
	 * @param obj
	 * @return
	 */
	public static int executeUpdate(String sql,Object...obj){
		connection=getConnection();
		int result=0;
		try {
			preparedStatement=connection.prepareStatement(sql);
			if(obj!=null){
				for(int i=0;i<obj.length;i++){
					preparedStatement.setObject(i+1, obj[i]);
				}
			}
			result=preparedStatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		//增删改返回数据，可以关闭，查询时要取数据，不可以关闭；	
		}finally{
			close();
		}
		return result;
	}
    
	/**
	 * 查询；
	 * @param sql
	 * @param obj
	 * @return
	 */
	public static ResultSet executeQuery(String sql,Object...obj){
		connection=getConnection();
		try {
			preparedStatement=connection.prepareStatement(sql);
			if(obj!=null){
				for(int i=0;i<obj.length;i++){
					preparedStatement.setObject(i+1, obj[i]);
				}
			}
			resultSet=preparedStatement.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultSet;
	}
    
    
    
    
    
    /**
     * 关闭
     * 
     * @author zbw
     * 2017年10月4日
     */
	public static void close(){
		try {
			if(resultSet!=null) {
				resultSet.close();
			}
			if(preparedStatement!=null) {
				preparedStatement.close();
			}
			if(connection!=null) {
				connection.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
  
      

}