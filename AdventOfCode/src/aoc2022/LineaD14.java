package aoc2022;

import java.util.ArrayList;
import java.util.List;

public class LineaD14 {
	
	private List<CoordD14> linea;

	public LineaD14() {
		
		this.setLinea(new ArrayList<CoordD14>());
	}

	public List<CoordD14> getLinea() {
		return linea;
	}

	public void setLinea(List<CoordD14> linea) {
		this.linea = linea;
	}
	
	public void addCoord(int x, int y) {
		this.linea.add(new CoordD14(x,y));
	}

	@Override
	public String toString() {
		return "Linea: " + linea;
	}
	
	
	
	
}
