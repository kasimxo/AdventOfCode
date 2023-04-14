package aoc2022;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Day14 {
	
	public static List<LineaD14> lineas = new ArrayList<LineaD14>();
	
	public static int maxHeight=-1;
	public static int minHeight=0;
	public static int maxWidth=-1;
	public static int minWidth=-1;
	public static List<Sand> grains = new ArrayList<Sand>();
	
	public static void main(String[] args) {
		
		
		
		
		
		String filePath = new File("").getAbsolutePath();
		filePath += "\\input\\Day14T.txt";
		Path file = Paths.get(filePath);
		
		try {
			List<String> input = Files.readAllLines(file);
			
			//Creamos las lï¿½neas
			for (String string : input) {
				//Con esto separamos las coordenadas
				String[] coords = string.split(" -> ");
				
				LineaD14 linea = new LineaD14();
				
				for (String coordRaw : coords) {
					String[] coord = coordRaw.split(",");
					int x = Integer.parseInt(coord[0]);
					int y = Integer.parseInt(coord[1]);
					
					linea.addCoord(x,y);
					
					if(maxHeight==-1) {
						maxHeight = y;
					} else if (maxHeight<y) {
						maxHeight = y;
					}
					if(maxWidth==-1) {
						maxWidth = x;
					} else if (maxWidth<x) {
						maxWidth = x;
					}
					if(minWidth==-1) {
						minWidth = x;
					} else if (minWidth>x) {
						minWidth = x;
					}

				}
				lineas.add(linea);
				
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		draw();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		grains.add(new Sand());
		
		for (int i = 0; i<100; i++) {
			actualizarPos();
			draw();
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * Aquí actualizamos la posición del último grano de arena añadido.
	 * Si no se puede mover mas, hacemos spawn de uno nuevo.
	 * Si se cae fuera, restamos uno a la cantidad de granos.
	 */
	private static void actualizarPos() {
		Sand grano = grains.get(grains.size()-1);
		boolean abajoIzquierda = true;
		boolean abajo = true;
		boolean abajoDerecha = true;
		int x = grano.getX() ;
		//Añadimos uno a la altura para comprobar justo debajo
		int y = grano.getY() +1;
		
		//Aquí comparamos con los muros
		for (LineaD14 linea : lineas) {
			List<CoordD14> coordenadas = linea.getLinea();
			
			for (CoordD14 coord : coordenadas) {
				if(coord.getX()==x && coord.getY()==y) {
					System.err.println("COLISION");
					abajo = false;
				}
				
			}
		}
		for (LineaD14 linea : lineas) {
			List<CoordD14> coordenadas = linea.getLinea();
			
			for (CoordD14 coord : coordenadas) {
				if(coord.getX()==x-1 && coord.getY()==y) {
					System.err.println("COLISION IZQUIERDA");
					abajoIzquierda = false;
				}
				
			}
		}
		for (LineaD14 linea : lineas) {
			List<CoordD14> coordenadas = linea.getLinea();
			
			for (CoordD14 coord : coordenadas) {
				if(coord.getX()==x+1 && coord.getY()==y) {
					System.err.println("COLISION derecha");
					abajoDerecha = false;
				}
				
			}
		}
		//Ahora toca comparar con otros granos de arena
		for (Sand granoCheck : grains) {
			if(granoCheck.getX()==x && granoCheck.getY()==y) {
				System.err.println("COLISION GRANO");
				abajo = false;
			}
			if(granoCheck.getX()==x-1 && granoCheck.getY()==y) {
				System.err.println("COLISION GRANO IZQUIERDA");
				abajoIzquierda = false;
			}
			if(granoCheck.getX()==x+1 && granoCheck.getY()==y) {
				System.err.println("COLISION GRANO DERECHA");
				abajoDerecha = false;
			}
		}
		
		
		
		if(abajo) {
			grano.setY(y);
		} else if(abajoIzquierda) {
			grano.setX(x-1);
			grano.setY(y);
		} else if(abajoDerecha) {
			grano.setX(x+1);
			grano.setY(y);
		} else {
			grains.add(new Sand());
		}
	}

	private static void draw() {
		for(int column = 0; column<=maxWidth-minWidth; column++) {
			System.out.print(column + " ");
			for(int row = 0; row<=maxHeight-minHeight; row++) {
				System.out.print(check(row,column));
			}
			System.out.println();
		}
		
	}

	private static char check(int column, int row) {
		
		for (LineaD14 linea : lineas) {
			List<CoordD14> coordenadas = linea.getLinea();
			
			for (CoordD14 coord : coordenadas) {
				int x = column+minWidth;
				int y = row + minHeight;
				if(coord.getX()==x && coord.getY()==y) {
					return '#';
				}
				
			}
		}
		for (Sand grano : grains) {
			int x = column+minWidth;
			int y = row + minHeight;
			if(grano.getX()==x && grano.getY()==y) {
				return 'o';
			
			}
		}
		return '.';
	}

}
