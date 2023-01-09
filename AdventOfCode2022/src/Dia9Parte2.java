import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia9Parte2 {

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
		
		int[][] cuerpo = new int[10][2];
		
		int distanciaX = 0;
		int distanciaY = 0;
		
		int uniqueTilesVisited = 0;
		
		List<String> input = new ArrayList<String>();
		String name = "C:\\Users\\Andr�s\\workspace\\AdventOfCode2022\\inputs\\9.txt";
		Path path = Paths.get(name);
		try {
			input = Files.readAllLines(path);
		} catch (Exception e) {
			System.err.println("La cagaste sur");
		}
		
		while (dibujando) {
			/*
			 * Faltan por actualizar todas las casillas del cuerpo
			 */
			
			System.out.println(input.get(contadorLinea));
			
			String[] in = input.get(contadorLinea).split(" ");
			
			int pasos = Integer.parseInt(in[1]);
			
			//Hacemos el n�mero de pasos en la direcci�n indicada
			for (int i = 0; i<pasos; i++) {
				
				//Actualizamos la posici�n teniendo en cuenta que si est� en el l�mite del tablero tenemos que ampliar el l�mite
				if (in[0].compareTo("R")==0) {
					cuerpo[0][0]++;
				} else if (in[0].compareTo("L")==0) {
					cuerpo[0][0]--;
				} else if (in[0].compareTo("U")==0) {
					cuerpo[0][1]--;
				} else if (in[0].compareTo("D")==0) {
					cuerpo[0][1]++;
				}
				
				if (cuerpo[0][0]>dimensionColumnas || cuerpo[0][0] < 0) {
					dimensionColumnas++;
					
				} else if (cuerpo[0][1]>dimensionFilas || cuerpo[0][1] < 0) {
					dimensionFilas++;
				}
				
				//Como aqu� es donde actualizamos las posiciones, tambi�n recorremos la lista de tiles recorridas para actualizar posiciones
				if (cuerpo[0][0]<0) {
					//Aqu� tenemos que actualizar todas las posiciones del cuerpo
					for (int j = 0; j<cuerpo.length; j++) {
						cuerpo[j][0]++;
					}
					startingX++;
					for (int j = 0; j<recorrido.size(); j++) {
						String[] aux = recorrido.get(j).split(" ");
						String recomp = (Integer.parseInt(aux[0]) + 1) + " " + Integer.parseInt(aux[1]);
						recorrido.set(j, recomp);
					}
				} else if (cuerpo[0][1]<0) {
					//Aqu� tenemos que actualizar todas las posiciones del cuerpo
					for (int j = 0; j<cuerpo.length; j++) {
						cuerpo[j][1]++;
					}
					startingY++;
					for (int j = 0; j<recorrido.size(); j++) {
						String[] aux = recorrido.get(j).split(" ");
						String recomp = Integer.parseInt(aux[0]) + " " + (Integer.parseInt(aux[1]) + 1);
						recorrido.set(j, recomp);
					}
				}
				
				//Aqu� es donde actualizamos la posici�n de la cola
				
				for (int j = 0; j<cuerpo.length-1; j++) {
					
					distanciaX = cuerpo[j][0] - cuerpo[j+1][0];
					distanciaY = cuerpo[j][1] - cuerpo[j+1][1];
					
					if (distanciaX > 1 && distanciaY >= 1) {
						cuerpo[j+1][0]++;
						cuerpo[j+1][1]++;
					} else if (distanciaX > 1 && distanciaY <= -1) {
						cuerpo[j+1][0]++;
						cuerpo[j+1][1]--;
					} else if (distanciaX < -1 && distanciaY >= 1) {
						cuerpo[j+1][0]--;
						cuerpo[j+1][1]++;
					} else if (distanciaX < -1 && distanciaY <= -1) {
						cuerpo[j+1][0]--;
						cuerpo[j+1][1]--;
					} else if (distanciaX >= 1 && distanciaY > 1) {
						cuerpo[j+1][0]++;
						cuerpo[j+1][1]++;
					} else if (distanciaX >= 1 && distanciaY < -1) {
						cuerpo[j+1][0]++;
						cuerpo[j+1][1]--;
					} else if (distanciaX <= -1 && distanciaY > 1) {
						cuerpo[j+1][0]--;
						cuerpo[j+1][1]++;
					} else if (distanciaX <= -1 && distanciaY < -1) {
						cuerpo[j+1][0]--;
						cuerpo[j+1][1]--;
					} else if (distanciaX > 1) {
						cuerpo[j+1][0]++;
					} else if (distanciaY > 1) {
						cuerpo[j+1][1]++;
					} else if (distanciaX < -1) {
						cuerpo[j+1][0]--;
					} else if (distanciaY < -1) {
						cuerpo[j+1][1]--;
					}
				}
				
				
				
				
				/*Como aqu� hemos actualizado las posiones, comprobamos si la casilla en la que esta la cola
				 * es nueva y si lo es, la guardamos en la lista
				 */
				boolean newTile = true;
				for (int j = 0; j<recorrido.size(); j++) {
					String[] comp = recorrido.get(j).split(" ");
					if (cuerpo[cuerpo.length-1][0]==Integer.parseInt("" + comp[0]) && cuerpo[cuerpo.length-1][1]==Integer.parseInt("" + comp[1])) {
						//Si tenemos una cooincidencia implica que no es una newTile
						newTile=false;
					}
				}
				if (newTile) {
					uniqueTilesVisited++;
					recorrido.add(cuerpo[cuerpo.length-1][0] + " " + cuerpo[cuerpo.length-1][1]);
				}
				
				//Aqu� dibujamos el tablero con las posiciones ya  actualizadas
//				for (int fila = 0; fila <= dimensionFilas; fila++) {
//					for (int columna = 0; columna <= dimensionColumnas; columna++) {
//						
//						boolean casillaCuerpo = false;
//						
//						for (int index = 0; index<cuerpo.length; index++) {
//							if (cuerpo[index][0] == columna && cuerpo[index][1] == fila && !casillaCuerpo) {
//								System.out.print(index);
//								casillaCuerpo = true;
//							}
//						}
//						
//						if (columna==startingX && fila==startingY && !casillaCuerpo) {
//							System.out.print("s");
//						} else if (!casillaCuerpo) {
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
			
//			for (int fila = 0; fila <= dimensionFilas; fila++) {
//				for (int columna = 0; columna <= dimensionColumnas; columna++) {
//					
//					boolean casillaCuerpo = false;
//					
//					for (int index = 0; index<cuerpo.length; index++) {
//						if (cuerpo[index][0] == columna && cuerpo[index][1] == fila && !casillaCuerpo) {
//							System.out.print(index);
//							casillaCuerpo = true;
//						}
//					}
//					
//					if (columna==startingX && fila==startingY && !casillaCuerpo) {
//						System.out.print("s");
//					} else if (!casillaCuerpo) {
//						boolean visited = false;
//						for (int j = 0; j<recorrido.size(); j++) {
//							String[] comp = recorrido.get(j).split(" ");
//							if (columna==Integer.parseInt("" + comp[0]) && fila==Integer.parseInt("" + comp[1])) {
//								visited = true;
//							}
//						}
//						if (visited) {
//							System.out.print("#");
//						} else {
//							System.out.print(".");
//						}
//					}
//					
//				}
//				System.out.println();
//			}
			
			contadorLinea++;
			
			if (contadorLinea==input.size()) {
				dibujando = false;
			}
			System.out.println();
			System.out.println("L�nea: " + contadorLinea);
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