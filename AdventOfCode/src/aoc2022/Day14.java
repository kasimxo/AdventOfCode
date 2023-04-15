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
	public static int minHeight=-1;
	public static int maxWidth=-1;
	public static int minWidth=-1;
	public static int grainsofSalt=0;
	
	public static void main(String[] args) {
		
		
		
		
		
		String filePath = new File("").getAbsolutePath();
		filePath += "\\AdventOfCode\\input\\Day14T.txt";
		Path file = Paths.get(filePath);
		
		try {
			List<String> input = Files.readAllLines(file);
			
			//Creamos las l�neas
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
					
					if(minHeight==-1) {
						minHeight = y;
					} else if (minHeight>y) {
						minHeight = y;
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
		
		System.out.println(minWidth + "  " + maxWidth + "  " + maxHeight);
		draw();
		
	}

	private static void draw() {
		
		for(int column = 0; column<maxWidth-minWidth; column++) {
			for(int row = 0; row<maxHeight-minHeight; row++) {
				System.out.print(check(column,row));
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
		return '.';
	}

}
