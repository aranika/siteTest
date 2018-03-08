package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import utility.Validation;

public class MessengerPage {
	WebDriver driver;
	By firstFriend=By.cssSelector("ul[aria-label*='Conv'] img:nth-of-type(1)");
	By textField=By.cssSelector("[class='_3-8x _3oh-']");
	By sendButton = By.cssSelector("div[class='_4rv4']>a");

	public MessengerPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void clickTextField() {
		driver.findElement(textField).click();
	}

	public void clickFirstFriend() {
		driver.findElement(firstFriend).click();
	}

	public void writeMessage(String message) {
		driver.findElement(textField).sendKeys(message);	
	}


	public void clickSendButton() {
		driver.findElement(sendButton).click();
	}

	public void sendMessageClickButton(String message) {
		Validation.pageURL(driver, this.getUrlPage()+"anastasia.dunets");
		this.clickFirstFriend();
		this.clickTextField();
		this.writeMessage(message);
		 this.clickSendButton();
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public void sendMessagePuchEnter(String message) {
		Validation.pageURL(driver, this.getUrlPage()+"anastasia.dunets");
		this.clickFirstFriend();
		this.clickTextField();
		this.writeMessage(message);
		driver.findElement(textField).sendKeys(Keys.ENTER); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/messages/t/";
	}
}