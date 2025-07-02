export const drawTriangle = (startX,startY , div, clicked=false, ctx) =>{
    const margin = 10
    if(clicked){
        ctx.fillStyle =  'rgba(255, 0,0 , 1)';
    }else{
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    }
    ctx.beginPath();
    ctx.moveTo(startX+(margin/2), startY +div - (margin/2)); //( bottom left x, bottom left y)
    ctx.lineTo(startX-(margin/2)+ div, startY+div - (margin/2)); //( bottom right x, bottom right y)
    ctx.lineTo(startX+ div/2, startY +(margin/2));//(top x , top y)
    ctx.closePath();
    ctx.fill();

  }

export const drawSquare = (startX,startY , div, clicked=false, ctx) =>{
    // console.log('draw square',startX,startY , div,clicked)
    const margin = 10
    if(clicked){
        ctx.fillStyle =  'rgba(255, 0,0 , 1)';
    }else{
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    }
    ctx.fillRect(startX+margin/2, startY+margin/2, div-margin, div-margin);
  }

export const drawCircle = (startX,startY , div, clicked=false, ctx) =>{
    const margin = 10
    if(clicked){
        ctx.fillStyle =  'rgba(255, 0,0 , 1)';
    }else{
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    }
    ctx.beginPath(); // Start a new path
    ctx.arc(startX +div/2, startY+div/2, (div-margin)/2, 0, 2 * Math.PI); // Create the circle
    ctx.fill(); 
}

export const drawVertical = (rectX,rectY,rectSize,div,ctx) =>{
    for (let x = rectX; x <= rectX+rectSize ; x += div) {
        ctx.beginPath();
        ctx.moveTo(x, rectY);
        ctx.lineTo(x, rectY+rectSize);
        ctx.stroke();
    }
}

export const drawHorizontal = (rectX,rectY,rectSize,div,ctx) =>{
    for (let y = rectY; y <= rectY +rectSize; y += div) {
        ctx.beginPath();
        ctx.moveTo(rectX, y);
        ctx.lineTo(rectX +rectSize, y);
        ctx.stroke();
    }
}