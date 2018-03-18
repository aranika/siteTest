package PageFactory;

import org.openqa.selenium.*;
import org.openqa.selenium.support.*;
import utility.*;

public class NewsFeedPage {

	WebDriver driver;
	By textArea=By.cssSelector(" div.clearfix._ikh > div._4bl9");
	By textInput=By.cssSelector(" div._5rpb > div");
	By buttonPost=By.cssSelector("button span");
	By newPost=By.cssSelector("div p");
	By deletePost=By.cssSelector(" div[class*='uiContextualLayerBelowRight']  ul > li:nth-child(2)");
	By optionPost=By.cssSelector("a[aria-label='Story options']");
	By buttonDeletePost = By.cssSelector("form[rel='async']>div>button[value='1']");

	public NewsFeedPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void deleteLastNews() {
//		driver.navigate().refresh();
		String news=driver.findElement(newPost).getText();
		driver.findElement(optionPost).click();
		driver.findElement(deletePost).click();
		MyDriver.waitElement(driver, buttonDeletePost);
		driver.findElement(buttonDeletePost).click();
		MyDriver.waitElement(driver, textArea);
		driver.navigate().refresh();
		MyDriver.waitElement(driver, textArea);
		Validation.deleteNews(driver, newPost, news);

	}

	public void postNewsClickButton(String message) {
		MyDriver.waitElement(driver, textArea);
		driver.findElement(textArea).click();
		Log.info("Find and Click TextArea");
		TextareaFunctions.writeText(message, driver,textInput);
		Log.info("Write news <"+message+">");
		driver.findElement(buttonPost).click();
		Log.info("Click Post Button");
		Validation.postNews(driver, textArea, newPost, message);
	}

	public void postNewsPushEnter(String message){	
		MyDriver.waitElement(driver, textArea);
		driver.findElement(textArea).click();
		Log.info("Find and Click TextArea");
		TextareaFunctions.writeText(message, driver,textInput);
		Log.info("Write news <"+message+">");
		driver.findElement(textInput).sendKeys(Keys.chord(Keys.CONTROL, Keys.ENTER));
		Log.info("Push <CTRL>+<Enter>");
		Validation.postNews(driver, textArea, newPost, message);
	}

	public void findPostLink(String link) {	 
		MyDriver.waitElement(driver, textArea);
		try {
			FindEl.findElByCssIsDisplayed("div>[href='"+link+"']", driver);
			Log.info("Link <"+link+"> is Displayed");
		} catch (Exception e) {
			Log.error("Link <"+link+"> is not Displayed");
			System.out.println("div>[href='"+link+"']");
		}
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=nf";
	}
}
