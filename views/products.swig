<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products - Catay</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  {% include 'header.swig' %}
  <main>
    <h2>Articulos</h2>
    <div class="product">
      <img src="/images/aquarius.jpg" alt="Aquarius" class="product-image">
      <p class="price">Price: $1.50</p>
    </div>
    <div class="product">
      <img src="/images/coca-cola.jpg" alt="Coca Cola" class="product-image">
      <p class="price">Price: $1.80</p>
    </div>
    <div class="product">
      <img src="/images/nestea.jpg" alt="Nestea" class="product-image">
      <p class="price">Price: $1.70</p>
    </div>
  </main>
  <footer>
    &copy; 2024 Catay. Todos los derechos reservados.
  </footer>
</body>
</html>
