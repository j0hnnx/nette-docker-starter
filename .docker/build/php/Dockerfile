FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/www

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN apt-get update
RUN apt-get -y install lsb-release ca-certificates apt-transport-https wget git zip unzip

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN docker-php-ext-enable mysqli pdo pdo_mysql

RUN a2enmod rewrite
RUN a2enmod headers

RUN mkdir -p /var/www/html/temp /var/www/html/log \
    && chown -R www-data:www-data /var/www/html/temp /var/www/html/log \
    && chmod -R 777 /var/www/html/temp /var/www/html/log

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer self-update

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]