function findNthPrimeSieve(n) {
    if (n <= 0) {
        return "Input should be a positive integer";
    }

    // Estimate an upper limit for the nth prime. A safe estimate is n * (Math.log(n) + Math.log(Math.log(n)))
    // For simplicity and small 'n', a simpler upper bound works.
    // For the 10000th prime, the value is 104729. A limit of n*1.5 * 10 is usually safe for N<10000.
    // For production use, a more precise formula for the limit is better.
    let limit = 0;
    if (n < 6) {
        limit = 15; // Sufficiently large for n=1 to 5
    } else {
        // A commonly used approximation for the nth prime upper bound is n * log(n) + n * log(log(n))
        limit = Math.ceil(n * Math.log(n) + n * Math.log(Math.log(n)));
    }


    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        // If isPrime[p] is not changed, then it is a prime
        if (isPrime[p] === true) {
            // Update all multiples of p starting from p*p
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    const primes = [];
    for (let p = 2; p <= limit; p++) {
        if (isPrime[p]) {
            primes.push(p);
        }
    }

    if (primes.length >= n) {
        return primes[n - 1]; // Primes array is 0-indexed, so the Nth prime is at index N-1
    } else {
        // This case indicates the limit was too small for the given N.
        // The limit estimation might need adjustment for very large N.
        return `Error: Limit (${limit}) was too small to find the ${n}th prime.`;
    }
}

export default findNthPrimeSieve;
