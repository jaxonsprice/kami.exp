//Click and drag to rotate

let myGeometry;
let isGlossy = true;
let c = 80;
let cam;
let cam0;
let cam1; 
let myShader;
let bg;

function preload() {
  bg = loadImage('space.jpg')
}

function setup() {
 let containerDiv = document.getElementById('canvasDiv');
 let divWidth = containerDiv.clientWidth;
 let divHeight = containerDiv.clientHeight;

 let myCanvas = createCanvas(divWidth, divHeight, WEBGL);
 myCanvas.parent('canvasDiv');
 colorMode(HSB);

 // Create the main camera.
 cam = createCamera();

 // Create the first camera.
 cam0 = createCamera();

 // Create the second camera.
 cam1 = createCamera();

 // Place it at the top-right.
 cam1.setPosition(0, 0, 0);

 // Set the current camera to cam.
 setCamera(cam);

 myShader = baseMaterialShader().modify({
    'Inputs getPixelInputs': `(Inputs inputs) {
      float factor =
        sin(
          inputs.texCoord.x * ${TWO_PI} +
          inputs.texCoord.y * ${TWO_PI}
        ) * 0.4 + 0.5;
      inputs.shininess = mix(1., 100., factor);
      inputs.metalness = factor;
      return inputs;
    }`
  });
 

 describe()

}

function draw() {
  

//  panorama(bg);
   
 // Calculate the amount to interpolate between cam0 and cam1.
  let amt = 0.5 * -sin(frameCount * 0.02) + 0.05;
 
 // if (!mouseIsPressed){
 // //Update the main camera's position and orientation.
 // cam.slerp(cam0, cam1, amt);
 // }
 // Map the interpolation to a value between 0 and 255, and apply it to c;
  c = map(amt, -1, 1 , 150, 200 )
  
 //turn on the lights
 lights();
 imageLight(bg);

 //Turn on a white point light at the top-right.
  pointLight(100, 100, 0, 30, -40, 30);

 //enable orbiting with the mouse.
  orbitControl();

 //Rotate the coordinate system
 rotateY(millis() * 0.001 );

 //Style the helix.
 stroke(c, 100, 100)
  
 //style the torus
 noStroke()
 emissiveMaterial(150, 10, 10, 10)
 shader(myShader);
 metalness(200);
  

 // Create a p5.Geometry object.
 beginGeometry();
 

// Parameters 

  // Draw the ellipsoid.
  // Set its radiusX to 30.
  // Set its radiusY to 40.
  // Set its radiusZ to 50.
  // Set its detailX to 4.
  // Set its detailY to 3.
 ellipsoid(100 , 100 , 100 , 4, 3);
 myGeometry = endGeometry();

 //Compute the vertex normals.
 myGeometry.computeNormals()
  
  //model the helix
  model(myGeometry);

  //Style the normal vectors.
  fill(c, 100, 100)

  //Iterate over the vertices and vertexNormals arrays.
  for (let i = 0; i < myGeometry.vertices.length; i++) {


    //Get the vertex p5.Vector object.
    let v = myGeometry.vertices[i];

    // Get the vertex normal p5.Vector object.
    let n = myGeometry.vertexNormals[i];

    //Calculate a point along the vertex normal.
    let p = p5.Vector.mult(n, width * amt + 500)

    //Draw a line for each vertex normal.
    push();
    translate(v);
    translate(p);
      // Start building the p5.Geometry object.


 
  
  
  sphere ()
  


    pop();

  }
}
