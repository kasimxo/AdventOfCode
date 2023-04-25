package aoc2022;

import java.awt.Point;
import java.util.List;
import java.util.ArrayList;

public class SensorP2 {



	private long x;
	private long y;
	private long maxDist;
	private Beacon closest;
	private List<Point> coordPerimetro = new ArrayList<Point>();
	private List<Point> vertices;
	
	public List<Point> getVertices() {
		return vertices;
	}

	public void setVertices(List<Point> vertices) {
		this.vertices = vertices;
	}

	public SensorP2(long x, long y, Beacon beacon) {
		this.x = x;
		this.y = y;
		this.closest = beacon;
	}

	public long getX() {
		return x;
	}

	public void setX(long x) {
		this.x = x;
	}

	public long getY() {
		return y;
	}

	public void setY(long y) {
		this.y = y;
	}

	public Beacon getClosest() {
		return closest;
	}

	public void setClosest(Beacon closest) {
		this.closest = closest;
	}

	@Override
	public String toString() {
		return "Sensor x= " + x + " y= " + y + "\nClosest Beacon= " + closest + "\nDistancia máxima: " + maxDist;
	}

	public long getMaxDist() {
		return maxDist;
	}

	public void setMaxDist(long maxDist) {
		this.maxDist = maxDist;
		this.vertices = new ArrayList<Point>();
		vertices.add(new Point((int) x, (int) (y - maxDist - 1)));
		vertices.add(new Point((int) (x + maxDist + 1), (int) (y)));
		vertices.add(new Point((int) x, (int) (y + maxDist + 1)));
		vertices.add(new Point((int) (x - maxDist - 1), (int) (y)));
		for (Point point : vertices) {
			System.out.println(point.x + " " + point.y);
		}
	}

	public void generatePerimeter() {
		boolean calculando = true;
		int indexX = (int) x;
		//Drift is the thisplacement in the X axis while calculating points around the perimeter.
		//Once Y == this.y drift starts reducing
		int driftX = 0;
		boolean drifting = true;
		int indexY = (int) (y - maxDist);
		while(calculando) {
			//vamos a generar todos los puntos del perimetro
			coordPerimetro.add(new Point(indexX+driftX, indexY));
			if(driftX!=0) {
				coordPerimetro.add(new Point(indexX-driftX, indexY));
			}
			if(drifting) {
				driftX++;
			} else {
				driftX--;
			}
			indexY++;
			if(indexY==y) {
				drifting = false;
			}
			if(Math.abs(x-indexX) + Math.abs(y-indexY) > maxDist) {
				calculando=false;
			}
		}
		System.out.println("Perimetro calculado");
		limpieza();
	}

	private void limpieza() {
		List<Point> limpiar = new ArrayList<Point>();
		for (Point point : coordPerimetro) {
			for (SensorP2 sensor : Day15P2.sensores) {
				if(Math.abs(point.x - (int) (sensor.x)) + Math.abs(point.y - (int) (sensor.y))>sensor.maxDist) {
					limpiar.add(point);
				}
			}
		}
		for (Point point : limpiar) {
			coordPerimetro.remove(point);
		}
		limpiar.clear();
		System.out.println("Limpieza realizada");
	}
	
	
}
