import { useEffect } from "react";
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import {  useRef } from "react";
import images from "./data.json"
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { InteractionManager } from 'three.interactive';

import { Tween, Easing, update } from "es6-tween"

function Globe() {
    const refContainer = useRef(null);
    // const [focusedMarker, setFocusedMarker] = useState(null)

    useEffect(() => {
            // Setup renderer
            const renderer = new THREE.WebGLRenderer();

            renderer.setSize(window.innerWidth, window.innerHeight);
            refContainer.current && refContainer.current.appendChild( renderer.domElement );
        
            // Setup scene
            const scene = new THREE.Scene();
            scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
            scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));
        
            // Setup camera
            const camera = new THREE.PerspectiveCamera();
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            camera.position.z = 500;
        
            // Add camera controls
            const tbControls = new TrackballControls(camera, renderer.domElement);
            tbControls.minDistance = 101;
            tbControls.rotateSpeed = 5;
            tbControls.zoomSpeed = 0.8;

            const orbitControls = new OrbitControls(camera, renderer.domElement)
            orbitControls.autoRotate = true
            orbitControls.autoRotateSpeed = -1.0
            orbitControls.enableDamping = true
            orbitControls.enablePan = false
            orbitControls.maxDistance = 800
            orbitControls.zoomSpeed = 0.8
            orbitControls.rotateSpeed = 1.2
            orbitControls.minZoom = 300
            orbitControls.saveState()
    

            const interactionManager = new InteractionManager(renderer, camera, renderer.domElement);

        const N = 300;
        
        images.forEach((entry, index) => {
            entry.id = index
            entry.size = 0.04
            entry.color = "#ffff00"
            entry.alt = 0.02
            entry.radius = 1.7
            entry.lat = (Math.random() - 0.5) * 180
            entry.lng = (Math.random() - 0.5) * 360
          })
          var counter = 0
          var animations = []
          var marks = {}

        const Globe = new ThreeGlobe()
        .globeImageUrl('./map.jpg')
        .bumpImageUrl('./bumpmap.jpg')
        .customLayerData(images)
        .customThreeObject(d => {
          var orignalMesh = new THREE.Mesh(
            new THREE.SphereGeometry(d.radius),
            new THREE.MeshLambertMaterial({color: d.color})
          )
  
          return orignalMesh
        })

        .customThreeObjectUpdate((obj, d) => {
          var coords = Globe.getCoords(d.lat, d.lng, d.alt)
          var source = Object.assign({}, coords)
          console.log(coords)
          if(d.lat >= 0){
            source.y = source.y+300
          }else{
            source.y = source.y-300
          }
          console.log(source)

          var tween = new Tween(source)
          .to({ x: coords.x, y: coords.y, z: coords.z }, 120)
          .easing(Easing.Quadratic.Out)
          .on("update", () => {
            Object.assign(obj.position, source)
            console.log("updating") 
          })
            console.log("tweening")
            tween.start()
            counter++
          
          marks[d.id] = obj

          obj.cursor = "pointer"
          obj.addEventListener("click", function (ev) {
            console.log("Clicked on marker")

          })
          obj.addEventListener('mouseover', (event) => {
            event.target.material.color.set(0xff0000);
            document.body.style.cursor = 'pointer';
            console.log("hovering")
          });
          obj.addEventListener('mouseout', (event) => {
            event.target.material.color.set(0xffff00);
            document.body.style.cursor = 'default';
          });
          obj.addEventListener('mousedown', (event) => {
            event.target.scale.set(1.1, 1.1, 1.1);
          });
          obj.addEventListener('click', (event) => {
            var coords = { x: -72.76561630906853, y: 59.29531937925213, z: 39.91528758350497 } 
            var source = Object.assign({}, coords)

            var tween = new Tween(source)
            .to({ x: coords.x, y: coords.y, z: coords.z }, 120)
            .easing(Easing.Quadratic.Out)
            .on("update", () => {
              Object.assign(obj.position, source)
              console.log("updating") 
            })
              console.log("tweening")
              tween.start()
            event.target.scale.set(1.0, 1.0, 1.0);
          });
          interactionManager.add(obj);

          Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));

        })
        // .onReady(()=>{props.setLoadingGlobe(false)})
        const CLOUDS_IMG_URL = './clouds.png'; // from https://github.com/turban/webgl-earth
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
    
        const Clouds = new THREE.Mesh(new THREE.SphereGeometry(Globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75));
        new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
          Clouds.material = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
        });
        scene.add(Globe);
        scene.add(Clouds);


    
        function rotateClouds() {
          Clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI / 180) *10;
        }
    


        // start animation loop
        function animate() {
          // Frame cycle
          tbControls.update();
            orbitControls.update()
          interactionManager.update();
          rotateClouds();
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        animate();

        }, []);

    return <div ref={refContainer}>
           </div>

}

export default Globe;