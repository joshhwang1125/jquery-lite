/*global DOMNodeCollection*/

(function () {
  if (typeof $l === "undefined") {
    window.$l = function(arg) {
      if (arg instanceof Element) {
        var collect = new DOMNodeCollection( [arg] );
        return collect;
      }

      if (typeof arg === "string") {
        // if (/<[a-z][\s\S]*>/i.test(arg)){
        //   var wrapper = document.createElement(arg);
        //   return new DOMNodeCollection( [wrapper] );
        // }
        var elementList = [].slice.call(document.querySelectorAll(arg));
        console.log(elementList);
        collect = new DOMNodeCollection(elementList);
        // debugger;
        return collect;
        // return new DOMNodeCollection(elementList);
      }
    };

    var DOMNodeCollection = function(htmlArray) {
      this.htmlArray = htmlArray;
    };

    DOMNodeCollection.prototype.forEach = function (fn) {
      for (var i = 0; i < this.htmlArray.length; i++) {
        fn(this.htmlArray[i]);
      }
    };

    DOMNodeCollection.prototype.html = function (content) {
      if ( content === undefined ){
        return this.htmlArray[0].innerHTML;
      } else {
        this.forEach(function (el) {
          el.innerHTML = content;
        });
      }
    };

    DOMNodeCollection.prototype.empty = function () {
      this.forEach(function (el) {
        el.innerHTML = "";
      });
    };

    DOMNodeCollection.prototype.append = function (arg2) {
      if (typeof arg2 === "string"){
        this.forEach(function (el) {
          el.innerHTML += arg2;
        });
      } else if (arg2 instanceof Element){
        this.forEach(function (el) {
          el.innerHTML += arg2.outerHTML;
        });
      } else if (arg2 instanceof DOMNodeCollection){
        console.log("here i am ");
        this.forEach(function (el) {
          arg2.forEach(function(object) {
            el.innerHTML += object.outerHTML;
          });
        });
      }
    };

    DOMNodeCollection.prototype.attr = function (attrName, value) {
      if (value === undefined){
        this.forEach(function (el) {
          console.log(el.getAttribute(attrName));
        });
      } else {
        this.forEach(function (el) {
          el.setAttribute(attrName, value);
        });
      }
    };

    DOMNodeCollection.prototype.addClass = function (className) {
      this.forEach(function (el) {
        el.className = className;
      });
    };

    DOMNodeCollection.prototype.removeClass = function (className) {
      this.forEach(function (el) {
        el.className = "";
      });
    };

    DOMNodeCollection.prototype.children = function () {
      var childrenArray = [];

      this.forEach(function (el) {
        childrenArray.push(el.children);
      });

      return new DOMNodeCollection(childrenArray);
    };

    DOMNodeCollection.prototype.parent = function () {
      var parentArray = [];

      this.forEach(function (el) {
        parentArray.push(el.parentNode);
      });

      return new DOMNodeCollection(parentArray);
    };

    DOMNodeCollection.prototype.find = function (selector) {
      // var elementList = [].slice.call(document.querySelectorAll(arg));

    };


  }
})();
