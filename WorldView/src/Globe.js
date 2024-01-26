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
      var marks = {}
      const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;

      const Globe = new ThreeGlobe()
        .globeImageUrl('./map.jpg')
        .bumpImageUrl('./bumpmap.jpg')
        .htmlElementsData(images)
        .htmlElement(d => {
          const el = document.createElement('div');
          el.innerHTML = markerSvg;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          return el;
        });
  
        // .customLayerData(images)
        // .customThreeObject(d => {
        //   var orignalMesh = new THREE.Mesh(
        //     new THREE.SphereGeometry(d.radius),
        //     new THREE.MeshLambertMaterial({color: d.color})
        //   )
        //   return orignalMesh
        // })
        // .customThreeObjectUpdate((obj, d) => {
        //   var coords = Globe.getCoords(d.lat, d.lng, d.alt)
        //   var source = Object.assign({}, coords)
        //   if(d.lat >= 0) {
        //     source.y = source.y+300
        //   }
        //   else{
        //     source.y = source.y-300
        //   }

        //   const tween = new TWEEN.Tween(source, false) // Create a new tween that modifies 'coords'.
        //     .to(coords, 2000) // Move to (300, 200) in 1 second.
        //     .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
        //     .onUpdate(() => {
        //       Object.assign(obj.position, source)
        //     })
        //     .start() // Start the tween immediately.
        //   function animate(time) {
        //       tween.update(time)
        //       requestAnimationFrame(animate)
        //   }
        //       requestAnimationFrame(animate)
        //     counter++
          
        //   marks[d.id] = obj

        //   obj.cursor = "pointer"
        //   obj.addEventListener("click", function (ev) {
        //     console.log("Clicked on marker")

        //   })
        //   obj.addEventListener('mouseover', (event) => {
        //     event.target.material.color.set(0xff0000);
        //     document.body.style.cursor = 'pointer';
        //     console.log("hovering")
        //   });
        //   obj.addEventListener('mouseout', (event) => {
        //     event.target.material.color.set(0xffff00);
        //     document.body.style.cursor = 'default';
        //   });
        //   obj.addEventListener('mousedown', (event) => {
        //     event.target.scale.set(1.1, 1.1, 1.1);
        //   });
        //   obj.addEventListener('click', (event) => {
        //     console.log("clicked")

        //   });
        //   interactionManager.add(obj);
        //   Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));
        // })
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
          orbitControls.update()
          interactionManager.update();
          rotateClouds();
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
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