package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class GeneralPage {
	WebDriver driver;
	By minMessenger=By.cssSelector("[class='jewelButton _3eo8']");
	By messenger=By.cssSelector("[class='_4djt']");
	By userNavigationLabel=By.id("userNavigationLabel");
	By logOut=By.cssSelector("li[role='presentation']:nth-of-type(12)>a");
	By newsFeed=By.cssSelector("#navItem_4748854339>a>div");

	public GeneralPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=welcome";
	}

	public void goToMessenger() {
		driver.findElement(minMessenger).click();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.findElement(messenger).click();
	}

	public void goToNewsFeed() {
		driver.findElement(newsFeed).click();
	}

	public void goToUserLabel() {
		driver.findElement(userNavigationLabel).click();
	}
	public void toLogOut(){
		try {
			goToUserLabel();
			driver.findElement(logOut).click();
		}
		catch (Exception e) {
			// TODO: handle exception
		}

	}
}
