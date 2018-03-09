package test;

import PageFactory.*;
import Source.*;
import utility.*;
import org.testng.annotations.*;
import java.util.concurrent.TimeUnit;
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
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);	
	}

	@BeforeClass
	public void before() {
		String name=(String)(new Users()).getUsers()[0][0];
		String password=(String)(new Users()).getUsers()[0][1];
		driver=Drivers.getChromeDriver();
		objGeneral=new GeneralPage(driver);
		objMessenger = new MessengerPage(driver);
		objLogin=new LoginPage(driver); 

		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get(objLogin.getUrlPage());

		objLogin.toLoginPuchEnter(name, password);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		objGeneral.goToMessenger();
		driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
	}

	@AfterClass
	public void after() {
		objGeneral.toLogOut();
		driver.close();
		driver.quit();
	}
}