package aoc2022;

public class Sand {
	//default values are spawn position 
	private int x = 500;
	private int y = 0;
	
	
	/**
	 * Constructor is void since initial position is default.
	 */
	public Sand() {

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



	@Override
	public String toString() {
		return "Sand X=" + x + "Y=" + y;
	}
	
	
	
	
	
}
