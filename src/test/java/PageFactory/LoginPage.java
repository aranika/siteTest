package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;

import Source.*;
import utility.*;

public class LoginPage {
	WebDriver driver;
	By userName=By.id("email");
	By password=By.id("pass");
	By loginButton=By.id("loginbutton");
	
	public LoginPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void setLogPass(String strLog, String strPassword) {
		TextareaFunctions.writeText(strLog, driver, userName);
		TextareaFunctions.writeText(strPassword, driver, password);
		
	}

	public void clickLogin() {
		driver.findElement(loginButton).click();
	}
	
	public void toLoginClickButton(String strLog, String strPassword) {
		this.setLogPass(strLog,strPassword);
		this.clickLogin(); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}
	
	public void toLoginPuchEnter(String strLog, String strPassword) {
		this.setLogPass(strLog, strPassword);
		driver.findElement(password).sendKeys(Keys.ENTER); 
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/";
	}
	
	public static void goToLoginPage(LoginPage objLogin, WebDriver webDriver) {
		webDriver.get(objLogin.getUrlPage());
		webDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		Validation.pageURL(webDriver, objLogin.getUrlPage());
	}

	public static void logIn(LoginPage objLogin, WebDriver webDriver) {
		goToLoginPage(objLogin, webDriver);
		String nameU=(String)(new Users()).getUsers()[0][0];
		String passwordU=(String)(new Users()).getUsers()[0][1];
		objLogin.toLoginPuchEnter(nameU, passwordU);
	}
}