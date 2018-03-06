package utility;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Drivers {

	public static WebDriver getChromeDriver () {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		return driver;
	}
	public static void ChromeDriverExit (WebDriver driver) {
		driver.close();
		driver.quit();

	}
}
