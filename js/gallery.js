const galleryImages = [
    { src: 'resources/art_showcase/assets.png', caption: 'Inventory items' },
    { src: 'resources/art_showcase/awaterfall.png', caption: 'Fantasy environment concept art' },
    { src: 'resources/art_showcase/baobabplains.png', caption: 'Fantasy environment concept art, part 2' },
    { src: 'resources/art_showcase/books.png', caption: 'A icon of a stack of a books' },
    { src: 'resources/art_showcase/bunnies.png', caption: 'Character design variations' },
    { src: 'resources/art_showcase/car.png', caption: 'Semi-realism style study with a noir feeling' },
    { src: 'resources/art_showcase/characters.png', caption: 'Cartoon-style character lineup' },
    { src: 'resources/art_showcase/charcreator.gif', caption: 'Demonstration of modular skin and hair presets for a character creator' },
    { src: 'resources/art_showcase/colourstudyA.png', caption: 'A colour study' },
    { src: 'resources/art_showcase/colourstudyB.png', caption: 'A colour study' },
    { src: 'resources/art_showcase/cupid.png', caption: 'Character design inspired by cupid' },
    { src: 'resources/art_showcase/fairy.png', caption: 'Fairy character inspired by flower' },
    { src: 'resources/art_showcase/frogs.png', caption: 'Anthro character designs' },
    { src: 'resources/art_showcase/ghosts.png', caption: 'Ghost-hunting concept' },
    { src: 'resources/art_showcase/hourglass.png', caption: 'UI Gaphic exploration' },
    { src: 'resources/art_showcase/logo.png', caption: 'Practicing standalone design - such as a logo' },
    { src: 'resources/art_showcase/minifrogs.gif', caption: 'Small animation' },
    { src: 'resources/art_showcase/mouth.png', caption: 'Body horror' },
    { src: 'resources/art_showcase/neck.png', caption: 'Colour practice' },
    { src: 'resources/art_showcase/phonefrog.gif', caption: 'Animation practice' },
    { src: 'resources/art_showcase/pixie.png', caption: 'A pixie character' },
    { src: 'resources/art_showcase/retrocar.png', caption: 'A car in 90s-inspired dither style' },
    { src: 'resources/art_showcase/robot.png', caption: 'Narrative-driven piece - a robot that yearns for space' },
    { src: 'resources/art_showcase/ship.png', caption: 'Environment design' },
    { src: 'resources/art_showcase/skywhales.png', caption: 'Fantasy sky whales' },
    { src: 'resources/art_showcase/spritesheet.gif', caption: 'Sprites for a small halloween-themed demo' },
    { src: 'resources/art_showcase/tv_hands.gif', caption: 'Simple animation' },
    { src: 'resources/art_showcase/witch.png', caption: 'Character design' },
    { src: 'resources/art_showcase/digitalart/froggirl.png'},
    { src: 'resources/art_showcase/digitalart/latecat.png'}
];

const gallery = document.getElementById('gallery');

galleryImages.forEach(image => {
    const col = document.createElement('div');
    // col.className = 'col-6 col-md-4 col-lg-3';
    col.className ='col-12 col-md-6 col-lg-3';
    col.innerHTML = `
    <div class="image-container">
      <img src="${image.src}" class="gallery-image" alt="${image.caption}">
      <div class="caption">${image.caption}</div>
    </div>
  `;
  gallery.appendChild(col);
  console.log(col.namespaceURI);
});

// const galleryContainer = document.querySelector('.container');
// galleryContainer. = 10%;
// galleryContainer.margin-left = 10%;