import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Dia4Parte2 {

	public static void main(String[] args) {
		int solution = 0;
		String filename = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\4.txt";
		Path path = Paths.get(filename);
		try {
			List<String> input = Files.readAllLines(path);
			for (int i = 0; i < input.size(); i++) {
				String[] partes = input.get(i).split(",");
				
				String[] parte1 = partes[0].split("-");
				String[] parte2 = partes[1].split("-");
				
				if ((Integer.parseInt(parte1[1])-Integer.parseInt(parte1[0]))-(Integer.parseInt(parte2[1])-Integer.parseInt(parte2[0]))>=0) {
					//la primera parte es mayor
					if (Integer.parseInt(parte1[0])<=Integer.parseInt(parte2[0]) && Integer.parseInt(parte1[1])>=Integer.parseInt(parte2[0]) || Integer.parseInt(parte1[0])<=Integer.parseInt(parte2[1]) && Integer.parseInt(parte1[1])>=Integer.parseInt(parte2[1])) {
						//la parte 1 contiene a la 2
						solution++;
					}
				} else {
					//la segunda parte es mayor
					if (Integer.parseInt(parte2[0])<=Integer.parseInt(parte1[0]) && Integer.parseInt(parte2[1])>=Integer.parseInt(parte1[0]) || Integer.parseInt(parte2[0])<=Integer.parseInt(parte1[1]) && Integer.parseInt(parte2[1])>=Integer.parseInt(parte1[1])) {
						//la parte 2 contiene a la 1
						solution++;
					}
				}
			}
			System.out.println(solution);
		} catch (Exception e) {
			System.out.println("la cagaste sur");
		}
	}

}