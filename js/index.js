var application;

$(function(){
    var App = (function(){
        
        function App(){
          this.routineController = new RoutineController();
        };
        
        return App;
    })();
    
    application = new App();
});