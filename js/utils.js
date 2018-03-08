var utils = {
  makeShape: function () {
    console.log(1);
    var arr = arguments[0];
    var shape = new THREE.Shape();
    shape.moveTo(arr[0][0], arr[0][1]);
    for (var i = 1; i < arr.length; i++) {
      shape.lineTo(arr[i][0], arr[i][1]);
    }
    if (arguments.length > 1) {
      for (var j = 1; j < arguments.length; j++) {
        var pathCoords = arguments[j];
        var path = new THREE.Path();
        path.moveTo(pathCoords[0][0], pathCoords[0][1]);
        for (var k = 1; k < pathCoords.length; k++) {
          path.lineTo(pathCoords[k][0], pathCoords[k][1]);
        }
        shape.holes.push(path);
      }
    }
    return shape;
  },
  makeExtrudeGeo: function (shape, amount) {
    var extrudeSetting = {
      steps: 1,
      amount: 1,
      bevelEabled: false
    };
    var geo = new THREE.ExtrudeGeometry(shape, extrudeSetting);
    geo.rotateX(-0.5 * Math.PI);
    return geo;
  },
  makeShapeGeo: function (shapeCoords) {
    var shape = this.makeShape(shapeCoords);
    var geo = new THREE.ShapeGeometry(shapeCoords);
    return geo;
  },
  makeMesh: function (type, geo, color) {
    var material;
    switch (type) {
      case 'lambert':
        material = new THREE.MeshLambertMaterial({color: color});
        break;
      case 'phong':
        material = new THREE.MeshPhongMaterial({color: color});
        break;
      default:
        console.log('unrecongnized type');
    }
    mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

};