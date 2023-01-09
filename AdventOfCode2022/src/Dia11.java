import java.util.ArrayList;
import java.util.List;

public class Dia11 {
	
	//En la lista de cada monito tenemos cada objeto con su worry level
	public static	List<String> Monkey_0 = new ArrayList<String>(); 
	public static	List<String> Monkey_1 = new ArrayList<String>(); 
	public static	List<String> Monkey_2 = new ArrayList<String>(); 
	public static	List<String> Monkey_3 = new ArrayList<String>(); 
	public static	List<String> Monkey_4 = new ArrayList<String>(); 
	public static	List<String> Monkey_5 = new ArrayList<String>(); 
	public static	List<String> Monkey_6 = new ArrayList<String>(); 
	public static	List<String> Monkey_7 = new ArrayList<String>(); 
	public static	List<List<String>> listado = new ArrayList<>();	

	public static void main(String[] args) {
		
		List<String> input = Input.listaString("11");
		listado.add(Monkey_0);
		listado.add(Monkey_1);
		listado.add(Monkey_2);
		listado.add(Monkey_3);
		listado.add(Monkey_4);
		listado.add(Monkey_5);
		listado.add(Monkey_6);
		listado.add(Monkey_7);
		carga(input);
		
	}
	
	
	
	/* 
	 * Con este método leemos la lista y cargamos todos los objetos en los monitos
	 */
	private static void carga(List<String> input) {
		int index = 1;
		int mono = 0;
		for (int i = 0; i<=8; i++) {
			System.out.println(input.get(index));
			String[] s = input.get(index).split(" ");
			for (int j = 2; 2<s.length; j++) {
				try {
					listado.get(mono).add(s[j]);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			index += 7;
			if (index>input.size()) 
				break;
		}
	}

}
