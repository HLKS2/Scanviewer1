import {Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, Vector2} from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
//1 The scene
const scene = new Scene()
const canvas = document.getElementById('three-canvas');

//2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const orangeMaterial = new MeshBasicMaterial( {color: 'orange'} );
const greenMaterial = new MeshBasicMaterial( {color: 0x00ff00} );
const blueMaterial = new MeshBasicMaterial( {color: 0x0000ff} );

const orangeCube = new Mesh( geometry, orangeMaterial );
scene.add( orangeCube );

const greenCube = new Mesh( geometry, greenMaterial );
greenCube.position.x += 1;
greenCube.scale.set(2,2,2);
scene.add(greenCube);

const blueCube = new Mesh( geometry, blueMaterial );
blueCube.position.x -= 1;

scene.add(blueCube);

//3 The Camera
const camera = new PerspectiveCamera(75, canvas.clientWidth/ canvas.clientHeight);
camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
scene.add( camera );

//4 The Renderer
const renderer = new WebGLRenderer({ canvas }); 
renderer.setPixelRatio(Math.min (window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// 5 Responsivity

window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
})

//6 Contorls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//7 Animation
function animate() {
    orangeCube.rotation.x += 0.01;
    orangeCube.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();