package PageFactory;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class PageAfterLogin {
	WebDriver driver;
	By minMessenger=By.cssSelector("[class='jewelButton _3eo8']");
	By messenger=By.cssSelector("#navItem_217974574879787 > a > div");//[class='_4djt']");
	
	By newsFeed=By.cssSelector("#navItem_4748854339>a>div");

	public PageAfterLogin(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=welcome";
	}

	public void goToMessenger() {
//		driver.findElement(minMessenger).click();
		driver.findElement(messenger).click();
	}
	
	public void goToNewsFeed() {
		driver.findElement(newsFeed).click();
	}
}
