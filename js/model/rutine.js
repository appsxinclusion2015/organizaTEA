/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var Rutine = (function(){
  
  function Rutine(){
    this.eventList = [];    
  }
  
  Rutine.prototype.addActivity = function(activity){
    this.eventList.push(activity);
  }
  
  Rutine.prototype.removeActivity = function(activity){
    //this.eventList.push(activity);
  }
  
  Rutine.prototype.addTimelapse = function(timelapse){
    this.eventList.push(timelapse);
  }
  
  Rutine.prototype.removeTimelapse = function(timelapse){
    //this.eventList.push(timelapse);
  }
  
  return Rutine;
})();