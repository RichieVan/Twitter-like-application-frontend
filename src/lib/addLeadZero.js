export default (num) => {
    if ((num + '').length < 2) {
        num = '0' + num;
    }
    return num;
}