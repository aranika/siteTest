package utility;
import java.sql.Driver;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.service.DriverService;

import com.sun.jna.platform.win32.WinNT.LOGICAL_PROCESSOR_RELATIONSHIP;

import PageFactory.*;
import Source.Links;


public class functionCheck {
	

	public static void main(String[] args){
		// TODO Auto-generated method stub
		int l=Links.getLink().length;
		for(int i=0; i<l; i++) {
		System.out.println("ok "+ Links.getLink()[i]
		+" "+i)		;
	}
	}
}