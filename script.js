document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    // Function to fetch reviews from the server
    const fetchReviews = () => {
        fetch('http://localhost:3000/reviews')
            .then(response => response.json())
            .then(data => {
                reviewsList.innerHTML = '';
                data.reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review';
                    reviewDiv.innerHTML = `<strong>${review.name}</strong><p>${review.review}</p>`;
                    reviewsList.appendChild(reviewDiv);
                });
            });
    };

    // Fetch reviews on page load
    fetchReviews();

    // Handle form submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, review })
        })
            .then(response => response.json())
            .then(data => {
                // Clear the form
                reviewForm.reset();
                // Fetch reviews again to include the new one
                fetchReviews();
            });
    });
});
