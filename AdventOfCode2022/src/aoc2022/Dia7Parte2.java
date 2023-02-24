package aoc2022;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia7Parte2 {
	
	static List<String> instructions = new ArrayList<String>();
	static int espacio = 0;
	static String dir = "";
	static D7Dir firstDir;
	static D7Dir curDir;
	static int sumaDirs = 0;
	static int closestDir = 999999999;

	public static void main(String[] args) {
		
		String filename = "C:\\Users\\Andr�s\\workspace\\AdventOfCode2022\\inputs\\7.txt";
		Path path = Paths.get(filename);
		
		try {
			instructions = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("La cagaste");
		}
		
		
		
		for (int i = 0; i<instructions.size(); i++) {
			
			boolean isFile = false;
			int aux = 0;
		
			String s = instructions.get(i);
			//este array tiene el input separado por espacios
			String[] instruccion = s.split(" ");
			
			if (instruccion[1].compareTo("cd")==0 && instruccion[2].compareToIgnoreCase("..")!=0) {
				//Aqu� hablamos de un cambio de directorio
				if (curDir==null) {
					curDir = new D7Dir(instruccion[2]);
					firstDir = curDir;
				} else {
					/*Aqu� como ya tenemos un directorio, en teor�a tendremos un listado de sus subdirectorios
					 En ese caso, listamos por ese listado de subdirectorios hasta encontrar el que coincide 
					 Cambiamos el curDir por ese coincidente
					 */
					for (D7Dir index : curDir.getDirs()) {
						if (index.getName().compareTo(instruccion[2])==0) {
							curDir = index;
						}
					}
				}
			} else if (instruccion[0].compareToIgnoreCase("dir")==0) {
				//Aqu� creamos un directorio cuando lo vemos por primera vez
				curDir.addDir(new D7Dir(instruccion[1],curDir));
			} else if (instruccion[instruccion.length-1].compareTo("..")==0) {
				//Aqu� vamos uno hacia atr�s
				curDir = curDir.getParent();
			}
			
			try {
				aux = Integer.parseInt(instruccion[0]);
				isFile = true;
				System.out.println("Es un file");
			} catch (Exception e) {
				System.out.println("Definitivamente no es un file");
			}
			
			if (isFile) {
				int fileSize = aux;
				//Si hemos llegado a este punto es porque s� que es un file 
				String fileName = instruccion[1];
				//Aqu� ya creamos entonces el objeto file 
				D7File newFile = new D7File(fileName, fileSize);
				curDir.addFile(newFile);
			}
			
			
			System.out.println(curDir);
		}
		//Aqu� solo queda recorrer TODOS los dirs y, si su tama�o es <100.000, sumar su valor
		recorrerDir(firstDir);
		System.err.println("La suma final es: " + sumaDirs);
		System.out.println("El tama�o usado total es: " + firstDir);
		System.err.println(closestDir);
	}
	
	public static void recorrerDir(D7Dir dir) {
		for (D7Dir seleccionado : dir.getDirs()) {
			if (seleccionado.getSize()<=100000) {
				sumaDirs += seleccionado.getSize();
			}
			if (seleccionado.getSize()>=208860 && (seleccionado.getSize()-208860)<closestDir-208860) {
				closestDir=seleccionado.getSize();
			}
			recorrerDir(seleccionado);
		}
		System.out.println("La suma actual es: " + sumaDirs);
	}

}
