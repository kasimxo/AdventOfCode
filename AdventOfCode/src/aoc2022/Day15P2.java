package aoc2022;

import java.util.ArrayList;
import java.util.List;
import java.awt.Point;


import utilitiesAOC.Input;

public class Day15P2 {

	public static long minWidth=-1;
	public static long minHeight=-1;
	public static long maxWidth=-1;
	public static long maxHeight=-1;
	public static long solved = 0;
	public static boolean primero=true;
	public static List<SensorP2> sensores = new ArrayList<SensorP2>();
	public static List<Beacon> beacons = new ArrayList<Beacon>();


	public static void main(String[] args) {
		
		
		
		
		List<String> input = Input.listaString(2022, 15, true);
		
		
		
		//Here we create all sensor and beacons
		for (String string : input) {
			
			String[] split = string.split(" ");
			
			String sensorX = split[2].split("=")[1];
			sensorX = sensorX.substring(0, sensorX.length()-1);
			String sensorY = split[3].split("=")[1];
			sensorY = sensorY.substring(0, sensorY.length()-1);
			String beaconX = split[8].split("=")[1];
			beaconX = beaconX.substring(0, beaconX.length()-1);
			String beaconY = split[9].split("=")[1];
			Beacon beacon = new Beacon(Long.parseLong(beaconX), Long.parseLong(beaconY));
			SensorP2 sensor = new SensorP2(Long.parseLong(sensorX), Long.parseLong(sensorY), beacon);
			
			sensores.add(sensor);
			beacons.add(beacon);
			
			long distancia = Math.abs(sensor.getX()-beacon.getX()) + Math.abs(sensor.getY()-beacon.getY());
			sensor.setMaxDist(distancia);
			//sensor.generatePerimeter();
			
			//Here we check all values to see if we need to increase the print area
			if(primero) {
				minWidth=Long.parseLong(sensorX);
				maxWidth=Long.parseLong(sensorX);
				minHeight=Long.parseLong(sensorY);
				maxHeight=Long.parseLong(sensorY);
				primero=false;
			}
			if(minWidth>Long.parseLong(sensorX)) {
				minWidth=Long.parseLong(sensorX);
			}
			if(minWidth>Long.parseLong(beaconX)) {
				minWidth=Long.parseLong(beaconX);
			}
			if(maxWidth<Long.parseLong(sensorX)) {
				maxWidth=Long.parseLong(sensorX);
			}
			if(maxWidth<Long.parseLong(beaconX)) {
				maxWidth=Long.parseLong(beaconX);
			}
			//Here we check height limit
			if(minHeight>Long.parseLong(sensorY)) {
				minHeight=Long.parseLong(sensorY);
			}
			if(minHeight>Long.parseLong(beaconY)) {
				minHeight=Long.parseLong(beaconY);
			}
			if(maxHeight<Long.parseLong(sensorY)) {
				maxHeight=Long.parseLong(sensorY);
			}
			if(maxHeight<Long.parseLong(beaconY)) {
				maxHeight=Long.parseLong(beaconY);
			}
			
			
			//We only print them to make sure we are getting the correct input
			//System.out.println(string);
			//System.out.println(sensores.get(sensores.size()-1));
		}
		System.out.println("Ancho " + minWidth + " x " + maxWidth);
		System.out.println("Alto " + minHeight + " x " + maxHeight);

		//System.exit(0);
		//draw();
		fixDimensions();
		//calculateBeacon();
		intersecciones();

		draw();
		System.out.println("Dimensiones arregladas.");
		System.out.println("Ancho " + minWidth + " x " + maxWidth);
		System.out.println("Alto " + minHeight + " x " + maxHeight);
		System.out.println("Row 10" + " has " + (sol(10)) + " positions where no beacon is posible");
		System.out.println("Row 2000000" + " has " + (sol(2000000)) + " positions where no beacon is posible");

		System.err.println("Tuning frequency: " + solved);
	}
	
