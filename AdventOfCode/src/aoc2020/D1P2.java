package aoc2020;

import java.util.List;

import utilitiesAOC.Input;

public class D1P2 {

	public static void main(String[] args) {
		List<String> input = Input.listaString(2020, 1, false);
		for (String string : input) {
			System.out.println(string);
		}
		for (String string : input) {
			int n1 = Integer.parseInt(string);
			for (String string2  : input) {
				if(string!=string2) {
					for (String string3 : input) {
						
						
						if(string!=string3 &&string2!=string3 && n1+Integer.parseInt(string2)+Integer.parseInt(string3)==2020) {
							System.out.println(n1+"\n"+string2+"\n"+string3);
							System.out.println(n1*Integer.parseInt(string2)*Integer.parseInt(string3));
						}
					}
				}
			}
		}
	}

}
