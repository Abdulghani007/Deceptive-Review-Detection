from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import CustomUser
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator 
from django.contrib.auth import authenticate, login, logout



import pandas as pd
from wordcloud import WordCloud

col_names = ["reviews.text", "reviews.title", "reviews.rating"]
new_reviews_df = pd.read_csv("reviews_csv.csv", usecols = col_names)

new_reviews_df["reviews.rating"] = new_reviews_df["reviews.rating"].apply(lambda rating: int(round(rating)))
new_reviews_df["review"] = new_reviews_df["reviews.title"] + " " + new_reviews_df["reviews.text"]

new_reviews_df = new_reviews_df.drop(['reviews.text', 'reviews.title'], axis=1)

new_reviews_df.dropna(inplace=True)

sentiment = ['negative', 'negative', 'negative', 'neutral', 'positive', 'positive']

new_reviews_df["sentiment"] = new_reviews_df["reviews.rating"].apply(lambda rating: sentiment[int(round(rating))])


# Cleaning of Sentences
import nltk
from nltk.corpus import stopwords 
from nltk import pos_tag
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
import re
# from textblob import TextBlob
# import time


nltk.download('stopwords')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

# start_time = time.time()
stop_words = set(stopwords.words('english')) 

lem = WordNetLemmatizer()

def NotNumber(word):

    for char in word:
        if char >= '0' and char <= '9':
            return False
    return True

def get_simple_tag(tag):

    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN

def filtering(review_text):

    filtered_review = str(review_text).lower()

    # Removing punctuation and extra spaces using regex
    filtered_review = re.sub(r'[!@#$%^&\*()_\+\-{}\[\]/''"":;.<>,\?=~`]', " ", filtered_review)
    filtered_review = re.sub(r'\s+', " ", filtered_review)

    # Removing stopwords
    filtered_review = " ".join([word for word in filtered_review.split() if word not in stop_words])

    filtered_words = word_tokenize(filtered_review)

    words = [word for word in filtered_words if word not in stop_words and NotNumber(word) == True]
    pos = pos_tag(words)
    cleaned_words = [lem.lemmatize(word, pos = get_simple_tag(tag)) for word, tag in pos]
    cleaned_string = " ".join(cleaned_words)

    return cleaned_string

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer

new_reviews_df["review_filtered"] = new_reviews_df["review"].apply(lambda review: filtering(review))
x_train, x_test, y_train, y_test = train_test_split(new_reviews_df["review_filtered"], new_reviews_df["sentiment"])

cv = CountVectorizer()
xtrain = cv.fit_transform(x_train)
xtest = cv.transform(x_test)

from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
import pickle

nb = MultinomialNB()
nb.fit(xtrain, y_train)

pickle.dump(nb,open('model.pkl','wb'))
model = pickle.load(open('model.pkl','rb'))

# Reading Dataset for Fake Review
reviews_df = pd.read_csv("deceptive-opinion.csv", usecols = ["text", "deceptive"])

reviews_df["filtered_review"] = reviews_df["text"].apply(lambda review: filtering(review))

dx_train, dx_test, dy_train, dy_test = train_test_split(reviews_df["filtered_review"], reviews_df["deceptive"], test_size = 0.3)

CV = CountVectorizer()
CV.fit(dx_train)

dxtrain = CV.transform(dx_train)
dxtest = CV.transform(dx_test)

# Naive Bayes
NB = MultinomialNB()
NB.fit(dxtrain, dy_train)
pickle.dump(NB,open('model_nbd.pkl','wb'))
model_nbd = pickle.load(open('model_nbd.pkl','rb'))

#Random Forest
RF = RandomForestClassifier()
RF.fit(dxtrain, dy_train)
pickle.dump(RF,open('model_rfd.pkl','wb'))
model_rfd = pickle.load(open('model_rfd.pkl','rb'))

#SVM 
SVM = SVC()
SVM.fit(dxtrain,dy_train)
pickle.dump(RF,open('model_svmd.pkl','wb'))
model_svmd = pickle.load(open('model_svmd.pkl','rb'))


def get_deceptive_count(deceptive_df):

    fake, genuine = 0, 0

    for deceptive in deceptive_df:
        if deceptive == "truthful":
            genuine += 1
        else:
            fake += 1
    
    return fake, genuine

