import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Dia1 {

	public static void main(String[] args) {
		
		int solution=0;
		
		String filename = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\1.txt";
		Path path = Paths.get(filename);
		try {
			int aux = 0;
			List<String> input = Files.readAllLines(path);
			System.out.println(input.get(5));
			for (int i = 0; i< input.size(); i++) {
				if (aux>solution) {
					solution = aux;
				}
				if (input.get(i)!=null || input.get(i)!="" ) {
					try {
					aux+=Integer.parseInt(input.get(i));
					} catch (Exception e) {
						aux = 0;
						System.err.println("eso era una línea vacía");
					}
				} else {
					aux = 0;
				}
			}
			
			System.out.println("El valor final es: " + solution);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
			
	}

}
