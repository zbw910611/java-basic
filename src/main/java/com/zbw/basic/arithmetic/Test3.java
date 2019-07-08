package com.zbw.basic.arithmetic;

public class Test3 {

	/**`
	 * @author zbw
	 * 2017-11-9
	 * @param args
	 */
	public static void main(String[] args) {
		getLaDingFangZhen();
		System.out.println("拉丁方阵**********************");
		getLaDingFangZhen2();
		System.out.println("拉丁方阵**********************");
		
		
		
		/*int x=0;
		for (int i = 0; i < 30; i++) {
			int xx=0;
			for (int j = 0; j < 30; j++) {
				if(){
					
				}else if
				arrNew[i][j] = arr[j2][k];
			}
		}*/

	}
	
	/**
	 * 拉丁方阵
	 * @author zbw
	 * 2017-11-9
	 */
	/*public static int[][] getLaDingFangZhen(){
		
		int n = 30;
		int[][] arr = new int[n][n];
		int data; //数值
		//循环赋值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                data = row + col + 1;
		                if(data <= n){
		                arr[row][col] = data;
		                }else{
		                arr[row][col] = data %n;
		                }
		        }
		}
		//输出数组的值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                System.out.print(arr[row][col]);
		                System.out.print(' ');
		        }
		        System.out.println();
		}
		
		
		System.out.println(arr);
		return arr;
		
	}*/
	
	
	
/*public static int[][] getLaDingFangZhen(){
		
		int n = 3;
		int[][] arr = new int[30][n];
		int data; //数值
		//循环赋值
		for(int row = 0;row < 30;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                data = row + col + 1;
		                arr[row][col] = data %n+1;
		        }
		}
		//输出数组的值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                System.out.print(arr[row][col]);
		                System.out.print(' ');
		        }
		        System.out.println();
		}
		
		
		System.out.println(arr);
		return arr;
		
	}*/
	
	
	

	
public static int[][] getLaDingFangZhen(){
//	拉丁方阵getLaDingFangZhen()**********************
//	2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 
//	3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 
//	1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 
//	拉丁方阵**********************
		int n = 4;
		int[][] arr = new int[n][30];
		int data; //数值
		//循环赋值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                data = row + col + 1;
		                arr[row][col] = data %n+1;
		        }
		}
		//输出数组的值
		for(int row = 0;row < arr.length;row++){
		        for(int col = 0;col <arr[row].length;col++){
		                System.out.print(arr[row][col]);
		                System.out.print(' ');
		        }
		        System.out.println();
		}
		
		
		//System.out.println(arr);
		return arr;
		
	}






/*public static int[][] getLaDingFangZhen2(){
	//拉丁方阵**********************
	//2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
	//1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
	//拉丁方阵**********************
	int n = 2;
	int[][] arr = new int[n][31];
	int data; //数值
	//循环赋值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                data = row + col + 1;
	                arr[row][col] = data %n+1;
	        }
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}*/

/*public static int[][] getLaDingFangZhen2(){
	//拉丁方阵**********************
//	2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
//	1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
//	3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 
//	1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 
	//拉丁方阵**********************
	int n = 2;
	int[][] arr = new int[4][31];
	int data; //数值
	//循环赋值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                data = row + col + 1;
	                if(row<2){
	                	 arr[row][col] = data %n+1;
	                }else{
	                	if(data %n+1==2){
	                		arr[row][col]=3;
	                	}else{
	                		arr[row][col] = data %n+1;
	                	}
	                }
	               
	        }
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}*/


public static int[][] getLaDingFangZhen2(){
	//拉丁方阵**********************
//	2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
//	1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
//	3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 
//	1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 3 1 
	//拉丁方阵**********************
	int n = 4;
	int[][] arr = new int[4][31];
	int data; //数值
	//循环赋值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                data = row + col + 1;
	                if(data %n+1==3){
	                	 arr[row][col] = 1;
	                }else if(data %n+1==4){
	                	 arr[row][col] = 3;
	                }else{
	                	 arr[row][col] = data %n+1;
	                }
	               
	        }
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}










	
	
/*public static int[][] getLaDingFangZhen3(){
	int n = 2;
	int[][] arr = new int[n][31];
	int data; //数值
	//循环赋值
	int x=0;
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
                if(col==0){
                	arr[row][col] = x+col/n+1+1;
                    arr[row][col+1] = x+col/n+1+1;
                    col++;
                }else{
                	if(arr[row][col]==0){
                		if(arr[row][col]/2==0){
                			arr[row][col] = (x+col/n+1)%2+1;
                			if(col<arr[row].length-1){
                				arr[row][col+1] = (x+col/n+1)%2+1;
                			}
                            col++;
                		}else{
                			arr[row][col] = x+col/n+1+1;
                			if(col<arr[row].length-1){
                				arr[row][col+1] = (x+col/n+1)%2+1;
                			}
                            col++;
                		}
                	}
                }
	               
	        }
	        --x;
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}*/
	
	
/*public static int[][] getLaDingFangZhen3(){
//	2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 
//	3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 
//	1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 
//	1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 3 1 1 2 
	int n = 4;
	int[][] arr = new int[n][30];
	int data; //数值
	//循环赋值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                data = row + col + 1;
	                if(data %n+1!=4){
	                	arr[row][col] = data %n+1;
	                }else{
	                	arr[row][col] = 1;
	                }
	                
	        }
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}*/
	
	
	
/*public static int[][] getLaDingFangZhen2(){
//	2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
//	1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
//	2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 
//	1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 
	int n = 4;
	int[][] arr = new int[n][30];
	int data; //数值
	//循环赋值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	        	
	                data = row + col + 1;
	                //arr[row][col] = data %n+1;
	                if(data %n+1==3){
	                	arr[row][col]=1;
	                }else if(data %n+1==4){
	                	arr[row][col]=2;
	                }else{
	                	 arr[row][col] = data %n+1;
	                }
	                
	                
	                if(data %n+1!=4){
	                	arr[row][col] = data %n+1;
	                }else{
	                	arr[row][col] = 1;
	                }
	                
	        }
	}
	//输出数组的值
	for(int row = 0;row < arr.length;row++){
	        for(int col = 0;col <arr[row].length;col++){
	                System.out.print(arr[row][col]);
	                System.out.print(' ');
	        }
	        System.out.println();
	}
	
	
	//System.out.println(arr);
	return arr;
	
}	*/
	
	
	
	
	
	
	
	

}
