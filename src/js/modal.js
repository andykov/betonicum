"use strict";

var scrollLock = require('scroll-lock');

var eachNode = function eachNode(nodeList, callback) {
  if (nodeList && callback) {
    for (var i = 0; i < nodeList.length; i++) {
      if (callback(nodeList[i], i, nodeList.length) === true) {
        break;
      }
    }
  }
};


var $modalBackdoor = document.querySelector(".js-modal-backdoor");
var $openModalButtons = document.querySelectorAll(".js-open-modal");
var $closeModalButtons = document.querySelectorAll(".js-close-modal");

var player = null;

function openModal(id, url) {
  var $modalId = document.querySelector(id);
  var videoId = url; 
  var $modalContainer = document.querySelector(id + ' .modal__container');
  var $modalContent = document.querySelector(id + ' .modal__content');

  // Modal Video
  if ($modalId && id === "#modal-video") {
    if (player === null) {

      var para = document.createElement("div");

      if (videoId != null) {
        para.setAttribute("id", "player");
        para.setAttribute("data-plyr-provider", "youtube");
        para.setAttribute("data-plyr-embed-id", videoId);
        var element = document.querySelector(".js-media-video");
        element.appendChild(para);
      } else {
        console.log("Video ID empty attribute");
        return false;
      }

      player = new Plyr("#player", {
        youtube: {
          rel: 0
        }
      });
    } else {
      player.source = {
        type: "video",
        sources: [{
          src: videoId,
          provider: "youtube"
        }]
      };
    }
  }
  
  // Modal Image
  if ($modalId && id === "#modal-image") {
    if ($modalId.querySelector("img")) {
      $modalId.querySelector("img").src = url;
    }
  }

  // Modal View
  $modalId.style.display = "block";
  $modalBackdoor.style.display = "block";
  scrollLock.disablePageScroll($modalId);
  $modalContainer.style.maxWidth = $modalContent.clientWidth + 'px';
}

function closeModal() {
  var $modalCurrent = document.querySelector(".js-modal[data-scroll-lock-scrollable]");
  $modalBackdoor.style.display = "";
  $modalCurrent.style.display = "";
  scrollLock.enablePageScroll($modalCurrent);
}

eachNode($openModalButtons, function ($el) {
  $el.addEventListener("click", function ($this) {
    var url = $this.target.getAttribute("data-media-url");
    var id = $this.target.getAttribute("data-modal-id");
    openModal(id, url);
  });
});
eachNode($closeModalButtons, function ($el) {
  $el.addEventListener("click", closeModal);
});