/*
Copyright (C) 2021 sixtysixgames

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* 
    Created on : 
    Author     : sixtysixgames
*/

    today = new Date();
    aDays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    aMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    aDaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    //for use with lottery numbers
    function totup(num){
        var ret = num;
        if(num>9999) return;
        th = Math.floor(ret / 1000);
        ret = ret % 1000;
        hu = Math.floor(ret / 100);
        ret = ret % 100;
        te = Math.floor(ret / 10)
        ret = ret % 10;
        u = ret % 10;

        return th + hu + te + u;
    }

    function IsLeapYear(aYear){

        var ret = false;
        if ( (aYear % 400 == 0)) {
            ret = true;
        } else if ( (aYear % 4 == 0) && (aYear % 100 != 0)) {
            ret = true;
        }

        return ret;
    }

    function getDayOfYear(aDay, aMonth, aYear){
        var ret;

        ret = aDay;
        for (i=0;i<=aMonth-2;i++){
            ret += aDaysInMonth[i];
        }
        if ( IsLeapYear(aYear) && aMonth > 2){
            ret += 1;
        }

        return ret;
    }
    function generate(){
        var lnumbers = new Array();
        var unumbers = new Array();
        var output = "";
        var snumbers = "";
        var i,j,k;
        var vDay = document.birthday.bday.value * 1;
        var vMon = document.birthday.bmon.value * 1;
        var vYear = (document.birthday.bcent.value * 100) + (document.birthday.bdec.value * 10) + (document.birthday.byear.value * 1);

        //_numbers = window.open("lottery-numbers.htm", "Numbers", "width=500,height=450,resizable,scrollbars");
        //_numbers.document.open("text/html");
        //output += "<html><head><title>Lucky Lottery Numbers</title></head><body>";
        
        _numbers = document.getElementById("output");
        // eg 17/11/62
        lnumbers[lnumbers.length] = vDay; // 17
        lnumbers[lnumbers.length] = getDayOfYear(vDay, vMon, vYear);
        lnumbers[lnumbers.length] = vMon; // 11
        lnumbers[lnumbers.length] = vYear % 100; //62
        lnumbers[lnumbers.length] = vYear; // 1962
        lnumbers[lnumbers.length] = vDay + vMon + (vYear % 100) ; // 17 + 11 + 62
        lnumbers[lnumbers.length] = vDay + vMon + vYear; // 17 + 11 + 1962
        lnumbers[lnumbers.length] = totup(vDay); // 1+7
        lnumbers[lnumbers.length] = totup(vMon); // 1+1
        lnumbers[lnumbers.length] = totup(vYear); // 1+9+6+2
        lnumbers[lnumbers.length] = totup(vDay) + totup(vMon) + totup(vYear);
        lnumbers[lnumbers.length] = totup(vDay + vMon + vYear);

        //adjust numbers
        for (i=0;i<=lnumbers.length-1;i++){
            lnumbers[i] = lnumbers[i] % 49;
            if (lnumbers[i] == 0) lnumbers[i] = 49;
        }
        //output numbers
        for (i=0;i<=lnumbers.length-1;i++){
            if (i==0)
                snumbers += lnumbers[i];
            else
                snumbers += ', ' + lnumbers[i];
        }

        output += "Here are your " + lnumbers.length + " lucky numbers based on your birth date: " + vDay + "/" + vMon + "/" + vYear + ".<br>The more a number appears, the luckier it is!<p>Here they are in order of importance:<br>" + snumbers;

        //sort numbers
        for (i=0;i<=lnumbers.length-2;i++){
            for (j=i+1;j<=lnumbers.length-1;j++){
                if (lnumbers[i] > lnumbers[j]) {
                    temp = lnumbers[i];
                    lnumbers[i] = lnumbers[j];
                    lnumbers[j] = temp;
                }
            }
        }

        //output numbers
        snumbers = '';
        for (i=0;i<=lnumbers.length-1;i++){
            if (i==0)
                snumbers += lnumbers[i];
            else
                snumbers += ', ' + lnumbers[i];
        }
        output += "<p>Here they are sorted:<br />" + snumbers;

        // remove duplicate numbers for next phase
        unumbers[0] = lnumbers[0];
        for (i=1;i<=lnumbers.length-1;i++){
            found = false;
            for (j=0;j<=unumbers.length-1;j++){
                if ( unumbers[j] == lnumbers[i]) found = true;
            }
            if ( ! found ) unumbers[unumbers.length] = lnumbers[i];
        }
        //output numbers
        snumbers = '';
        for (i=0;i<=unumbers.length-1;i++){
            if (i==0)
                snumbers +=  unumbers[i];
            else
                snumbers += ', ' + unumbers[i];
        }
        output += "<p>Here they are with duplicates removed:<br />" + snumbers;

        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMon = nowDate.getMonth();
        output += "<p>Here are your luckiest days of the year " + nowYear + " (day/month)<br />";
        for (m=0;m<=unumbers.length-1;m++){
            if (unumbers[m] <= 12){
                first = true
                for (d=0;d<=unumbers.length-1;d++){
                    if (unumbers[d] <= 31){
                        switch (unumbers[m]){
                            case 2:
                                if (unumbers[d] <= 28) {
                                    tmpDate = new Date(nowYear, unumbers[m]-1, unumbers[d])
                                    tmpDay = tmpDate.getDay();
                                    if (tmpDay == 3 || tmpDay == 6) output += "<b>";
                                    if (first){
                                        output += unumbers[d] + "/" + unumbers[m];
                                        first = false;
                                    }else{
                                        output += ", " + unumbers[d] + "/" + unumbers[m];
                                    }
                                    if (tmpDay == 3 || tmpDay == 6) output += "</b>";
                                }
                                break;
                            case 4:
                            case 6:
                            case 9:
                            case 11:
                                if (unumbers[d] <= 30) {
                                    tmpDate = new Date(nowYear, unumbers[m]-1, unumbers[d])
                                    tmpDay = tmpDate.getDay();
                                    if (tmpDay == 3 || tmpDay == 6) output += "<b>";
                                    if (first){
                                        output += unumbers[d] + "/" + unumbers[m];
                                        first = false;
                                    }else{
                                        output += ", " + unumbers[d] + "/" + unumbers[m];
                                    }
                                    if (tmpDay == 3 || tmpDay == 6) output += "</b>";
                                }
                                break;
                            default:
                                tmpDate = new Date(nowYear, unumbers[m]-1, unumbers[d])
                                tmpDay = tmpDate.getDay();
                                if (tmpDay == 3 || tmpDay == 6) output += "<b>";
                                if (first){
                                    output += unumbers[d] + "/" + unumbers[m];
                                    first = false;
                                }else{
                                    output += ", " + unumbers[d] + "/" + unumbers[m];
                                }
                                if (tmpDay == 3 || tmpDay == 6) output += "</b>";
                        }
                    }
                }
                output += "<br />";
            }
        }
        //_numbers.document.write(output);
        snumbers = '';
        first = true;
        for (j=0;j<=unumbers.length-1;j++){
            if (unumbers[j] <= 31) {
                tmpDate = new Date(nowYear, nowMon, unumbers[j])
                tmpDay = tmpDate.getDay();
                if (tmpDay == 3 || tmpDay == 6) output += "<b>";
                if (first){
                    snumbers += unumbers[j];
                    first = false;
                }else{
                    snumbers += ', ' + unumbers[j];
                }
                if (tmpDay == 3 || tmpDay == 6) snumbers += "</b>";
            }
        }
        output += "<br />And here are your luckiest days of the month. " + aMonths[nowMon] + "<br />" + snumbers + "<p>NB: Days in <b>bold</b> indicate a Wednesday or a Saturday, so get your lottery tickets.</p>";
        //output += "</body></html>";
        //_numbers.document.write(output);
        //_numbers.document.close();
        _numbers.innerHTML = output;
    }

