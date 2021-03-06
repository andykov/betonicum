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

var $mobileNav = document.querySelector(".js-panel-scroll");
var $header = document.querySelector(".header");
var $modalBackdoor = document.querySelector(".js-nav-backdoor");
var $openModalButtons = document.querySelectorAll(".js-mobile-nav-trigger");
var $closeModalButtons = document.querySelectorAll(".js-close-mobile-nav");
var $sidebarScroll = document.querySelector(".js-panel-scroll");

scrollLock.addLockableTarget($sidebarScroll);

function openModal() {
  $modalBackdoor.style.display = "block";
  $mobileNav.style.display = "flex";
  $header.classList.add("nav-open");
  console.log($mobileNav);
  scrollLock.disablePageScroll($mobileNav);
}

function closeModal() {
  $modalBackdoor.style.display = "";
  $mobileNav.style.display = "";
  $header.classList.remove("nav-open");
  scrollLock.enablePageScroll($mobileNav);
}

eachNode($openModalButtons, function ($el) {
  $el.addEventListener("click", openModal);
});
eachNode($closeModalButtons, function ($el) {
  $el.addEventListener("click", closeModal);
});
