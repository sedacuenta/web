<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About Us</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/products">Products</a></li>
      {% if user %}
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/auth/logout">Log Out</a></li>
      {% else %}
        <li><a href="/auth/google">Login with Google</a></li>
      {% endif %}
    </ul>
  </nav>
</header>

