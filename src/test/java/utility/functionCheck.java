package utility;
import java.sql.Driver;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.service.DriverService;

import com.sun.jna.platform.win32.WinNT.LOGICAL_PROCESSOR_RELATIONSHIP;

import PageFactory.*;


public class functionCheck {
	

	public static void main(String[] args){
		// TODO Auto-generated method stub
		WebDriver driver = Drivers.getChromeDriver();
		LoginPage loginPage=new LoginPage(driver);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get(loginPage.getUrlPage());
		Validation.pageURL(driver, loginPage.getUrlPage());
		String strLog="nastya.d.1991@inbox.ru";
		String strPassword="test1234";
		loginPage.toLoginClickButton(strLog, strPassword);
//		loginPage.toLoginPuchEnter(strLog, strPassword);
		Validation.pageURL(driver, "https://www.facebook.com/?sk=welcome");
String s="https://www.facebook.com/?sk=welcome";
		System.out.print("ok "+ s.equals("https://www.facebook.com/?sk=welcome")
		
				+" ")		;
	}

}