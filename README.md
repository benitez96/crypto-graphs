### Django Project with Docker Compose

This is a Django project that can be run using Docker Compose to manage the application and database containers. The application provides an API for querying information about different cryptocurrencies and their charts.

### Initial Setup

Before running the application for the first time, make sure to follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone git@github.com:mutt-data-exams/exam-daniel-benitez.git muttchallenge
   ```


2. Navigate to the project directory:

   ```shell
    cd muttchallenge
   ```

3. Run the following command to build and start the Docker containers:

   ```shell
    docker-compose up -d
   ```
4. Apply database migrations:

   ```shell
    docker-compose exec server python manage.py migrate
   ```

5.  Populating the Database
Before using the API, you need to populate the database with information about cryptocurrencies. You can do this by running the following commands:

To fetch information about specified cryptocurrencies (e.g., btc, eth, usdt), run the following command:

   ```shell
    docker-compose exec server python manage.py fetch_coins btc eth mrk bnb xmr
   ```
### Accessing the API
Once you have configured and populated the database, you can access the API via Swagger at the following URL: [Open swagger](http://localhost:8000/swagger)

