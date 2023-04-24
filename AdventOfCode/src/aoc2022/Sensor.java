package aoc2022;

public class Sensor {

	private int x;
	private int y;
	private Beacon closest;
	
	public Sensor(int x, int y, Beacon beacon) {
		this.x = x;
		this.y = y;
		this.closest = beacon;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
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
		return "Sensor x= " + x + " y= " + y + "\nClosest Beacon= " + closest;
	}
	
	
}
