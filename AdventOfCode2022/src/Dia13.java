import java.util.List;

public class Dia13 {

	public static void main(String[] args) {

		List<String> input = Input.listaString("13");
		
		int rightOrder = 0;
		
		for (int i = 0; i<input.size(); i=i+3) {
			String izq = input.get(i);
			String derecha = input.get(i+1);
			
			//System.out.printf("%s izquierda \n %s derecha \n \n",izq,derecha);
		}
		
		System.out.println("La cantidad de pares en el orden correcto es: " + rightOrder);
		
	}

}
