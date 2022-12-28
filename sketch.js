var colors = "ffc09f-ffee93-fcf5c7-a0ced9-adf7b6".split("-").map(a=>"#"+a)
var colors_r = "ff6d00-ff7900-ff8500-ff9100-ff9e00-240046-3c096c-5a189a-7b2cbf-9d4edd".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var sizeList =[]  //所有花的大小

var face_x = [] //新增臉x軸的變數
var face_y = [] //新增臉y軸的變數
var face_size = [] //新增臉大小的變數
var face_num = 1 //新增臉數量的變數並設為1

//++++++++++手勢辨識_變數宣告區++++++++++++++++++++++++
let handpose;
let video;  //攝影機取得影像，放影像資料
let predictions = [];  //紀錄所有手勢21點所有資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d //後面變數名稱有8代表食指最上端，4代表大拇指的最上端。大寫的X、Y、Z手指所在的座標，d代表為4與8點的距離(只有取xy軸)
let pointerX14,pointerY14,pointerX16,pointerY16  //用四個變數紀錄第14點(pointerX14,pointerY14)，16點的X，Y(pointerX16,pointerY16)
//++++++++++++++++++++++++++++++++++++++++++++++++++++


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<1;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
		
		  for(var i=0;i<face_num;i++){ //設定迴圈，讓臉變多
        face_size[i] = 100  //臉的大小100~400
        face_x[i] = positionListX[j] //臉的x軸在視窗寬除以2
        face_y[i] = positionListY[j] //臉的x軸在視窗寬除以2
        
      }
		
    pop()
    }
	//+++++++++++++取得攝影機影像並連線手勢辨識+++++++++++++++++++++
	
		video = createCapture(VIDEO);  //取得攝影機的影像，影像的畫面存到video
		video.size(width, height);  //影像的大小為整個視窗大小

		handpose = ml5.handpose(video, modelReady);  //把video影像執行手辨識，辨識完畢會去執行modelReady function

  	// This sets up an event that fills the global variable "predictions"
  	// with an array every time new hand poses are detected
		handpose.on("predict", (results) => {  
    		predictions = results;   //手勢辨識後的結果放到predictions變數內
		}); 

  	// Hide the video element, and just show the canvas
		video.hide();  //隱藏video
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++	
}


function modelReady() {
  console.log("Model ready!");
}




function draw() {  //一秒進到function執行60次
  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
  //+++++++++
	background(255); 
	
	image(video,0,0,width, height)
	
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指上端的距離
	
  for(var j=0;j<positionListY.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListY[j],positionListX[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
		// rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
		r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j]) 
    }
  drawKeypoints();
}

function drawFlower(clr,clr_r,size=1){  //clr:花瓣顏色，clr_r:花圓心顏色，size:花大小
  
	for(var j=0;j<face_num;j++){
    var f_s = face_size[j] //宣告f_s為face_size[j]
        // translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
        fill('#2a9d8f') //上臉色2a9d8f
        noStroke() //不描邊
	}
  push()
    // fill(255,211,33)
    scale(size)    //縮放，size=1，100%顯示，0.5，50%顯示
    fill(clr_r)
    // ellipse(0,0,50)
    // ellipseMode(CORNER) 
    // fill(255,90,61)
    fill(clr)
   ellipse(f_s/5,-f_s/2.3,f_s/5,f_s/5)//鱗片
    ellipse(f_s/3.5,-f_s/2.9,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.9,-f_s/3.7,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.6,-f_s/4.7,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.6,-f_s/15,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.6,-f_s/30,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.6,-f_s/55,f_s/5,f_s/5)//鱗片
    ellipse(f_s/2.6,f_s/15.4,f_s/5,f_s/5)//鱗片
    
 
    fill('#2a9d8f')
    ellipse(0,0,f_s/1.1,f_s)  //臉
    ellipse(f_s/13,-f_s/2.2,f_s/5,f_s/4)//高眼睛(右)
    ellipse(-f_s/13,-f_s/2.2,f_s/5,f_s/4)//高眼睛(左)

    fill(0) //上黑色
    ellipse(-f_s/13,-f_s/2.7,f_s/25,f_s/50)//鼻孔(左)
    ellipse(f_s/13,-f_s/2.7,f_s/25,f_s/50)//鼻孔(右)
    
    
    fill(255) //上白色
    ellipse(-f_s/12,-f_s/2.1,f_s/10)//眼眶(左)
    fill(0) //上白色
    ellipse(-f_s/9+map(mouseX,0,width,-f_s/10000,f_s/20),-f_s/2+map(mouseY,0,height,-f_s/10000,f_s/20),f_s/30)//眼睛(左)，用map讓眼睛鎖在眼眶，並讓隨著滑鼠移動

    noFill()
    
    fill(255)
    ellipse(f_s/12,-f_s/2.1,f_s/10)//眼眶(右)
    fill(0)
    ellipse(f_s/15+map(mouseX,0,width,-f_s/10000,f_s/20),-f_s/2+map(mouseY,0,height,-f_s/10000,f_s/20),f_s/30)//眼睛(右)，用map讓眼睛鎖在眼眶，並讓隨著滑鼠移動

    
    
    fill(255)


      fill(255,0,0)
      ellipse(0,-f_s/4-1,f_s/2,f_s/5-10)
      fill("#aacc00")
      arc(f_s/12.5,-f_s/2.77,f_s/70,f_s/7,0,270)//鼻涕
      fill('#2a9d8f')
      
      ellipse(f_s/5,f_s/2.5,f_s/3,f_s/2)//右腿
      ellipse(f_s/3.5,f_s/1.7,f_s/2.5,f_s/5)//右腳
      ellipse(-f_s/5,f_s/2.5,f_s/3,f_s/2)//左腿
      ellipse(-f_s/3.5,f_s/1.7,f_s/2.5,f_s/5)//左腳
      fill("#52796f")
      ellipse(f_s/2,f_s/50,f_s/2.5,f_s/6)//右手臂
      ellipse(f_s/1.5,f_s/50,f_s/6,f_s/6)//右手掌
      ellipse(-f_s/2,f_s/50,f_s/2.5,f_s/6)//左手臂
      ellipse(-f_s/1.5,f_s/50,f_s/6,f_s/6)//左手掌

      fill("#94d2bd")
     ellipse(0,f_s/5,f_s/3,f_s/3)//肚子印記
    
  pop()    
}

function mousePressed(){
//紀錄資料
positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      
      // noStroke();
      if (j == 8) {			 //食指的上端	
				pointerX8 = map(keypoint[0],0,640,0,width)  //j=8所以取得第8點的資訊，keypoint[0]代表x(食指座標)
				pointerY8 = map(keypoint[1],0,480,0,height)  //keypoint[1]代表y(食指座標)
        pointerZ8 = keypoint[2] //keypoint[2]代表z(食指座標)
       	console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				
				fill(0, 255, 0);
				ellipse(pointerX8, pointerY8, 30, 30);//畫食指圓圈
				
      } else
      if (j == 4) {  //  大拇指的上端
				
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
				fill(255,0,0)
        ellipse(pointerX4, pointerY4, 30, 30);  //畫大拇指圓圈
		
      } else
      if (j == 14) { //無名指第三關節
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) { //無名指上端
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}

function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
		if(pointerY14<pointerY16){   //
			drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6)) //花做放大縮小，無名指有彎曲
		}else
		{
			//無名指沒有彎曲，張開無名指，花做旋轉
			rotate(frameCount/20)
			drawFlower(F_clr,F_clr_r,F_size)			
		}
	pop()
}

function R_draw(handX,handY)
{
	//紀錄資料
positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(handY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}
