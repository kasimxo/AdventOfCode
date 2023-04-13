package aoc2022;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Dia6Parte2 {

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
			String s = org.substring(i, i+14);
			if (validarCadena(s)) {
				System.out.println("El número que buscas es " + (i+14) + " " + s);
				System.exit(0);
			}
		}
	}
	
	
	
	public static boolean validarCadena(String s) {
		boolean solucion = true;
		for (int i = 0; i<s.length(); i++) {
			for (int j = i+1; j<s.length(); j++) {
				if (s.charAt(i)==s.charAt(j)) {
					solucion = false;
					break;
				}
			}
		}
		return solucion;
	}
}