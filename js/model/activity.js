/*
*     ORGANIZATEA    
*   HACKATON SOLIDARIO
*/

var Activity = (function(){
  
  function Activity(name, video, thumbnail, image, duration){
    this.name = name || '';
    this.video = video || '';
    this.thumbnail = thumbnail || '';
    this.imageEnd = image || '';
    this.duration =  duration || 0;
  }
  
  Activity.prototype.setName = function(name){
    this.name = name;
  }
  
  Activity.prototype.setVideo = function(video){
    this.video = video;
  }
  
   Activity.prototype.setThumbnail = function(thumbnail){
    this.thumbnail = thumbnail;
  }
  
  Activity.prototype.setImageEnd = function(image){
    this.imageEnd = image;
  }
  
  Activity.prototype.setDuration = function(duration){
    this.duration = duration;
  }
  
  Activity.prototype.getName = function(){
    return this.name;
  }
  
  Activity.prototype.getVideo = function(){
    return this.video;
  }
  
  Activity.prototype.getThumbnail = function(){
    return this.thumbnail;
  }
  
  Activity.prototype.getImageEnd = function(){
    return this.imageEnd;
  }
  
  Activity.prototype.getDuration = function(){
    return this.duration;
  }
  
  return Activity;  
})();