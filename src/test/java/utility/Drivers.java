package utility;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.*;

public class Drivers {

	public static WebDriver getChromeDriver () {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("user-data-dir=/Profile");
		ChromeDriver driver = new ChromeDriver(options);
		return driver;
	}
	public static void ChromeDriverExit (WebDriver driver) {
		driver.close();
		driver.quit();

	}
}
