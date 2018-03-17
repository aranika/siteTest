package utility;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;

import PageFactory.*;

public class Validation {

	public static boolean pageURL(WebDriver driver, String URL) {
		String currentUrl=driver.getCurrentUrl().toString();
		if (!currentUrl.equals(URL)) {
			System.out.println("wrong page "+URL);
			Log.error("Wrong page. Current Url-<"+currentUrl+">, expected URL -<"+URL+">");
			return false;
		}
		Log.info("Correct  page "+URL);
		return true;
	}

	public static boolean pageByCss(WebDriver driver, String el) {
		if (!(FindEl.findElByCssIsDisplayed(el, driver)))
		{
			System.out.println("wrong page");
			Log.error("Wrong page.");
			return false;
		}
		Log.info("Correct  page.");
		return true;
	}

	public boolean pageByXPath(WebDriver driver, String el) {
		if (!(FindEl.findElByXPathIsDisplayed(el, driver)))
		{
			Log.error("Wrong page.");
			System.out.println("wrong page");
			return false;
		}
		Log.info("Correct  page.");
		return true;
	}
	public static void logIn(WebDriver driver, String name, String password) {
		try {
			(new WebDriverWait(driver, 10)).until(ExpectedConditions.presenceOfElementLocated(By.id("userNav")));
			Log.info("Ok for log: "+name +", pass: "+password);
		} catch (Exception e) {
			Log.info("Fail for log: "+name +", pass: "+password);
		}
		Validation.pageURL(driver, (new GeneralPage(driver).getUrlPage()));		
	}

	public static void sendMessage(WebDriver driver, WebElement webElement, String message, By selectorIcon) {
		MyDriver.waitText(driver, webElement, message);
		boolean sentIcon=FindEl.getAttribute("title", selectorIcon, driver).equals("Sent");
		if(webElement.isDisplayed()&&sentIcon) {
			Log.info("Successful send message: "+message);
		}
		else Log.error("Fail for send message: "+message);
	}

	public static void postNews(WebDriver driver, By textArea, By newPost, String news) {
		MyDriver.waiter(driver, textArea, newPost, news);
		if(driver.findElement(newPost).isDisplayed()) {
			Log.info("Successful post news: "+news);
		}
		else Log.error("Fail for post news: "+news);
	}
	public static void deleteNews(WebDriver driver, By newsForDelete, String textNewsForDelete) {
		boolean b;
		String texLasttNews="";
		try {
			texLasttNews= driver.findElement(newsForDelete).getText();
		} catch (Exception e) {
			Log.error(e.toString());
		}
		b=(texLasttNews.equals(textNewsForDelete));
		Log.info(b+" for delete last news");
	}
}
