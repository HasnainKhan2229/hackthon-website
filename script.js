        // Enhanced Social Media App with VIP features

        // Authentication Logic
        const authContainer = document.getElementById("authContainer");
        const appContainer = document.getElementById("appContainer");
        const authBox = document.getElementById("authBox");
        const signupLink = document.querySelector(".signup-link");
        const loginLink = document.querySelector(".login-link");
        const showHidePw = document.querySelectorAll(".showHidePw");
        const passwordFields = document.querySelectorAll(".password");

        // Show/hide password functionality
        showHidePw.forEach((eyeIcon, index) => {
            eyeIcon.addEventListener("click", () => {
                const passwordField = passwordFields[index];

                if (passwordField.type === "password") {
                    passwordField.type = "text";
                    eyeIcon.textContent = "🙈";
                } else {
                    passwordField.type = "password";
                    eyeIcon.textContent = "👁️";
                }
            });
        });

        // Switch between login and signup forms
        signupLink.addEventListener("click", (e) => {
            e.preventDefault();
            authBox.classList.add("active");
        });

        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            authBox.classList.remove("active");
        });

        // Form validation and authentication
        document.addEventListener('DOMContentLoaded', function () {
            // Login form validation
            const loginForm = document.getElementById('loginForm');
            const loginSubmit = document.getElementById('loginSubmit');
            
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                loginSubmit.disabled = true;
                loginSubmit.value = "Logging in...";
                
                let isValid = true;

                // Email validation
                const loginEmail = document.getElementById('login-email');
                const loginEmailError = document.getElementById('login-email-error');
                if (!validateEmail(loginEmail.value)) {
                    loginEmailError.textContent = 'Please enter a valid email address';
                    loginEmailError.style.display = 'block';
                    isValid = false;
                } else {
                    loginEmailError.style.display = 'none';
                }

                // Password validation
                const loginPassword = document.getElementById('login-password');
                const loginPasswordError = document.getElementById('login-password-error');
                if (loginPassword.value.length < 6) {
                    loginPasswordError.textContent = 'Password must be at least 6 characters';
                    loginPasswordError.style.display = 'block';
                    isValid = false;
                } else {
                    loginPasswordError.style.display = 'none';
                }

                if (isValid) {
                    // Simulate API call with timeout
                    setTimeout(() => {
                        // Store user data in localStorage
                        localStorage.setItem('currentUser', JSON.stringify({
                            email: loginEmail.value,
                            name: loginEmail.value.split('@')[0], // Extract name from email
                            id: Date.now().toString()
                        }));

                        // Hide auth container and show app
                        authContainer.style.display = 'none';
                        appContainer.style.display = 'block';

                        // Load posts for this user
                        loadPosts();
                        
                        // Show success message
                        showToast('Login successful!', 'success');
                    }, 1000);
                } else {
                    loginSubmit.disabled = false;
                    loginSubmit.value = "Login Now";
                }
            });

            // Signup form validation
            const signupForm = document.getElementById('signupForm');
            const signupSubmit = document.getElementById('signupSubmit');
            
            signupForm.addEventListener('submit', function (e) {
                e.preventDefault();
                signupSubmit.disabled = true;
                signupSubmit.value = "Creating account...";
                
                let isValid = true;

                // Name validation
                const signupName = document.getElementById('signup-name');
                const signupNameError = document.getElementById('signup-name-error');
                if (signupName.value.trim() === '') {
                    signupNameError.textContent = 'Please enter your name';
                    signupNameError.style.display = 'block';
                    isValid = false;
                } else {
                    signupNameError.style.display = 'none';
                }

                // Email validation
                const signupEmail = document.getElementById('signup-email');
                const signupEmailError = document.getElementById('signup-email-error');
                if (!validateEmail(signupEmail.value)) {
                    signupEmailError.textContent = 'Please enter a valid email address';
                    signupEmailError.style.display = 'block';
                    isValid = false;
                } else {
                    signupEmailError.style.display = 'none';
                }

                // Password validation
                const signupPassword = document.getElementById('signup-password');
                const signupPasswordError = document.getElementById('signup-password-error');
                if (signupPassword.value.length < 6) {
                    signupPasswordError.textContent = 'Password must be at least 6 characters';
                    signupPasswordError.style.display = 'block';
                    isValid = false;
                } else {
                    signupPasswordError.style.display = 'none';
                }

                // Confirm password validation
                const signupConfirmPassword = document.getElementById('signup-confirm-password');
                const signupConfirmPasswordError = document.getElementById('signup-confirm-password-error');
                if (signupConfirmPassword.value !== signupPassword.value) {
                    signupConfirmPasswordError.textContent = 'Passwords do not match';
                    signupConfirmPasswordError.style.display = 'block';
                    isValid = false;
                } else {
                    signupConfirmPasswordError.style.display = 'none';
                }

                // Terms and conditions validation
                const signupTerm = document.getElementById('signup-term');
                if (!signupTerm.checked) {
                    showToast('Please accept the terms and conditions', 'error');
                    isValid = false;
                }

                if (isValid) {
                    // Simulate API call with timeout
                    setTimeout(() => {
                        // Store user data in localStorage
                        localStorage.setItem('currentUser', JSON.stringify({
                            email: signupEmail.value,
                            name: signupName.value,
                            id: Date.now().toString()
                        }));

                        // Hide auth container and show app
                        authContainer.style.display = 'none';
                        appContainer.style.display = 'block';

                        // Load posts for this user
                        loadPosts();
                        
                        // Show success message
                        showToast('Account created successfully!', 'success');
                    }, 1000);
                } else {
                    signupSubmit.disabled = false;
                    signupSubmit.value = "Signup Now";
                }
            });

            // Forgot password functionality
            document.getElementById('forgotPassword').addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Password reset feature coming soon!', 'info');
            });

            // Email validation function
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            // Check if user is already logged in
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                authContainer.style.display = 'none';
                appContainer.style.display = 'block';
                loadPosts();
            }
        });

        // Social Media App Logic
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        let currentFilter = 'latest';
        let postToDelete = null;
        let postToEdit = null;

        // DOM Elements
        const postInput = document.getElementById('postInput');
        const imageUrlInput = document.getElementById('imageUrlInput');
        const postBtn = document.getElementById('postBtn');
        const postsFeed = document.getElementById('postsFeed');
        const searchBox = document.getElementById('searchBox');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const themeToggle = document.getElementById('themeToggle');
        const emojiBtn = document.getElementById('emojiBtn');
        const emojiPicker = document.getElementById('emojiPicker');
        const emojis = document.querySelectorAll('.emoji');
        const deleteModal = document.getElementById('deleteModal');
        const cancelDelete = document.getElementById('cancelDelete');
        const confirmDelete = document.getElementById('confirmDelete');
        const editModal = document.getElementById('editModal');
        const editPostInput = document.getElementById('editPostInput');
        const editImageUrlInput = document.getElementById('editImageUrlInput');
        const cancelEdit = document.getElementById('cancelEdit');
        const saveEdit = document.getElementById('saveEdit');
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutModal = document.getElementById('logoutModal');
        const cancelLogout = document.getElementById('cancelLogout');
        const confirmLogout = document.getElementById('confirmLogout');
        const charCounter = document.getElementById('charCounter');
        const editCharCounter = document.getElementById('editCharCounter');
        const imageBtn = document.getElementById('imageBtn');
        const toast = document.getElementById('toast');

        // Event Listeners
        postInput.addEventListener('input', togglePostBtn);
        postInput.addEventListener('input', updateCharCounter);
        postBtn.addEventListener('click', createPost);
        searchBox.addEventListener('input', filterPosts);
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderPosts();
            });
        });
        themeToggle.addEventListener('click', toggleTheme);
        emojiBtn.addEventListener('click', toggleEmojiPicker);
        emojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                postInput.value += emoji.textContent;
                togglePostBtn();
                updateCharCounter();
                toggleEmojiPicker();
            });
        });
        cancelDelete.addEventListener('click', () => deleteModal.style.display = 'none');
        confirmDelete.addEventListener('click', deletePost);
        cancelEdit.addEventListener('click', () => editModal.style.display = 'none');
        saveEdit.addEventListener('click', updatePost);
        logoutBtn.addEventListener('click', () => logoutModal.style.display = 'flex');
        cancelLogout.addEventListener('click', () => logoutModal.style.display = 'none');
        confirmLogout.addEventListener('click', logout);
        editPostInput.addEventListener('input', updateEditCharCounter);
        imageBtn.addEventListener('click', () => {
            imageUrlInput.focus();
            showToast('Paste your image URL in the field above', 'info');
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === deleteModal) deleteModal.style.display = 'none';
            if (e.target === editModal) editModal.style.display = 'none';
            if (e.target === logoutModal) logoutModal.style.display = 'none';
        });

        // Functions
        function togglePostBtn() {
            postBtn.disabled = postInput.value.trim() === '';
        }

        function updateCharCounter() {
            const length = postInput.value.length;
            charCounter.textContent = `${length}/500`;
            
            if (length > 450) {
                charCounter.classList.add('warning');
                charCounter.classList.remove('error');
            } else if (length > 490) {
                charCounter.classList.add('error');
                charCounter.classList.remove('warning');
            } else {
                charCounter.classList.remove('warning', 'error');
            }
        }

        function updateEditCharCounter() {
            const length = editPostInput.value.length;
            editCharCounter.textContent = `${length}/500`;
            
            if (length > 450) {
                editCharCounter.classList.add('warning');
                editCharCounter.classList.remove('error');
            } else if (length > 490) {
                editCharCounter.classList.add('error');
                editCharCounter.classList.remove('warning');
            } else {
                editCharCounter.classList.remove('warning', 'error');
            }
        }

        function createPost() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const content = postInput.value.trim();
            const imageUrl = imageUrlInput.value.trim();

            if (!content) return;

            const newPost = {
                id: Date.now().toString(),
                content,
                imageUrl: imageUrl || null,
                user: currentUser.name,
                userId: currentUser.id,
                timestamp: new Date().toISOString(),
                likes: 0,
                likedBy: [],
                comments: []
            };

            posts.unshift(newPost);
            savePosts();
            renderPosts();

            // Reset form
            postInput.value = '';
            imageUrlInput.value = '';
            togglePostBtn();
            updateCharCounter();
            
            // Show success message
            showToast('Post published successfully!', 'success');
        }

        function renderPosts() {
            let filteredPosts = [...posts];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            // Apply search filter
            const searchTerm = searchBox.value.toLowerCase();
            if (searchTerm) {
                filteredPosts = filteredPosts.filter(post =>
                    post.content.toLowerCase().includes(searchTerm) ||
                    post.user.toLowerCase().includes(searchTerm)
                );
            }

            // Apply sort filter
            switch (currentFilter) {
                case 'latest':
                    filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    break;
                case 'oldest':
                    filteredPosts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    break;
                case 'most-liked':
                    filteredPosts.sort((a, b) => b.likes - a.likes);
                    break;
                case 'my-posts':
                    filteredPosts = filteredPosts.filter(post => post.userId === currentUser.id);
                    break;
            }

            postsFeed.innerHTML = '';

            if (filteredPosts.length === 0) {
                postsFeed.innerHTML = `
                    <div class="post" style="text-align: center; padding: 40px 20px;">
                        <div class="post-content" style="font-size: 18px; color: var(--text-secondary);">
                            ${searchTerm ? 'No posts found matching your search' : 
                              currentFilter === 'my-posts' ? 'You haven\'t created any posts yet' : 
                              'No posts available. Be the first to post!'}
                        </div>
                    </div>
                `;
                return;
            }

            filteredPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                
                // Format timestamp
                const postDate = new Date(post.timestamp);
                const now = new Date();
                const diffMs = now - postDate;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                
                let timeAgo;
                if (diffMins < 1) {
                    timeAgo = 'Just now';
                } else if (diffMins < 60) {
                    timeAgo = `${diffMins} min ago`;
                } else if (diffHours < 24) {
                    timeAgo = `${diffHours} hr ago`;
                } else if (diffDays < 7) {
                    timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                } else {
                    timeAgo = postDate.toLocaleDateString();
                }
                
                // Check if current user has liked this post
                const userHasLiked = post.likedBy.includes(currentUser.id);
                
                // Get user initial for avatar
                const userInitial = post.user.charAt(0).toUpperCase();
                
                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="post-user-info">
                            <div class="user-avatar">${userInitial}</div>
                            <div>
                                <div class="post-user">${post.user}</div>
                                <div class="post-time">${timeAgo}</div>
                            </div>
                        </div>
                        ${post.userId === currentUser.id ? `
                        <div class="post-actions-menu">
                            <button class="post-menu-btn">⋯</button>
                            <div class="post-menu">
                                <button class="edit-post" data-id="${post.id}">Edit</button>
                                <button class="delete-post" data-id="${post.id}">Delete</button>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    <div class="post-content">${formatPostContent(post.content)}</div>
                    ${post.imageUrl ? `<img src="${post.imageUrl}" class="post-image" alt="Post image" onerror="this.style.display='none'">` : ''}
                    <div class="post-stats">
                        <span>${post.likes} ${post.likes === 1 ? 'like' : 'likes'}</span>
                        <span>${post.comments.length} ${post.comments.length === 1 ? 'comment' : 'comments'}</span>
                    </div>
                    <div class="post-interactions">
                        <button class="interaction-btn like-btn ${userHasLiked ? 'active' : ''}" data-id="${post.id}">
                            <span>${userHasLiked ? '❤️' : '🤍'}</span> Like
                        </button>
                        <button class="interaction-btn comment-btn" data-id="${post.id}">
                            <span>💬</span> Comment
                        </button>
                        <button class="interaction-btn share-btn" data-id="${post.id}">
                            <span>↗️</span> Share
                        </button>
                    </div>
                    <div class="comment-section" id="comment-section-${post.id}" style="display: none;">
                        <div class="comments-list" id="comments-list-${post.id}">
                            ${post.comments.map(comment => `
                                <div class="comment">
                                    <span class="comment-user">${comment.user}:</span> ${comment.text}
                                </div>
                            `).join('')}
                        </div>
                        <div class="comment-input-container">
                            <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="Write a comment...">
                            <button class="comment-btn" data-id="${post.id}">Post</button>
                        </div>
                    </div>
                `;
                postsFeed.appendChild(postElement);
            });

            // Add event listeners to dynamically created elements
            document.querySelectorAll('.post-menu-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const menu = e.target.nextElementSibling;
                    document.querySelectorAll('.post-menu').forEach(m => {
                        if (m !== menu) m.style.display = 'none';
                    });
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                });
            });

            document.querySelectorAll('.edit-post').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.dataset.id;
                    openEditModal(postId);
                });
            });

            document.querySelectorAll('.delete-post').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.dataset.id;
                    openDeleteModal(postId);
                });
            });

            document.querySelectorAll('.like-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.closest('.like-btn').dataset.id;
                    toggleLike(postId);
                });
            });

            document.querySelectorAll('.comment-btn:not(.comment-btn[data-id])').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.dataset.id;
                    addComment(postId);
                });
            });

            document.querySelectorAll('.comment-input').forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const postId = e.target.id.split('-')[2];
                        addComment(postId);
                    }
                });
            });

            document.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.closest('.share-btn').dataset.id;
                    sharePost(postId);
                });
            });

            // Toggle comment section when clicking comment button
            document.querySelectorAll('.interaction-btn.comment-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postId = e.target.closest('.comment-btn').dataset.id;
                    const commentSection = document.getElementById(`comment-section-${postId}`);
                    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
                    
                    // Focus on comment input
                    if (commentSection.style.display === 'block') {
                        setTimeout(() => {
                            document.getElementById(`comment-input-${postId}`).focus();
                        }, 100);
                    }
                });
            });

            // Close menus when clicking elsewhere
            document.addEventListener('click', (e) => {
                if (!e.target.matches('.post-menu-btn')) {
                    document.querySelectorAll('.post-menu').forEach(menu => {
                        menu.style.display = 'none';
                    });
                }
            });
        }

        function formatPostContent(content) {
            // Simple formatting for URLs and line breaks
            return content
                .replace(/\n/g, '<br>')
                .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        }

        function openDeleteModal(postId) {
            postToDelete = postId;
            deleteModal.style.display = 'flex';
        }

        function deletePost() {
            posts = posts.filter(post => post.id !== postToDelete);
            savePosts();
            renderPosts();
            deleteModal.style.display = 'none';
            postToDelete = null;
            showToast('Post deleted successfully', 'success');
        }

        function openEditModal(postId) {
            postToEdit = posts.find(post => post.id === postId);
            if (postToEdit) {
                editPostInput.value = postToEdit.content;
                editImageUrlInput.value = postToEdit.imageUrl || '';
                updateEditCharCounter();
                editModal.style.display = 'flex';
            }
        }

        function updatePost() {
            if (postToEdit) {
                postToEdit.content = editPostInput.value.trim();
                postToEdit.imageUrl = editImageUrlInput.value.trim() || null;
                savePosts();
                renderPosts();
                editModal.style.display = 'none';
                postToEdit = null;
                showToast('Post updated successfully', 'success');
            }
        }

        function toggleLike(postId) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const post = posts.find(p => p.id === postId);
            if (post) {
                const userIndex = post.likedBy.indexOf(currentUser.id);
                
                if (userIndex > -1) {
                    // User already liked, so unlike
                    post.likes--;
                    post.likedBy.splice(userIndex, 1);
                } else {
                    // User hasn't liked, so like
                    post.likes++;
                    post.likedBy.push(currentUser.id);
                }
                
                savePosts();
                renderPosts();
            }
        }

        function addComment(postId) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const post = posts.find(p => p.id === postId);
            const commentInput = document.getElementById(`comment-input-${postId}`);
            const commentText = commentInput.value.trim();
            
            if (commentText && post) {
                post.comments.push({
                    user: currentUser.name,
                    userId: currentUser.id,
                    text: commentText,
                    timestamp: new Date().toISOString()
                });
                
                savePosts();
                renderPosts();
                
                // Clear the input
                commentInput.value = '';
                
                // Show success message
                showToast('Comment added successfully', 'success');
            }
        }

        function sharePost(postId) {
            const post = posts.find(p => p.id === postId);
            if (post) {
                // Create a shareable text
                const shareText = `${post.user} posted: "${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}"`;
                
                // Check if the Web Share API is available
                if (navigator.share) {
                    navigator.share({
                        title: 'SocialSphere Post',
                        text: shareText,
                        url: window.location.href
                    })
                    .then(() => showToast('Post shared successfully', 'success'))
                    .catch((error) => {
                        console.log('Error sharing:', error);
                        fallbackShare(shareText);
                    });
                } else {
                    fallbackShare(shareText);
                }
            }
        }

        function fallbackShare(shareText) {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    showToast('Post content copied to clipboard!', 'success');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    showToast('Failed to share post', 'error');
                });
        }

        function filterPosts() {
            renderPosts();
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }

        function toggleEmojiPicker() {
            emojiPicker.style.display = emojiPicker.style.display === 'grid' ? 'none' : 'grid';
        }

        function savePosts() {
            localStorage.setItem('posts', JSON.stringify(posts));
        }

        function loadPosts() {
            const savedPosts = localStorage.getItem('posts');
            if (savedPosts) {
                posts = JSON.parse(savedPosts);
            }
            renderPosts();

            // Load theme preference
            const darkMode = localStorage.getItem('darkMode') === 'true';
            if (darkMode) {
                document.body.classList.add('dark-mode');
                themeToggle.textContent = '☀️';
            }
        }

        function logout() {
            localStorage.removeItem('currentUser');
            authContainer.style.display = 'flex';
            appContainer.style.display = 'none';
            logoutModal.style.display = 'none';
            showToast('You have been logged out', 'info');
        }

        function showToast(message, type) {
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Initialize
        loadPosts();
    