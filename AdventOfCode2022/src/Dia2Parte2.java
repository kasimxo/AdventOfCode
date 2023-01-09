import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Dia2Parte2 {

	public static void main(String[] args) {
		int[][] resultado = {{3,1,2},{1,2,3},{2,3,1}};
		int score = 0;
		String filename = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\2.txt";
		Path path = Paths.get(filename);
		try {
			List<String> data = Files.readAllLines(path);
			//A = Rock
			//B = Paper
			//C = Scissors
			//X = Lose
			//Y = Draw
			//Z = Win
			//0 = Lost
			//3 = Draw
			//6 = Won
			for (int i = 0; i<data.size(); i++) {
				int index1 = 0;
				int index2 = 0;
				int sumando = 0;
				String s = data.get(i);
				if (s.contains("A")) {
					index1 = 0;
				} else if (s.contains("B")) {
					index1 = 1;
				} else if (s.contains("C")) {
					index1 = 2;
				}
				
				if (s.contains("X")) {
					index2 = 0;
					sumando = 0;
				} else if (s.contains("Y")) {
					index2 = 1;
					sumando = 3;
				} else if (s.contains("Z")) {
					index2 = 2;
					sumando = 6;
				}
				score += sumando + resultado[index1][index2];
			}
			
			System.out.println(score);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}