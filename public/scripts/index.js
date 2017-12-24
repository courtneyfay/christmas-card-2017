//define variables
let renderer;
let sceneWidth;
let sceneHeight;
let shrinkScreenSize = 4;
let scene;
let perspectiveCamera;
let white = 0xFFFFFF;
let black = 0x000000;

var startChristmasCard = () => {
	//sets up the scene, camera, renderer and 3D objects
	createScene();
	//calls game loop/animations
	animate();
};

var createScene = () => {
	setRenderer();
	setScene();
	setSkybox();
	setPerspectiveCamera();
	setAmbientLight();
	setDirectionalLight();
};

var setRenderer = () => {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	sceneWidth = window.innerWidth - shrinkScreenSize;
	sceneHeight = window.innerHeight - shrinkScreenSize;
	renderer.setSize(sceneWidth, sceneHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	dom = document.getElementById('merry-christmas');
	dom.appendChild(renderer.domElement);
};

var setScene = () => {
	scene = new THREE.Scene();
};

var setSkybox = () => {
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

var setPerspectiveCamera = () => {
	let viewAngle = 55;
	let aspect = sceneWidth / sceneHeight;
	let near = 1;
	let far = 2000;
	perspeciveCamera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	perspectiveCamera.position.set(0, 0, 0); //x, y, z
	scene.add(perspectiveCamera);
};

var setAmbientLight = () => {
	let ambientLight = new THREE.AmbientLight(white, 0.8);
	ambientLight.name = "ambientLight";
	scene.add(ambientLight);
};

var setDirectionalLight = () => {
	light = new THREE.DirectionalLight(white, 0.8);
	light.position.set(0, 50, 5); //x, y, z
	light.castShadow = true;
	light.shadow.mapSize.width = 256; //change this
	light.shadow.mapSize.height = 256; //change this too
	light.shadow.camera.near = 0.5; //change this
	light.shadow.camera.far = 50; //change this
	light.name = "light";
	scene.add(light);
};

var animate = () => {

};
