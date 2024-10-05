import re
import tldextract
import numpy as np
import pandas as pd
from fastapi import HTTPException

def count_char(url: str):
    char_count = {
        'dot': 0,
        'at': 0,
        'perc': 0,
        'dash': 0,
        'digit': 0,
        'nonAlnum': 0,
    }
    for char in url:
        if char == '.':
            char_count['dot'] += 1
        elif char == '@':
            char_count['at'] += 1
        elif char == '%':
            char_count['perc'] += 1
        elif char == '_':
            char_count['dash'] += 1
        elif char.isdigit():
            char_count['digit'] += 1
        if not char.isalnum():
            char_count['nonAlnum'] += 1
    return char_count

def extract_subdir_TLD(url):
    splitted = re.split(r'(?<!/)/(?!/)', url)
    return 1 if any('.' in part for part in splitted[1:]) else 0

def count_www_outside_domain(url):
    splitted = re.split(r'(?<!/)/(?!/)', url)
    return sum(1 for part in splitted[1:] if 'www' in part)

def count_subdomain(url):
    extracted = tldextract.extract(url)
    return 0 if len(extracted.subdomain) == 0 else extracted.subdomain.count('.') + 1

def digit_letter_ratio(url):
    splitted = list(url)
    splitted = list(map(lambda x: 0 if str(x).isalpha() else 1, splitted))
    return 0 if splitted.count(0) == 0 else splitted.count(1) / splitted.count(0)

def non_alnum_ratio(url):
    splitted = list(url)
    splitted = list(map(lambda x: 0 if str(x).isalnum() else 1, splitted))
    return sum(splitted) / len(splitted)

def preprocess(url: str):
    if not re.match(r'^(http:\/\/|https:\/\/)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}', url):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    if url.startswith("https://"):
        url = url[8:]
    elif url.startswith("http://"):
        url = url[7:]
    
    char_count = count_char(url)
    length = len(url)
    dot_count = char_count['dot']
    at_count = char_count['at']
    perc_count = char_count['perc']
    dash_count = char_count['dash']
    subdir_contains_tld = extract_subdir_TLD(url)
    digit_letter_ratio = char_count['digit'] / (length - char_count['digit']) if length > char_count['digit'] else 0
    num_of_subdomain = count_subdomain(url)
    num_of_www_outside_domain = count_www_outside_domain(url)
    non_alnum_ratio = char_count['nonAlnum'] / length if length > 0 else 0

    preprocessed = pd.DataFrame({
        "Length": [length],
        "Dot_count": [dot_count],
        "At_count": [at_count],
        "Perc_count": [perc_count],
        "Dash_count": [dash_count],
        "Subdirectory_contains_TLD": [int(subdir_contains_tld)],
        "Digit_letter_ratio": [digit_letter_ratio],
        "Num_of_subdomain": [num_of_subdomain],
        "Num_of_www_outside_domain": [num_of_www_outside_domain],
        "Non_alnum_ratio": [non_alnum_ratio]
    })
    # preprocessed = np.array([
    #     length, dot_count, at_count, perc_count, dash_count,
    #     subdir_contains_tld, digit_letter_ratio, num_of_subdomain, 
    #     num_of_www_outside_domain, non_alnum_ratio
    # ], dtype=np.float32).reshape(1, 10)

    return preprocessed