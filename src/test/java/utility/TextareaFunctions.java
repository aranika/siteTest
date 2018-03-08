package utility;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

public class TextareaFunctions {

	public static void clear(WebElement e) {
		e.click();
		e.sendKeys(Keys.chord(Keys.CONTROL, Keys.HOME));
		e.sendKeys(Keys.chord(Keys.CONTROL, Keys.SHIFT, Keys.END));
		e.sendKeys("");
	}
	
}
