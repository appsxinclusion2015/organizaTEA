/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var RoutineController = (function(){
  
  function RoutineController(){
    this.routine = new Rutine();
    this.initialize();
    this.render();
  };
  
  RoutineController.prototype.initialize = function() {
    this.routine.addActivity(new Activity('Levantarse', 'video 1', 'thumbnail 1', 'image 1', 12));
    this.routine.addActivity(new Timelapse('time 1', 20));
    this.routine.addActivity(new Activity('Escuela', 'video 2', 'thumbnail 2', 'image 2', 15));
    this.routine.addActivity(new Timelapse('time 1', 30));
  };
  
  RoutineController.prototype.render =  function(){
    //Render the elements in the UI
  };
  
  RoutineController.prototype.loadActivity = function(activity){
    //Event click show the next page
  };
  
  RoutineController.prototype.showEnd = function(activity){
    //Show the animation at the end
  };
    
  return RoutineController;
})();