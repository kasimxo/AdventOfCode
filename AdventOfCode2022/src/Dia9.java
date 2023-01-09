import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia9 {

	public static void main(String[] args) {
		
		int horizontal = 0;
		int vertical = 0;
		
		List<String> recorrido = new ArrayList<String>();
		
		boolean dibujando = true;
		
		int contadorLinea = 0;
		
		int dimensionFilas = 1;
		int dimensionColumnas = 1;
		
		int startingX = 0;
		int startingY = 0;
		
		int posXHead = 0;
		int posYHead = 0;
		int posXTail = 0;
		int posYTail = 0;
		
		int distanciaX = 0;
		int distanciaY = 0;
		
		int uniqueTilesVisited = 0;
		
		List<String> input = new ArrayList<String>();
		String name = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\9.txt";
		Path path = Paths.get(name);
		try {
			input = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("La cagaste sur");
		}
		
		while (dibujando) {
			
			System.out.println(input.get(contadorLinea));
			
			String[] in = input.get(contadorLinea).split(" ");
			
			int pasos = Integer.parseInt(in[1]);
			
			//Hacemos el número de pasos en la dirección indicada
			for (int i = 0; i<pasos; i++) {
				
				//Actualizamos la posición teniendo en cuenta que si está en el límite del tablero tenemos que ampliar el límite
				if (in[0].compareTo("R")==0) {
					posXHead++;
				} else if (in[0].compareTo("L")==0) {
					posXHead--;
				} else if (in[0].compareTo("U")==0) {
					posYHead--;
				} else if (in[0].compareTo("D")==0) {
					posYHead++;
				}
				
				if (posXHead>dimensionColumnas || posXHead < 0) {
					dimensionColumnas++;
					
				} else if (posYHead>dimensionFilas || posYHead < 0) {
					dimensionFilas++;
				}
				
				//Como aquí es donde actualizamos las posiciones, también recorremos la lista de tiles recorridas para actualizar posiciones
				if (posXHead<0) {
					posXHead++;
					posXTail++;
					startingX++;
					for (int j = 0; j<recorrido.size(); j++) {
						String[] aux = recorrido.get(j).split(" ");
						String recomp = (Integer.parseInt(aux[0]) + 1) + " " + Integer.parseInt(aux[1]);
						recorrido.set(j, recomp);
					}
				} else if (posYHead<0) {
					posYHead++;
					posYTail++;
					startingY++;
					for (int j = 0; j<recorrido.size(); j++) {
						String[] aux = recorrido.get(j).split(" ");
						String recomp = Integer.parseInt(aux[0]) + " " + (Integer.parseInt(aux[1]) + 1);
						recorrido.set(j, recomp);
					}
				}
				
				//Aquí es donde actualizamos la posición de la cola
				distanciaX = posXHead - posXTail;
				distanciaY = posYHead - posYTail;
				
				if (distanciaX > 1 && distanciaY == 1) {
					posXTail++;
					posYTail++;
				} else if (distanciaX > 1 && distanciaY == -1) {
					posXTail++;
					posYTail--;
				} else if (distanciaX < -1 && distanciaY == 1) {
					posXTail--;
					posYTail++;
				} else if (distanciaX < -1 && distanciaY == -1) {
					posXTail--;
					posYTail--;
				} else if (distanciaX == 1 && distanciaY > 1) {
					posXTail++;
					posYTail++;
				} else if (distanciaX == 1 && distanciaY < -1) {
					posXTail++;
					posYTail--;
				} else if (distanciaX == -1 && distanciaY > 1) {
					posXTail--;
					posYTail++;
				} else if (distanciaX == -1 && distanciaY < -1) {
					posXTail--;
					posYTail--;
				} else if (distanciaX > 1) {
					posXTail++;
				} else if (distanciaY > 1) {
					posYTail++;
				} else if (distanciaX < -1) {
					posXTail--;
				} else if (distanciaY < -1) {
					posYTail--;
				}
				
				/*Como aquí hemos actualizado las posiones, comprobamos si la casilla en la que esta la cola
				 * es nueva y si lo es, la guardamos en la lista
				 */
				boolean newTile = true;
				for (int j = 0; j<recorrido.size(); j++) {
					String[] comp = recorrido.get(j).split(" ");
					if (posXTail==Integer.parseInt("" + comp[0]) && posYTail==Integer.parseInt("" + comp[1])) {
						//Si tenemos una cooincidencia implica que no es una newTile
						newTile=false;
					}
				}
				if (newTile) {
					uniqueTilesVisited++;
					recorrido.add(posXTail + " " + posYTail);
				}
				
				//Aquí dibujamos el tablero con las posiciones ya  actualizadas
//				for (int fila = 0; fila <= dimensionFilas; fila++) {
//					for (int columna = 0; columna <= dimensionColumnas; columna++) {
//						
//						if (columna==posXHead && fila==posYHead) {
//							System.out.print("H");
//						} else if (columna==posXTail && fila==posYTail) {
//							System.out.print("T");
//						} else if (columna==startingX && fila==startingY) {
//							System.out.print("s");
//						} else {
//							boolean visited = false;
//							for (int j = 0; j<recorrido.size(); j++) {
//								String[] comp = recorrido.get(j).split(" ");
//								if (columna==Integer.parseInt("" + comp[0]) && fila==Integer.parseInt("" + comp[1])) {
//									visited = true;
//								}
//							}
//							if (visited) {
//								System.out.print("#");
//							} else {
//								System.out.print(".");
//							}
//						}
//						
//					}
//					System.out.println();
//				}
				
				
				
			}
			
			contadorLinea++;
			
			if (contadorLinea==input.size()-1) {
				dibujando = false;
			}
			System.out.println();
			System.out.println("Línea: " + contadorLinea);
		}
		
		for (int i = 0; i<input.size(); i++) {
			String[] in = input.get(i).split(" ");
			if (in[0].compareTo("R")==0) {
				
			} else if (in[0].compareTo("L")==0) {
				
			} else if (in[0].compareTo("U")==0) {

			} else if (in[0].compareTo("D")==0) {

			}
		}
		
		System.err.println(recorrido.size());
		System.out.println("Unique: " + uniqueTilesVisited);
		
	}

}
