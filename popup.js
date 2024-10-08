// Get elements from the popup
const pixivIdInput = document.getElementById('pixiv-id');
const artworkButton = document.getElementById('artwork-btn');
const userButton = document.getElementById('user-btn');

// Add event listener for "Artwork ID" button
artworkButton.addEventListener('click', function() {
  const pixivId = pixivIdInput.value.trim();
  if (isValidPixivId(pixivId)) {
    const pixivUrl = `https://www.pixiv.net/artworks/${pixivId}`;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.update(tabs[0].id, { url: pixivUrl });
    });
  } else {
    alert("Please enter a valid 8 or 9 digit Artwork ID.");
  }
});

// Add event listener for "User ID" button
userButton.addEventListener('click', function() {
  const pixivId = pixivIdInput.value.trim();
  if (isValidPixivId(pixivId)) {
    const pixivUrl = `https://www.pixiv.net/users/${pixivId}`;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.update(tabs[0].id, { url: pixivUrl });
    });
  } else {
    alert("Please enter a valid 8 or 9 digit User ID.");
  }
});

// Function to validate if the text is 8 or 9 digit number
function isValidPixivId(text) {
  const regex = /^\d{8,9}$/;
  return regex.test(text);
}
