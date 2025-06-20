import * as THREE from "three";
// import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
// import { gsap } from "gsap";

const myCanvas = document.querySelector('.myCanvas');
const canvasWidth = myCanvas.clientWidth;
const canvasHeight = myCanvas.clientHeight;

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.myCanvas'),
    antialias: true,
});
renderer.shadows = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.26;
renderer.useLegacyLights  = false; //#0b0818
renderer.setClearColor(0x0b0818, 0); //0xffffff
renderer.outputColorSpace = THREE.SRGBColorSpace 
renderer.setSize(canvasWidth, canvasHeight);

function resizeCanvas() {
    const canvasWidth = window.innerWidth * 0.9;
    const canvasHeight = canvasWidth * 0.48; 

    myCanvas.style.width = `${canvasWidth}px`;
    myCanvas.style.height = `${canvasHeight}px`;

    renderer.setSize(canvasWidth, canvasHeight, false); 
    renderer.setPixelRatio(window.devicePixelRatio);
}

const scene = new THREE.Scene();
let cameraList = [];
let camera;
const raycaster = new THREE.Raycaster();

const meshObjects = [];
let intersections = [];

const navObjects = [];
let homeMeshes = [];
let aboutMeshes = [];
let projectsMeshes = [];
let contactMeshes = [];
const originalPositions = [];
let lastHoveredNavObject = null;

const loader = new GLTFLoader(); //'./resources/adjusted/scene.gltf'
loader.load('resources/scenev2.gltf', (gltf) => {
    console.log(gltf.scene);
    const myScene = gltf.scene;
    myScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // console.log(child.name, child.geometry.boundingBox);
            meshObjects.push(child);
        }
        if(["home", "about", "projects", "contact"].includes(child.name)) {
            navObjects.push(child);
            console.log(`Storing position for ${child.name}:`, child.position);
            originalPositions.push({
                        x: child.position.x,
                        y: child.position.y,
                        z: child.position.z
                    });
        }
        if(child.isCamera) {
            cameraList.push(child);
        }
    })
    camera = cameraList[0];
    camera.aspect = canvasWidth / canvasHeight;
    // console.log(camera.aspect);
    camera.updateProjectionMatrix();
    scene.add(myScene);
    console.log(navObjects);
    console.log(originalPositions);
    AssignNavChildren();
}); 

function AssignNavChildren() {
    navObjects.forEach((navObject) => {
        let targetArray; 
        switch (navObject.name) {
            case "home":
                targetArray = homeMeshes;
                break;
            case "about":
                targetArray = aboutMeshes;
                break;
            case "projects":
                targetArray = projectsMeshes;
                break;
            case "contact":
                targetArray = contactMeshes;
                break;
            default:
                console.warn(`Unexpected object name: ${navObject.name}`);
                return;
        }
        navObject.traverse((child) => {
            if (child.isMesh) {
                targetArray.push(child); 
            }
        });
    });
    const logArrayContents = (arrayName, array) => {
        console.log(`${arrayName}:`);
        array.forEach((mesh) => {
            console.log(`  ${mesh.name}`);
        });
    };
    // logArrayContents("homeMeshes", homeMeshes);
    // logArrayContents("aboutMeshes", aboutMeshes);
    // logArrayContents("projectsMeshes", projectsMeshes);
    // logArrayContents("contactMeshes", contactMeshes);
}

document.addEventListener("mousemove", (event) => {
    let mousePos = new THREE.Vector2
    mousePos.set(
        (event.clientX / renderer.domElement.clientWidth) * 2 -1,
        ((renderer.domElement.clientHeight - event.clientY) / renderer.domElement.clientHeight * 2 -1)
    )
    // console.log(mousePos);
    if(camera) {
        raycaster.setFromCamera(mousePos, camera);
        intersections = raycaster.intersectObjects(meshObjects, true);
    }
});

document.addEventListener("click", (event) => {
    let mousePos = new THREE.Vector2
    mousePos.set(
        (event.clientX / renderer.domElement.clientWidth) * 2 -1,
        ((renderer.domElement.clientHeight - event.clientY) / renderer.domElement.clientHeight * 2 -1)
    )
    // console.log(mousePos);
    if(camera) {
        raycaster.setFromCamera(mousePos, camera);
        const intersects = raycaster.intersectObjects(meshObjects, true);
        if (intersects.length > 0) {
            const clickedObj = intersects[0].object;
            const parentObject = clickedObj.parent;
            const matchedNavObject = navObjects.find((navObject) => navObject === parentObject);
    
            if (matchedNavObject) {
                console.log(`Clicked on a navObject: ${matchedNavObject.name}`);
                // Call a function to handle the navObject click, if needed
                handleNavObjectClick(matchedNavObject);
            }
        }
    }
});

function handleNavObjectClick(matchedNavObject){
    switch (matchedNavObject.name.toLowerCase()) {
        case 'home':
            window.location.href = 'index.html';
            break;
        case 'about':
            window.location.href = 'gallery.html';
            break;
        case 'projects':
            window.location.href = 'showcase.html';
            break;
        case 'contact':
            window.location.href = 'contact.html';
            break;
}}

animate();

function animate(t = 0) {
    requestAnimationFrame(animate);
    if (camera) {
        renderer.render(scene, camera);
    } 
    if (intersections.length > 0) {
        const hoveredObj = intersections[0].object;
        const parentObject = hoveredObj.parent;
        // console.log(parentObject.name);
        const matchedNavObject = navObjects.find((navObject) => navObject === parentObject);
        if (matchedNavObject) {
            //console.log(`Hovered over a child of navObject: ${matchedNavObject.name}`);
            if (lastHoveredNavObject && matchedNavObject !== lastHoveredNavObject) {
                const prevNavObject = navObjects.find((navObject) => navObject === lastHoveredNavObject);
                const prevIndex = navObjects.indexOf(prevNavObject);
                const prevOriginalPos = originalPositions[prevIndex];
                lastHoveredNavObject.position.lerp(prevOriginalPos, 1);
            }
            lastHoveredNavObject = matchedNavObject;
            const index = navObjects.indexOf(matchedNavObject);
            const originalPos = originalPositions[index];
            AnimateHover(matchedNavObject, originalPos);
            
        }
        else {
            if (lastHoveredNavObject) {
                const index = navObjects.indexOf(lastHoveredNavObject);
                const originalPos = originalPositions[index];
                lastHoveredNavObject.position.copy(originalPos);
                //lastHoveredNavObject.position.lerp(originalPos, 0.1); 
                lastHoveredNavObject = null;
            }
        }
    }
}

function AnimateHover(matchedNavObject, originalPos) {
    const hoverPos = new THREE.Vector3(originalPos.x - 0.3, originalPos.y, originalPos.z);
    matchedNavObject.position.lerp(hoverPos, 0.05);
}