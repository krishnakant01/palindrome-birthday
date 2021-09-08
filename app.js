const dob = document.querySelector("#date");
const message = document.querySelector("#message");
const nextPalindromeMessage = document.querySelector("#next-palindrome-msg");
const previousPalindromeMessage = document.querySelector("#previous-palindrome-msg");
const checkButton = document.querySelector("#btn-check");
//const meme = document.querySelector("#meme");

function reverseStr(str) {
    return str.split('').reverse().join('');
}

function isStringPalindrome(str) {
    let reversedString = reverseStr(str);
    return (reversedString === str);
}

function convertDateAsString(date) {
    let dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function allDateFormats(date) {
    let stringDates = convertDateAsString(date);
    let ddmmyyyy = stringDates.day + stringDates.month + stringDates.year;
    let mmddyyyy = stringDates.month + stringDates.day + stringDates.year;
    let yyyymmdd = stringDates.year + stringDates.month + stringDates.day;
    let ddmmyy = stringDates.day + stringDates.month + stringDates.year.slice(-2);
    let mmddyy = stringDates.month + stringDates.day + stringDates.year.slice(-2);
    let yymmdd = stringDates.year.slice(-2) + stringDates.month + stringDates.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let listOfDates = allDateFormats(date);
    let flag = false;
    for (let i = 0; i < listOfDates.length; i++) {
        if (isStringPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return true;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

        if (month > 12) {
            month = 1;
            year++;
        }
        return {
            day: day,
            month: month,
            year: year
        }
    }
}

function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);

    while (1) {
        count++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month===3){
        if(isLeapYear(year)){
            if(day<1){
                day=29;
                month--;
            }
        }else{
            if(day<1){
                day=28;
                month--;
            }
        }
    }else{
        if(day===0 && month===1){
           day=31;
           month=12;
           year--;
        }
        if(month>1 && day===0){
            --month;
            day= daysInMonth[month-1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date){
    var count = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        count++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
        
        previousDate = getPreviousDate(previousDate);
    }

    return [count, previousDate];
}

function showMessage(msg){
    message.style.display= "block";
    message.style.fontSize = "x-large";
    message.style.fontWeight = "bolder";
    message.innerText = msg;
}

function clickHandler(){
    message.style.display= "none";
    nextPalindromeMessage.style.display = "none";
    previousPalindromeMessage.style.display = "none";

    var DOB = dob.value.split("-");
    var date = {
        day: Number(DOB[2]),
        month: Number(DOB[1]),
        year: Number(DOB[0])
    };

    if(checkPalindromeForAllDateFormats(date)){
       
        message.style.color = "green";
        showMessage("Congrats! Your Birthday is a Palindrome 🥳");
        console.log("Congrats! Your Birthday is a Palindrome 🥳");
    }else{
        message.style.color = "red";
        showMessage("Opps! your Birthday is not a palindrome 😐");
        console.log("Opps! your Birthday is not a palindrome 😐");
        var [count, nextDate] = getNextPalindromeDate(date);
        var [counter, previousDate] = getPreviousPalindromeDate(date);
        nextPalindromeMessage.style.display = "block";
        previousPalindromeMessage.style.display = "block";
        nextPalindromeMessage.innerText = `👉 Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days.`;
            previousPalindromeMessage.innerText = `👉 Previous Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${counter} days.`;
        console.log( "👉 Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days.");
        console.log("👉 Previous Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${counter} days.");
    }
}

checkButton.addEventListener("click",clickHandler);