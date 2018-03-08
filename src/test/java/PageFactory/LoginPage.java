package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
	WebDriver driver;
	By userName=By.id("email");
	By password=By.id("pass");
	By loginButton=By.id("loginbutton");
	
	public LoginPage(WebDriver driver) {
		this.driver=driver;
		PageFactory.initElements(driver, this);
	}

	public void setLog(String strLog) {
		driver.findElement(userName).sendKeys(strLog);
	}
	public void setPassword(String strPassword) {
		driver.findElement(password).sendKeys(strPassword);
	}
	public void clickLogin() {
		driver.findElement(loginButton).click();
	}
	
	public void toLoginClickButton(String strLog, String strPassword) {
		this.setLog(strLog);
		this.setPassword(strPassword);
		this.clickLogin(); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}
	
	public void toLoginPuchEnter(String strLog, String strPassword) {
		this.setLog(strLog);
		this.setPassword(strPassword);
		driver.findElement(password).sendKeys(Keys.ENTER); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public String getUrlPage() {
		return "https://www.facebook.com/";
	}
}