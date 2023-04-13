package aoc2022;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia8 {
	
	public static List<String> input = new ArrayList<String>();
	public static int numberVisibleTrees = 0;

	public static void main(String[] args) {
		
		String file = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\8.txt";
		Path path = Paths.get(file);
		try {
			input = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("La cagaste sur");
		}
		
		for (int j = 0; j<input.size(); j++) {
			for (int i = 0 ; i<input.get(j).length(); i++) {
				int height = Integer.parseInt("" + input.get(j).charAt(i));
				if ( j==0 || i==0 || j==input.size() || i==input.get(j).length()) {
					numberVisibleTrees++;
					System.out.print("1");
				} else if (isVisible(j,i, height))  {
					numberVisibleTrees++;
					System.out.print("1");
				} else {
					System.out.print("0");
				}
			}
			System.out.println();
		}
			
		System.out.println(numberVisibleTrees);
	}

	private static boolean isVisible(int j, int i, int height) {
		
		boolean visibleLeft = true;
		boolean visibleRight = true;
		boolean visibleTop = true;
		boolean visibleBottom = true;
		
		for (int x = 0; x<i; x++) {
			
			int comparator =Integer.parseInt("" + input.get(j).charAt(x));
			if (comparator >= height) {
				visibleLeft = false;
			}
		}
		
		for (int x = i+1; x<input.get(j).length(); x++) {
			int comparator =Integer.parseInt("" + input.get(j).charAt(x));
			if (comparator >= height) {
				visibleRight = false;
			}
		}
		
		for (int x = 0; x<j; x++) {
			if (Integer.parseInt("" + input.get(x).charAt(i)) >= height ) {
				visibleTop = false;
			}
		}
		
		for (int x = j+1; x<input.size(); x++) {
			if (Integer.parseInt("" + input.get(x).charAt(i)) >= height ) {
				visibleBottom = false;
			}
		}
		
		if (!visibleLeft && !visibleRight && !visibleTop && !visibleBottom) {
			return false;
		}
		
		return true;
	}

}
