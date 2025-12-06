from transformers import BartForConditionalGeneration, BartTokenizer

MODEL_NAME = "facebook/bart-large-cnn"
def download_model():
    print("Downloading model:", MODEL_NAME)
    BartForConditionalGeneration.from_pretrained(MODEL_NAME)
    BartTokenizer.from_pretrained(MODEL_NAME)
    print("Model downloaded successfully.")
if __name__ == "__main__":
    download_model()