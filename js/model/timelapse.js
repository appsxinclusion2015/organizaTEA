/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var Timelapse = (function(){
  
  function Timelapse(id, duration, icon){
    this.id = id || '';
    this.duration = duration || 0;
    this.icon = icon || '';
    this.initialize();
  };
  
  Timelapse.prototype.initialize = function(){
    //Define the icon depending on the times
  };
  
  Timelapse.prototype.setId = function(id){
    this.id = id;
  }; 
  
  Timelapse.prototype.setDuration = function(duration){
    this.duration = duration;
  };
  
  Timelapse.prototype.setIcon = function(icon){
    this.icon = icon;
  };
  
  return Timelapse;
})();