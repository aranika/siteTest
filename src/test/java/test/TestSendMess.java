package test;

import PageFactory.*;
import utility.*;
import org.testng.annotations.*;
import org.openqa.selenium.WebDriver;

public class TestSendMess {
	WebDriver driver;
	LoginPage objLogin;
	MessengerPage objMessenger;
	GeneralPage objGeneral;

	@Test (groups= {"M"}, priority=100)
	public void testSendMessagePuchEnter() {
		String message=RandomWord.Sentence(11);
		objMessenger.sendMessagePuchEnter(message);
	}

	@Test (groups= {"M"}, priority=20)
	public void testSendMessageClickButton() {
		String message=RandomWord.Sentence(12);
		objMessenger.sendMessageClickButton(message);	
	}

	@BeforeClass
	public void before() {
		driver=Drivers.getChromeDriver();

		objGeneral=new GeneralPage(driver);
		objMessenger = new MessengerPage(driver);
		objLogin=new LoginPage(driver); 
		
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToMessenger();		
	}

	@AfterClass
	public void after() {
		Drivers.LogOutDriverExit(driver);
	}
}