def get_sentiment_count(sentiment_df):

    positive, neutral, negative = 0, 0, 0

    for sentiment in sentiment_df:
        if sentiment == "positive":
            positive += 1
        elif sentiment == "negative":
            negative += 1
        else:
            neutral += 1

    return positive, neutral, negative

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

def get_prediction(nbp, rfp, svmp):
    fake, genuine = 0, 0
    if nbp == "deceptive":
        fake += 1
    else:
        genuine += 1
    
    if rfp == "deceptive":
        fake += 1
    else:
        genuine += 1
    
    if svmp == "deceptive":
        fake += 1
    else:
        genuine += 1
    
    if fake > genuine:
        return "deceptive"
    else:
        return "truthful"

def get_train_test_accuracy(algorithm, dxtrain, dxtest, dy_train, dy_test):

    training_accuracy = algorithm.score(dxtrain, dy_train)
    training_accuracy = round(training_accuracy*100, 2)

    testing_accuracy = algorithm.score(dxtest, dy_test)
    testing_accuracy = round(testing_accuracy*100, 2)

    return training_accuracy, testing_accuracy


# Create your views here.
# @method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated':'success', 'is_admin': user.is_admin})
            else:
                return Response({'isAuthenticated' : 'error'})
        except:
            Response({'error': 'Something went wrong.'})

 
@method_decorator(csrf_protect, name="dispatch")
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        email       = request.data.get("email")
        password    = request.data.get("password")
        re_password = request.data.get("re_password")
        
        try:
            if CustomUser.objects.filter(email = email).exists():
                return Response({'error': 'Email already Exists.'})
            else:
                if password == re_password:
                    if len(password) < 6:
                        return Response({'error': 'Password must  be atleast 6 characters.'})
                    else:
                        user = CustomUser.objects.create_user(email = email, password = password)
                        # user.save()
                        
                        return Response({'success': 'Account Successfully Created.'})       
                else:
                    return Response({'error': 'Passwords do no match.'})
        except:
            Response({'error': 'Something went wrong.'})


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        try:
            data = self.request.data

            email = data["email"]
            password = data["password"]
            
            obj = CustomUser.objects.filter(email = email).values_list('is_admin')

            checkAdmin = False
            if(len(obj) > 0):
                checkAdmin = obj[0][0]
            
            user = authenticate(email = email, password = password)

            if user is not None:
                login(request, user)
                return Response({'success' : 'user authenticated', 'email': email, 'is_admin': checkAdmin})
            else:
                return Response({'error' : 'failed to login'})
        except:
            Response({'error': 'Something went wrong.'})  


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            logout(request)
            return Response({'success':'user logged out'})
        except:
            Response({'error': 'Something went wrong.'})    


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set.'})


