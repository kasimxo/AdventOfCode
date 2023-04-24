package aoc2022;

import java.util.ArrayList;
import java.util.List;

import utilitiesAOC.Input;

public class Day15 {
	
	public static int minWidth=-1;
	public static int minHeight=-1;
	public static int maxWidth=-1;
	public static int maxHeight=-1;
	public static boolean primero=true;
	public static List<Sensor> sensores = new ArrayList<Sensor>();
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
			Beacon beacon = new Beacon(Integer.parseInt(beaconX), Integer.parseInt(beaconY));
			Sensor sensor = new Sensor(Integer.parseInt(sensorX), Integer.parseInt(sensorY), beacon);
			
			sensores.add(sensor);
			beacons.add(beacon);
			
			//Here we check all values to see if we need to increase the print area
			if(primero) {
				minWidth=Integer.parseInt(sensorX);
				maxWidth=Integer.parseInt(sensorX);
				minHeight=Integer.parseInt(sensorY);
				maxHeight=Integer.parseInt(sensorY);
				primero=false;
			}
			if(minWidth>Integer.parseInt(sensorX)) {
				minWidth=Integer.parseInt(sensorX);
			}
			if(minWidth>Integer.parseInt(beaconX)) {
				minWidth=Integer.parseInt(beaconX);
			}
			if(maxWidth<Integer.parseInt(sensorX)) {
				maxWidth=Integer.parseInt(sensorX);
			}
			if(maxWidth<Integer.parseInt(beaconX)) {
				maxWidth=Integer.parseInt(beaconX);
			}
			//Here we check height limit
			if(minHeight>Integer.parseInt(sensorY)) {
				minHeight=Integer.parseInt(sensorY);
			}
			if(minHeight>Integer.parseInt(beaconY)) {
				minHeight=Integer.parseInt(beaconY);
			}
			if(maxHeight<Integer.parseInt(sensorY)) {
				maxHeight=Integer.parseInt(sensorY);
			}
			if(maxHeight<Integer.parseInt(beaconY)) {
				maxHeight=Integer.parseInt(beaconY);
			}
			
			
			//We only print them to make sure we are getting the correct input
			System.out.println(string);
			System.out.println(sensores.get(sensores.size()-1));
		}
		System.out.println("Ancho " + minWidth + " x " + maxWidth);
		System.out.println("Alto " + minHeight + " x " + maxHeight);

		draw();
		
	}

	/**
	 * Here we draw the map 
	 */
	private static void draw() {
		for(int row = minHeight; row<=maxHeight; row++) {
			System.out.printf("%2s ",row);
			for(int column = minWidth; column<=maxWidth; column++) {
				char pos = check(column, row);
				System.out.print(pos);
			}
			System.out.println();
		}
	}

	/**
	 * We check a specific position to see if its a sensor or beacon or something else
	 * @param row
	 * @param column
	 * @return
	 */
	private static char check(int column, int row) {
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
		return '.';
	}

}
