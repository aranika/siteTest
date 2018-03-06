package PageFactory;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.SendKeysAction;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
	WebDriver driver;
	By userName=By.id("email");
	By password=By.id("pass");
	By login=By.id("loginbutton");
	
	public LoginPage(WebDriver driver) {
		// TODO Auto-generated constructor stub
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
		driver.findElement(login).click();
	}
	
	public void toLoginClickOk(String strLog, String strPassword) {
		this.setLog(strLog);
		this.setPassword(strPassword);
		this.clickLogin(); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}
	
	public void toLoginPuchEnter(String strLog, String strPassword) {
		this.setLog(strLog);
		this.setPassword(strPassword);
		Actions action = new Actions(driver); 
		action.sendKeys(Keys.ENTER); 
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public String getUrlLoginPage() {
		// TODO Auto-generated method stub
		return "https://www.facebook.com/";
	}
}