package test;

import org.testng.annotations.*;
import PageFactory.*;
import Source.*;
import utility.*;

import org.apache.bcel.generic.LALOAD;
import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;
import org.openqa.selenium.*;


public class TestLogIn {
	WebDriver driver;
	LoginPage objLogin;

	private static Logger Log = Logger.getLogger(TestLogIn.class.getName());
	
	@DataProvider(name="dp")
	public static Object[][] testData() {
		Object[][] s=(new Users()).getShortListUsers();
		return s;
	}

	@Test (groups= {"LogIn"}, dataProvider = "dp", priority=20)
	@Parameters(value= {"name","password"})
	public void testLoginClickButton(String name, String password) {
		objLogin.toLoginClickButton(name, password); 
		Validation.logIn(driver, name, password);		
	}

	@Test (groups= {"LogIn"}, dataProvider = "dp", priority=10)
	@Parameters(value= {"name","password"})
	public void testLoginPuchEnter(String name, String password) {
		objLogin.toLoginPuchEnter(name, password); 
		Validation.logIn(driver, name, password);	
	}

	@BeforeMethod(groups= {"LogIn"})
	public void before() {
		driver=MyDriver.getChromeDriver();
		Log.info("Get new Driver");
		objLogin=new LoginPage(driver);
		LoginPage.goToLoginPage(objLogin, driver);
	}
	
	@BeforeClass(groups= {"LogIn"})
	public void beforeClass() {
		DOMConfigurator.configure("log4j.xml");
	}

	@AfterMethod(groups= {"LogIn"})
	public void after() {
		MyDriver.LogOutDriverExit(driver);
	}
}