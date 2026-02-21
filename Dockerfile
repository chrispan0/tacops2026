# Use nginx alpine for lightweight image
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY registration.html /usr/share/nginx/html/
COPY registration.css /usr/share/nginx/html/
COPY registration.js /usr/share/nginx/html/
COPY prizes.html /usr/share/nginx/html/
COPY prizes.css /usr/share/nginx/html/
COPY prizes.js /usr/share/nginx/html/
COPY transportation.html /usr/share/nginx/html/
COPY transportation.css /usr/share/nginx/html/
COPY transportation.js /usr/share/nginx/html/
COPY sponsors.html /usr/share/nginx/html/
COPY sponsors.css /usr/share/nginx/html/
COPY sponsors.js /usr/share/nginx/html/
COPY media/ /usr/share/nginx/html/media/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
