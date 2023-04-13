package aoc2022;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Dia6 {

	public static void main(String[] args) {
		String org = "";
		String filename = "D:\\WORKSPACE\\AdventOfCode\\Inputs\\Dia6";
		Path path = Paths.get(filename);
		try {
			org = Files.readString(path);
		} catch (Exception e) {
			System.err.println("La cagaste");
		}
		for (int i = 0; i<org.length(); i++) {
			String s = org.substring(i, i+4);
			if (validarCadena(s)) {
				System.out.println("El número que buscas es " + (i+4) + " " + s);
				System.exit(0);
			}
		}
	}
	
	
	
	public static boolean validarCadena(String s) {
		if (s.charAt(0)!=s.charAt(1) && s.charAt(0)!=s.charAt(2) && s.charAt(0)!=s.charAt(3) && s.charAt(1)!=s.charAt(2) && s.charAt(1)!=s.charAt(3) && s.charAt(2)!=s.charAt(3)) {
			return true;
		}
		return false;
	}
}
