package utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import PageFactory.GeneralPage;

public class Validation {

	public static boolean pageURL(WebDriver driver, String URL) {
		if (!driver.getCurrentUrl().toString().equals(URL)) {
			System.out.println("wrong page "+URL);
			return false;
		}
		return true;
	}

	public static boolean pageByCss(WebDriver driver, String el) {
		if (!(FindEl.FindElByCss(el, driver)))
		{
			System.out.println("wrong page");
//			driver.close();
			return false;
		}
		return true;
	}

	public boolean pageByXPath(WebDriver driver, String el) {
		if (!(FindEl.FindElByXPath(el, driver)))
		{
			System.out.println("wrong page");
//			driver.close();
			return false;
		}
		return true;
	}

	public static boolean Email(String actual) {
		final Pattern pattern = Pattern.compile("^[A-Za-z0-9.%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,4}");
		final Matcher matcher = pattern.matcher(actual);
		return matcher.find();
	}

	public static boolean phone(String actual) {
		final Pattern pattern = Pattern.compile("^[8]+\\-[0-9]{3}+\\-[0-9]{7}$");
		final Matcher matcher = pattern.matcher(actual);
		return matcher.find();

	}

	private static final DateFormat DATE_FORMAT = new SimpleDateFormat("dd.MM.yyyy");

	static{
		DATE_FORMAT.setLenient(true);
	}
	public static boolean validationDate(String actual) {
		try {
			return DATE_FORMAT.format(DATE_FORMAT.parse(actual)).equals(actual);
		}catch (ParseException ex){
			return false;
		}
	}

	public static void logIn(WebDriver driver, String name, String password) {
		try {
			(new WebDriverWait(driver, 10)).until(ExpectedConditions.presenceOfElementLocated(By.id("userNav")));
			System.out.println("Ok for log: "+name +", pass: "+password);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("fail for log: "+name +", pass: "+password);
		}
		(new Validation()).pageURL(driver, (new GeneralPage(driver).getUrlPage()));		

	}
}
