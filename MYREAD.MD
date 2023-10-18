For the backend I used mongodb with mongodb compass.
L
aravel  v8.83.27
Jenssegers/mongodb v3.8.5
Composer v2.6.1

When first cloning the project clone it into the htdocs folder in the Xammp folder (Xammp is needed for the apache server only).
Start the apache server.
run the following command 'composer install ; composer update;' or if you'r using a linux based terminanl 'composer install && composer update'.
Enter the 'angular-app' directory which is in the Laravel root directory and run the command 'ng serve';

the app has four total of endpoints

one to fetch all the existing rows from our mongo db database (GET '/urls')
one to post a new url (POST '/')
one to use the web scrapper and scrap the existing url in the list. (POST '/scrap')
and one to delete a single url from the list ('delete/{$id}')
