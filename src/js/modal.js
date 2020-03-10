import scrollLock from 'scroll-lock';

var eachNode = function(nodeList, callback) {
    if (nodeList && callback) {
        for (let i = 0; i < nodeList.length; i++) {
            if (callback(nodeList[i], i, nodeList.length) === true) {
                break;
            }
        }
    }
};

var $modal = document.querySelector('.js-modal');
var $modalScroll = document.querySelector('.js-modal-scroll');
var $modalBackdoor = document.querySelector('.js-modal-backdoor');
var $openModalButtons = document.querySelectorAll('.js-open-modal');
var $closeModalButtons = document.querySelectorAll('.js-close-modal');

// var $navbarFillGap = document.querySelectorAll('.js-navbar-fill-gap');
// scrollLock.addFillGapTarget($navbarFillGap);

function openModal(id, url) {
    console.log(url);
    
    let $modalId = document.querySelector(id);
    
    if ($modalId) {
        console.log($modalId.querySelector('img'));
      if ($modalId.querySelector('img')) {
          $modalId.querySelector('img').src = url;
      }
      $modalId.style.display = 'block';
    }
    $modalBackdoor.style.display = 'block';
    scrollLock.disablePageScroll($modalId);
  
}

function closeModal() {
    var $modalCurrent = document.querySelector('.js-modal[data-scroll-lock-scrollable]');
    $modalBackdoor.style.display = '';
    $modalCurrent.style.display = '';
    scrollLock.enablePageScroll($modalCurrent);
}

eachNode($openModalButtons, function($el) {

    $el.addEventListener('click', function($this) {
        let url = $this.target.getAttribute('data-url-large-photo');
        let id = $this.target.getAttribute('data-modal-id');
        openModal(id, url)
    });
});

eachNode($closeModalButtons, function($el) {
    $el.addEventListener('click', closeModal);
});
