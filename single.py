import PyPDF2
import spacy
from spacy import displacy
from spacy.language import Language
from spacy_langdetect import LanguageDetector

@Language.factory("language_detector")
def create_language_detector(nlp, name):
    return LanguageDetector(language_detection_function=None)

nlp = spacy.load('en_core_web_md')
nlp.add_pipe('language_detector')

#en_core_web_sm
#en_core_web_md
#en_core_web_trf

def loadFile(f):
    pdfFileObj = open(str(f), 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    print(pdfReader.documentInfo) #debug
    print(pdfReader.numPages) #debug
    text = ''
    for x in range(pdfReader.numPages):
        pageObj = pdfReader.getPage(x)
        text += pageObj.extractText()
    return text

text = loadFile('test.pdf')
doc = nlp(text)

## document level language detection
print(doc._.language)
## sentence level language detection
# for sent in doc.sents:
#    print(sent, sent._.language)


## part for removing stop and punct words
doc_no_stop_words = nlp(' '.join([str(t) for t in doc if not t.is_stop and not t.is_punct]))
print('Before preprocessing tokens:\t', len(doc))
print('After preprocessing tokens:\t', len(doc_no_stop_words))

## displaying all NOUN tokens as lemma from doc
for token in doc:
  if token.pos_ == 'NOUN':
    print(token.text, token.lemma_, '\t', token.pos_)

## creating list with all NOUN/PROPN tokens for future work
doc_nouns = nlp(' '.join([str(t) for t in doc if t.pos_ in ['NOUN', 'PROPN']]))

## tokenizing word "tsunami" and comparing it with all NOUN tokens from original doc
tsunami = nlp('tsunami')
score_tsunami = tsunami.similarity(doc_nouns)
print('Compare tsunami vs nouns token\t', + score_tsunami)
score_tsunami = tsunami.similarity(doc_no_stop_words)
print('Compare tsunami vs all tokens w/o stop and punct words\t', + score_tsunami)
exit()

for token in doc:
  print(token.text, '\t', token.has_vector, token.vector_norm)

# text = 'Tsunamis are among the most destructive and deadly natural disasters.'
doc = nlp(text)
#http://127.0.0.1:5000
displacy.serve(doc, style='dep') #style dep/ent