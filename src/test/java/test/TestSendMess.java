package test;

import PageFactory.*;
import utility.*;
import org.testng.annotations.*;
import org.apache.log4j.xml.DOMConfigurator;
import org.openqa.selenium.WebDriver;

public class TestSendMess {
	WebDriver driver;
	LoginPage objLogin;
	MessengerPage objMessenger;
	GeneralPage objGeneral;
	String message;
	Integer i=21;

	@Test (groups= {"Message"}, priority=220)
	public void testSendMessagePuchEnter() {
		message=RandomWord.engSentence(11);
		objMessenger.sendMessagePuchEnter(message);
	}

	@Test (groups= {"Message"}, priority=230)
	public void testSendMessageClickButton() {
		message=RandomWord.engSentence(12);
		objMessenger.sendMessageClickButton(message);	
	}
	
	@BeforeClass(groups= {"Message"})
	public void before() {
		DOMConfigurator.configure("log4j.xml");
		Log.startTestCases("Send Message");
		driver=MyDriver.getChromeDriver();
		
		objGeneral=new GeneralPage(driver);
		objMessenger = new MessengerPage(driver);
		objLogin=new LoginPage(driver); 
		
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToMessenger();		
	}
	
	@BeforeMethod (groups= {"Message"})
	public void beforeM() {
		i=i+1;
		System.out.println(i);
		Log.info("---------test case#"+i+"--------------");
	}

	@AfterClass(groups= {"Message"})
	public void after() {
		MyDriver.LogOutDriverExit(driver);
		Log.endTestCases("Send Message");
	}
	

}