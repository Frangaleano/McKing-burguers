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

window.addEventListener('load', function () {
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
let subMenuPremiumVisible = false;
let subMenuVisible = false;
let subMenuDosVisible = false;
let subMenuTresVisible = false;
let subMenuCuatroVisible = false;
let subMenuCincoVisible = false;
let subMenuMilaVisible = false;
let subMenuLomitoVisible = false;
let subMenuJrVisible = false;
let subMenuPromosVisible = false;
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
              <p id="pasos"> <b>Paso 1:</b> <br>
              Tocar el boton "Menú".</p>
          </div>
          <img class="img-pasos" src="./menu.png" alt="menu" style="width: 100px"></img>
      </div>
      
      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p id="pasos"> <b>Paso 2:</b> <br>
              Selecciona el submenu que desees.</p>
          </div>
          <img class="img-pasos" src="./submenus.png" alt="submenu" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p id="pasos"> <b>Paso 3:</b> <br>
              a) Selecciona el producto que desees y su cantidad.<br>
              b) También puedes seleccionar los extras que quieras.<br>
              c) Luego agrega el producto al pedido, con el boton "Agregar al carrito".
              </p>
          </div>
          <img class="img-pasos" src="./seleccion-menu.png" alt="seleccion menu" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p id="pasos"> <b>Paso 4:</b> <br>
              Al agregar vas a ver, el total del pedido, y el boton de tu pedido, desde el cual vas a poder ver tu pedido actual y eliminar algun producto si es necesario.<br>
              </p>
          </div>
          <img class="img-pasos" src="./tupedido.png" alt="pedido" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
          <div class="div-texto-pasos">
              <p id="pasos"> <b>Paso 5:</b> <br>
              Al agregar tambien va a aparecer un boton de "Hacer pedido", el cual vamos a tocar para ir a whatsapp directamente.<br>
              </p>
          </div>
          <img class="img-pasos" src="./hacerpedido.png" alt="hacer pedido" style="width: 100px"></img>
      </div>

      <div class="div-pasos">
              <p id="pasos"> <b>Paso 6:</b> <br>
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
  <div class="div-botones-submenu" data-button-number="1">
    <img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
    <div class="div-detalles-productos">
      <button class="menu-button sub-menu-button" data-button-number="1" style="border: none;">Simple</button>
      <p id="parrafos-detalles">pan - carne</p>
      <div class="div-precio-producto" style="    display: flex;
        align-items: center;
        flex-direction: row;">
          <p>MP:$3300</p>
          <input class="radio-button" type="radio" name="Simple" value="3300">
          <p>FT:$3000</p>
          <input class="radio-button" type="radio" name="Simple" value="3000">
      </div>
      <div style="    display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: 10px;">
          <button class="counter-button" onclick="updateCounter(1, 'decrement')">-</button>
          <span class="counter-value">0</span>
          <button class="counter-button" onclick="updateCounter(1, 'increment')">+</button>
      </div>
    </div>
  </div>
  <button class="boton-extras" data-button-number="1" onclick="toggleExtras(1)">Extras</button>
  <div class="div-extras" id="extrasList1" data-button-number="1" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(1)">Agregar al carrito</button>
  </div>


  <div class="div-botones-submenu" data-button-number="2">
    <img class="img-producto" src="./productos/simple-queso.png" alt="simple queso"></img>
    <div class="div-detalles-productos">
      <button class="menu-button sub-menu-button" data-button-number="2" style="border: none;">S. Queso</button>
      <p id="parrafos-detalles">pan - carne - queso</p>
      <div class="div-precio-producto" style="    display: flex;
        align-items: center;
        flex-direction: row;">
          <p>MP:$3550</p>
          <input class="radio-button" type="radio" name="queso simple" value="3550">
          <p>FT:$3300</p>
          <input class="radio-button" type="radio" name="queso simple" value="3300">
      </div>
      <div style="    display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: 10px;">
          <button class="counter-button" onclick="updateCounter(2, 'decrement')">-</button>
          <span class="counter-value">0</span>
          <button class="counter-button" onclick="updateCounter(2, 'increment')">+</button>
      </div>
    </div>
  </div>
  <button class="boton-extras" data-button-number="2" onclick="toggleExtras(2)">Extras</button>
  <div class="div-extras" id="extrasList2" data-button-number="2" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(2)">Agregar al carrito</button>
  </div>




  <div class="div-botones-submenu" data-button-number="3">
    <img class="img-producto" src="./productos/napoleon.png" alt="napoleon"></img>
    <div class="div-detalles-productos">
      <button class="menu-button sub-menu-button" data-button-number="3" style="border: none;">Napoleon</button>
      <p id="parrafos-detalles">tomate asado - queso - oregano - mayonesa</p>
      <div class="div-precio-producto" style="    display: flex;
        align-items: center;
        flex-direction: row;">
          <p>MP:$3800</p>
          <input class="radio-button" type="radio" name="Napoleon" value="3800">
          <p>FT:$3500</p>
          <input class="radio-button" type="radio" name="Napoleon" value="3500">
      </div>
      <div style="    display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: 10px;">
          <button class="counter-button" onclick="updateCounter(3, 'decrement')">-</button>
          <span class="counter-value">0</span>
          <button class="counter-button" onclick="updateCounter(3, 'increment')">+</button>
      </div>
    </div>
  </div>
  <button class="boton-extras" data-button-number="3" onclick="toggleExtras(3)">Extras</button>
  <div class="div-extras" id="extrasList3" data-button-number="3" style="display: none;">
  </div>
  <div class="div-boton-agregar">
    <button class="boton-agregar" onclick="agregarAlPedido(3)">Agregar al carrito</button>
  </div>


  <div class="div-botones-submenu" data-button-number="4">
  <img class="img-producto" src="./productos/magnifica.png" alt=""></img>

  <div class="div-detalles-productos">
    <button class="menu-button sub-menu-button" data-button-number="4" style="border: none;">Classic</button>
    <p id="parrafos-detalles">lechuga - tomate</p>
    <div class="div-precio-producto" style="    display: flex;
      align-items: center;
      flex-direction: row;">
        <p>MP:$3800</p>
        <input class="radio-button" type="radio" name="Classic" value="3800">
        <p>FT:$3500</p>
        <input class="radio-button" type="radio" name="Classic" value="3500">
    </div>
    <div style="    display: flex;
      align-items: center;
      flex-direction: row;
      margin-left: 10px;">
        <button class="counter-button" onclick="updateCounter(4, 'decrement')">-</button>
        <span class="counter-value">0</span>
        <button class="counter-button" onclick="updateCounter(4, 'increment')">+</button>
    </div>
  </div>
</div>
<button class="boton-extras" data-button-number="4" onclick="toggleExtras(4)">Extras</button>
<div class="div-extras" id="extrasList4" data-button-number="4" style="display: none;">
</div>
<div class="div-boton-agregar">
  <button class="boton-agregar" onclick="agregarAlPedido(4)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="65">
