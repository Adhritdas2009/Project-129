song1='';
song2='';
lwristx=0;
lwristy=0;
rwristx=0;
rwristy=0;
score=0;


function preload(){
song1=loadSound('music.mp3')
song2=loadSound('music2.mp3')
}

function setup(){
    canvas= createCanvas(400, 400);
    canvas.position(600, 300);
    video=createCapture(VIDEO)
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw(){
    image(video, 0, 0, 400, 400)
    
    Numberlx=Number(lwristx);
    console.log(Numberlx);
    lxy=floor(Numberlx);
    console.log(lxy);
    if(score>0.2){
        song1.play();
        fill('red');
    stroke('red');
    circle(lwristx, lwristy, 20)
    }


}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function modelLoaded(){
    console.log('THe model has been loaded')
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        lwristx=results[0].pose.leftWrist.x;
        rwristx=results[0].pose.rightWrist.x;
        lwristy=results[0].pose.leftWrist.y;
        rwristy=results[0].pose.rightWrist.y;
        console.log('In the left wrist x: ' + lwristx + ' y: ' + lwristy + '. In the right wrist x: ' + rwristx + ' y: ' + rwristy);
        score=results[0].pose.keypoints[9].score;
        console.log('The score is ' + score)
    }
}