$(function(){
    var App = (function(){
        
        function App(){
          this.routineController = new RoutineController();
        };
        
        return App;
    })();
    
    var app = new App();
});