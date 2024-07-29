<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Catay</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  {% include 'header.swig' %}
  <main>
    <h2>
      Welcome, <span id="username">{{ user.customName || 'Guest' }}</span>
      <button id="editNameButton" class="edit-button">✏️</button>
    </h2>
    <p>This is your dashboard.</p>
  </main>

  <!-- Modal para actualizar el nombre de usuario -->
  <div id="editNameModal" class="modal">
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <form id="updateNameForm" action="/update-name" method="post">
        <label for="customName">Choose your name:</label>
        <input type="text" id="customName" name="customName" required>
        <button type="submit">Update Name</button>
      </form>
    </div>
  </div>

  <script src="/js/main.js"></script>
  <footer>
    &copy; 2024 Catay. Todos los derechos reservados.
  </footer>
</body>
</html>
