package aoc2022;

import java.util.ArrayList;
import java.util.List;

import utilitiesAOC.Input;

public class Day15 {
	
	public int minWidth=-1;
	public int minHeight=-1;
	public int maxWidth=-1;
	public int maxHeight=-1;

	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2022, 15, true);
		List<Sensor> sensores = new ArrayList<Sensor>();
		
		
		
		
		for (String string : input) {
			
			String[] split = string.split(" ");
			
			String sensorX = split[3].split("=")[1];
			
			
			System.out.println(sensorX);
			
			System.out.println(string);
			
		}
	}

}
