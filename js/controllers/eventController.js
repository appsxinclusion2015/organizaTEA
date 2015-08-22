/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var RoutineController = (function(){
  
  function RoutineController(){
    this.routine = new Rutine();
    this.initialize();
  }
  
  RoutineController.prototype.initialize = function() {
    this.routine.addActivity(new Activity('activity 1', 'video 1', 'image 1', 12));
    this.routine.addActivity(new Timelapse('time 1', 20));
    this.routine.addActivity(new Activity('activity 2', 'video 2', 'image 2', 15));
    this.routine.addActivity(new Timelapse('time 1', 30));
  };
  
  return RoutineController;
})();