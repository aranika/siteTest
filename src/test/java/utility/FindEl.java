package utility;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class FindEl {	

	public static boolean FindElByCss(String el, WebDriver driver) {
		try {
			driver.findElement(By.cssSelector(el)).isDisplayed();
			return true;
		} 
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.err.println(e);
			return false;
		}
	}

	public static boolean FindElByXPath(String xpathExpression, WebDriver driver) {
		try {
			driver.findElement(By.xpath(xpathExpression)).isDisplayed();
			return true;
		} 
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.err.println(e);
			return false;
		}
	}

	public static String getValueByCss(String selector, WebDriver driver) {
	
		
		if(FindElByCss(selector, driver)) {
			WebElement el= (driver.findElement(By.cssSelector(selector)));
//			System.out.println(el);
			return el.getAttribute("value");
		}
		return "error";
	}

	public static String getValueByXPath(String xpathExpression, WebDriver driver) {
		WebElement el=(driver.findElement(By.xpath(xpathExpression)));
		if(FindElByXPath(xpathExpression, driver)) {
			return el.getAttribute("value");
		}
		return "";
	}
}
