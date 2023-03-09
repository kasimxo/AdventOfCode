package aoc2022;
import utilitiesAOC.Input;
import java.util.List;

public class Dia13 {

	public static void main(String[] args) {

		List<String> input = Input.listaString("2022","13");
		
		//La solución no es la cantidad de pares en el orden correcto, si no la suman de los índices de los pares correctos
		int rightOrder = 0;
		
		for (int i = 0; i<input.size(); i=i+3) {
			String izq = input.get(i);
			String derecha = input.get(i+1);
			
			if(ordenCorrecto(izq,derecha)) {
				rightOrder += i;
			}
		}
		
		System.out.println("La suma de los índices de los pares en el orden correcto es: " + rightOrder);
		
	}

	private static boolean ordenCorrecto(String izq, String derecha) {
		
		int maxlength = izq.length();
		if (derecha.length()>izq.length()) {
			maxlength = derecha.length();
		}
		
		for (int i = 0; i<maxlength; i++) {
			char izqChar = izq.charAt(i);
			char dchChar = derecha.charAt(i);
			
			if(izqChar!=',' && izqChar!='[' && izqChar!=']' && dchChar!=',' && dchChar!='[' && dchChar!=']' && izqChar>dchChar) {
				return false;
			}
		}
		
		
		return true;
	}

}
