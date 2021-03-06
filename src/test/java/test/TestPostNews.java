package test;

import PageFactory.*;
import Source.*;
import utility.*;
import org.testng.annotations.*;
import org.apache.log4j.xml.DOMConfigurator;
import org.openqa.selenium.*;

public class TestPostNews {
	WebDriver driver;
	LoginPage objLogin;
	NewsFeedPage objNewsFeed;
	GeneralPage objGeneral;
	String message;
	Integer i=14;

	@DataProvider(name="dp")
	public static Object[] testData() {
		Object[] s=Links.getLink();
		return s;
	}

	@Test (groups= {"News","Text"}, priority=150, enabled=true)
	public void testPostTextClickButton(){
		message="Button"+RandomWord.sentence(5);
		objNewsFeed.postNewsClickButton(message);
	}

	@Test (groups= {"News", "Link"}, dataProvider = "dp", priority=170, enabled=true)
	@Parameters(value= {"link"})
	public void testPostLinksClickButton(String link)  {
		message=link;
		objNewsFeed.postNewsClickButton(message);
	}

	@Test (groups= {"News", "Link", "Text"}, dataProvider = "dp", priority=190, enabled=true)
	@Parameters(value= {"link"})
	public void testPostLinksTextClickButton(String link) {
		message=link+ RandomWord.sentence(20);
		objNewsFeed.postNewsClickButton(message);
		objNewsFeed.findPostLink(link);
	}

	@Test (groups= {"News","Text"}, priority=160, enabled=true)
	public void testPostTextPushEnter() {
		message="Enter"+RandomWord.sentence(5);
		objNewsFeed.postNewsPushEnter(message);
	}

	@Test (groups= {"News", "Link"}, dataProvider = "dp", priority=180,enabled=true)
	@Parameters(value= {"link"})
	public void testPostLinksPushEnter(String link)  {
		message=link;
		objNewsFeed.postNewsPushEnter(message);
	}

	@Test (groups= {"News", "Link", "Text"}, dataProvider = "dp", priority=200,enabled=true)
	@Parameters(value= {"link"})
	public void testPostLinksTextPushEnter(String link)  {
		message=link+ RandomWord.sentence(20);
		objNewsFeed.postNewsPushEnter(message);
		objNewsFeed.findPostLink(link);
	}

	@Test (groups= {"News", "Delete"}, priority=210,enabled=true)
	public void testDeleteLastNews() {
		objNewsFeed.deleteLastNews();
	}

	@BeforeClass  (groups= {"News"})
	public void before() {
		DOMConfigurator.configure("log4j.xml");
		Log.startTestCases("Post News");
		driver=MyDriver.getChromeDriver();

		objGeneral=new GeneralPage(driver);
		objNewsFeed = new NewsFeedPage(driver);
		objLogin=new LoginPage(driver); 
		LoginPage.logIn(objLogin, driver);
		objGeneral.goToNewsFeed();
	}

	@BeforeMethod (groups= {"News"})
	public void beforeM() {
		i=i+1;
		System.out.println(i);
		Log.info("---------test case#"+i+"--------------");
	}

	@AfterClass (groups= {"News"})
	public void after() {
		MyDriver.LogOutDriverExit(driver);
		Log.endTestCases("Post News");
	}
}