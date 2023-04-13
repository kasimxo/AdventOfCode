package aoc2022;

public class CoordD14 {
	private int x;
	private int y;
	
	/**
	 * Para que se genere una coordenada necesitamos los dos parámetros, x e y
	 * @param x
	 * @param y
	 */
	public CoordD14(int x, int y) {
		super();
		this.x = x;
		this.y = y;
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
		return "X=" + x + "\t Y=" + y;
	}
	
	
	
}
