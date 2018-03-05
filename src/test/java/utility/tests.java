package utility;

import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.SimpleFormatter;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

public class tests {
	
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		((RemoteWebDriver) driver).setLogLevel(Level.SEVERE);
		try {			
			FileHandler fh = new FileHandler("log.txt");
			fh.setFormatter(new SimpleFormatter());
			java.util.logging.Logger.getLogger(
					RemoteWebDriver.class.getName()).addHandler(fh);			
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		driver.get("http://google.ru");
//		driver.close();
//		driver.quit();
	}

}
