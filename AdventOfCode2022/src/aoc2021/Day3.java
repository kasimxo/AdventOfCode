package aoc2021;

import java.util.List;

import utilitiesAOC.BinaryOperations;
import utilitiesAOC.Input;

public class Day3 {

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2021, 3);
		
		int[] com = new int[input.get(0).length()];
		String binaryGammaS = "";
		int gamma = 0;
		int epsilon = 0;
		
		for (String string : input) {
			for(int i=0; i<string.length(); i++) {
				if(string.charAt(i)=='0') {
					com[i]--;
				} else {
					com[i]++;
				}
			}
		}
		
		for (int i = 0; i < com.length; i++) {
			if(com[i]>0) {
				binaryGammaS += "" + 1;
			} else {
				binaryGammaS += "" + 0;
			}
		}
		
		gamma = BinaryOperations.binaryToDecimal(binaryGammaS);
		epsilon = BinaryOperations.binaryToDecimal(BinaryOperations.inverseBinary(binaryGammaS));
		
		
		System.out.println("gamma: " + gamma);
		System.out.println("epsilon: " + epsilon);
		System.out.println("solucion: " + gamma*epsilon);

	}

}
