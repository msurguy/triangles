/**
defines the Triangles namespace.
@author Max Karpawich - uses work originally released by Maksim Surguy in 2014
**/
Triangles = {};

/**
returns a random 6-digit hexidecimal color
**/
Triangles.randomColor = function() {
  return '#'+(Math.random().toString(16) + '000000').slice(2, 8);
};

/**
@class Triangles.Mesh
@author Max Karpawich - uses work originally released by Maksim Surguy in 2014

the params structure:
- width (decimal 0.5 > 2.0) the width of the Mesh geometry relative to its container
- height (decimal 0.5 > 2.0) the height of the Mesh geometry relative to its container
- slices (integer 1 > 800) the number of "slices" (triangles) which compose the Mesh
- depth (0 > 200) the depth of the Mesh
- ambient (hex) the ambient color of the Mesh material
- diffuse (hex) the diffuse color of the Mesh material
**/
Triangles.Mesh = function(settings,parent) {
  //random number for deciding mesh depth
  var r = Math.floor(Math.random() * 3);
  //assign values to each Mesh variable using settings
  //1. if a settings variable is undefined, use a default value
  //2. if a settings variable is a function, use the function's return value
  //3. if a settings variable is anything else, use that variable's value
  this.width_value = (typeof settings.width == 'undefined') ? 1.2 : (typeof settings.width == 'function') ? settings.width() : settings.width;
  this.height_value = (typeof settings.height == 'undefined') ? 1.2 : (typeof settings.height == 'function') ? settings.height(): settings.height;
  this.slices_value = (typeof settings.slices == 'undefined') ? 250 : (typeof settings.slices == 'function') ? settings.slices() : settings.slices;
  this.depth_value = (typeof settings.depth == 'undefined') ? ((r == 0) ? 0 : ((r == 1) ? Math.randomInRange(0, 150) : Math.randomInRange(150, 200))) : (typeof settings.depth == 'function') ? settings.depth() : settings.depth;
  this.ambient_value = (typeof settings.ambient == 'undefined') ? Triangles.randomColor() : (typeof settings.ambient == 'function') ? settings.ambient() : settings.ambient;
  this.diffuse_value = (typeof settings.diffuse == 'undefined') ? Triangles.randomColor() : (typeof settings.diffuse == 'function') ? settings.diffuse() : settings.diffuse;

  //provide a reference back to the Element which declared this Mesh
  this.parent = parent;
};

/**
the width of the Mesh geometry relative to its container (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.width = function(value) {
  if (typeof value == 'undefined') {
    return this.width_value;
  }else{
    this.width_value = value;
    this.parent.mesh(true);
  }
};

/**
the height of the Mesh geometry relative to its container (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.height = function(value) {
  if (typeof value == 'undefined') {
    return this.height_value;
  }else{
    this.height_value = value;
    this.parent.mesh(true);
  }
};

/**
the number of "slices" (triangles) which compose the Mesh (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.slices = function(value) {
  if (typeof value == 'undefined') {
    return this.slices_value;
  }else{
    this.slices_value = value;
    this.parent.mesh(true);
  }
};

/**
the depth of the Mesh (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.depth = function(value) {
  if (typeof value == 'undefined') {
    return this.depth_value;
  }else{
    this.depth_value = value;
  }
}

/**
the ambient color of the Mesh material (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.ambient = function(value) {
  if (typeof value == 'undefined') {
    return this.ambient_value;
  }else{
    this.ambient_value = value;
    for (var i = 0; i < this.parent.scene.meshes.length; i++) {
      this.parent.scene.meshes[i].material.ambient.set(value);
    }
  }
};

/**
the diffuse color of the Mesh material (see Triangles.Mesh constructor for recommended values)
**/
Triangles.Mesh.prototype.diffuse = function(value) {
  if (typeof value == 'undefined') {
    return this.diffuse_value;
  }else{
    this.diffuse_value = value;
    for (var i = 0; i < this.parent.scene.meshes.length; i++) {
      this.parent.scene.meshes[i].material.diffuse.set(value);
    }
  }
}

