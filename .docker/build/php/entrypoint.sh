#!/bin/bash
set -e

# Re-apply permissions after volume mount
mkdir -p /var/www/html/temp /var/www/html/log
chown -R www-data:www-data /var/www/html/temp /var/www/html/log
chmod -R 777 /var/www/html/temp /var/www/html/log

exec apache2-foreground