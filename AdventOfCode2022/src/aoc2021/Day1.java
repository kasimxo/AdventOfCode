package aoc2021;

import java.util.List;

import utilitiesAOC.Input;

public class Day1 {

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2021, 1);
		
		int sol = 0;
		
		for(int i=1; i<input.size(); i++) {
			int aux = Integer.parseInt(input.get(i-1)); 
			int cur = Integer.parseInt(input.get(i));
			if (cur>aux) {
				sol++;
			}
		}
		System.out.println(sol);
	}

}
