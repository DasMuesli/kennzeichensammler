# Use an official PHP Apache runtime
FROM php:8.2-apache as base
# Install Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer
# Enable Apache modules
RUN a2enmod rewrite
# Install PostgreSQL client and its PHP extensions
RUN apt-get update \
    && apt-get install -y libpq-dev git unzip \
    && docker-php-ext-install pdo pdo_pgsql 
# Set the working directory to /var/www/html
WORKDIR /var/www/html

FROM base as prod
COPY ./src ./


FROM base as test
COPY ./src ./src
COPY composer.* ./
RUN composer install
COPY ./tests ./tests
RUN ./vendor/bin/phpunit tests