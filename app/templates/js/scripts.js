var CCAINE = CCAINE || {};

CCAINE.example = function () {
	// function example
}; <% if(jsOption.indexOf('jquery') !== -1) { %>
	
$(function() {
	// put your JS code here
}); <% } else if(jsOption.indexOf('zepto') !== -1) { %>
Zepto(function($){
  	// put your JS code here
}); <% } else {%>
document.onreadystatechange = function () {
   if (document.readyState == 'complete') {
        // put your JS hard code here -- IE8+   
   } 
} <% } %>
