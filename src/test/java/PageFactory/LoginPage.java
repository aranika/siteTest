package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;

import Source.*;
import utility.*;

public class LoginPage {
	WebDriver driver;
	By Email=By.id("email");
	By password=By.id("pass");
	By loginButton=By.id("loginbutton");

	public LoginPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void setLogPass(String strEmail, String strPassword) {
		TextareaFunctions.writeText(strEmail, driver, Email);
		Log.info("E-mail text box found and input text "+strEmail);
		TextareaFunctions.writeText(strPassword, driver, password);
		Log.info("Password text box found and input text "+ strPassword);
	}

	public void clickLogin() {
		driver.findElement(loginButton).click();
		Log.info("Button LogIn found and click");
	}

	public void toLoginClickButton(String strLog, String strPassword) {
		this.setLogPass(strLog,strPassword);
		this.clickLogin(); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public void toLoginPuchEnter(String strLog, String strPassword) {
		this.setLogPass(strLog, strPassword);
		driver.findElement(password).sendKeys(Keys.ENTER); 
		Log.info("Puch Enter");
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/";
	}

	public static void goToLoginPage(LoginPage objLogin, WebDriver webDriver) {
		webDriver.get(objLogin.getUrlPage());
		Log.info("Go To Login Page");
		webDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		Validation.pageURL(webDriver, objLogin.getUrlPage());

	}

	public static void logIn(LoginPage objLogin, WebDriver webDriver) {
		goToLoginPage(objLogin, webDriver);
		String strEmail=(String)(new Users()).getAuthorizedUsers()[0][0];
		String strPassword=(String)(new Users()).getAuthorizedUsers()[0][1];
		objLogin.toLoginPuchEnter(strEmail, strPassword);
	}
}