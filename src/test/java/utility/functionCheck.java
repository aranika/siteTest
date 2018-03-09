package utility;
import Source.*;


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