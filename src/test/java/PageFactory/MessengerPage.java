package PageFactory;


import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;

import utility.*;

public class MessengerPage {
	WebDriver driver;
	By firstFriend=By.cssSelector("ul[aria-label*='Conv'] img:nth-of-type(1)");
	By textField=By.cssSelector("[class='_5rpb'] [aria-autocomplete='list']");
	By sendedMessage=By.cssSelector("div[class=_aok] > span");
	By sendButton = By.cssSelector("div[class='_4rv4']>a");
	By statusIcon=By.cssSelector("[class*='_2her']");

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

	public void clickSendButton() {
		driver.findElement(sendButton).click();
	}

	public void goToDialogFirstFrind() {
		this.clickFirstFriend();
		Validation.pageURL(driver, this.getUrlPage()+"anastasia.dunets");
	}

	public void sendMessageClickButton(String message) {
		this.clickTextField();
		message = "Button "+ message;
		TextareaFunctions.writeText(message, driver, textField);
		this.clickSendButton();
		Validation.sendMessage(driver, FindEl.getLastElement(sendedMessage, driver), message,statusIcon);
	}

	public void sendMessagePuchEnter(String message) {
		this.clickTextField();
		message="Enter "+ message;
		TextareaFunctions.writeText(message, driver, textField);
		driver.findElement(textField).sendKeys(Keys.ENTER); 
		Validation.sendMessage(driver, FindEl.getLastElement(sendedMessage, driver), message,statusIcon);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/messages/t/";
	}
}