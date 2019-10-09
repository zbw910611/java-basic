package com.zbw.basic.excel.export.util;


public class DeleteFile {

	/**
	 * @author zbw
	 * 2017-12-18
	 * @param args
	 */
	public static void main(String[] args) {
		/*// 删除单个文件
		String file = "c:/test/test.txt";
		DeleteFileUtil.deleteFile(file);
		System.out.println();
		// 删除一个目录
		String dir = "D:/home/web/upload/upload/files";
		DeleteFileUtil.deleteDirectory(dir);
		System.out.println();
		// 删除文件
		dir = "c:/test/test0";
		DeleteFileUtil.delete(dir);*/
		
		// 删除一个目录
		String dir = "F:/upFiles/zbwImportTemp/d12f41a833fd4e058a903df95e2d291f";
		DeleteFileUtil.deleteDirectory(dir);
	}
	
	
	 

}
