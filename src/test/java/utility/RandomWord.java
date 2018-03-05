package utility;

public class RandomWord {
	static String alphabet;
	static StringBuilder sb;

	public static String Rus(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";//66
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String Eng(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba";//52
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String Sym(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "!@#$%^&*()_+|-=\\{}[]:\";'<>?,./";//32
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

	public static String All(int length) {
		sb = new StringBuilder(Math.max(length, 16));
		alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba1234567890абвгдеёжзийклмно"
				+ "прстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ[];',./-=`.!№;%:?)_";//32
		for (int i = 0; i < length; i++) { 
			int random = (int) (alphabet.length()*(Math.random()));
			char c = alphabet.charAt(random);
			sb.append(c);
		}
		return sb.toString();
	}

}