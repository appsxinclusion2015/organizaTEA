/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var Rutine = (function(){
  
  function Rutine(){
    this.activityList = [];    
  }
  
  Rutine.prototype.addActivity = function(activity){
    this.activityList.push(activity);
  }
  
  Rutine.prototype.removeActivity = function(activity){
    //this.activityList.push(activity);
  }
  
  Rutine.prototype.addTimelapse = function(timelapse){
    this.activityList.push(timelapse);
  }
  
  Rutine.prototype.removeTimelapse = function(timelapse){
    //this.activityList.push(timelapse);
  }
  
  return Rutine;
})();