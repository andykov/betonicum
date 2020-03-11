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
// var player = new Plyr('.js-video-insert');
// console.log('playerplayer', player);
// console.log(document.querySelector('.js-video-insert'));

  
var player = null;
function openModal(id, url) {

  var $modalId = document.querySelector(id);
  var videoId = url;
  
  // Modal Video
  if ($modalId && id === '#modal-video') {
    
    if (player === null) {
      // if (player != null) {
      //   player.destroy();
      // }
      console.log('Создаем элемент');
      var para = document.createElement("div");

      if (videoId != null) {
        para.setAttribute('id', 'player');
        para.setAttribute('data-plyr-provider', 'youtube');
        para.setAttribute('data-plyr-embed-id', videoId);
        var element = document.querySelector(".js-media-video");
        element.appendChild(para);
      } else {
        console.log('Video ID empty attribute');
        return false
      }

      player = new Plyr('#player', {
        youtube: {
            rel: 0
        }
      });
        
    } else {
      
      player.source = {
        type: 'video',
        sources: [
            {
                src: videoId,
                provider: 'youtube',
            },
        ]
      };

      // console.log('Меняем элемент');
      // // player.destroy()
      // var getEl = document.querySelector('#player');
      // var getAttr = getEl.getAttribute('data-plyr-embed-id');
      // console.log('getAttr', getAttr);
        
      // if (videoId != getAttr) {
      //     getEl.setAttribute('data-plyr-embed-id', videoId);
      // }
    }
  }

  // Modal Image
  if ($modalId && id === '#modal-image') {
    if ($modalId.querySelector('img')) {
      $modalId.querySelector('img').src = url;
    }
  }

  $modalId.style.display = 'block';
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
    let url = $this.target.getAttribute('data-media-url');
    let id = $this.target.getAttribute('data-modal-id');
    openModal(id, url)
  });
});

eachNode($closeModalButtons, function($el) {
  $el.addEventListener('click', closeModal);
});
