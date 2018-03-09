package test;

import org.testng.annotations.Test;

import PageFactory.*;
import utility.*;
import org.testng.annotations.*;
import org.openqa.selenium.*;

public class TestPostNews {
	WebDriver driver;
	LoginPage objLogin;
	NewsFeedPage objNewsFeed;
	GeneralPage objGeneral;
	
	@Test (groups= {"N"}, priority=20)
	public void testSendMessageClickButton() {
		String message=RandomWord.Sentence(12);
		objNewsFeed.postNews(message);
	}

	
	@BeforeClass
	public void beforeClass() {
		driver=Drivers.getChromeDriver();

		objGeneral=new GeneralPage(driver);
		objNewsFeed = new NewsFeedPage(driver);
		objLogin=new LoginPage(driver); 
		
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToNewsFeed();
	}

	@AfterClass
	public void afterClass() {
	Drivers.LogOutDriverExit(driver);
	}

}
