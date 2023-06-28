
quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant"];



random_number= Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);

time_counter= 0;
drawn_sketch= "";
answer_holder= "";
score= 0;
timer_check="";

function setup(){
    canvas= createCanvas(280,280);
    canvas.position(500,200);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    
}

function updateCanvas(){
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
var sketch=quick_draw_data_set[random_number];
document.getElementById("sketch_name").innerHTML="The sketch to be drawn " + sketch;

}

function draw(){
    
      strokeWeight(13);
    stroke(red);
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY)
    }
    checkSketch();
    if(drawn_sketch==sketch){
      answer_holder="set";
      score++;
      document.getElementById("update").innerHTML="Score: " +score;
  
    }
  
}
    
  

function checkSketch(){
    time_counter++;
    document.getElementById("update_time").innerHTML="Time: " +time_counter;
    console.log(time_counter);
    if(time_counter>400){
        time_counter=0;
        timer_check="completed";
    }
    if(timer_check=="completed"|| answer_holder=="set" ){
timer_check="";
answer_holder="";
updateCanvas();

    }
}


function preload(){
    classifier=ml5.imageClassifier('doodleNet') ;
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}

function gotResult(error,results){
    if(error){
        console.error();
    }
        console.log("results");
    
    drawn_sketch=results[0].label;
    document.getElementById(my_sketch).innerHTML="Your sketch : " + drawn_sketch;

    confidence= Math.round(results[0],confidence*100)+"%";
    document.getElementById(confidence).innerHTML="confidence : " + confidence;
}

