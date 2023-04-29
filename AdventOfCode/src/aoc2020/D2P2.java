package aoc2020;

import java.util.List;

import utilitiesAOC.Input;

public class D2P2 {

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2020, 2, false);
		int valid = input.size();
		for (String string : input) {
			String[] splited = string.split(" ");
			int first = Integer.parseInt(splited[0].split("-")[0])-1;
			int second = Integer.parseInt(splited[0].split("-")[1])-1;
			char letra = splited[1].charAt(0);
			
			String pass = splited[2];
			int aparitions = 0;
			if(pass.charAt(first)==letra && pass.charAt(second)==letra || pass.charAt(first)!=letra && pass.charAt(second)!=letra ) {
				valid--;
			}
			
//			if(aparitions<first || aparitions >max) {
//				valid--;
//			}
		}
		System.out.println(valid);
	}

}