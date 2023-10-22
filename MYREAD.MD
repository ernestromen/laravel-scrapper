For the backend I used mongodb with mongodb compass.
Laravel  v8.83.27
Jenssegers/mongodb v3.8.5
Composer v2.6.1

When first cloning the project clone it into the htdocs folder in the Xammp folder (Xammp is needed for the apache server only).
Start the apache server.
donwload the following zip and take the php_mongodb.dll and past in the xammp/php/ext
https://pecl.php.net/package/mongodb/1.8.1/windows
run the command composer require mongodb/mongodb
run the following command 'composer install ; composer update;' or if you'r using a linux based terminanl 'composer install && composer update'.
enter angular-app path and run the command npm i then ng serve
the app has four total of endpoints
and the app itself should be seen from the port that shows the angular side which uses the laravel endpoints

one to fetch all the existing rows from our mongo db database (GET '/urls')
one to post a new url (POST '/')
one to use the web scrapper and scrap the existing url in the list. (POST '/scrap')
and one to delete a single url from the list ('delete/{$id}')
