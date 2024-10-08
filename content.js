// Function to get clipboard content
async function getClipboardText() {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
    return null;
  }
}

// Function to validate if the text is 8 or 9 digit number
function isValidPixivId(text) {
  const regex = /^\d{8,9}$/;
  return regex.test(text);
}

// Function to create a custom confirmation dialog
function showConfirmationDialog(artworkId, callback) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';

  // Create dialog box
  const dialog = document.createElement('div');
  dialog.style.backgroundColor = '#fff';
  dialog.style.padding = '20px';
  dialog.style.borderRadius = '8px';
  dialog.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  dialog.style.textAlign = 'center';
  dialog.style.width = '300px';
  dialog.style.color = 'black'; // Set font color to black
  
  // Add content to the dialog
  dialog.innerHTML = `
    <h3 style="margin-bottom: 10px; color: black;">Pixiv Artwork Detected</h3>
    <p style="margin-bottom: 20px; color: black;">We found an Artwork ID: <strong>${artworkId}</strong>. Would you like to open it?</p>
    <button id="confirm-btn" style="padding: 5px 10px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;">Yes</button>
    <button id="cancel-btn" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 4px;">No</button>
  `;

  // Append the dialog to the overlay
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Add event listeners to the buttons
  document.getElementById('confirm-btn').addEventListener('click', function() {
    callback(true);
    document.body.removeChild(overlay); // Remove the overlay
  });

  document.getElementById('cancel-btn').addEventListener('click', function() {
    callback(false);
    document.body.removeChild(overlay); // Remove the overlay
  });
}

// Function to check if URL contains specific parameter
function hasUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param);
}

// Main logic to prevent duplicate detection using URL parameters
if (!hasUrlParameter('from_clipboard')) {
  getClipboardText().then((text) => {
    if (text && isValidPixivId(text)) {
      // Show custom dialog
      showConfirmationDialog(text, function(confirmed) {
        if (confirmed) {
          // Append a parameter to avoid future clipboard detection
          const pixivUrl = `https://www.pixiv.net/artworks/${text}?from_clipboard=true`;
          window.location.href = pixivUrl;
        }
      });
    }
  });
}
