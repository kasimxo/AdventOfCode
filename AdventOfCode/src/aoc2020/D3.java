package aoc2020;

import java.util.List;

import utilitiesAOC.Input;

public class D3 {
	
	public static List<String> input = Input.listaString(2020, 3, false);
	public static int ancho = input.get(0).length();
	public static int alto = input.size();
	public static int x1 = 0;
	public static int y1 = 0;
	public static int x2 = 0;
	public static int y2 = 0;
	public static int x3 = 0;
	public static int y3 = 0;
	public static int x4 = 0;
	public static int y4 = 0;
	public static int x5 = 0;
	public static int y5 = 0;
	public static int collisions1 = 0;
	public static int collisions2 = 0;
	public static int collisions3 = 0;
	public static int collisions4 = 0;
	public static int collisions5 = 0;
	public static boolean playing = true;

	public static void main(String[] args) {
		
		while(playing) {
			draw();
		}
			
		System.out.println("Te encuentras " + collisions + " árboles.");
		
		
	}

	private static void draw() {
		for (int fila = 0; fila < alto; fila++) {
			for (int columna = 0; columna < ancho; columna++) {
				char curr = input.get(fila).charAt(columna);
				if(fila==y && columna==x) {
					if(curr=='#') {
						curr='X';
						collisions++;
					} else {
						curr='O';
					}
				}
				System.out.print(curr);
			}
			System.out.println();
		}
		x+=3;
		y+=1;
		correct();
		System.out.println("\n\n");
	}

	private static void correct() {
		if(x>=ancho) {
			x=x-ancho;
		}
		if(y>=alto) {
			playing=false;
		}
	}

}
