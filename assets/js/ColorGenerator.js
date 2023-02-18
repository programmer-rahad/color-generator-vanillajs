var databaseURL = window.location.href.split('/#/')[0] + '/assets/database.json';
console.log(databaseURL);
function getData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('get', url);

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var { header } = this.response;
        callback(header)
      } else {
        console.log('Not Found!');
      }
    }
  }
  xhr.send();
}
function ColorGenerator() {
  var simpleColors = ['red', 'green', 'blue', 'orange', 'deeppink', 'aqua', 'violet', 'brown'];
  var hexColors = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var outputDOM = document.querySelector('.output span');
  var links = document.querySelectorAll('header .links a');
  // var route = window.location.href.split('/#/')[1];

  // const 
  var temp = document.location.hash.split('#/')[1];
  var route = temp !== 'simple' && temp !== 'rgb' && temp !== 'hex' ? 'simple' : temp;



  this.state = {
    route,
    color: simpleColors[0]
  };
  this.showColor = function () {
    var route = this.state.route;
    switch (route) {
      case "simple":
        this.getSimpleColor();
        break;
      case "hex":
        this.getHexColor();
        break;
      default:
        this.getRGB();
    }

    var color = this.state.color;
    outputDOM.innerHTML = color;
    document.body.style.backgroundColor = color;
  }
  this.getHeader = function () {
    function renderLogo(text) {
      var logoDOM = document.querySelector('header .logo')
      logoDOM.innerHTML = text;
    }
    function renderMenu(menuLinks) {
      var linksDOM = document.querySelector('header .links')
      var arr = [];
      for (var i = 0; i < menuLinks.length; i++) {
        var text = menuLinks[i].text;
        // console.log(this);
        // console.log(this.state.route);
        arr[arr.length] = `
          <a href="/#/${text}" ${text === this.state.route ? 'class="active"' : ''}>
              ${text}
          </a>
        `;
      }
      linksDOM.innerHTML = arr.join('&nbsp;');
    }
    getData(databaseURL, function (header) {
      var logoText = header.logoText;
      var menus = header.menus;
      renderLogo(logoText);
      renderMenu.call(this, menus);
      links = document.querySelectorAll('header .links a');
      // this.state.route === 'simple' && links[0].click();
      if (this.state.route === 'simple') {
        history.pushState(null, null, '/#/simple');
      }
      this.events();
    }.bind(this));
  }
  this.reset = function () {
    this.getHeader();
    this.showColor();
  }
  this.getSimpleColor = function () {
    var color = simpleColors[Math.floor(Math.random() * simpleColors.length)];
    this.state.color = color;
  }
  this.getHexColor = function () {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += hexColors[Math.floor(Math.random() * hexColors.length)]
    }
    this.state.color = color;
  }
  this.getRGB = function () {
    var color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    // console.log(this.state.color);
    this.state.color = color;
  }
  this.events = function () {
    var colorChangeButton = document.querySelector('.color-change-button');

    var $this = this;
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {

        // Set Route
        $this.state.route = this.innerText.toLowerCase();
        $this.showColor();

        // Toggle Active Class
        for (var i = 0; i < links.length; i++) {
          links[i].className = this !== links[i] ? '' : 'active';
        };


      });
    }
    colorChangeButton.addEventListener('click', function () {


      $this.showColor();

    })


  }
  this.init = function () {
    this.reset();
  }
  this.init();

}

export default ColorGenerator;