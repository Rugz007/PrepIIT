# PrepiiT Backend Documentation

- This is the documentation of all the routes, functions and backend side of things about the PrepiiT CBT server
- The server is written in NodeJS and ExpressJS along with PostgreSQL as the database

## Beginning

- The main entry point of the server is the <b>app.js</b> file, the express server starts here.
- The server has been broken into chunks, and different files, each file serves a different purpose.
- All the API endpoints are contained in the <b>routes</b> folder, the different routes are defined below:

## adminRouter.js

- All of the functions related to the admin user are present in this file
- All of the API calls to this will be prefixed with a /admin/endpoint
- /enquiry relates to all of the interested people who have submitted a request at PrepiiT, the admin can view and take actions to get back to them or to contact them directly
- /question returns a list of all the questions currently in the database. All of the CRUD functions are performed by sending a request to this endpoint
- /excelupload endpoint allows for bulk uploading of all the questions the admin wants to upload, accepted formats are .csv, and other excel formats like .xls
- /reported endpoint returns a list of the questions that the users have reported as erroneous, the admin can resolve the errors so that the question will be added back to the list of valid questions
- /statictest endpoint provides fetching and creating functionality of mock tests that can be given by a user whenever he desires
- /livetest is the same as /statictest with the only difference being that livetests are time bound and can be given only in a particular interval of time
- /allblogs endpoint returns a list of all the blogs published on PrepiiT's frontend site
- /blog endpoint provides fetching and creating functionality of blogs that the admin user can upload for all of the visitors of PrepiiT to see

## blogRouter.js

- The blogs that the user sees on the frontend are handled by this route
- All of the API calls to this will be prefixed with a /blogs/endpoint
- /allblogs returns a list of all the blogs available on the server
- /blog returns a specific blog that the user wants to read

## liveTest.js

- All of the functions related to the livetest functionality are handled here
- All of the API calls to this will be prefixed with a /livetest/endpoint
- Only users who are authenticated are allowed to access this route
- / endpoint provides functionality to get a list of all available livetests, while sending a post request allows a user to begin a livetest that he might be interested in attending
- /verifyanswers provides functionality to check the answers of a livetest the user might have given and submitted

## mailRouter.js

- All of the functions related to the automated mailing system of the server are handled here
- All of the API calles to this will be prefixed with a /sendmail/endpoint
- Nodemailer is the module used to send mails
- / endpoint handles the enquiry of an interested user and will send them an acknowledgement mail to let them know someone will be in touch with them regarding their query

## secureRouter.js

- All of the functions related to the test generation, and getting details of a test an authenticated user might have given are handled here
- All of the API calls to this will be prefixed with a /secure/endpoint
- /test endpoint handles fetching tests a user is yet to give in the static and livetest categories
- Sending a post request to /test handles generating a new randomised test for the user to give
- /verifyanswers endpoint handles checking the answers of a mock test the user will submit
- /cachequestions returns the questions of a particular test the user has started, this is incase a user loses connection or changes browsers so that he can pick up where he left with the same questions and with the timer appropriately set
- /getheatmap is the endpoint that tells the user his activity on the PrepiiT site, just like the GitHub heatmap, this tells the user when he has given the tests and the frequency of the tests he has given on any given day
- /giventests returns a list of the tests given by a particular user
- /specifictestdetails is the endpoint that returns details of a particular test the user is interested in

## userRouter.js

- This is the endpoint that handles all the user related functions like signup, signin, forgot password and email verification of an account
- All of the API calls to this will be prefixed with a /user/endpoint
- /signup endpoint handles generating a token and mailing that to the user to verify his email to access PrepiiT
- /login generates a token for the user to be authorized with PrepiiT
- /forgotpassword generates a temporary password for the user to gain access to his account again incase he has forgotten his password

## Miscellaneous Information

- The questionsBackup folder stores all the csv/excel files of the question bank the admin will upload to the server
- The testGeneration folder stores all the files related to generating a random test for the user
  - All the files follow the same format, getting the subjects allowed along with how many types of questions and the number of questions of each question type
- The uploadLiveLog folder contains code for checking the answers of a livetest the user will submit
- The uploadLog folder contains code for checking the answers of a mock test the user will submit
- The uploadLiveTest folder contains code for inserting questions about a particular livetest in the database
- The uploadQuestions folder contains code for inserting questions into the central question bank for the randomised mock test
- The verifyAnswerType folder contains code to check the type of question being evaluated, seperated into numerical, mac(multiple answer correct) questions and non numerical questions
