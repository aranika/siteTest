package utility;

public class RandomWord {
	static String alphabet;
	static StringBuilder sb;

	public static String rus(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";//66
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String eng(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba";//52
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String sym(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "!@#$%^&*()_+|-=\\{}[]:\";'<>?,./";//32
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String all(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba1234567890абвгдеёжзийклмно"
				+ "прстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ[];',./-=`.!№;%:?)_";
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();		
	}

	public static String engSym(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba1234567890"
				+ "[];',./-=`.!№;%:?)_";
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();		
	}
	
	public static String engSentence(int length) {
		String s = " ";
		for(int i=0; i<length; i++) {
			s=s+ engSym(i)+" ";
		}
		return s+".";
	}
	public static String sentence(int length) {
		String s = " ";
		for(int i=0; i<length; i++) {
			s=s+ all(i)+" ";
		}
		return s+".";
	}
}