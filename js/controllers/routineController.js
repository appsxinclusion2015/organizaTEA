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
    this.routine.addActivity(new Activity('Levantarse', 'https://www.youtube.com/embed/_e-KVU-QARk', 'http://img.youtube.com/vi/_e-KVU-QARk/default.jpg', 'image 1', 12));
    this.routine.addActivity(new Timelapse('time 1', 20));
    this.routine.addActivity(new Activity('Escuela', 'video 2', 'thumbnail 2', 'image 2', 15));
    this.routine.addActivity(new Timelapse('time 1', 30));
    this.routine.addActivity(new Activity('Acostarse', 'video 3', 'thumbnail 3', 'image 3', 17));
  };
  
  RoutineController.prototype.render =  function(){
    //Render the elements in the UI
    var $activityList = $('#activityList');
    
    this.routine.activityList.forEach(function(activity){
      
      var $markup = '';
      
      if(activity instanceof Activity) {
        $markup = '' + 
        '<div class="row">' +
        '  <div class="col-xs-10 col-xs-offset-1">' +
        '    <div class="thumbnail">' +
        '      <a href="#media" aria-controls="media" role="tab" data-toggle="tab">' +
        '        <img src="http://placehold.it/350x150" alt="image">' +
        '      </a>' +
        '    </div>' +
        '  </div>' +
        '</div>';
      }
      else if (activity instanceof Timelapse) {
        $markup = '' +
        '<div class="row">' +
        '  <div class="col-xs-10 col-xs-offset-1">' +
        '    <!--div id="range-slider-1"></div-->' +
        '    <input type="range" orient="vertical" style="height:5em; margin-left:auto; margin-right:auto;">' +
        '  </div>' +
        '</div><br>';
      }
      
      $activityList.append($markup);
    });
  };
  
  RoutineController.prototype.loadActivity = function(activity){
    //Event click show the next page
    $('a[href="#media"]').tab('show') // Select tab by name
  };
  
  RoutineController.prototype.showEnd = function(activity){
    //Show the animation at the end
    $('a[href="#congrats"]').tab('show') // Select tab by name
  };
  
  RoutineController.prototype.showHome = function(){
    $('a[href="#home"]').tab('show') // Select tab by name
  };
    
  return RoutineController;
})();