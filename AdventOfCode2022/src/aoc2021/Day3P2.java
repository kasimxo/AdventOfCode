package aoc2021;

import java.util.ArrayList;
import java.util.List;

import utilitiesAOC.BinaryOperations;
import utilitiesAOC.Input;

public class Day3P2 {

	public static void main(String[] args) {
		
		List<String> oxigen = Input.listaString(2021, 3);
		List<String> co2 = Input.listaString(2021, 3);
		List<String> limpieza = new ArrayList<String>();
		
		while(oxigen.size()>1) {
			
			//Vamos a hacer este loop hasta que solo quede un único elemento
			for (int i = 0; i<oxigen.get(0).length(); i++) {
				int cur = 0;
				int comun = 0;
				int uncomun = 0;
				int contador = 0;
				for (String string : oxigen) {
					//vamos a sacar el elemento mas común
					if(string.charAt(i)=='1') {
						cur++;
						if(i == 0)
						contador++;
					} else {
						cur--;
					}
					System.out.println(contador);
				}
				//Aquí, si el número mas común en la posición i es 1, ponemos 1
				if (cur>0) {
					comun = 1;
					
				} else if (cur==0) {
					comun = 1;
					uncomun = 0;
				} else {
					uncomun = 1;
				}
				
				
				
				System.out.print(comun+""+uncomun+"\n");
				for (int j = 0; j<oxigen.size(); j++) {
					if((""+oxigen.get(j).charAt(i)).compareTo(""+comun)!=0 ) {
						limpieza.add(oxigen.get(j));
					}
				}
				for (String string : limpieza) {
					oxigen.remove(string);
				}
				limpieza.clear();
				
				
			}
			
			
		}
		System.err.println(oxigen);
		
		//Vamos a ir quitando los elementos que no cumplan el criterio:
		//Primero tenemos que sacar el número mas común por cada posición
		
		

	}

}
