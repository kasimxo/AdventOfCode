package aoc2021;

import java.util.List;

import utilitiesAOC.Input;

public class Day1P2 {

	public static void main(String[] args) {

		List<String> input = Input.listaString(2021, 1);
		
		int sol = 0;
		
		for(int i=2; i<input.size()-1; i++) {
			int aux = Integer.parseInt(input.get(i-2)) + Integer.parseInt(input.get(i-1)) + Integer.parseInt(input.get(i)); 
			int cur = Integer.parseInt(input.get(i-1)) + Integer.parseInt(input.get(i)) +Integer.parseInt(input.get(i+1));
			if (cur>aux) {
				sol++;
			}
		}
		System.out.println(sol);
		
	}

}
