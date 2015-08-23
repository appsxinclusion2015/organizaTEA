/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var TimeRange = (function(){
  
  function TimeRange(min, max){
    this.rangeMin = min || '';
    this.rnageMax = max || 0;
    this.icon = icon || '';
    this.initialize();
  };
  
  TimeRange.prototype.setMin = function(min){
    this.rangeMin = min;
  }; 
  
  Timelapse.prototype.setMax = function(max){
    this.rangeMax = max;
  };
  
  Timelapse.prototype.setIcon = function(icon){
    this.icon = icon;
  };
  
  return TimeRange;
})();