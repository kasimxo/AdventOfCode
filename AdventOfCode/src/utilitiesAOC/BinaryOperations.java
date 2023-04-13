package utilitiesAOC;

public class BinaryOperations {
	
	/**
	 * Transforma un número binario en un número decimal.
	 * @param binary
	 * @return Devuelve un número decimal.
	 */
	public static int binaryToDecimal(int binary) {
		
		int decimal = 0;
		
		
		//Lo transformamos a string para poder recorrer cada pos
		String bin = String.valueOf(binary);
		
		System.out.println(bin);
		
		for (int i=0; i<bin.length(); i++) {
			decimal += Integer.parseInt("" + bin.charAt(i)) * Math.pow(2,  (bin.length()-i-1));
		}
		
		return decimal;
	}
	
	/**
	 * Transforma un número binario en un número decimal. 
	 * @param binary -> Al introducirlo como String el primer valor puede ser 0
	 * @return Devuelve un número decimal.
	 */
	public static int binaryToDecimal(String binary) {
		
		int decimal = 0;
		
		
		//Lo transformamos a string para poder recorrer cada pos
		String bin = String.valueOf(binary);
		
		System.out.println(bin);
		
		for (int i=0; i<bin.length(); i++) {
			decimal += Integer.parseInt("" + bin.charAt(i)) * Math.pow(2,  (bin.length()-i-1));
		}
		
		return decimal;
	}
	
	/**
	 * Te devuelve el inverso de un binary. <br/>01001 -> Input<br/>10110 -> Output
	 * @param binary
	 * @return
	 */
	public static String inverseBinary(String binary) {
		String binaryInv = "";
		
		for (int i = 0; i<binary.length(); i++) {
			if(binary.charAt(i)=='0') {
				binaryInv += "1";
			} else {
				binaryInv += "0";
			}
		}
		
		return binaryInv;
	}
}
