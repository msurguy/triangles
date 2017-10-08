(function(){

  //------------------------------
  // Mesh Properties
  //------------------------------
  var MESH = {
    width: 1.2,
    height: 1.2,
    slices: 250,
    depth: 0,
    maxdepth: 200,
    ambient: '#555555',
    diffuse: '#FFFFFF'
  };

  //------------------------------
  // Light Properties
  //------------------------------
  var LIGHT = {
    count: 0,
    xPos : 0,
    yPos : 200,
    zOffset: 100,
    ambient: '#880066',
    diffuse: '#FF8800',
    pickedup :true,
    proxy : false,
    currIndex : 0,
    randomize : function(){
      var x,y,z;
      var decider = Math.floor(Math.random() * 3) + 1;

      if (decider == 1) MESH.depth = 0;
      if (decider == 2) MESH.depth = Math.randomInRange(0, 150);
      if (decider == 3) MESH.depth = Math.randomInRange(150, 200);

      for (l = scene.lights.length - 1; l >= 0; l--) {
        x = Math.randomInRange(-mesh.geometry.width/2, mesh.geometry.width/2);
        y = Math.randomInRange(-mesh.geometry.height/2, mesh.geometry.height/2);
        if(scene.lights.length > 2) z = Math.randomInRange(10, 80);
        else z = Math.randomInRange(10, 100);

        light = scene.lights[l];
        FSS.Vector3.set(light.position, x, y, z);

        var diffuse = getRandomColor();
        var ambient = getRandomColor();

        light.diffuse.set(diffuse);
        light.diffuseHex = light.diffuse.format();

        light.ambient.set(ambient);
        light.ambientHex = light.ambient.format();

        LIGHT.xPos    = x;
        LIGHT.yPos    = y;
        LIGHT.zOffset = z;
        LIGHT.diffuse = diffuse;
        LIGHT.ambient = ambient;

        // Hacky way to allow manual update of the HEX colors for light's diffuse
        gui.__folders.Light.__controllers[1].updateDisplay();
        gui.__folders.Light.__controllers[2].updateDisplay();
      }
    }
  };

  //------------------------------
  // Render Properties
  //------------------------------
  var WEBGL = 'webgl';
  var CANVAS = 'canvas';
  var SVG = 'svg';
  var RENDER = {
    renderer: CANVAS
  };

  //------------------------------
  // Export Properties
  //------------------------------
  var EXPORT = {
    width: 2000,
    height: 1000,

    exportCurrent: function(){
      switch(RENDER.renderer) {
        case WEBGL:
          webglRenderer.element.toBlob(function (canvasContentBlob) {
                  saveAs( canvasContentBlob, 'triangles-download.png');
                }, 'image/png');
          break;
        case CANVAS:
          canvasRenderer.element.toBlob(function (canvasContentBlob) {
                saveAs( canvasContentBlob, 'triangles-download.png');
              }, 'image/png');
          break;
        case SVG:
          var blob = new Blob([output.innerHTML], {type: "image/svg+xml"});
          saveAs(blob, "triangles-download.svg");
          break;
      }
    },
    export: function() {
      var l, x, y, light,
        scalarX = this.width / renderer.width,
        scalarY = this.height / renderer.height;

      // store a temp value of the slices
      var slices = MESH.slices;
      // Increase or decrease number of slices depending on the size of the canvas
      MESH.slices = Math.ceil(slices*scalarX*1.4);

      // Regenerate the whole canvas
      resize(this.width, this.height);

      // restore the number of slices
      MESH.slices = slices;

      // Move the lights on the plane to accomodate the size of the canvas
      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        x = light.position[0];
        y = light.position[1];
        z = light.position[2];
        FSS.Vector3.set(light.position, x*scalarX, y*scalarY, z*scalarX);
      }

      // Update depth of the triangles
      update();
      // Render the canvas
      render();

      switch(RENDER.renderer) {
        case WEBGL:
          webglRenderer.element.toBlob(function (canvasContentBlob) {
                  saveAs( canvasContentBlob, 'triangles-download.png');
                }, 'image/png');
          break;
        case CANVAS:
          canvasRenderer.element.toBlob(function (canvasContentBlob) {
                saveAs( canvasContentBlob, 'triangles-download.png');
              }, 'image/png');
          break;
        case SVG:
          var blob = new Blob([output.innerHTML], {type: "image/svg+xml"});
          saveAs(blob, "triangles-download.svg");
          break;
      }

      resize(container.offsetWidth, container.offsetHeight);

      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        x = light.position[0];
        y = light.position[1];
        z = light.position[2];
        FSS.Vector3.set(light.position, x/scalarX, y/scalarY, z/scalarX);
      }
    }
  };


  //------------------------------
  // Global Properties
  //------------------------------
  var center = FSS.Vector3.create();
  var container = document.getElementById('container');
  var controls = document.getElementById('controls');
  var output = document.getElementById('output');
  var renderer, scene, mesh, geometry, material;
  var webglRenderer, canvasRenderer, svgRenderer;
  var gui;

  //------------------------------
  // Methods
  //------------------------------
  function initialise() {
    createRenderer();
    createScene();
    createMesh();
    addLights();
    addEventListeners();
    addControls();
    LIGHT.randomize();
    resize(container.offsetWidth, container.offsetHeight);
    animate();
  }

  function createRenderer() {
    webglRenderer = new FSS.WebGLRenderer();
    canvasRenderer = new FSS.CanvasRenderer();
    svgRenderer = new FSS.SVGRenderer();
    setRenderer(RENDER.renderer);
  }

  function setRenderer(index) {
    if (renderer) {
      output.removeChild(renderer.element);
    }
    switch(index) {
      case WEBGL:
        renderer = webglRenderer;
        break;
      case CANVAS:
        renderer = canvasRenderer;
        break;
      case SVG:
        renderer = svgRenderer;
        break;
    }
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    output.appendChild(renderer.element);
  }

  function createScene() {
    scene = new FSS.Scene();
  }

  function createMesh() {
    scene.remove(mesh);
    renderer.clear();
    geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.slices);
    material = new FSS.Material(MESH.ambient, MESH.diffuse);
    mesh = new FSS.Mesh(geometry, material);
    scene.add(mesh);

    // Augment vertices for depth modification
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.depth = Math.randomInRange(0, MESH.maxdepth/10);
      vertex.anchor = FSS.Vector3.clone(vertex.position);
    }
  }

  // Add a single light
  function addLight(ambient, diffuse, x, y, z) {
    ambient = typeof ambient !== 'undefined' ? ambient : LIGHT.ambient;
    diffuse = typeof diffuse !== 'undefined' ? diffuse : getRandomColor();
    x = typeof x !== 'undefined' ? x : LIGHT.xPos;
    y = typeof y !== 'undefined' ? y : LIGHT.yPos;
    z = typeof z !== 'undefined' ? z : LIGHT.zOffset;

    renderer.clear();
    light = new FSS.Light(ambient, diffuse);
    light.ambientHex = light.ambient.format();
    light.diffuseHex = light.diffuse.format();
    light.setPosition(x, y, z);
    scene.add(light);
    LIGHT.diffuse = diffuse;
    LIGHT.proxy = light;
    LIGHT.pickedup = true;
    LIGHT.currIndex++;
  }

  function addLights() {
    var num = Math.floor(Math.random() * 4) + 1;
    
    for (var i = num - 1; i >= 0; i--) {
      addLight();
      LIGHT.count++;
    };
  }

  // Remove lights 
  function trimLights(value) {
    for (l = value; l <= scene.lights.length; l++) {
      light = scene.lights[l];
      scene.remove(light);
      LIGHT.currIndex--;
    }
    LIGHT.proxy = scene.lights[LIGHT.currIndex-1];
    LIGHT.pickedup = false;

    renderer.clear();
  }

  // Resize canvas
  function resize(width, height) {
    renderer.setSize(width, height);
    FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
    createMesh();
  }

  function animate() {
    update();
    render();
    requestAnimationFrame(animate);
  }

  function update() {
    var v, vertex, offset = MESH.depth/100;
    
    // Add depth to Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      FSS.Vector3.set(vertex.position, 1, 1, vertex.depth*offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
  }

  function render() {
    renderer.render(scene);
  }

  function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('mousemove', onMouseMove);
  }

  function addControls() {
    var i, l, light, folder, controller;

    // Create GUI
    gui = new dat.GUI({autoPlace:false});

    controls.appendChild(gui.domElement);

    // Create folders
    renderFolder = gui.addFolder('Render');
    meshFolder = gui.addFolder('Mesh');
    lightFolder = gui.addFolder('Light');
    exportFolder = gui.addFolder('Export');

    // Open folders
    lightFolder.open();

    // Add Render Controls
    controller = renderFolder.add(RENDER, 'renderer', {webgl:WEBGL, canvas:CANVAS, svg:SVG});
    controller.onChange(function(value) {
      setRenderer(value);
    });

    // Add Mesh Controls
    controller = meshFolder.addColor(MESH, 'ambient');
    controller.onChange(function(value) {
      for (i = 0, l = scene.meshes.length; i < l; i++) {
        scene.meshes[i].material.ambient.set(value);
      }
    });
    controller = meshFolder.addColor(MESH, 'diffuse');
    controller.onChange(function(value) {
      for (i = 0, l = scene.meshes.length; i < l; i++) {
        scene.meshes[i].material.diffuse.set(value);
      }
    });
    controller = meshFolder.add(MESH, 'width', 0.05, 2);
    controller.onChange(function(value) {
      if (geometry.width !== value * renderer.width) { createMesh(); }
    });
    controller = meshFolder.add(MESH, 'height', 0.05, 2);
    controller.onChange(function(value) {
      if (geometry.height !== value * renderer.height) { createMesh(); }
    });

    controller = meshFolder.add(MESH, 'depth', 0, MESH.maxdepth).listen();

    controller = meshFolder.add(MESH, 'slices', 1, 800);
    controller.step(1);
    controller.onChange(function(value) {
      if (geometry.slices !== value) { createMesh(); }
    });

    // Add Light Controls
    // TODO: add the number of lights dynamically
    controller = lightFolder.add(LIGHT, 'currIndex', {1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7}).name('Current light').listen();
    controller.onChange(function(value) {
      LIGHT.proxy = scene.lights[value-1];

      LIGHT.ambient = LIGHT.proxy.ambient.hex;
      LIGHT.diffuse = LIGHT.proxy.diffuse.hex;
      LIGHT.xPos    = LIGHT.proxy.position[0];
      LIGHT.yPos    = LIGHT.proxy.position[1];
      LIGHT.zOffset = LIGHT.proxy.position[2];

      // Hacky way to allow manual update of the HEX colors for light's ambient and diffuse
      gui.__folders.Light.__controllers[1].updateDisplay();
      gui.__folders.Light.__controllers[2].updateDisplay();
    });

    controller = lightFolder.addColor(LIGHT, 'ambient');
    controller.onChange(function(value) {
      LIGHT.proxy.ambient.set(value);
      LIGHT.proxy.ambientHex =  LIGHT.proxy.ambient.format();
    });

    controller = lightFolder.addColor(LIGHT, 'diffuse');
    controller.onChange(function(value) {
      LIGHT.proxy.diffuse.set(value);
      LIGHT.proxy.diffuseHex = LIGHT.proxy.diffuse.format();
    });

    controller = lightFolder.add(LIGHT, 'count', 1, 7).listen();
    controller.step(1);
    controller.onChange(function(value) {
      if (scene.lights.length !== value) { 
        // If the value is more then the number of lights, add lights, otherwise delete lights from the scene
        if (value > scene.lights.length) {
          addLight(); 
        } else {
          trimLights(value);
        }
      }
    });

    controller = lightFolder.add(LIGHT, 'xPos', -mesh.geometry.width/2, mesh.geometry.width/2).listen();
    controller.step(1);
    controller.onChange(function(value) {
      LIGHT.proxy.setPosition(value, LIGHT.proxy.position[1], LIGHT.proxy.position[2]);
    });

    controller = lightFolder.add(LIGHT, 'yPos', -mesh.geometry.height/2, mesh.geometry.height/2).listen();
    controller.step(1);
    controller.onChange(function(value) {
      LIGHT.proxy.setPosition(LIGHT.proxy.position[0], value, LIGHT.proxy.position[2]);
    });

    controller = lightFolder.add(LIGHT, 'zOffset', 0, 1000).name('Distance').listen();
    controller.step(1);
    controller.onChange(function(value) {
      LIGHT.proxy.setPosition(LIGHT.proxy.position[0], LIGHT.proxy.position[1], value);
    });

    controller = lightFolder.add(LIGHT, 'randomize');

    // Add Export Controls
    controller = exportFolder.add(EXPORT, 'width', 100, 3000);
    controller.step(100);
    controller = exportFolder.add(EXPORT, 'height', 100, 3000);
    controller.step(100);
    controller = exportFolder.add(EXPORT, 'export').name('export big');
    controller = exportFolder.add(EXPORT, 'exportCurrent').name('export this');
    
  }

  function toggleEl(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
       e.style.display = 'none';
    else
       e.style.display = 'block';
  }

  function getRandomColor(){
    return '#'+(Math.random().toString(16) + '000000').slice(2, 8);
  }

  //------------------------------
  // Callbacks
  //------------------------------

  function onWindowResize(event) {
    resize(container.offsetWidth, container.offsetHeight);
    render();
  }

  function onMouseMove(event) {
    if(LIGHT.pickedup){
      LIGHT.xPos = event.x - renderer.width/2;
      LIGHT.yPos = renderer.height/2 -event.y;
      LIGHT.proxy.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.proxy.position[2]);
    } 
  }

  // Hide the controls completely on pressing H
  Mousetrap.bind('H', function() { 
    toggleEl('controls');
    toggleEl('links');

  });

  // Add a light on ENTER key
  Mousetrap.bind('enter', function() { 
    LIGHT.count++;
    addLight(); 
  });

  // Pick up the light when a space is pressed
  Mousetrap.bind('space', function() { 
    LIGHT.pickedup = !LIGHT.pickedup;
  });

  // Let there be light!
  initialise();

})();