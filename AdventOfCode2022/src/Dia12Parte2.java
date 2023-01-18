import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Dia12Parte2 {
	
 	public static int steps = 0;
 	public static boolean solving = true;
	
	public static void main(String[] args) throws InterruptedException {
		
		List<String> input = Input.listaString("12");
		
		int[][] solutionArray = new int[input.size()][input.get(0).length()];
		
		
		solutionArray = load(input, solutionArray);
		
		while (solving ) {
			//printMap(solutionArray);
			
			solutionArray = avanzar(input, solutionArray);
			steps++;
		}
		
		printMap(solutionArray);
		//Solution is one LESS than the maximum value printed
	}
	
	/*
	 * Aquí vamos a ir comprobando las casillas mas recientes que hemos descubierto y vamos a intentar ampliarlas
	 */
	private static int[][] avanzar(List<String> input, int[][] solutionArray) {
		for (int fila = 0; fila<input.size(); fila++) {
			for (int columna = 0; columna<input.get(fila).length(); columna++) {
				
				char actual = input.get(fila).charAt(columna);
				
				if (Character.compare(actual, 'E')==0) {
					actual = 'z';
				} else if (Character.compare(actual, 'a')==0 && solutionArray[fila][columna]>0) {
					solving=false;
				}
				
				int n = solutionArray[fila][columna];
				
				//Aquí vemos si una casilla ha sido puesta en el último turno
				if ( n == steps) {
					
					
					
					//derecha
					//me aseguro de no estar en el borde derecho porque sería null
					//me aseguro de que no hayamos pasado
					if(columna<input.get(fila).length()-1 && solutionArray[fila][columna+1]==-1) {
						char derecha = input.get(fila).charAt(columna+1);
						if (Character.compare(actual, derecha)<=1) {
							solutionArray[fila][columna+1] = steps+1;
						}
					}
					
					//izquierda
					//me aseguro de no estar en el borde izquierdo porque sería null
					//me aseguro de que no hayamos pasado
					if(columna>0 && solutionArray[fila][columna-1]==-1) {
						char izquierda = input.get(fila).charAt(columna-1);
						if (Character.compare(actual, izquierda)<=1) {
							solutionArray[fila][columna-1] = steps+1;
						}
					}
					
					//abajo
					//me aseguro de no estar en el borde inferior porque sería null
					//me aseguro de que no hayamos pasado
					if(fila<input.size()-1 && solutionArray[fila+1][columna]==-1) {
						char abajo = input.get(fila+1).charAt(columna);
						if (Character.compare(actual, abajo)<=1) {
							solutionArray[fila+1][columna] = steps+1;
						}
					}
					
					//arriba
					//me aseguro de no estar en el borde superior porque sería null
					//me aseguro de que no hayamos pasado
					if(fila>0 && solutionArray[fila-1][columna]==-1) {
						char arriba = input.get(fila-1).charAt(columna);
						if (Character.compare(actual, arriba)<=1) {
							solutionArray[fila-1][columna] = steps+1;
						}
					}
				}
			}
		}
		return solutionArray;
	}

	/*
	 * Aquí ponemos toda la lista solution vacía excepto la posición inicial
	 */
	private static int[][] load(List<String> inputLoad, int[][] solutionArray) {
		for (int fila = 0; fila<inputLoad.size(); fila++) {
			for (int columna = 0; columna<inputLoad.get(0).length(); columna++) {
				if (inputLoad.get(fila).charAt(columna)=='E') {
					solutionArray[fila][columna] = 0;
				} else {
					solutionArray[fila][columna] = -1;
				}
			}
		}
		return solutionArray;
	}

	public static void printMap(int[][] solutionArray) {
		for (int fila = 0; fila<solutionArray.length; fila++) {
			for (int columna = 0; columna<solutionArray[0].length; columna++) {
				//System.out.print(mapa.get(fila).charAt(columna));
				System.out.print(solutionArray[fila][columna] + " ");
			}
			System.out.println();
		}
		System.out.println();
		System.out.println("-------");
	}

}
