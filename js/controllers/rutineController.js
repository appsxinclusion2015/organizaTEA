/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var RutineController = (function(){
  
  function RutineController(){
    this.routine = new Rutine();
    this.timeRanges = [];
    this.initialize();    
    this.render();
    this.setEvents();
  };
  
  RutineController.prototype.setEvents = function() {
    var self = this;
    $('.activity').on('click', function(event){
      var current = self.currentActivity(event);
      self.loadActivity(current);
    })
  };
  
  RutineController.prototype.initialize = function() {
    
    /* Initialize rutines */ 
    this.routine.addActivity(new Activity('Levantarse', 'https://www.youtube.com/embed/_e-KVU-QARk', 'http://img.youtube.com/vi/_e-KVU-QARk/default.jpg', 'image 1', 12));
    this.routine.addActivity(new Timelapse('time 1', 20));
    this.routine.addActivity(new Activity('Escuela', 'https://www.youtube.com/embed/f6ETcwUmOKo', 'http://img.youtube.com/vi/f6ETcwUmOKo/default.jpg', 'image 2', 15));
    this.routine.addActivity(new Timelapse('time 2', 30));
    this.routine.addActivity(new Activity('Acostarse', 'https://www.youtube.com/embed/pCuMG3snmic', 'http://img.youtube.com/vi/pCuMG3snmic/default.jpg', 'image 2', 17));
    
    /* Initialize the time ranges */
    
  };
  
  RutineController.prototype.render =  function(){
    //Render the elements in the UI
    var $activityList = $('#activityList');
    
    this.routine.activityList.forEach(function(activity){
      
      var $markup = '';
      
      if(activity instanceof Activity) {
        $markup = '' + 
        '<div class="row">' +
        '  <div class="activity col-xs-10 col-xs-offset-1">' +
        '    <div class="thumbnail">' +
        '      <a data-activity-name="'+ activity.getName() + '" href="#media" aria-controls="media" role="tab" data-toggle="tab">' +
        '        <img data-activity-name="'+ activity.getName() + '" src="' + activity.getThumbnail() + '" alt="image">' +
        '      </a>' +
        '      <p data-activity-name="'+ activity.getName() + '"> ' + activity.getName() + '</p>' +
        '    </div>' +
        '  </div>' +
        '</div>';
      }
      else if (activity instanceof Timelapse) {
        $markup = '' +
        '<div class="row">' +
        '  <div class="col-xs-10 col-xs-offset-1">' +
        '    <!--div id="range-slider-1"></div-->' +
        '    <input value="100" type="range" orient="vertical" style="height:5em; margin-left:auto; margin-right:auto;">' +
        '  </div>' +
        '</div><br>';
      }
      
      $activityList.append($markup);
    });
  };
  
  RutineController.prototype.currentActivity = function(event) {
    var currentName = $(event.target).attr('data-activity-name');
    var current;
    
    this.routine.activityList.forEach(function(activity){
      if(activity instanceof Activity) {
        if(activity.name === currentName){
          current = activity;
        }
      }
    });
    
    return current;
  };
  
  RutineController.prototype.loadActivity = function(activity){
    //Clean and regenerate the markup
    var $parentNode = $('#activity-page');
    $parentNode.children().remove();
    
    var $activityDetail = '' +
        ' <div class="row">' +
        '   <h2>' + activity.getName()  + ' </h2>' +
        '   <div class="embed-responsive embed-responsive-4by3">' +
        '     <iframe class="embed-responsive-item" src="' + activity.getVideo() + '"></iframe>' +
        '   </div>' +
        ' </div>' +
        ' <br>' +
        ' <div class="row">' +
        '   <div class="col-xs-12">' +
        '     <!-- <div id="range-slider-2"></div> -->' +
        '     <input value="0" type="range" style="height:5em; margin-left:auto; margin-right:auto;">' +
        '   </div>' +
        ' </div>' +
        ' <div class="row">' +
        ' <div class="col-xs-12">' +
        '   <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>' +
        '   <a href="#congrats" aria-controls="congrats" role="tab" data-toggle="tab">Congrats</a>' +
        ' </div>' +
        ' </div>';
    
    $parentNode.append($activityDetail);
      
    //Event click show the next page
    $('a[href="#media"]').tab('show') // Select tab by name
    
  };
  
  RutineController.prototype.showEnd = function(activity){
    //Show the animation at the end
    $('a[href="#congrats"]').tab('show') // Select tab by name
  };
  
  RutineController.prototype.showHome = function(){
    $('a[href="#home"]').tab('show') // Select tab by name
  };
    
  return RutineController;
})();