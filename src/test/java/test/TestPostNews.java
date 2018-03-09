package test;

import PageFactory.*;
import Source.Links;
import Source.Users;
import utility.*;
import org.testng.annotations.*;
import org.openqa.selenium.*;
;

public class TestPostNews {
	WebDriver driver;
	LoginPage objLogin;
	NewsFeedPage objNewsFeed;
	GeneralPage objGeneral;
	String message;
	
	@DataProvider(name="dp")
	public static Object[] testData() {
		Object[] s=Links.getLink();
		return s;
	}

	@Test (groups= {"N"}, priority=20)
	public void testPostTextClickButton() {
		message="ClickButton "+RandomWord.Sentence(5);
		objNewsFeed.postNewsClickButton(message);
	}

	@Test (groups= {"N"}, priority=30)
	public void testPostTextPushEnter() {
		message="PushEnter "+RandomWord.Sentence(5);
		objNewsFeed.postNewsPushEnter(message);
	}
	
	@Test (groups= {"N"}, dataProvider = "dp", priority=40)
	public void testPostLinksPushEnter() {
		message="PushEnter "+RandomWord.Sentence(5);
		objNewsFeed.postNewsPushEnter(message);
	}
	
	@Test (groups= {"N"}, dataProvider = "dp", priority=50)
	public void testPostLinksClickEnter() {
		message="PushEnter "+RandomWord.Sentence(5);
		objNewsFeed.postNewsPushEnter(message);
	}
	
	
	//X0M4-QL5K-RPZE-ACVF-DGU6

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
