package aoc2022;

public class Sensor {

	private long x;
	private long y;
	private long maxDist;
	private Beacon closest;
	
	public Sensor(long x, long y, Beacon beacon) {
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
	}
	
	
}
