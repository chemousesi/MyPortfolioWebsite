document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;

        if (name && review) {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');

            const reviewTitle = document.createElement('h4');
            reviewTitle.textContent = name;

            const reviewContent = document.createElement('p');
            reviewContent.textContent = review;

            reviewItem.appendChild(reviewTitle);
            reviewItem.appendChild(reviewContent);

            reviewsList.appendChild(reviewItem);

            reviewForm.reset();
        }
    });
});
