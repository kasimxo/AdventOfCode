package aoc2022;
import utilitiesAOC.Input;
import java.util.ArrayList;
import java.util.Arrays;
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
	
	//Aquí la lista de actividad
	public static int[] actividad = {0,0,0,0,0,0,0,0};

	public static void main(String[] args) {
		
		List<String> input = Input.listaString("2022","11");
		
		listado.add(Monkey_0);
		listado.add(Monkey_1);
		listado.add(Monkey_2);
		listado.add(Monkey_3);
		listado.add(Monkey_4);
		listado.add(Monkey_5);
		listado.add(Monkey_6);
		listado.add(Monkey_7);
		
		carga(input);
		
		/* 
		 * En este punto los monitos ya tienen todos los objetos cargados. Falta una función que vaya haciendo cada ronda
		 */
		//Con esto simulamos las 20 rondas
		for (int ronda = 0; ronda<20; ronda++) {
			
			/*Primero hacemos la operación de cada mono
			 *Para ello cogemos cada objeto del mono
			 *y hacemos la operación para cada objeto
			 *ITERAMOS POR LA LISTA DE MONOS Y OBJETOS
			 */
			for (int mono = 0; mono<listado.size(); mono++) {
				
				int size = listado.get(mono).size();
				
				if (listado.get(mono).size()>0) {
					
					for (int objeto = 0; objeto<size; objeto++) {
						
						actividad[mono]++;
						
						
						long old = Long.parseLong(listado.get(mono).get(0));
						
						//Ahora que tenemos el valor antiguo, realizamos la operación.
						int linea = 7*mono + 2;
						String[] operacion = input.get(linea).split(" ");
						if (operacion[operacion.length-2].compareTo("+")==0) {
							old += Integer.parseInt(operacion[operacion.length-1]);
						} else {
							try {
								old *= Integer.parseInt(operacion[operacion.length-1]);
							} catch (Exception e) {
								System.err.println("Ops, hehe, mejor te multipico");
								old *= old;
							}
						}
						
						//Es muy importante en esta operación redondear hacia abajo
						old = Math.floorDiv(old, 3);
						//listado.get(mono).set(0, Integer.toString(old));
						
						//Aquí realizamos la comprobación de turno y lanzamos el objeto
						int lineaCheck = 7*mono + 3;
						String[] comprobacion = input.get(lineaCheck).split(" ");
						if (old%Integer.parseInt(comprobacion[comprobacion.length-1])==0) {
							//Aquí es lo que pasa si es true
							String[] ifTrue = input.get(lineaCheck+1).split(" ");
							listado.get(Integer.parseInt(ifTrue[ifTrue.length-1])).add(Long.toString(old));
						} else {
							//Aquí es lo que pasa si es false
							String[] ifFalse = input.get(lineaCheck+2).split(" ");
							listado.get(Integer.parseInt(ifFalse[ifFalse.length-1])).add(Long.toString(old));
						}
						listado.get(mono).remove(0);
						
						System.out.println(input.get(linea));
					}
				}
				System.out.println();
			}
			
			System.out.println();
			
		}
		
		System.out.println();
		for (int i = 0; i<actividad.length; i++) {
			System.out.println("Monkey " + i + " inspected items " + actividad[i] + " times");
		}
		Arrays.sort(actividad);
		System.out.println("The level of monkey business is: " + actividad[6]*actividad[7]);
		System.out.println();
		
		
		
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
			for (int j = 4; j<s.length; j++) {
				try {
					//Aquí tengo que limpiar s[j] de cualquier coma que tenga
					s[j] = s[j].replace(",", "");
					listado.get(i).add(s[j]);
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
