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
		if(this.linea.size()==0) {
			this.linea.add(new CoordD14(x,y));
		} else {
			untilNewCoord(x, y);
		}
	}
	
	public void untilNewCoord(int x, int y) {
		int prevX = this.linea.get(this.linea.size()-1).getX();
		int prevY = this.linea.get(this.linea.size()-1).getY();
		
		if(prevY==y) {
			if(prevX>x) {
				for(int i = x; i<=prevX; i++) {
					this.linea.add(new CoordD14(i,y));
				}
			} else {
				for(int i = prevX; i<=x; i++) {
					this.linea.add(new CoordD14(i,y));
				}
			}
		} else {
			if(prevY>y) {
				for(int i = y; i<=prevY; i++) {
					this.linea.add(new CoordD14(x,i));
				}
			} else {
				for(int i = prevY; i<=y; i++) {
					this.linea.add(new CoordD14(x,i));
				}
			}
		}
		
		
	}

	@Override
	public String toString() {
		return "Linea: " + linea;
	}
	
	
	
	
}
