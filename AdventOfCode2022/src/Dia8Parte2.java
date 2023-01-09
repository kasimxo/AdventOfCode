import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia8Parte2 {
	
	public static List<String> input = new ArrayList<String>();
	public static int numberVisibleTrees = 0;
	public static int highestScenicScore = 0;

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
				int score = scenicScore(j,i,height);
				if (score>highestScenicScore) {
					highestScenicScore = score;
				}
			}
		}
			
		System.out.println(highestScenicScore);
	}

	private static int scenicScore(int j, int i, int height) {
		
		int left = 0;
		int right = 0;
		int top = 0;
		int bottom = 0;
		
		//left
		for (int x = i-1; x>=0; x--) {
			int comparator = Integer.parseInt("" + input.get(j).charAt(x));
			if (comparator<height) {
				left++;
			} else {
				left++;
				break;
			}
		}
		//right
		for (int x = i+1; x<input.get(j).length(); x++) {
			int comparator = Integer.parseInt("" + input.get(j).charAt(x));
			if (comparator<height) {
				right++;
			} else {
				right++;
				break;
			}
		}
		//top
		for (int x = j-1; x>=0; x--) {
			int comparator = Integer.parseInt("" + input.get(x).charAt(i));
			if (comparator<height) {
				top++;
			} else {
				top++;
				break;
			}
		}
		//bottom
		for (int x = j+1; x<input.size(); x++) {
			int comparator = Integer.parseInt("" + input.get(x).charAt(i));
			if (comparator<height) {
				bottom++;
			} else {
				bottom++;
				break;
			}
		}
		
		return left*right*top*bottom;
	}

}