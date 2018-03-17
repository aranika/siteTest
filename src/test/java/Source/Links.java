package Source;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Links {
	public static String[] getLink() {
		Scanner scanner = null;
		try {
			scanner = new Scanner(new File("links.txt"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		String line = scanner.nextLine();
		String[] fileText = line.split(",");		    
		int i= (int) (10*(Math.random()));
		String[]link={fileText[i]};    
		return link;
	}
}
