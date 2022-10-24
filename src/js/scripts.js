import * as THREE from 'three';
import { DoubleSide, Scene, Side, TextureLoader, Vector4 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.JS'
import * as dat from 'dat.gui'
import * as GeometryCompressionUtils from 'three/examples/jsm/utils/GeometryCompressionUtils.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


const MANAGER = new THREE.LoadingManager();


//import ModelCuisine from '../assets/Cuisine_out/Cuisine.gltf';

const LISUPrinFbxUrl =new URL('../assets/LISUPrint.fbx',import.meta.url);
const CuisineFbxUrl =new URL('../assets/Cuisine.fbx',import.meta.url);

const CusineFolderUrl ='../assets/Cuisine.fbm/';

//const testOBJURL =new URL('../assets/Test/FIGURE_de_PROUE_Model_18.obj',import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled=true;
renderer.setSize(window.innerWidth,window.innerWidth);

document.body.appendChild(renderer.domElement);
const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const scene=new THREE.Scene();
scene.background = new THREE.Color( 0xbbbbbb );
scene.environment = pmremGenerator.fromScene( environment ).texture;
environment.dispose();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelpe=new THREE.AxesHelper(3);
scene.add(axesHelpe);

camera.position.set(-10,30,30);
orbit.update();

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF,
    side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x=-0.5*Math.PI;
plane.receiveShadow=true;

const gridHelper = new THREE.GridHelper(30,30);
scene.add(gridHelper);


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100,100,0);
spotLight.castShadow=true;
spotLight.angle=0.2;

const dSpotHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(dSpotHelper);

if(false){
const fbxLoader  = new FBXLoader();
fbxLoader.load(
    CuisineFbxUrl.href,
    (object) => {
        object.traverse(function (child) {
        //     console.log(child.name);
        // if(child.name.includes("Outline")  ){
        //          console.log("NON :");
        //         console.log("NON :"+child.name);
        //     }
        //     else{
        //         console.log(child.name);
        //         child.position.set(0,0.1,0);
        //         child.rotation.x=-0.5*Math.PI;
        //         child.scale.set(.01, .01, .01);
        //         scene.add(child);
        //         // console.log(child);

                
        //     }
            
            // if ((child as THREE.Mesh).isMesh) {
            //     // (child as THREE.Mesh).material = material
            //     if ((child as THREE.Mesh).material) {
            //         ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
            //     }
            // }
        });
        // object.scale.set(.01, .01, .01)
       // GeometryCompressionUtils.compressPositions(object);
       //GeometryCompressionUtils.compressNormals(object.mesh)
       scene.add(object);
       object.position.set(0,0.1,0);
       object.rotation.x=-0.5*Math.PI;
       //object.scale.set(.01, .01, .01);
   // console.log(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        renderer
    },
    (error) => {
        console.log(error)
    }
)

// const assetLoader = new GLTFLoader();
// assetLoader.load(CusineUrl.href,function(objet){
// const model = objet.scene;
// scene.add(model);
// //model.position.set(-12,4,10);
// model.position.set(0,0.1,0);
// model.rotation.x=-0.5*Math.PI;
// model.scale.set(.01, .01, .01);

// },undefined,function(error){
//     console.error(error);
// });

};
const ktx2Loader = new KTX2Loader()
 .setTranscoderPath( 'three/examples/js/libs/basis/' )
 .detectSupport( renderer );

 console.log(ktx2Loader);

if(false){

 const loader = new GLTFLoader()
// .setPath( '../assets/Cuisine/' )
 .setKTX2Loader( ktx2Loader )
 .setMeshoptDecoder( MeshoptDecoder );
 console.log(loader);
loader.load(CusineUrl.href, function ( objet ) {
     const model = objet.scene;
     scene.add(model);
     model.position.set(0,0.1,0);
  //   model.rotation.x=-0.5*Math.PI;
 //    model.scale.set(.01, .01, .01);
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
    console.log(error)
} );

};

const DRACO_LOADER = new DRACOLoader( MANAGER ).setDecoderPath( 'three/examples/js/libs/draco/gltf/' );
const KTX2_LOADER = new KTX2Loader( MANAGER ).setTranscoderPath( 'three//examples/js/libs/basis/' );
const CusineUrl =new URL('../assets/Cuisine.glb',import.meta.url);

const loader = new GLTFLoader()
//const loader = new FBXLoader();
// .setCrossOrigin('anonymous')
//.setPath( '../assets/' )
.setDRACOLoader( DRACO_LOADER )
.setKTX2Loader( KTX2_LOADER.detectSupport( renderer ) )
.setMeshoptDecoder( MeshoptDecoder );

console.log(loader);

//import ModelCuisine from '../assets/Cuisine.glb';
// console.log(ModelCuisine);
// console.log(CusineUrl);
let model3D;
loader.load(CusineUrl.href, function ( objet ) {
     const model = objet.scene;
     scene.add(model);
     model.position.set(0,0,0);
 //  model.rotation.x=-0.5*Math.PI;
     //model.scale.set(0.0.,0.01, 0.01);
     model3D=model;
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    renderer
},
(error) => {
    console.log(error)
} );


const gui = new dat.GUI();
const options = {
angle:0.2,
penumbra :0,
intensirty: 1,
size3D: 1
};
// gui.add(options,'angle',0,1);
// gui.add(options,'penumbra',0,1);
// gui.add(options,'intensirty',0,1);

let folder = gui.addFolder( 'Light' );
folder.add(options,'angle',0,1);
folder.add(options,'penumbra',0,1);
folder.add(options,'intensirty',0,1);
folder.open();
folder = gui.addFolder( 'Model' );
folder.add(options,'size3D',0.01,100)
folder.open();

// folder = gui.addFolder( 'Memory Info' );
// folder.open();
// memoryDisplay = folder.add( data, 'totalGPUMemory', '0 bytes' );
// computeGPUMemory( mesh );

const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove',function(e){
mousePosition.x=(e.clientX/this.window.innerWidth)*2-1;
mousePosition.y=(-e.clientY/this.window.innerHeight)*2+1;

});

const rayCaster= new THREE.Raycaster();
function computeGPUMemory( mesh ) {
    // Use BufferGeometryUtils to do memory calculation
    memoryDisplay.setValue( BufferGeometryUtils.estimateBytesUsed( mesh.geometry ) + ' bytes' );

}

function animate(time){

    spotLight.angle=options.angle;
    spotLight.penumbra=options.penumbra;
    spotLight.intensity=options.intensirty;
  //  model3D.scale.set(options.size3D,options.size3D,options.size3D);    
   // dSpotHelper.update();
    rayCaster.setFromCamera(mousePosition,camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    if(false){
  //  console.log(intersects);
    for(let i=0;i<intersects.length;i++){
        if(intersects[i].object.id==shpereID)
            intersects[i].object.material.color.set(0xFF0000);       
        
        if(intersects[i].object.name==box2.name){
            intersects[i].object.rotation.x=time/1000;
            intersects[i].object.rotation.y=time/1000;        }

    }
   
    plane2.geometry.attributes.position.array[0] =10*Math.random();
    plane2.geometry.attributes.position.array[1] =10*Math.random();
    plane2.geometry.attributes.position.array[2] =10*Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] =10*Math.random();
    plane2.geometry.attributes.position.needsUpdate=true;
}

    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize',function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);

});
