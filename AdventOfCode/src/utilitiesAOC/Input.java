package utilitiesAOC;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Input {
	
	/**
	 * This class reads the input file and returns a list were every element is one line of the input file.
	 * @param year -> The year of the AOC you are coding as a string ie: "2021", "2022"... It's important to keep every file on Its corresponding folder.
	 * @param day -> The day of the AOC challenge as a string  ie: "1", "2", "3"...  
	 * @return A list of Strings where every String is a full line of the input file.
	 */
	public static List<String> listaString(String year,String day) {
		List<String> input = new ArrayList<String>();
		String filePath = new File("").getAbsolutePath()+"\\AdventOfCode\\input\\" + year+ "\\" + day + "T.txt";
		Path path = Paths.get(filePath);
		try {
			input = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("No se ha encontrado el archivo con ruta " + filePath);
		}
		return input;
	}
	
	/**
	 * This class reads the <b>TEST</b> input file and returns a list were every element is one line of the input file.
	 * @param year -> The year of the AOC you are coding as a string ie: "2021", "2022"... It's important to keep every file on Its corresponding folder.
	 * @param day -> The day of the AOC challenge as a string  ie: "1", "2", "3"...  
	 * @return A list of Strings where every String is a full line of the input file.
	 */
	public static List<String> listaStringTest(String year,String day, boolean test) {
		
		if(test) {
			List<String> input = new ArrayList<String>();
			String filePath = new File("").getAbsolutePath()+"\\input\\" + year+ "\\" + day + "T.txt";
			Path path = Paths.get(filePath);
			try {
				input = Files.readAllLines(path);
			} catch (Exception e) {
				System.err.println("No se ha encontrado el archivo con ruta " + filePath);
			}
			return input;
		} else {
			return listaString(""+year, ""+day);
		}
	}
	
	/**
	 * This class reads the input file and returns a list were every element is one line of the input file.
	 * @param year -> The year of the AOC you are coding as an int ie: 2021, 2022... It's important to keep every file on Its corresponding folder.
	 * @param day -> The day of the AOC challenge as an int ie: 1, 2, 3...  
	 * @return A list of Strings where every String is a full line of the input file.
	 */
	public static List<String> listaString(int year, int day) {
		return listaString(""+year, ""+day);
	}
	
	/**
	 * This class reads the <b>TEST</b> input file and returns a list were every element is one line of the input file.
	 * @param year -> The year of the AOC you are coding as an int ie: 2021, 2022... It's important to keep every file on Its corresponding folder.
	 * @param day -> The day of the AOC challenge as an int ie: 1, 2, 3...  
	 * @return A list of Strings where every String is a full line of the input file.
	 */
	public static List<String> listaString(int year, int day, boolean test) {
		return listaStringTest(""+year, ""+day, test);
	}
	
}