class GetUser(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            return Response({'email': user.email, 'is_admin': user.is_admin})
        except:
            return Response({'error': 'Something went wrong.'})


@method_decorator(csrf_protect, name="dispatch")
class UpdateUser(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data
            email = data["email"]

            user = CustomUser.objects.get(email = email)
            user.review = data["review"]
            user.filtered_review = filtering(data["review"])
            
            lst = [user.filtered_review]
            vect = cv.transform(lst).toarray()
            prediction = model.predict(vect)
            print(prediction)
            user.sentiment = prediction[0]

            deceptive_vect = CV.transform(lst).toarray()
            deceptive_nbp = model_nbd.predict(deceptive_vect)
            deceptive_rfp = model_rfd.predict(deceptive_vect)
            deceptive_svmp = model_svmd.predict(deceptive_vect)

            print((deceptive_nbp[0], deceptive_rfp[0], deceptive_svmp[0]))
            user.deceptive = get_prediction(deceptive_nbp[0], deceptive_rfp[0], deceptive_svmp[0])

            # Fake Review function call

            user.save()
            print(user.sentiment)
            print(user.deceptive)
            abc = CustomUser.objects.all().values_list('sentiment')
            print(abc)
            return Response({'success': 'Updated'})
        except:
            return Response({'error': 'Failed'})


@method_decorator(csrf_protect, name="dispatch")
class GetTrainingFeatures(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data

            file_name = data["file_name"]
            
            review_string = ""

            for text, sentiment in zip(new_reviews_df["review"], new_reviews_df["sentiment"]):
                if sentiment == file_name:
                    review_string += text
            
            show_wordcloud(review_string, file_name, "Words in review")

            return Response({ 'success': 'Features Generated Successfully' })
        except:
            return Response({ 'error': 'Failed to Generate Features' })
            

@method_decorator(csrf_protect, name="dispatch")
class GetSentimentCount(APIView):
    def post(self, request, format=None):
        try:
            positive, neutral, negative = get_sentiment_count(list(new_reviews_df["sentiment"]))
            print(positive)
            return Response({'success': 'Features Count Generated', 'positive': positive, 'neutral': neutral, 'negative': negative})
        except:
            return Response({'error': 'Failed to Count Features'})


@method_decorator(csrf_protect, name="dispatch")
class GetDeceptiveCount(APIView):
    def post(self, request, format=None):
        try:
            fake, genuine = get_deceptive_count(list(reviews_df["deceptive"]))
            return Response({'success': 'Deceptive Count Generated', 'fake': fake, 'genuine': genuine})
        except:
            return Response({'error': 'Failed to Count Deceptive'})


@method_decorator(csrf_protect, name="dispatch")
class GetActualSentimentCount(APIView):
    def post(self, request, format=None):
        try:
            positive, neutral, negative = 0, 0, 0
            sentiment_data = CustomUser.objects.all().values_list('sentiment')
            for sentiment in sentiment_data:
                if sentiment[0] == 'positive':
                    positive += 1
                elif sentiment[0] == 'negative':
                    negative += 1
                elif sentiment[0] == 'neutral':
                    neutral += 1
            return Response({'success': 'Features Count Generated', 'positive': positive, 'neutral': neutral, 'negative': negative})
        except:
            return Response({'error': 'Failed to Count Features'})


@method_decorator(csrf_protect, name="dispatch")
class GetActualDeceptiveCount(APIView):
    def post(self, request, format=None):
        try:
            fake, genuine = 0, 0
            deceptive_data = CustomUser.objects.all().values_list('deceptive')

            for deceptive in deceptive_data:
                if deceptive[0] == "truthful":
                    genuine += 1
                elif deceptive[0] == "deceptive":
                    fake += 1

            return Response({'success': 'Deceptive Count Generated', 'fake': fake, 'genuine': genuine})
        except:
            return Response({'error': 'Failed to Count Deceptive'})


@method_decorator(csrf_protect, name="dispatch")
class GetActualFeatures(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data

            file_name = data["file_name"]
            
            review_string = ""

            reviews_data = CustomUser.objects.all().values_list('review', 'sentiment')
            
            for review, sentiment in reviews_data:
                if sentiment == file_name[2:]:
                    review_string += review
            
            show_wordcloud(review_string, file_name, "Words in review")

            return Response({ 'success': 'Features Generated Successfully' })
        except:
            return Response({ 'error': 'Failed to Generate Features' })

@method_decorator(csrf_protect, name="dispatch")
class GetNBDAccuracy(APIView):
    def post(self, request, format=None):
        try:
            training_accuracy = NB.score(dxtrain, dy_train)
            training_accuracy = round(training_accuracy*100, 2)

            testing_accuracy = NB.score(dxtest, dy_test)
            testing_accuracy = round(testing_accuracy*100, 2)

            users = CustomUser.objects.all().values_list('email', 'review', 'filtered_review', 'deceptive', 'last_updated').order_by('-last_updated')
            users_list = list()

            for user in users:
                if len(user[1]) == 0:
                    continue
                else:
                    users_list.append(list(user))
            print(users_list)
            return Response({'success': 'Accuracy Generated Successfully', 'nbd_training_accuracy':training_accuracy, 'nbd_testing_accuracy': testing_accuracy, 'users': users_list})
        except:
            return Response({'error': 'Failed to Generate Accuracy'})

@method_decorator(csrf_protect, name="dispatch")
class GetRFDAccuracy(APIView):
    def post(self, request, format=None):
        try:
            training_accuracy = RF.score(dxtrain, dy_train)
            training_accuracy = round(training_accuracy*100, 2)

            testing_accuracy = RF.score(dxtest, dy_test)
            testing_accuracy = round(testing_accuracy*100, 2)

            return Response({'success': 'Accuracy Generated Successfully', 'rfd_training_accuracy':training_accuracy, 'rfd_testing_accuracy': testing_accuracy})
        except:
            return Response({'error': 'Failed to Generate Accuracy'})

@method_decorator(csrf_protect, name="dispatch")
class GetSVMDAccuracy(APIView):
    def post(self, request, format=None):
        try:
            training_accuracy = SVM.score(dxtrain, dy_train)
            training_accuracy = round(training_accuracy*100, 2)

            testing_accuracy = SVM.score(dxtest, dy_test)
            testing_accuracy = round(testing_accuracy*100, 2)

            return Response({'success': 'Accuracy Generated Successfully', 'svmd_training_accuracy':training_accuracy, 'svmd_testing_accuracy': testing_accuracy})
        except:
            return Response({'error': 'Failed to Generate Accuracy'})

@method_decorator(csrf_protect, name="dispatch")
class GetDeceptiveAccuracies(APIView):
    def post(self, request, format=None):
        try:
            accuracies = dict()
            nbd_training_accuracy, nbd_testing_accuracy = get_train_test_accuracy(NB, dxtrain, dxtest, dy_train, dy_test)
            rfd_training_accuracy, rfd_testing_accuracy = get_train_test_accuracy(RF, dxtrain, dxtest, dy_train, dy_test)
            svmd_training_accuracy, svmd_testing_accuracy = get_train_test_accuracy(SVM, dxtrain, dxtest, dy_train, dy_test)
        
            accuracies['nbd'] = {'nbd_training_accuracy': nbd_training_accuracy, 'nbd_testing_accuracy': nbd_testing_accuracy}
            accuracies['rfd'] = {'rfd_training_accuracy': rfd_training_accuracy, 'rfd_testing_accuracy': rfd_testing_accuracy}
            accuracies['svmd'] = {'svmd_training_accuracy': svmd_training_accuracy, 'svmd_testing_accuracy': svmd_testing_accuracy}

            return Response({'success': 'Accuracy Generated Successfully', 'accuracies':accuracies})
        except:
            return Response({'error': 'Failed to Generate Accuracies'})

@method_decorator(csrf_protect, name="dispatch")
class GetUsersData(APIView):
    def post(self, request, format=None):
        try:
            users = CustomUser.objects.all().values_list('is_admin','email', 'review', 'filtered_review', 'deceptive', 'sentiment', 'last_updated').order_by('-last_updated')
            users_list = list()

            for user in users:
                dic = dict()
                if user[0] == True:
                    continue
                else:
                    dic['email'] = user[1]
                    dic['review'] = user[2]
                    dic['filtered_review'] = user[3]
                    dic['deceptive'] = user[4]
                    dic['sentiment'] = user[5]
                    dic['last_updated'] = user[6]
                    users_list.append(dic)
            print(users_list)
            return Response({'success': 'Users data generated successfully', 'users': users_list})
        except:
            return Response({'error': 'Failed to get users'})

@method_decorator(csrf_protect, name="dispatch")
class GetAllCounts(APIView):
    def post(self, request, format=None):
        try:
            training_positive_count, training_neutral_count, training_negative_count = get_sentiment_count(new_reviews_df["sentiment"])
            training_fake_count, training_genuine_count = get_deceptive_count(reviews_df["deceptive"])

            training_count, testing_count = len(dy_train), len(dy_test)

            users_positive_count, users_neutral_count, users_negative_count = 0, 0, 0
            users_fake_count, users_genuine_count = 0, 0 
            users = CustomUser.objects.all().filter(is_admin=False).values_list('deceptive', 'sentiment')

            for user in users:
                if user[0] == 'truthful':
                    users_genuine_count += 1
                elif user[0] == 'deceptive':
                    users_fake_count += 1

                if user[1] == 'positive':
                    users_positive_count += 1
                elif user[1] == 'negative':
                    users_negative_count += 1
                elif user[1] == 'neutral':
                    users_neutral_count += 1
            
            counts = dict()

            counts["training"] = {'training_positive_count':training_positive_count, 'training_neutral_count': training_neutral_count, 'training_negative_count':training_negative_count,
                                'training_fake_count': training_fake_count, 'training_genuine_count': training_genuine_count, 'training_count': training_count, 'testing_count': testing_count
                                }
            
            counts["users_data"] =  { 'users_positive_count': users_positive_count, 'users_neutral_count': users_neutral_count, 'users_negative_count': users_negative_count,
                                    'users_fake_count': users_fake_count, 'users_genuine_count': users_genuine_count
                                    }

            return Response({'success': 'Counts generated successfully', 'counts': counts})
        except:
            return Response({'error': 'Failed to generate counts'})
