import pandas as pd
col_names = ["reviews.text", "reviews.title", "reviews.rating"]
new_reviews_df = pd.read_csv("reviews_csv.csv", usecols = col_names)

new_reviews_df["reviews.rating"] = new_reviews_df["reviews.rating"].apply(lambda rating: int(round(rating)))
new_reviews_df["review"] = new_reviews_df["reviews.title"] + " " + new_reviews_df["reviews.text"]

new_reviews_df = new_reviews_df.drop(['reviews.text', 'reviews.title'], axis=1)

new_reviews_df.dropna(inplace=True)

sentiment = ['negative', 'negative', 'negative', 'neutral', 'positive', 'positive']

new_reviews_df["sentiment"] = new_reviews_df["reviews.rating"].apply(lambda rating: sentiment[int(round(rating))])

positive, negative, neutral = 0, 0, 0

for sentiment in new_reviews_df["sentiment"]:
  if sentiment == "positive":
    positive += 1
  elif sentiment == "negative":
    negative += 1
  else:
    neutral += 1
  
print(positive, negative, neutral)


from wordcloud import WordCloud
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

# print wordcloud
def show_wordcloud(data, file_name, title = None):
    # mask = np.array(Image.open(mask_img))
    wordcloud = WordCloud(
        background_color = 'black',
        max_words = 200,
        max_font_size = 40
    ).generate(str(data))

    import os
    entries = os.listdir('D:/new-project/backend/build/static/media/')
    print(entries)

    new_file_name = ""

    for item in entries:
        if item.startswith(file_name):
            new_file_name = item
            break
    
    wordcloud.to_file("D:/new-project/backend/build/static/media/" + new_file_name)

    # wc_img = Image.fromarray(wordcloud.to_array())
    # wc_mask_img = Image.fromarray(mask)

    # new_img = Image.blend(wc_img, wc_mask_img, 0.2)
    # new_img.save("wc_happy_smile.png","PNG")
    # plt.imshow(new_img)
    # plt.axis("off")pyt
    # plt.show()

    # fig = plt.figure(1, figsize = (10, 10))
    # plt.axis('off')
    # if title: 
    #     fig.suptitle(title, fontsize = 20)
    #     fig.subplots_adjust(top = 2.3)

    # plt.imshow(wordcloud)
    # plt.show()
    
    
positive_string, negative_string, neutral_string = "", "", ""

for text, sentiment in zip(new_reviews_df["review"], new_reviews_df["sentiment"]):
  if sentiment == "positive":
    positive_string += text
  elif sentiment == "negative":
    negative_string += text
  else:
    neutral_string  += text

# show_wordcloud(positive_string, "happy_smile.jpg")
show_wordcloud(positive_string, "positive", "Words in positive reviews")

show_wordcloud(negative_string, "negative", "Words in negative reviews")

show_wordcloud(neutral_string, "neutral", "Words in neutral reviews")

