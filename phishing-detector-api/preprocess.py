import re
import tldextract
import pandas as pd
import sys
sys.path.append( '../resource')
from tld import country_tld, original_tld

def strip_https(url): return url.replace(r'^www\.', '').replace('://www.', '://').replace('http://', '').replace('https://', '')

def has_http(url):
    return 1 if 'http://' in url else 0

def has_original_tld(url):
    url = strip_https(url)
    extracted = tldextract.extract(url)
    tld = extracted.suffix
    result = [x in original_tld for x in tld.split('.')]
    return 1 if any(result) else 0

def has_country_tld(url):
    url = strip_https(url)
    extracted = tldextract.extract(url)
    tld = extracted.suffix
    result = [x in country_tld for x in tld.split('.')]
    return 1 if any(result) else 0

def extract_subdir_TLD(url):
    url = strip_https(url)
    splitted = re.split(r'(?<!/)/(?!/)', url)
    return 1 if any('.' in part for part in splitted[1:]) else 0

def count_www_outside_domain(url):
    url = strip_https(url)
    splitted = re.split(r'(?<!/)/(?!/)', url)
    return sum(1 for part in splitted[1:] if 'www' in part)

def count_subdomain(url):
    url = strip_https(url)
    extracted = tldextract.extract(url)
    return 0 if len(extracted.subdomain) == 0 else extracted.subdomain.count('.') + 1

def extract_suffix(url):
    url = url.lower()
    extracted = tldextract.extract(url)
    suffix = extracted.suffix
    return suffix.split('.')[-1]

def count_char(url: str):
    char_count = {
        'dot': 0,
        'at': 0,
        'perc': 0,
        'ampersand': 0,
        'dash': 0,
        'digit': 0,
        'nonAlnum': 0,
        'letter': 0
    }
    for char in url:
        if char == '.':
            char_count['dot'] += 1
        elif char == '@':
            char_count['at'] += 1
        elif char == '%':
            char_count['perc'] += 1
        elif char == '&':
            char_count['ampersand'] += 1
        elif char == '_':
            char_count['dash'] += 1
        elif char.isdigit():
            char_count['digit'] += 1
        elif char.isalpha():
            char_count['letter'] += 1
        if not char.isalnum():
            char_count['nonAlnum'] += 1
    return char_count

def TLD_prop(tld):
    TLD_table = pd.read_csv('../resource/TLD_credibility.csv')
    return TLD_table[TLD_table['suffix'] == tld].iloc[0]

def preprocess(url: str):
    tld = tldextract.extract(url).suffix.split('.')[-1]
    if tld == '':
        return (False, None)
    char_count = count_char(url)
    length = len(url)
    dot_count = char_count['dot']
    at_count = char_count['at']
    perc_count = char_count['perc']
    dash_count = char_count['dash']
    ampersand_count = char_count['ampersand']
    http = has_http(url)
    original_tld = has_original_tld(url)
    country_tld = has_country_tld(url)
    subdir_contains_tld = extract_subdir_TLD(url)
    letter_ratio = char_count['letter'] / length if length > char_count['digit'] else 0
    digit_ratio = char_count['digit'] / length  if length > char_count['digit'] else 0
    num_of_subdomain = count_subdomain(url)
    num_of_www_outside_domain = count_www_outside_domain(url)
    non_alnum_ratio = char_count['nonAlnum'] / length if length > 0 else 0
    TLD_prop_result = TLD_prop(tld)
    TLD_relative_popularity = TLD_prop_result['TLD_relative_popularity']
    TLD_credibility = TLD_prop_result['TLD_credibility']
    preprocessed = pd.DataFrame({
        "TLD_relative_popularity": [TLD_relative_popularity],
        "TLD_credibility": [TLD_credibility],
        "Length": [length],
        "Dot_count": [dot_count],
        "At_count": [at_count],
        "Perc_count": [perc_count],
        "Dash_count": [dash_count],
        "Ampersand_count": [ampersand_count],
        "Has_http": [http],
        "Has_original_TLD": [original_tld],
        "Has_country_TLD": [country_tld],
        "Subdirectory_contains_TLD": [(subdir_contains_tld)],
        "Letter_ratio": [letter_ratio],
        "Digit_ratio": [digit_ratio],
        "Num_of_subdomain": [num_of_subdomain],
        "Num_of_www_outside_domain": [num_of_www_outside_domain],
        "Non_alnum_ratio": [non_alnum_ratio]
    })

    return (True, preprocessed)