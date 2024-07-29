<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact - Catay</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  {% include 'header.swig' %}
  <main>
    <h2>Contact Information</h2>
    <p>Address: Calle Polo y Peyrolon,32,Valencia,46021</p>
    <p>Open Hours: L-S:9:00 AM - 2:20 PM,5:00 PM - 9:20 PM 
    Domingo:9:00 AM - 2:20 PM</p>

    {% if user %}
      <form action="/contact" method="POST">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required>

        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Send</button>
      </form>
    {% else %}
      <p>You need to <a href="/auth/google">log in</a> to contact us.</p>
    {% endif %}
  </main>
  <footer>
    &copy; 2024 Catay. Todos los derechos reservados.
  </footer>
</body>
</html>
