import { Receipt, Item } from "../types/Receipt.js";

// Returns number of alphanumeric characters in the string, s
let rule1 = (s: string): number => {
    if (s == "") {
        return 0
    }
    // ascii value of first character 
    let c = s.charCodeAt(0)

    if ((c >= 97 && c <= 122) // lower case letters 
        || (c >= 65 && c <= 90) // upper case letters
        || (c >= 48 && c <= 57)) { // numbers
        return 1 + rule1(s.substring(1, s.length));
    } else {
        return rule1(s.substring(1, s.length));
    }
}

// Returns 50 if the two digits after the '.' in s are '00'. Returns 0 otherwise. 
let rule2 = (s: string): number => { 
    return (s.split('.')[1] == "00") ? 50 : 0
}

// Returns 25 if the number after the '.' in s is a multiple of 25. Returns 0 otherwise.
let rule3 = (s: string): number => { 
    return (Number(s.split('.')[1]) % 25 == 0) ? 25 : 0
}

// Returns 5 times the length of the list of items divided by two, rounded down. 
let rule4 = (list: Item[]): number => {
    return 5 * Math.floor(list.length / 2) 
}

// Returns the number of points specified by rule 5. 
let rule5 = (list: Item[]): number => {
    let points: number = 0; 

    for (let i = 0; i < list.length; i++) {
        // Description of item, trimmed of whitespace at beginning and end 
        let trimmedDescription: string = list[i].shortDescription.trim() 
        // Price of item 
        let price: number = Number(list[i].price)

        // If length trimmed description is a multiple of 3 
        if (trimmedDescription.length % 3 == 0) {
            // Multiply price by 0.2, round up 
            points += Math.ceil(price * 0.2)
        }
    }

    return points 
}

// Returns 6 if the date number mod 2 equals 1 and is thus odd. Returns 0 otherwise 
let rule6 = (date: string): number => {
    return (Number(date.split('-')[2]) % 2 == 1) ? 6 : 0
}
// Returns 10 if the time is between 2:00pm and 4:00pm, not inclusive. Returns 0 Otherwise.
let rule7 = (time: string): number => {
    let hour: number = Number(time.split(':')[0])
    let minute: number = Number(time.split(':')[1])
    // If the hour is 3pm, or if the hour is 2pm and the minute is not 00
    if (hour == 15 || (hour == 14 && minute != 0)) {
        return 10
    }
    return 0 
}


`
RULES: 
    1. One point for every alphanumeric character in the retailer name.
    2. 50 points if the total is a round dollar amount with no cents.
    3. 25 points if the total is a multiple of 0.25.
    4. 5 points for every two items on the receipt.
    5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    6. 6 points if the day in the purchase date is odd.
    7. 10 points if the time of purchase is after 2:00pm and before 4:00pm.
`
export const calcPoints = (receipt: Receipt): number => {
    let totalPoints: number = 0 
    // Rule 1
    totalPoints += rule1(receipt.retailer)
    
    // Rule 2 
    totalPoints += rule2(receipt.total)

    // Rule 3 
    totalPoints += rule3(receipt.total)

    // Rule 4 
    totalPoints += rule4(receipt.items)

    // Rule 5 
    totalPoints += rule5(receipt.items)

    // Rule 6 
    totalPoints += rule6(receipt.purchaseDate)

    // Rule 7
    totalPoints += rule7(receipt.purchaseTime)

    return totalPoints
}

