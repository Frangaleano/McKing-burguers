const extraItems = document.querySelectorAll('.extra-item');
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const toggleMenu = () => {
  const body = document.body;
  const main = document.getElementById("main");

  body.classList.toggle('open');

  // Bloquear o restaurar el scroll del cuerpo
  if (body.classList.contains('open')) {
    body.style.overflow = 'hidden'; // Bloquear el scroll
    main.style.opacity = "0"
  } else {
    body.style.overflow = ''; // Restaurar el scroll
    main.style.opacity = "1"
  }
};

window.addEventListener('load', function() {
  const carousel = document.querySelector('.carousel-images');
  const images = document.querySelectorAll('.carousel-images img');

  let counter = 0;
  const slideCount = images.length;
  let slideWidth;

  function nextSlide() {
      if (slideWidth === undefined) {
          slideWidth = images[0].clientWidth;
      }
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
      counter = (counter + 1) % slideCount;
  }

  // Ajustar el carousel al inicio
  carousel.style.transform = `translateX(0)`;

  // Iniciar el carousel automáticamente
  setInterval(nextSlide, 1500);
});

let currentIndex = 0;
let subMenuVisible = false;
let subMenuDosVisible = false;
let subMenuTresVisible = false;
let subMenuCuatroVisible = false;
let subMenuCincoVisible = false;
let subMenuMilaVisible = false;
let comoVisible = false;
let extrasCounters = {};
let totalExtras = 0;
let productos = [];
let preciosTotalesProductos = [0];
let counters = {};
let selectedItems = [];
let total = 0;
let totalProductos = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % items.length;
  const translateValue = -currentIndex * 100 + '%';
  carouselInner.style.transform = 'translateX(' + translateValue + ')';
}, 1500);

document.querySelectorAll('.menu ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // Scroll suave
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });

    // Cerrar el menú después de hacer clic en un enlace
    toggleMenu();
  });
});

