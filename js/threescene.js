// Scene
const scene = new THREE.Scene();
scene.background = null;

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 12;

// Renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("bg").appendChild(renderer.domElement);


// =======================
// LIGHTS
// =======================

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const point = new THREE.PointLight(0x00bfff, 4);
point.position.set(5,5,5);

scene.add(point);


// =======================
// FLOATING BOOKS
// =======================

const books = [];

for(let i=0;i<12;i++){

    const geometry = new THREE.BoxGeometry(
        1.2,
        0.2,
        1.6
    );

    const material = new THREE.MeshStandardMaterial({

        color: new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
        ),

        metalness:0.3,
        roughness:0.4

    });

    const book = new THREE.Mesh(
        geometry,
        material
    );

    book.position.x=(Math.random()-0.5)*20;
    book.position.y=(Math.random()-0.5)*12;
    book.position.z=(Math.random()-0.5)*10;

    book.rotation.x=Math.random()*3;
    book.rotation.y=Math.random()*3;

    scene.add(book);

    books.push(book);

}


// =======================
// GRADUATION CAP
// =======================

const cap = new THREE.Group();

const topGeo = new THREE.BoxGeometry(2.5,0.15,2.5);

const topMat = new THREE.MeshStandardMaterial({
    color:0x111111
});

const captop = new THREE.Mesh(topGeo,topMat);

cap.add(captop);

const baseGeo = new THREE.CylinderGeometry(
    0.8,
    0.8,
    0.4,
    32
);

const base = new THREE.Mesh(baseGeo,topMat);

base.position.y=-0.25;

cap.add(base);

cap.position.set(0,0,0);

scene.add(cap);


// =======================
// LIGHT BULBS
// =======================

const bulbs=[];

for(let i=0;i<8;i++){

    const bulb=new THREE.Mesh(

        new THREE.SphereGeometry(0.25,32,32),

        new THREE.MeshStandardMaterial({

            emissive:0xffff00,

            color:0xffee88

        })

    );

    bulb.position.set(

        (Math.random()-0.5)*15,

        (Math.random()-0.5)*8,

        (Math.random()-0.5)*8

    );

    scene.add(bulb);

    bulbs.push(bulb);

}



// =======================
// PARTICLES
// =======================

const particleGeometry=new THREE.BufferGeometry();

const vertices=[];

for(let i=0;i<3000;i++){

    vertices.push(

        (Math.random()-0.5)*50,

        (Math.random()-0.5)*50,

        (Math.random()-0.5)*50

    );

}

particleGeometry.setAttribute(

    'position',

    new THREE.Float32BufferAttribute(vertices,3)

);

const particleMaterial=new THREE.PointsMaterial({

    color:0xffffff,

    size:0.05

});

const particles=new THREE.Points(

    particleGeometry,

    particleMaterial

);

scene.add(particles);


// =======================
// Mouse Animation
// =======================

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(e)=>{

    mouseX=(e.clientX/window.innerWidth)-0.5;

    mouseY=(e.clientY/window.innerHeight)-0.5;

});


// =======================
// Animation
// =======================

function animate(){

    requestAnimationFrame(animate);

    particles.rotation.y+=0.0008;

    particles.rotation.x+=0.0003;

    cap.rotation.y+=0.01;

    cap.position.y=Math.sin(Date.now()*0.002)*0.4;

    books.forEach((book,index)=>{

        book.rotation.x+=0.01;

        book.rotation.y+=0.008;

        book.position.y+=Math.sin(Date.now()*0.001+index)*0.003;

    });

    bulbs.forEach((bulb,index)=>{

        bulb.position.y+=Math.sin(Date.now()*0.002+index)*0.004;

    });

    camera.position.x=mouseX*2;

    camera.position.y=-mouseY*2;

    camera.lookAt(scene.position);

    renderer.render(scene,camera);

}

animate();


// =======================
// Resize
// =======================

window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});