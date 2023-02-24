package aoc2022;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class Dia3 {

	public static void main(String[] args) {
		String filename = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\3.txt";
		Path path = Paths.get(filename);
		char com = ' ';
		int solution = 0;
		char[] abc = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
		try {
			List<String> input = Files.readAllLines(path);
			for (int i = 0; i<input.size(); i++) {
				String s = input.get(i).substring(0,input.get(i).length()/2);
				String a = input.get(i).substring(input.get(i).length()/2 );
				for (int j = 0; j<s.length(); j++) {
					if (a.contains("" + s.charAt(j))) {
						com = s.charAt(j);
					}
				}
				int val = 0;
				for (int x = 0; x<abc.length; x++) {
					if (abc[x]==com) {
						val = x;
					}
				}
				solution+= val + 1;
						
			}
			System.out.println(solution);
		} catch (Exception e) {
			System.out.println("La cagaste");
		}
	}

}
