export function levenshteinDistance(s1:string, s2:string) {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[len1][len2];
}

export function commonWordSimilarity(s1:string, s2:string):number {
    const words1 = s1.toLowerCase().split(/\s+/);
    const words2 = s2.toLowerCase().split(/\s+/);

    const set1 = new Set(words1);
    const set2 = new Set(words2);

    const intersection = new Set([...set1].filter(word => set2.has(word)));
    const union = new Set([...set1, ...set2]);

    const similarity = (intersection.size / union.size) * 100;

    return similarity;
}

export function cosineSimilarity(str1: string, str2: string): number {
    const vector1 = getVector(str1);
    const vector2 = getVector(str2);
  
    const dotProduct = vector1.reduce((sum, value, index) => sum + value * vector2[index], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, value) => sum + value * value, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, value) => sum + value * value, 0));
  
    return dotProduct / (magnitude1 * magnitude2);
}

export function getVector(str: string): number[] {
    const words = str.split(' ');
    const wordSet = new Set(words);
    const vector = Array.from(wordSet).map(word => words.filter(w => w === word).length);
    return vector;
}


export function soundex(str:string) {
    if (!str || str.length === 0) return "";

    // Convert to uppercase
    str = str.toUpperCase();

    // Soundex encoding table
    const mappings = {
        A: "", E: "", I: "", O: "", U: "", Y: "", H: "", W: "",
        B: "1", F: "1", P: "1", V: "1",
        C: "2", G: "2", J: "2", K: "2", Q: "2", S: "2", X: "2", Z: "2",
        D: "3", T: "3",
        L: "4",
        M: "5", N: "5",
        R: "6"
    };

    // Step 1: Keep the first letter
    let firstLetter:string = str[0];

    // Step 2: Convert remaining letters to Soundex digits
    let encoded = firstLetter;
    let previousCode = mappings[firstLetter as keyof typeof mappings] || "";

    for (let i = 1; i < str.length; i++) {
        let char = str[i];
        let code = mappings[char as keyof typeof mappings] || "";

        if (code !== previousCode) {
            encoded += code;
        }
        previousCode = code;
    }

    // Step 3: Remove non-digit characters (except first letter)
    encoded = encoded[0] + encoded.slice(1).replace(/[^1-6]/g, "");

    // Step 4: Ensure length is exactly 4 (pad with zeros or trim)
    return (encoded + "0000").slice(0, 4);
}

// Function to calculate similarity percentage
export function soundexSimilarity(str1: string, str2: string) {
    let code1 = soundex(str1);
    let code2 = soundex(str2);

    let matchCount = 0;
    
    for (let i = 0; i < 4; i++) {
        if (code1[i] === code2[i]) {
            matchCount++;
        }
    }

    // Convert to percentage (each character match is worth 25%)
    return (matchCount / 4) * 100;
}



export function similarityPercentage(s1:string, s2:string,algorithm:string = 'common'):number {
    if (algorithm === 'levenshtein') {
        const distance = levenshteinDistance(s1, s2);
        const maxLen = Math.max(s1.length, s2.length);
        return ((maxLen - distance) / maxLen) * 100;
    } else if (algorithm === 'common') {
        return commonWordSimilarity(s1, s2);
    }else if(algorithm === 'cosine'){
       return cosineSimilarity(s1, s2);
    }else if (algorithm === 'soundex'){
        return soundexSimilarity(s1,s2);
    }
    return 0; 
}

