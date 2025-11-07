const postInput = document.getElementById('postInput');
const photoVideoBtn = document.getElementById('photoVideoBtn');
const fileInput = document.getElementById('fileInput');
const postModal = document.getElementById('postModal');
const closeModal = document.querySelector('.close-modal');
const modalPostText = document.getElementById('modalPostText');
const submitPost = document.getElementById('submitPost');
const postsContainer = document.getElementById('postsContainer');
const addPhotoIcon = document.getElementById('addPhotoIcon');
const mediaPreview = document.getElementById('mediaPreview');

let selectedMedia = null;

postInput.addEventListener('click', () => {
    openModal();
});

photoVideoBtn.addEventListener('click', () => {
    openModal();
    setTimeout(() => {
        fileInput.click();
    }, 100);
});

addPhotoIcon.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedMedia = file;
        displayMediaPreview(file);
    }
});

closeModal.addEventListener('click', () => {
    closeModalWindow();
});

window.addEventListener('click', (e) => {
    if (e.target === postModal) {
        closeModalWindow();
    }
});

submitPost.addEventListener('click', () => {
    createPost();
});

modalPostText.addEventListener('input', () => {
    updateSubmitButton();
});

function openModal() {
    postModal.style.display = 'block';
    modalPostText.focus();
}

function closeModalWindow() {
    postModal.style.display = 'none';
    modalPostText.value = '';
    mediaPreview.innerHTML = '';
    selectedMedia = null;
    fileInput.value = '';
    updateSubmitButton();
}

function displayMediaPreview(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const isVideo = file.type.startsWith('video/');
        
        if (isVideo) {
            mediaPreview.innerHTML = `
                <video controls>
                    <source src="${e.target.result}" type="${file.type}">
                </video>
            `;
        } else {
            mediaPreview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
            `;
        }
    };
    
    reader.readAsDataURL(file);
}

function updateSubmitButton() {
    const hasText = modalPostText.value.trim().length > 0;
    const hasMedia = selectedMedia !== null;
    
    submitPost.disabled = !hasText && !hasMedia;
}

function createPost() {
    const postText = modalPostText.value.trim();
    
    if (!postText && !selectedMedia) {
        return;
    }
    
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    
    const now = new Date();
    const timeString = 'Just now';
    
    let mediaHTML = '';
    if (selectedMedia) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const isVideo = selectedMedia.type.startsWith('video/');
            
            if (isVideo) {
                mediaHTML = `
                    <div class="post-media">
                        <video controls>
                            <source src="${e.target.result}" type="${selectedMedia.type}">
                        </video>
                    </div>
                `;
            } else {
                mediaHTML = `
                    <div class="post-media">
                        <img src="${e.target.result}" alt="Post media">
                    </div>
                `;
            }
            
            postCard.innerHTML = `
                <div class="post-header">
                    <img src="https://i.ibb.co/Kjjmwd4/my-avatar.png" alt="Profile">
                    <div class="post-user-info">
                        <div class="post-username">Hamza Ahmed Shaikh</div>
                        <div class="post-time">${timeString}</div>
                    </div>
                </div>
                ${postText ? `<div class="post-text">${postText}</div>` : ''}
                ${mediaHTML}
                <div class="post-actions">
                    <div class="action-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                            <path d="M16.5 3c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 4.171 4.912 8.213 6.281 9.49a3.007 3.007 0 004.438 0C14.088 16.713 19 12.671 19 8.5 19 5.462 16.538 3 13.5 3h3z"></path>
                        </svg>
                        <span>Like</span>
                    </div>
                    <div class="action-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                            <path d="M12 1a11 11 0 0 0-8.53 17.9l-1.45 4.36a1 1 0 0 0 1.27 1.27l4.36-1.45A11 11 0 1 0 12 1zm0 20a9 9 0 0 1-4.42-1.16 1 1 0 0 0-.67-.1l-3.24 1.08 1.08-3.24a1 1 0 0 0-.1-.67A9 9 0 1 1 12 21z"></path>
                        </svg>
                        <span>Comment</span>
                    </div>
                    <div class="action-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                            <path d="M13.5 3c-3.866 0-7 3.134-7 7a6.98 6.98 0 0 0 1.479 4.282L6.5 21l6.718-1.479A6.98 6.98 0 0 0 17.5 21c3.866 0 7-3.134 7-7s-3.134-7-7-7h-4z"></path>
                        </svg>
                        <span>Share</span>
                    </div>
                </div>
            `;
            
            postsContainer.insertBefore(postCard, postsContainer.firstChild);
        };
        
        reader.readAsDataURL(selectedMedia);
    } else {
        postCard.innerHTML = `
            <div class="post-header">
                <img src="https://i.ibb.co/Kjjmwd4/my-avatar.png" alt="Profile">
                <div class="post-user-info">
                    <div class="post-username">Hamza Ahmed Shaikh</div>
                    <div class="post-time">${timeString}</div>
                </div>
            </div>
            <div class="post-text">${postText}</div>
            <div class="post-actions">
                <div class="action-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                        <path d="M16.5 3c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 4.171 4.912 8.213 6.281 9.49a3.007 3.007 0 004.438 0C14.088 16.713 19 12.671 19 8.5 19 5.462 16.538 3 13.5 3h3z"></path>
                    </svg>
                    <span>Like</span>
                </div>
                <div class="action-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                        <path d="M12 1a11 11 0 0 0-8.53 17.9l-1.45 4.36a1 1 0 0 0 1.27 1.27l4.36-1.45A11 11 0 1 0 12 1zm0 20a9 9 0 0 1-4.42-1.16 1 1 0 0 0-.67-.1l-3.24 1.08 1.08-3.24a1 1 0 0 0-.1-.67A9 9 0 1 1 12 21z"></path>
                    </svg>
                    <span>Comment</span>
                </div>
                <div class="action-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#65676b">
                        <path d="M13.5 3c-3.866 0-7 3.134-7 7a6.98 6.98 0 0 0 1.479 4.282L6.5 21l6.718-1.479A6.98 6.98 0 0 0 17.5 21c3.866 0 7-3.134 7-7s-3.134-7-7-7h-4z"></path>
                    </svg>
                    <span>Share</span>
                </div>
            </div>
        `;
        
        postsContainer.insertBefore(postCard, postsContainer.firstChild);
    }
    
    closeModalWindow();
}

updateSubmitButton();
