package utility;
import org.openqa.selenium.*;

import Source.*;


public class functionCheck {
	

	public static void main(String[] args){
		// TODO Auto-generated method stub
		int l=Links.getLink().length;
		for(int i=0; i<l; i++) {
		String selector="div > span";
		WebDriver driver=MyDriver.getChromeDriver();
		
		System.out.println("ok "+ FindEl.getLastElement(selector, driver).getAttribute("value")
		+" "+i)		;
	}
	}
}