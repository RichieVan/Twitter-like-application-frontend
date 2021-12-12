export default async function CancellablePromise (promise) {
    const result = await promise;
    return result;
}