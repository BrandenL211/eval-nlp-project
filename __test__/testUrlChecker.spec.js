import checkUrl from '../src/client/js/urlChecker';

test('Test for checkUrl()', () => {
    expect(checkUrl).toBeDefined();
});

test('Testing my url checker', () => {
    expect(checkUrl('https://www.google.com/')).toBe(true);
});

test('Testing my url checker', () => {
    expect(checkUrl('htps://www.google.com/')).toBe(false);
});