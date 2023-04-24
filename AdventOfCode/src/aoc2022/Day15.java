package aoc2022;

import java.util.ArrayList;
import java.util.List;

import utilitiesAOC.Input;

public class Day15 {
	
	public static long minWidth=-1;
	public static long minHeight=-1;
	public static long maxWidth=-1;
	public static long maxHeight=-1;
	public static boolean primero=true;
	public static List<Sensor> sensores = new ArrayList<Sensor>();
	public static List<Beacon> beacons = new ArrayList<Beacon>();


	public static void main(String[] args) {
		
		List<String> input = Input.listaString(2022, 15, false);
		
		
		
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
			Sensor sensor = new Sensor(Long.parseLong(sensorX), Long.parseLong(sensorY), beacon);
			
			sensores.add(sensor);
			beacons.add(beacon);
			
			long distancia = Math.abs(sensor.getX()-beacon.getX()) + Math.abs(sensor.getY()-beacon.getY());
			sensor.setMaxDist(distancia);
			
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
			System.out.println(string);
			System.out.println(sensores.get(sensores.size()-1));
		}
		System.out.println("Ancho " + minWidth + " x " + maxWidth);
		System.out.println("Alto " + minHeight + " x " + maxHeight);

		//System.exit(0);
		
		//draw();
		fixDimensions();
		//draw();
		System.out.println("Row 10" + " has " + (sol(10)) + " positions where no beacon is posible");
		System.out.println("Row 2000000" + " has " + (sol(2000000)) + " positions where no beacon is posible");

		
	}
	/**
	 * Here we fix dimensions (Width in particular) Why?
	 * If we didnt do this, the minimun and maximum width would be the position of the furthest 
	 * sensor/beacon.
	 * That is not correct.
	 */
	private static void fixDimensions() {
		for (Sensor sensor : sensores) {
			long x = sensor.getX();
			long y = sensor.getY();
			long dist = sensor.getMaxDist();
			if(x+dist>maxWidth) {
				maxWidth=x+dist;
			} else if (x-dist<minWidth) {
				minWidth=x-dist;
			}
		}
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
		for(Sensor sensor : sensores) {
			if(sensor.getX()==column && sensor.getY()==row) {
				return 'S';
			}
		}
		
		for (Beacon beacon : beacons) {
			if(beacon.getX()==column && beacon.getY()==row) {
				return 'B';
			}
		}
		
		for(Sensor sensor : sensores) {
			long distX = Math.abs(sensor.getX()-column);
			long distY = Math.abs(sensor.getY()-row);
			if(sensor.getMaxDist()>=distX+distY) {
				return '#';
			} 
		}
		
		return '.';
	}

}