document.querySelectorAll('.div-botones-submenu input[type="radio"]').forEach((radio) => {
  radio.addEventListener('click', (event) => {
    const buttonNumber = event.target.closest('.div-botones-submenu').dataset.buttonNumber;
    const counterValue = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .counter-value`);

    // Guarda el estado actual del radio button
    const currentState = event.target.checked;

    // Restablece todos los botones del grupo a su estado original
    document.querySelectorAll(`.div-botones-submenu[data-button-number="${buttonNumber}"] input[type="radio"]`).forEach((r) => {
      r.checked = false;
    });

    // Si el estado original era falso, marca el radio actual
    if (!currentState) {
      event.target.checked = true;

      // Incrementa el contador y el total si se selecciona
      counters[buttonNumber]++;
      total += parseFloat(event.target.value);
    } else {
      // Decrementa el contador y el total si ya estaba seleccionado
      counters[buttonNumber]--;
      total -= parseFloat(event.target.value);
    }

    counterValue.textContent = counters[buttonNumber];
    actualizarTotal();
  });
});

document.querySelectorAll('.menu-button.main-menu-button').forEach(button => {
  button.addEventListener('click', function () {
    const buttonNumber = this.id.replace('boton', '');
    selectMainMenuButton(buttonNumber);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Ocultar el dropdown al cargar la página
  const pedidoDropdown = document.getElementById('pedidoDropdown');
  pedidoDropdown.innerHTML = ''; // Limpiar contenido del dropdown
  pedidoDropdown.style.display = 'none';
});

extraItems.forEach((extraItem) => {
  extraItem.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    const listNumber = event.target.dataset.listNumber;
    const counterElement = event.currentTarget.querySelector('.counter-value');

    if (action === 'increment' || action === 'decrement') {
      const extraNumber = parseInt(event.currentTarget.dataset.extraNumber);
      updateExtrasCounter(extraNumber, action, listNumber, counterElement);
    }
  });
});

function toggleComo() {
  const como = document.getElementById('como');
  const botonComo = document.getElementById('boton-como');

  if (!comoVisible) {
      const buttonsHTML = `
      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p class="pasos" style="margin-top: 0px; font-size: 12px;"> <b>Paso 1:</b> <br>
              Tocar el boton "Menú".</p>
          </div>
          <img class="img-pasos" src="./menu.png" alt="menu" style="width: 100px"></img>
      </div>
      
      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p class="pasos" style="margin-top: 0px; font-size: 12px;"> <b>Paso 2:</b> <br>
              Selecciona el submenu que desees.</p>
          </div>
          <img class="img-pasos" src="./submenus.png" alt="submenu" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p class="pasos" style="margin-top: 0px; font-size: 12px;"> <b>Paso 3:</b> <br>
              a) Selecciona el producto que desees y su cantidad.<br>
              b) También puedes seleccionar los extras que quieras.<br>
              c) Luego agrega el producto al pedido, con el boton "Agregar al pedido".
              </p>
          </div>
          <img class="img-pasos" src="./seleccion-menu.png" alt="seleccion menu" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p class="pasos" style="margin-top: 0px; font-size: 12px;"> <b>Paso 4:</b> <br>
              Al agregar vas a ver, el total del pedido, y el boton de tu pedido, desde el cual vas a poder ver tu pedido actual y eliminar algun producto si es necesario.<br>
              </p>
          </div>
          <img class="img-pasos" src="./tupedido.png" alt="pedido" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p class="pasos" style="margin-top: 0px; font-size: 12px;"> <b>Paso 5:</b> <br>
              Al agregar tambien va a aparecer un boton de "Hacer pedido", el cual vamos a tocar para ir a whatsapp directamente.<br>
              </p>
          </div>
          <img class="img-pasos" src="./hacerpedido.png" alt="hacer pedido" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
              <p class="pasos" style="width: 300px; font-size: 12px;"> <b>Paso 6:</b> <br>
              Finalmente en whatsapp, enviaremos el mensaje con todo nuestro pedido detallado.<br>
              * Nombre, Precio total y cantidad de cada producto. <br>
              * Precio total del pedido.
              </p>
      </div>
      `;


      como.innerHTML = buttonsHTML;

      comoVisible = true;
      como.style.display = "flex";
      como.offsetHeight;
      como.style.opacity = "1";
      como.style.transform = "translateY(0)";
      como.style.visibility = "visible";
      como.style.flexDirection = "column";
      como.style.alignItems = "center"
      como.style.zIndex = "99"

      // Agrega la clase 'active' al botón1 cuando se despliega el submenú
      botonComo.classList.add('active');
      como.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
      const comoButtons = document.querySelectorAll('.menu-button');
      comoButtons.forEach(button => {
          button.classList.remove('initial');
      });
      setTimeout(() => {
          como.innerHTML = '';
      }, comoButtons.length * 100);

      comoVisible = false;

      como.style.opacity = "0";
      como.style.transform = "translateY(-20px)";
      setTimeout(() => {
          como.style.visibility = "hidden";
          como.style.display = "none";
      }, 800);

      // Quita la clase 'active' al botón1 cuando se contrae el submenú
      botonComo.classList.remove('active');
  }
}

function toggleMenuSection() {
  const menuProductos = document.getElementById("menu-section");
  const tituloMenu = document.getElementById("menu-title");
  const carousel = document.getElementById("hidden")
  const total = document.getElementById("total")
  const parrafoMenu = document.getElementById("parrafo-menu")

  menuProductos.classList.toggle("visible");

  if (menuProductos.classList.contains("visible")) {
    // Mostrar la sección del menú
    menuProductos.style.display = "flex";
    menuProductos.offsetHeight; // Activar reflow
    menuProductos.style.opacity = "1";
    menuProductos.style.transform = "translateY(0)";
    menuProductos.style.visibility = "visible";
    carousel.style.display = "none"
    tituloMenu.style.backgroundColor = "#fcb502";
    tituloMenu.style.color = "rgba(140, 34, 195, 1)";
    tituloMenu.style.animation = "none"
    total.style.display = "flex"
    total.style.opacity = "1"
    parrafoMenu.style.display = "none"
  } else {
    menuProductos.style.opacity = "0";
    menuProductos.style.transform = "translateY(-20px)";
    total.style.display = "none"
    total.style.opacity = "0"
    setTimeout(() => {
      menuProductos.style.visibility = "hidden";
      menuProductos.style.display = "none"
      carousel.style.display = "flex"
    }, 800); // Establecer un tiempo de espera para ocultar después de la animación

    tituloMenu.style.backgroundColor = "transparent";
    tituloMenu.style.color = "white";
    tituloMenu.style.animation = "shadowAnimation 1s infinite"
    parrafoMenu.style.display = "block"
  }
}

function selectButton(buttonNumber) {
  const container = document.querySelector('.menu-button-container');
  const allButtons = container.querySelectorAll('.menu-button');

  allButtons.forEach((button, index) => {
    button.classList.remove('active');
    if (index + 1 === buttonNumber) {
      event.preventDefault();
      button.classList.add('active');
    }
  });
}

function toggleSubMenu() {
  const subMenu = document.getElementById('subMenu');
  const boton1 = document.getElementById('boton1');

  if (!subMenuVisible) {
    const buttonsHTML = `
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
  <div class="div-botones-submenu" data-button-number="1">
    <button class="menu-button sub-menu-button" data-button-number="1">Simple</button>
    <p>$2300</p>
    <input class="radio-button" type="radio" name="simple" value="2300">
    <p>$2000</p>
    <input class="radio-button" type="radio" name="simple" value="2000">
    <button class="counter-button" onclick="updateCounter(1, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(1, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">pan - carne</p>
  <button class="boton-extras" data-button-number="1" onclick="toggleExtras(1)">Extras</button>
  <div class="div-extras" id="extrasList1" data-button-number="1" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(1)">Agregar al pedido</button>
  </div>


  <div class="div-botones-submenu" data-button-number="2">
    <button class="menu-button sub-menu-button" data-button-number="2">S. Queso</button>
    <p>$2650</p>
    <input class="radio-button" type="radio" name="queso" value="2650">
    <p>$2350</p>
    <input class="radio-button" type="radio" name="queso" value="2350">
    <button class="counter-button" onclick="updateCounter(2, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(2, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">pan - carne - queso</p>
  <button class="boton-extras" data-button-number="2" onclick="toggleExtras(2)">Extras</button>
  <div class="div-extras" id="extrasList2" data-button-number="2" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(2)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="3">
    <button class="menu-button sub-menu-button" data-button-number="3">Napoleon</button>
    <p>$2700</p>
    <input class="radio-button" type="radio" name="napoleon" value="2700">
    <p>$2400</p>
    <input class="radio-button" type="radio" name="napoleon" value="2400">
    <button class="counter-button" onclick="updateCounter(3, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(3, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">tomate asado - queso - oregano - mayonesa</p>
  <button class="boton-extras" data-button-number="3" onclick="toggleExtras(3)">Extras</button>
  <div class="div-extras" id="extrasList3" data-button-number="3" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(3)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="4">
    <button class="menu-button sub-menu-button" data-button-number="4">Classic</button>
    <p>$2700</p>
    <input class="radio-button" type="radio" name="classic" value="2700">
    <p>$2400</p>
    <input class="radio-button" type="radio" name="classic" value="2400">
    <button class="counter-button" onclick="updateCounter(4, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(4, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">lechuga - tomate</p>
  <button class="boton-extras" data-button-number="4" onclick="toggleExtras(4)">Extras</button>
  <div class="div-extras" id="extrasList4" data-button-number="4" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(4)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="5">
    <button class="menu-button sub-menu-button" data-button-number="5">Fusion</button>
    <p>$2600</p>
    <input class="radio-button" type="radio" name="fusion" value="2600">
    <p>$2400</p>
    <input class="radio-button" type="radio" name="fusion" value="2400">
    <button class="counter-button" onclick="updateCounter(5, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(5, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">jamon - queso</p>
  <button class="boton-extras" data-button-number="5" onclick="toggleExtras(5)">Extras</button>
  <div class="div-extras" id="extrasList5" data-button-number="5" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(5)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="6">
    <button class="menu-button sub-menu-button" data-button-number="6">Cuarto</button>
    <p>$2850</p>
    <input class="radio-button" type="radio" name="cuarto" value="2850">
    <p>$2550</p>
    <input class="radio-button" type="radio" name="cuarto" value="2550">
    <button class="counter-button" onclick="updateCounter(6, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(6, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">doble queso - salsa de cebolla</p>
  <button class="boton-extras" data-button-number="6" onclick="toggleExtras(6)">Extras</button>
  <div class="div-extras" id="extrasList6" data-button-number="6" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(6)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="7">
    <button class="menu-button sub-menu-button" data-button-number="7">Magnifica</button> 
    <p>$2850</p>
    <input class="radio-button" type="radio" name="magnifica" value="2850">
    <p>$2550</p>
    <input class="radio-button" type="radio" name="magnifica" value="2550">
    <button class="counter-button" onclick="updateCounter(7, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(7, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">tomate - lechuga - cebolla - queso - salsa</p>
  <button class="boton-extras" data-button-number="7" onclick="toggleExtras(7)">Extras</button>
  <div class="div-extras" id="extrasList7" data-button-number="7" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(7)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="8">
    <button class="menu-button sub-menu-button" data-button-number="8">Napolitano</button>
    <p>$2850</p>
    <input class="radio-button" type="radio" name="napolitano" value="2850">
    <p>$2550</p>
    <input class="radio-button" type="radio" name="napolitano" value="2550">
    <button class="counter-button" onclick="updateCounter(8, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(8, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">jamon - queso - tomate - cebolla - ketchup</p>
  <button class="boton-extras" data-button-number="8" onclick="toggleExtras(8)">Extras</button>
  <div class="div-extras" id="extrasList8" data-button-number="8" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(8)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="9">
    <button class="menu-button sub-menu-button" data-button-number="9">Completa</button>
    <p>$3000</p>
    <input class="radio-button" type="radio" name="completa" value="3000">
    <p>$2700</p>
    <input class="radio-button" type="radio" name="completa" value="2700">
    <button class="counter-button" onclick="updateCounter(9, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(9, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">falta info</p>
  <button class="boton-extras" data-button-number="9" onclick="toggleExtras(9)">Extras</button>
  <div class="div-extras" id="extrasList9" data-button-number="9" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(9)">Agregar al pedido</button>
  </div>
`;





    subMenu.innerHTML = buttonsHTML;

    subMenuVisible = true;
    subMenu.style.display = "flex";
    subMenu.offsetHeight;
    subMenu.style.opacity = "1";
    subMenu.style.transform = "translateY(0)";
    subMenu.style.visibility = "visible";
    subMenu.style.flexDirection = "column";
    subMenu.style.rowGap = "10px";
    subMenu.style.padding = "10px"
    subMenu.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    boton1.classList.add('active');
    subMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuButtons = document.querySelectorAll('.menu-button');
    subMenuButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenu.innerHTML = '';
    }, subMenuButtons.length * 100);

    subMenuVisible = false;

    subMenu.style.opacity = "0";
    subMenu.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenu.style.visibility = "hidden";
      subMenu.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    boton1.classList.remove('active');
  }
}

function toggleSubMenuDos() {
  const subMenuDos = document.getElementById('subMenuDos');
  const boton2 = document.getElementById('boton2');

  if (!subMenuDosVisible) {
    const buttonsHTML = `
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
  <div class="div-botones-submenu" data-button-number="10">
    <button class="menu-button sub-menu-button" data-button-number="10">Doble Cuarto</button>
    <p>$3600</p>
    <input class="radio-button" type="radio" name="doble-cuarto" value="3600">
    <p>$3300</p>
    <input class="radio-button" type="radio" name="doble-cuarto" value="3300">
    <button class="counter-button" onclick="updateCounter(10, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(10, 'increment')">+</button>
  </div> 
  <p id="parrafos-detalles">carne x2 - queso x2 - salsa de cebolla</p>
  <button class="boton-extras" data-button-number="10" onclick="toggleExtras(10)">Extras</button>
  <div class="div-extras" id="extrasList10" data-button-number="10" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(10)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="11">
    <button class="menu-button sub-menu-button" data-button-number="11">Doble Napoleon</button>
    <p>$3600</p>
    <input class="radio-button" type="radio" name="doble-napoleon" value="3600">
    <p>$3300</p>
    <input class="radio-button" type="radio" name="doble-napoleon" value="3300">
    <button class="counter-button" onclick="updateCounter(11, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(11, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - queso x2 - tomate asado - oregano - mayonesa</p>
  <button class="boton-extras" data-button-number="11" onclick="toggleExtras(11)">Extras</button>
  <div class="div-extras" id="extrasList11" data-button-number="11" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(11)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="12">
    <button class="menu-button sub-menu-button" data-button-number="12">Doble Magnifica</button>
    <p>$3550</p>
    <input class="radio-button" type="radio" name="doble-magnifica" value="3550">
    <p>$3350</p>
    <input class="radio-button" type="radio" name="doble-magnifica" value="3350">
    <button class="counter-button" onclick="updateCounter(12, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(12, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - queso - lechuga - tomate - aros de cebolla</p>
  <button class="boton-extras" data-button-number="12" onclick="toggleExtras(12)">Extras</button>
  <div class="div-extras" id="extrasList12" data-button-number="12" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(12)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="13">
    <button class="menu-button sub-menu-button" data-button-number="13">Doble Napolitano</button>
    <p>$3550</p>
    <input class="radio-button" type="radio" name="doble-napolitano" value="3550">
    <p>$3350</p>
    <input class="radio-button" type="radio" name="doble-napolitano" value="3350">
    <button class="counter-button" onclick="updateCounter(13, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(13, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - queso x2 - jamon x2 - cebolla - tomate - ketchup</p>
  <button class="boton-extras" data-button-number="13" onclick="toggleExtras(13)">Extras</button>
  <div class="div-extras" id="extrasList13" data-button-number="13" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(13)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="14">
    <button class="menu-button sub-menu-button" data-button-number="14">Onion</button>
    <p>$3550</p>
    <input class="radio-button" type="radio" name="onion" value="3550">
    <p>$3350</p>
    <input class="radio-button" type="radio" name="onion" value="3350">
    <button class="counter-button" onclick="updateCounter(14, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(14, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - triple queso - cebolla caramelizada</p>
  <button class="boton-extras" data-button-number="14" onclick="toggleExtras(14)">Extras</button>
  <div class="div-extras" id="extrasList14" data-button-number="14" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(14)">Agregar al pedido</button>
  </div>


  <div class="div-botones-submenu" data-button-number="15">
    <button class="menu-button sub-menu-button" data-button-number="15">Whopper</button>
    <p>$3600</p>
    <input class="radio-button" type="radio" name="whopper" value="3600">
    <p>$3300</p>
    <input class="radio-button" type="radio" name="whopper" value="3300">
    <button class="counter-button" onclick="updateCounter(15, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(15, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - lechuga - tomate - pepino - cebolla morada - salsa</p>
  <button class="boton-extras" data-button-number="15" onclick="toggleExtras(15)">Extras</button>
  <div class="div-extras" id="extrasList15" data-button-number="15" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(15)">Agregar al pedido</button>
  </div>


  <div class="div-botones-submenu" data-button-number="16">
    <button class="menu-button sub-menu-button" data-button-number="16">Duo</button> 
    <p>$3700</p>
    <input class="radio-button" type="radio" name="duo" value="3700">
    <p>$3400</p>
    <input class="radio-button" type="radio" name="duo" value="3400">
    <button class="counter-button" onclick="updateCounter(16, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(16, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - jamon y queso x2</p>
  <button class="boton-extras" data-button-number="16" onclick="toggleExtras(16)">Extras</button>
  <div class="div-extras" id="extrasList16" data-button-number="16" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(16)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="17">
    <button class="menu-button sub-menu-button" data-button-number="17">Club House</button>
    <p>$3800</p>
    <input class="radio-button" type="radio" name="club-house" value="3800">
    <p>$3500</p>
    <input class="radio-button" type="radio" name="club-house" value="3500">
    <button class="counter-button" onclick="updateCounter(17, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(17, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - cebolla caramelizada - bacon - lechuga - tomate - queso</p>
  <button class="boton-extras" data-button-number="17" onclick="toggleExtras(17)">Extras</button>
  <div class="div-extras" id="extrasList17" data-button-number="17" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(17)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="18">
    <button class="menu-button sub-menu-button" data-button-number="18">BBQ</button>
    <p>$3700</p>
    <input class="radio-button" type="radio" name="bbq" value="3700">
    <p>$3400</p>
    <input class="radio-button" type="radio" name="bbq" value="3400">
    <button class="counter-button" onclick="updateCounter(18, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(18, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - cebolla caramelizada - queso blanco - bacon - barbacoa</p>
  <button class="boton-extras" data-button-number="18" onclick="toggleExtras(18)">Extras</button>
  <div class="div-extras" id="extrasList18" data-button-number="18" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(18)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="19">
    <button class="menu-button sub-menu-button" data-button-number="19">Melo City</button>
    <p>$3700</p>
    <input class="radio-button" type="radio" name="melo-city" value="3700">
    <p>$3400</p>
    <input class="radio-button" type="radio" name="melo-city" value="3400">
    <button class="counter-button" onclick="updateCounter(19, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(19, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">2 carnes - papas pay - cheddar fundido - bacon</p>
  <button class="boton-extras" data-button-number="19" onclick="toggleExtras(19)">Extras</button>
  <div class="div-extras" id="extrasList19" data-button-number="19" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(19)">Agregar al pedido</button>
  </div>


  <div class="div-botones-submenu" data-button-number="20">
    <button class="menu-button sub-menu-button" data-button-number="20">Dorito</button>
    <p>$3700</p>
    <input class="radio-button" type="radio" name="dorito" value="3700">
    <p>$3400</p>
    <input class="radio-button" type="radio" name="dorito" value="3400">
    <button class="counter-button" onclick="updateCounter(20, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(20, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - triple queso - doritos</p>
  <button class="boton-extras" data-button-number="20" onclick="toggleExtras(20)">Extras</button>
  <div class="div-extras" id="extrasList20" data-button-number="20" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(20)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="21">
    <button class="menu-button sub-menu-button" data-button-number="21">Baconator</button>
    <p>$4300</p>
    <input class="radio-button" type="radio" name="baconator" value="4300">
    <p>$4000</p>
    <input class="radio-button" type="radio" name="baconator" value="4000">
    <button class="counter-button" onclick="updateCounter(21, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(21, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - cheddar fundido x2 - bacon x2</p>
  <button class="boton-extras" data-button-number="21" onclick="toggleExtras(21)">Extras</button>
  <div class="div-extras" id="extrasList21" data-button-number="21" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(21)">Agregar al pedido</button>
  </div>
  

  <div class="div-botones-submenu" data-button-number="22">
    <button class="menu-button sub-menu-button" data-button-number="22">Big King</button>
    <p>$4100</p>
    <input class="radio-button" type="radio" name="big-king" value="4100">
    <p>$3800</p>
    <input class="radio-button" type="radio" name="big-king" value="3800">
    <button class="counter-button" onclick="updateCounter(22, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(22, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - lechuga x2 - cebolla x2 - pepino - queso x2 - salsa big</p>
  <button class="boton-extras" data-button-number="22" onclick="toggleExtras(22)">Extras</button>
  <div class="div-extras" id="extrasList22" data-button-number="22" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(22)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="23">
    <button class="menu-button sub-menu-button" data-button-number="23">Staker</button>
    <p>$3900</p>
    <input class="radio-button" type="radio" name="staker" value="3900">
    <p>$3600</p>
    <input class="radio-button" type="radio" name="staker" value="3600">
    <button class="counter-button" onclick="updateCounter(23, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(23, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - queso x2 - bacon - salsa staker</p>
  <button class="boton-extras" data-button-number="23" onclick="toggleExtras(23)">Extras</button>
  <div class="div-extras" id="extrasList23" data-button-number="23" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(23)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="24">
    <button class="menu-button sub-menu-button" data-button-number="24">Mega Turbo Tasty</button> 
    <p>$4500</p>
    <input class="radio-button" type="radio" name="mega-turbo-tasty" value="4500">
    <p>$4200</p>
    <input class="radio-button" type="radio" name="mega-turbo-tasty" value="4200">
    <button class="counter-button" onclick="updateCounter(24, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(24, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - cheddar x4 - lechuga - tomate - salsa tasty x2 - bacon en tira/picado</p>
  <button class="boton-extras" data-button-number="24" onclick="toggleExtras(24)">Extras</button>
  <div class="div-extras" id="extrasList24" data-button-number="24" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(24)">Agregar al pedido</button>
  </div>

  <div class="div-botones-submenu" data-button-number="25">
    <button class="menu-button sub-menu-button" data-button-number="25">Triple Cuarto</button>
    <p>$4600</p>
    <input class="radio-button" type="radio" name="triple-cuarto" value="4600">
    <p>$4300</p>
    <input class="radio-button" type="radio" name="triple-cuarto" value="4300">
    <button class="counter-button" onclick="updateCounter(25, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(25, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x3 - queso x3 - salsa de cebolla</p>
  <button class="boton-extras" data-button-number="25" onclick="toggleExtras(25)">Extras</button>
  <div class="div-extras" id="extrasList25" data-button-number="25" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(25)">Agregar al pedido</button>
  </div>


  <div class="div-botones-submenu" data-button-number="26">
    <button class="menu-button sub-menu-button" data-button-number="26">Triple Bacon</button>
    <p>$4900</p>
    <input class="radio-button" type="radio" name="triple-bacon" value="4900">
    <p>$5200</p>
    <input class="radio-button" type="radio" name="triple-bacon" value="5200">
    <button class="counter-button" onclick="updateCounter(26, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(26, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">carne x2 - queso x3 - bacon - salsa de cebolla</p>
  <button class="boton-extras" data-button-number="26" onclick="toggleExtras(26)">Extras</button>
  <div class="div-extras" id="extrasList26" data-button-number="26" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(20)">Agregar al pedido</button>
  </div>
`;




    subMenuDos.innerHTML = buttonsHTML;

    subMenuDosVisible = true;
    subMenuDos.style.display = "flex";
    subMenuDos.offsetHeight;
    subMenuDos.style.opacity = "1";
    subMenuDos.style.transform = "translateY(0)";
    subMenuDos.style.visibility = "visible";
    subMenuDos.style.flexDirection = "column";
    subMenuDos.style.rowGap = "10px";
    subMenuDos.style.padding = "10px"
    subMenuDos.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    boton2.classList.add('active');

    subMenuDos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuDosButtons = document.querySelectorAll('.menu-button');
    subMenuDosButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuDos.innerHTML = '';
    }, subMenuDosButtons.length * 100);

    subMenuDosVisible = false;

    subMenuDos.style.opacity = "0";
    subMenuDos.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuDos.style.visibility = "hidden";
      subMenuDos.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    boton2.classList.remove('active');


  }
}

function toggleSubMenuTres() {
  const subMenuTres = document.getElementById('subMenuTres');
  const boton3 = document.getElementById('boton3');

  if (!subMenuTresVisible) {
    const buttonsHTML = `
    
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
<div class="div-botones-submenu" data-button-number="27">
<button class="menu-button sub-menu-button" data-button-number="27">Papas regulares</button>
<p>$2100</p>
<input class="radio-button" type="radio" name="papas-regulares" value="2100">
<p>$1800</p>
<input class="radio-button" type="radio" name="papas-regulares" value="1800">
<button class="counter-button" onclick="updateCounter(27, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(27, 'increment')">+</button>
</div> 
<p id="parrafos-detalles">papas paquete regular</p>
<button class="boton-extras" data-button-number="27" onclick="toggleExtras(27)">Extras</button>
  <div class="div-extras" id="extrasList27" data-button-number="27" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(27)">Agregar al pedido</button>
  </div>

<div class="div-botones-submenu" data-button-number="28">
<button class="menu-button sub-menu-button" data-button-number="28">Papas medianas</button>
<p>$2600</p>
<input class="radio-button" type="radio" name="papas-medianas" value="2600">
<p>$2300</p>
<input class="radio-button" type="radio" name="papas-medianas" value="2300">
<button class="counter-button" onclick="updateCounter(28, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(28, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas paquete mediano</p>
<button class="boton-extras" data-button-number="28" onclick="toggleExtras(28)">Extras</button>
  <div class="div-extras" id="extrasList28" data-button-number="28" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(28)">Agregar al pedido</button>
  </div>

<div class="div-botones-submenu" data-button-number="29">
<button class="menu-button sub-menu-button" data-button-number="29">Papas Grandes</button>
<p>$3000</p>
<input class="radio-button" type="radio" name="papas-grandes" value="3000">
<p>$2700</p>
<input class="radio-button" type="radio" name="papas-grandes" value="2700">
<button class="counter-button" onclick="updateCounter(29, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(29, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas paquete grande</p>
<button class="boton-extras" data-button-number="29" onclick="toggleExtras(29)">Extras</button>
  <div class="div-extras" id="extrasList29" data-button-number="29" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(29)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="30">
<button class="menu-button sub-menu-button" data-button-number="30">Papas McKing</button>
<p>$3300</p>
<input class="radio-button" type="radio" name="papas-mcking" value="3300">
<p>$3000</p>
<input class="radio-button" type="radio" name="papas-mcking" value="3000">
<button class="counter-button" onclick="updateCounter(30, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(30, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - jamon - verdeo</p>
<button class="boton-extras" data-button-number="30" onclick="toggleExtras(30)">Extras</button>
  <div class="div-extras" id="extrasList30" data-button-number="30" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(30)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="31">
<button class="menu-button sub-menu-button" data-button-number="31">Papas Solo Cheddar</button>
<p>$3050</p>
<input class="radio-button" type="radio" name="solo-cheddar" value="3050">
<p>$2750</p>
<input class="radio-button" type="radio" name="solo-cheddar" value="2750">
<button class="counter-button" onclick="updateCounter(31, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(31, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar</p>
<button class="boton-extras" data-button-number="31" onclick="toggleExtras(31)">Extras</button>
  <div class="div-extras" id="extrasList31" data-button-number="31" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(31)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="32">
<button class="menu-button sub-menu-button" data-button-number="32">Cheddar y Bacon</button>
<p>$3300</p>
<input class="radio-button" type="radio" name="cheddar-bacon" value="3300">
<p>$3000</p>
<input class="radio-button" type="radio" name="cheddar-bacon" value="3000">
<button class="counter-button" onclick="updateCounter(32, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(32, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - bacon</p>

<button class="boton-extras" data-button-number="32" onclick="toggleExtras(32)">Extras</button>
  <div class="div-extras" id="extrasList32" data-button-number="32" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(32)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="33">
<button class="menu-button sub-menu-button" data-button-number="33">Papas Doritos</button> 
<p>$2450</p>
<input class="radio-button" type="radio" name="papas-doritos" value="2450">
<p>$2150</p> 
<input class="radio-button" type="radio" name="papas-doritos" value="2150">
<button class="counter-button" onclick="updateCounter(33, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(33, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - doritos</p>
<button class="boton-extras" data-button-number="33" onclick="toggleExtras(33)">Extras</button>
  <div class="div-extras" id="extrasList33" data-button-number="33" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(33)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="34">
<button class="menu-button sub-menu-button" data-button-number="34">Papas Huevo</button>
<p>$3300</p>
<input class="radio-button" type="radio" name="papas-huevos" value="3300">
<p>$3000</p>
<input class="radio-button" type="radio" name="papas-huevo" value="3000">
<button class="counter-button" onclick="updateCounter(34, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(34, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - huevo frito</p>
<button class="boton-extras" data-button-number="34" onclick="toggleExtras(34)">Extras</button>
  <div class="div-extras" id="extrasList34" data-button-number="34" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(34)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="35">
<button class="menu-button sub-menu-button" data-button-number="35">Papas Bajón</button>
<p>$3900</p>
<input class="radio-button" type="radio" name="papas-bajon" value="3900">
<p>$3600</p>
<input class="radio-button" type="radio" name="papas-bajon" value="3600">
<button class="counter-button" onclick="updateCounter(35, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(35, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - verdeo - carne</p>

<button class="boton-extras" data-button-number="35" onclick="toggleExtras(35)">Extras</button>
  <div class="div-extras" id="extrasList35" data-button-number="35" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(35)">Agregar al pedido</button>
  </div>



<div class="div-botones-submenu" data-button-number="36">
<button class="menu-button sub-menu-button" data-button-number="36">Papas Nuggets</button>
<p>$3700</p>
<input class="radio-button" type="radio" name="papas-nuggets" value="3700">
<p>$3400</p>
<input class="radio-button" type="radio" name="papas-nuggets" value="3400">
<button class="counter-button" onclick="updateCounter(36, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(36, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - verdeo - jamon - nuggets</p>
<button class="boton-extras" data-button-number="36" onclick="toggleExtras(36)">Extras</button>
  <div class="div-extras" id="extrasList36" data-button-number="36" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(36)">Agregar al pedido</button>
  </div>

<div class="div-botones-submenu" data-button-number="37">
<button class="menu-button sub-menu-button" data-button-number="37">Papas Tapa Arterias</button>
<p>$4200</p>
<input class="radio-button" type="radio" name="papas-tapa-arterias" value="4200">
<p>$3900</p>
<input class="radio-button" type="radio" name="papas-tapa-arterias" value="3900">
<button class="counter-button" onclick="updateCounter(37, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(37, 'increment')">+</button>
</div>
<p id="parrafos-detalles">papas - cheddar - bacon - jamon - verdeo - huevo frito - carne</p>
<button class="boton-extras" data-button-number="37" onclick="toggleExtras(37)">Extras</button>
  <div class="div-extras" id="extrasList37" data-button-number="37" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(37)">Agregar al pedido</button>
  </div>

<div class="div-botones-submenu" data-button-number="38">
<button class="menu-button sub-menu-button" data-button-number="38">Nuggets</button>
<p>$3500</p>
<input class="radio-button" type="radio" name="nuggets" value="3500">
<p>$3200</p>
<input class="radio-button" type="radio" name="nuggets" value="3200">
<button class="counter-button" onclick="updateCounter(38, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(38, 'increment')">+</button>
</div>
<p id="parrafos-detalles">nuggets x10</p>
<button class="boton-extras" data-button-number="38" onclick="toggleExtras(38)">Extras</button>
  <div class="div-extras" id="extrasList38" data-button-number="38" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(38)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="39">
<button class="menu-button sub-menu-button" data-button-number="39">Aros de cebolla</button>
<p>$3400</p>
<input class="radio-button" type="radio" name="aros-de-cebolla" value="3400">
<p>$3100</p>
<input class="radio-button" type="radio" name="aros-de-cebolla" value="3100">
<button class="counter-button" onclick="updateCounter(39, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(39, 'increment')">+</button>
</div>
<p id="parrafos-detalles">aros de cebolla x10</p>
<button class="boton-extras" data-button-number="39" onclick="toggleExtras(39)">Extras</button>
  <div class="div-extras" id="extrasList39" data-button-number="39" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(39)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="40">
<button class="menu-button sub-menu-button" data-button-number="40">Aros de cebolla</button>
<p>$6200</p>
<input class="radio-button" type="radio" name="aros-de-cebolla20" value="6200">
<p>$5900</p>
<input class="radio-button" type="radio" name="aros-de-cebolla20" value="5900">
<button class="counter-button" onclick="updateCounter(40, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(40, 'increment')">+</button>
</div>
<p id="parrafos-detalles">aros de cebolla x20</p>

<button class="boton-extras" data-button-number="40" onclick="toggleExtras(40)">Extras</button>
  <div class="div-extras" id="extrasList40" data-button-number="40" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(40)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="41">
<button class="menu-button sub-menu-button" data-button-number="41">Tequeños de queso</button> 
<p>$3450</p>
<input class="radio-button" type="radio" name="tequeño-queso" value="3450">
<p>$3150</p>
<input class="radio-button" type="radio" name="tequeño-queso" value="3150">
<button class="counter-button" onclick="updateCounter(41, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(41, 'increment')">+</button>
</div>
<p id="parrafos-detalles">tequeños de queso x6</p>
<button class="boton-extras" data-button-number="41" onclick="toggleExtras(41)">Extras</button>
  <div class="div-extras" id="extrasList41" data-button-number="41" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(41)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="42">
<button class="menu-button sub-menu-button" data-button-number="42">Tequeños de JyQ x6</button>
<p>$3600</p>
<input class="radio-button" type="radio" name="tequeño-jyq" value="3600">
<p>$3300</p>
<input class="radio-button" type="radio" name="tequeño-jyq" value="3300">
<button class="counter-button" onclick="updateCounter(42, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(42, 'increment')">+</button>
</div>
<p id="parrafos-detalles">tequeños de jamon y queso x6</p>

<button class="boton-extras" data-button-number="42" onclick="toggleExtras(42)">Extras</button>
  <div class="div-extras" id="extrasList42" data-button-number="42" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(42)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="43">
<button class="menu-button sub-menu-button" data-button-number="43">Tequeños Mixtos x6</button>
<p>$3700</p>
<input class="radio-button" type="radio" name="tequeños-mixtos" value="3700">
<p>$3400</p>
<input class="radio-button" type="radio" name="tequeños-mixtos" value="3400">
<button class="counter-button" onclick="updateCounter(43, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(43, 'increment')">+</button>
</div>
<p id="parrafos-detalles">tequeños queso x3 - tequeños jamon y queso x3</p>
<button class="boton-extras" data-button-number="43" onclick="toggleExtras(43)">Extras</button>
  <div class="div-extras" id="extrasList43" data-button-number="43" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(43)">Agregar al pedido</button>
  </div>

`;




    subMenuTres.innerHTML = buttonsHTML;

    subMenuTresVisible = true;
    subMenuTres.style.display = "flex";
    subMenuTres.offsetHeight;
    subMenuTres.style.opacity = "1";
    subMenuTres.style.transform = "translateY(0)";
    subMenuTres.style.visibility = "visible";
    subMenuTres.style.flexDirection = "column";
    subMenuTres.style.rowGap = "10px";
    subMenuTres.style.padding = "10px"
    subMenuTres.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    boton3.classList.add('active');


    subMenuTres.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuTresButtons = document.querySelectorAll('.menu-button');
    subMenuTresButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuTres.innerHTML = '';
    }, subMenuTresButtons.length * 100);

    subMenuTresVisible = false;

    subMenuTres.style.opacity = "0";
    subMenuTres.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuTres.style.visibility = "hidden";
      subMenuTres.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    boton3.classList.remove('active');


  }
}

function toggleSubMenuCuatro() {
  const subMenuCuatro = document.getElementById('subMenuCuatro');
  const boton4 = document.getElementById('boton4');

  if (!subMenuCuatroVisible) {
    const buttonsHTML = `
    
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
<div class="div-botones-submenu" data-button-number= "44">
<button class="menu-button sub-menu-button" data-button-number=44">Super Pollo</button>
<p>$2900</p>
<input class="radio-button" type="radio" name="super-pollo" value="2900">
<p>$2500</p>
<input class="radio-button" type="radio" name="super-pollo" value="2500">
<button class="counter-button" onclick="updateCounter(44, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(44, 'increment')">+</button>
</div> 
<p id="parrafos-detalles">pollo - mayonesa - cebolla - lechuga - tomate</p>
<button class="boton-extras" data-button-number="44" onclick="toggleExtras(44)">Extras</button>
  <div class="div-extras" id="extrasList44" data-button-number="44" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(44)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="45">
<button class="menu-button sub-menu-button" data-button-number="45">Pollonator</button>
<p>$3000</p>
<input class="radio-button" type="radio" name="pollonator" value="3000">
<p>$2700</p>
<input class="radio-button" type="radio" name="pollonator" value="2700">
<button class="counter-button" onclick="updateCounter(45, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(45, 'increment')">+</button>
</div>
<p id="parrafos-detalles">pollo - mayonesa - lechuga - bacon - cheddar</p>
<button class="boton-extras" data-button-number="45" onclick="toggleExtras(45)">Extras</button>
  <div class="div-extras" id="extrasList45" data-button-number="45" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(45)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="46">
<button class="menu-button sub-menu-button" data-button-number="46">Big Pollo</button>
<p>$3450</p>
<input class="radio-button" type="radio" name="big-pollo" value="3450">
<p>$3150</p>
<input class="radio-button" type="radio" name="big-pollo" value="3150">
<button class="counter-button" onclick="updateCounter(46, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(46, 'increment')">+</button>
</div>
<p id="parrafos-detalles">pollo x2 - lechuga - pepino - cheddar x2 - pan x3 - cebolla </p>
<button class="boton-extras" data-button-number="46" onclick="toggleExtras(46)">Extras</button>
  <div class="div-extras" id="extrasList46" data-button-number="46" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(46)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="47">
<button class="menu-button sub-menu-button" data-button-number="47">Coronel Supremo</button>
<p>$3250</p>
<input class="radio-button" type="radio" name="coronel-supremo" value="3250">
<p>$2850</p>
<input class="radio-button" type="radio" name="coronel-supremo" value="2850">
<button class="counter-button" onclick="updateCounter(47, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(47, 'increment')">+</button>
</div>
<p id="parrafos-detalles">pollo x2 - cheddar x2 - lechuga - mayonesa</p>
<button class="boton-extras" data-button-number="47" onclick="toggleExtras(47)">Extras</button>
  <div class="div-extras" id="extrasList47" data-button-number="47" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(47)">Agregar al pedido</button>
  </div>


`;

    subMenuCuatro.innerHTML = buttonsHTML;

    subMenuCuatroVisible = true;
    subMenuCuatro.style.display = "flex";
    subMenuCuatro.offsetHeight;
    subMenuCuatro.style.opacity = "1";
    subMenuCuatro.style.transform = "translateY(0)";
    subMenuCuatro.style.visibility = "visible";
    subMenuCuatro.style.flexDirection = "column";
    subMenuCuatro.style.rowGap = "10px";
    subMenuCuatro.style.padding = "10px"
    subMenuCuatro.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    boton4.classList.add('active');


    subMenuCuatro.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuCuatroButtons = document.querySelectorAll('.menu-button');
    subMenuCuatroButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuCuatro.innerHTML = '';
    }, subMenuCuatroButtons.length * 100);

    subMenuCuatroVisible = false;

    subMenuCuatro.style.opacity = "0";
    subMenuCuatro.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuCuatro.style.visibility = "hidden";
      subMenuCuatro.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    boton4.classList.remove('active');

  }
}

function toggleSubMenuCinco() {
  const subMenuCinco = document.getElementById('subMenuCinco');
  const boton5 = document.getElementById('boton5');

  if (!subMenuCincoVisible) {
    const buttonsHTML = `
    
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
<div class="div-botones-submenu" data-button-number="48">
<button class="menu-button sub-menu-button" data-button-number=48">Cajita McKing infantil</button>
<p>$5200</p>
<input class="radio-button" type="radio" name="menu-infantil" value="5200">
<p>$4900</p>
<input class="radio-button" type="radio" name="menu-infantil" value="4900">
<button class="counter-button" onclick="updateCounter(48, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(48, 'increment')">+</button>
</div>
<button class="boton-extras" data-button-number="48" onclick="toggleExtras(48)">Extras</button>
  <div class="div-extras" id="extrasList48" data-button-number="48" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(48)">Agregar al pedido</button>
  </div> 

 <div class="div-botones-submenu" data-button-number="49">
  <button class="menu-button sub-menu-button" data-button-number="49">Combo del dia</button>
  <p>$4100</p>
  <input class="radio-button" type="radio" name="combo-del-dia" value="4100">
  <p>$3800</p>
  <input class="radio-button" type="radio" name="combo-del-dia" value="3800">
  <button class="counter-button" onclick="updateCounter(49, 'decrement')">-</button>
  <span class="counter-value">0</span>
  <button class="counter-button" onclick="updateCounter(49, 'increment')">+</button>
</div>

<button class="boton-extras" data-button-number="49" onclick="toggleExtras(49)">Extras</button>
  <div class="div-extras" id="extrasList49" data-button-number="49" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(49)">Agregar al pedido</button>
  </div>

<p id="parrafos-pago">Efectivo</p>

<div class="div-botones-submenu" data-button-number="50">
<button class="menu-button sub-menu-button" data-button-number="50">Combo Mediano</button>
<p>$2700</p>
<input class="radio-button" type="radio" name="combo-mediano" value="2700">
<button class="counter-button" onclick="updateCounter(50, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(50, 'increment')">+</button>
</div>
<button class="boton-extras" data-button-number="50" onclick="toggleExtras(50)">Extras</button>
  <div class="div-extras" id="extrasList50" data-button-number="50" style="display: none;">
  </div
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(50)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="51">
<button class="menu-button sub-menu-button" data-button-number="51">Gaseosas</button>
<p>$950</p>
<input class="radio-button" type="radio" name="Gaseosas" value="950">
<button class="counter-button" onclick="updateCounter(51, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(51, 'increment')">+</button>
</div>



<div class="div-botones-submenu" data-button-number="52">
<button class="menu-button sub-menu-button" data-button-number="52">Agua</button>
<p>$650</p>
<input class="radio-button" type="radio" name="agua" value="650">
<button class="counter-button" onclick="updateCounter(52, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(52, 'increment')">+</button>
</div>
`;




    subMenuCinco.innerHTML = buttonsHTML;

    subMenuCincoVisible = true;
    subMenuCinco.style.display = "flex";
    subMenuCinco.offsetHeight;
    subMenuCinco.style.opacity = "1";
    subMenuCinco.style.transform = "translateY(0)";
    subMenuCinco.style.visibility = "visible";
    subMenuCinco.style.flexDirection = "column";
    subMenuCinco.style.rowGap = "10px";
    subMenuCinco.style.padding = "10px"
    subMenuCinco.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    boton5.classList.add('active');


    subMenuCinco.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuCincoButtons = document.querySelectorAll('.menu-button');
    subMenuCincoButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuCinco.innerHTML = '';
    }, subMenuCincoButtons.length * 100);

    subMenuCincoVisible = false;

    subMenuCinco.style.opacity = "0";
    subMenuCinco.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuCinco.style.visibility = "hidden";
      subMenuCinco.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    boton5.classList.remove('active');

  }
}

function toggleSubMenuMila() {
  const subMenuMila = document.getElementById('subMenuMila');
  const botonMila = document.getElementById('botonMila');

  if (!subMenuMilaVisible) {
    const buttonsHTML = `
    
    <div class="metodo-pago">
    <p id="parrafos-pago">MercadoPago</p>
    <p id="parrafos-pago">Efectivo</p>
    </div>
  <div class="div-botones-submenu" data-button-number="53">
    <button class="menu-button sub-menu-button" data-button-number=53">Sandwich Milanesa Completo</button>
    <p>$4800</p>
    <input class="radio-button" type="radio" name="milanese-completa" value="4800">
    <p>$4500</p>
    <input class="radio-button" type="radio" name="milanesa-completa" value="4500">
    <button class="counter-button" onclick="updateCounter(53, 'decrement')">-</button>
    <span class="counter-value">0</span>
    <button class="counter-button" onclick="updateCounter(53, 'increment')">+</button>
  </div>
  <p id="parrafos-detalles">lechuga - tomate - jamon - muzzarella - huevo + papas medianas</p>
<button class="boton-extras" data-button-number="53" onclick="toggleExtras(53)">Extras</button>
  <div class="div-extras" id="extrasList53" data-button-number="53" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(53)">Agregar al pedido</button>
  </div>


  <p id="parrafos-pago">Al plato</p>

 <div class="div-botones-submenu" data-button-number="54">
  <button class="menu-button sub-menu-button" data-button-number="54">Milanesa McKing</button>
  <p>$4150</p>
  <input class="radio-button" type="radio" name="milanesa-mcking" value="4150">
  <p>$3850</p>
  <input class="radio-button" type="radio" name="milanesa-mcking" value="3850">
  <button class="counter-button" onclick="updateCounter(54, 'decrement')">-</button>
  <span class="counter-value">0</span>
  <button class="counter-button" onclick="updateCounter(54, 'increment')">+</button>
</div>
<p id="parrafos-detalles">cheddar - verdeo - jamon + papas grandes</p>
<button class="boton-extras" data-button-number="54" onclick="toggleExtras(54)">Extras</button>
  <div class="div-extras" id="extrasList54" data-button-number="54" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(54)">Agregar al pedido</button>
  </div>

<div class="div-botones-submenu" data-button-number="55">
<button class="menu-button sub-menu-button" data-button-number="55">Milanesa Cheddar Bacon</button>
<p>$4150</p>
<input class="radio-button" type="radio" name="milanesa-cheddar-bacon" value="4150">
<p>$3850</p>
<input class="radio-button" type="radio" name="milanesa-cheddar-bacon" value="3850">
<button class="counter-button" onclick="updateCounter(55, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(55, 'increment')">+</button>
</div>
<p id="parrafos-detalles">cheddar fundido - bacon picado + papas grandes</p>
<button class="boton-extras" data-button-number="55" onclick="toggleExtras(55)">Extras</button>
  <div class="div-extras" id="extrasList55" data-button-number="55" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(55)">Agregar al pedido</button>
  </div>


<div class="div-botones-submenu" data-button-number="56">
<button class="menu-button sub-menu-button" data-button-number="56">Milanesa napolitano</button>
<p>$4150</p>
<input class="radio-button" type="radio" name="milanesa-napolitano" value="4150">
<p>$3850</p>
<input class="radio-button" type="radio" name="milanesa-napolitano" value="3850">
<button class="counter-button" onclick="updateCounter(56, 'decrement')">-</button>
<span class="counter-value">0</span>
<button class="counter-button" onclick="updateCounter(56, 'increment')">+</button>
</div>
<p id="parrafos-detalles">salsa de pizza - muzzarella - jamon + papas grandes</p>
<button class="boton-extras" data-button-number="56" onclick="toggleExtras(56)">Extras</button>
  <div class="div-extras" id="extrasList56" data-button-number="56" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(56)">Agregar al pedido</button>
  </div>
`;




    subMenuMila.innerHTML = buttonsHTML;

    subMenuMilaVisible = true;
    subMenuMila.style.display = "flex";
    subMenuMila.offsetHeight;
    subMenuMila.style.opacity = "1";
    subMenuMila.style.transform = "translateY(0)";
    subMenuMila.style.visibility = "visible";
    subMenuMila.style.flexDirection = "column";
    subMenuMila.style.rowGap = "10px";
    subMenuMila.style.padding = "10px"
    subMenuMila.style.alignItems = "center"

    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    botonMila.classList.add('active');


    subMenuMila.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuMilaButtons = document.querySelectorAll('.menu-button');
    subMenuMilaButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuMila.innerHTML = '';
    }, subMenuMilaButtons.length * 100);

    subMenuMilaVisible = false;

    subMenuMila.style.opacity = "0";
    subMenuMila.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuMila.style.visibility = "hidden";
      subMenuMila.style.display = "none";
    }, 800);

    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    botonMila.classList.remove('active');

  }
}

function toggleExtras(buttonNumber) {
  const extrasList = document.getElementById('extrasList' + buttonNumber);

  if (extrasList.style.display === 'flex') {
    extrasList.style.display = 'none';
  } else {
    extrasList.style.display = 'flex'; // Muestra la lista de extras correspondiente
    extrasList.style.opacity = "1"
    extrasList.style.transform = "translateY(0)";
    extrasList.style.visibility = "visible";
    extrasList.style.transition = "transition: opacity 1s, transform 1s"

    // Resto de la lógica para generar los extras...
    extrasList.innerHTML = `

    <div class="extra-item" data-extra-number="1" data-price="1400">
      <p>Carne<br>Pollo</p>
      <button class="counter-button" onclick="updateExtrasCounter(1, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-1">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(1, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-1">$1400</p>
    </div>
    <div class="extra-item" data-extra-number="2" data-price="700">
      <p>Cheddar<br>feta</p>
      <button class="counter-button" onclick="updateExtrasCounter(2, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-2">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(2, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-2">$700</p>
    </div>
    <div class="extra-item" data-extra-number="3" data-price="850">
      <p>Cheddar<br>fundido</p>
      <button class="counter-button" onclick="updateExtrasCounter(3, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-3">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(3, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-3">$850</p>
    </div>
    <div class="extra-item" data-extra-number="4" data-price="650">
      <p>Jamon<br>Queso</p>
      <button class="counter-button" onclick="updateExtrasCounter(4, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-4">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(4, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-4">$650</p>
    </div>
    <div class="extra-item" data-extra-number="5" data-price="900">
      <p>Bacon</p>
      <button class="counter-button" onclick="updateExtrasCounter(5, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-5">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(5, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-5">$900</p>
    </div>
    <div class="extra-item" data-extra-number="6" data-price="600">
      <p>Huevo</p>
      <button class="counter-button" onclick="updateExtrasCounter(6, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-6">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(6, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-6">$600</p>
    </div>
    <div class="extra-item" data-extra-number="7" data-price="400">
      <p>Pepino</p>
      <button class="counter-button" onclick="updateExtrasCounter(7, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-7">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(7, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-7">$400</p>
    </div>
    <div class="extra-item" data-extra-number="8" data-price="600">
      <p>Lechuga<br>Tomate</p>
      <button class="counter-button" onclick="updateExtrasCounter(8, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-8">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(8, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-8">$600</p>
    </div>
    <div class="extra-item" data-extra-number="9" data-price="900">
      <p>Salsa</p>
      <button class="counter-button" onclick="updateExtrasCounter(9, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-9">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(9, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-9">$900</p>
    </div>
    <div class="extra-item" data-extra-number="10" data-price="900">
      <p>Doritos<br>P pay</p>
      <button class="counter-button" onclick="updateExtrasCounter(10, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-10">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(10, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-10">$900</p>
    </div>
    <div class="extra-item" data-extra-number="11" data-price="1200">
      <p>Nuggets<br>x 4</p>
      <button class="counter-button" onclick="updateExtrasCounter(11, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-11">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(11, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-11">$1200</p>
    </div>
    <div class="extra-item" data-extra-number="12" data-price="600">
      <p>Verdeo</p>
      <button class="counter-button" onclick="updateExtrasCounter(12, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-12">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(12, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-12">$600</p>
    </div>
    `;
  }

  const extraItems = document.querySelectorAll('.extra-item');
  extraItems.forEach((extraItem) => {
    extraItem.addEventListener('click', (event) => {
      const extraNumber = event.currentTarget.dataset.extraNumber;
      const action = event.target.dataset.action;

      if (action === 'increment' || action === 'decrement') {
        updateExtrasCounter(extraNumber, action, buttonNumber); // Pasamos el número de lista
      }
    });
  });
}

function updateExtrasCounter(extraNumber, action) {
  const extraItem = document.querySelector(`.extra-item[data-extra-number="${extraNumber}"]`);

  if (extraItem) {
    if (!extrasCounters[extraNumber]) {
      extrasCounters[extraNumber] = 0;
    }

    if (action === 'increment') {
      extrasCounters[extraNumber]++;
    } else if (action === 'decrement' && extrasCounters[extraNumber] > 0) {
      extrasCounters[extraNumber]--;
    }

    // Update counter display
    const counterValue = extraItem.querySelector('.counter-value');
    counterValue.innerText = extrasCounters[extraNumber].toString();
    console.log(`El contador del extra ${extraNumber} es: ${extrasCounters[extraNumber]}`);
  }
}

function selectMainMenuButton(buttonNumber) {
  const allButtons = document.querySelectorAll('.menu-button');
  allButtons.forEach(button => {
    button.classList.remove('active');
  });

  const mainMenuButton = document.getElementById(`boton${buttonNumber}`);
  mainMenuButton.classList.add('active');
}

function actualizarPedido() {
  const pedidoDropdown = document.getElementById('pedidoDropdown');
  const tuPedidoBtn = document.getElementById('tuPedidoBtn');

  pedidoDropdown.innerHTML = '';

  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

  if (productosGuardados && productosGuardados.length > 0) {
    let productoAnterior = null;

    productosGuardados.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.className = 'producto-pedido';

      productoDiv.innerHTML = `${producto.producto.nombre} Cantidad: ${producto.producto.cantidad} Precio Total: $${producto.producto.precioTotal}`;

      if (producto.producto.extras && producto.producto.extras.length > 0) {
        productoDiv.innerHTML += ' (E)';
      }

      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'x';
      eliminarBtn.className = 'eliminar-producto';
      eliminarBtn.onclick = function () {
        eliminarDelPedido(index);
        actualizarPedido();
      };
      productoDiv.appendChild(eliminarBtn);

      pedidoDropdown.appendChild(productoDiv);

      productoAnterior = { producto };
    });

    pedidoDropdown.style.display = 'flex';
    tuPedidoBtn.style.display = 'block';
  } else {
    pedidoDropdown.style.display = 'none';
    tuPedidoBtn.style.display = 'none';
  }
}

function toggleDropdown() {
  const tuPedidoBtn = document.getElementById('tuPedidoBtn');
  const pedidoDropdown = document.getElementById('pedidoDropdown');

  // Togglear la visibilidad del div al hacer clic en el botón "Tu Pedido"
  if (pedidoDropdown.style.display === 'none') {
    actualizarPedido(); // Actualizar la lista de productos en el pedido
    pedidoDropdown.style.display = 'flex';
    pedidoDropdown.style.transition = 'transform 0.8s, opacity 0.8s';
    pedidoDropdown.style.transform = 'translateY(0px)';
    pedidoDropdown.style.opacity = '1';
    flecha.classList.remove('flecha-abajo');
    flecha.classList.add('flecha-arriba');
  } else {
    pedidoDropdown.style.transition = 'transform 0.8s , opacity 0.8s';
    pedidoDropdown.style.transform = 'translateY(-50px)';
    pedidoDropdown.style.opacity = '0';
    flecha.classList.remove('flecha-arriba');
    flecha.classList.add('flecha-abajo');
    // Retrasar la ocultación para permitir que la transición tenga lugar
    setTimeout(() => {
      pedidoDropdown.style.display = 'none';
    }, 800);
  }
}

function updateCounter(buttonNumber, action) {
  const counterValue = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .counter-value`);
  const selectedInput = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] input:checked`);

  if (counterValue && selectedInput && selectedInput.value) {
    if (!counters[buttonNumber]) {
      counters[buttonNumber] = 0;
    }

    let itemPrice = parseFloat(selectedInput.value);

    switch (action) {
      case 'increment':
        counters[buttonNumber]++;
        total += itemPrice;
        break;
      case 'decrement':
        if (counters[buttonNumber] > 0) {
          counters[buttonNumber]--;
          total -= itemPrice;
        }
        break;
      default:
        break;
    }

    counterValue.textContent = counters[buttonNumber];
  }

}

function actualizarTotal() {
  // Obtener la lista de productos del localStorage
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

  // Inicializar el total de productos
  let totalProductos = 0;

  if (productosGuardados && productosGuardados.length > 0) {
    // Sumar los precios totales de los productos en el pedido
    totalProductos = productosGuardados.reduce((total, producto) => {
      return total + producto.producto.precioTotal;
    }, 0);
  }

  // Sumar el total de productos con el total de extras
  const totalFinal = totalProductos + calcularExtrasTotal();

  // Actualiza el total en el elemento HTML
  const totalElement = document.getElementById('total');
  if (totalElement) {
    totalElement.textContent = `$${totalFinal.toFixed(2)}`;
  }
}

function eliminarDelPedido(index) {
  const productoEliminado = productos[index];
  const precioProductoEliminado = productoEliminado.producto.precioTotal;

  productos.splice(index, 1); // Eliminar el producto del array de productos
  localStorage.setItem('pedido', JSON.stringify(productos)); // Actualizar el localStorage con la nueva lista de productos

  // Restar el precio del producto eliminado del total del pedido
  const totalProductos = preciosTotalesProductos.reduce((total, precio) => total + precio, 0);
  const totalPedidoActualizado = totalProductos - precioProductoEliminado;

  preciosTotalesProductos = productos.map(producto => producto.producto.precioTotal); // Actualizar los precios totales de los productos

  // Actualizar el totalPedido en cada objeto de producto
  productos.forEach(producto => {
    producto.totalPedido = totalPedidoActualizado;
  });

  actualizarTotal(); // Actualizar el total en la interfaz
  actualizarPedido(); // Actualizar el pedido mostrado en la interfaz
}

function agregarAlPedido(buttonNumber) {
  const itemNameElement = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .menu-button`);
  const selectedInputElement = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] input:checked`);

  if (!itemNameElement || !selectedInputElement) {
    console.error('No se encontraron elementos necesarios para agregar al pedido');
    return;
  }

  const itemName = itemNameElement.textContent;
  const itemPrice = parseFloat(selectedInputElement.value);
  const itemCount = counters[buttonNumber];

  let extrasTotal = 0;
  const extrasArray = [];

  extraItems.forEach(extraItem => {
    const extraNameElement = extraItem.querySelector('p');
    const counterElement = document.getElementById(`counter-value-${buttonNumber}-${extraItem.dataset.extraNumber}`);

    if (!extraNameElement || !counterElement) {
      console.error('No se encontraron elementos necesarios para los extras');
      return;
    }

    const extraName = extraNameElement.textContent;
    const extraPrice = parseFloat(extraItem.dataset.price);
    const extraCount = parseInt(counterElement.textContent);

    if (extraCount > 0) {
      console.log(`Extra name: ${extraName}, extra count: ${extraCount}, extra price: ${extraPrice * extraCount}`);
      extrasTotal += extraPrice * extraCount;

      const extraObj = {
        nombre: extraName,
        cantidad: extraCount,
        precio: extraPrice * extraCount
      };

      extrasArray.push(extraObj);
    }
  });

  const precioTotalProducto = itemPrice * itemCount + extrasTotal;

  const pedido = {
    producto: {
      nombre: itemName,
      cantidad: itemCount,
      precio: itemPrice * itemCount,
      extras: extrasArray,
      precioTotal: precioTotalProducto
    }
  };

  productos.push(pedido);

  localStorage.setItem('pedido', JSON.stringify(productos));

  actualizarTotal(); // Actualizar el total en la interfaz
  actualizarTotalPedido(); // Actualizar el total del pedido en localStorage
  counters[buttonNumber] = 0;
  resetExtrasCounters();
  console.log(counters.textContent)

  if (productos.length > 0) {
    document.getElementById('hacerPedidoButton').style.display = 'block';
  }

  const btnTuPedido = document.getElementById("tuPedidoBtn");
  btnTuPedido.style.display = productos.length > 0 ? 'flex' : 'none';
}

function actualizarTotalPedido() {
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

  let totalPedido = 0;

  if (productosGuardados && productosGuardados.length > 0) {
    totalPedido = productosGuardados.reduce((total, producto) => total + producto.producto.precioTotal, 0);
  }

  localStorage.setItem('totalPedido', totalPedido);
}

function eliminarDelPedido(index) {
  const btnHacerPedido = document.getElementById("hacerPedidoButton")
  const total = document.getElementById("total")

  productos.splice(index, 1);
  localStorage.setItem('pedido', JSON.stringify(productos));
  actualizarTotal(); // Actualizar el total en la interfaz
  actualizarTotalPedido(); // Actualizar el total del pedido en localStorage

  if(total.textContent == '$0.00') {
    btnHacerPedido.style.display = "none"
  }
}

function obtenerPrecioExtra(extraNumber, buttonNumber) {
  const extraItem = document.querySelector(`.div-extras[data-button-number="${buttonNumber}"] .extra-item[data-extra-number="${extraNumber}"]`);
  return extraItem ? parseFloat(extraItem.dataset.price) || 0 : 0;
}

function updateExtrasCounter(extraNumber, action, listNumber) {
  const counterId = `counter-value-${listNumber}-${extraNumber}`;
  const counterValue = document.getElementById(counterId);

  if (!counterValue) {
    console.error(`No se encontró el contador para el extra ${extraNumber} en la lista ${listNumber}`);
    return;
  }

  if (!extrasCounters[listNumber]) {
    extrasCounters[listNumber] = {};
  }

  if (!extrasCounters[listNumber][extraNumber]) {
    extrasCounters[listNumber][extraNumber] = 0;
  }

  if (action === 'increment') {
    extrasCounters[listNumber][extraNumber]++;
  } else if (action === 'decrement' && extrasCounters[listNumber][extraNumber] > 0) {
    extrasCounters[listNumber][extraNumber]--;
  }

  // Actualiza el valor del contador en el DOM
  if (counterValue) {
    counterValue.textContent = extrasCounters[listNumber][extraNumber];
  } else {
    console.error(`No se pudo actualizar el contador del extra ${extraNumber} en la lista ${listNumber}`);
  }

  // Calcular el total de los extras y realizar acciones adicionales si es necesario
  const extrasTotal = calcularExtrasTotal(listNumber);
  const totalGeneral = totalExtras + extrasTotal;
}

function calcularExtrasTotal(buttonNumber) {
  let extrasTotal = 0;
  const extraItems = document.querySelectorAll(`.div-extras[data-button-number="${buttonNumber}"] .extra-item`);
  extraItems.forEach(extraItem => {
    const extraNumber = parseInt(extraItem.dataset.extraNumber);
    const extraPrice = parseFloat(extraItem.dataset.price);
    const extraCount = extrasCounters[buttonNumber][extraNumber] || 0;
    extrasTotal += extraCount * extraPrice;
  });
  return extrasTotal;
}

function resetCounters() {
  counters = {};
  resetExtrasCounters();
}

function resetExtrasCounters() {
  extrasCounters = {};
  document.querySelectorAll('.counter-value').forEach(counter => {
    counter.innerText = '0';
  });
}

function irAContacto() {
  // Puedes personalizar esta función para hacer scroll hacia la sección de contacto
  const contactoSection = document.getElementById('whatsapp-card');
  contactoSection.scrollIntoView({ behavior: 'smooth' });
}

function enviarPedidoWhatsApp() {
  // Obtener la lista de productos del almacenamiento local
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));
  let totalPedido = JSON.parse(localStorage.getItem('totalPedido'));

  if (productosGuardados && productosGuardados.length > 0) {
    // Crear el mensaje para WhatsApp
    let mensajeWhatsApp = `¡Hola McKing! Quiero realizar un pedido:\n\n`;

    // Recorrer cada producto en la lista de productos guardados
    productosGuardados.forEach((producto) => {
      mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;

      // Agregar detalles de los extras de cada producto
      if (producto.producto.extras && producto.producto.extras.length > 0) {
        mensajeWhatsApp += `Extras:\n`;
        producto.producto.extras.forEach((extra) => {
          mensajeWhatsApp += `${extra.nombre} - Cantidad: ${extra.cantidad} - Precio: $${extra.precio}\n`;
        });
      }

      // Agregar el precio total del producto
      mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
    });

    // Agregar el precio total del pedido obtenido del localStorage
    mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\nGracias.`;

    // Reemplazar 'NUMERO_DE_TELEFONO' con el número de WhatsApp al que deseas enviar el mensaje, asegurándote de quitar espacios o guiones
    const numeroWhatsApp = '541128528053';

    // Crear el enlace de WhatsApp utilizando 'https://wa.me/'
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Redirigir a WhatsApp
    window.location.href = enlaceWhatsApp;

    // Imprimir en la consola para verificar el flujo
    console.log('Pedido enviado por WhatsApp.');
  } else {
    console.error('No se encontró información de pedido almacenada.');
  }
}

function enviarPedidoWhatsApp2() {
  // Obtener la lista de productos del almacenamiento local
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));
  let totalPedido = JSON.parse(localStorage.getItem('totalPedido'));

  if (productosGuardados && productosGuardados.length > 0) {
    // Crear el mensaje para WhatsApp
    let mensajeWhatsApp = `¡Hola McKing! Quiero realizar un pedido:\n\n`;

    // Recorrer cada producto en la lista de productos guardados
    productosGuardados.forEach((producto) => {
      mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;

      // Agregar detalles de los extras de cada producto
      if (producto.producto.extras && producto.producto.extras.length > 0) {
        mensajeWhatsApp += `Extras:\n`;
        producto.producto.extras.forEach((extra) => {
          mensajeWhatsApp += `-${extra.nombre} - Cantidad: ${extra.cantidad} - Precio: $${extra.precio}\n`;
        });
      }

      // Agregar el precio total del producto
      mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
    });

    // Agregar el precio total del pedido obtenido del localStorage
    mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\nGracias.`;

    // Reemplazar 'NUMERO_DE_TELEFONO' con el número de WhatsApp al que deseas enviar el mensaje, asegurándote de quitar espacios o guiones
    const numeroWhatsApp = '541137816491';

    // Crear el enlace de WhatsApp utilizando 'https://wa.me/'
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Redirigir a WhatsApp
    window.location.href = enlaceWhatsApp;

    // Imprimir en la consola para verificar el flujo
    console.log('Pedido enviado por WhatsApp.');
  } else {
    console.error('No se encontró información de pedido almacenada.');
  }
}

function enviarPedidoWhatsApp3() {
  // Obtener la lista de productos del almacenamiento local
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));
  let totalPedido = JSON.parse(localStorage.getItem('totalPedido'));

  if (productosGuardados && productosGuardados.length > 0) {
    // Crear el mensaje para WhatsApp
    let mensajeWhatsApp = `¡Hola McKing! Quiero realizar un pedido:\n\n`;

    // Recorrer cada producto en la lista de productos guardados
    productosGuardados.forEach((producto) => {
      mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;

      // Agregar detalles de los extras de cada producto
      if (producto.producto.extras && producto.producto.extras.length > 0) {
        mensajeWhatsApp += `Extras:\n`;
        producto.producto.extras.forEach((extra) => {
          mensajeWhatsApp += `-${extra.nombre} - Cantidad: ${extra.cantidad} - Precio: $${extra.precio}\n`;
        });
      }

      // Agregar el precio total del producto
      mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
    });

    // Agregar el precio total del pedido obtenido del localStorage
    mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\nGracias.`;

    // Reemplazar 'NUMERO_DE_TELEFONO' con el número de WhatsApp al que deseas enviar el mensaje, asegurándote de quitar espacios o guiones
    const numeroWhatsApp = '541150397235';

    // Crear el enlace de WhatsApp utilizando 'https://wa.me/'
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Redirigir a WhatsApp
    window.location.href = enlaceWhatsApp;

    // Imprimir en la consola para verificar el flujo
    console.log('Pedido enviado por WhatsApp.');
  } else {
    console.error('No se encontró información de pedido almacenada.');
  }
}

function enviarPedidoWhatsApp4() {
  // Obtener la lista de productos del almacenamiento local
  const productosGuardados = JSON.parse(localStorage.getItem('pedido'));
  let totalPedido = JSON.parse(localStorage.getItem('totalPedido'));

  if (productosGuardados && productosGuardados.length > 0) {
    // Crear el mensaje para WhatsApp
    let mensajeWhatsApp = `¡Hola McKing! Quiero realizar un pedido:\n\n`;

    // Recorrer cada producto en la lista de productos guardados
    productosGuardados.forEach((producto) => {
      mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;

      // Agregar detalles de los extras de cada producto
      if (producto.producto.extras && producto.producto.extras.length > 0) {
        mensajeWhatsApp += `Extras:\n`;
        producto.producto.extras.forEach((extra) => {
          mensajeWhatsApp += `-${extra.nombre} - Cantidad: ${extra.cantidad} - Precio: $${extra.precio}\n`;
        });
      }

      // Agregar el precio total del producto
      mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
    });

    // Agregar el precio total del pedido obtenido del localStorage
    mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\nGracias.`;

    // Reemplazar 'NUMERO_DE_TELEFONO' con el número de WhatsApp al que deseas enviar el mensaje, asegurándote de quitar espacios o guiones
    const numeroWhatsApp = '541123058068';

    // Crear el enlace de WhatsApp utilizando 'https://wa.me/'
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Redirigir a WhatsApp
    window.location.href = enlaceWhatsApp;

    // Imprimir en la consola para verificar el flujo
    console.log('Pedido enviado por WhatsApp.');
  } else {
    console.error('No se encontró información de pedido almacenada.');
  }
}

function obtenerNumeroDeBotonPorNombre(itemName) {
  const divBotonesSubMenu = document.querySelectorAll('.div-botones-submenu');

  for (let i = 0; i < divBotonesSubMenu.length; i++) {
    const menuButton = divBotonesSubMenu[i].querySelector('.menu-button');
    const menuButtonName = menuButton.textContent.trim();

    if (menuButtonName === itemName) {
      return divBotonesSubMenu[i].dataset.buttonNumber;
    }
  }

  return null;
}