var application;

$(function(){
    var App = (function(){
        
        function App(){
          this.routineController = new RutineController();
        };
        
        return App;
    })();
    
    application = new App();
});