from transformers import pipeline

class Summarizer:
    def __init__(self):
        self.summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn"
        )

    def summarize(self, text: str, min_len=50, max_len=200):
        result = self.summarizer(
            text,
            min_length=min_len,
            max_length=max_len,
            do_sample=False
        )
        return result[0]["summary_text"]
