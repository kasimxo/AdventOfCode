package aoc2020;

import java.util.List;

import utilitiesAOC.Input;

public class D2 {

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2020, 2, false);
		int valid = input.size();
		for (String string : input) {
			String[] splited = string.split(" ");
			int min = Integer.parseInt(splited[0].split("-")[0]);
			int max = Integer.parseInt(splited[0].split("-")[1]);
			char letra = splited[1].charAt(0);
			
			String pass = splited[2];
			int aparitions = 0;
			for(int i = 0; i<pass.length(); i++) {
				if(pass.charAt(i)==letra) {
					aparitions++;
				}
				
			}
			if(aparitions<min || aparitions >max) {
				valid--;
			}
			System.out.println(min);
		}
		System.out.println(valid);
	}

}