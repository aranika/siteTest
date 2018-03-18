package Source;

import utility.RandomWord;

public class Users {

	public Object[][] getLongListUsers() {
		int r=(int)(Math.random()*10+17);
		Object[][]logPas=new String [r][2];
		logPas[0][0]=getAuthorizedUsers()[0][0]; logPas[0][1]=getAuthorizedUsers()[0][1];
		logPas[1][0]="";logPas[1][1]=logPas[0][1];
		logPas[2][0]=logPas[0][0]; logPas[2][1]="";
		logPas[3][0]="";logPas[3][1]="";
		logPas[4][0]=RandomWord.eng(10);logPas[4][1]=logPas[0][1];
		logPas[5][0]=logPas[0][0]; logPas[5][1]=RandomWord.eng(12);		
		logPas[6][0]=RandomWord.eng(20);logPas[6][1]=RandomWord.eng(52);

		logPas[7][0]=""+(Math.random()*100);logPas[7][1]=""+(Math.random()*100);
		logPas[8][0]=logPas[0][1]; logPas[8][1]=logPas[0][0];
		logPas[9][0]=RandomWord.eng(52)+""+(Math.random()*100);logPas[9][1]=RandomWord.eng(52)+""+(Math.random()*100);
		logPas[10][0]=RandomWord.rus(66);logPas[10][1]=RandomWord.rus(66);
		logPas[11][0]=RandomWord.rus(66)+(Math.random()*100);logPas[11][1]=RandomWord.rus(66)+(Math.random()*100);
		logPas[12][0]=RandomWord.rus(66)+RandomWord.eng(52);logPas[12][1]=RandomWord.rus(66)+RandomWord.eng(52);
		logPas[13][0]=RandomWord.sym(32);logPas[13][1]=RandomWord.sym(32);
		logPas[14][0]=" "+logPas[0][0]; logPas[14][1]=" "+logPas[0][1];
		logPas[15][0]=logPas[0][0]+" "; logPas[15][1]=logPas[0][1]+" ";
		logPas[16][0]="nastya.d.1 991@inbox.ru"; logPas[16][1]="test 1234";
		for(int i=17; i<r; i++) {
			logPas[i][0]=RandomWord.all((int)(Math.random()*50+3)); logPas[i][1]=RandomWord.all((int)(Math.random()*50+3));		
		}
		return logPas;
	}
	public Object[][] getShortListUsers() {
		Object[][]logPas=new String [7][2];
		logPas[0][0]=getAuthorizedUsers()[0][0]; logPas[0][1]=getAuthorizedUsers()[0][1];
		logPas[1][0]="";logPas[1][1]=logPas[0][1];
		logPas[2][0]=logPas[0][0]; logPas[2][1]="";
		logPas[3][0]="";logPas[3][1]="";
		logPas[4][0]=RandomWord.eng(15);logPas[4][1]=logPas[0][1];
		logPas[5][0]=logPas[0][0]; logPas[5][1]=RandomWord.eng(10);		
		logPas[6][0]=RandomWord.eng(22);logPas[6][1]=RandomWord.eng(15);		
		return logPas;
	}

	public Object[][] getAuthorizedUsers() {
		Object[][]logPas=new String [2][2];
		logPas[0][0]="lena.test.86@bk.ru"; logPas[0][1]="test1234";
		logPas[1][0]="nastya.d.1991@inbox.ru"; logPas[1][1]="test1234";		
		return logPas;
	}
}