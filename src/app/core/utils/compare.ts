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

export function similarityPercentage(s1:string, s2:string,algorithm:string = 'common'):number {
    if (algorithm === 'levenshtein') {
        const distance = levenshteinDistance(s1, s2);
        const maxLen = Math.max(s1.length, s2.length);
        return ((maxLen - distance) / maxLen) * 100;
    } else if (algorithm === 'common') {
        return commonWordSimilarity(s1, s2);
    }
    return 0; 
}
