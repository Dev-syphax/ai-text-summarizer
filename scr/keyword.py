from sklearn.feature_extraction.text import TfidfVectorizer

class KeywordExtractor:
    def __init__(self, top_k: int = 10):
        self.top_k = top_k
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def extract(self, text: str):
        # Convert text to TF-IDF scores
        tfidf_matrix = self.vectorizer.fit_transform([text])
        scores = tfidf_matrix.toarray()[0]
        
        # Map words → scores
        words = self.vectorizer.get_feature_names_out()
        word_scores = list(zip(words, scores))

        # Sort by score descending
        sorted_words = sorted(word_scores, key=lambda x: x[1], reverse=True)

        # Take top_k words
        keywords = [word for word, score in sorted_words[:self.top_k]]

        return keywords
