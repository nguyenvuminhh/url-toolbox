const onnx = require('onnxruntime-node')
const tldExtract = require('tld-extract');
const path = require('path');
const { urlValidator } = require('./helper');
const countChar = (url) => {
    const length = url.length
    const charCount = {
        'dot': 0,
        'at': 0,
        'perc': 0,
        'dash': 0,
        'digit': 0,
        'nonAlnum': 0,
    }
    for (let i = 0; i < length; i++) {
        const char = url[i]
        if (char == '.') {
            charCount['dot'] ++
        } else if (char == '@') {
            charCount['at'] ++
        } else if (char == '%') {
            charCount['perc'] ++
        } else if (char == '_') {
            charCount['dash'] ++
        } else if (!isNaN(Number(char))) {
            charCount['digit'] ++
        }
        if (/[^a-zA-Z0-9]/.test(char)) {
            charCount['nonAlnum'] ++
        }
    }
    return charCount
}

const extractSubdirTLD = (url) => {
    const splitted = url.split(/(?<!\/)\//).filter(Boolean)
    return splitted.slice(1).some(part => part.includes('.')) ? 1 : 0
}

const countWwwOutsideDomain = (url) => {
    const splitted = url.split(/(?<!\/)\//).filter(Boolean)
    return splitted.slice(1).filter(part => part.includes('www')).length
}

const countSubdomain = (url) => {
    const extracted = tldExtract(url);
    return extracted.subdomain ? extracted.subdomain.split('.').length : 0
}

const loadModel = async () => {
    const modelPath = path.resolve(__dirname, '../model.onnx');
    const session = await onnx.InferenceSession.create(modelPath);
    // console.log('Input Names:', session);
    return session
}

const preprocess = (rawUrl) => {
    if (!urlValidator(rawUrl)) {
        throw Error('Status 400 | Invalid URL.')
    }
    let url
    if (rawUrl.startsWith('https://')) {
        url = rawUrl.slice(8)
    } else if (rawUrl.startsWith('http://')) {
        url = rawUrl.slice(7)
    } else {
        url = rawUrl
    }
    const charCount = countChar(url)
    const length = url.length
    const dotCount = charCount['dot']
    const atCount = charCount['at']
    const percCount = charCount['perc']
    const dashCount = charCount['dash']
    const subdirContainsTLD = extractSubdirTLD(url)
    const digitLeterRatio = charCount['digit'] / (length - charCount['digit'])
    const numOfSubdomain = countSubdomain(url)
    const numOfWWWOutsideDomain = countWwwOutsideDomain(url)
    const nonAlnumRatio = charCount['nonAlnum'] / length
    let preprocessed = new Float32Array([length, dotCount, atCount, percCount, dashCount, subdirContainsTLD, digitLeterRatio, numOfSubdomain, numOfWWWOutsideDomain, nonAlnumRatio])
    // preprocessed = preprocessed.map(a => a.toString())
    return new onnx.Tensor('float32', preprocessed, [1, 10])
}

const predict = async (url) => {
    const session = await loadModel()
    const preprocessedInput = preprocess(url)
    const output = await session.run({ float_input: preprocessedInput })
    return {
        label0: output.probabilities.cpuData[0],
        label1: output.probabilities.cpuData[1]
    }
}

predict("http://facebook.com").then(output => {
    console.log(output)
}).catch(err => {
    console.error(err);
});

module.exports = { predict }