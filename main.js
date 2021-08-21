status = "";
input = "";
objects=[];

function setup(){
    canvas = createCanvas(455, 345);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 350);
    video.position(575, 333);
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects...";
    input = document.getElementById("input_box").value;
}

function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 600, 500);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(video, gotResult);
                document.getElementById("object_found").innerHTML = input + "Found";
                var synth = window.speechSynthesis;
                speak();
            }
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = input + "found";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = [results];
}
