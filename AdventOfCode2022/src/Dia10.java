import java.util.List;

public class Dia10 {

	public static void main(String[] args) {
		List<String> input = Input.listaString("10");
		System.out.println(input.get(0));
		int ciclo = 0;
		int x = 1;
		int solution = 0;
		
		for (String s : input) {
			boolean emit = false;
			int outX = 0;
			int outCiclo = 0;
			if (s.compareTo("noop")==0) {
				ciclo++;
				if (ciclo==20 || (ciclo-20)%40==0) {
					emit = true;
					outCiclo = ciclo;
					outX = x;
				}
			} else {
				String[] in = s.split(" ");
				int value = Integer.parseInt(in[1]);
				ciclo ++;
				if (ciclo==20 || (ciclo-20)%40==0) {
					emit = true;
					outCiclo = ciclo;
					outX = x;
				}
				ciclo ++;
				if (ciclo==20 || (ciclo-20)%40==0) {
					emit = true;
					outCiclo = ciclo;
					outX = x;
				}
				x += value;
			}
			if (emit) {
				System.out.println("Estamos en el ciclo " + outCiclo + " con signal strength " + outX*outCiclo);
				solution += outX*outCiclo;
			}
		}
		System.out.println(solution);
	}

}
