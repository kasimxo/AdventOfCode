import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Dia5Parte2 {

	public static void main(String[] args) {
		
		List<String>[] listas = new List[9];
		
		List<String> lista1 = new ArrayList<String>();
		List<String> lista2 = new ArrayList<String>();
		List<String> lista3 = new ArrayList<String>();
		List<String> lista4 = new ArrayList<String>();
		List<String> lista5 = new ArrayList<String>();
		List<String> lista6 = new ArrayList<String>();
		List<String> lista7 = new ArrayList<String>();
		List<String> lista8 = new ArrayList<String>();
		List<String> lista9 = new ArrayList<String>();

		listas[0] = lista1;
		listas[1] = lista2;
		listas[2] = lista3;
		listas[3] = lista4;
		listas[4] = lista5;
		listas[5] = lista6;
		listas[6] = lista7;
		listas[7] = lista8;
		listas[8] = lista9;
		
//	1	[F,C,J,P,H,T,W]
		lista1.add("F");
		lista1.add("C");
		lista1.add("J");
		lista1.add("P");
		lista1.add("H");
		lista1.add("T");
		lista1.add("W");
//	2	[G,R,V,F,Z,J,B,H]
		lista2.add("G");
		lista2.add("R");
		lista2.add("V");
		lista2.add("F");
		lista2.add("Z");
		lista2.add("J");
		lista2.add("B");
		lista2.add("H");
//	3	[H,P,T,R]
		lista3.add("H");
		lista3.add("P");
		lista3.add("T");
		lista3.add("R");
//	4	[Z,S,N,P,H,T]
		lista4.add("Z");
		lista4.add("S");
		lista4.add("N");
		lista4.add("P");
		lista4.add("H");
		lista4.add("T");
//	5	[N,V,F,Z,H,J,C,D]
		lista5.add("N");
		lista5.add("V");
		lista5.add("F");
		lista5.add("Z");
		lista5.add("H");
		lista5.add("J");
		lista5.add("C");
		lista5.add("D");
//	6	[P,M,G,F,W,D,Z]
		lista6.add("P");
		lista6.add("M");
		lista6.add("G");
		lista6.add("F");
		lista6.add("W");
		lista6.add("D");
		lista6.add("Z");
//	7	[M,V,Z,W,S,J,D,P]
		lista7.add("M");
		lista7.add("V");
		lista7.add("Z");
		lista7.add("W");
		lista7.add("S");
		lista7.add("J");
		lista7.add("D");
		lista7.add("P");
//	8	[N,D,S]
		lista8.add("N");
		lista8.add("D");
		lista8.add("S");
//	9	[D,Z,S,F,M]
		lista9.add("D");
		lista9.add("Z");
		lista9.add("S");
		lista9.add("F");
		lista9.add("M");
		
		String filename = "C:\\Users\\Andrés\\workspace\\AdventOfCode2022\\inputs\\5.txt";
		Path path = Paths.get(filename);
		
		try {
			
			List<String> input = Files.readAllLines(path);
			for (int x = 0; x<input.size(); x++) {
			
			for (int i = 0; i<listas.length; i++) {
				for (int j = 0; j<listas[i].size(); j++) {
					System.out.print(listas[i].get(j));
				}
				System.out.println();
				
			}
			System.out.println();
			
				
				String[] s = input.get(x).split(" ");
				int indexOrigen = Integer.parseInt(s[3]) - 1;
				int ultimo = listas[indexOrigen].size() - Integer.parseInt(s[1]) ;
				
				
				for (int a = 0; a<Integer.parseInt(s[1]); a++) {
					
					
					
					
					int indexDestino = Integer.parseInt(s[5]) - 1;
					String aux = "" + listas[indexOrigen].get(ultimo);
					listas[indexOrigen].remove(ultimo);
					listas[indexDestino].add(aux);
					//ultimo++;
				}
			}
			
				for (int i = 0; i<listas.length; i++) {
					for (int j = 0; j<listas[i].size(); j++) {
						System.out.print(listas[i].get(j));
					}
					System.out.println();
				}
			
			
		} catch (Exception e) {
			System.err.println("La cagaste sur");
		}
		
		for (int i = 0; i<listas.length; i++) {
			for (int j = 0; j<listas[i].size(); j++) {
				System.out.print(listas[i].get(j));
			}
			System.out.println();
		}
		
		for (int i = 0; i<listas.length; i++) {
			try {
			if (listas[i].get(listas[i].size()-1)!=null) {
				System.err.print(listas[i].get(listas[i].size()-1));
			} else {
				System.out.println();
			}
			} catch (Exception e) {
				System.out.println();
			}
		}
		
	}

}