package PageFactory;


import org.openqa.selenium.*;
import org.openqa.selenium.support.*;
import utility.Drivers;
import utility.TextareaFunctions;

public class NewsFeedPage {

	WebDriver driver;
	By textArea=By.cssSelector(" div.clearfix._ikh > div._4bl9");
	By textInput=By.cssSelector(" div._5rpb > div");
	By buttonPost=By.cssSelector("button span");

	public NewsFeedPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void postNewsClickButton(String message) {
		Drivers.waiter(driver, textArea);
		driver.findElement(textArea).click();
		TextareaFunctions.writeText(message, driver,textInput);
		driver.findElement(buttonPost).click();
		Drivers.waiter(driver, textArea);
	}

	public void postNewsPushEnter(String message) {	
		Drivers.waiter(driver, textArea);
		driver.findElement(textArea).click();
		TextareaFunctions.writeText(message, driver,textInput);
		driver.findElement(textInput).sendKeys(Keys.chord(Keys.CONTROL, Keys.ENTER));
		Drivers.waiter(driver, textArea);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=nf";
	}
}
