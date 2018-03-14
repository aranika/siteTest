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
			System.out.println("Ok for log: "+name +", pass: "+password);
			Log.info("Ok for log: "+name +", pass: "+password);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("fail for log: "+name +", pass: "+password);
			Log.error("Fail for log: "+name +", pass: "+password);
		}
		Validation.pageURL(driver, (new GeneralPage(driver).getUrlPage()));		
	}

	public static void sendMessage(WebDriver driver, WebElement webElement, String message, By selectorIcon) {
		MyDriver.waitText(driver, webElement, message);
		boolean sentIcon=FindEl.getAttribute("title", selectorIcon, driver).equals("Sent");
		if(webElement.isDisplayed()&&sentIcon) {
			System.out.println("Successful send message: "+message);
		}
		else System.out.println("ERROR! Message: "+message);
	}

	public static void postNews(WebDriver driver, By textArea, By newPost, String news) {
		MyDriver.waiter(driver, textArea, newPost, news);
		if(driver.findElement(newPost).isDisplayed()) {
			System.out.println("Successful post news: "+news);
		}
		else	System.out.println("ERROR! News: "+news);
	}
	public static void deleteNews(WebDriver driver, By newsForDelete, String textNewsForDelete) {
		boolean b;
		String texLasttNews="";
		try {
			texLasttNews= driver.findElement(newsForDelete).getText();
		} catch (Exception e) {
			System.err.println(e);
		}
		b=(texLasttNews.equals(textNewsForDelete));
		System.out.println(b+" for delete last news");
	}
}
