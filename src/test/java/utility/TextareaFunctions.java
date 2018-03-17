package utility;

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.*;

public class TextareaFunctions {

	public static void clear(WebElement textField) {
		textField.click();
		textField.sendKeys(Keys.chord(Keys.CONTROL, Keys.HOME));
		textField.sendKeys(Keys.chord(Keys.CONTROL, Keys.SHIFT, Keys.END));
		textField.sendKeys("");
	}

	public static void writeText(String message, WebDriver driver, By textField) {
		TextareaFunctions.clear(driver.findElement(textField));
		driver.findElement(textField).sendKeys(message);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}
}
