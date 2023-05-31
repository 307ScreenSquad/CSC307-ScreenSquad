const { getReviews, findReviewById, addReview, findReviewsByMovieId } = require('./movie-review-services');
const mongoose = require('mongoose');

describe('Movie Review Services', () => {
  beforeAll(async () => {
    // Connect to the MongoDB test database
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the movie_reviews collection before each test
    await mongoose.connection.collection('movie_reviews').deleteMany({});
  });

  describe('addReview', () => {
    it('should add a new review', async () => {
      const review = {
        movieId: '123',
        reviewText: 'Great movie!',
      };

      const result = await addReview(review);

      expect(result).toBe('Review added successfully');
    });
  });

  describe('findReviewById', () => {
    it('should find a review by ID', async () => {
      const review = {
        movieId: '123',
        reviewText: 'Great movie!',
      };

      const savedReview = await addReview(review);

      const foundReview = await findReviewById(savedReview._id);

      expect(foundReview).toMatchObject(review);
    });

    it('should return undefined if review is not found', async () => {
      const nonExistentId = '609ed85780a2493fcd32e3c9';

      const foundReview = await findReviewById(nonExistentId);

      expect(foundReview).toBeUndefined();
    });
  });

  describe('getReviews', () => {
    it('should return all reviews for a movie', async () => {
      const movieId = '123';

      const reviews = [
        { movieId: movieId, reviewText: 'Great movie!' },
        { movieId: movieId, reviewText: 'Loved it!' },
      ];

      await Promise.all(reviews.map(addReview));

      const result = await getReviews(movieId);

      expect(result.length).toBe(reviews.length);
      expect(result).toEqual(expect.arrayContaining(reviews));
    });

    it('should return an empty array if no reviews are found for a movie', async () => {
      const movieId = '123';

      const result = await getReviews(movieId);

      expect(result).toEqual([]);
    });
  });

  describe('findReviewsByMovieId', () => {
    it('should find reviews by movie ID', async () => {
      const movieId = '123';

      const reviews = [
        { movieId: movieId, reviewText: 'Great movie!' },
        { movieId: movieId, reviewText: 'Loved it!' },
      ];

      await Promise.all(reviews.map(addReview));

      const result = await findReviewsByMovieId(movieId);

      expect(result.length).toBe(reviews.length);
      expect(result).toEqual(expect.arrayContaining(reviews));
    });

    it('should return an empty array if no reviews are found for a movie ID', async () => {
      const nonExistentMovieId = '456';

      const result = await findReviewsByMovieId(nonExistentMovieId);

      expect(result).toEqual([]);
    });
  });
});
