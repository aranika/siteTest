package utility;

import org.apache.log4j.Logger;

public class Log {
	private static Logger Log = Logger.getLogger(Log.class.getName());

	public static void startTestCase(String nameTestCase) {
		Log.info("****************************************************************");
		Log.info("$$$$$$$$$$                 "+nameTestCase+ "       $$$$$$$$$$$$$");
		Log.info("****************************************************************");
	}

	public static void endTestCase(String nameTestCase) {
		Log.info("XXXXXXX            -E---N---D- "+nameTestCase+"       XXXXXXXX");
		Log.info("X");
		Log.info("X");
	}

	public static void info(String message) {
		Log.info(message);
	}

	public static void warn(String message) {
		Log.warn(message);
	}

	public static void error(String message) {
		Log.error(message);
	}

	public static void fatal(String message) {
		Log.fatal(message);
	}

	public static void debug(String message) {
		Log.debug(message);
	}

}
