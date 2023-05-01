package aoc2020;

import java.util.List;
import java.util.ArrayList;
import utilitiesAOC.Input;

public class D3 {
	
	public static List<String> input = Input.listaString(2020, 3, false);
	public static int ancho = input.get(0).length();
	public static int alto = input.size();
	public static int collisions = 1;
	public static List<Slopes> slopes = new ArrayList<Slopes>();
	public static boolean calculating = true;

	public static void main(String[] args) {
		
		List<String> slopesRaw = Input.listaString("2020", "slopes");
		for (String string : slopesRaw) {
			slopes.add(new Slopes(string));
		}
		
		
		
		while(calculating) {
			draw();
		}
			
		for (Slopes slope : slopes) {
			collisions*=slope.getArboles();
			System.out.println(slope);
		}
		System.out.println("Te encuentras " + collisions + " árboles.");
	}

	private static void draw() {
		calculating=false;
		for (Slopes slope : slopes) {
			if(slope.isPlaying()) {
				calculating=true;
				for (int fila = 0; fila < alto; fila++) {
					for (int columna = 0; columna < ancho; columna++) {
						
						char curr = input.get(fila).charAt(columna);
						
						if(fila==slope.getY() && columna==slope.getX()) {
							if(curr=='#') {
								curr='X';
								slope.sumArbol();
							} else {
								curr='O';
							}
						}
						System.out.print(curr);
					}
					System.out.println();
				}
				
				slope.setX(slope.getX()+slope.getRight());
				slope.setY(slope.getY()+slope.getDown());
				correct(slope);
				System.out.println("\n\n");
			}
		}
	}

	private static void correct(Slopes slope) {
		if(slope.getX()>=ancho) {
			slope.setX(slope.getX()-ancho);
		}
		if(slope.getY()>=alto) {
			slope.setPlaying(false);
		}
	}





}
