//define variables
let renderer;
let sceneWidth = window.innerWidth;
let sceneHeight = window.innerHeight;
let shrinkScreenSize = 4;
let scene;
let perspectiveCamera;
let white = 0xFFFFFF;
let black = 0x000000;

//define the functions
var setOrbitalControls = () => {
	orbitControls = new THREE.OrbitControls(perspectiveCamera); //renderer.domElement
	orbitControls.enableZoom = true;
};

var setEventListener = () => {
	window.addEventListener('resize', onWindowResize, false);
};

var setStage = () => {
	console.log('setStage func');
	let stageGeometry = new THREE.PlaneGeometry(100, 100); //width, length
	let stageMaterial = new THREE.MeshLambertMaterial({color: 0x00FF00}); //green
	//let stageTexture = new THREE.TextureLoader().load('images/grass.jpg');
	//stageTexture.wrapT = stageTexture.wrapS = THREE.RepeatWrapping;
	//stageTexture.repeat.set(10, 10);
	let stage = new THREE.Mesh(stageGeometry, stageMaterial); 
	stage.receiveShadow = true;
	stage.name = "stage";
	scene.add(stage);
	console.log(stage);
};

var setDirectionalLight = () => {
	console.log('setDirectionalLight func');
	light = new THREE.DirectionalLight(white, 0.8);
	light.position.set(0, 50, 5); //x, y, z
	light.castShadow = true;
	light.shadow.mapSize.width = 256; //change this
	light.shadow.mapSize.height = 256; //change this too
	light.shadow.camera.near = 0.5; //change this
	light.shadow.camera.far = 50; //change this
	light.name = "light";
	scene.add(light);
	console.log(light);
};

var setAmbientLight = () => {
	console.log('setAmbientLight func');
	let ambientLight = new THREE.AmbientLight(white, 0.8);
	ambientLight.name = "ambientLight";
	scene.add(ambientLight);
	console.log(ambientLight);
};

var setPerspectiveCamera = () => {
	console.log('setPerspectiveCamera func');
	let viewAngle = 55;
	let aspect = sceneWidth / sceneHeight;
	let near = 1;
	let far = 2000;
	perspectiveCamera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	perspectiveCamera.position.set(-1, 4, 3); //x, y, z
	perspectiveCamera.lookAt(scene.position);
	perspectiveCamera.name = "perspectiveCamera";
	scene.add(perspectiveCamera);
	console.log(perspectiveCamera);
};

var setSkybox = () => {
	console.log('setSkybox func');
	let path = "images/skybox/";
	let format = ".png";
	let urls = [
		path + 'sky-xpos' + format,
		path + 'sky-xneg' + format,
		path + 'sky-ypos' + format,
		path + 'sky-yneg' + format,
		path + 'sky-zpos' + format,
		path + 'sky-zneg' + format
	];
	skyBoxTexture = new THREE.CubeTextureLoader().load(urls);
	skyBoxTexture.minFilter = THREE.LinearFilter;
	scene.background = skyBoxTexture;
};

var setScene = () => {
	console.log('setScene func');
	scene = new THREE.Scene();
	console.log(scene);
};

var setRenderer = () => {
	renderer = new THREE.WebGLRenderer({antialias: true});
	sceneWidth = window.innerWidth - shrinkScreenSize;
	sceneHeight = window.innerHeight - shrinkScreenSize;
	renderer.setSize(sceneWidth, sceneHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	dom = document.getElementById('merry-christmas');
	dom.appendChild(renderer.domElement);
};

var createScene = () => {
	setRenderer();
	setScene();
	//setSkybox();
	setPerspectiveCamera();
	setAmbientLight();
	setDirectionalLight();
	setStage();
	setEventListener();
	setOrbitalControls();
};

var startChristmasCard = () => {
	console.log('startChristmasCard func');
	//sets up the scene, camera, renderer and 3D objects
	createScene();
	//calls game loop/animations
	animate();
};

var animate = () => {
	//console.log('animate func');
	requestAnimationFrame(animate);
	render();
	update();
};

var render = () => {
	//console.log('render func');
	//renderer.setViewport(0, 0, sceneWidth, sceneHeight);
	//renderer.clear();
	renderer.render(scene, perspectiveCamera);
};

var update = () => {
	//console.log('update func');
	// render();
	// console.log(scene);
	// scene.simulate();
};

var onWindowResize = () => {
	sceneWidth = sceneWidth - shrinkScreenSize;
	sceneHeight = sceneHeight - shrinkScreenSize;
	renderer.setSize(sceneWidth, sceneHeight);
	perspectiveCamera.aspect = sceneWidth / sceneHeight;
	perspectiveCamera.updateProjectionMatrix();
};

//start up the card
startChristmasCard();