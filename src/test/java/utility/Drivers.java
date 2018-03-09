package utility;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.*;

import PageFactory.GeneralPage;

public class Drivers {

	public static WebDriver getChromeDriver () {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("user-data-dir=/Profile");
		ChromeDriver driver = new ChromeDriver(options);
		return driver;
	}
	public static void LogOutDriverExit (WebDriver driver) {
		(new GeneralPage(driver)).toLogOut();
		driver.close();
		driver.quit();
	}
}