/**
@class Triangles.Light
@author Max Karpawich - uses work originally released by Maksim Surguy in 2014

the settings structure:
- x (decimal 0 > 1) the x coordinate of the Light
- y (decimal 0 > 1) the y coordinate of the Light
- z (decimal 0 > 1000) the z coordinate of the Light
- ambient (hex) the ambient color of the Light
- diffuse (hex) the diffuse color of the Light
**/
Triangles.Light = function(settings,parent) {
  //provide a reference back to the Element which declared this Light
  this.parent = parent;
  //reset the renderer
  parent.renderer_value.clear();
  //create the light in the scene
  this.light_value = new FSS.Light();
  parent.scene.add(this.light_value);
  //assign values to each Light variable using settings
  //1. if a settings variable is undefined, use a default value
  //2. if a settings variable is a function, use the function's return value
  //3. if a settings variable is anything else, use that variable's value
  this.x((typeof settings.x == 'undefined') ? Math.random() : (typeof settings.x == 'function') ? settings.x() : settings.x);
  this.y((typeof settings.y == 'undefined') ? Math.random() : (typeof settings.y == 'function') ? settings.y() : settings.y);
  this.z((typeof settings.z == 'undefined') ? ((parent.scene.lights.length) ? Math.randomInRange(10, 80) : Math.randomInRange(10, 100)) : (typeof settings.z == 'function') ? settings.z() : settings.z);
  this.ambient((typeof settings.ambient == 'undefined') ? Triangles.randomColor() : (typeof settings.ambient == 'function') ? settings.ambient() : settings.ambient);
  this.diffuse((typeof settings.diffuse == 'undefined') ? Triangles.randomColor() : (typeof settings.diffuse == 'function') ? settings.diffuse() : settings.diffuse);
  //animate the Element associated with the Light to reflect the change
  parent.animate();
}

/**
converts an x value (0 to 1) to an x coordinate in the scene
**/
Triangles.Light.prototype.convertX = function(x) {
  return -this.parent.mesh_value.geometry.width/2 + this.parent.mesh_value.geometry.width * x;
};

/**
converts an y value (0 to 1) to an y coordinate in the scene
**/
Triangles.Light.prototype.convertY = function(y) {
  return this.parent.mesh_value.geometry.height/2 - this.parent.mesh_value.geometry.height * y;
};

/**
the x coordinate of the Light (see Triangles.Light constructor for recommended values)
**/
Triangles.Light.prototype.x = function(value) {
  if (typeof value == 'undefined') {
    return this.x_value;
  }else{
    this.x_value = value;
    var light = this.light_value;
    light.setPosition(this.convertX(value),light.position[1],light.position[2]);
  }
};

/**
the y coordinate of the Light (see Triangles.Light constructor for recommended values)
**/
Triangles.Light.prototype.y = function(value) {
  if (typeof value == 'undefined') {
    return this.y_value;
  }else{
    this.y_value = value;
    var light = this.light_value;
    light.setPosition(light.position[0],this.convertY(value),light.position[2]);
  }
};

/**
the z coordinate of the Light (see Triangles.Light constructor for recommended values)
**/
Triangles.Light.prototype.z = function(value) {
  if (typeof value == 'undefined') {
    return this.z_value;
  }else{
    this.z_value = value;
    var light = this.light_value;
    light.setPosition(light.position[0],light.position[1],value);
  }
};

/**
the ambient color of the Light (see Triangles.Light constructor for recommended values)
**/
Triangles.Light.prototype.ambient = function(value) {
  if (typeof value == 'undefined') {
    return this.ambient_value;
  }else{
    this.ambient_value = value;
    var light = this.light_value;
    light.ambient.set(value);
    light.ambientHex = light.ambient.format();
  }
};

/**
 the diffuse color of the Light (see Triangles.Light constructor for recommended values)
**/
Triangles.Light.prototype.diffuse = function(value) {
  if (typeof value == 'undefined') {
    return this.diffuse_value;
  }else{
    this.diffuse_value = value;
    var light = this.light_value;
    light.diffuse.set(value);
    light.diffuseHex = light.diffuse.format();
  }
};

/**
@class Triangles.LightArray
@author Max Karpawich - uses work originally released by Maksim Surguy in 2014

the settings can be 1 of 3 types:
1. number - specifies a certain number of random lights to be added to the scene
2. array - for each light setting (see Triangles.Light) a corresponding light is added
3. undefined - adds a random number of random lights to the scene
**/
Triangles.LightArray = function(settings,parent) {
  this.parent = parent;
  this.arr = [];
  var i;
  if (typeof settings == 'number') {
    for (i = 0; i < settings; i++) {
      this.add();
    }
  }else if (Array.isArray(settings)) {
    for (i = 0; i < settings.length; i++) {
      this.add(settings[i]);
    }
  }else{
    var r = Math.floor(Math.random() * 4) + 1;
    for(i = 0; i < r; i++) {
      this.add();
    }
  }
};

