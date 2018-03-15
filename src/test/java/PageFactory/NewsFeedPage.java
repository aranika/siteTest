package PageFactory;


import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
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
		Actions actions = new Actions(driver);
		actions.sendKeys(Keys.F5);
		String news=driver.findElement(newPost).getText();
		driver.findElement(optionPost).click();
		driver.findElement(deletePost).click();
		MyDriver.waitElement(driver, buttonDeletePost);
		driver.findElement(buttonDeletePost).click();
		actions.sendKeys(Keys.F5);
		Validation.deleteNews(driver, newPost, news);
	}

	public void postNewsClickButton(String message) {
		MyDriver.waitElement(driver, textArea);
		driver.findElement(textArea).click();
		TextareaFunctions.writeText(message, driver,textInput);
		driver.findElement(buttonPost).click();
		Validation.postNews(driver, textArea, newPost, message);
	}

	public void postNewsPushEnter(String message) {	
		MyDriver.waitElement(driver, textArea);
		driver.findElement(textArea).click();
		TextareaFunctions.writeText(message, driver,textInput);
		driver.findElement(textInput).sendKeys(Keys.chord(Keys.CONTROL, Keys.ENTER));
		Validation.postNews(driver, textArea, newPost, message);
	}

	public void findPostLink(String link) {	
		Actions actions = new Actions(driver);
		actions.sendKeys(Keys.F5);
		System.out.println(FindEl.findElByCssIsDisplayed("div>[href='"+link+"']", driver)+" for link: "+link);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/?sk=nf";
	}
}
