package com.zbw.basic.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

public class SelectTest extends JdbcConnection{

//	public static JdbcConnection jdbcConnection;
	protected static ResultSet rs=null;
	
	public static void main(String[] args) {
//		String[] idArr={"30e5314a642945ee8edeb62648fd0b5c","e2907457e21b430a9310721b25cf70c9","2c9d34203d82471ab741881c0ae2c8f0","9cb710161ceb4942bb5de1ff328be50c","422eb7ca0cce486597ef787652e19298","49646e61114f4117910acb966c8a78d0","7d42f00e76c0420e8a228f4759fdf459","d9a3cb7097bb456ea4187db1f7ad0932","53434f81814245d9a6bb5ba0687b7f39","8d62416554e6485eaf9e6f023513c1e0","f711cf59a9c440b88baffd86052400bd","149aa63bb37840eb9579f9122e8e38d2","419911bb8b9a4a3ea07fda8af0bf0ae5","ec5284ed157b4288b05d6ef6475f1ed1","9e32022a9fa6432f98508dfd5010211a","521fa18062ba43de95f5eebb844687cc","9bec72a4915e4556ac7f1a43cf966826","cb43f305d38c43dfa1daaf4de40134a1","7653304ef2e9437cac1b0491fb0f37e1","a1ed83c3959d492c99af6a8311315b0d","1929b838c6bf4001a389db21aca4597d","a0c52ae7a3ef4ee0ab46493b1c690475","59beb4e24ad24746a4ee726f9d9b2943","74a56f3746de400abd2e88207922de6e","2d4bd971a8c74c5c88a971e15b71513c","6b84593c75314c90a67f3beb829ae529","bc2a2decb12a4d69824ae64606ba9275","ae8a519515894db385e4fea3e4856acc","d41ada45f4a443609f67d9b693ff811a","0f119fb9222a4fd38db28f69e0c5c81f","b2444fb854ea4d8983cbcd787fc461e6"};
//
//		for (int i = 0; i < idArr.length; i++) {
////			getUpdate(idArr[i]);
//		}
		//System.out.println(getUpdate(id));
		//System.out.println(getQuery());
		
		rs=getQuery();
		try {
			while(rs.next()){
				String id=rs.getString("id");
				String client_code=rs.getString("client_code");
				String client_name=rs.getString("client_name");
				String client_type=rs.getString("client_type");
				System.out.println("id:"+id+",client_code:"+client_code+",client_name:"+client_name+",client_type:"+client_type);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
		
	}
	
	public static ResultSet getQuery(){
		StringBuffer stringBuffer=new StringBuffer();
		stringBuffer.append("select * from crm_client ");
		//stringBuffer.append("where id = ?");
//		return JdbcConnection.executeQuery(stringBuffer.toString(),new Object[]{1});
		return JdbcConnection.executeQuery(stringBuffer.toString());
	}
	
	public static int getUpdate(String id){
		//String sql="insert into t_bus_calendar (id,year,month,day) values('1','2017','10','23')";
		
		
		String sql="insert into t_bus_user_arrange_detail (id) values('"+id+"')";
		return JdbcConnection.executeUpdate(sql,new Object[]{});
	}
	
	public static int getUpdateNew(int Year,int Month,int Day,int Week){
		String ID=generate();

		Date date = new Date();
		Timestamp createDate = new Timestamp(date.getTime());
	    
	    
		String sql="insert into t_bus_calendar (id,year,month,day,week,create_name,create_by,create_date,sys_org_code,sys_company_code) values('"
				+ID+"',"+Year+",right(100"+Month+",2),"+Day+",'"+String.valueOf(Week)+"','管理员','admin','"+createDate+"','A04','A04')";
		return JdbcConnection.executeUpdate(sql,new Object[]{});
	}
	
	public static String generate(){
	    return java.util.UUID.randomUUID().toString().replace("-", "");
	}

	

}
