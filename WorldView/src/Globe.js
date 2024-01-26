import { useEffect } from "react";
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import {  useRef } from "react";
import images from "./data.json"
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { InteractionManager } from 'three.interactive';
import * as TWEEN from '@tweenjs/tween.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';



function Globe() {
    const refContainer = useRef(null);
    // const [focusedMarker, setFocusedMarker] = useState(null)
    var ready = false

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
            camera.position.z = 300;
        
      //bloom renderer
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = 0;
      bloomPass.strength = 2; //intensity of glow
      bloomPass.radius = 0;
      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.renderToScreen = true;
      bloomComposer.addPass(renderScene);
      bloomComposer.addPass(bloomPass);
      
      //sun object
      const color = new THREE.Color("#FDB813");
      const geometry = new THREE.IcosahedronGeometry(1, 15);
      const material = new THREE.MeshBasicMaterial({ color: color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(0, 0, 0);
      sphere.layers.set(1);
      scene.add(sphere);
      
      // galaxy geometry
      const starGeometry = new THREE.SphereGeometry(80, 64, 64);
      
      // galaxy material
      const starMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader("texture/galaxy1.png"),
        side: THREE.BackSide,
        transparent: true,
      });
      
      // galaxy mesh
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      starMesh.layers.set(1);
      scene.add(starMesh);
      
      //ambient light
      const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientlight);
            // Add camera controls


            const orbitControls = new OrbitControls(camera, renderer.domElement)
            orbitControls.autoRotate = true
            orbitControls.autoRotateSpeed = -.3
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
          const color = new THREE.Color("#FDB813");
          const geometry = new THREE.IcosahedronGeometry(1, 15);
          const material = new THREE.MeshBasicMaterial({ color: color });
          const sphere = new THREE.Mesh(geometry, material);
          // sphere.position.set(0, 0, 0);
          sphere.layers.set(1);
          // scene.add(sphere);
          return sphere
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

            console.log("tweening")

            // let coords = {x: 0, y: 0} // Start at (0, 0)

            const tween = new TWEEN.Tween(source, false) // Create a new tween that modifies 'coords'.
              .to(coords, 2000) // Move to (300, 200) in 1 second.
              .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
              .onUpdate(() => {
              Object.assign(obj.position, source)

              })
              .start() // Start the tween immediately.
              function animate(time) {
                tween.update(time)
                requestAnimationFrame(animate)
              }
              requestAnimationFrame(animate)
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

          });
          interactionManager.add(obj);

          Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));

        })
        .onGlobeReady(()=>{ready = true})
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
          orbitControls.update()
          interactionManager.update();
          rotateClouds();
          requestAnimationFrame(animate);

          if(ready){
            // camera.layers.set(1);
              bloomComposer.render();


          }

            // camera.layers.set(0);
            // renderer.render(scene, camera);

        }
        animate();
        return () => {
          refContainer.current.removeChild(renderer.domElement);
      };
  }, []);

    return <div ref={refContainer}>
           </div>

}

export default Globe;