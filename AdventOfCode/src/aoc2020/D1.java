package aoc2020;

import java.util.List;

import utilitiesAOC.Input;

public class D1 {

	public static void main(String[] args) {
		List<String> input = Input.listaString(2020, 1, false);
		for (String string : input) {
			int n1 = Integer.parseInt(string);
			for (String string2 : input) {
				if(string!=string2 && n1+Integer.parseInt(string2)==2020) {
					System.out.println(n1*Integer.parseInt(string2));
				}
			}
		}
	}

}
