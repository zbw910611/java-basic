package com.zbw.basic.dateutil;

import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @title DateUtil.java
 * @package com.autozi.logistics.finance.base.utils
 * @Description 日期工具类
 * @author bingweizhang
 * @date 2018/12/11
 * @version V1.0
 */
public class DateUtil {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(DateUtil.class);

	// ==格式到年==
	/**
	 * 日期格式，年份，例如：2004，2008
	 */
	public static final String DATE_FORMAT_YYYY = "yyyy";


	// ==格式到年月 ==
	/**
	 * 日期格式，年份和月份，例如：200707，200808
	 */
	public static final String DATE_FORMAT_YYYYMM = "yyyyMM";

	/**
	 * 日期格式，年份和月份，例如：200707，2008-08
	 */
	public static final String DATE_FORMAT_YYYY_MM = "yyyy-MM";


	// ==格式到年月日==
	/**
	 * 日期格式，年月日，例如：050630，080808
	 */
	public static final String DATE_FORMAT_YYMMDD = "yyMMdd";

	/**
	 * 日期格式，年月日，用横杠分开，例如：06-12-25，08-08-08
	 */
	public static final String DATE_FORMAT_YY_MM_DD = "yy-MM-dd";

	/**
	 * 日期格式，年月日，例如：20050630，20080808
	 */
	public static final String DATE_FORMAT_YYYYMMDD = "yyyyMMdd";

	/**
	 * 日期格式，年月日，用横杠分开，例如：2006-12-25，2008-08-08
	 */
	public static final String DATE_FORMAT_YYYY_MM_DD = "yyyy-MM-dd";

	/**
	 * 日期格式，年月日，例如：2016.10.05
	 */
	public static final String DATE_FORMAT_POINTYYYYMMDD = "yyyy.MM.dd";

	/**
	 * 日期格式，年月日，例如：2016年10月05日
	 */
//	public static final String DATE_TIME_FORMAT_YYYY年MM月DD日 = "yyyy年MM月dd日";


	// ==格式到年月日 时分 ==

	/**
	 * 日期格式，年月日时分，例如：200506301210，200808081210
	 */
	public static final String DATE_FORMAT_YYYYMMDDHHmm = "yyyyMMddHHmm";

	/**
	 * 日期格式，年月日时分，例如：20001230 12:00，20080808 20:08
	 */
	public static final String DATE_TIME_FORMAT_YYYYMMDD_HH_MI = "yyyyMMdd HH:mm";

	/**
	 * 日期格式，年月日时分，例如：2000-12-30 12:00，2008-08-08 20:08
	 */
	public static final String DATE_TIME_FORMAT_YYYY_MM_DD_HH_MI = "yyyy-MM-dd HH:mm";


	// ==格式到年月日 时分秒==
	/**
	 * 日期格式，年月日时分秒，例如：20001230120000，20080808200808
	 */
	public static final String DATE_TIME_FORMAT_YYYYMMDDHHMISS = "yyyyMMddHHmmss";

	/**
	 * 日期格式，年月日时分秒，年月日用横杠分开，时分秒用冒号分开
	 * 例如：2005-05-10 23：20：00，2008-08-08 20:08:08
	 */
	public static final String DATE_TIME_FORMAT_YYYY_MM_DD_HH_MI_SS = "yyyy-MM-dd HH:mm:ss";


	// ==格式到年月日 时分秒 毫秒==
	/**
	 * 日期格式，年月日时分秒毫秒，例如：20001230120000123，20080808200808456
	 */
	public static final String DATE_TIME_FORMAT_YYYYMMDDHHMISSSSS = "yyyyMMddHHmmssSSS";


	// ==特殊格式==
	/**
	 * 日期格式，月日时分，例如：10-05 12:00
	 */
	public static final String DATE_FORMAT_MMDDHHMI = "MM-dd HH:mm";

	/**
	 * @title CommonUtil.java
	 * @package com.autozi.logistics.finance.base.utils
	 * @Description 字符串（20181128151910）日期转换Date
	 * @author bingweizhang
	 * @date 2018/11/28
	 * @version V1.0
	 */
	public static Date strToDate(String paramTime) {
		String tTime = paramTime.substring(0,4) + "-" + paramTime.substring(4,6) + "-" + paramTime.substring(6,8)
				+ " " + paramTime.substring(8,10) + ":" + paramTime.substring(10,12) + ":" + paramTime.substring(12,14);
		SimpleDateFormat simpleDateFormat=new SimpleDateFormat(DATE_TIME_FORMAT_YYYY_MM_DD_HH_MI_SS);
		Date date = null;
		try {
			date = simpleDateFormat.parse(tTime);
		} catch (ParseException e) {
			e.printStackTrace();
			logger.error("日期转换异常");
		}
		return date;
	}

	/**
	 * @title DateUtil.java
	 * @package com.autozi.logistics.finance.base.utils
	 * @Description 获取指定日期Str前指定天数的日期
	 * @author bingweizhang
	 * @date 2018/12/11
	 * @version V1.0
	 */
	public static String getBeforeDayStrByDays(String specifiedDay, int days) {
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD).parse(specifiedDay);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		c.setTime(date);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day - days);
		//格式化之后的日期
		String dayBefore = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD).format(c.getTime());
		return dayBefore;
	}

	/**
	 * @title DateUtil.java
	 * @package com.autozi.logistics.finance.base.utils
	 * @Description 获取指定日期Date前指定天数的日期
	 * @author bingweizhang
	 * @date 2018/12/11
	 * @version V1.0
	 */
	public static String getBeforeDayDateByDays(Date specifiedDay, int days) {
		Calendar c = Calendar.getInstance();
		c.setTime(specifiedDay);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day - days);
		//格式化之后的日期
		String dayBefore = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD).format(c.getTime());
		return dayBefore;
	}

	/**
	 * @title DateUtil.java
	 * @package com.autozi.logistics.finance.base.utils
	 * @Description 根据格式转换Date日期
	 * @author bingweizhang
	 * @date 2018/12/11
	 * @version V1.0
	 */
	public static String getDateConvertStr(Date specifiedDay, String formatStr) {
		//格式化之后的日期
		String dateStr = new SimpleDateFormat(formatStr).format(specifiedDay);
		return dateStr;
	}

	/**
	 * Date类型向前向后滚动固定时长
	 *
	 * @param date
	 *            调整前的时间对象
	 * @param i
	 *            需要滚动哪一个字段,写法: 年->Calendar.YEAR 月->Calendar.MONTH
	 *            日->Calendar.DATE 时->Calendar.HOUR_OF_DAY(24小时制)
	 *            分->Calendar.MINUTE 秒->Calendar.SECOND 毫秒->Calendar.MILLISECOND
	 * @param d
	 *            滚动多少,向前(以前)就用负数,向后(未来)就用正数
	 */
	public static Date dateRoll(Date date, int i, int d) {
		// 获取Calendar对象并以传进来的时间为准
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		// 将现在的时间滚动固定时长,转换为Date类型赋值
		calendar.add(i, d);
		// 转换为Date类型再赋值
		date = calendar.getTime();
		return date;
	}



}
