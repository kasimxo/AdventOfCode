package aoc2020;

public class Slopes {
	private int right;
	private int down;
	private int x;
	private int y;
	private int arboles;
	private boolean playing = true;
	
	public Slopes(String s) {
		String[] splited = s.split(" ");
		this.right = Integer.parseInt(splited[1]);
		this.down = Integer.parseInt(splited[3]);
		this.x = 0;
		this.y = 0;
		this.setArboles(0);
	}

	public int getRight() {
		return right;
	}

	public void setRight(int right) {
		this.right = right;
	}

	public int getDown() {
		return down;
	}

	public void setDown(int down) {
		this.down = down;
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
		return "Slope position: X "+ x + " Y " + y + "\nRight " + right + " Down " + down + "\nColisiones " + arboles;
	}

	public int getArboles() {
		return arboles;
	}

	public void setArboles(int arboles) {
		this.arboles = arboles;
	}
	
	public void sumArbol() {
		this.arboles++;
	}

	public boolean isPlaying() {
		return playing;
	}

	public void setPlaying(boolean playing) {
		this.playing = playing;
	}
	
}
