package utility;


import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.remote.*;
import org.openqa.selenium.support.ui.*;

import PageFactory.GeneralPage;

public class MyDriver {

	public static WebDriver getChromeDriver () {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("user-data-dir=/Profile");
		ChromeDriver driver = new ChromeDriver(options);
		Log.info("Get new Driver");
		return driver;
	}

	public static void LogOutDriverExit (WebDriver driver) {
		(new GeneralPage(driver)).toLogOut();
		driver.close();
		driver.quit();
		Log.info("Close and quit Driver");
	}

	public static void waitElement(WebDriver driver, By textArea) {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability(CapabilityType.PAGE_LOAD_STRATEGY, "eager");
		WebDriverWait wait = new WebDriverWait(driver, 100);
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(textArea));
			wait.until(ExpectedConditions.elementToBeClickable(textArea));	
		} catch (Exception e) {
			Log.error(e+" for textArea");
		} 
	}

	public static void waitText(WebDriver driver, By newPost, String value) {
		boolean x;
		try {
			x= (new WebDriverWait(driver, 10)).until(ExpectedConditions.textToBePresentInElementLocated(newPost, value));
		} catch (Exception e) {
			x=false;
		}
		Log.info("Result for waitText is "+x+" for <"+value+">");
	}

	public static void waitText(WebDriver driver,WebElement webElement, String value) {
		boolean x;
		try {
			x= (new WebDriverWait(driver, 10)).until(ExpectedConditions.textToBePresentInElement(webElement, value));
		} catch (Exception e) {
			x=false;
		}
		Log.info("Result for waitText is "+x+" for <"+value+">");
	}

	public static void waiter(WebDriver driver, By textArea, By newPost, String value) {
		waitElement(driver, textArea);
		waitText(driver, newPost, value);
	}

	public static void waiter(WebDriver driver, By textArea, WebElement webElement, String value) {
		waitElement(driver, textArea);
		waitText(driver, webElement, value);
	}
}
