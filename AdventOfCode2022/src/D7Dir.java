import java.util.ArrayList;
import java.util.List;

public class D7Dir {
	
	private String name = "";
	private List<D7File> files = new ArrayList<D7File>();
	private List<D7Dir> dirs = new ArrayList<D7Dir>();
	private int size = 0;
	private D7Dir parent;
	
	public D7Dir(String name) {
		this.name = name;
	}
	
	public D7Dir(String name, D7Dir parent) {
		this.name = name;
		this.parent = parent;
	};
	
	public void addFile(D7File file) {
		this.files.add(file);
		this.size += file.getSize();
	}
	
	public void addDir(D7Dir dir) {
		this.dirs.add(dir);
	}
	
	public D7Dir(String name, List<D7File> files, List<D7Dir> dirs) {
		this.name = name;
		this.files = files;
		this.dirs = dirs;
	}
	/*
	 * Returns the size of the Dir
	 * Also, refreshes the size of said Dir in case it hadn't updated
	 */
	public int calculateSize() {
		int n = 0;
		
		//Esto nos devuelve el tamaño de cada archivo y lo suma
		for (D7File currFile : files) {
			n += currFile.getSize();
		}
		
		//Esto nos devuelve el tamaño de cada dir y lo suma
		for (D7Dir currDir : dirs) {
			n += currDir.calculateSize();
		}
		
		this.size = n;
		
		return n;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<D7File> getFiles() {
		return files;
	}
	public void setFiles(List<D7File> files) {
		this.files = files;
	}
	public List<D7Dir> getDirs() {
		return dirs;
	}
	public void setDirs(List<D7Dir> dirs) {
		this.dirs = dirs;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "El directorio es "+ name + " y tiene este tamaño: " + calculateSize();
	}

	public D7Dir getParent() {
		return parent;
	}

	public void setParent(D7Dir parent) {
		this.parent = parent;
	}
	
	
}
