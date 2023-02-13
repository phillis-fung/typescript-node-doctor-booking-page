# Doctor Booking Page
Demo of an interface for member to reserve a medical appoionment online:

https://typescript-node-doctor-booking-page-6seae775u-phillis-fung.vercel.app/

## Package used

[axios](https://github.com/axios/axios)
 - handle HTTP based API call 
 - automatic transform response to JSON format (save steps to handle the format of response)
 - allows request timeout to handle API error
 - wide broswer support coverage
 - struggled if use fetch in the beginning and read [this article](https://www.geeksforgeeks.org/difference-between-fetch-and-axios-js-for-making-http-requests/) for more insignt

[styled-components](https://github.com/styled-components/styled-components)
 - apply css style on universal objects (Buttons, H1, p, span etc.)
 - easy to maintain the style and structure within the same file 
 - can levage the style of exisiting components and add custoimzation
 
[sqlite](https://www.sqlite.org/index.html)
 - no domain hosting needed
 - all data kept in local
 - can read and write data offline
 
[expressJS](https://github.com/expressjs/express)
- set different routes to handle the HTTP request


## Development
Run `npm run start ` to start the project

Run ` cd client npm run build `to build the app for production to the  `build`  folder, which bundles the minified build and hashed-included-filenames.

### Features 

 - Allow user to see the doctor's profile (name, address, opening hours)
 - Only future timeslots within the opening hours of these three days will be displayed
 - Create bookings (Only works in local as we used sqlite)
 - Error message will be displayed if there are validation error (empty input on timeslot) or API response error

### Assumptions
> Layout
- User is browsering under post-login state
- User has an valid account, which is not expired nor blacklisted
- Developer is able to retrieve sufficient personal information from the account
 - Full Name as HKID (shown in welcome page and autofill as patient name)
 - Conatct (mobile and email)
- Member ID
- Chan Tai Man is the dummy name used to demonstrate the user interface

> Functions
- User can only create booking on behalf on himself/herself

### Potential Improvement 
> Requirements
1. Discuss the booking date validate period  (e.g only can book within 2 weeks)
2. Add a phone number field for contact (suggest to be prefilled as well)
3. Any booking limit for each time slot per doctor?
4. Any booking limit for each patient?

> Design
1. Add the common modules (header, footer, navagtion bar) for UI checking
2. Test the intergation with other feactures (e.g. switch langauge, exit point handlings)
3. Test all possible entry points
4. More communication with the backend developers to understand the API restrictions and improve the handling on error cases


