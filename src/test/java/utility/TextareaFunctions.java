package utility;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class TextareaFunctions {

	public static void clear(WebElement e) {
		e.click();
		e.sendKeys(Keys.chord(Keys.CONTROL, Keys.HOME));
		e.sendKeys(Keys.chord(Keys.CONTROL, Keys.SHIFT, Keys.END));
		e.sendKeys("");
	}
	
	public static void writeMessage(String message, WebDriver driver, By textField) {
		TextareaFunctions.clear(driver.findElement(textField));
		driver.findElement(textField).sendKeys(message);	
	}
}
