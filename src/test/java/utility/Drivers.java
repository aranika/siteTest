package utility;


import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.remote.*;
import org.openqa.selenium.support.ui.*;

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

	public static void waiter(WebDriver driver, By textArea) {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability(CapabilityType.PAGE_LOAD_STRATEGY, "eager");
		WebDriverWait wait = new WebDriverWait(driver, 100);
		wait.until(ExpectedConditions.presenceOfElementLocated(textArea));
		wait.until(ExpectedConditions.elementToBeClickable(textArea));
		
	}
}
