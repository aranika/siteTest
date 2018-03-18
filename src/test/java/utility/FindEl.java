package utility;

import java.util.*;
import java.util.NoSuchElementException;

import org.openqa.selenium.*;

public class FindEl {	

	public static boolean findElByCssIsDisplayed(String el, WebDriver driver) {
		try {
			driver.findElement(By.cssSelector(el)).isDisplayed();
			return true;
		} 	catch (NoSuchElementException e) {
			System.err.println(e);
			return false;
		}
	}

	public static boolean findElementIsDisplayed(By el, WebDriver driver) {
		try {
			driver.findElement(el).isDisplayed();
			return true;
		} 		catch (NoSuchElementException e) {
			System.err.println(e);
			return false;
		}
	}
	public static boolean findElByXPathIsDisplayed(String xpathExpression, WebDriver driver) {
		try {
			driver.findElement(By.xpath(xpathExpression)).isDisplayed();
			return true;
		} 		catch (NoSuchElementException e) {
			System.err.println(e);
			return false;
		}
	}

	public static WebElement getLastElement(String selector, WebDriver driver) {
		List<WebElement> list = driver.findElements(By.cssSelector(selector));
		int n=list.size();
		WebElement w=list.get(n-1);
		return w;
	}
	public static WebElement getLastElement(By selector, WebDriver driver) {
		List<WebElement> list = driver.findElements(selector);
		int n=list.size();
		WebElement w=list.get(n-1);
		return w;
	}
	

	public static String getAttribute(String attribute, By selector, WebDriver driver) {
		if(findElementIsDisplayed(selector, driver)) {
			WebElement el= (driver.findElement(selector));
			return el.getAttribute(attribute);
		}
		return "error";
	}
}
