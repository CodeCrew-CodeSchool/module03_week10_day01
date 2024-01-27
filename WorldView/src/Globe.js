import { useEffect } from "react";
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import {  useRef } from "react";
import images from "./data.json"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { InteractionManager } from 'three.interactive';
import * as TWEEN from '@tweenjs/tween.js'



function Globe() {
    const refContainer = useRef(null);

    useEffect(() => {
      // Setup renderer
      const renderer = create3dRenderer(refContainer)
      // Setup scener
      const world = create3dWorld()
      // Setup camera
      const camera = create3dCamera()
      // Add camera controls
      const cameraControls = createControls(camera, renderer)
      //Other controls
      const interactionManager = new InteractionManager(renderer, camera, renderer.domElement);

        
      images.forEach((entry, index) => {
        entry.id = index
        entry.size = 0.04
        entry.color = "#ffff00"
        entry.alt = 0
        entry.radius = 1.7
        entry.lat = (Math.random() - 0.5) * 180
        entry.lng = (Math.random() - 0.5) * 360
      })

      // Create 3D Globe object
      const Globe = createGlobe3dObject(images)
      



        .customThreeObjectUpdate((obj, d) => {
          //Convert latitude, longitude and altitude values of marker to X, Y, and Z position values
          var marker3dCoordinates = Globe.getCoords(d.lat, d.lng, d.alt)

          //Set the position of the marker object to the calculated position
          Object.assign(obj.position, marker3dCoordinates);
   

          obj.addEventListener('mouseover', (event) => {
            event.target.material.color.set(0xff0000);
            document.body.style.cursor = 'pointer';
            console.log("hovering")
          });

          obj.addEventListener('mouseout', (event) => {
            event.target.material.color.set(0xffff00);
            document.body.style.cursor = 'default';
          });
          
          obj.addEventListener('click', (event) => {
            console.log("Clicked on marker")
          });
          interactionManager.add(obj);


          var source = Object.assign({}, marker3dCoordinates)


          if(d.lat >= 0) {
            source.y = source.y+300
          }
          else{
            source.y = source.y-300
          }
          const slideInAnimation = new TWEEN.Tween(source, false)
            .to(marker3dCoordinates, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut) 
            .onUpdate(() => {
              Object.assign(obj.position, source)
            })
            .start()

          function animate(time) {
            slideInAnimation.update(time)
            requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)

        });
      world.add(Globe);

      // Create 3D clouds object
      const Clouds = createClouds3dObject(Globe.getGlobeRadius())
      world.add(Clouds);


      // start animation loop
      function animate() {
        cameraControls.update()
        interactionManager.update();
        Clouds.rotation.y += (-0.006 * Math.PI / 180) *10;
        renderer.render(world, camera);
        requestAnimationFrame(animate);
      }
      animate();

      return () => {
          refContainer.current.removeChild(renderer.domElement);
      };
    }, []);

    return <div ref={refContainer}></div>

}

export default Globe;


function create3dRenderer(referenceContainer) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (referenceContainer.current) {
    referenceContainer.current.appendChild(renderer.domElement);
  }
  return renderer;
}

function create3dWorld() {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));
  return scene;
}

function create3dCamera() {
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 250;
  return camera;
}

function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = -.3;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.maxDistance = 800;
  controls.zoomSpeed = 0.8;
  controls.rotateSpeed = 1.2;
  controls.minZoom = 300;
  controls.saveState();
  return controls;
}

function createClouds3dObject(globeRadius) {
  const cloudsObject = new THREE.Mesh(new THREE.SphereGeometry(globeRadius * (1 + 0.004), 75, 75));
  new THREE.TextureLoader().load("./clouds.png", cloudsTexture => {
    cloudsObject.material = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
  });
  return cloudsObject;
}

function createGlobe3dObject(markers) {
  const globeObject = new ThreeGlobe()
                        .globeImageUrl('./map.jpg')
                        .bumpImageUrl('./bumpmap.jpg')
                        .customLayerData(markers)
                        .customThreeObject(d => {
                          var markerSphereMesh = new THREE.Mesh(new THREE.SphereGeometry(d.radius), new THREE.MeshLambertMaterial({color: d.color}))
                          return markerSphereMesh
                        })

  return globeObject;
}

