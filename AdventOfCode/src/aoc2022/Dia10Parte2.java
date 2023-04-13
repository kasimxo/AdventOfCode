package aoc2022;
import utilitiesAOC.Input;
import java.util.ArrayList;
import java.util.List;

public class Dia10Parte2 {

	public static void main(String[] args) {
		List<String> input = Input.listaString("2022","10");
		//Esta lista de ciclos va a tener la posición x en TODOS los ciclos
		List<Integer> ciclos = new ArrayList<Integer>();
		
		int ciclo = 0;
		int x = 1;
		int solution = 0;
		int filaPixel = 0;
		int columnaPixel = 0;
		
		int index = 0;
		System.out.println(ciclos.size());
		for (String s : input) {
			
			boolean emit = false;
			int outX = 0;
			int outCiclo = 0;
			if (s.compareTo("noop")==0) {
				if (ciclos.size()>0) {
					ciclos.add(x);
				} else {
					ciclos.add(1);
				}
				ciclo++;
				
			} else {
				String[] in = s.split(" ");
				int value = Integer.parseInt(in[1]);
				ciclo ++;
				ciclos.add(x);
				ciclo ++;
				ciclos.add(x);
				x += value;
			}
		}
		
		System.out.println();
		
		//Dibujamos la pantalla
		for (int fila = 0; fila<6; fila++) {
			for (int columna = 0; columna<40; columna++) {
				int cicloPosition = ciclos.get(index);
				
				if (columna - cicloPosition <= 1 && columna - cicloPosition >= -1) {
					System.out.print("#");
				} else {
					System.out.print(".");
				}
				
				index++;
			}
			System.out.println();
		}
		
	}

}