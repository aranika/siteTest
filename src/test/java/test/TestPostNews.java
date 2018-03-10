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
	@Parameters(value= {"link"})
	public void testPostLinksPushEnter(String link) {
		message=link+" PushEnter ";
		objNewsFeed.postNewsPushEnter(message);
	}
	
	@Test (groups= {"N"}, dataProvider = "dp", priority=50)
	@Parameters(value= {"link"})
	public void testPostLinksClickButton(String link) {
		message=link+" "+this.getClass().getTypeName();
		objNewsFeed.postNewsClickButton(message);
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
