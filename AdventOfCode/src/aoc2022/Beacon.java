package aoc2022;

public class Beacon {
	
	private long x;
	private long y;
	
	public Beacon(long x, long y) {
		this.x = x;
		this.y = y;
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

	@Override
	public String toString() {
		return "Beacon x= " + x + " y= " + y;
	}
	
	
	
}