<img class="img-producto" src="./productos/magnifica.png" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="65" style="border: none;">Whopper simple</button>
  <p id="parrafos-detalles">Carne - lechuga - tomate - pepino - cebolla morada - salsa</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="whopper-simple" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="whopper-simple" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(65, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(65, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="65" onclick="toggleExtras(65)">Extras</button>
<div class="div-extras" id="extrasList65" data-button-number="65" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(65)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="66">
<img class="img-producto" src="./productos/magnifica.png"" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="66" style="border: none;">Dorito simple</button>
  <p id="parrafos-detalles">Carne - doble queso - doritos</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="dorito-simple" value="4400">
      <p>FT:$4300</p>
      <input class="radio-button" type="radio" name="dorito-simple" value="4300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(66, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(66, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="66" onclick="toggleExtras(66)">Extras</button>
<div class="div-extras" id="extrasList66" data-button-number="66" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(66)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="67">
<img class="img-producto" src="./productos/magnifica.png" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="67" style="border: none;">Onion Cheese Simple</button>
  <p id="parrafos-detalles">Carne - doble queso - cebolla caramelizada</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="Onion-simple" value="4400">
      <p>FT:$4200</p>
      <input class="radio-button" type="radio" name="Onion-simple" value="4200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(67, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(67, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="67" onclick="toggleExtras(67)">Extras</button>
<div class="div-extras" id="extrasList67" data-button-number="67" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(67)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="68">
<img class="img-producto" src="./productos/magnifica.png" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="68" style="border: none;">Baconeitor simple</button>
  <p id="parrafos-detalles">Carne - cheddar fundido - bacon</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4600</p>
      <input class="radio-button" type="radio" name="baconeitor-simple" value="4600">
      <p>FT:$4300</p>
      <input class="radio-button" type="radio" name="baconeitor-simple" value="4300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(68, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(68, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="68" onclick="toggleExtras(68)">Extras</button>
<div class="div-extras" id="extrasList68" data-button-number="68" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(68)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="69">
<img class="img-producto" src="./productos/magnifica.png" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="69" style="border: none;">Club House Simple</button>
  <p id="parrafos-detalles">Carne - cebolla caramelizada - bacon - lechuga - tomate - queso</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4600</p>
      <input class="radio-button" type="radio" name="Club-house-simple" value="4600">
      <p>FT:$4300</p>
      <input class="radio-button" type="radio" name="Club-house-simple" value="4300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(69, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(69, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="69" onclick="toggleExtras(69)">Extras</button>
<div class="div-extras" id="extrasList69" data-button-number="69" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(69)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="70">
<img class="img-producto" src="./productos/magnifica.png" alt=""></img>

<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="70" style="border: none;">BBQ simple</button>
  <p id="parrafos-detalles">Carne - cebolla caramelizada - queso blanco - bacon - barbacoa</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4600</p>
      <input class="radio-button" type="radio" name="BBQ-simple" value="4600">
      <p>FT:$4300</p>
      <input class="radio-button" type="radio" name="BBQ-simple" value="4300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(70, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(70, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="70" onclick="toggleExtras(70)">Extras</button>
<div class="div-extras" id="extrasList70" data-button-number="70" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(70)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="5">
<img class="img-producto" src="./productos/fusion.png" alt="fusion"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="5" style="border: none;">Fusión</button>
  <p id="parrafos-detalles">jamon - queso</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$3800</p>
      <input class="radio-button" type="radio" name="Fusion" value="3800">
      <p>FT:$3500</p>
      <input class="radio-button" type="radio" name="Fusion" value="3500">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(5, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(5, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="5" onclick="toggleExtras(5)">Extras</button>
<div class="div-extras" id="extrasList5" data-button-number="5" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(5)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="6">
<img class="img-producto" src="./productos/cuarto.png" alt="cuarto"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="6" style="border: none;">Cuarto</button>
  <p id="parrafos-detalles">doble queso - salsa de cebolla</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4100</p>
      <input class="radio-button" type="radio" name="Cuarto" value="4100">
      <p>FT:$3800</p>
      <input class="radio-button" type="radio" name="Cuarto" value="3800">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(6, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(6, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="6" onclick="toggleExtras(6)">Extras</button>
<div class="div-extras" id="extrasList6" data-button-number="6" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(6)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="7">
<img class="img-producto" src="./productos/simple-magnifica.png" alt="simple-magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="7" style="border: none;">Magnifica</button>
  <p id="parrafos-detalles">tomate - lechuga - cebolla - queso - salsa</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4100</p>
      <input class="radio-button" type="radio" name="Magnifica" value="4100">
      <p>FT:$3800</p>
      <input class="radio-button" type="radio" name="Magnifica" value="3800">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(7, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(7, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="7" onclick="toggleExtras(7)">Extras</button>
<div class="div-extras" id="extrasList7" data-button-number="7" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(7)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="8">
<img class="img-producto" src="./productos/napolitano.png" alt="napolitano"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="8" style="border: none;">Napolitano</button>
  <p id="parrafos-detalles">jamon - queso - tomate - cebolla - ketchup</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4100</p>
      <input class="radio-button" type="radio" name="Napolitano" value="4100">
      <p>FT:$3800</p>
      <input class="radio-button" type="radio" name="Napolitano" value="3800">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(8, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(8, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="8" onclick="toggleExtras(8)">Extras</button>
<div class="div-extras" id="extrasList8" data-button-number="8" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(8)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="57">
<img class="img-producto" src="./productos/napolitano.png" alt="napolitano"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="57" style="border: none;">Tasty Napoleon</button>
  <p id="parrafos-detalles">Carne - salsa tasty - tomate asado - queso blanco - orégano</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="Napolitano" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="Napolitano" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(57, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(57, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="57" onclick="toggleExtras(57)">Extras</button>
<div class="div-extras" id="extrasList57" data-button-number="57" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(57)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="9">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="9" style="border: none;">Completa</button>
  <p id="parrafos-detalles">carne - jamón - queso - lechuga - tomate - huevo</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="Completa" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="Completa" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(9, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(9, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="9" onclick="toggleExtras(9)">Extras</button>
<div class="div-extras" id="extrasList9" data-button-number="9" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(9)">Agregar al carrito</button>
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

    <div class="div-botones-submenu" data-button-number="10">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="10" style="border: none;">Doble Cuarto</button>
  <p id="parrafos-detalles">Carne x2 - queso x2 - salsa cebolla</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="doble-cuarto" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="doble-cuarto" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(10, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(10, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="10" onclick="toggleExtras(10)">Extras</button>
<div class="div-extras" id="extrasList10" data-button-number="10" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(10)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="11">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="11" style="border: none;">Doble Napoleon</button>
  <p id="parrafos-detalles">Carne x2 - queso x2 - tomate asado - oregano - mayonesa</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="doble-napoleon" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="doble-napoleon" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(11, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(11, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="11" onclick="toggleExtras(11)">Extras</button>
<div class="div-extras" id="extrasList11" data-button-number="11" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(11)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="12">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="12" style="border: none;">Doble Magnifica</button>
  <p id="parrafos-detalles">Carne x2 - queso - lechuga - tomate - aros de cebolla</p>
    <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5400</p>
      <input class="radio-button" type="radio" name="doble-magnifica" value="5400">
      <p>FT:$5100</p>
      <input class="radio-button" type="radio" name="doble-magnifica" value="5100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(12, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(12, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="12" onclick="toggleExtras(12)">Extras</button>
<div class="div-extras" id="extrasList12" data-button-number="12" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(12)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="13">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="13" style="border: none;">Doble Napolitano</button>
  <p id="parrafos-detalles">carne x2 - queso x2 - jamon x2 - cebolla - tomate - ketchup</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5350</p>
      <input class="radio-button" type="radio" name="doble-napolitano" value="5350">
      <p>FT:$5050</p>
      <input class="radio-button" type="radio" name="doble-napolitano" value="5050">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(13, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(13, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="13" onclick="toggleExtras(13)">Extras</button>
<div class="div-extras" id="extrasList13" data-button-number="13" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(13)">Agregar al carrito</button>
</div>



<div class="div-botones-submenu" data-button-number="14">
<img class="img-producto" src="./productos/onion.png" alt="onion"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="14" style="border: none;">Onion</button>
  <p id="parrafos-detalles">carne x2 - triple queso - cebolla caramelizada</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="Onion" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="Onion" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(14, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(14, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="14" onclick="toggleExtras(14)">Extras</button>
<div class="div-extras" id="extrasList14" data-button-number="14" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(14)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="15">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="15" style="border: none;">Whopper</button>
  <p id="parrafos-detalles">carne x2 - tomate - cebolla - ketchup - mayonesa - pepinos - lechuga</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="whopper" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="whopper" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(15, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(15, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="15" onclick="toggleExtras(15)">Extras</button>
<div class="div-extras" id="extrasList15" data-button-number="15" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(15)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="16">
<img class="img-producto" src="./productos/duo.png" alt="duo"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="16" style="border: none;">Dúo</button>
  <p id="parrafos-detalles">carne x2 - jamon y queso x2</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="duo" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="duo" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(16, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(16, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="16" onclick="toggleExtras(16)">Extras</button>
<div class="div-extras" id="extrasList16" data-button-number="16" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(16)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="17">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="17" style="border: none;">Club House</button>
  <p id="parrafos-detalles">carne x2 - cebolla caramelizada - bacon - lechuga - tomate - queso</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5400</p>
      <input class="radio-button" type="radio" name="club-house" value="5400">
      <p>FT:$5100</p>
      <input class="radio-button" type="radio" name="club-house" value="5100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(17, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(17, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="17" onclick="toggleExtras(17)">Extras</button>
<div class="div-extras" id="extrasList17" data-button-number="17" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(17)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="18">
<img class="img-producto" src="./productos/BBQ.png" alt="BBQ"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="18" style="border: none;">BBQ</button>
  <p id="parrafos-detalles">carne x2 - cebolla caramelizada - queso blanco - bacon - barbacoa</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="BBQ" value="5300">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="BBQ" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(18, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(18, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="18" onclick="toggleExtras(18)">Extras</button>
<div class="div-extras" id="extrasList18" data-button-number="18" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(18)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="19">
<img class="img-producto" src="./productos/magnifica.png"alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="19" style="border: none;">Melo City</button>
  <p id="parrafos-detalles">Carnes x2 - papas pay - cheddar fundido - bacon</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5400</p>
      <input class="radio-button" type="radio" name="melo-city" value="5400">
      <p>FT:$5100</p>
      <input class="radio-button" type="radio" name="melo-city" value="5100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(19, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(19, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="19" onclick="toggleExtras(19)">Extras</button>
<div class="div-extras" id="extrasList19" data-button-number="19" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(19)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="20">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="20" style="border: none;">Dorito</button>
  <p id="parrafos-detalles">carne x2 - triple queso - doritos</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5600</p>
      <input class="radio-button" type="radio" name="Dorito" value="5600">
      <p>FT:$5300</p>
      <input class="radio-button" type="radio" name="Dorito" value="5300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(20, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(20, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="20" onclick="toggleExtras(20)">Extras</button>
<div class="div-extras" id="extrasList20" data-button-number="20" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(20)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="21">
<img class="img-producto" src="./productos/baconator.png" alt="baconator"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="21" style="border: none;">Baconator</button>
  <p id="parrafos-detalles">carne x2 - cheddar fundido x2 - bacon x2</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$6200</p>
      <input class="radio-button" type="radio" name="Baconator" value="6200">
      <p>FT:$5800</p>
      <input class="radio-button" type="radio" name="Baconator" value="5800">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(21, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(21, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="21" onclick="toggleExtras(21)">Extras</button>
<div class="div-extras" id="extrasList21" data-button-number="21" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(21)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="22">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="22" style="border: none;">Big King</button>
  <p id="parrafos-detalles">carne x2 - lechuga x2 - cebolla x2 - pepino - queso x2 - salsa big</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5800</p>
      <input class="radio-button" type="radio" name="Big-king" value="5800">
      <p>FT:$5500</p>
      <input class="radio-button" type="radio" name="Big-king" value="5500">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(22, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(22, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="22" onclick="toggleExtras(22)">Extras</button>
<div class="div-extras" id="extrasList22" data-button-number="22" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(22)">Agregar al carrito</button>
</div>
 

<div class="div-botones-submenu" data-button-number="23">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="23" style="border: none;">Staker</button>
  <p id="parrafos-detalles">carne x2 - queso x2 - bacon - salsa staker</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5600</p>
      <input class="radio-button" type="radio" name="Staker" value="5600">
      <p>FT:$5300</p>
      <input class="radio-button" type="radio" name="Staker" value="5300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(23, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(23, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="23" onclick="toggleExtras(23)">Extras</button>
<div class="div-extras" id="extrasList23" data-button-number="23" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(23)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="24">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="24" style="border: none;">Mega Turbo Tasty</button>
  <p id="parrafos-detalles">carne x2 - cheddar x4 - lechuga - tomate - salsa tasty x2 - bacon en tira/picado</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$6200</p>
      <input class="radio-button" type="radio" name="Mega-turbo-tasty" value="6200">
      <p>FT:$5900</p>
      <input class="radio-button" type="radio" name="Mega-turbo-tasty" value="5900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(24, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(24, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="24" onclick="toggleExtras(24)">Extras</button>
<div class="div-extras" id="extrasList24" data-button-number="24" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(24)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="25">
<img class="img-producto" src="./productos/triple-cuarto.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="25" style="border: none;">Triple Cuarto</button>
  <p id="parrafos-detalles">carne x3 - queso x3 - salsa de cebolla</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$6300</p>
      <input class="radio-button" type="radio" name="Triple-cuarto" value="6300">
      <p>FT:$6000</p>
      <input class="radio-button" type="radio" name="Triple-cuarto" value="6000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(25, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(25, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="25" onclick="toggleExtras(25)">Extras</button>
<div class="div-extras" id="extrasList25" data-button-number="25" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(25)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="26">
<img class="img-producto" src="./productos/triple-bacon.png" alt="triple bacon"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="26" style="border: none;">Triple Bacon</button>
  <p id="parrafos-detalles">carne x2 - queso x3 - bacon - salsa de cebolla</p>
      <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$7200</p>
      <input class="radio-button" type="radio" name="Triple-bacon" value="7200">
      <p>FT:$6900</p>
      <input class="radio-button" type="radio" name="Triple-bacon" value="6900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(26, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(26, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="26" onclick="toggleExtras(26)">Extras</button>
<div class="div-extras" id="extrasList26" data-button-number="26" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(26)">Agregar al carrito</button>
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
    
    <div class="div-botones-submenu" data-button-number="27">
<img class="img-producto" src="./productos/papas.png" alt="papas regulares"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="27" style="border: none;">Papas regulares</button>
  <p id="parrafos-detalles">papas paquete regular</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$2900</p>
      <input class="radio-button" type="radio" name="papas-regulares" value="2900">
      <p>FT:$2600</p>
      <input class="radio-button" type="radio" name="papas-regulares" value="2600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(27, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(27, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="27" onclick="toggleExtras(27)">Extras</button>
<div class="div-extras" id="extrasList27" data-button-number="27" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(27)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="28">
<img class="img-producto" src="./productos/papas.png" alt="papas medianas"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="28" style="border: none;">Papas medianas</button>
  <p id="parrafos-detalles">papas paquete mediano</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$3400</p>
      <input class="radio-button" type="radio" name="papas-medianas" value="3400">
      <p>FT:$3100</p>
      <input class="radio-button" type="radio" name="papas-medianas" value="3100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(28, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(28, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="28" onclick="toggleExtras(28)">Extras</button>
<div class="div-extras" id="extrasList28" data-button-number="28" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(28)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="29">
<img class="img-producto" src="./productos/papas.png" alt="papas grandes"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="29" style="border: none;">Papas grandes</button>
  <p id="parrafos-detalles">papas paquete grande</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$3800</p>
      <input class="radio-button" type="radio" name="papas-grandes" value="3800">
      <p>FT:$3400</p>
      <input class="radio-button" type="radio" name="papas-grandes" value="3400">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(29, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(29, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="29" onclick="toggleExtras(29)">Extras</button>
<div class="div-extras" id="extrasList29" data-button-number="29" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(29)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="30">
<img class="img-producto" src="./productos/papas-mcking.png" alt="papas mcking"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="30" style="border: none;">Papas McKing</button>
  <p id="parrafos-detalles">papas - cheddar - jamon - verdeo</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="papas-mcking" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="papas-mcking" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(30, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(30, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="30" onclick="toggleExtras(30)">Extras</button>
<div class="div-extras" id="extrasList30" data-button-number="30" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(30)">Agregar al carrito</button>
</div>



<div class="div-botones-submenu" data-button-number="31">
<img class="img-producto" src="./productos/papas-solocheddar.png" alt="solo cheddar"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="31" style="border: none;">Solo cheddar</button>
  <p id="parrafos-detalles">papas - cheddar</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4100</p>
      <input class="radio-button" type="radio" name="papas-cheddar" value="4100">
      <p>FT:$3900</p>
      <input class="radio-button" type="radio" name="papas-cheddar" value="3900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(31, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(31, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="31" onclick="toggleExtras(31)">Extras</button>
<div class="div-extras" id="extrasList31" data-button-number="31" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(31)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="32">
<img class="img-producto" src="./productos/papas-cheddar-bacon.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="32" style="border: none;">Cheddar y bacon</button>
  <p id="parrafos-detalles">papas - cheddar - bacon</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="papas-cheddar-bacon" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="papas-cheddar-bacon" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(32, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(32, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="32" onclick="toggleExtras(32)">Extras</button>
<div class="div-extras" id="extrasList32" data-button-number="32" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(32)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="33">
<img class="img-producto" src="./productos/papas-huevo.png" alt="papas huevo"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="33" style="border: none;">Papas huevo</button>
  <p id="parrafos-detalles">papas - huevo frito</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4400</p>
      <input class="radio-button" type="radio" name="papas-huevo" value="4400">
      <p>FT:$4100</p>
      <input class="radio-button" type="radio" name="papas-huevo" value="4100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(33, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(33, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="33" onclick="toggleExtras(33)">Extras</button>
<div class="div-extras" id="extrasList33" data-button-number="33" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(33)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="35">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="35" style="border: none;">Papas bajón</button>
  <p id="parrafos-detalles">papas - cheddar - verdeo - carne</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5000</p>
      <input class="radio-button" type="radio" name="papas-bajon" value="5000">
      <p>FT:$4700</p>
      <input class="radio-button" type="radio" name="papas-bajon" value="4700">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(35, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(35, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="35" onclick="toggleExtras(35)">Extras</button>
<div class="div-extras" id="extrasList35" data-button-number="35" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(35)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="36">
<img class="img-producto" src="./productos/papas-nuggets.png" alt="papas nuggets"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="36" style="border: none;">Papas nuggets</button>
  <p id="parrafos-detalles">papas - cheddar - verdeo - jamon - nuggets</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4800</p>
      <input class="radio-button" type="radio" name="papas-nuggets" value="4800">
      <p>FT:$4500</p>
      <input class="radio-button" type="radio" name="papas-nuggets" value="4500">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(36, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(36, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="36" onclick="toggleExtras(36)">Extras</button>
<div class="div-extras" id="extrasList36" data-button-number="36" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(36)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="37">
<img class="img-producto" src="./productos/tapa-arterias.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="37" style="border: none;">Papas tapa arterias</button>
  <p id="parrafos-detalles">papas - cheddar - bacon - jamon - verdeo - huevo frito - carne</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5200</p>
      <input class="radio-button" type="radio" name="papas-tapa-arterias" value="5200">
      <p>FT:$5000</p>
      <input class="radio-button" type="radio" name="papas-tapa-arterias" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(37, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(37, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="37" onclick="toggleExtras(37)">Extras</button>
<div class="div-extras" id="extrasList37" data-button-number="37" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(37)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="38">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="38" style="border: none;">Nuggets x10</button>
  <p id="parrafos-detalles">Nuggets x10</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4800</p>
      <input class="radio-button" type="radio" name="nuggets-10" value="4800">
      <p>FT:$4500</p>
      <input class="radio-button" type="radio" name="nuggets-10" value="4500">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(38, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(38, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="38" onclick="toggleExtras(38)">Extras</button>
<div class="div-extras" id="extrasList38" data-button-number="38" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(38)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="91">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="91" style="border: none;">Nuggets x20</button>
  <p id="parrafos-detalles">Nuggets x20</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$8500</p>
      <input class="radio-button" type="radio" name="nuggets-20" value="8500">
      <p>FT:$8000</p>
      <input class="radio-button" type="radio" name="nuggets-20" value="8000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(91, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(91, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="91" onclick="toggleExtras(91)">Extras</button>
<div class="div-extras" id="extrasList91" data-button-number="91" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(91)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="39">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="39" style="border: none;">Aros de cebolla x10</button>
  <p id="parrafos-detalles">aros de cebolla x10</p>  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4500</p>
      <input class="radio-button" type="radio" name="aros-cebolla-10" value="4500">
      <p>FT:$4200</p>
      <input class="radio-button" type="radio" name="aros-cebolla-10" value="4200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(39, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(39, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="39" onclick="toggleExtras(39)">Extras</button>
<div class="div-extras" id="extrasList39" data-button-number="39" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(39)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="40">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="40" style="border: none;">Aros de cebolla x20</button>
  <p id="parrafos-detalles">aros de cebolla x20</p>  
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$8500</p>
      <input class="radio-button" type="radio" name="aros-cebolla-20" value="8500">
      <p>FT:$8200</p>
      <input class="radio-button" type="radio" name="aros-cebolla-20" value="8200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(40, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(40, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="40" onclick="toggleExtras(40)">Extras</button>
<div class="div-extras" id="extrasList40" data-button-number="40" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(40)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="41">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="41" style="border: none;">Tequeños de queso</button>
  <p id="parrafos-detalles">Tequeños de queso x6</p>  
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4500</p>
      <input class="radio-button" type="radio" name="tequeños-queso" value="4500">
      <p>FT:$4200</p>
      <input class="radio-button" type="radio" name="tequeños-queso" value="4200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(41, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(41, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="41" onclick="toggleExtras(41)">Extras</button>
<div class="div-extras" id="extrasList41" data-button-number="41" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(41)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="42">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="42" style="border: none;">Tequeños de JyQ</button>
  <p id="parrafos-detalles">Tequeños de JyQ x6</p>  
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4700</p>
      <input class="radio-button" type="radio" name="tequeños-jamon-queso" value="4700">
      <p>FT:$4400</p>
      <input class="radio-button" type="radio" name="tequeños-jamon-queso" value="4400">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(42, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(42, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="42" onclick="toggleExtras(42)">Extras</button>
<div class="div-extras" id="extrasList42" data-button-number="42" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(42)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="43">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="43" style="border: none;">Tequeños mixtos</button>
  <p id="parrafos-detalles">Tequeños de JyQ x3 - tequeños de queso x3</p>  
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4600</p>
      <input class="radio-button" type="radio" name="tequeños-mixtos" value="4600">
      <p>FT:$4200</p>
      <input class="radio-button" type="radio" name="tequeños-mixtos" value="4200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(43, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(43, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="43" onclick="toggleExtras(43)">Extras</button>
<div class="div-extras" id="extrasList43" data-button-number="43" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(43)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="90">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="90" style="border: none;">Tequeños Pizza x6</button>
  <p id="parrafos-detalles">Tequeños Pizza x 6</p>  
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4600</p>
      <input class="radio-button" type="radio" name="tequeños-pizza" value="4600">
      <p>FT:$4200</p>
      <input class="radio-button" type="radio" name="tequeños-pizza" value="4200">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(90, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(90, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="90" onclick="toggleExtras(90)">Extras</button>
<div class="div-extras" id="extrasList90" data-button-number="90" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(90)">Agregar al carrito</button>
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
    

    <div class="div-botones-submenu" data-button-number="44">
<img class="img-producto" src="./productos/super-pollo.png" alt="super pollo"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="44" style="border: none;">Super pollo</button>
  <p id="parrafos-detalles">pollo - mayonesa - cebolla - lechuga - tomate</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4000</p>
      <input class="radio-button" type="radio" name="super-pollo" value="4000">
      <p>FT:$3700</p>
      <input class="radio-button" type="radio" name="super-pollo" value="3700">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(44, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(44, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="44" onclick="toggleExtras(44)">Extras</button>
<div class="div-extras" id="extrasList44" data-button-number="44" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(44)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="45">
<img class="img-producto" src="./productos/pollonator.png" alt="pollonator"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="45" style="border: none;">Pollonator</button>
  <p id="parrafos-detalles">pollo - mayonesa - lechuga - bacon - cheddar</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4200</p>
      <input class="radio-button" type="radio" name="pollonator" value="4200">
      <p>FT:$3900</p>
      <input class="radio-button" type="radio" name="pollonator" value="3900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(45, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(45, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="45" onclick="toggleExtras(45)">Extras</button>
<div class="div-extras" id="extrasList45" data-button-number="45" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(45)">Agregar al carrito</button>
</div>



<div class="div-botones-submenu" data-button-number="46">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="46" style="border: none;">Big pollo</button>
  <p id="parrafos-detalles">pollo x2 - lechuga - pepino - cheddar x2 - pan x3 - cebolla </p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4850</p>
      <input class="radio-button" type="radio" name="big-pollo" value="4850">
      <p>FT:$4550</p>
      <input class="radio-button" type="radio" name="big-pollo" value="4550">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(46, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(46, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="46" onclick="toggleExtras(46)">Extras</button>
<div class="div-extras" id="extrasList46" data-button-number="46" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(46)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="47">
<img class="img-producto" src="./productos/coronel-supremo.png" alt="coronel supremo"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="47" style="border: none;">Coronel supremo</button>
  <p id="parrafos-detalles">pollo x2 - cheddar x2 - lechuga - mayonesa</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4550</p>
      <input class="radio-button" type="radio" name="coronel-supremo" value="4550">
      <p>FT:$4250</p>
      <input class="radio-button" type="radio" name="coronel-supremo" value="4250">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(47, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(47, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="47" onclick="toggleExtras(47)">Extras</button>
<div class="div-extras" id="extrasList47" data-button-number="47" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(47)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="70">
<img class="img-producto" src="./productos/coronel-supremo.png" alt="coronel supremo"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="70" style="border: none;">Pollo extremo</button>
  <p id="parrafos-detalles">faltan</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5300</p>
      <input class="radio-button" type="radio" name="Pollo extremo" value="5300">
      <p>FT:5000</p>
      <input class="radio-button" type="radio" name="Pollo extremo" value="5000">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(70, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(70, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="70" onclick="toggleExtras(70)">Extras</button>
<div class="div-extras" id="extrasList70" data-button-number="70" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(70)">Agregar al carrito</button>
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
    
    
<div class="div-botones-submenu" data-button-number="48">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="48" style="border: none;">Cajita McKing infantil</button>
  <p id="parrafos-detalles">juguete - jugo - hamburguesa con queso - porción de papas fritas</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$7100</p>
      <input class="radio-button" type="radio" name="cajita-mcking" value="7100">
      <p>FT:$6800</p>
      <input class="radio-button" type="radio" name="cajita-mcking" value="6800">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(48, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(48, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="48" onclick="toggleExtras(48)">Extras</button>
<div class="div-extras" id="extrasList48" data-button-number="48" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(48)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="49">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="49" style="border: none;">Combo del dia</button>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$5600</p>
      <input class="radio-button" type="radio" name="combo-del-dia" value="5600">
      <p>FT:$5300</p>
      <input class="radio-button" type="radio" name="combo-del-dia" value="5300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(49, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(49, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="49" onclick="toggleExtras(49)">Extras</button>
<div class="div-extras" id="extrasList49" data-button-number="49" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(49)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="50">
<img class="img-producto" src="./productos/combo-mediano.png" alt="combo mediano"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="50" style="border: none;">Combo mediano</button>
  <p id="parrafos-detalles">gaseosa + papas fritas</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$4100</p>
      <input class="radio-button" type="radio" name="combo-mediano" 
      value="4100">
      <p>FT:$3900</p>
      <input class="radio-button" type="radio" name="combo-mediano" value="3900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(50, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(50, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="50" onclick="toggleExtras(50)">Extras</button>
<div class="div-extras" id="extrasList50" data-button-number="50" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(50)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="51">
<img class="img-producto" src="./productos/gaseosa.png" alt="gaseosa"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="51" style="border: none;">Gaseosa</button>
  <p id="parrafos-detalles">Pepsi - Seven Up</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$1600</p>
      <input class="radio-button" type="radio" name="gaseosa" value="1600">
      <p>FT:$1300</p>
      <input class="radio-button" type="radio" name="gaseosa" value="1300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(51, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(51, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="51" onclick="toggleExtras(51)">Extras</button>
<div class="div-extras" id="extrasList51" data-button-number="51" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(51)">Agregar al carrito</button>
</div>



<div class="div-botones-submenu" data-button-number="52">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="52" style="border: none;">Agua</button>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
      <p>MP:$1400</p>
      <input class="radio-button" type="radio" name="agua" value="1400">
      <p>FT:$1100</p>
      <input class="radio-button" type="radio" name="agua" value="1100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(52, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(52, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="52" onclick="toggleExtras(52)">Extras</button>
<div class="div-extras" id="extrasList52" data-button-number="52" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(52)">Agregar al carrito</button>
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

<div class="div-botones-submenu" data-button-number="60">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="60" style="border: none;">Krilin</button>
  <p id="parrafos-detalles">lechuga - tomate</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$4900</p>
    <input class="radio-button" type="radio" name="milanesa-krilin" value="4900">
    <p>FT:$4600</p>
    <input class="radio-button" type="radio" name="milanesa-krilin" value="4600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(60, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(60, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="60" onclick="toggleExtras(60)">Extras</button>
<div class="div-extras" id="extrasList60" data-button-number="60" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(60)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="61">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="61" style="border: none;">Gohan</button>
  <p id="parrafos-detalles">lechuga - tomate - jamon - queso - huevo</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$5400</p>
    <input class="radio-button" type="radio" name="milanesa-gohan" value="5400">
    <p>FT:$5100</p>
    <input class="radio-button" type="radio" name="milanesa-gohan" value="5100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(61, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(61, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="61" onclick="toggleExtras(61)">Extras</button>
<div class="div-extras" id="extrasList61" data-button-number="61" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(61)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="62">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="62" style="border: none;">Goten</button>
  <p id="parrafos-detalles">Cheddar fundido - bacon - huevo</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$6200</p>
    <input class="radio-button" type="radio" name="milanesa-goten" value="6200">
    <p>FT:$6100</p>
    <input class="radio-button" type="radio" name="milanesa-goten" value="6100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(62, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(62, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="62" onclick="toggleExtras(62)">Extras</button>
<div class="div-extras" id="extrasList62" data-button-number="62" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(62)">Agregar al carrito</button>
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


function toggleSubMenuLomito() {
  const subMenuLomito = document.getElementById('subMenuLomito');
  const botonLomito = document.getElementById('botonLomito');
  if (!subMenuLomitoVisible) {
    const buttonsHTML = `
    
    
<div class="div-botones-submenu" data-button-number="58">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="58" style="border: none;">ShengLomito</button>
  <p id="parrafos-detalles">lechuga - tomate - jamon - queso - huevo</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$7900</p>
    <input class="radio-button" type="radio" name="shenglomito" value=7900">
    <p>FT:$7600</p>
    <input class="radio-button" type="radio" name="shenglomito" value="7600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(58, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(58, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="58" onclick="toggleExtras(58)">Extras</button>
<div class="div-extras" id="extrasList58" data-button-number="58" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(58)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="59">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="59" style="border: none;">Lomito Onión</button>
  <p id="parrafos-detalles">Muzzarella - cebolla salteada - orégano</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$7400</p>
    <input class="radio-button" type="radio" name="lomito-onion" value="7400">
    <p>FT:$7100</p>
    <input class="radio-button" type="radio" name="lomito-onion" value="7100">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(59, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(59, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="59" onclick="toggleExtras(59)">Extras</button>
<div class="div-extras" id="extrasList59" data-button-number="59" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(59)">Agregar al carrito</button>
</div>

`;
    subMenuLomito.innerHTML = buttonsHTML;
    subMenuLomitoVisible = true;
    subMenuLomito.style.display = "flex";
    subMenuLomito.offsetHeight;
    subMenuLomito.style.opacity = "1";
    subMenuLomito.style.transform = "translateY(0)";
    subMenuLomito.style.visibility = "visible";
    subMenuLomito.style.flexDirection = "column";
    subMenuLomito.style.rowGap = "10px";
    subMenuLomito.style.padding = "10px"
    subMenuLomito.style.alignItems = "center"
    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    botonLomito.classList.add('active');
    subMenuLomito.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuLomitoButtons = document.querySelectorAll('.menu-button');
    subMenuLomitoButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuLomito.innerHTML = '';
    }, subMenuLomitoButtons.length * 100);
    subMenuLomitoVisible = false;
    subMenuLomito.style.opacity = "0";
    subMenuLomito.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuLomito.style.visibility = "hidden";
      subMenuLomito.style.display = "none";
    }, 800);
    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    botonLomito.classList.remove('active');
  }

}


function toggleSubMenuPremium() {
  const subMenuPremium = document.getElementById('subMenuPremium');
  const botonPremium = document.getElementById('botonPremium');
  if (!subMenuPremiumVisible) {
    const buttonsHTML = `
    
    
<div class="div-botones-submenu" data-button-number="80">
<img class="img-producto" src="./productos/super-2.png" alt="super 2"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="80" style="border: none;">Super saiyajin Fase 2</button>
  <p id="parrafos-detalles" style="width: 250px;">Carne premium x2 - queso cheddar x4 - panceta premium - salsa a tu gusto!</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$6900</p>
    <input class="radio-button" type="radio" name="super saiyajin fase 2" value="6900">
    <p>FT:$6600</p>
    <input class="radio-button" type="radio" name="super saiyajin fase 2" value="6600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(80, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(80, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="80" onclick="toggleExtras(80)">Extras</button>
<div class="div-extras" id="extrasList80" data-button-number="80" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(80)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="81">
<img class="img-producto" src="./productos/super-3.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="81" style="border: none;">Super saiyajin fase 3</button>
  <p id="parrafos-detalles" style="width: 250px;">Carne premium x3 - cheddar x4 - panceta premium - salsa a tu gusto!</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$9700</p>
    <input class="radio-button" type="radio" name="Super saiyajin fase 3" value="9700">
    <p>FT:$9400</p>
    <input class="radio-button" type="radio" name="Super saiyajin fase 3" value="9400">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(81, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(81, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="81" onclick="toggleExtras(81)">Extras</button>
<div class="div-extras" id="extrasList81" data-button-number="81" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(81)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="82">
<img class="img-producto" src="./productos/super-4.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="82" style="border: none;">Super saiyajin fase 4</button>
  <p id="parrafos-detalles" style="width: 250px;">Carne premium x4 - cheddar x8 - panceta premium - salsa a tu gusto!</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$11900</p>
    <input class="radio-button" type="radio" name="Super saiyajin fase 4" value="11900">
    <p>FT:$11600</p>
    <input class="radio-button" type="radio" name="Super saiyajin fase 4" value="11600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(82, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(82, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="82" onclick="toggleExtras(82)">Extras</button>
<div class="div-extras" id="extrasList82" data-button-number="82" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(82)">Agregar al carrito</button>
</div>

<div class="div-detalles-premium">

<h2 class="titulo-salsa">Salsas Disponibles</h2>
<p style="font-size: 20px;height: 20px;">Barbacoa</p>
<p style="font-size: 20px;height: 20px;">Cuarto de libra</p>
<p style="font-size: 20px;height: 20px;">Tasty</p>
<p style="font-size: 20px;height: 20px;">Mostaza dulce</p>
<p style="font-size: 20px;height: 20px;">Big king</p>
<p style="font-size: 20px;height: 20px;">Mayonesa picante</p>
</div>

`;
    subMenuPremium.innerHTML = buttonsHTML;
    subMenuPremiumVisible = true;
    subMenuPremium.style.display = "flex";
    subMenuPremium.offsetHeight;
    subMenuPremium.style.opacity = "1";
    subMenuPremium.style.transform = "translateY(0)";
    subMenuPremium.style.visibility = "visible";
    subMenuPremium.style.flexDirection = "column";
    subMenuPremium.style.rowGap = "10px";
    subMenuPremium.style.padding = "10px"
    subMenuPremium.style.alignItems = "center"
    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    botonPremium.classList.add('active');
    subMenuPremium.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuPremiumButtons = document.querySelectorAll('.menu-button');
    subMenuPremiumButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuPremium.innerHTML = '';
    }, subMenuPremiumButtons.length * 100);
    subMenuPremiumVisible = false;
    subMenuPremium.style.opacity = "0";
    subMenuPremium.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuPremium.style.visibility = "hidden";
      subMenuPremium.style.display = "none";
    }, 800);
    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    botonPremium.classList.remove('active');
  }

}


function toggleSubMenuJr() {
  const subMenuJr = document.getElementById('subMenuJr');
  const botonJr = document.getElementById('botonJr');
  if (!subMenuJrVisible) {
    const buttonsHTML = `
    
    
<div class="div-botones-submenu" data-button-number="90">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="90" style="border: none;">Simple Junior</button>
  <p id="parrafos-detalles">pan - carne</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$2000</p>
    <input class="radio-button" type="radio" name="simple-junior" value=2000">
    <p>FT:$1700</p>
    <input class="radio-button" type="radio" name="simple-junior" value="1700">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(90, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(90, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="90" onclick="toggleExtras(90)">Extras</button>
<div class="div-extras" id="extrasList90" data-button-number="90" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(90)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="91">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="91" style="border: none;">Simple Queso Junior</button>
  <p id="parrafos-detalles">Pan - Carne - Queso</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$2150</p>
    <input class="radio-button" type="radio" name="simple-queso-junior" value="2150">
    <p>FT:$1850</p>
    <input class="radio-button" type="radio" name="simple-queso-junior" value="1850">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(91, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(91, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="91" onclick="toggleExtras(91)">Extras</button>
<div class="div-extras" id="extrasList91" data-button-number="91" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(91)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="92">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="92" style="border: none;">Clasica Junior</button>
  <p id="parrafos-detalles">Pan - Carne - Queso</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$2600</p>
    <input class="radio-button" type="radio" name="clasica-junior" value="2600">
    <p>FT:$2300</p>
    <input class="radio-button" type="radio" name="clasica-junior" value="2300">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(92, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(92, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="92" onclick="toggleExtras(92)">Extras</button>
<div class="div-extras" id="extrasList92" data-button-number="92" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(92)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="93">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="93" style="border: none;">Doble Cuarto Junior</button>
  <p id="parrafos-detalles">Pan - Carne - Queso</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$2900</p>
    <input class="radio-button" type="radio" name="doble-cuarto-junior" value="2900">
    <p>FT:$2600</p>
    <input class="radio-button" type="radio" name="doble-cuarto-junior" value="2600">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(93, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(93, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="93" onclick="toggleExtras(93)">Extras</button>
<div class="div-extras" id="extrasList93" data-button-number="93" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(93)">Agregar al carrito</button>
</div>

`;
    subMenuJr.innerHTML = buttonsHTML;
    subMenuJrVisible = true;
    subMenuJr.style.display = "flex";
    subMenuJr.offsetHeight;
    subMenuJr.style.opacity = "1";
    subMenuJr.style.transform = "translateY(0)";
    subMenuJr.style.visibility = "visible";
    subMenuJr.style.flexDirection = "column";
    subMenuJr.style.rowGap = "10px";
    subMenuJr.style.padding = "10px"
    subMenuJr.style.alignItems = "center"
    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    botonJr.classList.add('active');
    subMenuJr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuJrButtons = document.querySelectorAll('.menu-button');
    subMenuJrButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuJr.innerHTML = '';
    }, subMenuJrButtons.length * 100);
    subMenuJrVisible = false;
    subMenuJr.style.opacity = "0";
    subMenuJr.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuJr.style.visibility = "hidden";
      subMenuJr.style.display = "none";
    }, 800);
    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    botonJr.classList.remove('active');
  }

}


function toggleSubMenuPromos() {
  const subMenuPromos = document.getElementById('subMenuPromos');
  const botonPromos = document.getElementById('botonPromos');
  if (!subMenuJrVisible) {
    const buttonsHTML = `
    
    
<div class="div-botones-submenu" data-button-number="94">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="94" style="border: none;">Promo 1</button>
  <p id="parrafos-detalles">Onion + Simple Queso + Cuarto</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$12000</p>
    <input class="radio-button" type="radio" name="promo-1" value="12000">
    <p>FT:$10900</p>
    <input class="radio-button" type="radio" name="promo-1" value="10900">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(94, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(94, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="94" onclick="toggleExtras(94)">Extras</button>
<div class="div-extras" id="extrasList94" data-button-number="94" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(94)">Agregar al carrito</button>
</div>


<div class="div-botones-submenu" data-button-number="95">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="95" style="border: none;">Promo 2</button>
  <p id="parrafos-detalles">Dobles x2 + Papas Cheddar</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$13800</p>
    <input class="radio-button" type="radio" name="promo-2" value="13800">
    <p>FT:$13500</p>
    <input class="radio-button" type="radio" name="promo-2" value="13500">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(95, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(95, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="95" onclick="toggleExtras(95)">Extras</button>
<div class="div-extras" id="extrasList95" data-button-number="95" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(95)">Agregar al carrito</button>
</div>

<div class="div-botones-submenu" data-button-number="96">
<img class="img-producto" src="./productos/magnifica.png" alt="magnifica"></img>
<div class="div-detalles-productos">
  <button class="menu-button sub-menu-button" data-button-number="96" style="border: none;">Promo 3</button>
  <p id="parrafos-detalles">Duo + Baconator + Doritos mag</p>
  <div class="div-precio-producto" style="    display: flex;
    align-items: center;
    flex-direction: row;">
    <p>MP:$16300</p>
    <input class="radio-button" type="radio" name="promo-3" value="16300">
    <p>FT:$15400</p>
    <input class="radio-button" type="radio" name="promo-3" value="15400">
  </div>
  <div style="    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;">
      <button class="counter-button" onclick="updateCounter(96, 'decrement')">-</button>
      <span class="counter-value">0</span>
      <button class="counter-button" onclick="updateCounter(96, 'increment')">+</button>
  </div>
</div>
</div>
<button class="boton-extras" data-button-number="96" onclick="toggleExtras(96)">Extras</button>
<div class="div-extras" id="extrasList96" data-button-number="96" style="display: none;">
</div>
<div class="div-boton-agregar">
<button class="boton-agregar" onclick="agregarAlPedido(96)">Agregar al carrito</button>
</div>

`;
    subMenuPromos.innerHTML = buttonsHTML;
    subMenuPromosVisible = true;
    subMenuPromos.style.display = "flex";
    subMenuPromos.offsetHeight;
    subMenuPromos.style.opacity = "1";
    subMenuPromos.style.transform = "translateY(0)";
    subMenuPromos.style.visibility = "visible";
    subMenuPromos.style.flexDirection = "column";
    subMenuPromos.style.rowGap = "10px";
    subMenuPromos.style.padding = "10px"
    subMenuPromos.style.alignItems = "center"
    // Agrega la clase 'active' al botón1 cuando se despliega el submenú
    botonPromos.classList.add('active');
    subMenuPromos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    event.preventDefault();
  } else {
    const subMenuPromosButtons = document.querySelectorAll('.menu-button');
    subMenuPromosButtons.forEach(button => {
      button.classList.remove('initial');
    });
    setTimeout(() => {
      subMenuPromos.innerHTML = '';
    }, subMenuPromosButtons.length * 100);
    subMenuPromosVisible = false;
    subMenuPromos.style.opacity = "0";
    subMenuPromos.style.transform = "translateY(-20px)";
    setTimeout(() => {
      subMenuPromos.style.visibility = "hidden";
      subMenuPromos.style.display = "none";
    }, 800);
    // Quita la clase 'active' al botón1 cuando se contrae el submenú
    botonPromos.classList.remove('active');
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
    <div class="extra-item" data-extra-number="1" data-price="1800">
      <p>Carne<br>Pollo</p>
      <button class="counter-button" onclick="updateExtrasCounter(1, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-1">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(1, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-1">$1800</p>
    </div>
    <div class="extra-item" data-extra-number="2" data-price="1000">
      <p>Cheddar<br>feta</p>
      <button class="counter-button" onclick="updateExtrasCounter(2, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-2">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(2, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-2">$1000</p>
    </div>
    <div class="extra-item" data-extra-number="3" data-price="1150">
      <p>Cheddar<br>fundido</p>
      <button class="counter-button" onclick="updateExtrasCounter(3, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-3">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(3, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-3">$1150</p>
    </div>
    <div class="extra-item" data-extra-number="4" data-price="950">
      <p>Jamon<br>Queso</p>
      <button class="counter-button" onclick="updateExtrasCounter(4, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-4">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(4, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-4">$950</p>
    </div>
    <div class="extra-item" data-extra-number="5" data-price="1150">
      <p>Bacon</p>
      <button class="counter-button" onclick="updateExtrasCounter(5, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-5">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(5, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-5">$1150</p>
    </div>
    <div class="extra-item" data-extra-number="6" data-price="850">
      <p>Huevo</p>
      <button class="counter-button" onclick="updateExtrasCounter(6, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-6">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(6, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-6">$850</p>
    </div>
    <div class="extra-item" data-extra-number="7" data-price="600">
      <p>Pepino</p>
      <button class="counter-button" onclick="updateExtrasCounter(7, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-7">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(7, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-7">$600</p>
    </div>
    <div class="extra-item" data-extra-number="8" data-price="800">
      <p>Lechuga<br>Tomate</p>
      <button class="counter-button" onclick="updateExtrasCounter(8, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-8">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(8, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-8">$800</p>
    </div>
    <div class="extra-item" data-extra-number="9" data-price="1100">
      <p>Salsa</p>
      <button class="counter-button" onclick="updateExtrasCounter(9, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-9">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(9, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-9">$1100</p>
    </div>
    <div class="extra-item" data-extra-number="10" data-price="1200">
      <p>Doritos<br>P pay</p>
      <button class="counter-button" onclick="updateExtrasCounter(10, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-10">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(10, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-10">$1200</p>
    </div>
    <div class="extra-item" data-extra-number="11" data-price="1500">
      <p>Nuggets<br>x 4</p>
      <button class="counter-button" onclick="updateExtrasCounter(11, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-11">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(11, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-11">$1500</p>
    </div>
    <div class="extra-item" data-extra-number="12" data-price="800">
      <p>Verdeo</p>
      <button class="counter-button" onclick="updateExtrasCounter(12, 'decrement', ${buttonNumber})">-</button>
      <span class="counter-value" id="counter-value-${buttonNumber}-12">0</span>
      <button class="counter-button" onclick="updateExtrasCounter(12, 'increment', ${buttonNumber})">+</button>
      <p id="extra-price-12">$800</p>
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
    console.error('No se encontraron elementos necesarios para Agregar al carrito');
    return;
  }
  const itemName = itemNameElement.textContent;
  const itemPrice = parseFloat(selectedInputElement.value);
  const itemCount = counters[buttonNumber];
  const extraItems = document.querySelectorAll(`.div-extras[data-button-number="${buttonNumber}"] .extra-item`);

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
  if (total.textContent == '$0.00') {
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