import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Input {
	
	public static List<String> listaString(String s) {
		List<String> input = new ArrayList<String>();
		String name = "C:\\Users\\Andrés\\git\\adventofcode\\AdventOfCode2022\\inputs\\" + s + ".txt";
		Path path = Paths.get(name);
		try {
			input = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("No se ha encontrado el archivo con ruta " + name);
		}
		return input;
	}
	
}
