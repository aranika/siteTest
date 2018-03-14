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
	String message;

	@Test (groups= {"Message"}, priority=100)
	public void testSendMessagePuchEnter() {
		message=RandomWord.Sentence(11);
		objMessenger.sendMessagePuchEnter(message);
	}

	@Test (groups= {"Message"}, priority=20)
	public void testSendMessageClickButton() {
		message=RandomWord.Sentence(12);
		objMessenger.sendMessageClickButton(message);	
	}
	
	@BeforeClass(groups= {"Message"})
	public void before() {
		driver=MyDriver.getChromeDriver();
		
		objGeneral=new GeneralPage(driver);
		objMessenger = new MessengerPage(driver);
		objLogin=new LoginPage(driver); 
		
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToMessenger();		
	}

	@AfterClass(groups= {"Message"})
	public void after() {
		MyDriver.LogOutDriverExit(driver);
	}

}