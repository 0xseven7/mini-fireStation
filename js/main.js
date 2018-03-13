window.onload = function () {

  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;
  var config = {
    isMobile: false,
    background: 0xffffff
  };
  var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(config.background), 1.0);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  camera.position.set(200, 200, 200);
  camera.lookAt(scene.position);

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({color: 0xff0000}));
  plane.position.set(0, 0, 0);
  plane.rotation.x = -0.5 * Math.PI;

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(200, 200, -200);
  scene.add(spotLight);
  var axes = new THREE.AxesHelper(20, 20, 20);
  scene.add(axes);
  var buildRoad = function () {
    var road = new THREE.Object3D();
    var roadColor = 0xffffff;
    var roadBorderOuterCoords = [
      [100, 100],
      [-100, 100],
      [-100, -100],
      [100, -100]
    ];
    var roadBorderHoleCoords = [
      [80, 80],
      [-80, 80],
      [-80, -80],
      [80, -80]
    ];
    var roadBorderInnerCoords = [
      [70, 0],
      [-70, 0],
      [-70, -60],
      [-30, -60],
      [-30, -80],
      [30, -80],
      [30, -60],
      [70, -60],
      [70, 0]
    ];
    var roadBorderOuterShape = utils.makeShape(roadBorderOuterCoords, roadBorderHoleCoords);
    var roadBorderOuterGeo = utils.makeExtrudeGeo(roadBorderOuterShape, 0.1);
    roadBorderOuterGeo.shadowMapEnabled = false;
    var roadBorderOuter = utils.makeMesh('phong', roadBorderOuterGeo, roadColor);
    scene.add(roadBorderOuter);
    var roadBorderInnerShape = utils.makeShape(roadBorderInnerCoords);
    var roadBorderInnerGeo = utils.makeExtrudeGeo(roadBorderInnerShape, 0.1);
    var roadBorderInner = utils.makeMesh('phong', roadBorderInnerGeo, roadColor);
    scene.add(roadBorderInner);
  }();
  var render = function () {
    renderer.render(scene, camera);
  };
  var buildBuildings = function () {
    var plane = new THREE.PlaneGeometry();
  };
  render();
  document.getElementById('output').appendChild(renderer.domElement);
};