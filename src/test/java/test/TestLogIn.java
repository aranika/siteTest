package test;

import org.testng.annotations.*;
import PageFactory.*;
import Source.*;
import utility.*;
import java.util.concurrent.*;
import org.openqa.selenium.*;


public class TestLogIn {
	WebDriver driver;
	LoginPage objLogin;

	@DataProvider(name="dp")
	public static Object[][] testData() {
		Object[][] s=(new Users()).getShortListUsers();
		return s;
	}


	@Test (groups= {"L"}, dataProvider = "dp", priority=20)
	@Parameters(value= {"name","password"})
	public void testLoginClickButton(String name, String password) {
		objLogin.toLoginClickButton(name, password); 
		Validation.logIn(driver, name, password);		
	}

	@Test (groups= {"L"}, dataProvider = "dp", priority=10)
	@Parameters(value= {"name","password"})
	public void testLoginPuchEnter(String name, String password) {
		objLogin.toLoginPuchEnter(name, password); 
		Validation.logIn(driver, name, password);	
	}

	@BeforeMethod
	public void before() {
		driver=Drivers.getChromeDriver();
		objLogin=new LoginPage(driver);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get(objLogin.getUrlPage());
		Validation.pageURL(driver, objLogin.getUrlPage());
	
	}

		@AfterMethod
		public void after() {
			(new GeneralPage(driver)).toLogOut();
			
			driver.close();
			driver.quit();
		}
}
