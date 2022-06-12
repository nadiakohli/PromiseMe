const PromiseMe = require('./PromiseMe');

test('Promise.resolve works', () => {
    return PromiseMe.resolve('Hello World').then(value => {
        expect(value).toBe('Hello World');
    });
});

test('Promise.reject works', () => {
    return PromiseMe.reject('Hello World').catch(value => {
        expect(value).toBe('Hello World');
    });
})

test('custom Promise Works', () => {
    return new PromiseMe((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
});

test('promise chain works', () => {
    return PromiseMe.resolve('Hello World').then(() => {
        return 'Hello World';
    }).then(value => {
        expect(value).toBe('Hello World');
    })
});

test('nested promises works', () => {
    return PromiseMe.resolve('Hello World').then(() => {
        return PromiseMe.resolve('Hello World');
    }).then(value => {
        expect(value).toBe('Hello World');
    })
});

test('async/await works', async () => {
    const value = await PromiseMe.resolve('Hello World');
    expect(value).toBe('Hello World');
})

test('async/await catch works', async () => {
    try {
        await PromiseMe.reject('Hello World');
    } catch (error) {
        expect(error).toBe('Hello World');
    }
});

test('few promises works', async () => {
    const promise = PromiseMe.resolve('Hello World');
    const promise1 = promise.then((value) => {
        return `${value} 1`;
    });
    const promise2 = promise.then((value) => {
        return `${value} 2`;
    });
    const [result, result1, result2] = await Promise.all([promise, promise1, promise2]);

    expect(result).toBe('Hello World');
    expect(result1).toBe('Hello World 1');
    expect(result2).toBe('Hello World 2');
});
