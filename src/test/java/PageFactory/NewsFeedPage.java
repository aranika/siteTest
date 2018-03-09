package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import utility.TextareaFunctions;

public class NewsFeedPage {

	WebDriver driver;
	By textArea=By.cssSelector("div [class='_3eny']>div>div:nth-of-type(2)");
	By buttonPost=By.cssSelector("button span");

	public NewsFeedPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void postNews(String message) {
		driver.findElement(textArea).click();
		TextareaFunctions.writeText(message, driver, textArea);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.findElement(buttonPost).click();
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=nf";
	}
}
