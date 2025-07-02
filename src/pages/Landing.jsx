import React, { useEffect, useRef , useState } from 'react';
import { drawTriangle, drawSquare, drawCircle , drawVertical, drawHorizontal } from './draw.js';
import { useNavigate } from 'react-router-dom'

const web = () => {
  const navigate = useNavigate() 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const captureCanvasRef = useRef(null); // for taking snapshots
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectShape , setShape ] = useState('') 
  const [selectShapes, setShapes ] = useState([]) 


  const [isCaptured, setIsCaptured] = useState(false);
  let posX = 50, posY = 50;
  let velX = 2, velY = 2;
  let squareSize = 200;

  
  useEffect(() => {
    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
      });

    // Bouncing square animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw square
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.fillRect(posX, posY, squareSize, squareSize);
      // ctx.strokeStyle = "white";
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.stroke()
      

      // Update position
      posX += velX;
      posY += velY;

      // Bounce on edges
      if (posX + squareSize >= canvas.width || posX <= 0) velX *= -1;
      if (posY + squareSize >= canvas.height || posY <= 0) velY *= -1;

      requestAnimationFrame(animate);
    };

    // Match canvas size to video size
    const resizeCanvas = () => {
      if (canvas && videoRef.current) {
        canvas.width = videoRef.current.clientWidth;
        canvas.height = videoRef.current.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  

  const handleCapture = () => {

    // get current frame
    const captureCanvas = captureCanvasRef.current;
    const ctx = captureCanvas.getContext('2d');
    const video = videoRef.current;

    captureCanvas.width = 640;
    captureCanvas.height = 480;
    ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

    const gridSize =  5;

    let rectX = posX;
    let rectY = posY;
    let rectSize = squareSize;

    let startX = rectX;
    let startY = rectY;
    const div = rectSize/5


    // draw square
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(posX, posY, squareSize, squareSize);


    // Draw vertical and horizontal lines
    drawVertical(rectX,rectY,rectSize,div,ctx)
    drawHorizontal(rectX,rectY,rectSize,div,ctx)

    let countTriangle = 0
    let countSquare= 0
    let countCircle = 0
    

    let shapeLoc = [];
    // loop through the grid place shapes
    for (let y = 0; y < gridSize; y+=1) {
      startX -= div

      for (let x = 0; x < gridSize; x+=1) {
        startX += div
        let rand = Math.floor(Math.random() * 4)
        if(rand == 2 && countTriangle!=6 ){
          drawTriangle( startX , startY , div,false,ctx)
          countTriangle +=1

          shapeLoc.push({
            shape:'triangle',
            xMin:startX, xMax: startX+ div,
            yMin:startY, yMax: startY+ div,
            clicked:false
          })
          continue
        }
        
        if(rand == 1  && countSquare!=6){
          drawSquare( startX , startY , div,false,ctx)
          countSquare +=1

          shapeLoc.push({
            shape:'square',
            xMin:startX, xMax: startX+ div,
            yMin:startY, yMax: startY+ div,
            clicked:false
          })
          continue
        }
        
        if(rand == 0 && countCircle!=6){
          drawCircle(startX , startY , div,false,ctx)
          countCircle +=1

          shapeLoc.push({
            shape:'circle',
            xMin:startX, xMax: startX+ div,
            yMin:startY, yMax: startY+ div,
            clicked:false
          })
          continue
        }

      }
      startX = rectX
      startY += div
    }
    setShapes(shapeLoc)

    const dataURL = captureCanvas.toDataURL('image/png');
    setCapturedImage(dataURL);
    setIsCaptured(true)


    // update click to false or vice versa
    const updateClick = ( xMin, yMin, clicked) =>{

      const updatedShapes = shapeLoc.map(item => {
        if (
          xMin == item.xMin &&
          yMin == item.yMin
        ) {

          return { ...item, clicked: clicked };
        }
        return item;
      });


      return updatedShapes
    }


    

    captureCanvas.addEventListener('click', (event) => {
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;

      let result = shapeLoc.filter(item => 
        mouseX >= item.xMin && mouseX <= item.xMax &&
        mouseY >= item.yMin && mouseY <= item.yMax
      );

    
      if (result.length >0) {
        let clicked;

        if(result[0].shape == 'square'){
          if(result[0].clicked){
            drawSquare(result[0].xMin,result[0].yMin, div,false,ctx)
            clicked = false
          }else{
            drawSquare(result[0].xMin,result[0].yMin, div,true,ctx)
            clicked = true
          }

          shapeLoc = updateClick(result[0].xMin,result[0].yMin, clicked)
          setShapes(shapeLoc)
        
          return
        }
        
        
        if(result[0].shape == 'circle'){

          if(result[0].clicked){

            drawCircle(result[0].xMin,result[0].yMin, div,false,ctx)
            clicked = false
          }else{

            drawCircle(result[0].xMin,result[0].yMin, div,true,ctx)
            clicked = true
          }

          shapeLoc = updateClick(result[0].xMin,result[0].yMin, clicked)
          setShapes(shapeLoc)
        
          return
        }
        
        
        
        if(result[0].shape == 'triangle'){
          // setShape("Circle")
          // console.log('result[0].clicked' ,result[0])
          if(result[0].clicked){
            // console.log('color white')
            drawTriangle(result[0].xMin,result[0].yMin, div,false,ctx)
            clicked = false
          }else{
            // console.log('color red')
            drawTriangle(result[0].xMin,result[0].yMin, div,true,ctx)
            clicked = true
          }

          shapeLoc = updateClick(result[0].xMin,result[0].yMin, clicked)
          setShapes(shapeLoc)
        
          return
        }



      }


    });



  



    let toChoose = Math.floor(Math.random() * 3)
    if(toChoose == 2){
      setShape("square")
    }else if(toChoose == 1){
      setShape("circle")
    }else if(toChoose == 0){
      setShape("triangle")
    }




  };

  let tries = 0
  const handleValidate = () => {

    // console.log('VALIDATING')
    // console.log(selectShape)
    
    let error = 0;
    for (let i = 0; i < selectShapes.length; i++) {
      // console.log(selectShapes[i].shape , selectShapes[i].clicked  )

      if(selectShapes[i].shape == selectShape && !selectShapes[i].clicked ){
        console.log('not validated')
        error+=1
        break
      }

      if(selectShapes[i].shape != selectShape && selectShapes[i].clicked  ){
        console.log('wrong')
        error+=1
        break
      }
    }

    if(error>0){
      console.log('validation fails',tries)
      tries +=1
      if(tries == 3){
        navigate('/error', {replace: true}) 
      }
      alert('validation fails, please select/deselect all the required shapes')
    }else{
      alert('validation success')
      navigate('/success', {replace: true}) 
      console.log('validation success')
    }


  }

  return (
    <div style={{ alignContent:'center', position: 'relative', width: '100vw', height: '100vh' , backgroundColor:'powderblue'}}>

      <div style={{ margin:'auto' , position: 'relative', width: '640px', height: '480px' }}>



      {!isCaptured ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          />
        </>
      ) : (
        <></>
      )}


        {isCaptured ? (
          <>
          <h4>Select the Following: {selectShape}</h4>
          </>
        ) : (
          <>
          <div>

          {/* <h4>Select the Following: {selectShape}</h4> */}
          <button onClick={handleCapture} style={{ }}>
            Capture
          </button>
          </div>
          </>
        )}


        <canvas ref={captureCanvasRef} />

        {isCaptured ? (
          <>
          <button onClick={handleValidate} style={{  }}>
            Validate
          </button>
            
          </>
        ) : (
          <></>
        )}

       

      </div>

      
    </div>
  );
};

export default web;