	private static void intersecciones() {
		List<Point> intersecciones = new ArrayList<Point>();
		for(int i = 0; i<sensores.size(); i++) {
			SensorP2 sensor= sensores.get(i);
			for (SensorP2 checkSensor : sensores) {
				//m1s1 -> m1 se refiere a pendiente 1, s1 al sensor 1
				//Solo necesitamos dos pendientes porque solo hay dos tipos de rectas
				int m1s1 = 1;
				int m1s2 = -1;
				int m2s1 = -1;
				int m2s2 = 1;
				//c1s1 -> se refiere a la constante, tomada desde el vertice 
				//desde el que trazamos la línea
				int c1s1 = (int) (sensor.getY() - sensor.getMaxDist());
				int c1s2 = (int) (checkSensor.getY() - checkSensor.getMaxDist());
				
				//x=(b1-b2)/(m2-m1)
				int cruce1X =(c1s1-c1s2)/(m1s2-m1s1);
				int cruce1Y = -1*cruce1X+c1s1;
				//Aquí comprobamos que el punto de cruce esté dentro del segmento que nos interesa
				if(cruce1X<sensor.getVertices().get(0).x || cruce1X>sensor.getVertices().get(1).x || cruce1Y<sensor.getVertices().get(0).y || cruce1X>sensor.getVertices().get(1).y) {
				} else {
					intersecciones.add(new Point(cruce1X, cruce1Y));
					System.err.println("Las líneas se cruzan en x= " + cruce1X);
				}
			}
		}
		//Todavía faltan por implementar el resto de rectas y después hacer la 
		//limpieza de puntos de cruce que esten bajo el rango de otro sensor
		
		for (Point point : intersecciones) {
			System.out.println(point);
		}
	}

	private static void calculateBeacon() {
		for(long row = minHeight; row<=maxHeight; row++) {
			for(long column = minWidth; column<=maxWidth; column++) {
				if(checkBeacon(column, row)) {
					solved = (column*4000000) + row;
					System.out.println("Tuning frequency: " + solved);
				}
			}
			long solRow = sol(row);
		}		
	}
	
	private static boolean checkBeacon(long column, long row) {
		for(SensorP2 sensor : sensores) {
			if(sensor.getX()==column && sensor.getY()==row) {
				return false;
			}
		}
		
		for (Beacon beacon : beacons) {
			if(beacon.getX()==column && beacon.getY()==row) {
				return false;
			}
		}
		
		for(SensorP2 sensor : sensores) {
			long distX = Math.abs(sensor.getX()-column);
			long distY = Math.abs(sensor.getY()-row);
			if(sensor.getMaxDist()>=distX+distY) {
				return false;
			} 
		}

		return true;
	}
	
	
	/**
	 * Here we fix dimensions (Width in particular) Why?
	 * If we didnt do this, the minimun and maximum width would be the position of the furthest 
	 * sensor/beacon.
	 * That is not correct.
	 */
	private static void fixDimensions() {
		if(minWidth<0) {
			minWidth = 0;
		}
		if(minHeight<0) {
			minHeight=0;
		}
		
		if(maxWidth>20) {
			maxWidth=20;
		}
		if(maxHeight>20) {
			maxHeight=20;
		}
		
//		if(maxWidth>4000000) {
//			maxWidth=4000000;
//		}
//		if(maxHeight>4000000) {
//			maxHeight=4000000;
//		}
	}

	/**
	 * Here we check a specific row
	 * @param i
	 */
	private static long sol(long row) {
		long solution = 0;
		long maxDistance = maxWidth + Math.abs(minWidth);
		for(long column = minWidth; column<=maxWidth; column++) {
			if(check(column, row)=='.') {
				solution++;
			}
		}
		
		return maxDistance-solution;
	}

	/**
	 * Here we draw the map 
	 */
	private static void draw() {
		for(long row = minHeight; row<=maxHeight; row++) {
			System.out.printf("%2s ",row);
			for(long column = minWidth; column<=maxWidth; column++) {
				char pos = check(column, row);
				System.out.print(pos);
			}
			long solRow = sol(row);
			System.out.println(" " + solRow);
		}
	}

	/**
	 * We check a specific position to see if its a sensor or beacon or something else
	 * @param row
	 * @param column
	 * @return
	 */
	private static char check(long column, long row) {
		for(SensorP2 sensor : sensores) {
			if(sensor.getX()==column && sensor.getY()==row) {
				return 'S';
			}
		}
		
		for (Beacon beacon : beacons) {
			if(beacon.getX()==column && beacon.getY()==row) {
				return 'B';
			}
		}
		
		for(SensorP2 sensor : sensores) {
			long distX = Math.abs(sensor.getX()-column);
			long distY = Math.abs(sensor.getY()-row);
			if(sensor.getMaxDist()>=distX+distY) {
				return '#';
			} 
		}

		return '.';
	}

}