/**
adds a new light to the scene with the specified settings
**/
Triangles.LightArray.prototype.add = function(settings) {
  this.arr.push(new Triangles.Light(settings || {},this.parent));
};

/**
removes a light from the scene at the specified index
**/
Triangles.LightArray.prototype.remove = function(i) {
  this.parent.scene.lights.splice(i,1);
  this.arr.splice(i,1);
};

/**
returns a light at the specified index
**/
Triangles.LightArray.prototype.get = function(i) {
  return this.arr[i];
};

/**
returns the number of lights in the scene
**/
Triangles.LightArray.prototype.length = function() {
  return this.arr.length;
}

/**
@class Triangles.Element
@author Max Karpawich - uses work originally released by Maksim Surguy in 2014

the params structure:
- id (string): the DOM id of the Element
- animate (bool): whether the Element will be animated by Triangles.animate.
- renderType (string) : the type of renderer used for the Element (see Triangles.Element.renderer())
- mesh (object) : the mesh settings (see Triangles.Mesh)
- lights : the light settings (see Triangles.LightArray)
**/
Triangles.Element = function(params) {
  //local variables
  var r;

  //transfer variables from params
  this.willAnimate = params.animate || false;

  //initialize the centerpoint of the renderer
  this.center = FSS.Vector3.create();

  //attach ourselves to the DOM element with id params.id
  this.container = document.getElementById(params.id);

  //create a copy of params.settings to prevent modification
  var settings = params.settings || {};

  //create the renderer using params.renderType
  this.renderer(params.renderType || '');

  //initialize the scene
  this.scene = new FSS.Scene();

  //deal with mesh settings from params.settings.mesh
  this.MESH = new Triangles.Mesh(settings.mesh || {},this)

  //create the scene mesh
  this.mesh(true);

  //deal with light settings from params.settings.lights
  this.LIGHTS = new Triangles.LightArray(settings.lights || {},this);

  //add resize listener to container
  var _this = this;
  window.addEventListener('resize',function(event) {
    _this.resize();
    _this.render();
  });

  //resize the renderer to match container dimensions
  this.resize();

  //update and render the scene
  this.animate();

};

  /**
  resizes the container, renderer, and mesh based on the container width and height
  **/
  Triangles.Element.prototype.resize = function() {
    this.renderer_value.setSize(this.container.offsetWidth,this.container.offsetHeight);
    FSS.Vector3.set(this.center, this.renderer_value.halfWidth, this.renderer_value.halfHeight);
    this.mesh(true);
  };

  /**
  1. mesh() - returns the Mesh of this Element
  2. mesh(true) - (re)creates the scene mesh
  **/
  Triangles.Element.prototype.mesh = function(value) {
    if (value) {
      var MESH = this.MESH, renderer_value = this.renderer_value;
      var geometry, material, v, vertex;
      //remove the old mesh from the scene
      this.scene.remove(this.mesh_value);
      //clear the renderer to reflect the changes
      renderer_value.clear();
      //create a new geometry & material
      geometry = new FSS.Plane(MESH.width_value * renderer_value.width, MESH.height_value * renderer_value.height, MESH.slices_value);
      material = new FSS.Material(MESH.ambient_value, MESH.diffuse_value);
      //create a new mesh using that geometry and material
      this.mesh_value = new FSS.Mesh(geometry, material);
      //add the new mesh to the scene
      this.scene.add(this.mesh_value);

      //update the vertices of the mesh
      for (v = this.mesh_value.geometry.vertices.length - 1; v >= 0; v--) {
        vertex = this.mesh_value.geometry.vertices[v];
        vertex.depth = Math.randomInRange(0, 20);
        vertex.anchor = FSS.Vector3.clone(vertex.position);
      }

      //animate the Element to reflect the updated vertices
      this.animate();
    } else {
      return this.mesh_value;
    }
  }

  /**
  updates the scene of the Element
  **/
  Triangles.Element.prototype.update = function() {
    var v, vertex, offset = this.MESH.depth_value / 100;
    for (v = this.mesh_value.geometry.vertices.length - 1; v >= 0; v--) {
      vertex = this.mesh_value.geometry.vertices[v];
      FSS.Vector3.set(vertex.position, 1, 1, vertex.depth*offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }
    this.mesh_value.geometry.dirty = true;
  };

  /**
  renders the scene of the Element
  **/
  Triangles.Element.prototype.render = function() {
    this.renderer_value.render(this.scene);
  };

  /**
  animates the scene of the Element
  **/
  Triangles.Element.prototype.animate = function() {
    this.update();
    this.render();
  };

  /**
  1. renderer() - returns the renderer of the Element
  2. renderer(renderType) - sets the renderer of this ELement:
    - webgl: WebGLRenderer
    - canvas: CanvasRenderer
    - svg: SVGRenderer
  **/
  Triangles.Element.prototype.renderer = function(renderType) {
    if (typeof renderType != 'undefined') {
      this.renderType = renderType;
      if (this.renderer_value) {
        this.container.removeChild(this.renderer_value.element);
      }
      switch(renderType) {
        case 'webgl':
          this.renderer_value = new FSS.WebGLRenderer();
          break;
        case 'canvas':
          this.renderer_value = new FSS.CanvasRenderer();
          break;
        case 'svg':
          this.renderer_value = new FSS.SVGRenderer();
          break;
        default:
          this.renderer_value = new FSS.CanvasRenderer();
          break;
      }
      //match renderer size with container size
      this.renderer_value.setSize(this.container.offsetWidth,this.container.offsetHeight);
      //insert the renderer "into" the container
      this.container.appendChild(this.renderer_value.element);
    }else{
      return this.renderer_value;
    }
  };

  /**
  exports the rendered scene of the Element as a Blob in two modes:
  1. params.custom = true: renders the scene using params.width and params.height as dimensions
  2. params.custom = false: renders the scene using the current dimensions
  **/
  Triangles.Element.prototype.export = function(params,callback) {
    var p = params || {};
    var blob;
    if (p.custom) {
      var width = p.width || 2000;
      var height = p.height || 1000;
      var scalarX = width / this.renderer_value.width;
      var scalarY = height / this.renderer_value.height;
      var slices = this.MESH.slices_value;
      var light, i;
      //expand the scene to the specified dimensions
      this.MESH.slices_value = Math.ceil(slices * scalarX * 1.4);
      this.resize(width,height);
      this.MESH.slices_value = slices;
      //update light positions in the new dimensions
      for (i = 0; i < this.LIGHTS.arr.length; i++) {
        light = this.LIGHTS.arr[i];
        light.x(light.x_value);
        light.y(light.y_value);
        light.z(light.z_value * scalarX);
      }
      //render the changes
      this.animate();
      //convert the scene into a Blob and execute the callback with the Blob as an argument
      switch (this.renderType) {
        case 'webgl':
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
        case 'canvas':
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
        case 'svg':
          blob = new Blob([this.container.innerHTML], {type: 'image/svg+xml'});
          callback(blob);
          break;
        default:
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
      }
    }else{
      //convert the scene into a Blob and execute the callback with the Blob as an argument
      switch (this.renderType) {
        case 'webgl':
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
        case 'canvas':
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
        case 'svg':
          blob = new Blob([this.container.innerHTML], {type: 'image/svg+xml'});
          callback(blob);
          break;
        default:
          this.renderer_value.element.toBlob(function(canvasContentBlob) {
            blob = canvasContentBlob;
            callback(blob);
          });
          break;
      }
    }
  };

  /**
  all Elements pooled together using their id as a dictionary key
  **/
  Triangles.elements = {};

  /**
  add an Element to the page using the settings stored in params
  **/
  Triangles.add = function(params) {
    var element = new Triangles.Element(params);
    this.elements[params.id] = element;
    return element;
  }

  /**
  returns the Element with the specified id
  **/
  Triangles.element = function(id) {
    return this.elements[id];
  }

  /**
  animates all Elements with animation enabled.
  add this function to a requestAnimationFrame loop
  or else it will not be called
  **/
  Triangles.animate = function() {
    for(var id in this.elements) {
      var e = this.elements[id];
      if (e.willAnimate) e.animate();
    }
  }
