////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Right to Left
document.addEventListener('DOMContentLoaded', function() {
    const containers = [document.getElementById('image-container1')];
    const speed = 2; // Pixels per frame

    containers.forEach(container => {
        const images = Array.from(container.getElementsByClassName('loop-image1'));

        function moveImages() {
            images.forEach(img => {
                let currentLeft = img.offsetLeft;
                let imgWidth = img.offsetWidth;

                // Move image to the left
                img.style.left = (currentLeft - speed) + 'px';

                // Check if the image is completely out of view on the left
                if ((currentLeft + imgWidth) < 0) {
                    // Calculate the new left position for the image, placing it just to the right of the last image
                    let lastImg = images[images.length - 1];
                    let lastImgRightEdge = lastImg.offsetLeft + lastImg.offsetWidth;
                    img.style.left = lastImgRightEdge + 'px';

                    // Reorder the array of images to keep track of the new order
                    images.push(images.shift());
                }
            });

            requestAnimationFrame(moveImages);
        }

        // Set initial positions of images to ensure they are placed in a row
        let accumulatedWidth = 1150;
        images.forEach(img => {
            img.style.position = 'absolute';
            img.style.left = `${accumulatedWidth}px`;
            accumulatedWidth += img.offsetWidth;
        });

        moveImages(); // Start the animation
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Welcome Wording
const snippets = [
  '<span class="argument">Hello</span>',
  '<span class="argument">Hola</span>',
  '<span class="argument">Здарвей</span>',
  '<span class="argument">Holt</span>',
];

let currentSnippetIndex = 0;
let charIndex = 0;
let displayContent = "";
let adding = true; // New state variable to control adding/removing characters

function transitionCharacter() {
  if (adding) {
    const nextSnippetHTML = snippets[currentSnippetIndex];
    if (charIndex <= nextSnippetHTML.length) {
      let nextChar = nextSnippetHTML.charAt(charIndex);
      if (nextChar === '<') { // Include entire HTML tag
        const tagCloseIndex = nextSnippetHTML.indexOf('>', charIndex) + 1;
        displayContent += nextSnippetHTML.substring(charIndex, tagCloseIndex);
        charIndex = tagCloseIndex;
      } else {
        displayContent += nextChar;
        charIndex++;
      }
      document.getElementById('hello').innerHTML = displayContent;
      setTimeout(transitionCharacter, 100); // Time per character transition
    } else {
      // Finished adding, start removing after a pause
      adding = false;
      setTimeout(transitionCharacter, 1000); // Adjust if you need a pause before removing
    }
  } else { // Removing characters
    if (displayContent.length > 0) {
      // Remove last character or tag
      if (displayContent.endsWith('>')) { // Assume we are at the end of a tag
        const tagOpenIndex = displayContent.lastIndexOf('<');
        displayContent = displayContent.substring(0, tagOpenIndex);
      } else {
        displayContent = displayContent.substring(0, displayContent.length - 1);
      }
      document.getElementById('hello').innerHTML = displayContent;
      setTimeout(transitionCharacter, 100); // Time per character removal
    } else {
      // Finished removing, prepare for adding next snippet
      adding = true;
      currentSnippetIndex = (currentSnippetIndex + 1) % snippets.length;
      charIndex = 0;
      setTimeout(transitionCharacter, 100); // Adjust if you need a pause before adding
    }
  }
}

// Start the first transition
transitionCharacter();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Left to Right
document.addEventListener('DOMContentLoaded', function() {
    const containers = [document.getElementById('image-container2')];
    const speed = 2; // Pixels per frame

    containers.forEach(container => {
        const images = Array.from(container.getElementsByClassName('loop-image2'));

        function moveImages() {
            images.forEach(img => {
                let currentRight = container.offsetWidth - (img.offsetLeft + img.offsetWidth);
                let imgWidth = img.offsetWidth;

                img.style.left = (img.offsetLeft + speed) + 'px';

                if (img.offsetLeft > container.offsetWidth) {

                    let firstImg = images[0];

                    let firstImgLeftEdge = firstImg.offsetLeft;

                    img.style.left = (firstImgLeftEdge - imgWidth) + 'px';

                    images.unshift(images.pop());
                }
            });

            requestAnimationFrame(moveImages);
        }

        // Set initial positions of images to ensure they are placed in a row
        let accumulatedWidth = -2900;
        images.forEach(img => {
            img.style.position = 'absolute';
            img.style.left = `${accumulatedWidth}px`; // Set the left property to accumulatedWidth.
            accumulatedWidth += img.offsetWidth;
        });

        moveImages(); // Start the animation
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Timeline
document.addEventListener('DOMContentLoaded', function() {
  // Show content1 by default and set its corresponding sub-container background to green
  const initialContent = document.getElementById('time-point1');
  if (initialContent) {
      initialContent.style.display = 'flex';
      document.querySelector('[data-content-id="time-point1"]').style.backgroundColor = 'green'; // Set the corresponding sub-container's background to green
  }
});

document.querySelectorAll('.time-point').forEach(container => {
  container.addEventListener('mouseover', function() {
      // Reset background color of all time-point first
      document.querySelectorAll('.time-point').forEach(subContainer => {
          subContainer.style.backgroundColor = '#f0f0f0'; // Reset to original background color
      });

      // Hide all detail contents
      document.querySelectorAll('.detail-time').forEach(content => {
          content.style.display = 'none';
      });

      // Get the ID from the data attribute of the hovered element
      const contentId = this.getAttribute('data-content-id');

      // Show the corresponding detail content
      const detailContent = document.getElementById(contentId);
      if (detailContent) {
          detailContent.style.display = 'flex';
      }

      // Set the background color of the active time-point to green
      this.style.backgroundColor = 'green';
  });
});