package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import utility.TextareaFunctions;
import utility.Validation;

public class MessengerPage {
	WebDriver driver;
	By firstFriend=By.cssSelector("ul[aria-label*='Conv'] img:nth-of-type(1)");
	By textField=By.cssSelector("[class='_5rpb'] [aria-autocomplete='list']");
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

	public void clickSendButton() {
		driver.findElement(sendButton).click();
	}

	public void goToDialogFirstFrind() {
		this.clickFirstFriend();
		Validation.pageURL(driver, this.getUrlPage()+"anastasia.dunets");
	}

	public void sendMessageClickButton(String message) {
		this.clickTextField();
		TextareaFunctions.writeMessage("Button "+ message, driver, textField);
		this.clickSendButton();
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public void sendMessagePuchEnter(String message) {
		this.clickTextField();
		TextareaFunctions.writeMessage("Enter "+ message, driver, textField);
		driver.findElement(textField).sendKeys(Keys.ENTER); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/messages/t/";
	}
}