package test;

import PageFactory.*;
import Source.*;
import utility.*;
import org.testng.annotations.*;
import org.openqa.selenium.*;

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

	@Test (groups= {"News","Text"}, priority=20, enabled=true)
	public void testPostTextClickButton() {
		message="Button"+RandomWord.Sentence(5);
		objNewsFeed.postNewsClickButton(message);
	}
//
//	@Test (groups= {"News", "Link"}, dataProvider = "dp", priority=30, enabled=true)
//	@Parameters(value= {"link"})
//	public void testPostLinksClickButton(String link) {
//		message=link;
//		objNewsFeed.postNewsClickButton(message);
//	}
//
//	@Test (groups= {"News", "Link", "Text"}, dataProvider = "dp", priority=40, enabled=true)
//	@Parameters(value= {"link"})
//	public void testPostLinksTextClickButton(String link) {
//		message=link+ RandomWord.Sentence(5);
//		objNewsFeed.postNewsClickButton(message);
//		objNewsFeed.findPostLink(link);
//	}
//
//	@Test (groups= {"News","Text"}, priority=130, enabled=true)
//	public void testPostTextPushEnter() {
//		message="Enter"+RandomWord.Sentence(5);
//		objNewsFeed.postNewsPushEnter(message);
//	}
//
//	@Test (groups= {"News", "Link"}, dataProvider = "dp", priority=140,enabled=true)
//	@Parameters(value= {"link"})
//	public void testPostLinksPushEnter(String link) {
//		message=link;
//		objNewsFeed.postNewsPushEnter(message);
//	}

	@Test (groups= {"News", "Link", "Text"}, dataProvider = "dp", priority=360,enabled=true)
	@Parameters(value= {"link"})
	public void testPostLinksTextPushEnter(String link) {
		message=link+ RandomWord.Sentence(10);
		objNewsFeed.postNewsPushEnter(message);
		objNewsFeed.findPostLink(link);
	}

//	@Test (groups= {"News", "Delete"}, priority=420,enabled=true)
//	public void testDeleteLastNews() {
//		objNewsFeed.deleteLastNews();
//	}

	@BeforeClass  (groups= {"BeforeNews","News"})
	public void before() {
		driver=MyDriver.getChromeDriver();

		objGeneral=new GeneralPage(driver);
		objNewsFeed = new NewsFeedPage(driver);
		objLogin=new LoginPage(driver); 
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToNewsFeed();
	}

	@AfterClass (groups= {"AfterNews","News"})
	public void after() {
		MyDriver.LogOutDriverExit(driver);
	}
}