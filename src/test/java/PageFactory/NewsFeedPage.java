package PageFactory;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class NewsFeedPage {

	WebDriver driver;
	By messenger=By.cssSelector("#navItem_217974574879787>a>div");
	By newsFeed=By.cssSelector("#navItem_4748854339>a>div");
	
	public NewsFeedPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}



	public String getUrlPage() {
		return "https://www.facebook.com/?sk=nf";
	}
}
