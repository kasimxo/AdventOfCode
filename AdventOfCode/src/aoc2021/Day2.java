package aoc2021;

import java.util.List;

import utilitiesAOC.Input;

public class Day2 {

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2021, 2);
		int posX = 0;
		int posY = 0;
		
		for (String string : input) {
			String[] s = string.split(" ");
			if(s[0].compareTo("forward")==0) {
				posX += Integer.parseInt(s[1]);
			} else if (s[0].compareTo("down")==0) {
				posY += Integer.parseInt(s[1]);
			} else if (s[0].compareTo("up")==0) {
				posY -= Integer.parseInt(s[1]);
			} else {
				posX -= Integer.parseInt(s[1]);
			}
		}
		System.out.println(posX*posY);
		
	}

}
